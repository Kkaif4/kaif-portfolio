"use client";

import { useMemo, useState } from "react";
import { projects } from "@/data/projects.data";
import { ExperienceTree } from "./experience/experienceTree";
import { ProjectsBLocks } from "./projects/ProjectBlock";
import { ProjectFigure } from "./projects/ProjectFigure";
import { ProjectModal } from "./projects/ProjectModal";
import { Project } from "@/types/project.type";
import { Hero } from "./Hero/Hero";
import { About } from "./About/About";

export default function Layout() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [showLikePrompt, setShowLikePrompt] = useState(false);

  const projectBlocks = useMemo(() => {
    return projects.map((project) => ({
      ...project,
      size: 100 * (0.9 + Math.random() * 0.2),
    }));
  }, []);

  const hoveredColor =
    hoveredIndex !== null ? projectBlocks[hoveredIndex].color : null;

  return (
    <>
      <Hero />
      <About />
      <Layout />
      <main
        className="
        flex flex-col lg:flex-row
        justify-between items-start
        w-full min-h-screen
        px-6 lg:px-20 py-16
        gap-12 lg:gap-24
      "
      >
        {/* LEFT — Experience (more space) */}
        <section className="flex-[0.65] flex justify-center items-start">
          <div className="w-full max-w-[720px]">
            <ExperienceTree />
          </div>
        </section>

        {/* RIGHT — Projects */}
        <section className="flex-[0.35] flex justify-end items-start relative">
          <div className="flex items-start justify-between w-full gap-6">
            {/* Project Blocks */}
            <div className="flex-shrink-0">
              <ProjectsBLocks
                setSelected={setSelected}
                setHoveredIndex={setHoveredIndex}
                setShowLikePrompt={setShowLikePrompt}
              />
            </div>

            {/* Project Figure */}
            <div className="flex-shrink-0 sticky top-10 z-[999]">
              <ProjectFigure
                showHint={hoveredIndex !== null}
                hoveredColor={hoveredColor}
                showLikePrompt={showLikePrompt}
              />
            </div>
          </div>

          {/* Modal */}
          {selected && (
            <ProjectModal
              project={selected}
              onClose={() => {
                setSelected(null);
                setShowLikePrompt(false);
              }}
            />
          )}
        </section>
      </main>
    </>
  );
}
