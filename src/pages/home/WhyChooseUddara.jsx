// src/components/home/WhyChooseUddara.jsx
import React from "react";
import { Briefcase, ShieldCheck, UserCheck } from "lucide-react";
import { useTheme } from "styled-components";
import {
  Section,
  FeatureRow,
  FeatureCol,
  FeatureCard,
  IconWrapper,
  CardTitle,
  CardDescription,
} from "./WhyChooseUddara.styles";
import { Heading } from "../../components/Typography/Heading";

const features = [
  {
    icon: Briefcase,
    title: "Expertise",
    description:
      "With extensive experience in various industries, we understand the unique needs of our customers.",
    colorKey: "purple",
  },
  {
    icon: ShieldCheck,
    title: "Quality Assurance",
    description:
      "We adhere to strict quality control measures to ensure the best products.",
    colorKey: "navy",
  },
  {
    icon: UserCheck,
    title: "Customer-Centric Approach",
    description:
      "We build long-term relationships with our customers by providing personalized service and support.",
    colorKey: "grey",
  },
];

const WhyChooseUddara = () => {
  const theme = useTheme();

  return (
    <Section>
      <div className="container">
        <Heading>Why Choose Uddara?</Heading>
        <FeatureRow>
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            const iconColor = theme.colors[feature.colorKey];

            return (
              <FeatureCol key={index}>
                <FeatureCard>
                  <IconWrapper>
                    <IconComponent size={40} color={iconColor} />
                  </IconWrapper>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </FeatureCard>
              </FeatureCol>
            );
          })}
        </FeatureRow>
      </div>
    </Section>
  );
};

export default WhyChooseUddara;
