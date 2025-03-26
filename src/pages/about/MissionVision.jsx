import React from "react";
import { Globe, Target } from "lucide-react";
import {
  Section,
  StatementCard,
  IconWrapper,
  StatementTitle,
  StatementDescription,
} from "./MissionVision.styles";

const statements = [
  {
    icon: <Target size={50} />,
    title: "Mission Statement",
    description:
      "To provide top-quality products to our global customers, ensuring the highest standards of quality, sustainability, and customer service.",
    color: "#BF437E", // Magenta from theme
  },
  {
    icon: <Globe size={50} />,
    title: "Vision Statement",
    description:
      "To be a leading exporter in the industry, known for our quality products, ethical business practices, and exceptional customer service.",
    color: "#156082", // Navy from theme
  },
];

const MissionVision = () => {
  return (
    <Section>
      <div className="container">
        <div className="row justify-content-center">
          {statements.map((statement, index) => (
            <div className="col-md-6" key={index}>
              <StatementCard>
                <IconWrapper>
                  {React.cloneElement(statement.icon, { color: statement.color })}
                </IconWrapper>
                <StatementTitle>{statement.title}</StatementTitle>
                <StatementDescription>{statement.description}</StatementDescription>
              </StatementCard>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default MissionVision;
