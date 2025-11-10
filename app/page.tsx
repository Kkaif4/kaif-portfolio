"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Header } from "@/components/Header";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { EducationPhilosophy as Education } from "@/components/Education";
import { Skills } from "@/components/Skills";
import { Contact } from "@/components/Contact";
import { ScrollToTop } from "@/components/ScrollTop";
import { PreLoader } from "@/components/PreLoader";
import Projects from "@/components/projects/Projects";
import { Hero } from "@/components/Hero/Hero";

const queryClient = new QueryClient();

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      {loading && <PreLoader onComplete={() => setLoading(false)} />}

      {!loading && (
        <>
          <Header />
          <main>
            <Hero />
            <About />
            <Experience />
            <Projects />
            <Education />
            <Skills />
            <Contact />
          </main>

          <ScrollToTop />
        </>
      )}
    </QueryClientProvider>
  );
}
