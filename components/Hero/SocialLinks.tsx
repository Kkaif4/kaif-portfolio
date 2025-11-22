import React, { useState } from "react";
import {
  motion,
  AnimatePresence, // Import AnimatePresence
} from "framer-motion";
import { Mail, Github, Linkedin, MessageCircle } from "lucide-react"; // Added MessageCircle

// 1. --- NEW COMPONENT to manage hover state ---
type SocialLinkProps = {
  icon: React.ReactNode;
  link: string;
  name: string; // The new name prop for the tooltip
};

export const SocialLink: React.FC<SocialLinkProps> = ({ icon, link, name }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="relative"
      // Set hover state
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      // Original animations
      whileHover={{ scale: 1.2, rotate: 5, y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 10 }}
    >
      {/* Icon */}
      <motion.div
        className="p-3 bg-card border border-border rounded-full hover:border-primary transition-colors"
        whileHover={{
          boxShadow: "0 0 25px rgba(16,185,129,0.4)",
        }}
      >
        {icon}
      </motion.div>

      {/* Ripple Effect */}
      <motion.div
        className="absolute inset-0 rounded-full border border-emerald-400/40"
        initial={{ scale: 1, opacity: 0 }}
        whileHover={{ scale: 1.5, opacity: 1 }}
        transition={{ duration: 0.4 }}
      />

      {/* --- 2. FUTURISTIC TOOLTIP --- */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-3 py-1 rounded-md whitespace-nowrap"
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.2, ease: "easeOut" },
            }}
            exit={{
              opacity: 0,
              y: 10,
              transition: { duration: 0.15, ease: "easeIn" },
            }}
          >
            {/* Tooltip triangle/arrow */}
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45" />
            <span
              className="text-sm font-medium text-emerald-400"
              style={{
                textShadow: `
                    0 0 6px #34d399,
                    0 0 12px #34d399,
                    0 0 24px #34d399
                  `,
              }}
            >
              {name}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.a>
  );
};

// --- 3. UPDATED MAIN COMPONENT ---
export function SocialIconBar() {
  // Renamed for clarity

  // Add the 'name' property to your data
  const socialLinks = [
    {
      icon: <Mail className="w-6 h-6" />,
      link: "mailto:kkaifshaikh.27@gmail.com",
      name: "Email",
    },
    {
      icon: <Github className="w-6 h-6" />,
      link: "https://github.com/Kkaif4",
      name: "GitHub",
    },
    {
      icon: <Linkedin className="w-6 h-6" />,
      link: "https://www.linkedin.com/in/mohammad-kaif-shaikh-a4294a25a/",
      name: "LinkedIn",
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      link: "https://wa.me/918552965115",
      name: "WhatsApp",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.6, duration: 0.8 }}
      className="flex items-center justify-center gap-6"
    >
      {/* Map over the new data and use the new component */}
      {socialLinks.map((link, i) => (
        <SocialLink
          key={i}
          icon={link.icon}
          link={link.link}
          name={link.name}
        />
      ))}
    </motion.div>
  );
}
