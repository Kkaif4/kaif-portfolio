import { useNavStore } from "@/store/navStore";
import { useInView, useMotionValue, useSpring, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Github, Linkedin, Mail, Phone } from "lucide-react";

export const Contact = () => {
  const { setActiveSection } = useNavStore();
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5 });
  const buttonRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 300 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (isInView) setActiveSection("contact");
  }, [isInView, setActiveSection]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
    const maxDistance = 100;

    if (distance < maxDistance) {
      const force = (maxDistance - distance) / maxDistance;
      mouseX.set(distanceX * force * 0.3);
      mouseY.set(distanceY * force * 0.3);
    } else {
      mouseX.set(0);
      mouseY.set(0);
    }
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="py-20 px-6 min-h-screen flex items-center justify-center"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="container mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-8 text-gradient-emerald"
        >
          Let's Build Something Amazing
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto"
        >
          I'm always open to discussing new projects, creative ideas, or
          opportunities to be part of your vision.
        </motion.p>

        <motion.div
          ref={buttonRef}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          style={{ x, y }}
          className="inline-block"
        >
          <a href="mailto:mdkaif@example.com">
            <motion.button
              // AFTER
              className={`px-8 py-4 bg-primary text-xl font-bold text-background rounded-full flex items-center gap-2 transition-shadow duration-300
                        ${isHovered ? "glow-emerald-lg" : ""}`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
            </motion.button>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-6 mt-12"
        >
          <a href="mailto:mdkaif@example.com">
            <motion.div
              className="p-4 bg-card border border-border rounded-full hover:border-primary transition-colors"
              whileHover={{
                scale: 1.1,
                boxShadow: "0 0 20px rgba(16, 185, 129, 0.3)",
              }}
            >
              <Mail className="w-6 h-6" />
            </motion.div>
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <motion.div
              className="p-4 bg-card border border-border rounded-full hover:border-primary transition-colors"
              whileHover={{
                scale: 1.1,
                boxShadow: "0 0 20px rgba(16, 185, 129, 0.3)",
              }}
            >
              <Github className="w-6 h-6" />
            </motion.div>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <motion.div
              className="p-4 bg-card border border-border rounded-full hover:border-primary transition-colors"
              whileHover={{
                scale: 1.1,
                boxShadow: "0 0 20px rgba(16, 185, 129, 0.3)",
              }}
            >
              <Linkedin className="w-6 h-6" />
            </motion.div>
          </a>
          <a href="tel:+918552965115">
            <motion.div
              className="p-4 bg-card border border-border rounded-full hover:border-primary transition-colors"
              whileHover={{
                scale: 1.1,
                boxShadow: "0 0 20px rgba(16, 185, 129, 0.3)",
              }}
            >
              <Phone className="w-6 h-6" />
            </motion.div>
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-muted-foreground"
        >
          © 2025 Mohammad Kaif Shaikh. Built with React, Tailwind CSS & Framer
          Motion.
        </motion.p>
      </div>
    </section>
  );
};
