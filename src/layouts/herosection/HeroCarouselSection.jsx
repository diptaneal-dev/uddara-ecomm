import React, { useRef, useState, useEffect } from "react";
import "./HeroCaptions.css";
import "./HeroCarouselSection.css";
import { FaBars } from "react-icons/fa";
import { motion, useInView } from "framer-motion";

import ScrollDots from "./ScrollDots";

const slides = [
    {
        img: "/images/DreamBig.png",
        title: "Wholesome Crunch, Anytime Delight!",
        description: "Enjoy the timeless taste of roasted Makhana – light, crunchy, and full of flavor.",
        theme: "dark",
        layout: "right",
        topOffset: "10%", 
        captionTheme: "light",
    },
    {
        img: "/images/BelieveAchieve.png",
        title: "Start Strong, Snack Smart.",
        description: "Fuel your mornings with protein-rich Makhana - the perfect power-up for breakfast bowls.",
        theme: "light",
        layout: "right",
        topOffset: "10%",
        captionTheme: "light",

    },
    {
        img: "/images/herosection_6.webp",
        title: "Snack on the Move.",
        description: "Stay light, stay energized – Makhana is your go-to healthy partner for active days.",
        theme: "dark",
        layout: "left",
        topOffset: "15%",
        captionTheme: "light",

    },
];



const HeroCarouselSection = () => {
    const scrollRef = useRef();
    const navRef = useRef();
    const [menuOpen, setMenuOpen] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const dragRef = useRef();
    const [dragConstraints, setDragConstraints] = useState({ right: 0, left: 0 });

    useEffect(() => {
        const scrollEl = scrollRef.current;
        const dragEl = dragRef.current;
        const totalWidth = dragEl.scrollWidth;
        const containerWidth = scrollEl.offsetWidth;

        // Set drag bounds
        setDragConstraints({
            left: -(totalWidth - containerWidth),
            right: 0,
        });
    }, []);

    useEffect(() => {
        const scrollEl = scrollRef.current;
        const slideWidth = scrollEl.offsetWidth;

        let autoScroll = setInterval(() => {
            setCurrentSlide((prev) => {
                const nextSlide = (prev + 1) % slides.length;
                scrollEl.scrollTo({
                    left: nextSlide * slideWidth,
                    behavior: "smooth",
                });
                return nextSlide;
            });
        }, 5000); // 5 seconds per slide

        // Cleanup
        return () => clearInterval(autoScroll);
    }, []);

    const scrollToSlide = (index) => {
        const scrollEl = scrollRef.current;
        const slideWidth = scrollEl.offsetWidth;
        scrollEl.scrollTo({
            left: index * slideWidth,
            behavior: "smooth",
        });
    };

    // Track slide index manually
    useEffect(() => {
        const handleScroll = () => {
            const scrollLeft = scrollRef.current.scrollLeft;
            const width = scrollRef.current.offsetWidth;
            const newIndex = Math.round(scrollLeft / width);
            setCurrentSlide(newIndex);

            // Theme switching
            const theme = slides[newIndex]?.theme;
            if (theme === "light") {
                navRef.current.classList.add("light-nav");
            } else {
                navRef.current.classList.remove("light-nav");
            }
        };

        const scrollEl = scrollRef.current;
        scrollEl.addEventListener("scroll", handleScroll);
        return () => scrollEl.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="hero-carousel-container">
            {/* Nav */}
            <nav ref={navRef} className="nav-overlay">
                <div className="logo">MAKHANA</div>
                <div className="burger" onClick={() => setMenuOpen(!menuOpen)}>
                    <FaBars />
                </div>
                {menuOpen && (
                    <div className="mobile-menu">
                        <a href="#">Home</a>
                        <a href="#">Shop</a>
                        <a href="#">About</a>
                        <a href="#">Contact</a>
                    </div>
                )}
            </nav>

            {/* Scroll Carousel */}
            <div className="scroll-outer" ref={scrollRef}>
                <motion.div
                    className="scroll-carousel"
                    drag="x"
                    dragConstraints={dragConstraints}
                    ref={dragRef}
                    dragElastic={0.1}
                >
                    {slides.map((slide, index) => {
                        const slideRef = useRef(null);
                        const isInView = useInView(slideRef, {
                            margin: "-50% 0px -50% 0px",
                            once: false,
                        });

                        return (
                            <section
                                key={index}
                                className="carousel-slide"
                                data-theme={slide.theme}
                                ref={slideRef}
                            >
                                <motion.div
                                    className="parallax-bg"
                                    style={{
                                        backgroundImage: `url(${slide.img})`,
                                        scale: isInView ? 1.05 : 1.1,
                                        transition: "scale 1s ease",
                                    }}
                                />

                                <motion.div
                                    className={`caption caption-${slide.layout}`}
                                    style={{
                                        top: slide.topOffset || "50%",
                                        transform: "translateY(-50%)", // maintain vertical centering
                                    }}
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                                    transition={{ duration: 0.8 }}
                                >
                                    <h1 className="caption-heading">{slide.title}</h1>
                                    <p className="caption-sub">{slide.description}</p>
                                    <motion.button
                                        className="caption-cta"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        Explore Now
                                    </motion.button>
                                </motion.div>
                            </section>
                        );
                    })}
                </motion.div>
            </div>

            {/* Scroll Dots */}
            <ScrollDots
                count={slides.length}
                current={currentSlide}
                onDotClick={scrollToSlide}
            />

        </div>
    );
};

export default HeroCarouselSection;
