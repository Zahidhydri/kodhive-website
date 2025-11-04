// src/components/Footer.jsx
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../assets/kodhive-logo.png';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { HiOutlineMail, HiOutlineLocationMarker } from 'react-icons/hi';

const FooterContainer = styled.footer`
  background: ${({ theme }) => theme.card};
  border-top: 1px solid ${({ theme }) => theme.border};
  margin-top: 4rem;
  padding: 4rem 1.5rem;
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
    color: ${({ theme }) => theme.text === '#212529' ? '#6c757d' : '#adb5bd'};
    line-height: 1.6;
  }
`;

const LogoSection = styled(Column)`
  /* Make logo column span full width on small screens if needed, but grid handles it */
  @media (min-width: 640px) {
    grid-column: span 2; /* Logo takes half width on medium */
  }
  @media (min-width: 1024px) {
    grid-column: span 1; /* Logo takes 1 col on large */
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
  margin-top: 1.5rem;
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
  color: ${({ theme }) => theme.text === '#212529' ? '#6c757d' : '#adb5bd'};
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.buttonBg};
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  a {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    text-decoration: none;
    color: ${({ theme }) => theme.text === '#212529' ? '#6c757d' : '#adb5bd'};
    transition: color 0.3s ease;

    svg {
      font-size: 1.25rem;
      flex-shrink: 0;
    }
    
    &:hover {
      color: ${({ theme }) => theme.buttonBg};
    }
  }
`;


const Copyright = styled.div`
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 1px solid ${({ theme }) => theme.border};
  text-align: center;
  color: ${({ theme }) => theme.text === '#212529' ? '#6c757d' : '#adb5bd'};
`;

export default function Footer() {
  return (
    <FooterContainer>
      <ContentWrapper>
        <Grid>
          <LogoSection>
            <LogoDisplay to="/">
              <img src={logo} alt="Kodhive Logo" />
              <span>Kodhive</span>
            </LogoDisplay>
            <p>Connecting student talent with innovative real-world projects. Build your portfolio, gain experience, and launch your career.</p>
            <SocialLinks>
              <SocialIcon href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></SocialIcon>
              <SocialIcon href="https://github.com" target="_blank" rel="noopener noreferrer"><FaGithub /></SocialIcon>
              <SocialIcon href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></SocialIcon>
            </SocialLinks>
          </LogoSection>

          <Column>
            <h3>Quick Links</h3>
            <LinksList>
              <li><FooterLink to="/">Home</FooterLink></li>
              <li><FooterLink to="/internships">Internships</FooterLink></li>
              <li><FooterLink to="/request-project">Request a Project</FooterLink></li> 
              <li><FooterLink to="/contact">Contact</FooterLink></li>
            </LinksList>
          </Column>

          <Column>
            <h3>Services</h3>
            <LinksList>
              <li><FooterLink to="/#services">Custom Websites</FooterLink></li>
              <li><FooterLink to="/#services">Logo & Brand Design</FooterLink></li>
              <li><FooterLink to="/internships">Student Opportunities</FooterLink></li> 
            </LinksList>
          </Column>

          <Column>
            <h3>Get in Touch</h3>
            <ContactInfo>
              <a href="mailto:info@kodhive.com">
                <HiOutlineMail />
                info@kodhive.com
              </a>
              <a href="#">
                <HiOutlineLocationMarker />
                Nagpur, Maharashtra, India
              </a>
            </ContactInfo>
          </Column>
        </Grid>

        <Copyright>
          <p>&copy; {new Date().getFullYear()} Kodhive. All rights reserved.</p>
        </Copyright>
      </ContentWrapper>
    </FooterContainer>
  );
}
