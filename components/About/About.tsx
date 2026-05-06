import { useInView, motion } from "framer-motion";
import { Database, Layers, Server, Shield } from "lucide-react";
import { useRef } from "react";

export const About = () => {
  const ref = useRef(null);

  const whyHireMe = [
    {
      icon: <Server className="w-8 h-8" />,
      title: "Backend Expertise",
      description:
        "Node.js, NestJS & Express APIs with 50 req/sec throughput, 99.5% uptime via Docker + CI/CD, and 40% query latency reduction through compound indexing.",
      color: "#10b981",
      shadow: "rgba(16, 185, 129, 0.3)",
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "Database & Architecture",
      description:
        "MongoDB schema design with compound indexes (850ms → 320ms), DDD + TDD methodologies, idempotent API design, and Redis caching for auth overhead reduction (150ms → 10ms).",
      color: "#f7b40f",
      shadow: "rgba(247, 180, 15, 0.3)",
    },
    {
      icon: <Layers className="w-8 h-8" />,
      title: "AI & Full-Stack",
      description:
        "RAG pipelines with Gemini API + vector embeddings, LLM grounding for 25% accuracy gains, paired with React/Next.js/Angular frontends and real-time WebSocket sync.",
      color: "#3b82f6",
      shadow: "rgba(59, 130, 246, 0.3)",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Quality & Security",
      description:
        "JWT + RBAC across 20+ endpoints, 92% code coverage (120+ unit tests, 15 E2E tests), and CI/CD pipelines with <5 min runtime via GitHub Actions.",
      color: "#8b5cf6",
      shadow: "rgba(139, 92, 246, 0.3)",
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
              I&apos;m a Backend Engineer with 1+ years of experience building
              scalable RESTful APIs utilizing Node.js, NestJS, and modern
              database technologies including MongoDB. My work spans System
              Design, Microservices, API Versioning, and hands-on experience
              with RAG pipelines, LLM grounding, and Vector Embeddings.
            </p>
            <p>
              I&apos;ve demonstrated success in Performance Optimization —
              reducing query latency by 40% and maintaining 99.9% uptime through
              CI/CD, TDD, and DDD principles. I enforce clean architecture with
              OOP patterns and collaborative workflows using Git-based version
              control.
            </p>
            <p>
              Currently freelancing as a Full Stack Developer, I build
              Node.js/NestJS microservices handling 50 concurrent requests/sec,
              optimize MongoDB with compound indexes, and implement JWT
              authentication with Redis-based session caching — reducing auth
              overhead from 150ms to 10ms per request.
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
                    <div
                      className="p-3 rounded-lg"
                      style={{
                        backgroundColor: item.color + "1A",
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
