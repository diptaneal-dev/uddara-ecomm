import styled from "styled-components";

export const ProgressBarWrapper = styled.div`
  margin-bottom: 2rem;
`;

export const StepLabels = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.grey};
  margin-bottom: 0.5rem;

  span.active {
    color: ${({ theme }) => theme.colors.navy};
  }
`;

export const StepLabel = styled.span`
  margin-top: 0.25rem;
  font-size: 0.75rem;
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.navy : theme.colors.grey};
  font-weight: ${({ $isActive }) => ($isActive ? 600 : 400)};
`;

// FILL variant
export const ProgressSteps = styled.div`
  display: flex;
  height: 8px;
  border-radius: 4px;
  overflow: hidden;
  background-color: #f1f1f1;
`;

export const StepSegment = styled.div`
  flex: 1;
  transition: background-color 0.3s ease-in-out;
  background-color: ${({ theme, $isActive, $stepColor }) =>
    $isActive
      ? theme.colors.progressColors[$stepColor] ||
        theme.colors.progressColors.inactive
      : theme.colors.progressColors.inactive};
`;

// DOT variant
export const DotProgress = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

export const DotStep = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;

export const Dot = styled.div`
  width: 12px;
  height: 12px;
  background-color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.pink : "#ccc"};
  border-radius: 50%;
  z-index: 1;
`;

export const Connector = styled.div`
  flex: 1;
  height: 2px;
  background-color: #ddd;
  margin: 0 4px;
`;

// BUBBLE variant
export const BubbleProgress = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(60px, 1fr));
  align-items: center;
  text-align: center;
  position: relative;
  margin-bottom: 0.5rem;
`;

export const BubbleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

export const BubbleUnderline = styled.div`
  margin-top: 6px;
  width: 40px;
  height: 2px;
  border-radius: 1px;
  background-color: ${({ theme, $status }) =>
    $status === "complete"
      ? theme.colors.teal
      : $status === "current"
      ? theme.colors.pink
      : theme.colors.progressColors.inactive};
`;

export const Bubble = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: ${({ theme, $isCurrent, $isActive }) =>
    $isCurrent
      ? theme.colors.pink
      : $isActive
      ? theme.colors.teal
      : theme.colors.progressColors.inactive};
  color: ${({ theme }) => theme.colors.white};
  font-size: 0.85rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1; /* keeps above connector */
`;

export const StepText = styled.div`
  margin-top: 0.5rem;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.grey};
`;
