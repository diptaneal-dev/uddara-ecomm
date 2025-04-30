import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import MissionVision from "./MissionVision";
import CoreValues from "./CoreValues";
import HeroCarouselAbout from "./HeroCarouselAbout";
import { motion } from "framer-motion";
const pinkColor = '#BF437E';

const aboutModalText = `UDDARA EXIM LLP: A Visionary Force in Domestics and Global Trade

UDDARA EXIM LLP is a dynamic, forward-thinking supplier and exporter, redefining excellence in delivering premium-quality products to domestic and international markets. Rooted in a steadfast commitment to customer satisfaction, we operate with precision, professionalism, and an unwavering focus on upholding the highest standards in every aspect of our business. Our expertise encompasses sourcing, processing, and supplying exceptional products that meet the diverse needs of our esteemed clientele.

The foundation of UDDARA's success is our exceptional team—a group of seasoned professionals who bring diverse expertise and dedication to every endeavor. Our team is driven by innovation, collaboration, and an uncompromising pursuit of excellence, ensuring that every product we deliver exemplifies quality and reliability. From product development to logistics, every team member plays a vital role in fostering a culture of excellence and creating lasting value for our clients. With decades of collective experience in supply chain management, product innovation, and customer engagement, our team embodies a shared vision of excellence and growth. They strive to uphold the values of transparency, trust, and collaboration in every partnership and transaction.

We began our journey with foxnuts as our flagship product—an extraordinary superfood celebrated for its nutritional value and burgeoning global demand. This strategic focus has allowed us to carve out a niche in the industry while consistently delivering unparalleled value. As we expand, we are laying the groundwork to diversify our portfolio, including other high-quality offerings to cater to evolving market trends and solidify our presence in both domestic and global trade landscapes.

Guided by a commitment to operational excellence and empowered by our strong network of reliable partners and suppliers, UDDARA continues to grow as a trusted name in domestic and global trade. Integrity, innovation, and customer satisfaction remain at the core of our mission, as we build lasting relationships and strive to set new benchmarks of success in the domestic and export industry.`;

const threeBoxSections = [
  {
    title: "Business Overview",
    short: "UDDARA EXIM LLP is a fast-emerging supplier and exporter, delivering premium products globally.",
    full: `UDDARA EXIM LLP is a dynamic and fast-emerging domestic supplier and exporter committed to delivering premium-quality products to markets around the globe. With a dedication to excellence and customer satisfaction at the core of our operations, we pride ourselves on upholding the highest standards in every aspect of our business. Our expertise lies in sourcing, processing, and supplying exceptional products that meet the diverse needs of our international clientele.

At UDDARA, we have embarked on our journey with a strong focus on foxnuts—an extraordinary superfood known for its nutritional value and growing global demand. By selecting foxnuts as our flagship product, we aim to establish a robust foundation for our business while consistently delivering value to our customers. In addition, we are laying the groundwork to broaden our portfolio with other high-quality offerings in the near future. Our strategic vision is to cater to evolving market trends and expand our footprint in the domestic and global trade landscape.

Backed by a team of seasoned professionals and guided by a commitment to operational excellence, UDDARA EXIM LLP has built a strong network of reliable partners and suppliers. These partnerships empower us to ensure the consistent quality of our products and their timely delivery across domestic and international markets.
As we grow, UDDARA remains steadfast in its mission to be a trusted name in domestic and global trade by exemplifying integrity, reliability, and innovation. Through our unwavering focus on customer satisfaction and product excellence, we aim to create long-lasting relationships with clients and establish UDDARA as a leader in the domestic and export industry.`,
  },
  {
    title: "Leadership",
    short: "Ravi Shankar, an alumnus of VNIT Nagpur, is the visionary founder of UDDARA EXIM LLP.",
    full: `Ravi Shankar, an esteemed alumnus of Visvesvaraya National Institute of Technology, Nagpur, is the visionary founder of UDDARA EXIM LLP. With over two and half decades of diverse industry experience, he has held senior leadership roles across program management, customer engagement, delivery excellence, and strategic commercials. His career includes pivotal contributions to globally renowned organizations such as L&T, Infosys, Capgemini, Tech Mahindra, Mphasis/HP, Atos-Syntel, and Amdocs.

As a distinguished Program Director with Amdocs, India, Ravi has successfully spearheaded large-scale, mission-critical transformations, managing multi-million dollar portfolios and leading highly skilled global teams across geographies including APAC, Europe, the US, Middle East and Africa. His dynamic leadership, unwavering commitment to quality, and strategic acumen continue to drive UDDARA EXIM LLP toward excellence and innovation on an international stage.`,
  },
  {
    title: "Leadership Insights",
    short: "We are on an exciting journey of trade, driven by quality, innovation, and customer satisfaction.",
    full: `At UDDARA EXIM LLP, we embark on an exciting journey of domestic and international trade, driven by a commitment to quality, innovation, and growth. As we launch our operations with raw and flavored makhana as our flagship products, our vision extends far beyond a single offering.

Our aspiration is to build a diversified product portfolio that caters to evolving market demands and establishes UDDARA EXIM LLP as a trusted name in global commerce. We are guided by principles of integrity, excellence, and a relentless pursuit of customer satisfaction.

`,
  },
];

const AboutUsPage = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [showAboutModal, setShowAboutModal] = useState(false);

  const handleOpenAbout = () => setShowAboutModal(true);
  const handleCloseAbout = () => setShowAboutModal(false);

  return (
    <>
      {/* Hero Section with modal trigger */}
      <HeroCarouselAbout onKnowMore={handleOpenAbout} />

      {/* About Modal */}
      <Modal show={showAboutModal} onHide={handleCloseAbout} size="lg" scrollable>
        <Modal.Header closeButton>
          <Modal.Title>About UDDARA</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ whiteSpace: "pre-line" }}>{aboutModalText}</Modal.Body>
        <Modal.Footer>
          <Button style={{ backgroundColor: pinkColor, borderColor: pinkColor }} onClick={handleCloseAbout}>Close</Button>
        </Modal.Footer>
      </Modal>

      {/* 3 Animated Info Boxes */}
      <div className="container my-5">
        <div className="row g-4">
          {threeBoxSections.map((section, idx) => (
            <motion.div
              key={idx}
              className="col-md-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="card h-100 shadow-sm border-0 bg-light">
                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="card-title fw-bold">{section.title}</h5>
                    <p className="card-text text-muted">{section.short}</p>
                  </div>
                  <Button
                    style={{ backgroundColor: pinkColor, borderColor: pinkColor }}
                    className="mt-3"
                    onClick={() => setActiveModal(`box-${idx}`)}
                  >
                    Know More
                  </Button>
                </div>
              </div>

              {/* Modal */}
              <Modal
                show={activeModal === `box-${idx}`}
                onHide={() => setActiveModal(null)}
                size="lg"
                scrollable
              >
                <Modal.Header closeButton>
                  <Modal.Title>{section.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ whiteSpace: "pre-line" }}>{section.full}</Modal.Body>
                <Modal.Footer>
                  <Button style={{ backgroundColor: pinkColor, borderColor: pinkColor }} onClick={() => setActiveModal(null)}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mission & Vision Section */}
      <div className="my-5">
        <MissionVision />
      </div>

      {/* Core Values Section */}
      <div className="my-5">
        <CoreValues />
      </div>
    </>
  );
};

export default AboutUsPage;
