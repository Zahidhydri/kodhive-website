// src/components/ScrollToTop.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scrolls to the top of the page on any route change
    window.scrollTo(0, 0);
  }, [pathname]); // Dependency array ensures this runs on every path change

  return null; // This component doesn't render any UI
}