// src/components/ThemeToggle.jsx
import styled from 'styled-components';
import { HiSun, HiMoon } from 'react-icons/hi';

const ToggleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border-radius: 6px;
  background: ${({ theme }) => theme.body};
  border: 1px solid ${({ theme }) => theme.border};
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  
  &:hover {
    background: ${({ theme }) => theme.border};
  }
  
  svg {
    margin-right: 0.5rem;
  }
`;

export default function ThemeToggle({ toggleTheme, darkMode }) {
  return (
    <ToggleButton onClick={toggleTheme}>
      {darkMode ? (
        <>
          <HiSun /> Light Mode
        </>
      ) : (
        <>
          <HiMoon /> Dark Mode
        </>
      )}
    </ToggleButton>
  );
}