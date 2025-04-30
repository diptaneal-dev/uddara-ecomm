// src/components/HeroCarouselAbout.jsx
import React from "react";
import { HeroCarousel } from "react-vector";

const HeroCarouselAbout = ({ onKnowMore }) => {
  const slides = [
    {
      image: "/images/uddara_teamwork.png",
      title: "About UDDARA",
      subtitle: "Visionary Force in Domestic & Global Trade",
      captionTheme: "dark",
      layout: "left",
      captionSize: "600px",
      buttons: [
        {
          text: "Know More",
          variant: "filled",
          color: "#BF437E",
          iconRight: "ArrowRight",
          onClick: onKnowMore, // ✅ use prop instead of scroll
        },
      ],
    },
  ];

  return (
    <HeroCarousel
      slides={slides}
      autoScrollDelay={8000}
      height="100vh"
      showCaptions
    />
  );
};

export default HeroCarouselAbout;
