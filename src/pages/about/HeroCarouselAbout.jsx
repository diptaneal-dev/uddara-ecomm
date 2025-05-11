// src/components/HeroCarouselAbout.jsx
import React from "react";
import { BasicHeroCarousel } from "react-vector"; // assumes updated BasicHeroCarousel is exported

export const HeroCarouselAbout = ({ onKnowMore }) => {
  const slides = [
    {
      image: "/images/uddara_teamwork.png",
      title: "About UDDARA",
      subtitle: "Visionary Force in Domestic & Global Trade",
      titleColor: "#fff",
      subtitleColor: "#eee",
      captionProps: {
        background: "rgba(0, 0, 0, 0.6)",
        maxWidth: "600px",
        bottom: "10%",
        left: "5%",
        padding: "1.5rem",
      },
      buttons: onKnowMore
        ? [
            {
              text: "Know More",
              variant: "filled",
              color: "#BF437E",
              onClick: onKnowMore,
            },
          ]
        : [],
    },
  ];

  return <BasicHeroCarousel slides={slides} autoScrollDelay={999999} />;
};
