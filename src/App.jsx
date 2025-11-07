// src/App.jsx
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import SignInModal from './components/SignInModal';
import Home from './pages/Home';
import Internships from './pages/Internships';
import Contact from './pages/Contact';
import ProjectRequest from './pages/ProjectRequest';
import { useAuth } from './contexts/AuthContext';

// 1. Define our themes
const lightTheme = {
  body: '#f8f9fa',
  text: '#212529',
  nav: 'rgba(255, 255, 255, 0.8)',
  card: '#ffffff',
  border: '#dee2e6',
  buttonBg: '#007bff',
  buttonText: '#ffffff',
  buttonHover: '#0056b3',
};

// UPDATED Dark Theme
const darkTheme = {
  body: '#1a2035', // Dark indigo base
  text: '#e9ecef', // Light text for contrast
  nav: 'rgba(26, 32, 53, 0.8)', // Darker nav with blur
  card: '#2a314e', // Slightly lighter indigo for cards/modals
  border: '#40486a', // Muted blue for borders
  buttonBg: '#4a69ff', // A brighter blue for primary buttons
  buttonText: '#ffffff',
  buttonHover: '#3555f0', // Slightly darker hover for the button
};

// 2. Create a GlobalStyle component
const GlobalStyle = createGlobalStyle`
  html {
    scroll-behavior: smooth;
    overflow-x: hidden; /* <-- FIX 1: Add overflow-x here */
  }

  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 0.3s linear;
    
    /* FIX: Ensure body doesn't overflow, 
       which can break viewport-based layouts */
    overflow-x: hidden; 
  }
  
  /* FIX: Ensure root takes up full height */
  #root {
    height: 100vh;
    overflow-x: hidden; /* <-- FIX 2: Add overflow-x here */
  }
`;

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { currentUser, loading } = useAuth();
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);

  // 3. Set up theme state
  const [theme, setTheme] = useState('light');
  const isDarkTheme = theme === 'dark';

  const toggleTheme = () => {
    const updatedTheme = isDarkTheme ? 'light' : 'dark';
    setTheme(updatedTheme);
    localStorage.setItem('theme', updatedTheme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    // Set default to light if no theme is saved
    setTheme(savedTheme || 'light');
  }, []);

  // Effect to show the modal on load (unchanged)
  useEffect(() => {
    if (!loading) {
      const modalClosed = sessionStorage.getItem('kodhive-signin-modal-closed');
      if (!currentUser && !modalClosed) {
        const timer = setTimeout(() => {
          setIsSignInModalOpen(true);
        }, 1500);
        return () => clearTimeout(timer);
      }
    }
  }, [currentUser, loading]);

  const closeModal = () => {
    setIsSignInModalOpen(false);
    sessionStorage.setItem('kodhive-signin-modal-closed', 'true');
  };

  const openModal = () => {
    setIsSignInModalOpen(true);
  };

  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <GlobalStyle />
      
      <AnimatePresence>
        {isSignInModalOpen && <SignInModal closeModal={closeModal} />}
      </AnimatePresence>
      
      <Sidebar 
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        toggleTheme={toggleTheme}
        darkMode={isDarkTheme}
        openSignInModal={openModal}
      />

      {/* This div is the main scrolling container.
        We add overflowX: 'hidden' here as well.
      */}
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        height: '100vh',      
        overflowY: 'auto',    
        overflowX: 'hidden',  /* <-- FIX 3: Add this line */
        position: 'relative', 
        zIndex: 1             
      }}>
        <Navbar 
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          openSignInModal={openModal} 
        />
        <main style={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/internships" element={<Internships />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/request-project" element={<ProjectRequest />} />
            {/* REMOVED Profile Route */}
          </Routes>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;