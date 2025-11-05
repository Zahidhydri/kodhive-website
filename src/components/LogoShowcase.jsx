// src/components/LogoShowcase.jsx
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import logoText from '/src/assets/kodhive.png'; // The text logo - Corrected path
import logoHex from '/src/assets/kodhive-logo.png'; // The hexagon logo - Corrected path

// Keyframe for logos
const floatAndGlow = (glowColor) => keyframes`
  0%, 100% {
    transform: translateY(0);
    filter: drop-shadow(0 0 10px ${glowColor}44);
  }
  50% {
    transform: translateY(-8px);
    filter: drop-shadow(0 0 25px ${glowColor}aa);
  }
`;

// REVISED Keyframe for background logos
const floatingLogoKeyframe = keyframes`
  0% {
    transform: translateY(10vh) rotate(0deg) scale(0.8); /* Start from just below viewport */
    opacity: 0;
    filter: hue-rotate(0deg) drop-shadow(0 0 5px #4a69ff88);
  }
  25% {
    opacity: 0.4;
  }
  50% {
    opacity: 0.6;
    filter: hue-rotate(180deg) drop-shadow(0 0 10px #d81b6088);
  }
  75% {
    opacity: 0.4;
  }
  100% {
    transform: translateY(-100vh) rotate(120deg) scale(1.2); /* Float all the way to the top */
    opacity: 0;
    filter: hue-rotate(360deg) drop-shadow(0 0 5px #6f42c188);
  }
`;

// NEW: Keyframe for tagline gradient animation
const animateGradientText = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

// Main section wrapper
const ShowcaseSection = styled(motion.section)`
  padding: 6rem 1.5rem;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: radial-gradient(
    ellipse at 50% 50%,
    ${({ theme }) => theme.buttonBg}1a,
    transparent 70%
  ), ${({ theme }) => theme.body};
`;

// Container for the background hexagons
const HexagonBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  overflow: hidden;
`;

// UPDATED: This now renders the logo image instead of a CSS hexagon
const FloatingLogo = styled(motion.img)`
  position: absolute;
  width: 50px; // Default small size
  height: auto;
  animation: ${floatingLogoKeyframe} 15s linear infinite;
  will-change: transform, opacity, filter;
  bottom: 0; // Start animation from the bottom

  // --- Create many small logos ---
  &:nth-child(1) { width: 40px; left: 10%; animation-duration: 12s; animation-delay: -5s; }
  &:nth-child(2) { width: 60px; left: 20%; animation-duration: 18s; animation-delay: -2s; }
  &:nth-child(3) { width: 30px; left: 30%; animation-duration: 10s; animation-delay: 0s; }
  &:nth-child(4) { width: 50px; left: 40%; animation-duration: 16s; animation-delay: -7s; }
  &:nth-child(5) { width: 35px; left: 50%; animation-duration: 13s; animation-delay: -3s; }
  &:nth-child(6) { width: 45px; left: 60%; animation-duration: 11s; animation-delay: -8s; }
  &:nth-child(7) { width: 25px; left: 70%; animation-duration: 14s; animation-delay: -10s; }
  &:nth-child(8) { width: 55px; left: 80%; animation-duration: 17s; animation-delay: -4s; }
  &:nth-child(9) { width: 40px; left: 90%; animation-duration: 15s; animation-delay: -1s; }
  &:nth-child(10) { width: 30px; left: 95%; animation-duration: 20s; animation-delay: -6s; }
  &:nth-child(11) { width: 40px; left: 5%; animation-duration: 13s; animation-delay: -12s; }
  &:nth-child(12) { width: 60px; left: 15%; animation-duration: 19s; animation-delay: -3s; }
  &:nth-child(13) { width: 30px; left: 25%; animation-duration: 11s; animation-delay: -1s; }
  &:nth-child(14) { width: 50px; left: 35%; animation-duration: 17s; animation-delay: -8s; }
  &:nth-child(15) { width: 35px; left: 45%; animation-duration: 14s; animation-delay: -4s; }
  &:nth-child(16) { width: 45px; left: 55%; animation-duration: 12s; animation-delay: -9s; }
  &:nth-child(17) { width: 25px; left: 65%; animation-duration: 15s; animation-delay: -11s; }
  &:nth-child(18) { width: 55px; left: 75%; animation-duration: 18s; animation-delay: -5s; }
  &:nth-child(19) { width: 40px; left: 85%; animation-duration: 16s; animation-delay: -2s; }
  &:nth-child(20) { width: 30px; left: 92%; animation-duration: 21s; animation-delay: -7s; }
`;

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

// UPDATED: Set max-height for consistent sizing
const AnimatedHexLogo = styled(motion.img)`
  width: auto;
  max-height: 90px;
  height: auto;
  animation: ${({ theme }) => floatAndGlow(theme.buttonBg)} 5s ease-in-out infinite;

  @media (min-width: 768px) {
    max-height: 110px;
  }
`;

// UPDATED: Set max-height for consistent sizing
const AnimatedTextLogo = styled(motion.img)`
  width: auto;
  max-height: 70px; /* Slightly smaller height to match visual weight */
  height: auto;
  animation: ${floatAndGlow('#6f42c1')} 5s ease-in-out infinite;
  animation-delay: -2.5s;

  @media (min-width: 768px) {
    max-height: 90px;
  }
`;

// UPDATED: Tagline with animated gradient
const StyledTagline = styled(motion.p)`
  font-size: 1.25rem;
  font-weight: 600; /* Bolder */
  margin-top: 2rem;
  z-index: 3;
  letter-spacing: 1px; /* Wider spacing */
  
  /* Animated Gradient Text */
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.buttonBg},
    #6f42c1,
    #d81b60,
    ${({ theme }) => theme.buttonBg}
  );
  background-size: 300% 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${animateGradientText} 8s ease-in-out infinite;

  @media (min-width: 768px) {
    font-size: 1.75rem;
  }
`;

// --- Component Function ---

const LogoShowcase = () => {
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const taglineVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: 0.4, ease: 'easeOut' },
    },
  };

  return (
    <ShowcaseSection
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <HexagonBackground>
        {/* Render 20 floating logos */}
        {Array.from({ length: 20 }).map((_, i) => (
          <FloatingLogo key={i} src={logoHex} alt="" />
        ))}
      </HexagonBackground>
      
      <LogoWrapper>
        <AnimatedHexLogo src={logoHex} alt="Kodhive Hexagon Logo" />
        <AnimatedTextLogo src={logoText} alt="Kodhive Text Logo" />
      </LogoWrapper>

      <StyledTagline
        variants={taglineVariants}
      >
        Innovate. Build. Grow.
      </StyledTagline>
    </ShowcaseSection>
  );
};

export default LogoShowcase;