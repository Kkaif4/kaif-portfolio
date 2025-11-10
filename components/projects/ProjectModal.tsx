// src/components/ProjectModal.tsx
"use client";

import { Project } from "@/types/project.type"; // Corrected import to "@/types/project"
import { motion } from "framer-motion";
import { Code2, ExternalLink, Github, X } from "lucide-react"; // X icon is no longer used, but kept for consistency

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1, transition: { delay: 0.1 } }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative p-6 md:p-8 bg-card border border-border rounded-xl w-[90%] max-w-2xl"
        onClick={(e) => e.stopPropagation()}
        // --- FIX: Added subtle glossy effect to the modal itself ---
        style={{
          boxShadow: `0 0 40px ${project.shadow}`, // Using project shadow for emphasis
          background: `linear-gradient(145deg, ${project.color}1A, #0d0d0d80)`, // Subtle gradient
          backdropFilter: "blur(8px)", // Blurring the background slightly
        }}
      >
        <motion.button
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
          onClick={onClose}
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
        >
          <X />
        </motion.button>

        <motion.div
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.1, delayChildren: 0.2 },
            },
          }}
          initial="hidden"
          animate="show"
        >
          <div className="flex items-start justify-between mb-4">
            <motion.div
              variants={{
                hidden: { y: 20, opacity: 0 },
                show: { y: 0, opacity: 1 },
              }}
              className="p-3 rounded-lg"
              style={{ backgroundColor: project.color + "1A" }}
            >
              <Code2 className="w-6 h-6" style={{ color: project.color }} />
            </motion.div>

            {/* --- Removed the old GitHub/Demo links from the header --- */}
          </div>

          <motion.h3
            variants={{
              hidden: { y: 20, opacity: 0 },
              show: { y: 0, opacity: 1 },
            }}
            className="text-2xl md:text-3xl font-bold mb-3"
            style={{ color: project.color }}
          >
            {project.title}
          </motion.h3>
          <motion.p
            variants={{
              hidden: { y: 20, opacity: 0 },
              show: { y: 0, opacity: 1 },
            }}
            className="text-muted-foreground mb-4"
          >
            {project.description}
          </motion.p>

          <motion.div
            variants={{
              hidden: { y: 20, opacity: 0 },
              show: { y: 0, opacity: 1 },
            }}
            className="flex flex-wrap gap-2 mb-6"
          >
            {project.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1 text-sm rounded-full border"
                style={{
                  backgroundColor: project.color + "1A",
                  borderColor: project.color,
                  color: project.color,
                }}
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* --- FIX: New Action Buttons (GitHub, Demo, Close) at the bottom --- */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
          {/* GitHub Button */}
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            variants={{
              hidden: { y: 20, opacity: 0 },
              show: { y: 0, opacity: 1, transition: { delay: 0.05 } },
            }}
            className="flex items-center gap-2 px-6 py-2 rounded-full font-semibold transition-all duration-200 ease-in-out"
            style={{
              backgroundColor: project.color + "2A", // Slightly more opaque
              color: project.color,
              border: `1px solid ${project.color}`,
            }}
            whileHover={{
              scale: 1.05,
              backgroundColor: project.color, // Full color on hover
              color: "#FFF", // White text on hover
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Github className="w-5 h-5" />
            View Code
          </motion.a>

          {/* Live Demo Button (conditionally rendered) */}
          {project.demo && (
            <motion.a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              variants={{
                hidden: { y: 20, opacity: 0 },
                show: { y: 0, opacity: 1, transition: { delay: 0.1 } },
              }}
              className="flex items-center gap-2 px-6 py-2 rounded-full font-semibold transition-all duration-200 ease-in-out"
              style={{
                backgroundColor: project.color + "2A",
                color: project.color,
                border: `1px solid ${project.color}`,
              }}
              whileHover={{
                scale: 1.05,
                backgroundColor: project.color,
                color: "#FFF",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <ExternalLink className="w-5 h-5" />
              Live Demo
            </motion.a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};
