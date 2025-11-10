"use client";

import { useEffect, useRef, useState } from "react";
import { useNavStore } from "@/store/navStore";
import { motion, useInView, useMotionValue, useTransform } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { ParticleField } from "../PracticalFields";
import { Github, Linkedin, Mail, Phone } from "lucide-react";
import Image from "next/image";
import { techNodes } from "./TechNodes";

export const Hero = () => {
  const { setActiveSection } = useNavStore();
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5 });

  useEffect(() => {
    if (isInView) setActiveSection("hero");
  }, [isInView, setActiveSection]);

  const words = ["Mohammad", "Kaif", "Shaikh"];
  const roles = ["Backend Craftsman", "AI Explorer"];
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setRoleIndex((prev) => (prev + 1) % roles.length),
      4000
    );
    return () => clearInterval(interval);
  }, []);

  // Parallax effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);
  const handleMouseMove = (e: React.MouseEvent) => {
    const { innerWidth, innerHeight } = window;
    x.set(e.clientX - innerWidth / 2);
    y.set(e.clientY - innerHeight / 2);
  };

  return (
    <section
      id="hero"
      ref={ref}
      onMouseMove={handleMouseMove}
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
    >
      {/* Background Particles */}
      <div className="absolute inset-0 opacity-40">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <ambientLight intensity={0.5} />
          <ParticleField />
        </Canvas>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 via-transparent to-transparent" />

      {/* Tech Energy Lines */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
        viewBox="-300 -250 600 500"
      >
        {techNodes.map((tech, i) => (
          <motion.line
            key={tech.name}
            x1={tech.x}
            y1={tech.y}
            x2={0}
            y2={0}
            stroke={tech.color}
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              duration: 1.2,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
            style={{
              filter: `drop-shadow(0 0 6px ${tech.color})`,
            }}
          />
        ))}
      </svg>

      {/* Floating Tech Logos */}
      {techNodes.map((tech, i) => (
        <motion.div
          key={tech.name}
          className="absolute z-20"
          style={{
            left: `calc(50% + ${tech.x}px)`,
            top: `calc(50% + ${tech.y}px)`,
          }}
          animate={{
            x: [tech.x - 15, tech.x + 15, tech.x],
            y: [tech.y - 10, tech.y + 10, tech.y],
            filter: [
              `drop-shadow(0 0 0px ${tech.color})`,
              `drop-shadow(0 0 8px ${tech.color})`,
              `drop-shadow(0 0 0px ${tech.color})`,
            ],
          }}
          transition={{
            duration: 6 + Math.random() * 2,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        >
          <Image
            src={tech.icon}
            alt={tech.name}
            width={42}
            height={42}
            className="rounded-full"
          />
        </motion.div>
      ))}

      {/* Foreground Text Layer */}
      <motion.div
        style={{ rotateX, rotateY }}
        className="container mx-auto px-6 relative z-30 perspective-1000"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, -10, 0] }}
          transition={{
            duration: 1,
            y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
          }}
          className="text-center"
        >
          {/* Animated Name */}
          <motion.div className="mb-6">
            {words.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
                animate={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
                transition={{
                  delay: i * 0.4,
                  duration: 1.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="text-5xl md:text-7xl lg:text-8xl font-extrabold inline-block mr-4 text-gradient-emerald text-glow-emerald relative"
              >
                {word}
                <motion.span
                  className="absolute inset-0 blur-3xl bg-emerald-500/20 -z-10 rounded-full"
                  animate={{
                    opacity: [0.2, 0.6, 0.2],
                    scale: [1, 1.4, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.3,
                  }}
                />
              </motion.span>
            ))}
          </motion.div>

          {/* Cycling Role Titles */}
          <motion.h2
            key={roleIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-3xl lg:text-4xl font-medium text-foreground/90 mb-6"
          >
            {roles[roleIndex]}
          </motion.h2>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8"
          >
            Building systems where creativity meets precision — scalable APIs,
            elegant UIs, and intelligent applications that adapt and learn.
          </motion.p>

          {/* Interactive Contact Icons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.8 }}
            className="flex items-center justify-center gap-6"
          >
            {[
              {
                icon: <Mail className="w-6 h-6" />,
                link: "mailto:kkaifshaikh.27@gmail.com",
              },
              {
                icon: <Github className="w-6 h-6" />,
                link: "https://github.com/Kkaif4",
              },
              {
                icon: <Linkedin className="w-6 h-6" />,
                link: "https://www.linkedin.com/in/mohammad-kaif-shaikh-a4294a25a/",
              },
              {
                icon: <Phone className="w-6 h-6" />,
                link: "https://wa.me/918552965115",
              },
            ].map(({ icon, link }, i) => (
              <motion.a
                key={i}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="relative"
                whileHover={{ scale: 1.2, rotate: 5, y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                <motion.div
                  className="p-3 bg-card border border-border rounded-full hover:border-primary transition-colors"
                  whileHover={{
                    boxShadow: "0 0 25px rgba(16,185,129,0.4)",
                  }}
                >
                  {icon}
                </motion.div>
                <motion.div
                  className="absolute inset-0 rounded-full border border-emerald-400/40"
                  initial={{ scale: 1, opacity: 0 }}
                  whileHover={{ scale: 1.5, opacity: 1 }}
                  transition={{ duration: 0.4 }}
                />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};
