import React from "react";
import { CheckCircle, ShieldCheck, Users } from "lucide-react";
import {
  Section,
  Heading,
  ValueCard,
  IconWrapper,
  ValueTitle,
  ValueDescription,
} from "./CoreValues.styles";

const coreValues = [
  {
    icon: <CheckCircle size={40} />,
    title: "Quality",
    description: "We ensure that all our products meet the highest standards of quality.",
    color: "#BF437E",
  },
  {
    icon: <ShieldCheck size={40} />,
    title: "Integrity",
    description: "We conduct our business with honesty and transparency.",
    color: "#BF437E",
  },
  {
    icon: <Users size={40} />,
    title: "Customer Satisfaction",
    description: "We prioritize our customers' needs and strive to exceed their expectations.",
    color: "#BF437E",
  },
  {
    icon: <CheckCircle size={40} />,
    title: "Sustainability",
    description: "We are committed to sustainable and eco-friendly practices.",
    color: "#BF437E",
  },
];

const CoreValues = () => {
  return (
    <Section>
      <div className="container">
        <Heading>Our Core Values</Heading>
        <div className="row justify-content-center">
          {coreValues.map((value, index) => (
            <div className="col-md-3 col-sm-6" key={index}>
              <ValueCard>
                <IconWrapper>
                  {React.cloneElement(value.icon, { color: value.color })}
                </IconWrapper>
                <ValueTitle>{value.title}</ValueTitle>
                <ValueDescription>{value.description}</ValueDescription>
              </ValueCard>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default CoreValues;
