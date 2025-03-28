import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import TestimonialCarousel from '../testimonials/TestimonialCarousel';
import AboutBrand from '../home/AboutBrand';
import BlogsSummarySection from '../blog/BlogsSummarySection';
import LandingPageHeroSection from '../../layouts/herosection/LandingPageHeroSection';
import 'bootstrap/dist/css/bootstrap.min.css';
import WhyChooseUddara from '../home/WhyChooseUddara';
import FeaturedProduct from '../product/FeaturedProduct';

const LandingPage = () => {
    const { darkMode } = useTheme();

    return (
        <div className={`container-fluid px-0 ${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}>

            {/* Hero Section with Carousel */}
            <LandingPageHeroSection />

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