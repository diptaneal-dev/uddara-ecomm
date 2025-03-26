import React, { useState } from 'react';
import { FaPalette } from "react-icons/fa";

const ColorPicker = ({ handleColorChange }) => {
  const [selectedColor, setSelectedColor] = useState(null);
  const [showColorPicker, setShowColorPicker] = useState(false);

  const colors = [
    '#000000', '#808080', '#C0C0C0', '#FFFFFF', // Black, Gray, Silver, White
    '#800000', '#FF0000', '#FFA500', '#FFFF00', // Maroon, Red, Orange, Yellow
    '#808000', '#008000', '#00FF00', '#008080', // Olive, Green, Lime, Teal
    '#00FFFF', '#000080', '#0000FF', '#800080', // Aqua, Navy, Blue, Purple
    '#FF00FF', '#FFC0CB', '#FFD700', '#A52A2A'  // Fuchsia, Pink, Gold, Brown
  ];
  
  const handleColorClick = (color) => {
    setSelectedColor(color);
    handleColorChange(color);
    setShowColorPicker(false);
  };

  return (
    <div className="dropdown ml-2 me-1">
      <button
        className="btn btn-white border border-gray-400 rounded"
        type="button"
        onClick={() => setShowColorPicker(!showColorPicker)}
        style={{ backgroundColor: selectedColor || '#FFFFFF' }}
      >
        <FaPalette />
      </button>
      {showColorPicker && (
        <div className="position-absolute z-50 mt-2 p-2 border border-gray-400 bg-white">
          {colors.map((color) => (
            <div
              key={color}
              className="color-option"
              style={{ backgroundColor: color, width: '24px', height: '24px', cursor: 'pointer' }}
              onClick={() => handleColorClick(color)}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
