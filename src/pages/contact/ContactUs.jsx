import React, { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import { FaQuestionCircle, FaPhone, FaEnvelope, FaTwitter } from "react-icons/fa";
import {
  PageWrapper,
  SectionHeading,
  CardGrid,
  ContactCard,
  IconWrapper,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  FormGroup,
  SubmitButton,
} from "./ContactUs.styles";

const ContactUs = () => {
  const { darkMode } = useTheme();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setShowModal(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <PageWrapper darkMode={darkMode}>
      <div className="text-center mb-5">
        <SectionHeading>Contact Us</SectionHeading>
        <p className="lead">We're here to help. Get in touch with us.</p>
      </div>

      <CardGrid>
        <ContactCard darkMode={darkMode}>
          <IconWrapper><FaQuestionCircle size={50} /></IconWrapper>
          <h5>Have Questions?</h5>
          <p>Check out our FAQ.</p>
          <a href="/faq" className="btn btn-primary">Go →</a>
        </ContactCard>

        <ContactCard darkMode={darkMode}>
          <IconWrapper><FaPhone size={50} /></IconWrapper>
          <h5>Call Us</h5>
          <p>We are here to help you pick the right product.</p>
          <a
            href="tel:+919403883381"
            className="btn btn-primary"
            title="Call us at +91 94038 83381"
          >
            Call Now →
          </a>
        </ContactCard>

        <ContactCard darkMode={darkMode}>
          <IconWrapper><FaEnvelope size={50} /></IconWrapper>
          <h5>Write to Us</h5>
          <p>Send us a message using the contact form.</p>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>Go →</button>
        </ContactCard>

      </CardGrid>

      {showModal && (
        <ModalOverlay>
          <ModalContent darkMode={darkMode}>
            <ModalHeader>
              <h5>Send Us a Message</h5>
              <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
            </ModalHeader>
            <ModalBody>
              <form>
                <FormGroup>
                  <label>Full Name</label>
                  <input type="text" placeholder="Enter your name" required />
                </FormGroup>
                <FormGroup>
                  <label>Email Address</label>
                  <input type="email" placeholder="Enter your email" required />
                </FormGroup>
                <FormGroup>
                  <label>Message</label>
                  <textarea rows="4" placeholder="Your message" required></textarea>
                </FormGroup>
                <SubmitButton type="submit">Submit</SubmitButton>
              </form>
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      )}
    </PageWrapper>
  );
};

export default ContactUs;
