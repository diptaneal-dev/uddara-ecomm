import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import TestimonialCarousel from '../testimonials/TestimonialCarousel';
import AboutBrand from '../home/AboutBrand';
import 'bootstrap/dist/css/bootstrap.min.css';
import WhyChooseUddara from '../home/WhyChooseUddara';
import FeaturedProduct from '../product/FeaturedProduct';
import HomePageHero from '../../layouts/herosection/HomePageHero';
import BrandShowcase from '../product/product_display/pages/BrandShowcase';
import StaticBlogsSummarySection from '../blogstatic/StaticBlogsSummarySection';

const LandingPage = () => {
    const { darkMode } = useTheme();

    return (
        <div className={`container-fluid px-0 ${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}>

            {/* Hero Section with Carousel */}
            <HomePageHero />

            <BrandShowcase />

            <FeaturedProduct />

            {/* About Brand Section */}
            <AboutBrand />

            <WhyChooseUddara />

            <TestimonialCarousel />

            <StaticBlogsSummarySection />
        </div>
    );
}

export default LandingPage;