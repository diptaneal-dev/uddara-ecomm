// ProductCarousel.jsx (Refactored with Styled Components)
import React, { useState } from "react";
import { FaPlay } from "react-icons/fa";
import {
  CarouselWrapper,
  ThumbnailStrip,
  ThumbnailContainer,
  VideoOverlay,
  MainDisplay
} from "./ProductCarousel.styles";

const ProductCarousel = ({ product }) => {
  const [selectedMedia, setSelectedMedia] = useState(product?.images?.[0]);

  return (
    <CarouselWrapper>
      <ThumbnailStrip>
        {product.images.map((media, index) => (
          <ThumbnailContainer
            key={index}
            isSelected={selectedMedia === media}
            onClick={() => setSelectedMedia(media)}
          >
            {media.endsWith(".mp4") ? (
              <div className="position-relative w-100 h-100">
                <video className="w-100 h-100 object-fit-cover">
                  <source src={media} type="video/mp4" />
                </video>
                <VideoOverlay>
                  <FaPlay size={18} />
                </VideoOverlay>
              </div>
            ) : (
              <img
                src={media}
                className="w-100 h-100 object-fit-cover rounded"
                alt={`Thumbnail ${index}`}
              />
            )}
          </ThumbnailContainer>
        ))}
      </ThumbnailStrip>

      <MainDisplay>
        {selectedMedia.endsWith(".mp4") ? (
          <video controls className="img-fluid rounded shadow w-100">
            <source src={selectedMedia} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <img
            src={selectedMedia}
            className="img-fluid rounded shadow w-100"
            alt="Product Preview"
          />
        )}
      </MainDisplay>
    </CarouselWrapper>
  );
};

export default ProductCarousel;
