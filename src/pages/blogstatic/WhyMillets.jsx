import React from "react";
import {
  Container,
  BlogHeroImage,
  BlogHeader,
  Subtitle,
  Section,
  SectionTitle,
  Paragraph,
  Highlight,
  ListItem,
} from "./BlogStatic.styles";

const WhyMillets = () => {
  return (
    <Container>
      <BlogHeroImage
        style={{ backgroundImage: "url('/images/whymillets.png')" }}
      />

      <BlogHeader>
        <h1>Why Millets?</h1>
        <Subtitle>Rediscovering Ancient Grains for a Healthier Tomorrow</Subtitle>
      </BlogHeader>

      <Section>
        <SectionTitle>What Are Millets?</SectionTitle>
        <Paragraph>
          <Highlight>Millets</Highlight> are a group of ancient cereal grains cultivated in Asia and Africa for thousands of years.
          Often overshadowed by modern staples like rice and wheat, millets are making a strong comeback thanks to their{" "}
          <Highlight>superior nutrition, sustainability, and versatility</Highlight>.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>Health Benefits of Millets</SectionTitle>
        <ul>
          <ListItem>
            <Highlight>Rich in Fiber:</Highlight> Supports digestion and helps manage weight.
          </ListItem>
          <ListItem>
            <Highlight>Low Glycemic Index:</Highlight> Helps in controlling blood sugar levels—great for diabetics.
          </ListItem>
          <ListItem>
            <Highlight>Gluten-Free:</Highlight> Ideal for individuals with gluten intolerance or celiac disease.
          </ListItem>
          <ListItem>
            <Highlight>Packed with Nutrients:</Highlight> A natural source of magnesium, phosphorus, iron, and B-vitamins.
          </ListItem>
          <ListItem>
            <Highlight>Heart-Healthy:</Highlight> Promotes lower cholesterol and supports cardiovascular well-being.
          </ListItem>
        </ul>
      </Section>

      <Section>
        <SectionTitle>Why UDDARA Promotes Millets</SectionTitle>
        <Paragraph>
          At <Highlight>UDDARA EXIM LLP</Highlight>, we champion millets as a smart choice for consumers and the planet.
          These resilient grains require <Highlight>less water and fewer inputs</Highlight> to grow, making them a climate-smart crop
          and a step toward more sustainable agriculture.
        </Paragraph>
        <ul>
          <ListItem>
            <Highlight>Locally sourced</Highlight> from responsible farmers.
          </ListItem>
          <ListItem>
            <Highlight>Processed and packaged</Highlight> with care to maintain nutrition.
          </ListItem>
          <ListItem>
            <Highlight>Available in various forms</Highlight>—whole, flour, and ready-to-cook blends.
          </ListItem>
        </ul>
      </Section>

      <Section>
        <SectionTitle>A Grain for Every Plate</SectionTitle>
        <Paragraph>
          From <Highlight>finger millet (ragi)</Highlight> porridge to <Highlight>foxtail millet</Highlight> salads and <Highlight>barnyard millet</Highlight> upma,
          millets offer diverse culinary potential across cultures and cuisines.
        </Paragraph>
        <Paragraph>
          With rising awareness of holistic wellness and clean eating, <Highlight>millets</Highlight> are the perfect grain
          for the health-conscious modern consumer.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>Join the Millet Movement</SectionTitle>
        <Paragraph>
          Choosing <Highlight>UDDARA’s high-quality millets</Highlight> means embracing nutrition, sustainability, and
          tradition—while supporting farmers and the future of food.
        </Paragraph>
      </Section>
    </Container>
  );
};

export default WhyMillets;
