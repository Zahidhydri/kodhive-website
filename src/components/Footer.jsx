// src/components/Footer.jsx
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../assets/kodhive-logo.png';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { HiOutlineMail, HiOutlineLocationMarker } from 'react-icons/hi';
import { useScroll } from '../contexts/ScrollContext';

const FooterContainer = styled.footer`
  background: ${({ theme }) => theme.body};
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
  
  @media (min-width: 768px) {
    grid-template-columns: 1.5fr 1fr 1fr; 
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
    background: linear-gradient(to right, ${({ theme }) => theme.buttonBg}, #6f42c1);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
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
  background: ${({ theme }) => theme.card};
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
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;

  &:hover {
    color: ${({ theme }) => theme.buttonBg};
    transform: translateX(4px);
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

const Copyright = styled.div`
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 1px solid ${({ theme }) => theme.border};
  text-align: center;
  color: ${({ theme }) => (theme.text === '#212529' ? '#6c757d' : '#adb5bd')};
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  
  p {
    margin: 0;
    font-size: 0.9rem;
  }
  
  /* Style for Privacy Policy link in copyright area */
  a {
    color: ${({ theme }) => theme.textSecondary};
    text-decoration: none;
    font-size: 0.85rem;
    &:hover {
        text-decoration: underline;
    }
  }
`;

export default function Footer() {
  const mainScrollRef = useScroll();

  const handleScrollToTop = () => {
    if (mainScrollRef && mainScrollRef.current) {
      mainScrollRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  return (
    <FooterContainer>
      <ContentWrapper>
        <Grid>
          <LogoSection>
            <LogoDisplay to="/" onClick={handleScrollToTop}>
              <img src={logo} alt="Skill Tensor Logo" />
              <span>Skill Tensor</span>
            </LogoDisplay>
            <p>Connecting student talent with innovative real-world projects. Build your portfolio, gain experience, and launch your career.</p>
            <SocialLinks>
              {/* Updated dummy links */}
              <SocialIcon href="#" aria-label="Twitter">
                <FaTwitter />
              </SocialIcon>
              <SocialIcon href="#" aria-label="GitHub">
                <FaGithub />
              </SocialIcon>
              <SocialIcon href="#" aria-label="LinkedIn">
                <FaLinkedin />
              </SocialIcon>
            </SocialLinks>
          </LogoSection>

          <Column>
            <h3>Quick Links</h3>
            <LinksList>
              <li><FooterLink to="/" onClick={handleScrollToTop}>Home</FooterLink></li>
              <li><FooterLink to="/internships" onClick={handleScrollToTop}>Internships</FooterLink></li>
              <li><FooterLink to="/request-project" onClick={handleScrollToTop}>Request a Project</FooterLink></li> 
              <li><FooterLink to="/contact" onClick={handleScrollToTop}>Contact</FooterLink></li>
              <li><FooterLink to="/privacy-policy" onClick={handleScrollToTop}>Privacy Policy</FooterLink></li> {/* Added link */}
            </LinksList>
          </Column>

          <Column>
            <h3>Get in Touch</h3>
            <ContactInfo>
              <a href="mailto:hello@skilltensor.com">
                <HiOutlineMail />
                <span>hello@skilltensor.com</span>
              </a>
              <div>
                <HiOutlineLocationMarker />
                <span>Nagpur, Maharashtra, India</span>
              </div>
            </ContactInfo>
          </Column>

        </Grid>

        <Copyright>
          <p>&copy; {new Date().getFullYear()} Skill Tensor. All rights reserved.</p>
        </Copyright>
      </ContentWrapper>
    </FooterContainer>
  );
}