import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Logo = ({
  size = 'medium',
  imageSrc,
  width,
  height,
  children,
  className = '',
  textColor = '#A7B89A',
  bgColor = 'transparent',
  centered = false
}) => {
  const sizeStyles = {
    small: { width: '80px', height: '40px' },
    medium: { width: '140px', height: '60px' },
    large: { width: '200px', height: '80px' },
  };

  // Override size if custom width/height are provided
  const finalWidth = width || sizeStyles[size]?.width || '140px';
  const finalHeight = height || sizeStyles[size]?.height || '60px';

  return (
    <div
      className={`logo-container ${className} ${centered ? 'justify-content-center text-center' : 'align-items-center'}`}
      style={{ backgroundColor: bgColor, color: textColor, padding: '5px' }}
    >
      {imageSrc && (
        <img
          src={imageSrc}
          alt="logo"
          className="img-fluid custom-logo"
          style={{
            width: finalWidth,
            height: finalHeight,
            objectFit: 'contain',
          }}
        />
      )}

      {!imageSrc && children && (
        <span className="fw-bold">{children}</span>
      )}
    </div>
  );
};

export default Logo;
