import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Download } from "lucide-react";

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  // const [isHovered, setIsHovered] = useState(false); // No longer needed

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-lg border-b border-border"
          : ""
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            className="text-2xl font-bold text-gradient-emerald"
            whileHover={{ scale: 1.05 }}
          >
            MKS.
          </motion.div>

          <motion.a
            href="/MdKaifResume.pdf"
            download
            className={`px-8 py-4 bg-primary text-xl font-bold text-background rounded-full flex items-center gap-2 transition-shadow duration-300`}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 60px rgba(16, 185, 129, 0.6)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Resume</span>
          </motion.a>
        </div>
      </nav>
    </motion.header>
  );
};
