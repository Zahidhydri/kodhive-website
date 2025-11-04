// src/components/Footer.jsx
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../assets/kodhive-logo.png';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { HiOutlineMail, HiOutlineLocationMarker, HiOutlineArrowRight } from 'react-icons/hi';

const FooterContainer = styled.footer`
  background: ${({ theme }) => theme.card};
  border-top: 1px solid ${({ theme }) => theme.border};
  margin-top: 4rem;
  padding: 4rem 1.5rem 3rem 1.5rem;
  color: ${({ theme }) => (theme.text === '#212529' ? '#495057' : '#adb5bd')};
  
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;

  h3 {
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    color: ${({ theme }) => theme.text};
  }

  p {
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }
`;

const LogoSection = styled(Column)`
  @media (min-width: 640px) {
    grid-column: span 2; 
  }
  @media (min-width: 1024px) {
    grid-column: span 1; 
  }
`;

const LogoDisplay = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  text-decoration: none;
  
  img {
    height: 40px;
    width: 40px;
  }
  
  span {
    font-size: 1.5rem;
    font-weight: bold;
    color: ${({ theme }) => theme.text};
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialIcon = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ theme }) => theme.body};
  border: 1px solid ${({ theme }) => theme.border};
  color: ${({ theme }) => theme.text};
  font-size: 1.25rem;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.buttonBg};
    color: ${({ theme }) => theme.buttonText};
    border-color: ${({ theme }) => theme.buttonBg};
    transform: translateY(-2px);
  }
`;

const LinksList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const FooterLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => (theme.text === '#212529' ? '#495057' : '#adb5bd')};
  transition: color 0.3s ease;
  position: relative;
  display: inline-block;

  &:hover {
    color: ${({ theme }) => theme.buttonBg};
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  a, div {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    text-decoration: none;
    color: ${({ theme }) => (theme.text === '#212529' ? '#495057' : '#adb5bd')};
    transition: color 0.3s ease;

    svg {
      font-size: 1.25rem;
      flex-shrink: 0;
      margin-top: 4px;
      color: ${({ theme }) => theme.buttonBg};
    }
    
    &:hover {
      color: ${({ theme }) => theme.buttonBg};
    }
  }
`;

const NewsletterForm = styled.form`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;

  input {
    flex-grow: 1;
    padding: 0.75rem 1rem;
    border: 1px solid ${({ theme }) => theme.border};
    border-radius: 8px;
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-size: 0.9rem;
    min-width: 0;

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.buttonBg};
      box-shadow: 0 0 0 3px ${({ theme }) => theme.buttonBg}33;
    }
  }

  button {
    flex-shrink: 0;
    width: 44px;
    height: 44px;
    border: none;
    border-radius: 8px;
    background: ${({ theme }) => theme.buttonBg};
    color: ${({ theme }) => theme.buttonText};
    font-size: 1.25rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s ease;

    &:hover {
      background: ${({ theme }) => theme.buttonHover};
    }
  }
`;

const Copyright = styled.div`
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 1px solid ${({ theme }) => theme.border};
  text-align: center;
`;

export default function Footer() {
  return (
    <FooterContainer>
      <ContentWrapper>
        <Grid>
          <LogoSection>
            {/* UPDATED: Added onClick to scroll to top */}
            <LogoDisplay to="/" onClick={() => window.scrollTo(0, 0)}>
              <img src={logo} alt="Kodhive Logo" />
              <span>Kodhive</span>
            </LogoDisplay>
            <p>Connecting student talent with innovative real-world projects. Build your portfolio, gain experience, and launch your career.</p>
            <SocialLinks>
              <SocialIcon href="https://twitter.com/kodhive" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <FaTwitter />
              </SocialIcon>
              <SocialIcon href="https://github.com/kodhive" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <FaGithub />
              </SocialIcon>
              <SocialIcon href="https://linkedin.com/company/kodhive" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <FaLinkedin />
              </SocialIcon>
            </SocialLinks>
          </LogoSection>

          <Column>
            <h3>Quick Links</h3>
            <LinksList>
              {/* UPDATED: Added onClick to scroll to top */}
              <li><FooterLink to="/" onClick={() => window.scrollTo(0, 0)}>Home</FooterLink></li>
              <li><FooterLink to="/internships">Internships</FooterLink></li>
              <li><FooterLink to="/request-project">Request a Project</FooterLink></li> 
              <li><FooterLink to="/contact">Contact</FooterLink></li>
            </LinksList>
          </Column>

          <Column>
            <h3>Get in Touch</h3>
            <ContactInfo>
              <a href="mailto:info@kodhive.com">
                <HiOutlineMail />
                <span>info@kodhive.com</span>
              </a>
              <div>
                <HiOutlineLocationMarker />
                <span>Nagpur, Maharashtra, India</span>
              </div>
            </ContactInfo>
          </Column>

          <Column>
            <h3>Stay Updated</h3>
            <p>Subscribe to our newsletter for the latest opportunities and news.</p>
            <NewsletterForm action="#" method="POST">
              <input type="email" placeholder="Your email" required />
              <button type="submit" aria-label="Subscribe">
                <HiOutlineArrowRight />
              </button>
            </NewsletterForm>
          </Column>
        </Grid>

        <Copyright>
          <p>&copy; {new Date().getFullYear()} Kodhive. All rights reserved.</p>
        </Copyright>
      </ContentWrapper>
    </FooterContainer>
  );
}