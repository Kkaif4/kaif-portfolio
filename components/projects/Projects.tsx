// src/components/Projects.tsx
"use client";

import { useNavStore } from "@/store/navStore";
import { useInView, motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
// --- Updated atmosphere: Sky and Fog ---
import { Plane, OrbitControls, Sky } from "@react-three/drei";

import { Physics, RigidBody } from "@react-three/rapier";

import { Project } from "@/types/project.type";
import { projects } from "@/data/projects.data";
import { ProjectModal } from "./ProjectModal";
import { ProjectBlock } from "./ProjectBlock";

export const Projects = () => {
  const { setActiveSection } = useNavStore();
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.2 });

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (isInView && !selectedProject) {
      setActiveSection("projects");
    }
  }, [isInView, setActiveSection, selectedProject]);

  return (
    <section id="projects" ref={ref} className="py-20 px-6 scroll-mt-28">
      <div className="container mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-16 text-center text-gradient-emerald"
        >
          Featured Projects
        </motion.h2>

        {/* --- FIX: Removed bg-card for seamless blending --- */}
        <div className="w-full h-[500px] border border-border rounded-xl cursor-grab active:cursor-grabbing">
          <Canvas camera={{ position: [0, 8, 12], fov: 50 }}>
            {/* --- FIX 1: Seamless Atmosphere --- */}
            {/* Canvas is transparent, this Sky blends with your page bg */}
            <Sky
              sunPosition={[100, 20, -100]}
              turbidity={0.1} // Cleaner sky
              rayleigh={0.1} // Less haze
              inclination={0.48} // Tilted for a "dusk" feel
              azimuth={0.25}
            />
            {/* Fog blends the floor into the dark background */}

            <fog attach="fog" args={["#0d0d0d", 10, 25]} />

            {/* --- FIX 2: Softer, Cinematic Lighting --- */}
            <ambientLight intensity={0.7} />
            <directionalLight
              position={[10, 10, 5]}
              intensity={1.0} // Softened
              castShadow
            />

            <Physics gravity={[0, -9.8, 0]}>
              <RigidBody type="fixed" rotation={[-Math.PI / 2, 0, 0]}>
                <Plane args={[30, 30]} receiveShadow>
                  <meshStandardMaterial color="#0d0d0d" />
                </Plane>
              </RigidBody>

              {projects.map((project, index) => (
                <ProjectBlock
                  key={index}
                  project={project}
                  onClick={() => setSelectedProject(project)}
                  onDragStart={() => setIsDragging(true)}
                  onDragEnd={() => setIsDragging(false)}
                />
              ))}
            </Physics>

            <OrbitControls
              enabled={!isDragging} // Camera disabled during drag
              enableZoom={false}
              enablePan={false}
              maxPolarAngle={Math.PI / 2.1}
            />
          </Canvas>
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};
