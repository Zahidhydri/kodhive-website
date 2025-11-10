// src/components/ScrollToTop.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useScroll } from '../contexts/ScrollContext'; // <-- IMPORT THE HOOK

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const mainScrollRef = useScroll(); // <-- GET THE REF

  useEffect(() => {
    // --- [FIX] Scroll the ref'd div, not the window ---
    if (mainScrollRef && mainScrollRef.current) {
      mainScrollRef.current.scrollTo({
        top: 0,
        behavior: 'smooth' // Use smooth scroll
      });
    }
  }, [pathname, mainScrollRef]); // Add mainScrollRef to dependency array

  return null; 
}