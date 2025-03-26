// src/components/home/TestimonialCarousel.jsx
import React from "react";
import Slider from "react-slick";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import testimonials from "../../data/testimonials";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import {
    Section,
    Heading,
    SlideCard,
    TestimonialText,
    AuthorBlock,
    AuthorName,
    AuthorPlace,
    Arrow
} from "./TestimonialCarousel.styles";

// Custom Arrow Components
const NextArrow = ({ onClick }) => (
    <Arrow className="next" onClick={onClick}>
        <FaArrowRight />
    </Arrow>
);

const PrevArrow = ({ onClick }) => (
    <Arrow className="prev" onClick={onClick}>
        <FaArrowLeft />
    </Arrow>
);

const TestimonialCarousel = () => {
    const settings = {
        arrows: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 2 } },
            { breakpoint: 768, settings: { slidesToShow: 1 } },
        ],
    };

    return (
        <Section>
            <div className="container position-relative">
                <Heading>What Our Customers Say...</Heading>
                <Slider {...settings}>
                    {testimonials.map((testimonial) => (
                        <div key={testimonial.id} className="px-3 my-4">
                            <SlideCard>
                                <TestimonialText>“{testimonial.review}”</TestimonialText>

                                <AuthorBlock>
                                    <AuthorName>{testimonial.name}</AuthorName>
                                    <AuthorPlace>{testimonial.place}</AuthorPlace>
                                </AuthorBlock>
                            </SlideCard>
                        </div>
                    ))}
                </Slider>
            </div>
        </Section>
    );
};

export default TestimonialCarousel;
