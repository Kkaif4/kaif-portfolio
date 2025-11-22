import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

export const SpringToggle = ({
  expanded,
  setExpanded,
}: {
  expanded: boolean;
  setExpanded: (state: boolean) => void;
}) => {
  return (
    <motion.button
      onClick={() => setExpanded(!expanded)}
      className="relative flex flex-col items-center justify-center mt-4 group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Coil / Spring Line */}
      <motion.div
        className="flex gap-1 mb-2"
        initial={false}
        animate={{
          gap: expanded ? 6 : 2,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 12,
        }}
      >
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-emerald-400"
            animate={{
              scaleY: expanded ? 1 : [1, 0.6, 1],
              opacity: expanded ? 1 : [1, 0.5, 1],
            }}
            transition={{
              repeat: expanded ? 0 : Infinity,
              repeatDelay: 1.2,
              delay: i * 0.1,
              duration: 0.6,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>

      {/* Label */}
      <motion.div
        className="flex items-center gap-2 text-emerald-400 font-medium text-sm sm:text-base"
        animate={{
          color: expanded ? "#10b981" : "#6ee7b7",
        }}
      >
        {expanded ? "Collapse Experience Tree" : "View My Experience Tree"}
        <motion.div
          animate={{
            rotate: expanded ? 180 : 0,
          }}
          transition={{ type: "spring", stiffness: 250, damping: 20 }}
        >
          {expanded ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </motion.div>
      </motion.div>

      {/* Glow Effect */}
      <motion.div
        className="absolute inset-0 blur-2xl rounded-full -z-10"
        style={{
          background:
            "radial-gradient(circle at center, rgba(16,185,129,0.3), transparent 70%)",
        }}
        animate={{
          scale: expanded ? 1.2 : 1,
          opacity: expanded ? 0.4 : 0.2,
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />
    </motion.button>
  );
};
