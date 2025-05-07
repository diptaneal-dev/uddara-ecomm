// HeroCarouselWrapper.jsx
import React from "react";
import { HeroCarousel } from "react-vector";

const slides = [
  {
    image: "/images/MakhanaCarousel2.png",
    theme: "light",
    vPosition: "top", 
    hPosition: "center"
  },
  {
    image: "/images/MakhanaCarousel1.png",
    theme: "light",
    vPosition: "top", 
    hPosition: "center"
  },
];

const HeroCarouselWrapper = () => {
  return (
    <HeroCarousel
      height="500px"
      slides={slides}
      showCaptions={false}
    />
  );
};

export default HeroCarouselWrapper;
