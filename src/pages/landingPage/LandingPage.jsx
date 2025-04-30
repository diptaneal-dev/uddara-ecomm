import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import TestimonialCarousel from '../testimonials/TestimonialCarousel';
import AboutBrand from '../home/AboutBrand';
import BlogsSummarySection from '../blog/BlogsSummarySection';
import HeroCarouselSection from '../../layouts/herosection/HeroCarouselSection';
import 'bootstrap/dist/css/bootstrap.min.css';
import WhyChooseUddara from '../home/WhyChooseUddara';
import FeaturedProduct from '../product/FeaturedProduct';
import HeroCarouselWrapper from '../../layouts/herosection/HeroCarouselTest';

const LandingPage = () => {
    const { darkMode } = useTheme();

    return (
        <div className={`container-fluid px-0 ${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}>

            {/* Hero Section with Carousel */}
            <HeroCarouselWrapper />

            <FeaturedProduct />

            {/* About Brand Section */}
            <AboutBrand />

            <WhyChooseUddara />

            <BlogsSummarySection />

            <TestimonialCarousel />

        </div>
    );
}

export default LandingPage;