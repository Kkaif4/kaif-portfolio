"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const MotionImage = motion(Image);

export const ProjectFigure = ({
  showHint,
  hoveredColor,
  showLikePrompt,
}: {
  showHint: boolean;
  hoveredColor: string | null;
  showLikePrompt?: boolean;
}) => {
  const color = hoveredColor || "#00FFF2";
  const [textVisible, setTextVisible] = useState(false);

  // Initial text reveal delay (applies once)
  useEffect(() => {
    const delayMs = 1200;
    const t = setTimeout(() => setTextVisible(true), delayMs);
    return () => clearTimeout(t);
  }, []);

  return (
    <motion.div
      className="flex flex-col items-center justify-center select-none pointer-events-none"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 15 }}
    >
      {/* Text Section */}
      <div className="flex flex-col items-center justify-center mb-4 relative">
        {/* Glow background */}
        <motion.div
          aria-hidden
          className="absolute inset-0 rounded-md blur-xl -z-10"
          style={{ backgroundColor: `${color}30` }}
          animate={textVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.25 }}
        />

        {/* Text states */}
        <motion.span
          className="font-extrabold text-lg md:text-xl uppercase tracking-widest"
          style={{
            color,
            textShadow: `
              0 0 8px ${color},
              0 0 16px ${color}80,
              0 0 32px ${color}40
            `,
            letterSpacing: "0.12em",
          }}
          animate={
            textVisible && !showHint && !showLikePrompt
              ? { opacity: 1 }
              : { opacity: 0 }
          }
          transition={{ duration: 0.2 }}
        >
          WANNA SEE SOMETHING?
        </motion.span>

        <motion.span
          className="font-extrabold text-lg md:text-xl uppercase tracking-widest absolute"
          style={{
            color,
            textShadow: `
              0 0 8px ${color},
              0 0 16px ${color}AA,
              0 0 28px ${color}66
            `,
            letterSpacing: "0.12em",
          }}
          animate={
            textVisible && showHint && !showLikePrompt
              ? { opacity: 1 }
              : { opacity: 0 }
          }
          transition={{ duration: 0.2 }}
        >
          OPEN IT
        </motion.span>

        <motion.span
          className="font-extrabold text-lg md:text-xl uppercase tracking-widest absolute"
          style={{
            color,
            textShadow: `
              0 0 8px ${color},
              0 0 18px ${color}BB,
              0 0 32px ${color}77
            `,
            letterSpacing: "0.12em",
          }}
          animate={
            textVisible && showLikePrompt ? { opacity: 1 } : { opacity: 0 }
          }
          transition={{ duration: 0.25 }}
        >
          DO YOU LIKE IT?
        </motion.span>
      </div>

      {/* Character Illustration */}
      <div className="relative w-[320px] h-[320px] flex items-center justify-center">
        <MotionImage
          src="/images/standing_with_pointer.png"
          width={320}
          height={320}
          alt="Pointer Figure"
          className="[filter:drop-shadow(0_0_14px_rgba(255,255,255,0.8))]"
          animate={{ opacity: showHint ? 1 : 0 }}
          transition={{ duration: 0.15 }}
        />

        <MotionImage
          src="/images/standnig_with_smile.png"
          width={320}
          height={320}
          alt="Smile Figure"
          className="[filter:drop-shadow(0_0_14px_rgba(255,255,255,0.8))] absolute"
          animate={{ opacity: showHint ? 0 : 1 }}
          transition={{ duration: 0.15 }}
        />
      </div>
    </motion.div>
  );
};
