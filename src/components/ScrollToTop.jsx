// src/components/ScrollToTop.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // [FIX] Change to an object to respect smooth behavior
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [pathname]); // Dependency array ensures this runs on every path change

  return null; // This component doesn't render any UI
}