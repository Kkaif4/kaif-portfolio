// src/components/ProjectModal.tsx
"use client";

import { Project } from "@/types/project.type";
import { motion } from "framer-motion";
import { Code2, ExternalLink, Github, X } from "lucide-react";

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
        className="relative p-6 bg-card border border-border rounded-xl w-[90%] max-w-2xl"
        onClick={(e) => e.stopPropagation()}
      >
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
          {/* ... (All your modal content remains the same) ... */}
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

            <motion.div
              variants={{
                hidden: { y: 20, opacity: 0 },
                show: { y: 0, opacity: 1 },
              }}
              className="flex items-center gap-2"
            >
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                >
                  <Github className="w-5 h-5" />
                </motion.div>
              </a>
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className="p-2 hover:bg-muted rounded-lg transition-colors"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </motion.div>
                </a>
              )}
            </motion.div>
          </div>

          <motion.h3
            variants={{
              hidden: { y: 20, opacity: 0 },
              show: { y: 0, opacity: 1 },
            }}
            className="text-2xl font-bold mb-3"
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
            className="flex flex-wrap gap-2"
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

        {/* --- FIX: Added new close button at the bottom center --- */}
        <div className="flex justify-center mt-6">
          <motion.button
            className="px-6 py-2 bg-primary text-primary-foreground rounded-full font-semibold"
            onClick={onClose}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Close
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};
