import { DystopianIcon } from "./DystopianIcon";
import { GenvisisIcon } from "./GenvisisIcon";
import { VGDCIcon } from "./VGDCIcon";
import { BaratieIcon } from "./BaratieIcon";
import { ReactElement } from "react";

export type project = {
  label: string;
  title: string;
  shortDescription: string;
  link: string;
  icon: ReactElement;
  description: string;
}

const VGDC: project = {
    label: "VGDC",
    title: "Video Game Development Club Website",
    link: "https://vgdc.club/",
    shortDescription: "Website for the UMN's Video Game Development Club",
    icon: <VGDCIcon scale={0.4} rotation={[0.4, 0, 0]} />,
    description: "Designed and developed the full-stack web application, vgdc.club, for the Video Game Development Club at the University of Minnesota. Utilized Typescript, Next.js 14, React, Tailwind, and the Discord API to integrate a serverless Discord bot for automated tasks. Utilized the Contentful CMS and server-side rendering for efficient content delivery, site performance, and search engine optimization (SEO)."
};

const Genvisis: project = {
    label: "Genvisis",
    title: "Genvisis Website",
    link: "https://genvisis.org/",
    shortDescription: "Website for the Genvisis Software",
    icon: <GenvisisIcon scale={0.3} rotation={[1, 0, 0]} />,
    description: "Designed and developed the website for Genvisis—a software package for processing and visualizing genomic data—using Figma, React, Vite, and SCSS. Utilized Github Actions and Node.js for automated building and deployment."
};

const DystopianDefiers: project = {
    label: "Dystopian Defiers",
    title: "Dystopian Defiers Video Game",
    link: "https://andykhanh.vercel.app/dystopian-defiers",
    shortDescription: "Small group video game made at VGDC",
    icon: <DystopianIcon scale={0.45} rotation={[-0.3, 0, 0]} />,
    description: "Dystopian Defiers is a 3D action-shooter video game created at UMN Video Game Development Club. I was responsible for creating the 3D character and enemy models, animations, UI, visual effects, and environment art."
}

const Baratie: project = {
    label: "Baratie",
    title: "Eat at the Baratie!",
    link: "https://visitbaratie.web.app/",
    shortDescription: "Eat at the Baratie! Personal web project",
    icon: <BaratieIcon scale={0.5} rotation={[-0.3, 0.5, -0.5]} />,
    description: "Baratie is a fan-made site for the One Piece live action show. It was made using Vanilla JS, SCSS, Anime.js, and Firebase."
}

export const projectData = [VGDC, Genvisis, DystopianDefiers, Baratie];
