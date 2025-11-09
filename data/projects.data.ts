// src/data/projects.ts

import { Project } from "@/types/project.type";

export const projects: Project[] = [
  {
    title: "OptiLife",
    description:
      "Full-stack healthcare platform for secure diet/workout plan generation...",
    tags: ["MongoDB", "Express", "React", "Node.js", "Gemini API"],
    github: "https://github.com",
    demo: "https://demo.com",
    color: "#10b981",
    shadow: "rgba(16, 185, 129, 0.3)",
  },
  {
    title: "Corporate Landing Page",
    description: "High-performance Next.js landing page with Zod validation...",
    tags: ["Next.js", "Zod", "reCAPTCHA v3", "TypeScript"],
    github: "https://github.com",
    demo: "https://demo.com",
    color: "#f7b40f",
    shadow: "rgba(247, 180, 15, 0.3)",
  },
  {
    title: "Railway Ticket Booking System",
    description:
      "Backend API for ticket booking, seat management, and fare calculation...",
    tags: ["Express.js", "MongoDB", "JWT", "REST API"],
    github: "https://github.com",
    demo: null,
    color: "#f03d3d",
    shadow: "rgba(240, 61, 61, 0.3)",
  },
  {
    title: "ReqForgeAI",
    description:
      "AI-powered requirement analysis platform with automated Word document generation...",
    tags: ["MERN", "Gemini API", "Cloudinary", "AI"],
    github: "https://github.com",
    demo: "https://demo.com",
    color: "#3b82f6",
    shadow: "rgba(59, 130, 246, 0.3)",
  },
];
