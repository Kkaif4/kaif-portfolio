// src/components/ProjectBlock.tsx
"use client";

import { useState, useMemo, useRef } from "react";
import { Box } from "@react-three/drei";
import { Project } from "@/types/project.type";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { RigidBody, RapierRigidBody, useRapier } from "@react-three/rapier";
import type { World, ImpulseJoint, JointData } from "@dimforge/rapier3d-compat";

const toVector3 = (v: any) => new THREE.Vector3(v.x, v.y, v.z);

interface ProjectBlockProps {
  project: Project;
  onClick: () => void;
  onDragStart: () => void;
  onDragEnd: () => void;
}

// A virtual plane for accurate 3D dragging
const dragPlane = new THREE.Plane();
const viewPoint = new THREE.Vector3();

export const ProjectBlock = ({
  project,
  onClick,
  onDragStart,
  onDragEnd,
}: ProjectBlockProps) => {
  const [hovered, setHover] = useState(false);
  const body = useRef<RapierRigidBody>(null!);
  const anchor = useRef<RapierRigidBody>(null!); // An invisible "handle" for the spring
  const joint = useRef<any>(null); // The spring joint
  const { rapier, world } = useRapier();
  const worldRef = world as unknown as World; // explicit cast
  const { camera, raycaster } = useThree();

  // Track drag distance to differentiate click vs. drag
  const dragStartPos = useRef(new THREE.Vector3());
  const dragDistance = useRef(0);

  // --- Respawn logic (unchanged) ---
  useFrame(() => {
    if (body.current) {
      const pos = body.current.translation();
      if (pos.y < -10) {
        body.current.setTranslation({ x: 0, y: 10, z: 0 }, true);
        body.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
        body.current.setAngvel({ x: 0, y: 0, z: 0 }, true);
      }
    }

    // If the spring joint exists, update the anchor's position
    if (joint.current) {
      if (raycaster.ray.intersectPlane(dragPlane, viewPoint)) {
        anchor.current?.setNextKinematicTranslation(viewPoint);
        // Track drag distance
        dragDistance.current = toVector3(body.current.translation()).distanceTo(
          dragStartPos.current
        );
      }
    }
  });

  // --- Block Spawn (unchanged) ---
  const position = useMemo(
    () =>
      [
        (Math.random() - 0.5) * 15,
        5 + Math.random() * 5,
        (Math.random() - 0.5) * 15,
      ] as [number, number, number],
    []
  );
  const rotation: [number, number, number] = useMemo(
    () => [Math.random(), Math.random() * Math.PI, Math.random()],
    []
  );

  return (
    <>
      {/* 1. The invisible "anchor" body that the spring attaches to */}
      <RigidBody ref={anchor} type="kinematicPosition" />

      {/* 2. The visible Project Block */}
      <RigidBody
        ref={body}
        position={position}
        rotation={rotation}
        mass={1}
        restitution={0.7}
        linearDamping={0.5}
        angularDamping={0.5}
      >
        <Box
          args={[1.8, 1.8, 1.8]} // --- FIX: Larger blocks ---
          castShadow
          onPointerDown={(e) => {
            e.stopPropagation();
            (e.target as HTMLElement).setPointerCapture(e.pointerId);
            onDragStart(); // Disable OrbitControls

            // Record start position for click-vs-drag
            dragStartPos.current.copy(body.current.translation());
            dragDistance.current = 0;

            // Set the drag plane
            const pos = body.current.translation();
            viewPoint.copy(pos);
            dragPlane.setFromNormalAndCoplanarPoint(
              camera.position.clone().sub(viewPoint).normalize(),
              viewPoint
            );

            // Create the invisible anchor
            anchor.current?.setNextKinematicTranslation(viewPoint);

            // --- FIX: Create the Spring Joint ---
            const stiffnessVector = new THREE.Vector3(30, 0, 0);
            const dampingVector = new THREE.Vector3(7, 0, 0);
            joint.current = (world as any).createJoint(
              rapier.JointData.spring(
                0, // anchor2 on anchor body
                0, // local axis on block
                0, // local axis on anchor body
                stiffnessVector, // stiffness
                dampingVector // damping
              ) as any,
              body.current,
              anchor.current,
              true
            );
          }}
          onPointerUp={(e) => {
            e.stopPropagation();
            (e.target as HTMLElement).releasePointerCapture(e.pointerId);
            onDragEnd(); // Re-enable OrbitControls

            // --- FIX: Remove the Spring Joint ---
            if (joint.current) {
              worldRef.removeImpulseJoint(joint.current, true);
              joint.current = null;
            }

            // --- FIX: Check if it was a click or a drag ---
            // If the block moved less than 0.1 units, count as a click
            if (dragDistance.current < 0.1) {
              onClick();
            }
          }}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHover(true);
            document.body.style.cursor = "pointer";
          }}
          onPointerOut={() => {
            setHover(false);
            document.body.style.cursor = "auto";
          }}
        >
          {/* --- FIX: New "Showpiece" Material --- */}
          <meshPhysicalMaterial
            color={project.color}
            emissive={project.color}
            emissiveIntensity={hovered ? 0.7 : 0.2}
            metalness={0.2} // Subtle metallic look
            roughness={0.4} // Satin finish
            clearcoat={0.1} // Glassy top coat
          />
        </Box>
      </RigidBody>
    </>
  );
};
