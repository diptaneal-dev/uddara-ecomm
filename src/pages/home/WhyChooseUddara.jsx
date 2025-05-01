// src/components/home/WhyChooseUddara.jsx
import React from "react";
import { Briefcase, ShieldCheck, UserCheck } from "lucide-react";
import { useTheme } from "styled-components";
import {
  Section,
  FeatureRow,
  FeatureCol,
  FeatureCard,
  UddaraHeading,
  IconWrapper,
  CardTitle,
  CardDescription,
} from "./WhyChooseUddara.styles";

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
    colorKey: "purple",
  },
  {
    icon: UserCheck,
    title: "Customer-Centric Approach",
    description:
      "We build long-term relationships with our customers by providing personalized service and support.",
    colorKey: "purple",
  },
];

const WhyChooseUddara = () => {
  const theme = useTheme();

  return (
    <Section>
      <div className="container">
        <UddaraHeading>
          Why Choose <span style={{ fontStyle: 'italic' }}>Uddara</span>?
        </UddaraHeading>
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
