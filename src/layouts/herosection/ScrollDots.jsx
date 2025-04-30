import React from "react";
import { motion } from "framer-motion";
import "./HeroCarouselSection.css";

const ScrollDots = ({ count, current, onDotClick }) => {
  return (
    <div className="scroll-dots">
      {Array.from({ length: count }).map((_, i) => (
        <motion.span
          key={i}
          className={`dot ${current === i ? "active" : ""}`}
          onClick={() => onDotClick(i)} // 👈 Add this!
          initial={{ scale: 1 }}
          animate={{ scale: current === i ? 1.4 : 1 }}
          transition={{ type: "spring", stiffness: 300 }}
        />
      ))}
    </div>
  );
};

export default ScrollDots;
