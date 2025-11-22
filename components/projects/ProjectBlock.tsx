import { useMemo, useState } from "react";
import { motion, useAnimation, Variants, MotionStyle } from "framer-motion";
import { projects } from "@/data/projects.data";
import { Project } from "@/types/project.type";

const gridVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
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

interface ProjectsBLocksProps {
  setSelected: (project: Project) => void;
  setHoveredIndex: (index: number | null) => void;
  setShowLikePrompt: (show: boolean) => void;
}

export const ProjectsBLocks = ({
  setSelected,
  setHoveredIndex,
  setShowLikePrompt,
}: ProjectsBLocksProps) => {
  const projectBlocks = useMemo(() => {
    return projects.map((project) => ({
      ...project,
      size: 100 * (0.9 + Math.random() * 0.2),
    }));
  }, []);

  const total = projectBlocks.length;
  const gridSize = Math.ceil(Math.sqrt(total));

  return (
    <motion.div
      className="grid justify-center items-center mx-auto space-y-[10px] space-x-[10px] gap-[10px]
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
            setShowLikePrompt(true);
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
            onClick={() => {
              setSelected(project);
              setShowLikePrompt(true);
            }}
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
  );
};
