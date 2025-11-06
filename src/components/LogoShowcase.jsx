// src/components/LogoShowcase.jsx
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import logoText from '/src/assets/kodhive.png'; // The text logo
import logoHex from '/src/assets/kodhive-logo.png'; // The hexagon logo

// Main section wrapper
// UPDATED: Removed radial-gradient and simplified padding for a cleaner look
const ShowcaseSection = styled(motion.section)`
  padding: 4rem 1.5rem 6rem 1.5rem; /* Standard padding */
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.body}; /* Clean background */
`;

// REMOVED: HexagonBackground and FloatingLogo components

// Wrapper for the logos
const LogoWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column; /* Stack on mobile */
  align-items: center;
  justify-content: center;
  z-index: 3;
  gap: 1.5rem;

  @media (min-width: 768px) {
    flex-direction: row; /* Side-by-side on desktop */
    align-items: center; /* Vertically align centers */
    gap: 2.5rem;
  }
`;

// UPDATED: Removed keyframe animation
const AnimatedHexLogo = styled(motion.img)`
  width: auto;
  max-height: 90px;
  height: auto;

  @media (min-width: 768px) {
    max-height: 110px;
  }
`;

// UPDATED: Removed keyframe animation
const AnimatedTextLogo = styled(motion.img)`
  width: auto;
  max-height: 70px; /* Slightly smaller height to match visual weight */
  height: auto;

  @media (min-width: 768px) {
    max-height: 90px;
  }
`;

// UPDATED: Removed gradient and animation, restyled as a professional subtitle
const StyledTagline = styled(motion.p)`
  font-size: 1.25rem;
  font-weight: 500; /* Less aggressive font-weight */
  margin-top: 2rem;
  z-index: 3;
  color: ${({ theme }) => theme.text === '#212529' ? '#495057' : '#adb5bd'}; /* Use secondary text color */

  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

// --- Framer Motion Variants ---

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.2, // Animate children one after another
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

// --- Component Function ---

const LogoShowcase = () => {
  return (
    <ShowcaseSection
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* REMOVED: HexagonBackground */}
      
      <LogoWrapper variants={itemVariants}>
        <AnimatedHexLogo src={logoHex} alt="Kodhive Hexagon Logo" />
        <AnimatedTextLogo src={logoText} alt="Kodhive Text Logo" />
      </LogoWrapper>

      <StyledTagline
        variants={itemVariants}
      >
        Innovate. Build. Grow.
      </StyledTagline>
    </ShowcaseSection>
  );
};

export default LogoShowcase;