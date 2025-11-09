import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { useNavStore } from "@/store/navStore";

export const Header = () => {
  const { activeSection } = useNavStore();
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

          <div className="hidden md:flex items-center gap-1 bg-card/50 rounded-full p-1 relative">
            {navItems.map((item) => (
              <motion.a
                key={item.id}
                href={`#${item.id}`}
                className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors z-10 ${
                  activeSection === item.id
                    ? "text-background"
                    : "text-foreground hover:text-primary"
                }`}
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.6 }}
              >
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 bg-primary rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}

                <span
                  className={`relative z-10 py-2 transition-all duration-300 ${
                    activeSection === item.id
                      ? "text-teal-500 border-b-4 border-teal-500"
                      : "inherit"
                  }`}
                >
                  {item.label}
                </span>
              </motion.a>
            ))}
          </div>

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
