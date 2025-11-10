"use client";

import { useMemo, useState } from "react";
import { motion, useAnimation, Variants, MotionStyle } from "framer-motion";
import { projects } from "@/data/projects.data";
import { ProjectModal } from "./ProjectModal";
import { Project } from "@/types/project.type";
import { ProjectFigure } from "./ProjectFigure";

// PRD: Entrance animation (Phase 2) - Staggered "fall in"
const gridVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05, // PRD: Delay stagger per item (0.05s)
    },
  },
};

interface CustomStyle extends MotionStyle {
  "--grid-size"?: string;
  "--max-width"?: string;
}

const blockVariants: Variants = {
  hidden: {
    y: -40, // PRD: Y: -40
    scale: 0.8, // PRD: Scale: 0.8
    opacity: 0,
  },
  show: {
    y: 0,
    scale: 1,
    opacity: 1,
    transition: {
      // PRD: Eases with spring motion
      type: "spring",
      stiffness: 220,
      damping: 15,
      mass: 0.5,
    },
  },
};

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  // REMOVED: const [showHint, setShowHint] = useState(false);

  // PRD: Randomized ±10% variation
  const projectBlocks = useMemo(() => {
    return projects.map((project) => ({
      ...project,
      // 100px base ±10% variation (0.9 to 1.1)
      size: 100 * (0.9 + Math.random() * 0.2),
    }));
  }, []); // Empty dependency array ensures this runs once on mount

  // REMOVED: hint timing logic useEffect

  // PRD: Dynamic Grid System - N = ceil(√projectCount)
  const total = projectBlocks.length;
  const gridSize = Math.ceil(Math.sqrt(total));

  const hoveredColor =
    hoveredIndex !== null ? projectBlocks[hoveredIndex].color : null;

  return (
    // Add 'relative' here so the figure can be positioned absolutely
    <section id="projects" className="relative py-20 px-6 overflow-hidden">
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center text-gradient-emerald">
          Projects
        </h2>

        <motion.div
          className="grid justify-center items-center mx-auto gap-[10px]
                     grid-cols-[repeat(auto-fit,minmax(80px,1fr))]
                     sm:grid-cols-[repeat(var(--grid-size),_1fr)]
                     sm:max-w-[var(--max-width)]"
          style={
            {
              "--grid-size": gridSize.toString(),
              "--max-width": `${gridSize * 110}px`,
            } as CustomStyle
          }
          variants={gridVariants}
          initial="hidden"
          animate="show"
        >
          {projectBlocks.map((project, index) => {
            const controls = useAnimation();

            // PRD: Pop animation plays once per hover start
            const handleHoverStart = () => {
              setHoveredIndex(index);
              controls.start({
                scale: [1, 1.08, 1], // PRD: scale [1, 1.08, 1]
                transition: {
                  duration: 0.4,
                  ease: [0.25, 1.25, 0.5, 1],
                },
              });
            };

            // PRD: Accessibility - Keyboard navigation
            const handleKeyDown = (e: React.KeyboardEvent) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setSelected(project);
              }
            };

            return (
              <motion.div
                key={project.title + index}
                variants={blockVariants} // For stagger
                role="button"
                tabIndex={0}
                aria-label={`Open project details for ${project.title}`}
                onKeyDown={handleKeyDown}
                onClick={() => setSelected(project)}
                // Set/unset hoveredIndex immediately on hover
                onHoverStart={handleHoverStart}
                onHoverEnd={() => setHoveredIndex(null)}
                animate={controls}
                whileHover={{
                  scale: 1.04, // PRD: scale: 1.04
                  y: -5, // PRD: y: -5
                  boxShadow: `0 0 15px ${project.shadow}`, // PRD: Hover Shadow
                }}
                transition={{
                  // PRD: Transitions use spring physics
                  type: "spring",
                  stiffness: 220,
                  damping: 15,
                  mass: 0.5,
                }}
                className="relative cursor-pointer rounded-md flex-shrink-0"
                style={{
                  backgroundColor: project.color, // PRD: backgroundColor
                  width: `${project.size}px`, // PRD: Randomized size
                  aspectRatio: "1 / 1",
                  border: "1px solid rgba(0,0,0,0.15)", // PRD: border
                }}
              >
                {/* The Figure is no longer here! */}
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* The single figure is placed here, relative to the section */}
      {/* UPDATE: The 'showHint' prop is now driven directly by hover state */}
      <ProjectFigure
        showHint={hoveredIndex !== null}
        hoveredColor={hoveredColor}
      />

      {/* PRD: Modal Trigger */}
      {selected && (
        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}
