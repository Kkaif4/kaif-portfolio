"use client";

import { useRef } from "react";

import { motion } from "framer-motion";

import { ExperienceTree } from "./experienceTree";

export const Experience = () => {
  const ref = useRef(null);
  return (
    <section id="experience" ref={ref} className="py-10 relative">
      <div className="container mx-auto">
        <ExperienceTree />
      </div>
    </section>
  );
};
