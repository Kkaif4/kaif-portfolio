import { useNavStore } from "@/store/navStore";
import { useInView, motion } from "framer-motion";
import { Database, Layers, Server } from "lucide-react";
import { useEffect, useRef } from "react";

export const About = () => {
  const { setActiveSection } = useNavStore();
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.3 });

  useEffect(() => {
    if (isInView) setActiveSection("about");
  }, [isInView, setActiveSection]);

  // --- 1. ADDED COLORS & SHADOWS (green, yellow, blue) ---
  const whyHireMe = [
    {
      icon: <Server className="w-8 h-8" />,
      title: "Backend Expertise",
      description:
        "Proficient in Node.js, Express, and NestJS with focus on scalable REST APIs",
      color: "#10b981", // Your --primary green
      shadow: "rgba(16, 185, 129, 0.3)",
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "Database Design",
      description:
        "Expert in MongoDB schema architecture and query optimization",
      color: "#f7b40f", // Your --secondary yellow
      shadow: "rgba(247, 180, 15, 0.3)",
    },
    {
      icon: <Layers className="w-8 h-8" />,
      title: "Full-Stack Vision",
      description:
        "Seamless integration of responsive React/Next.js frontends with robust backends",
      color: "#3b82f6", // Complementary blue
      shadow: "rgba(59, 130, 246, 0.3)",
    },
  ];

  return (
    <section id="about" ref={ref} className="py-20 px-6">
      <div className="container mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-16 text-center text-gradient-emerald"
        >
          About Me
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-4 text-lg text-muted-foreground leading-relaxed"
          >
            <p>
              I'm a Full-Stack Developer with a backend focus, skilled in the
              MERN and Nest.js ecosystems. I specialize in building scalable
              APIs, responsive user interfaces, and AI-driven applications that
              solve real-world problems.
            </p>
            <p>
              My experience spans database design, performance optimization, and
              secure integrations. I'm committed to writing clean, maintainable
              code and delivering high-performance, user-centric solutions that
              exceed expectations.
            </p>
            <p>
              Currently working at RH POSS, I've engineered high-performance
              RESTful APIs, architected MongoDB schemas, and delivered
              lightning-fast Next.js landing pages. My passion lies in creating
              efficient, scalable systems that make a difference.
            </p>
          </motion.div>

          <div className="space-y-6">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-2xl font-bold text-primary mb-6"
            >
              Why Hire Me?
            </motion.h3>

            <motion.div
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: { staggerChildren: 0.2 },
                },
              }}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="space-y-4"
            >
              {whyHireMe.map((item, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0 },
                  }}
                  // --- 2. UPDATED DYNAMIC HOVER ---
                  initial={{ borderColor: "var(--border)" }}
                  whileHover={{
                    scale: 1.03,
                    rotateY: 5,
                    rotateX: 5,
                    boxShadow: `0 0 20px ${item.shadow}`,
                    borderColor: item.color,
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="p-6 bg-card border rounded-xl cursor-pointer"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="flex items-start gap-4">
                    {/* --- 3. UPDATED DYNAMIC ICON --- */}
                    <div
                      className="p-3 rounded-lg"
                      style={{
                        backgroundColor: item.color + "1A", // 10% opacity
                        color: item.color,
                      }}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold mb-2">
                        {item.title}
                      </h4>
                      <p className="text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
