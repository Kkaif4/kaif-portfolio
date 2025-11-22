"use client";

import { useRef, useState } from "react";

import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, ChevronDown, ChevronUp } from "lucide-react";
import { experiences } from "@/data/experiences.data";

export const ExperienceTree = () => {
  const ref = useRef(null);
  const [activeExp, setActiveExp] = useState<number | null>(null);

  return (
    <section ref={ref} className="relative w-full py-16">
      <div className="max-w-6xl mx-auto relative">
        {/* Center vertical spine */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-emerald-500/25 -translate-x-1/2 rounded-full" />

        <div className="flex flex-col gap-16 relative z-10">
          {experiences.map((exp, index) => {
            const isActive = activeExp === index;
            const isLeft = index % 2 !== 0; // Alternate left/right

            return (
              <motion.div
                key={index}
                className={`relative w-full flex items-center justify-${
                  isLeft ? "start" : "end"
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Connector Dot */}
                <span
                  className="absolute left-1/2 w-4 h-4 rounded-full border-2 bg-background -translate-x-1/2"
                  style={{
                    borderColor: exp.color,
                    boxShadow: `0 0 8px ${exp.color}`,
                  }}
                />

                {/* Branch Line Glow */}
                <motion.div
                  className={`absolute left-1/2 w-[2px] -translate-x-1/2 ${
                    isLeft ? "top-4" : "top-6"
                  } h-[calc(100%+2rem)] bg-gradient-to-b from-transparent via-emerald-500/30 to-transparent`}
                  animate={{ opacity: isActive ? 0.8 : 0.3 }}
                  transition={{ duration: 0.4 }}
                />

                {/* Experience Card */}
                <motion.div
                  onClick={() =>
                    setActiveExp((prev) => (prev === index ? null : index))
                  }
                  className={`relative bg-card border border-border rounded-xl p-6 cursor-pointer hover:border-emerald-400 hover:shadow-[0_0_10px_rgba(16,185,129,0.25)] transition-all w-[90%] md:w-[45%] ${
                    isLeft ? "md:ml-[calc(2%+1rem)]" : "md:mr-[calc(2%+1rem)]"
                  }`}
                  whileTap={{ scale: 0.97 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="p-2 rounded-md"
                        style={{
                          backgroundColor: exp.color + "1A",
                          color: exp.color,
                        }}
                      >
                        <Briefcase className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold">{exp.role}</h3>
                        <p className="text-sm text-muted-foreground">
                          {exp.company}
                        </p>
                      </div>
                    </div>

                    <motion.div
                      animate={{ rotate: isActive ? 180 : 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 250,
                        damping: 20,
                      }}
                    >
                      {isActive ? (
                        <ChevronUp className="w-5 h-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-muted-foreground" />
                      )}
                    </motion.div>
                  </div>

                  {/* Expandable Details */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        key="details"
                        initial={{ opacity: 0, height: 0, y: -10 }}
                        animate={{ opacity: 1, height: "auto", y: 0 }}
                        exit={{ opacity: 0, height: 0, y: -10 }}
                        transition={{ duration: 0.35 }}
                        className="overflow-hidden mt-4 p-4 border border-border rounded-lg bg-muted/10"
                      >
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                          <span className="px-3 py-1 bg-muted rounded-full">
                            {exp.type}
                          </span>
                          <span>{exp.period}</span>
                        </div>

                        <ul className="space-y-3">
                          {exp.responsibilities.map((resp, idx) => (
                            <motion.li
                              key={idx}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.1 }}
                              className="flex items-start gap-2 text-muted-foreground"
                            >
                              <span
                                className="mt-1"
                                style={{ color: exp.color }}
                              >
                                ▹
                              </span>
                              <span>{resp}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
