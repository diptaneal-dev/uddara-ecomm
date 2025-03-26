import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useTheme } from "../../context/ThemeContext";
import CoreValues from "./CoreValues";
import MissionVision from "./MissionVision";
import {
  Container,
  SectionTitle,
  IntroSection,
  IntroText,
  IntroImage,
  PageHeading,
  SubHeading,
  Paragraph,
  Highlight,
} from "./AboutUs.styles";

const AboutUs = () => {
  const { darkMode } = useTheme();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <Container darkMode={darkMode}>

      <IntroSection data-aos="fade-up">
        <IntroText>
          <PageHeading darkMode={darkMode}>About UDDARA</PageHeading>
          <SubHeading darkMode={darkMode}>
            Empowering Global Trade with Excellence
          </SubHeading>
          <Paragraph darkMode={darkMode}>
            <Highlight>UDDARA</Highlight> is a premier exporter specializing in high-quality{" "}
            <Highlight>foxnuts, millets, and other commodities</Highlight>. With a commitment to
            excellence and a focus on customer satisfaction, we aim to deliver the finest products to
            markets worldwide.
          </Paragraph>
          <Paragraph darkMode={darkMode}>
            We are establishing our business with <Highlight>foxnut</Highlight> as our initial product,
            with plans to scale up our portfolio in the near future.
          </Paragraph>
        </IntroText>

        <IntroImage src="/images/Uddara_aboutus.webp" alt="About Uddara" />
      </IntroSection>

      <div className="mb-5" data-aos="fade-up">
        <SectionTitle>Leadership</SectionTitle>
        <div className="text-center">
          <h3>Founder & CEO: Ravi Shankar</h3>
          <Paragraph darkMode={darkMode}>
            <Highlight>Ravi Shankar</Highlight>, an alumnus of{" "}
            <Highlight>Visvesvaraya National Institute of Technology, Nagpur</Highlight>, is the
            driving force behind <Highlight>UDDARA EXIM LLP</Highlight>. As a{" "}
            <Highlight>Program Director</Highlight>, he brings over{" "}
            <Highlight>25 years of experience</Highlight> in program management, customer
            management, and delivery management with top multinational corporations.
          </Paragraph>
        </div>
      </div>

      <div className="mb-5" data-aos="fade-up">
        <SectionTitle>Leadership Insights</SectionTitle>
        <Paragraph darkMode={darkMode}>
          At <Highlight>UDDARA EXIM LLP</Highlight>, we embark on an exciting journey in both
          domestic and international trade, driven by a commitment to{" "}
          <Highlight>quality, innovation, and growth</Highlight>.
        </Paragraph>
      </div>

      <div className="mb-5" data-aos="fade-up">
        <SectionTitle>Business Overview</SectionTitle>
        <Paragraph darkMode={darkMode}>
          <Highlight>UDDARA</Highlight> is a premier exporter specializing in high-quality{" "}
          <Highlight>foxnuts, millets, and other commodities</Highlight>. With a commitment to
          excellence and a focus on customer satisfaction, we aim to deliver the finest products to
          markets worldwide.
        </Paragraph>
      </div>

      <MissionVision />
      <CoreValues />
    </Container>
  );
};

export default AboutUs;
