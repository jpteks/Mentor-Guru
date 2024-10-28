"use client";

import { HoverEffect } from "@/components/ui/card-hover-effect";

export function CardHover() {
  return (
    <div className='max-w-5xl mx-auto px-8'>
      <HoverEffect items={projects} />
    </div>
  );
}
export const projects = [
  {
    title: "Content Created by Industry Experts",
    description:
      "A technology company that builds economic infrastructure for the internet.",
    link: "",
  },
  {
    title: " Practical Projects & Assignments",
    description:
      "A streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.",
    link: "",
  },
  {
    title: "Interactive Learning Experience",
    description:
      "A multinational technology company that specializes in Internet-related services and products.",
    link: "",
  },
  {
    title: "Community & Collaboration",
    description:
      "A technology company that focuses on building products that advance Facebook's mission of bringing the world closer together.",
    link: "",
  },
];
