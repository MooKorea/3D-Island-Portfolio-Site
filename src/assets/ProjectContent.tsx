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
}

const VGDC: project = {
    label: "VGDC",
    title: "Video Game Development Club Website",
    link: "https://vgdc.club/",
    shortDescription: "Website for the UMN's Video Game Development Club",
    icon: <VGDCIcon scale={0.4} rotation={[0.4, 0, 0]}/>
};

const Genvisis: project = {
    label: "Genvisis",
    title: "Genvisis Website",
    link: "https://genvisis.org/",
    shortDescription: "Website for the Genvisis Software",
    icon: <GenvisisIcon scale={0.3} rotation={[1, 0, 0]}/>
};

const DystopianDefiers: project = {
    label: "Dystopian Defiers",
    title: "Dystopian Defiers Video Game",
    link: "https://boschybee.itch.io/dystopian-defiers",
    shortDescription: "Small group video game made at VGDC",
    icon: <DystopianIcon scale={0.45} rotation={[-0.3, 0, 0]}/>
}

const Baratie: project = {
    label: "Baratie",
    title: "Eat at the Baratie!",
    link: "https://visitbaratie.web.app/",
    shortDescription: "Eat at the Baratie! Personal web project",
    icon: <BaratieIcon scale={0.5} rotation={[-0.3, 0.5, -0.5]} />
}

export const projectData = [VGDC, Genvisis, DystopianDefiers, Baratie];
