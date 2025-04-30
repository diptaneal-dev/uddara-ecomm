// ProductCarousel.styles.js
import styled from "styled-components";

export const CarouselWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;

  @media (min-width: 992px) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

export const ThumbnailStrip = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  gap: 0.5rem;
  padding: 0.5rem;
  max-width: 100%;
  flex-shrink: 0;

  @media (min-width: 992px) {
    flex-direction: column;
    width: 90px;
    max-width: 15%;
  }
`;

export const ThumbnailContainer = styled.div`
  width: 85px;
  height: 85px;
  cursor: pointer;
  border: ${({ isSelected }) =>
    isSelected ? "2px solid #0d6efd" : "1px solid #ccc"};
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  flex-shrink: 0;
  background-color: #fff;

  img,
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const VideoOverlay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.6);
  padding: 4px;
  border-radius: 50%;
  color: #fff;
`;

export const MainDisplay = styled.div`
  flex-grow: 1;
  width: 100%;

  video,
  img {
    width: 100%;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;
