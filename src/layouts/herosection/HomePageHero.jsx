import React from "react";
import { BasicHeroCarousel } from "react-vector";

const slides = [
  {
    image: "/images/HeroCarousel1.png",
    title: "Introducing Foxnut Feast!",
    subtitle: "Wholesome, crunchy, and crafted with care — your new favorite healthy snack.",
},
  {
    image: "/images/MakhanaCarousel1.png",
    title: "A New Chapter Begins",
    subtitle: "Diverse flavors. Singular quality. Explore our new family of brands.",
  },
];

const HomePageHero = () => (
    <BasicHeroCarousel slides={slides} />
);

export default HomePageHero;
