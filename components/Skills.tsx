import { motion } from "framer-motion";
import { useCallback, useRef, useState } from "react";
import {
  Code2,
  Server,
  Database,
  Layers,
  Box,
  Container,
  Shield,
  Brain,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

// --- Extracted skill container with train-lightning logic ---
interface SkillContainerData {
  category: string;
  icon: LucideIcon;
  skills: string[];
}

const SkillContainer = ({
  container,
  index,
}: {
  container: SkillContainerData;
  index: number;
}) => {
  const [litIndex, setLitIndex] = useState<number | null>(null);
  const cooldownRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Generate slug from category: "Backend Development" → "backend-development"
  const categorySlug = container.category
    .toLowerCase()
    .replace(/[&]/g, "and")
    .replace(/\s+/g, "-");

  const startLightning = useCallback(() => {
    if (cooldownRef.current) return;
    cooldownRef.current = true;

    let current = 0;
    const total = container.skills.length;

    // Light each skill sequentially
    const step = () => {
      setLitIndex(current);
      current++;
      if (current < total) {
        timerRef.current = setTimeout(step, 150);
      } else {
        // After last skill lights, hold it briefly then clear
        timerRef.current = setTimeout(() => {
          setLitIndex(null);
          // Cooldown period (3.5s) before allowing re-trigger
          timerRef.current = setTimeout(() => {
            cooldownRef.current = false;
          }, 3500);
        }, 300);
      }
    };

    step();
  }, [container.skills.length]);

  const handleMouseLeave = () => {
    // Don't interrupt an active animation, just let it finish
    // litIndex resets at the end of the sequence
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateX: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
      whileHover={{
        y: -10,
        rotateX: 5,
        rotateY: 5,
        scale: 1.05,
        boxShadow: "0 20px 40px rgba(16, 185, 129, 0.3)",
      }}
      onHoverStart={startLightning}
      onHoverEnd={handleMouseLeave}
      className="relative p-6 rounded-lg border-2 border-border bg-card/80 backdrop-blur-sm group perspective-1000 cursor-pointer"
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
    >
      {/* Container Header */}
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
        </div>
        <div className="w-2 h-2 bg-primary rounded-full shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
      </div>

      {/* Skills Tags */}
      <div className="space-y-2">
        <p className="text-xs text-muted-foreground/60 font-mono mb-2">
          $ skills run --{categorySlug}
        </p>
        <div className="flex flex-wrap gap-2">
          {container.skills.map((skill, j) => {
            const isLit = litIndex === j;

            return (
              <motion.span
                key={j}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 + j * 0.05 }}
                animate={
                  isLit
                    ? {
                        scale: [1, 1.08, 1],
                        transition: { duration: 0.2, ease: "easeOut" },
                      }
                    : {}
                }
                className="px-3 py-1 text-xs rounded-md font-mono transition-all duration-150"
                style={{
                  backgroundColor: isLit
                    ? "rgba(16, 185, 129, 0.35)"
                    : "transparent",
                  color: isLit ? "#6ee7b7" : "#e0e0e0",
                  border: isLit
                    ? "1px solid rgba(16, 185, 129, 0.9)"
                    : "1px solid transparent",
                  boxShadow: isLit
                    ? "0 0 12px rgba(16, 185, 129, 0.6), 0 0 24px rgba(16, 185, 129, 0.3), inset 0 0 6px rgba(16, 185, 129, 0.2)"
                    : "none",
                  textShadow: isLit
                    ? "0 0 8px rgba(16, 185, 129, 0.8)"
                    : "none",
                }}
              >
                {skill}
              </motion.span>
            );
          })}
        </div>
      </div>

      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-lg pointer-events-none" />

      {/* Floating Animation */}
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
  );
};

// --- Main Skills component ---
export const Skills = () => {
  const ref = useRef(null);

  const dockerContainers: SkillContainerData[] = [
    {
      category: "Backend Development",
      icon: Server,
      skills: [
        "JavaScript",
        "TypeScript",
        "Node.js",
        "NestJS",
        "Express.js",
        "RESTful APIs",
        "API Versioning",
        "Microservices",
        "Middleware",
        "Rate Limiting",
        "CORS",
        "WebSockets",
      ],
    },
    {
      category: "Frontend Development",
      icon: Code2,
      skills: [
        "React",
        "Next.js",
        "Angular",
        "HTML",
        "CSS",
        "Tailwind",
        "Bootstrap",
      ],
    },
    {
      category: "Databases",
      icon: Database,
      skills: [
        "MongoDB (Indexing & Schema Design)",
        "PostgreSQL",
        "MySQL",
        "Mongoose (ODM)",
        "TypeORM",
      ],
    },
    {
      category: "Caching & Infrastructure",
      icon: Box,
      skills: [
        "Redis",
        "Docker",
        "GitHub Actions",
        "AWS S3",
        "Vercel",
        "Linux",
        "Cloud Computing",
      ],
    },
    {
      category: "Testing & Automation",
      icon: Layers,
      skills: [
        "Jest",
        "Playwright",
        "Puppeteer",
        "Test-Driven Development (TDD)",
        "End-to-End (E2E) Testing",
      ],
    },
    {
      category: "Architecture & Security",
      icon: Shield,
      skills: [
        "Domain-Driven Design (DDD)",
        "OOP",
        "JWT",
        "RBAC",
        "System Design",
        "Agile Methodologies",
      ],
    },
    {
      category: "AI & LLM Integration",
      icon: Brain,
      skills: [
        "RAG Pipelines",
        "Vector Embeddings",
        "LLM Grounding",
        "Gemini API",
      ],
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
          Skills Palette
        </motion.p>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {dockerContainers.map((container, i) => (
            <SkillContainer key={i} container={container} index={i} />
          ))}
        </div>

        {/* Terminal Background */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.03 }}
          viewport={{ once: true }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        >
          <pre className="text-primary/30 font-mono text-xs md:text-sm whitespace-pre">
            {`
    ╔════════════════════════════╗
    ║    SKILLS PALETTE v1.0     ║
    ║    Status: Running         ║
    ║    Containers: Active      ║
    ╚════════════════════════════╝
`}
          </pre>
        </motion.div>
      </div>
    </section>
  );
};
