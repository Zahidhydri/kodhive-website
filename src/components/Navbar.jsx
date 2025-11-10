// src/components/Navbar.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { HiMenuAlt3 } from 'react-icons/hi';
import styled from 'styled-components'; 
import logo from '../assets/kodhive-logo.png';

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
  font-weight: bold;
  background: linear-gradient(to right, #007bff, #6f42c1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
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
  font-size: 0.9rem; // Match font
  font-family: inherit; // Match font
  cursor: pointer;
  
  &:hover {
    background-color: ${({ theme }) => theme.buttonHover};
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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Nav $scrolled={scrolled}>
      {/* [REMOVED] onClick handler */}
      <LogoLink to="/">
        <LogoImage src={logo} alt="Kodhive Logo" />
        <LogoText>Kodhive</LogoText>
      </LogoLink>

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