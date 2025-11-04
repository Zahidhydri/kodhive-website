// src/components/ThemeToggle.jsx
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { HiSun, HiMoon } from 'react-icons/hi';

// The main container for the switch
const ToggleContainer = styled.button`
  width: 70px;
  height: 40px;
  display: flex;
  align-items: center;
  border-radius: 25px;
  padding: 4px;
  cursor: pointer;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.body};
  /* Align based on dark mode state */
  justify-content: ${({ $darkMode }) => ($darkMode ? 'flex-end' : 'flex-start')};
  
  &:hover {
    background: ${({ theme }) => theme.border};
  }
`;

// The sliding "thumb" of the switch
const ToggleThumb = styled(motion.div)`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  
  /* Set color based on theme */
  background: ${({ $darkMode, theme }) => ($darkMode ? theme.buttonBg : '#f9c74f')};
  color: ${({ $darkMode, theme }) => ($darkMode ? theme.buttonText : '#1a2035')};
  
  svg {
    font-size: 1.25rem;
  }
`;

// Animation properties for the sliding thumb
const spring = {
  type: "spring",
  stiffness: 700,
  damping: 30
};

export default function ThemeToggle({ toggleTheme, darkMode }) {
  return (
    <ToggleContainer onClick={toggleTheme} $darkMode={darkMode}>
      <ToggleThumb
        $darkMode={darkMode}
        layout
        transition={spring}
      >
        <motion.div
          key={darkMode ? 'moon' : 'sun'}
          initial={{ opacity: 0, rotate: -90 }}
          animate={{ opacity: 1, rotate: 0 }}
          transition={{ duration: 0.2 }}
        >
          {darkMode ? <HiMoon /> : <HiSun />}
        </motion.div>
      </ToggleThumb>
    </ToggleContainer>
  );
}