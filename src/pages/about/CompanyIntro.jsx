import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const CompanyIntro = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fullText = `
  UDDARA EXIM LLP is a dynamic, forward-thinking supplier and exporter, redefining excellence in delivering premium-quality products to domestic and international markets. Rooted in a steadfast commitment to customer satisfaction, we operate with precision, professionalism, and an unwavering focus on upholding the highest standards in every aspect of our business. Our expertise encompasses sourcing, processing, and supplying exceptional products that meet the diverse needs of our esteemed clientele.

  The foundation of UDDARA's success is our exceptional team—a group of seasoned professionals who bring diverse expertise and dedication to every endeavor. Our team is driven by innovation, collaboration, and an uncompromising pursuit of excellence, ensuring that every product we deliver exemplifies quality and reliability. From product development to logistics, every team member plays a vital role in fostering a culture of excellence and creating lasting value for our clients. With decades of collective experience in supply chain management, product innovation, and customer engagement, our team embodies a shared vision of excellence and growth. They strive to uphold the values of transparency, trust, and collaboration in every partnership and transaction.

  We began our journey with foxnuts as our flagship product—an extraordinary superfood celebrated for its nutritional value and burgeoning global demand. This strategic focus has allowed us to carve out a niche in the industry while consistently delivering unparalleled value. As we expand, we are laying the groundwork to diversify our portfolio, including other high-quality offerings to cater to evolving market trends and solidify our presence in both domestic and global trade landscapes.

  Guided by a commitment to operational excellence and empowered by our strong network of reliable partners and suppliers, UDDARA continues to grow as a trusted name in domestic and global trade. Integrity, innovation, and customer satisfaction remain at the core of our mission, as we build lasting relationships and strive to set new benchmarks of success in the domestic and export industry.
  `;

  return (
    <>
      {/* Highlight Box */}
      <div className="p-4 bg-light border rounded mb-4">
        <h4 className="fw-semibold">About UDDARA</h4>
        <p className="text-muted">
          UDDARA EXIM LLP is a dynamic, forward-thinking supplier and exporter,
          redefining excellence in delivering premium-quality products to domestic
          and international markets.
        </p>
        <Button variant="primary" onClick={handleShow}>
          Know More
        </Button>
      </div>

      {/* Modal for Full Content */}
      <Modal show={show} onHide={handleClose} size="lg" scrollable>
        <Modal.Header closeButton>
          <Modal.Title>About UDDARA EXIM LLP</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ whiteSpace: 'pre-line' }}>
          {fullText}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CompanyIntro;
