import { motion } from "framer-motion";
import { useRef } from "react";
import { Code2, Server, Database, Layers, Box, Container } from "lucide-react";

export const Skills = () => {
  const ref = useRef(null);

  const dockerContainers = [
    {
      category: "Backend",
      icon: Server,
      skills: [
        "Node.js",
        "Express.js",
        "NestJS",
        "RESTful API design",
        "WebSockets",
        "JWT Authentication",
      ],
    },
    {
      category: "Frontend",
      icon: Code2,
      skills: ["React", "Next.js", "Tailwind CSS", "Bootstrap"],
    },
    {
      category: "Databases",
      icon: Database,
      skills: ["MySQL", "MongoDB"],
    },
    {
      category: "AI & Integrations",
      icon: Layers,
      skills: [
        "Google Gemini API",
        "Cloudinary",
        "reCAPTCHA v3",
        "Zod Validation",
      ],
    },
    {
      category: "Tools & Workflow",
      icon: Box,
      skills: ["GitHub", "Postman", "VS Code", "Docker"],
    },
  ];

  return (
    <section
      id="skills"
      ref={ref}
      className="py-20 px-6 relative overflow-hidden"
    >
      <div className="container mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-4 text-center text-gradient-emerald"
        >
          Skills & Technologies
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-muted-foreground mb-16 flex items-center justify-center gap-2"
        >
          <Container className="w-5 h-5 text-primary" />
          Containerized Skills Hub
        </motion.p>

        {/* Docker Hub Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {dockerContainers.map((container, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30, rotateX: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
              whileHover={{
                y: -10,
                rotateX: 5,
                rotateY: 5,
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(16, 185, 129, 0.3)",
              }}
              className="relative p-6 rounded-lg border-2 border-border bg-card/80 backdrop-blur-sm group perspective-1000 cursor-pointer"
              style={{
                transformStyle: "preserve-3d",
                perspective: "1000px",
              }}
            >
              {/* Docker Container Header */}
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border/50">
                <div className="relative">
                  <Container className="w-8 h-8 text-primary group-hover:animate-pulse" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-pulse" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                    <container.icon className="w-5 h-5" />
                    {container.category}
                  </h3>
                  <p className="text-xs text-muted-foreground font-mono">
                    Container ID: {Math.random().toString(36).substr(2, 9)}
                  </p>
                </div>
                <div className="w-2 h-2 bg-primary rounded-full shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
              </div>

              {/* Skills Tags */}
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground/60 font-mono mb-2">
                  $ docker run --skills
                </p>
                <div className="flex flex-wrap gap-2">
                  {container.skills.map((skill, j) => (
                    <motion.span
                      key={j}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 + j * 0.05 }}
                      className="px-3 py-1 text-xs rounded-md bg-primary/10 text-primary border border-primary/30 font-mono hover:bg-primary/20 transition-colors"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-lg pointer-events-none" />

              {/* Docker Floating Animation */}
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-2 -right-2 w-6 h-6 opacity-20"
              >
                <Container className="w-full h-full text-primary" />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Docker Hub Terminal Background */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.03 }}
          viewport={{ once: true }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        >
          <pre className="text-primary/30 font-mono text-xs md:text-sm whitespace-pre">
            {`
    ╔════════════════════════════╗
    ║   DOCKER SKILLS HUB v1.0   ║
    ║   Status: Running          ║
    ║   Containers: Active       ║
    ╚════════════════════════════╝
`}
          </pre>
        </motion.div>
      </div>
    </section>
  );
};
