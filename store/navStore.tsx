import { create } from "zustand";

type SectionId =
  | "hero"
  | "about"
  | "experience"
  | "projects"
  | "skills"
  | "contact";

type NavStore = {
  activeSection: SectionId;
  setActiveSection: (section: SectionId) => void;
};

export const useNavStore = create<NavStore>((set) => ({
  activeSection: "hero", // Default to 'hero' when the page loads
  setActiveSection: (section) => set({ activeSection: section }),
}));
