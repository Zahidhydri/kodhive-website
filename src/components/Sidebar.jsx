// src/components/Sidebar.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx'; 
import { HiX, HiOutlineHome, HiOutlineBriefcase, HiOutlineMail, HiOutlinePencilAlt, HiOutlineLogout, HiOutlineUser, HiOutlineBookOpen, HiOutlineGlobe, HiOutlineCurrencyRupee } from 'react-icons/hi';
import ThemeToggle from './ThemeToggle'; 
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { useScroll } from '../contexts/ScrollContext';

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

const UserProfileDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem 1rem; 
  border-bottom: 1px solid ${({ theme }) => theme.border};
`;

const ProfileImage = styled.img`
  width: 50px; 
  height: 50px; 
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid ${({ theme }) => theme.buttonBg}; 
`;

const ProfileIconFallback = styled.div`
  width: 50px; 
  height: 50px; 
  border-radius: 50%;
  background: ${({ theme }) => theme.border};
  color: ${({ theme }) => theme.text === '#212529' ? '#495057' : '#adb5bd'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.75rem; 
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden; 
`;

const WelcomeText = styled.span`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.text === '#212529' ? '#6c757d' : '#adb5bd'};
  margin-bottom: 0.125rem;
`;

const ProfileName = styled.span`
  font-weight: 700; 
  color: ${({ theme }) => theme.text};
  font-size: 1.1rem; 
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
  overflow-y: auto; 
`;

const NavLink = styled(motion.a).attrs(props => ({
    as: props.to ? Link : 'a',
    target: props.$isExternal ? '_blank' : undefined,
    rel: props.$isExternal ? 'noopener noreferrer' : undefined,
}))`
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

  ${props => props.$isComingSoon && `
    color: ${props.theme.text}99;
    cursor: default;
    &:hover {
        background: transparent;
    }
  `}
`;

const StatusText = styled.span`
    margin-left: auto;
    font-size: 0.75rem;
    font-weight: 600;
    color: ${({ theme }) => theme.buttonBg};
    background: ${({ theme }) => theme.buttonBg}20;
    padding: 0.125rem 0.5rem;
    border-radius: 4px;
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
  
  @media (max-width: 600px) {
    display: none; /* Hide on mobile to save space */
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
  const mainScrollRef = useScroll();

  const handleScrollToTop = () => {
    if (mainScrollRef && mainScrollRef.current) {
      mainScrollRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  const closeSidebar = () => setIsOpen(false);

  const handlePageNavigation = () => {
    handleScrollToTop();
    closeSidebar();
  };
  
  const handleLogout = async () => {
    handleScrollToTop();
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
  
  const handleComingSoonClick = (e) => {
    e.preventDefault(); 
    closeSidebar();
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
              <NavLink to="/" onClick={handlePageNavigation}>
                <HiOutlineHome /> Home
              </NavLink>
              
              <NavLink to="/internships" onClick={handlePageNavigation}>
                <HiOutlineBriefcase /> Internships
              </NavLink>

              {/* Removed Pricing Link */}
              
              <NavLink to="/request-project" onClick={handlePageNavigation}>
                <HiOutlinePencilAlt /> Request a Project
              </NavLink>
              
              <NavLink 
                href="#" 
                $isComingSoon 
                onClick={handleComingSoonClick}
              >
                <HiOutlineBookOpen /> Courses
                <StatusText>Soon</StatusText>
              </NavLink>
              
              <NavLink 
                href="#" 
                $isExternal
                onClick={closeSidebar} 
              >
                <HiOutlineGlobe /> Community
              </NavLink>

              <NavLink to="/contact" onClick={handlePageNavigation}>
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