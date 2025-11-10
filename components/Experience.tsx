import { useNavStore } from "@/store/navStore";
import { useInView, useScroll, useTransform, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { Briefcase } from "lucide-react";

export const Experience = () => {
  const { setActiveSection } = useNavStore();
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.2 });

  // This setup is perfect and will animate the line
  // as the whole section scrolls.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const pathLength = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

  useEffect(() => {
    if (isInView) setActiveSection("experience");
  }, [isInView, setActiveSection]);

  // --- 1. Converted to an array to map over ---
  const experiences = [
    {
      company: "RH POSS",
      role: "Full Stack Developer",
      type: "Hybrid",
      period: "June 2025 - Present",
      responsibilities: [
        "Engineered high-performance REST-full APIs with NodeJS, Express, and NestJS, optimizing data processing",
        "Architected and maintained MongoDB schemas, ensuring scalability and secure data operations",
        "Delivered a high-speed Next.js landing page, improving load times and enhancing user engagement",
      ],
      color: "#10b981", // Your --primary green
      shadow: "rgba(16, 185, 129, 0.3)",
    },
    {
      company: "Self Employed",
      role: "Backend Developer",
      type: "WFH",
      period: "Apr 2023 - May 2025",
      responsibilities: [
        "Developed custom REST APIs for small businesses.",
        "Integrated third-party services like Stripe and SendGrid.",
        "Managed database design and deployment on MongoDB Atlas.",
      ],
      color: "#f7b40f", // Your --secondary yellow
      shadow: "rgba(247, 180, 15, 0.3)",
    },
    // You can add more here...
  ];

  return (
    <section id="experience" ref={ref} className="py-20 px-6 relative">
      <div className="container mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-16 text-center text-gradient-emerald"
        >
          Work Experience
        </motion.h2>

        <div className="max-w-4xl mx-auto relative">
          {/* Animated Timeline Line - This is perfect. */}
          <svg
            className="absolute left-1/2 top-0 h-full w-1 -translate-x-1/2 hidden md:block"
            style={{ zIndex: 0 }}
          >
            <motion.line
              x1="50%"
              y1="0"
              x2="50%"
              y2="100%"
              // Use the primary green for the main line
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              style={{ pathLength }}
            />
          </svg>

          {/* --- 3. Mapped over the experiences array --- */}
          <div className="space-y-12">
            {experiences.map((exp, index) => {
              const side = index % 2 === 0 ? "right" : "left";
              const xStart = side === "right" ? -50 : 50;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: xStart }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <motion.div
                    // --- 4. Added dynamic hover & layout ---
                    initial={{ borderColor: "var(--border)" }}
                    whileHover={{
                      scale: 1.03,
                      rotateY: side === "right" ? -5 : 5, // 3D tilt
                      rotateX: 5,
                      boxShadow: `0 0 20px ${exp.shadow}`,
                      borderColor: exp.color,
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    style={{ transformStyle: "preserve-3d" }}
                    // --- 5. Alternating layout logic ---
                    className={`md:w-[calc(50%-2rem)] p-6 bg-card border rounded-xl relative ${
                      side === "right" ? "md:ml-auto" : "md:mr-auto"
                    }`}
                  >
                    <motion.div
                      // --- 6. Dynamic dot position & color ---
                      className={`absolute top-8 w-4 h-4 rounded-full hidden md:block ${
                        side === "right"
                          ? "left-0 md:-left-[2.15rem]"
                          : "right-0 md:-right-[2.15rem]"
                      }`}
                      style={{ backgroundColor: exp.color }} // Dot has job color
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: 0.5, type: "spring" }}
                      viewport={{ once: true }}
                    />

                    <div className="flex items-center gap-3 mb-4">
                      <div
                        // --- 7. Dynamic icon colors ---
                        className="p-2 rounded-lg"
                        style={{
                          backgroundColor: exp.color + "1A",
                          color: exp.color,
                        }}
                      >
                        <Briefcase className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold">{exp.role}</h3>
                        <p
                          className="font-semibold"
                          style={{ color: exp.color }}
                        >
                          {exp.company}
                        </p>
                      </div>
                    </div>

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
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 * idx }}
                          viewport={{ once: true }}
                          className="flex items-start gap-2 text-muted-foreground"
                        >
                          <span className="mt-1" style={{ color: exp.color }}>
                            ▹
                          </span>
                          <span>{resp}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
