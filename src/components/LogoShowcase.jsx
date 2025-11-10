// src/components/LogoShowcase.jsx
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import logoText from '/src/assets/kodhive.png'; // The text logo
import logoHex from '/src/assets/kodhive-logo.png'; // The hexagon logo

// --- Keyframe for the animated gradient background ---
const gradientBG = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// --- Keyframe for the animated gradient text ---
const gradientText = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// --- Keyframe for floating hexagons (from InteractiveHero) ---
const float = keyframes`
  0% { transform: translateY(0px) rotate(0deg); opacity: 0.1; }
  50% { transform: translateY(-25px) rotate(10deg); opacity: 0.2; }
  100% { transform: translateY(0px) rotate(0deg); opacity: 0.1; }
`;

// --- Hexagon Background (container) ---
const HexagonBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
`;

// --- [NEW & ENHANCED] Hexagon component ---
const Hexagon = styled.div`
  position: absolute;
  width: 100px;
  height: 115px;
  
  /* ENHANCED: Animated Gradient Background */
  background: linear-gradient(
    -45deg, 
    ${({ theme }) => theme.buttonBg}, 
    #6f42c1, /* Purple */
    #d81b60, /* Pink */
    #00796b, /* Teal */
    ${({ theme }) => theme.buttonHover}
  );
  background-size: 400% 400%;
  
  /* Combine both animations */
  animation: 
    ${gradientBG} 15s ease infinite, 
    ${float} 8s ease-in-out infinite;
  
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  opacity: 0.1; /* Base opacity */

  /* MORE Hexagons with varied timings */
  &:nth-child(1) { top: 10%; left: 5%; width: 80px; height: 92px; animation-duration: 15s, 9s; animation-delay: 0s, -3s; }
  &:nth-child(2) { top: 20%; left: 80%; width: 120px; height: 138px; animation-duration: 15s, 10s; animation-delay: 0s, -5s; }
  &:nth-child(3) { top: 65%; left: 10%; width: 60px; height: 69px; animation-duration: 15s, 11s; animation-delay: 0s, -1s; }
  &:nth-child(4) { top: 80%; left: 60%; width: 100px; height: 115px; animation-duration: 15s, 7s; }
  &:nth-child(5) { top: 40%; left: 45%; width: 50px; height: 57px; animation-duration: 15s, 12s; animation-delay: 0s, -2s; }
  &:nth-child(6) { top: 5%; left: 90%; width: 70px; height: 80px; animation-duration: 15s, 8s; animation-delay: 0s, -1s; }
  &:nth-child(7) { top: 85%; left: 95%; width: 90px; height: 104px; animation-duration: 15s, 9s; animation-delay: 0s, -4s; }
  &:nth-child(8) { top: 50%; left: 70%; width: 40px; height: 46px; animation-duration: 15s, 6s; animation-delay: 0s, -1.5s; }
  &:nth-child(9) { top: 15%; left: 30%; width: 65px; height: 75px; animation-duration: 15s, 10s; animation-delay: 0s, -0.5s; }
`;

const ShowcaseSection = styled(motion.section)`
  padding: 6rem 1.5rem;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.body}; /* Clean background */
`;

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

// [MODIFIED] Added drop-shadow and hover effect
const AnimatedHexLogo = styled(motion.img)`
  width: auto;
  max-height: 90px;
  height: auto;
  z-index: 2;
  
  /* [NEW] Add a subtle base 3D shadow */
  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
  transition: filter 0.3s ease; /* Add transition for the shadow */

  &:hover {
    /* [NEW] Enhance shadow on hover for a "lift" effect */
    filter: drop-shadow(0 10px 15px rgba(0, 0, 0, 0.2));
  }

  @media (min-width: 768px) {
    max-height: 110px;
  }
`;

// [MODIFIED] Added drop-shadow and hover effect
const AnimatedTextLogo = styled(motion.img)`
  width: auto;
  max-height: 70px; /* Slightly smaller height to match visual weight */
  height: auto;
  z-index: 2;

  /* [NEW] Add a subtle base 3D shadow */
  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
  transition: filter 0.3s ease; /* Add transition for the shadow */

  &:hover {
    /* [NEW] Enhance shadow on hover for a "lift" effect */
    filter: drop-shadow(0 10px 15px rgba(0, 0, 0, 0.2));
  }

  @media (min-width: 768px) {
    max-height: 90px;
  }
`;

// Tagline with gradient animation
const StyledTagline = styled(motion.p)`
  font-size: 1.5rem;
  font-weight: 600; 
  margin-top: 2.5rem; 
  z-index: 3;
  text-align: center;
  
  /* NEW: Animated Gradient Text */
  background: linear-gradient(
    -45deg, 
    ${({ theme }) => theme.buttonBg}, 
    #6f42c1, 
    #d81b60,
    #00796b,
    ${({ theme }) => theme.buttonHover}
  );
  background-size: 400% 400%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${gradientText} 10s ease infinite;

  @media (min-width: 768px) {
    font-size: 2rem; /* Make it bigger */
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
      {/* Added animated hexagon background */}
      <HexagonBackground>
        <Hexagon /> 
        <Hexagon /> 
        <Hexagon /> 
        <Hexagon /> 
        <Hexagon /> 
        <Hexagon /> 
        <Hexagon />
        <Hexagon /> 
        <Hexagon /> 
      </HexagonBackground>
      
      <LogoWrapper variants={itemVariants}>
        <AnimatedHexLogo 
          src={logoHex} 
          alt="Kodhive Hexagon Logo" 
          whileHover={{ scale: 1.05, y: -5 }} // Animate scale and y-position
          transition={{ type: 'spring', stiffness: 300 }}
        />
        <AnimatedTextLogo 
          src={logoText} 
          alt="Kodhive Text Logo" 
          whileHover={{ scale: 1.05, y: -5 }} // Animate scale and y-position
          transition={{ type: 'spring', stiffness: 300 }}
        />
      </LogoWrapper>

      <StyledTagline
        variants={itemVariants}
      >
        Unleash Your Digital Potential.
      </StyledTagline>
    </ShowcaseSection>
  );
};

export default LogoShowcase;