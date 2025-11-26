// src/App.jsx
import { useState, useEffect, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { AnimatePresence } from 'framer-motion'; 
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import SignInModal from './components/SignInModal';
import Preloader from './components/Preloader'; // <-- IMPORT PRELOADER
import Home from './pages/Home';
import Internships from './pages/Internships';
import Contact from './pages/Contact';
import ProjectRequest from './pages/ProjectRequest';
import VerifyCertificate from './pages/VerifyCertificate.jsx'; 
import { useAuth } from './contexts/AuthContext';
import ScrollToTop from './components/ScrollToTop';
import { ScrollContext } from './contexts/ScrollContext';

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
  '--scrollbar-thumb-color': '#adb5bd', 
  '--scrollbar-track-color': '#f8f9fa', 
  '--scrollbar-hover-color': '#6c757d',
};

const darkTheme = {
  body: '#1a2035', 
  text: '#e9ecef', 
  nav: 'rgba(26, 32, 53, 0.8)', 
  card: '#2a314e', 
  border: '#40486a', 
  buttonBg: '#4a69ff', 
  buttonText: '#ffffff',
  buttonHover: '#3555f0', 
  '--scrollbar-thumb-color': '#40486a', 
  '--scrollbar-track-color': '#1a2035', 
  '--scrollbar-hover-color': '#6c757d',
};


// 2. Create a GlobalStyle component
const GlobalStyle = createGlobalStyle`
  html {
    scroll-behavior: smooth;
    overflow-x: hidden; 
  }

  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 0.3s linear;
    overflow-x: hidden; 

    /* Apply CSS variables for scrollbar theming */
    --scrollbar-thumb-color: ${({ theme }) => theme['--scrollbar-thumb-color']};
    --scrollbar-track-color: ${({ theme }) => theme['--scrollbar-track-color']};
    --scrollbar-hover-color: ${({ theme }) => theme['--scrollbar-hover-color']};
  }
  
  #root {
    height: 100vh;
    overflow-x: hidden; 
  }
`;


function App() {
  const [loadingApp, setLoadingApp] = useState(true); // <-- App loading state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { currentUser, loading: authLoading } = useAuth();
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);

  // 3. Set up theme state
  const [theme, setTheme] = useState('light');
  const isDarkTheme = theme === 'dark';

  const mainScrollRef = useRef(null);
  const location = useLocation();

  const toggleTheme = () => {
    const updatedTheme = isDarkTheme ? 'light' : 'dark';
    setTheme(updatedTheme);
    localStorage.setItem('theme', updatedTheme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    setTheme(savedTheme || 'light');
  }, []);

  // Simulate content loading, or wait for Auth
  useEffect(() => {
    // You can remove this timer if you purely rely on Preloader component's internal timer
    // But keeping a safeguard is good.
    if (!authLoading) {
       // Allow preloader to finish its animation
    }
  }, [authLoading]);

  // Auth Modal Logic
  useEffect(() => {
    if (!authLoading && !loadingApp) { // Wait for app to finish loading
      const modalClosed = sessionStorage.getItem('kodhive-signin-modal-closed');
      if (!currentUser && !modalClosed) {
        const timer = setTimeout(() => {
          setIsSignInModalOpen(true);
        }, 3000); // Increased delay slightly to not pop up immediately after preloader
        return () => clearTimeout(timer);
      }
    }
  }, [currentUser, authLoading, loadingApp]);

  const closeModal = () => {
    setIsSignInModalOpen(false);
    sessionStorage.setItem('kodhive-signin-modal-closed', 'true');
  };

  const openModal = () => {
    setIsSignInModalOpen(true);
  };

  return (
    <ScrollContext.Provider value={mainScrollRef}>
      <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
        <GlobalStyle />
        
        <AnimatePresence mode="wait">
          {loadingApp && (
            <Preloader onComplete={() => setLoadingApp(false)} />
          )}
        </AnimatePresence>

        {/* Main App Content - Only show after loading (or underneath if you prefer fade out) */}
        {!loadingApp && (
          <>
            <ScrollToTop /> 
            
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

            <div ref={mainScrollRef} style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              height: '100vh',      
              overflowY: 'auto',    
              overflowX: 'hidden',  
              position: 'relative', 
              zIndex: 1             
            }}>
              <Navbar 
                toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
                openSignInModal={openModal} 
              />
              <main style={{ flexGrow: 1 }}>
                <AnimatePresence mode="wait">
                  <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<Home />} />
                    <Route path="/internships" element={<Internships />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/request-project" element={<ProjectRequest />} />
                    <Route path="/verify" element={<VerifyCertificate />} />
                  </Routes>
                </AnimatePresence>
              </main>
              
              <Footer />
            </div>
          </>
        )}
      </ThemeProvider>
    </ScrollContext.Provider>
  );
}

export default App;