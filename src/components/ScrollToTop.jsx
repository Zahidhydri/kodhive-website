// src/components/ScrollToTop.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useScroll } from '../contexts/ScrollContext';

export default function ScrollToTop() {
  // --- [FIX 1] Get the `search` string from the location ---
  const { pathname, search } = useLocation();
  const mainScrollRef = useScroll(); 

  useEffect(() => {
    // --- [FIX 2] Check if we are linking to a form ---
    const params = new URLSearchParams(search);
    const isFormLink = pathname === '/request-project' && params.has('form');

    // --- [FIX 3] Only scroll to top if it's NOT a form link ---
    if (mainScrollRef && mainScrollRef.current && !isFormLink) {
      mainScrollRef.current.scrollTo({
        top: 0,
        behavior: 'auto'
      });
    }
  }, [pathname, search, mainScrollRef]); // <-- Add `search` dependency

  return null; 
}