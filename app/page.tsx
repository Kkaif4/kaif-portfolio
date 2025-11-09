"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/projects/Projects";
import { EducationPhilosophy as Education } from "@/components/Education";
import { Skills } from "@/components/Skills";
import { Contact } from "@/components/Contact";
import { ScrollToTop } from "@/components/ScrollTop";
import { PreLoader } from "@/components/PreLoader";

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
