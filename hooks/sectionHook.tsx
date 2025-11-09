import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useNavStore } from "@/store/navStore";

// Define the section IDs
type SectionId =
  | "hero"
  | "about"
  | "experience"
  | "projects"
  | "skills"
  | "contact";

export const useSectionInView = (sectionId: SectionId, threshold = 0.5) => {
  // `useInView` returns a ref and a boolean (inView)
  const { ref, inView } = useInView({
    threshold, // Section is "active" when 50% is visible
  });

  const { setActiveSection } = useNavStore();

  useEffect(() => {
    // When the section comes into view, update the store
    if (inView) {
      console.log("HOOK: Section in view:", sectionId); // Debug log
      setActiveSection(sectionId);
    }
  }, [inView, setActiveSection, sectionId]);

  return { ref }; // We only need to return the ref
};
