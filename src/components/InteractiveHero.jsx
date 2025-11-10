// src/components/InteractiveHero.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { HiOutlineArrowRight, HiOutlinePause, HiOutlinePlay } from 'react-icons/hi';
import { useScroll } from '../contexts/ScrollContext'; // <-- [FIX] IMPORT THE HOOK

// ... (data and styled components remain the same) ...
// --- Data with NEW Vibrant Color Palettes ---
const heroSlides = [
  { 
    title: "Innovate with Kodhive", 
    subtitle: "We connect bright student talent with real-world projects, helping you build the future while they build their careers.", 
    buttonText: "About Us", 
    link: "/contact",
    bg: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=2070",
    badgeColor: "#00796b", // Teal
    colorPalette: ['#00796b', '#4db6ac', '#80cbc4'] // Teal, Light Teal, Lighter Teal
  },
  { 
    title: "Find Your Next Opportunity", 
    subtitle: "Gain hands-on experience by applying for internships and projects posted by our partner companies.", 
    buttonText: "See Internships", 
    link: "/internships",
    bg: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2070",
    badgeColor: "#3f51b5", // Indigo
    colorPalette: ['#3f51b5', '#4a69ff', '#7986cb'] // Indigo, Bright Blue, Light Indigo
  },
  { 
    title: "Have an Idea? Let's Build It.", 
    subtitle: "Submit your project requirements, and our curated team of talented students will bring your vision to life.", 
    buttonText: "Request a Project", 
    link: "/request-project",
    bg: "https://images.unsplash.com/photo-1542744095-291d1f67b221?auto=format&fit=crop&q=80&w=2070",
    badgeColor: "#d81b60", // Pink
    colorPalette: ['#d81b60', '#f06292', '#f48fb1'] // Pink, Light Pink, Lighter Pink
  },
  { 
    title: "Join Our Tech Community", 
    subtitle: "Learn, grow, and network with fellow students, mentors, and industry professionals in our vibrant community.", 
    buttonText: "Get in Touch", 
    link: "/contact",
    bg: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=2070",
    badgeColor: "#f57c00", // Orange
    colorPalette: ['#f57c00', '#ffb74d', '#ff9800'] // Orange, Light Orange, Amber
  }
];


// --- Keyframes for Animations ---
// UPDATED: Increased opacity for more vibrance
const float = keyframes`
  0% { transform: translateY(0px) rotate(0deg); opacity: 0.1; }
  50% { transform: translateY(-25px) rotate(10deg); opacity: 0.2; }
  100% { transform: translateY(0px) rotate(0deg); opacity: 0.1; }
`;

// --- Styled Components ---

const HeroOuterContainer = styled.section`
  background: ${({ theme }) => theme.body}; 
  padding: 4rem 1.5rem 0 1.5rem; 
  overflow: hidden;
  border-top: 1px solid ${({ theme }) => theme.border};
  position: relative; 
`;

const HexagonBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
`;

// UPDATED: Hexagons now use the color palette
const Hexagon = styled.div`
  position: absolute;
  width: 100px;
  height: 115px;
  background-color: ${({ $colors }) => $colors[0] || '#007bff'};
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  animation: ${float} 8s ease-in-out infinite;
  transition: background-color 0.8s ease-in-out;
  opacity: 0.1; // Base opacity set by keyframe

  // Use different colors from the palette
  &:nth-child(odd) {
    background-color: ${({ $colors }) => $colors[1]};
  }
  &:nth-child(3n) {
    background-color: ${({ $colors }) => $colors[2]};
  }
  
  // Positioning and animation delays (unchanged)
  &:nth-child(1) { top: 10%; left: 5%; width: 80px; height: 92px; animation-duration: 9s; animation-delay: -3s; }
  &:nth-child(2) { top: 20%; left: 80%; width: 120px; height: 138px; animation-duration: 10s; animation-delay: -5s; }
  &:nth-child(3) { top: 65%; left: 10%; width: 60px; height: 69px; animation-duration: 11s; animation-delay: -1s; }
  &:nth-child(4) { top: 80%; left: 60%; width: 100px; height: 115px; animation-duration: 7s; }
  &:nth-child(5) { top: 40%; left: 45%; width: 50px; height: 57px; animation-duration: 12s; animation-delay: -2s; }
  &:nth-child(6) { top: 5%; left: 90%; width: 70px; height: 80px; animation-duration: 8s; animation-delay: -1s; }
  &:nth-child(7) { top: 85%; left: 95%; width: 90px; height: 104px; animation-duration: 9s; animation-delay: -4s; }
`;


const HeroContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto;
  min-height: 75vh; 
  position: relative; 
  z-index: 2;

  @media (min-width: 1024px) {
    grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
    min-height: 70vh; 
  }
`;

// --- Left Side: Text Content ---

// UPDATED: Added min-height and justify-content to prevent collapse
const TextContent = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  z-index: 5;
  min-height: 450px; // Prevents collapse during animation
  justify-content: center; // Vertically centers content

  @media (min-width: 1024px) {
    align-items: flex-start;
    text-align: left;
  }
`;

const HeroBadge = styled(motion.span)`
  display: inline-block;
  padding: 0.5rem 1rem;
  background: ${({ $color }) => $color ? `${$color}22` : 'rgba(0,123,255,0.15)'};
  color: ${({ $color }) => $color || '#007bff'};
  border-radius: 999px;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 1rem;
  box-shadow: 0 2px 10px ${({ $color }) => $color ? `${$color}44` : 'rgba(0,123,255,0.3)'};
  /* ENHANCED: Faster color transition */
  transition: all 0.8s ease-in-out;
`;

const Title = styled(motion.h1)`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  line-height: 1.1;
  color: ${({ theme }) => theme.text};
  // REMOVED min-height

  @media (min-width: 768px) {
    font-size: 4.5rem;
    // REMOVED min-height
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.1rem;
  margin-bottom: 2rem;
  color: ${({ theme }) => (theme.text === '#212529' ? '#495057' : '#adb5bd')};
  max-width: 500px;
  line-height: 1.6;
  // REMOVED min-height
`;

const Button = styled(motion(Link))`
  padding: 0.85rem 1.75rem;
  background-color: ${({ theme }) => theme.buttonBg};
  color: ${({ theme }) => theme.buttonText};
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  width: fit-content;

  &:hover {
    background-color: ${({ theme }) => theme.buttonHover};
    transform: translateY(-3px) scale(1.03);
    box-shadow: 0 8px 25px ${({ theme }) => theme.buttonBg}77;
  }
`;

const SliderControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 2.5rem;
  padding-bottom: 2rem; 

  @media (min-width: 1024px) {
    padding-bottom: 0; 
  }
`;

const ProgressDot = styled.button`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: none;
  padding: 0;
  background: ${({ theme, $isActive }) => ($isActive ? theme.buttonBg : theme.border)};
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    background: ${({ theme }) => theme.buttonBg}88;
  }
`;

const PlayPauseButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => (theme.text === '#212529' ? '#495057' : '#adb5bd')};
  font-size: 1.25rem;
  cursor: pointer;
  margin-left: 0.5rem;
  display: flex;
  align-items: center;

  &:hover {
    color: ${({ theme }) => theme.text};
  }
`;

// --- Right Side: Visual Animation ---

const VisualContent = styled.div`
  position: relative;
  display: none; 
  align-items: center;
  justify-content: center;
  min-height: 450px;
  perspective: 1000px; 

  @media (min-width: 1024px) {
    display: flex; 
  }
`;

const Card = styled(motion.div)`
  position: absolute;
  width: 300px;
  height: 400px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  border: 1px solid ${({ theme }) => theme.border};
  background-size: cover;
  background-position: center;
  
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 20px;
    background: linear-gradient(180deg, rgba(0,0,0,0) 70%, rgba(0,0,0,0.15) 100%);
  }
`;

// --- Animation Variants ---

// UPDATED: Simplified variants for a smoother fade
const textContainerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.08, 
      delayChildren: 0.2 // Delay children staggering
    }
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 } // Faster exit
  }
};

const textItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: 'spring', stiffness: 100, damping: 18 } // Slightly bouncier
  }
};

const cardVariants = {
  // Start from the back
  initial: { 
    x: 40, 
    y: -40, 
    scale: 0.8, 
    opacity: 0,
    zIndex: 1
  }, 
  // Animate to stacked position
  animate: (i) => ({
    x: i.x,
    y: i.y,
    scale: i.scale,
    opacity: i.opacity,
    zIndex: i.zIndex,
    transition: {
      type: 'spring',
      stiffness: 90, // Softer spring
      damping: 20,
      delay: i.zIndex === 3 ? 0.15 : 0 // Main card animates slightly later
    }
  }),
  // Animate out
  exit: {
    y: -60, // Move up
    scale: 0.9, // Scale down
    opacity: 0,
    zIndex: 0,
    transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] } // Smooth ease-out
  }
};

// --- Component ---

export default function InteractiveHero() { 
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const intervalRef = useRef(null);
  
  const activeSlide = heroSlides[activeIndex];
  const activeBadgeColor = activeSlide.badgeColor;

  // --- [FIX] Add scroll context and handler ---
  const mainScrollRef = useScroll();
  const handleScrollToTop = () => {
    if (mainScrollRef && mainScrollRef.current) {
      mainScrollRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };
  // --- End Fix ---

  // Auto-sliding logic
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % heroSlides.length);
      }, 5000); 
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPlaying]);

  const goToSlide = (index) => {
    clearInterval(intervalRef.current);
    setActiveIndex(index);
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % heroSlides.length);
      }, 5000);
    }
  };

  return (
    <HeroOuterContainer>
      {/* UPDATED: Pass colors to background */}
      <HexagonBackground>
        <Hexagon $colors={activeSlide.colorPalette} /> 
        <Hexagon $colors={activeSlide.colorPalette} /> 
        <Hexagon $colors={activeSlide.colorPalette} /> 
        <Hexagon $colors={activeSlide.colorPalette} /> 
        <Hexagon $colors={activeSlide.colorPalette} /> 
        <Hexagon $colors={activeSlide.colorPalette} /> 
        <Hexagon $colors={activeSlide.colorPalette} />
      </HexagonBackground>

      <HeroContainer>
        {/* --- Left Text Content --- */}
        <TextContent>
          {/* UPDATED: AnimatePresence wraps a motion.div to control text fades */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              variants={textContainerVariants}
              initial="hidden"
              animate="visible"
              exit="exit" // Use the exit variant
            >
              <HeroBadge 
                variants={textItemVariants} 
                $color={activeBadgeColor}
              >
                {activeSlide.buttonText}
              </HeroBadge>
              <Title variants={textItemVariants}>{activeSlide.title}</Title>
              <Subtitle variants={textItemVariants}>{activeSlide.subtitle}</Subtitle>
              
              {/* [FIX] Replaced onClick with handleScrollToTop */}
              <Button 
                to={activeSlide.link} 
                variants={textItemVariants}
                onClick={handleScrollToTop}
              >
                {activeSlide.buttonText} <HiOutlineArrowRight />
              </Button>
            </motion.div>
          </AnimatePresence>

          <SliderControls>
            {heroSlides.map((_, index) => (
              <ProgressDot
                key={index}
                $isActive={index === activeIndex}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
            <PlayPauseButton onClick={() => setIsPlaying(!isPlaying)} aria-label={isPlaying ? "Pause slides" : "Play slides"}>
              {isPlaying ? <HiOutlinePause /> : <HiOutlinePlay />}
            </PlayPauseButton>
          </SliderControls>
        </TextContent>

        {/* --- Right Visual Content (Unchanged) --- */}
        <VisualContent>
          <AnimatePresence>
            {[...heroSlides].reverse().map((slide, i) => {
              const originalIndex = heroSlides.length - 1 - i;
              
              if (originalIndex < activeIndex || originalIndex > activeIndex + 2) {
                return null;
              }

              const stackPosition = originalIndex - activeIndex; 
              
              // ENHANCED: Tighter, cleaner stack
              const stackProps = [
                { zIndex: 3, x: 0, y: 0, scale: 1, opacity: 1 },       // Front
                { zIndex: 2, x: 25, y: -15, scale: 0.9, opacity: 0.7 }, // Middle
                { zIndex: 1, x: 50, y: -30, scale: 0.8, opacity: 0.4 }  // Back
              ];

              // Render only the 3 relevant cards
              if (stackPosition < 0 || stackPosition > 2) {
                return null;
              }

              // UPDATED: Removed parentheses from return
              return <Card
                  key={originalIndex} 
                  style={{
                    backgroundImage: `url(${slide.bg})`, 
                  }}
                  custom={stackProps[stackPosition]}
                  variants={cardVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                />;
            })}
          </AnimatePresence>
        </VisualContent>
        
      </HeroContainer>
    </HeroOuterContainer>
  );
}