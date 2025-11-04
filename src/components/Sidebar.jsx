// src/components/Sidebar.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { HiX, HiOutlineHome, HiOutlineUser, HiOutlineBriefcase, HiOutlineMail, HiOutlinePencilAlt, HiOutlineLogout } from 'react-icons/hi';
import ThemeToggle from './ThemeToggle';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';

const Backdrop = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 45;
`;

const SidebarContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  width: 320px;
  max-width: 100%;
  background: ${({ theme }) => theme.card};
  box-shadow: -4px 0 12px rgba(0, 0, 0, 0.1);
  z-index: 50;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  
  h2 {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0;
  }
  
  button {
    background: none;
    border: none;
    font-size: 1.875rem;
    color: ${({ theme }) => theme.text};
    cursor: pointer;
  }
`;

const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  
  img {
    height: 64px;
    width: 64px;
    border-radius: 50%;
    margin-bottom: 0.5rem;
  }
  
  span {
    font-weight: 600;
  }
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 0.5rem;
  flex-grow: 1;
`;

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  text-decoration: none;
  color: ${({ theme }) => theme.text};
  font-size: 1.1rem;
  font-weight: 500;
  
  svg {
    font-size: 1.5rem;
    opacity: 0.8;
  }
  
  &:hover {
    background: ${({ theme }) => theme.body};
  }
`;

const Footer = styled.div`
  padding: 1rem;
  border-top: 1px solid ${({ theme }) => theme.border};
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

// CHANGED: This is now a styled.button, not styled(Link)
const SignInButton = styled.button`
  display: block;
  width: 100%;
  padding: 0.75rem 1rem;
  background: ${({ theme }) => theme.buttonBg};
  color: ${({ theme }) => theme.buttonText};
  text-align: center;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  border: none; // Added
  font-size: 1rem; // Added
  font-family: inherit; // Added
  cursor: pointer; // Added

  &:hover {
    background: ${({ theme }) => theme.buttonHover};
  }
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0.75rem 1rem;
  background: #dc3545; // A distinct red color for logout
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  gap: 0.5rem;

  &:hover {
    background: #c82333;
  }

  svg {
    font-size: 1.25rem;
  }
`;

// ACCEPT the new prop
export default function Sidebar({ isOpen, setIsOpen, toggleTheme, darkMode, openSignInModal }) {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const closeSidebar = () => setIsOpen(false);

  const handleLogout = async () => {
    closeSidebar();
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  // NEW: Handler for the sign-in button
  const handleSignInClick = () => {
    closeSidebar();
    openSignInModal();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <Backdrop
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSidebar}
          />
          <SidebarContainer
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <Header>
              <h2>Menu</h2>
              <button onClick={closeSidebar}><HiX /></button>
            </Header>

            {currentUser && (
              <ProfileSection>
                <img src={currentUser.photoURL} alt={currentUser.displayName} />
                <span>{currentUser.displayName}</span>
              </ProfileSection>
            )}

            <Nav>
              <NavLink to="/" onClick={closeSidebar}>
                <HiOutlineHome /> Home
              </NavLink>
              <NavLink to="/profile" onClick={closeSidebar}>
                <HiOutlineUser /> Profile
              </NavLink>
              <NavLink to="/internships" onClick={closeSidebar}>
                <HiOutlineBriefcase /> Internships
              </NavLink>
              <NavLink to="/request-project" onClick={closeSidebar}>
                <HiOutlinePencilAlt /> Request a Project
              </NavLink>
              <NavLink to="/contact" onClick={closeSidebar}>
                <HiOutlineMail /> Contact Us
              </NavLink>
            </Nav>

            <Footer>
              <ThemeToggle toggleTheme={toggleTheme} darkMode={darkMode} />
              
              {!currentUser ? (
                // UPDATED: Now a button that calls handleSignInClick
                <SignInButton onClick={handleSignInClick}>
                  Sign In / Sign Up
                </SignInButton>
              ) : (
                <LogoutButton onClick={handleLogout}>
                  <HiOutlineLogout /> Logout
                </LogoutButton>
              )}
            </Footer>
          </SidebarContainer>
        </>
      )}
    </AnimatePresence>
  );
}
