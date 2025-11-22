"use client";

import { useMemo, useState } from "react";
import { projects } from "@/data/projects.data";
import { ProjectModal } from "./ProjectModal";
import { Project } from "@/types/project.type";
import { ProjectFigure } from "./ProjectFigure";
import { ProjectsBLocks } from "./ProjectBlock";
import { ExperienceTree } from "../experience/experienceTree";

export default function Projects() {
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
    <main
      className="
        flex flex-col lg:flex-row
        justify-between items-start
        w-full min-h-screen
        px-6 lg:px-20 py-12
        gap-12 lg:gap-24
      "
    >
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
  );
}
