import { motion, useInView } from "framer-motion";
import { Award, GraduationCap } from "lucide-react";
import { useNavStore } from "@/store/navStore";
import { useEffect, useRef } from "react";

export const EducationPhilosophy = () => {
  // --- 1. HOOKS FOR SCROLLING NAVIGATION ---
  const { setActiveSection } = useNavStore();
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.3 });

  useEffect(() => {
    if (isInView) setActiveSection("skills"); // Assuming this is 'skills' or a new ID
  }, [isInView, setActiveSection]);

  // --- 2. DEFINED COLORS FOR THE CARDS ---
  const eduColor = {
    hex: "#10b981", // Primary Green
    shadow: "rgba(16, 185, 129, 0.3)",
  };
  const philColor = {
    hex: "#f7b40f", // Secondary Yellow
    shadow: "rgba(247, 180, 15, 0.3)",
  };

  return (
    // --- 3. ADDED 'ref' and 'id' ---
    <section id="skills" ref={ref} className="py-20 px-6 scroll-mt-28">
      <div className="container mx-auto">
        {/* --- 4. ADDED SECTION HEADER --- */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-16 text-center text-gradient-emerald"
        >
          Education & Philosophy
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Education */}
          <motion.div
            initial={{ opacity: 0, x: -50, borderColor: "var(--border)" }}
            whileInView={{ opacity: 1, x: 0 }}
            // --- 5. ADDED 3D HOVER ANIMATION ---
            whileHover={{
              scale: 1.03,
              rotateY: -5, // Tilt left
              rotateX: 5,
              boxShadow: `0 0 20px ${eduColor.shadow}`,
              borderColor: eduColor.hex,
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            viewport={{ once: true }}
            className="p-8 bg-card border rounded-xl"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className="p-3 rounded-lg"
                style={{
                  backgroundColor: eduColor.hex + "1A",
                  color: eduColor.hex,
                }}
              >
                <GraduationCap className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold">Education</h3>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-xl font-semibold">
                  Bachelor of Computer Application
                </h4>
                <p className="font-medium" style={{ color: eduColor.hex }}>
                  SRTMUN University, Latur, MH
                </p>
                <p className="text-muted-foreground">May 2025</p>
                <p
                  className="text-lg font-semibold mt-2"
                  style={{ color: eduColor.hex }} // Using green for CGPA
                >
                  CGPA: 8.89/10
                </p>
              </div>
            </div>
          </motion.div>

          {/* Code Philosophy */}
          <motion.div
            initial={{ opacity: 0, x: 50, borderColor: "var(--border)" }}
            whileInView={{ opacity: 1, x: 0 }}
            // --- 6. ADDED 3D HOVER ANIMATION (opposite tilt) ---
            whileHover={{
              scale: 1.03,
              rotateY: 5, // Tilt right
              rotateX: 5,
              boxShadow: `0 0 20px ${philColor.shadow}`,
              borderColor: philColor.hex,
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            viewport={{ once: true }}
            className="p-8 bg-card border rounded-xl"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className="p-3 rounded-lg"
                style={{
                  backgroundColor: philColor.hex + "1A",
                  color: philColor.hex,
                }}
              >
                <Award className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold">Code Philosophy</h3>
            </div>

            <div className="space-y-4 text-muted-foreground">
              <p>
                I believe in writing{" "}
                <span className="text-primary font-semibold">
                  clean, maintainable code
                </span>{" "}
                that prioritizes performance and scalability. Every line should
                serve a purpose, and every function should be optimized for
                efficiency.
              </p>
              <p>
                My approach combines{" "}
                <span
                  className="font-semibold"
                  style={{ color: philColor.hex }} // Using yellow here
                >
                  systematic problem-solving
                </span>{" "}
                with creative innovation, ensuring solutions that are both
                technically sound and user-focused.
              </p>

              <div className="pt-4 border-t border-border">
                <p className="font-semibold text-foreground mb-2">
                  Achievement
                </p>
                <p>Hackathon Participation Certificate – RSML Latur (2025)</p>
                <p className="text-sm">Project: OptiLife</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
