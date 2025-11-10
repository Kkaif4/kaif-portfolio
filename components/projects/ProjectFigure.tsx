import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const MotionImage = motion(Image);

// UPDATE: Added 'hoveredColor' to the props
export const ProjectFigure = ({
  showHint,
  hoveredColor,
}: {
  showHint: boolean;
  hoveredColor: string | null; // The project's color
}) => {
  return (
    <motion.div
      // UPDATE: Added 'hidden' and 'md:block' for responsiveness
      className="hidden md:block absolute bottom-10 right-8 md:right-16 w-[360px] h-[450px] pointer-events-none z-[999]"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, type: "spring" }}
    >
      {/* --- Floating “Click Me!” Poster --- */}
      <AnimatePresence>
        {showHint && (
          <motion.div
            // UPDATE: Adjusted position for new size
            className="absolute top-4 left-1/2 -translate-x-1/2 px-6 py-3 bg-white/95 rounded-2xl shadow-2xl z-[1000]"
            initial={{ opacity: 0, y: 20, scale: 0.6 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              rotate: [0, -3, 3, -3, 0],
            }}
            exit={{ opacity: 0, y: 20, scale: 0.6 }}
            transition={{
              default: { type: "spring", stiffness: 300, damping: 20 },
              rotate: { repeat: Infinity, duration: 0.9, ease: "easeInOut" },
            }}
          >
            {/* UPDATE: Removed gradient classes, added dynamic 'style' prop */}
            <span
              className="text-2xl font-extrabold drop-shadow-xl"
              style={{
                color: hoveredColor || "black", // Use the project's color
              }}
            >
              Click Me!
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Figure Body --- */}
      {/* UPDATE: Reduced size slightly */}
      <div className="absolute bottom-0 left-0 w-[360px] h-[360px]">
        {/* Highlighted (pointer) Figure */}
        <MotionImage
          src="/images/standing_with_pointer.png"
          // UPDATE: Reduced size
          width={360}
          height={360}
          alt="Smiling Figure"
          className="absolute bottom-0 left-0 [filter:drop-shadow(0_0_12px_rgba(255,255,255,0.8))]"
          initial={false}
          animate={{ opacity: showHint ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Default (smiling) Figure */}
        <MotionImage
          src="/images/standnig_with_smile.png"
          // UPDATE: Reduced size
          width={360}
          height={360}
          alt="Neutral Figure"
          className="absolute bottom-0 left-0 [filter:drop-shadow(0_0_12px_rgba(255,255,255,0.8))]"
          initial={false}
          animate={{ opacity: showHint ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
};
