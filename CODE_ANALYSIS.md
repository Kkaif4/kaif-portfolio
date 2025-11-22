# Codebase Analysis

This document provides a comprehensive analysis of the portfolio website codebase.

## Project Overview

This is a personal portfolio website built with Next.js, TypeScript, and Tailwind CSS. It showcases the developer's skills, experience, and projects. The website has a modern, dark theme with green accents and features several interactive elements and animations powered by Framer Motion.

## Directory Structure

The codebase is organized into the following directories:

-   **/app**: Contains the main application logic, including the root layout, pages, and global styles.
-   **/components**: Contains all the React components used in the application, organized into subdirectories by feature.
-   **/data**: Contains the data for the experiences, projects, and tech nodes sections.
-   **/hooks**: Contains custom React hooks.
-   **/lib**: Contains utility functions.
-   **/public**: Contains static assets such as images and icons.
-   **/types**: Contains custom TypeScript type definitions.

## Component Breakdown

### /app

-   **layout.tsx**: The root layout of the application. It sets up the HTML structure, fonts, and global styles.
-   **page.tsx**: The main page of the application. It renders all the different sections of the portfolio, including the hero, about, skills, projects, education, and contact sections.
-   **globals.css**: Contains the global styles for the application, including Tailwind CSS imports and custom variable definitions.

### /components

-   **Contact.tsx**: The contact section of the portfolio. It includes a "magnetic" button effect that attracts the button towards the mouse cursor.
-   **Education.tsx**: The education and code philosophy section. It features 3D hover animations on the education and philosophy cards.
-   **Header.tsx**: The sticky header of the application. It contains the developer's initials and a "Download Resume" button.
-   **Layout.tsx**: This component appears to be a duplicate or misplaced component, as its content is very similar to `Projects.tsx`.
-   **NavLink.tsx**: A reusable NavLink component that handles active states for navigation links.
-   **PracticalFields.tsx**: A particle field component that renders a 3D particle animation using React Three Fiber.
-   **PreLoader.tsx**: A preloader component that is displayed while the application is loading.
-   **ResumeButton.tsx**: A button component that triggers the download of the resume. It opens a modal to collect user information before downloading.
-   **ResumeDownloadModal.tsx**: A modal component that collects the user's name and reason for downloading the resume.
-   **ScrollTop.tsx**: A button that appears when the user scrolls down the page and allows them to scroll back to the top.
-   **Skills.tsx**: The skills and technologies section. It displays a grid of "Docker containers," each representing a skill category.

#### /components/About

-   **About.tsx**: The "About Me" section of the portfolio. It includes a brief introduction and a "Why Hire Me?" section with three key points.

#### /components/experience

-   **Experience.tsx**: A simple wrapper component for the experience section.
-   **experienceTree.tsx**: The main component for the experience section. It displays a vertical timeline of work experiences that can be expanded to show more details.
-   **SpringToggle.tsx**: A reusable component for the expand/collapse button with a spring animation.

#### /components/Hero

-   **Hero.tsx**: The main hero section of the portfolio. It features a particle field background, an animated role title, and a tagline. It also displays a set of floating tech nodes.
-   **SocialLinks.tsx**: A bar of social media icons with tooltips and a ripple effect on hover.

#### /components/projects

-   **Projects.tsx**: The main component for the projects section. It lays out the experience tree and the projects section.
-   **ProjectBlock.tsx**: Displays a grid of colored blocks representing projects.
-   **ProjectFigure.tsx**: Shows an illustration that changes based on user interaction.
-   **ProjectModal.tsx**: A modal that displays project details when a block is clicked.

#### /components/ui

-   **Button.tsx**: A reusable button component with different variants and sizes.
-   **Input.tsx**: A reusable input component.
-   **Textarea.tsx**: A reusable textarea component.

### /data

-   **experiences.data.ts**: Contains an array of work experiences.
-   **projects.data.ts**: Contains an array of project details.
-   **techNodes.data.ts**: Contains an array of technologies with their icons, colors, and coordinates for the hero section's floating nodes.

### /hooks

-   **use-mobile.tsx**: Provides a `useIsMobile` hook to detect if the user is on a mobile device.
-   **use-toast.ts**: Provides a `useToast` hook for displaying toast notifications.

### /lib

-   **utils.ts**: Contains a `cn` utility function for merging Tailwind CSS classes.

### /types

-   **project.type.ts**: Defines the `Project` interface.
-   **techNode.type.ts**: Defines the `TechNode` interface.
