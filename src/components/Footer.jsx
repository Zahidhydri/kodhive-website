// src/components/Footer.jsx
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../assets/kodhive-logo.png';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const FooterContainer = styled.footer`
  background: ${({ theme }) => theme.card};
  border-top: 1px solid ${({ theme }) => theme.border};
  margin-top: 4rem;
  padding: 3rem 1.5rem;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const LogoSection = styled.div`
  img {
    height: 40px;
    width: 40px;
  }
  span {
    font-size: 1.5rem;
    font-weight: bold;
  }
  p {
    color: ${({ theme }) => theme.text === '#212529' ? '#6c757d' : '#adb5bd'};
  }
`;

const LinksSection = styled.div`
  h3 {
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  a {
    text-decoration: none;
    color: inherit;
    &:hover {
      color: #007bff;
    }
  }
`;

const SocialSection = styled.div`
  h3 {
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }
  div {
    display: flex;
    gap: 1rem;
    font-size: 1.5rem;
  }
  a {
    color: inherit;
    &:hover {
      color: #007bff;
    }
  }
`;

const Copyright = styled.div`
  margin-top: 3rem;
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <img src={logo} alt="Kodhive Logo" />
              <span>Kodhive</span>
            </div>
            <p>Connecting student talent with real-world projects.</p>
          </LogoSection>

          <LinksSection>
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/internships">Internships</Link></li>
              <li><Link to="/request-project">Request a Project</Link></li> 
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </LinksSection>

          <SocialSection>
            <h3>Follow Us</h3>
            <div>
              <a href="#"><FaTwitter /></a>
              <a href="#"><FaGithub /></a>
              <a href="#"><FaLinkedin /></a>
            </div>
          </SocialSection>
        </Grid>

        <Copyright>
          <p>&copy; {new Date().getFullYear()} Kodhive. All rights reserved.</p>
        </Copyright>
      </ContentWrapper>
    </FooterContainer>
  );
}