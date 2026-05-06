// src/types/project.ts
export interface Project {
  title: string;
  description: string;
  tags: string[];
  bullets: string[];
  github: string;
  demo: string | null;
  color: string;
  shadow: string;
}
