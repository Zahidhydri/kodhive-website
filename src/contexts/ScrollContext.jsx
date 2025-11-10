// src/contexts/ScrollContext.jsx
import { createContext, useContext } from 'react';

// Create the context
export const ScrollContext = createContext(null);

// Create a custom hook to easily use the context
export const useScroll = () => {
  return useContext(ScrollContext);
};