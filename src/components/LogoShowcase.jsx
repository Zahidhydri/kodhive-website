// src/components/LogoShowcase.jsx
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import logoHex from '/src/assets/kodhive-logo.png';

// --- Animations ---
const gradientText = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// --- Styled Components ---

const ShowcaseSection = styled(motion.section)`
  padding: 4rem 1.5rem;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.body};
  border-bottom: 1px solid ${({ theme }) => theme.border}; /* Subtle divider */
`;

const LogoWrapper = styled(motion.div)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  z-index: 3;
  gap: 1.5rem;
  margin-bottom: 1.5rem;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const AnimatedHexLogo = styled(motion.img)`
  width: auto;
  max-height: 80px; /* Reduced size slightly for cleaner look */
  height: auto;
  z-index: 2;
  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
  transition: filter 0.3s ease;

  &:hover {
    filter: drop-shadow(0 10px 15px rgba(0, 0, 0, 0.15));
  }

  @media (min-width: 768px) {
    max-height: 100px;
  }
`;

const LogoTextTitle = styled(motion.h1)`
  font-size: 3rem;
  font-weight: 800;
  margin: 0;
  z-index: 2;
  letter-spacing: -1px;
  /* Dynamic text color based on theme */
  color: ${({ theme }) => theme.text}; 
  
  @media (min-width: 768px) {
    font-size: 4.5rem;
  }
  
  span {
    color: ${({ theme }) => theme.buttonBg}; /* Brand color for second word */
  }
`;

const StyledTagline = styled(motion.p)`
  font-size: 1.2rem;
  font-weight: 600; 
  z-index: 3;
  text-align: center;
  
  /* Animated Gradient Text */
  background: linear-gradient(
    90deg, 
    ${({ theme }) => theme.buttonBg}, 
    #6f42c1, 
    #d81b60
  );
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${gradientText} 5s linear infinite;

  @media (min-width: 768px) {
    font-size: 1.75rem; 
  }
`;

// --- Variants ---
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const LogoShowcase = () => {
  return (
    <ShowcaseSection
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Removed Hexagon Background for cleaner look */}
      
      <LogoWrapper variants={itemVariants}>
        <AnimatedHexLogo 
          src={logoHex} 
          alt="Skill Tensor Logo" 
          whileHover={{ scale: 1.05, rotate: 5 }}
          transition={{ type: 'spring', stiffness: 300 }}
        />
        <LogoTextTitle>
          Skill <span>Tensor</span>
        </LogoTextTitle>
      </LogoWrapper>

      <StyledTagline variants={itemVariants}>
        Unleash Your Digital Potential.
      </StyledTagline>
    </ShowcaseSection>
  );
};

export default LogoShowcase;