import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

import {
  faInstagram,
  faWhatsapp,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";
import {
  faShoppingBag,
  faInfoCircle,
  faQuestionCircle,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";

import Logo from "./Logo";

import {
  FooterContainer,
  FooterGrid,
  FooterColumn,
  FooterBottom,
  FooterBottomRow,
  StyledLogoCircle,
  LogoWrapper,
  SocialTray,
  IconCircle,
  NewsletterColumn
} from "./Footer.styles";

const Footer = () => {
  return (
    <FooterContainer>
      {/* Top Grid */}
      <FooterGrid>
        {/* Logo & Social */}
        <FooterColumn>
          <LogoWrapper>
            <StyledLogoCircle>
              <Logo
                imageSrc="/images/Uddara_logo.png"
                width="100%"
                height="100%"
                textColor="#156082"
                bgColor="transparent"
                centered={true}
              />
            </StyledLogoCircle>

            <SocialTray>
              <a href="https://facebook.com" target="_blank" rel="noreferrer">
                <IconCircle>
                  <FontAwesomeIcon icon={faFacebook} />
                </IconCircle>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer">
                <IconCircle>
                  <FontAwesomeIcon icon={faInstagram} />
                </IconCircle>
              </a>
              <a href="https://wa.me/919999999999" target="_blank" rel="noreferrer">
                <IconCircle>
                  <FontAwesomeIcon icon={faWhatsapp} />
                </IconCircle>
              </a>
            </SocialTray>
          </LogoWrapper>
        </FooterColumn>

        <FooterColumn>
          <div style={{ marginBottom: "1rem" }}>
            <h5><FontAwesomeIcon icon={faShoppingBag} /> Shop</h5>
            <ul>
              <li><a href="/products">Featured Products</a></li>
            </ul>
          </div>

          <div>
            <h5><FontAwesomeIcon icon={faInfoCircle} /> About Us</h5>
            <ul>
              <li><a href="/blog/list">Blog</a></li>
              <li><a href="/careers">Careers</a></li>
            </ul>
          </div>
        </FooterColumn>

        {/* Quick Links */}
        <FooterColumn>
          <h5><FontAwesomeIcon icon={faQuestionCircle} /> Quick Links</h5>
          <ul>
            <li><a href="/faq">FAQs</a></li>
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/track-order">Track Your Order</a></li>
          </ul>
        </FooterColumn>

        {/* Sitemap */}
        <FooterColumn>
          <h5><FontAwesomeIcon icon={faGlobe} /> Mini Sitemap</h5>
          <ul>
            <li><a href="#">Our Mission</a></li>
            <li><a href="#">Sustainability</a></li>
            <li><em>More coming soon…</em></li>
          </ul>
        </FooterColumn>

        <NewsletterColumn>
          <h5>Stay Connected</h5>
          <form onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Your email" required />
            <button type="submit" aria-label="Subscribe">
              <FontAwesomeIcon icon={faEnvelope} />
            </button>
          </form>
        </NewsletterColumn>

      </FooterGrid>

      {/* Bottom Bar */}
      <FooterBottom>
        <FooterBottomRow>
          <div>
            <a href="/privacy-policy">Privacy Policy</a>
            <span>|</span>
            <a href="/terms">Terms & Conditions</a>
            <span>|</span>
            <a href="/cookie-policy">Cookies Policy</a>
          </div>
          <div>
            <span>© {new Date().getFullYear()} www.uddara.com</span>
            <span>| Powered by Salespoint</span>
          </div>
        </FooterBottomRow>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;
