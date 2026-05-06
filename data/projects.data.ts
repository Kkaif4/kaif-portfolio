import { Project } from "@/types/project.type";

export const projects: Project[] = [
  {
    title: "Restaurant Management / POS System",
    description:
      "Enterprise-grade NestJS/MongoDB POS backend using Domain-Driven Design for complex business logic, real-time order sync, and automated data archival.",
    tags: [
      "NestJS",
      "MongoDB",
      "DDD",
      "WebSockets",
      "AWS S3",
      "Redis",
      "Jest",
      "Playwright",
      "GitHub Actions",
    ],
    bullets: [
      "Planned a NestJS/MongoDB POS backend using DDD to manage complex business logic and ensure long-term maintainability.",
      "Integrated WebSockets for real-time order synchronization and AWS S3 with Cron Jobs for mechanized data archival and reporting.",
      "Refined system performance using Redis caching and ensured transaction reliability through Idempotent API design.",
      "Wrote 120+ unit tests (Jest) and 15 E2E tests (Playwright), achieving 92% code coverage, automated via GitHub Actions with <5 min CI pipeline runtime.",
    ],
    github: "https://github.com",
    demo: null,
    color: "#10b981",
    shadow: "rgba(16, 185, 129, 0.3)",
  },
  {
    title: "AI Powered Requirement Analysis Tool",
    description:
      "RAG pipeline using Gemini API + vector embeddings for automated requirement extraction from PDFs, reducing processing time by 73%.",
    tags: [
      "Gemini API",
      "RAG Pipeline",
      "Vector Embeddings",
      "Puppeteer",
      "DDD",
      "Vercel",
      "Cloudinary",
    ],
    bullets: [
      "Built RAG pipeline using Gemini API + vector embeddings (chunked PDFs into 512-token segments), reducing requirement extraction time from 15 min to 4 min per document (73% faster).",
      "Executed a RAG pipeline with Vector Embeddings and Grounding to increase contextual accuracy by 25%.",
      "Computerized PDF report generation via Puppeteer within a DDD-aligned service architecture to eliminate manual formatting.",
      "Deployed on Vercel using Cloudinary for scalable and high-availability asset management.",
    ],
    github: "https://github.com",
    demo: "https://reqforgeai.vercel.app",
    color: "#3b82f6",
    shadow: "rgba(59, 130, 246, 0.3)",
  },
  {
    title: "Health & Fitness Planning Platform",
    description:
      "AI-powered React/Node.js platform for health recommendations using LLM Grounding, processing 1,000+ plans with strict data protection.",
    tags: ["React", "Node.js", "OOP", "LLM Grounding", "RESTful API"],
    bullets: [
      "Designed a React/Node.js platform using OOP principles, reducing code redundancy by 30% for future extensibility.",
      "Created AI workflows for health recommendations using LLM Grounding, processing 1,000+ plans with strict data protection.",
      "Boosted system scalability by applying reusable service layers and a strict RESTful architecture.",
    ],
    github: "https://github.com",
    demo: "https://health-care-henna-alpha.vercel.app",
    color: "#f7b40f",
    shadow: "rgba(247, 180, 15, 0.3)",
  },
  {
    title: "School Management System",
    description:
      "Full-stack MERN school management system that reduced administrative overhead by 50% with configurable institution-specific modules.",
    tags: ["MERN", "MongoDB", "REST API", "Schema Design"],
    bullets: [
      "Constructed a school management system using the MERN stack, reducing administrative overhead by 50%.",
      "Fine-tuned configurable, institution-specific modules to adapt to varying academic workflows and data requirements.",
      "Organized student document generation, accelerating administrative processing speed by 3x.",
      "Assembled scalable schemas and APIs refined for long-term performance and high-volume data maintenance.",
    ],
    github: "https://github.com",
    demo: null,
    color: "#8b5cf6",
    shadow: "rgba(139, 92, 246, 0.3)",
  },
  {
    title: "Employee Management System",
    description:
      "Scalable Angular SPA with modular architecture, role-based auth, interactive dashboards, and real-time UI updates using RxJS and WebSockets.",
    tags: [
      "Angular",
      "Angular Material",
      "Chart.js",
      "RxJS",
      "NgRx",
      "WebSockets",
    ],
    bullets: [
      "Built a scalable SPA using Angular with modular architecture, lazy loading, and OnPush change detection for performance optimization.",
      "Implemented role-based authentication using Angular Guards, HTTP Interceptors, and secure route handling.",
      "Developed dynamic and reactive forms (FormGroup, FormArray, custom validators) for employee and leave management workflows.",
      "Created real-time UI updates using RxJS Observables, Subjects, and WebSockets for notifications and live data sync.",
      "Designed interactive dashboards with charts and analytics using Chart.js and Angular Material.",
      "Improved performance using virtual scrolling, trackBy, caching, and efficient state management with RxJS/NgRx.",
    ],
    github: "https://github.com",
    demo: null,
    color: "#f03d3d",
    shadow: "rgba(240, 61, 61, 0.3)",
  },
];
