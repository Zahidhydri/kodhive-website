// src/App.jsx
import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import SignInModal from './components/SignInModal';
import Home from './pages/Home';
import Internships from './pages/Internships';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
// SignIn component is no longer imported
import ProjectRequest from './pages/ProjectRequest';
import { useAuth } from './contexts/AuthContext';

// 1. Define our themes (unchanged)
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

const darkTheme = {
  body: '#1a2035',
  text: '#e9ecef',
  nav: 'rgba(26, 32, 53, 0.8)',
  card: '#2a314e',
  border: '#40486a',
  buttonBg: '#4a69ff',
  buttonText: '#ffffff',
  buttonHover: '#3555f0',
};

// 2. Create a GlobalStyle component (unchanged)
const GlobalStyle = createGlobalStyle`
  html {
    scroll-behavior: smooth;
  }

  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 0.3s linear;
  }
`;

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { currentUser, loading } = useAuth();
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);

  // 3. Set up theme state (unchanged)
  const [theme, setTheme] = useState('light');
  const isDarkTheme = theme === 'dark';

  const toggleTheme = () => {
    const updatedTheme = isDarkTheme ? 'light' : 'dark';
    setTheme(updatedTheme);
    localStorage.setItem('theme', updatedTheme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
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
      
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar 
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          openSignInModal={openModal} 
        />
        <Sidebar 
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
          toggleTheme={toggleTheme}
          darkMode={isDarkTheme}
          openSignInModal={openModal}
        />
        <main style={{ flexGrow: 1 }}>
          <Routes>
            {/* UPDATED: Removed openModal prop */}
            <Route path="/" element={<Home />} />
            <Route path="/internships" element={<Internships />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/request-project" element={<ProjectRequest />} />
            <Route 
              path="/profile" 
              element={currentUser ? <Profile /> : <Navigate to="/" replace />} 
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;

