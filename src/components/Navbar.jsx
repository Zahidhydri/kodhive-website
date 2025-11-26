// src/components/Navbar.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { HiMenuAlt3 } from 'react-icons/hi';
import styled from 'styled-components'; 
import logo from '../assets/kodhive-logo.png';
import { useScroll } from '../contexts/ScrollContext';

const Nav = styled.nav`
  position: sticky;
  top: 0;
  z-index: 40;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background: ${({ theme }) => theme.nav};
  backdrop-filter: blur(5px);
  
  transition: box-shadow 0.3s ease, border-bottom 0.3s ease;
  box-shadow: ${({ $scrolled }) => $scrolled ? '0 2px 10px rgba(0, 0, 0, 0.1)' : 'none'};
  border-bottom: 1px solid ${({ theme, $scrolled }) => $scrolled ? theme.border : 'transparent'};

  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
`;

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
`;

const LogoImage = styled.img`
  height: 40px;
  width: 40px;
`;

const LogoText = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(to right, #007bff, #6f42c1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const NavLinks = styled.div`
  display: none;
  gap: 1.5rem;
  
  @media (min-width: 900px) {
    display: flex;
    align-items: center;
  }
`;

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.text};
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;
  transition: color 0.3s;
  
  &:hover {
    color: ${({ theme }) => theme.buttonBg};
  }
`;

const RightMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const SignInButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: ${({ theme }) => theme.buttonBg};
  color: ${({ theme }) => theme.buttonText};
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  border: none;
  font-size: 0.9rem;
  font-family: inherit;
  cursor: pointer;
  
  &:hover {
    background-color: ${({ theme }) => theme.buttonHover};
  }
  
  @media (max-width: 600px) {
    display: none; /* Hide on mobile to save space */
  }
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  font-size: 1.875rem;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
`;

export default function Navbar({ toggleSidebar, openSignInModal }) {
  const { currentUser } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const mainScrollRef = useScroll();

  const handleScrollToTop = () => {
    if (mainScrollRef && mainScrollRef.current) {
      mainScrollRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const scrollContainer = mainScrollRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      setScrolled(scrollContainer.scrollTop > 10);
    };
    
    scrollContainer.addEventListener('scroll', handleScroll);
    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, [mainScrollRef]);

  return (
    <Nav $scrolled={scrolled}>
      <LogoLink to="/" onClick={handleScrollToTop}>
        <LogoImage src={logo} alt="Skill Tensor Logo" />
        <LogoText>Skill Tensor</LogoText>
      </LogoLink>

      <NavLinks>
        {/* Removed Internships, Pricing, and Contact Links */}
      </NavLinks>

      <RightMenu>
        {!currentUser && (
          <SignInButton onClick={openSignInModal}>
            Sign In
          </SignInButton>
        )}
        
        <MenuButton onClick={toggleSidebar}>
          <HiMenuAlt3 />
        </MenuButton>
      </RightMenu>
    </Nav>
  );
}