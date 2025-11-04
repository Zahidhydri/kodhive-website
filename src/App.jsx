// src/App.jsx
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Internships from './pages/Internships';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import ProjectRequest from './pages/ProjectRequest'; // Make sure this is imported
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

const darkTheme = {
  body: '#121212',
  text: '#e9ecef',
  nav: 'rgba(33, 37, 41, 0.8)',
  card: '#1e1e1e',
  border: '#495057',
  buttonBg: '#0d6efd',
  buttonText: '#ffffff',
  buttonHover: '#0b5ed7',
};

// 2. Create a GlobalStyle component to set body background and text color
const GlobalStyle = createGlobalStyle`
  html {
    scroll-behavior: smooth; /* <-- THIS WAS ADDED */
  }

  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 0.3s linear;
  }
`;

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { currentUser } = useAuth();
  
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
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  return (
    // 4. Wrap everything in the ThemeProvider
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <GlobalStyle />
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar 
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
        />
        <Sidebar 
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
          toggleTheme={toggleTheme}
          darkMode={isDarkTheme}
        />
        <main style={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/internships" element={<Internships />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/request-project" element={<ProjectRequest />} />
            <Route path="/profile" element={currentUser ? <Profile /> : <SignIn />} />
            <Route path="/signin" element={<SignIn />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;