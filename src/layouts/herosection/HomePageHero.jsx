import React from "react";
import { BasicHeroCarousel } from "react-vector";

const slides = [
  {
    image: "/images/HeroCarousel1.png",
    title: "Welcome to Our Platform",
    subtitle: "Delivering value with innovation and care.",
  },
  {
    image: "/images/MakhanaCarousel1.png",
    title: "Built for Every Device",
    subtitle: "Optimized for performance, built for responsiveness.",
  },
];

const HomePageHero = () => (
    <BasicHeroCarousel slides={slides} />
);

export default HomePageHero;
