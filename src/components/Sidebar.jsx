// src/components/Sidebar.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx'; // Corrected path
import { HiX, HiOutlineHome, HiOutlineBriefcase, HiOutlineMail, HiOutlinePencilAlt, HiOutlineLogout, HiOutlineUser } from 'react-icons/hi';
import ThemeToggle from './ThemeToggle'; // Corrected path
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

// NEW: Component for user profile display at the top
const UserProfileDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem 1rem; /* More padding */
  border-bottom: 1px solid ${({ theme }) => theme.border};
`;

const ProfileImage = styled.img`
  width: 50px; /* Increased size */
  height: 50px; /* Increased size */
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid ${({ theme }) => theme.buttonBg}; /* Added border */
`;

// NEW: Fallback icon for profile
const ProfileIconFallback = styled.div`
  width: 50px; /* Increased size */
  height: 50px; /* Increased size */
  border-radius: 50%;
  background: ${({ theme }) => theme.border};
  color: ${({ theme }) => theme.text === '#212529' ? '#495057' : '#adb5bd'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.75rem; /* Increased size */
`;

// NEW: Wrapper for text
const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden; /* To handle text overflow */
`;

const WelcomeText = styled.span`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.text === '#212529' ? '#6c757d' : '#adb5bd'};
  margin-bottom: 0.125rem;
`;

const ProfileName = styled.span`
  font-weight: 700; /* Bolder */
  color: ${({ theme }) => theme.text};
  font-size: 1.1rem; /* Larger */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
  border: none; 
  font-size: 1rem; 
  font-family: inherit; 
  cursor: pointer; 

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
  background: #dc3545; 
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

  const handleSignInClick = () => {
    closeSidebar();
    openSignInModal();
  };

  // NEW: Combined function for Home link
  const handleHomeClick = () => {
    closeSidebar();
    window.scrollTo(0, 0);
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

            {/* MOVED: User profile display is now at the top */}
            {currentUser && (
              <UserProfileDisplay>
                {currentUser.photoURL ? (
                  <ProfileImage src={currentUser.photoURL} alt={currentUser.displayName || 'Profile'} />
                ) : (
                  <ProfileIconFallback>
                    <HiOutlineUser />
                  </ProfileIconFallback>
                )}
                <ProfileInfo>
                  <WelcomeText>Welcome back,</WelcomeText>
                  <ProfileName>{currentUser.displayName || 'User'}</ProfileName>
                </ProfileInfo>
              </UserProfileDisplay>
            )}

            <Nav>
              {/* UPDATED: onClick handler */}
              <NavLink to="/" onClick={handleHomeClick}>
                <HiOutlineHome /> Home
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
                <SignInButton onClick={handleSignInClick}>
                  Sign In / Sign Up
                </SignInButton>
              ) : (
                <>
                  {/* REMOVED: UserProfile block was here */}
                  <LogoutButton onClick={handleLogout}>
                    <HiOutlineLogout /> Logout
                  </LogoutButton>
                </>
              )}
            </Footer>
          </SidebarContainer>
        </>
      )}
    </AnimatePresence>
  );
}