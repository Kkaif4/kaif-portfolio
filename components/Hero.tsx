import { useEffect, useRef } from "react";
import { useNavStore } from "@/store/navStore";
import { motion, useInView } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { ParticleField } from "./PracticalFields";
import { Github, Linkedin, Mail, Phone } from "lucide-react";

export const Hero = () => {
  const { setActiveSection } = useNavStore();
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5 });

  useEffect(() => {
    if (isInView) setActiveSection("hero");
  }, [isInView, setActiveSection]);

  const words = ["Mohammad", "Kaif", "Shaikh"];

  return (
    <section
      id="hero"
      ref={ref}
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
    >
      {/* Three.js Particle Background */}
      <div className="absolute inset-0 opacity-40">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <ambientLight intensity={0.5} />
          {/* MOD: For the full effect, you also need to update your ParticalField file. See below. */}
          <ParticleField />
        </Canvas>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 via-transparent to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          // MOD: Added gentle floating animation
          animate={{ opacity: 1, y: [0, -10, 0] }}
          transition={{
            duration: 1,
            y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
          }}
          className="text-center"
        >
          <motion.div className="mb-6">
            {words.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2, duration: 0.8 }}
                // MOD: Added text-glow-emerald for the unique effect
                className="text-5xl md:text-7xl lg:text-8xl font-bold inline-block mr-4 text-gradient-emerald text-glow-emerald"
              >
                {word}
              </motion.span>
            ))}
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-2xl md:text-3xl lg:text-4xl font-medium text-foreground/80 mb-6"
          >
            Full-Stack Developer
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8"
          >
            Skilled in MERN and Nest.js ecosystems, delivering scalable APIs,
            responsive UIs, and AI-driven applications
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.8 }}
            className="flex items-center justify-center gap-4"
          >
            <a href="mailto:kkaifshaikh.27@gmail.com">
              <motion.div
                className="p-3 bg-card border border-border rounded-full hover:border-primary transition-colors"
                whileHover={{
                  scale: 1.1,
                  boxShadow: "0 0 20px rgba(16, 185, 129, 0.3)",
                }}
                whileTap={{ scale: 0.9 }}
              >
                <Mail className="w-6 h-6" />
              </motion.div>
            </a>
            <a
              href="https://github.com/Kkaif4"
              target="_blank"
              rel="noopener noreferrer"
            >
              <motion.div
                className="p-3 bg-card border border-border rounded-full hover:border-primary transition-colors"
                whileHover={{
                  scale: 1.1,
                  boxShadow: "0 0 20px rgba(16, 185, 129, 0.3)",
                }}
                whileTap={{ scale: 0.9 }}
              >
                <Github className="w-6 h-6" />
              </motion.div>
            </a>
            <a
              href="https://www.linkedin.com/in/mohammad-kaif-shaikh-a4294a25a/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <motion.div
                className="p-3 bg-card border border-border rounded-full hover:border-primary transition-colors"
                whileHover={{
                  scale: 1.1,
                  boxShadow: "0 0 20px rgba(16, 185, 129, 0.3)",
                }}
                whileTap={{ scale: 0.9 }}
              >
                <Linkedin className="w-6 h-6" />
              </motion.div>
            </a>
            <a href="https://wa.me/918552965115">
              <motion.div
                className="p-3 bg-card border border-border rounded-full hover:border-primary transition-colors"
                whileHover={{
                  scale: 1.1,
                  boxShadow: "0 0 20px rgba(16, 185, 129, 0.3)",
                }}
                whileTap={{ scale: 0.9 }}
              >
                <Phone className="w-6 h-6" />
              </motion.div>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
