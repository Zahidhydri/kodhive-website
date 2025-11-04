// src/components/Navbar.jsx
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { HiMenuAlt3 } from 'react-icons/hi';
import styled, { keyframes } from 'styled-components';
import logo from '../assets/kodhive-logo.png'; // Make sure this logo exists

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
  
  /* These transitions and props are new */
  transition: box-shadow 0.3s ease, border-bottom 0.3s ease;
  box-shadow: ${({ $scrolled }) => $scrolled ? '0 2px 10px rgba(0, 0, 0, 0.1)' : 'none'};
  border-bottom: 1px solid ${({ theme, $scrolled }) => $scrolled ? theme.border : 'transparent'};
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

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
`;

const LogoText = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  background: linear-gradient(to right, #007bff, #6f42c1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
`;

const RightMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ProfileButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
`;

const ProfileImage = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  border: 2px solid #007bff;
`;

const SignInButton = styled(Link)`
  padding: 0.5rem 1rem;
  background-color: ${({ theme }) => theme.buttonBg};
  color: ${({ theme }) => theme.buttonText};
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
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

const ProfileDropdown = styled.div`
  position: absolute;
  right: 0;
  top: 50px;
  width: 12rem;
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 50;
  padding: 0.5rem 0;
`;

const DropdownItem = styled(Link)`
  display: block;
  padding: 0.75rem 1rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.text};
  text-decoration: none;
  &:hover {
    background: ${({ theme }) => theme.body};
  }
`;

const DropdownButton = styled.button`
  display: block;
  width: 100%;
  text-align: left;
  padding: 0.75rem 1rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.text};
  background: none;
  border: none;
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.body};
  }
`;

export default function Navbar({ toggleSidebar }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  // ADDED THIS STATE AND EFFECT
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10); // Set true if scrolled more than 10px
    };
    window.addEventListener('scroll', handleScroll);
    // Cleanup
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setIsProfileOpen(false);
      navigate('/');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <Nav $scrolled={scrolled}> {/* <-- Pass prop here */}
      <LogoLink to="/">
        <LogoImage src={logo} alt="Kodhive Logo" />
        <LogoText>Kodhive</LogoText>
      </LogoLink>

      <RightMenu>
        {currentUser ? (
          <div style={{ position: 'relative' }}>
            <ProfileButton onClick={() => setIsProfileOpen(!isProfileOpen)}>
              <ProfileImage src={currentUser.photoURL} alt="Profile" />
            </ProfileButton>
            
            {isProfileOpen && (
              <ProfileDropdown>
                <DropdownItem 
                  to="/profile" 
                  onClick={() => setIsProfileOpen(false)}
                >
                  Profile
                </DropdownItem>
                <DropdownButton onClick={handleLogout}>
                  Logout
                </DropdownButton>
              </ProfileDropdown>
            )}
          </div>
        ) : (
          <SignInButton to="/signin">Sign In</SignInButton>
        )}
        
        <MenuButton onClick={toggleSidebar}>
          <HiMenuAlt3 />
        </MenuButton>
      </RightMenu>
    </Nav>
  );
}