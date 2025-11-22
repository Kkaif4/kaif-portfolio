"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { ParticleField } from "../PracticalFields";
import { SocialIconBar } from "./SocialLinks";
import { techNodes as baseTechNodes } from "../../data/techNodes.data";

export const Hero = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5 });

  const words = ["Mohammad", "Kaif", "Shaikh"];
  const roles = ["Backend Craftsman", "AI Explorer", "Full-Stack Engineer"];
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setRoleIndex((prev) => (prev + 1) % roles.length),
      4000
    );
    return () => clearInterval(interval);
  }, []);

  const [techNodes, setTechNodes] = useState(baseTechNodes);

  // Memoize animation values to prevent recalculation on every render
  const animationValues = useMemo(
    () =>
      baseTechNodes.map(() => ({
        floatDistance: Math.random() * -10 - 4,
        duration: Math.random() * 3 + 3,
        delay: Math.random() * 1.2,
      })),
    []
  );

  useEffect(() => {
    const shuffled = baseTechNodes.map((node) => ({
      ...node,
      x: node.x + Math.random() * 40 - 20,
      y: node.y + Math.random() * 40 - 20,
    }));
    setTechNodes(shuffled);
  }, []);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 px-10"
    >
      {/* Background */}
      <div className="absolute inset-0 opacity-40 -z-10">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <ambientLight intensity={0.4} />
          <ParticleField />
        </Canvas>
      </div>
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 via-transparent to-transparent -z-10" />

      {/* --- LAYOUT FIX: Changed width to w-5/12 --- */}
      <div className="relative z-30 flex flex-col items-start gap-6 w-5/12 pointer-events-auto">
        {/* Name */}
        <div>
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: i * 0.3,
                duration: 0.6,
                ease: "easeOut",
              }}
              className="block text-6xl md:text-7xl lg:text-8xl font-extrabold text-gradient-emerald text-glow-emerald"
            >
              {word}
            </motion.span>
          ))}
        </div>

        {/* Role */}
        <div className="h-12 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.h2
              key={roleIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="text-2xl md:text-3xl text-foreground/90 font-medium"
            >
              {roles[roleIndex]}
            </motion.h2>
          </AnimatePresence>
        </div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-lg md:text-xl text-muted-foreground max-w-md leading-relaxed"
        >
          Building systems where creativity meets precision, scalable APIs,
          elegant UIs, and intelligent applications that adapt and learn.
        </motion.p>

        {/* Social Icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="pt-4"
        >
          <SocialIconBar />
        </motion.div>
      </div>

      <div className="relative w-6/12 h-[80vh] flex items-center justify-center overflow-visible">
        {techNodes.map((tech, i) => (
          <motion.div
            key={tech.name}
            className="absolute group cursor-default"
            style={{
              left: `calc(50% + ${tech.x}px)`,
              top: `calc(50% + ${tech.y}px)`,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: isInView ? 1 : 0,
              opacity: isInView ? 1 : 0,
            }}
            transition={{
              delay: animationValues[i].delay,
              duration: 0.5,
              type: "spring",
              stiffness: 150,
            }}
          >
            <motion.div
              className="relative w-12 h-12 flex items-center justify-center rounded-full"
              style={{ willChange: "transform" }}
              animate={{
                y: [0, animationValues[i].floatDistance, 0],
              }}
              transition={{
                duration: animationValues[i].duration,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              whileHover={{
                scale: 1.1,
              }}
            >
              {/* Glow Background */}
              <div
                className="absolute inset-0 rounded-full blur-xl transition-opacity duration-300"
                style={{
                  backgroundColor: `${tech.color}55`,
                  filter: "blur(14px)",
                  opacity: 0.5,
                  willChange: "opacity",
                }}
              />
              <div
                className="absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  backgroundColor: `${tech.color}AA`,
                  filter: "blur(20px)",
                  willChange: "opacity",
                }}
              />

              {/* Icon */}
              <img
                src={tech.icon}
                alt={tech.name}
                className="relative z-20 w-14 h-12 object-contain select-none"
                draggable={false}
                style={{
                  filter: `drop-shadow(0 0 12px ${tech.color}) drop-shadow(0 0 20px ${tech.color}AA)`,
                }}
              />
              {/* Tooltip (instant appearance) */}
              <div
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded-md text-xs font-medium text-white whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                style={{
                  //   boxShadow: `0 0 10px ${tech.color}50`,
                  color: tech.color,
                  willChange: "opacity",
                }}
              >
                {tech.name}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
