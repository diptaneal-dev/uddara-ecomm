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

const WhyFoxnuts = () => {
  return (
    <Container>
      <BlogHeroImage /> {/* Full-width hero image */}

      <BlogHeader>
        <h1>Why Choose Foxnuts?</h1>
        <Subtitle>Discover the Superfood Revolution</Subtitle>
      </BlogHeader>

      <Section>
        <SectionTitle>What Are Foxnuts?</SectionTitle>
        <Paragraph>
          Also known as <Highlight>Makhana</Highlight> or <Highlight>lotus seeds</Highlight>, foxnuts are puffed seeds of the Euryale ferox plant,
          primarily found in wetlands across India and parts of Asia. Traditionally used in Ayurvedic and Chinese medicine,
          they’ve been celebrated for centuries as a <Highlight>nutritious and healing superfood</Highlight>.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>Top Health Benefits</SectionTitle>
        <ul>
          <ListItem>
            <Highlight>Rich in Antioxidants:</Highlight> Help fight oxidative stress and promote healthy aging.
          </ListItem>
          <ListItem>
            <Highlight>Low in Calories, High in Fiber:</Highlight> Ideal for weight management and digestive health.
          </ListItem>
          <ListItem>
            <Highlight>Gluten-Free & Vegan:</Highlight> Perfect for people with dietary restrictions or preferences.
          </ListItem>
          <ListItem>
            <Highlight>Natural Source of Protein:</Highlight> Supports muscle development and energy levels.
          </ListItem>
          <ListItem>
            <Highlight>Regulates Blood Sugar:</Highlight> A low glycemic index snack that helps maintain sugar levels.
          </ListItem>
        </ul>
      </Section>

      <Section>
        <SectionTitle>Why UDDARA Chooses Foxnuts</SectionTitle>
        <Paragraph>
          At <Highlight>UDDARA EXIM LLP</Highlight>, we believe in offering products that nourish, energize, and elevate everyday living.
          Foxnuts, with their <Highlight>rich heritage and incredible nutritional profile</Highlight>, were the natural choice
          to launch our journey into global trade. Our selection process ensures every batch is:
        </Paragraph>
        <ul>
          <ListItem>
            <Highlight>Responsibly sourced</Highlight> from verified growers.
          </ListItem>
          <ListItem>
            <Highlight>Processed hygienically</Highlight> to retain maximum freshness.
          </ListItem>
          <ListItem>
            <Highlight>Quality tested</Highlight> for purity, size, and taste.
          </ListItem>
        </ul>
      </Section>

      <Section>
        <SectionTitle>A Superfood for Modern Lifestyles</SectionTitle>
        <Paragraph>
          Whether it's for snacking, fasting, or adding to gourmet dishes, foxnuts are as <Highlight>versatile</Highlight>
          as they are nutritious. Their subtle flavor makes them the perfect canvas for a variety of tastes—sweet, spicy, or savory.
        </Paragraph>
        <Paragraph>
          Choose <Highlight>UDDARA's premium foxnuts</Highlight> to enjoy a fusion of ancient wellness and modern convenience.
        </Paragraph>
      </Section>
    </Container>
  );
};

export default WhyFoxnuts;
