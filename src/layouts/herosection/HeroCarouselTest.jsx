// HeroCarouselWrapper.jsx
import React, { useState, useEffect } from "react";
import { HeroCarousel } from "react-vector";

const HeroCarouselWrapper = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const handleResize = () => setIsMobile(mediaQuery.matches);

    handleResize();
    mediaQuery.addEventListener("change", handleResize);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  const slides = [
    {
      image: isMobile
        ? "/images/MakhanaCarousel2_mobile.png"
        : "/images/HeroCarousel1.png",
      theme: "light",
      vPosition: "top",
      hPosition: "center",
    },
    {
      image: isMobile
        ? "/images/MakhanaCarousel1_mobile.png"
        : "/images/MakhanaCarousel1.png",
      theme: "light",
      vPosition: "top",
      hPosition: "center",
    },
  ];

  return (
    <CarouselContainer>
      <HeroCarousel height="660px" slides={slides} showCaptions={false} />
    </CarouselContainer>
  );
};

export default HeroCarouselWrapper;
