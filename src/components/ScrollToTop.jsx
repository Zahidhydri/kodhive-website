// src/components/ScrollToTop.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useScroll } from '../contexts/ScrollContext';

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const mainScrollRef = useScroll(); 

  useEffect(() => {
    if (mainScrollRef && mainScrollRef.current) {
      mainScrollRef.current.scrollTo({
        top: 0,
        behavior: 'auto' // <-- [FIX] Change 'smooth' to 'auto'
      });
    }
  }, [pathname, mainScrollRef]); 

  return null; 
}