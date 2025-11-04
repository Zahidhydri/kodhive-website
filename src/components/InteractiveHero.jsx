// src/components/InteractiveHero.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import styled, { keyframes, useTheme } from 'styled-components';
import { HiOutlineArrowRight, HiOutlinePause, HiOutlinePlay } from 'react-icons/hi';

// --- Keyframes for Animations ---

// Keyframe for the floating hexagons
const float = keyframes`
  0% { transform: translateY(0px) rotate(0deg); opacity: 0.05; }
  50% { transform: translateY(-25px) rotate(10deg); opacity: 0.1; }
  100% { transform: translateY(0px) rotate(0deg); opacity: 0.05; }
`;

// Keyframe for the partner logo scroll
const scroll = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-100%); }
`;


// --- Styled Components ---

const HeroOuterContainer = styled.section`
  background-color: ${({ theme }) => theme.body};
  padding: 4rem 1.5rem 2rem 1.5rem;
  overflow: hidden;
  border-top: 1px solid ${({ theme }) => theme.border};
  position: relative; /* Needed for the hexagon background */
`;

// --- NEW: Hexagon Background ---
const HexagonBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
`;

const Hexagon = styled.div`
  position: absolute;
  width: 100px;
  height: 115px;
  background-color: ${({ theme }) => theme.buttonBg};
  opacity: 0.05; /* Very subtle */
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  animation: ${float} 8s ease-in-out infinite;

  /* Different positions and animations for each hexagon */
  &:nth-child(1) {
    top: 10%;
    left: 5%;
    width: 80px;
    height: 92px;
    animation-duration: 9s;
    animation-delay: -3s;
  }
  &:nth-child(2) {
    top: 20%;
    left: 80%;
    width: 120px;
    height: 138px;
    animation-duration: 10s;
    animation-delay: -5s;
  }
  &:nth-child(3) {
    top: 65%;
    left: 10%;
    width: 60px;
    height: 69px;
    animation-duration: 11s;
    animation-delay: -1s;
  }
  &:nth-child(4) {
    top: 80%;
    left: 60%;
    width: 100px;
    height: 115px;
    animation-duration: 7s;
  }
  &:nth-child(5) {
    top: 40%;
    left: 45%;
    width: 50px;
    height: 57px;
    animation-duration: 12s;
    animation-delay: -2s;
  }
  &:nth-child(6) {
    top: 5%;
    left: 90%;
    width: 70px;
    height: 80px;
    animation-duration: 8s;
    animation-delay: -1s;
  }
  &:nth-child(7) {
    top: 85%;
    left: 95%;
    width: 90px;
    height: 104px;
    animation-duration: 9s;
    animation-delay: -4s;
  }
`;


const HeroContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto;
  min-height: 80vh;
  position: relative; /* Ensure content is on top of bg */
  z-index: 2;

  @media (min-width: 1024px) {
    grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
    min-height: 75vh;
  }
`;

// --- Left Side: Text Content ---

const TextContent = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  z-index: 5;

  @media (min-width: 1024px) {
    align-items: flex-start;
    text-align: left;
  }
`;

const HeroBadge = styled(motion.span)`
  display: inline-block;
  padding: 0.5rem 1rem;
  background: ${({ theme }) => theme.buttonBg}22;
  color: ${({ theme }) => theme.buttonBg};
  border-radius: 999px;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const Title = styled(motion.h1)`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  line-height: 1.1;
  color: ${({ theme }) => theme.text};
  min-height: 110px; /* Reserve space for 2 lines of text */

  @media (min-width: 768px) {
    font-size: 4.5rem;
    min-height: 150px;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.1rem;
  margin-bottom: 2rem;
  color: ${({ theme }) => (theme.text === '#212529' ? '#495057' : '#adb5bd')};
  max-width: 500px;
  line-height: 1.6;
  min-height: 80px; /* Reserve space for text */
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
    transform: translateY(-2px);
    box-shadow: 0 4px 20px ${({ theme }) => theme.buttonBg}66;
  }
`;

const SliderControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 2.5rem;
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
  display: none; /* Hidden on mobile */
  align-items: center;
  justify-content: center;
  min-height: 450px;
  perspective: 1500px; /* Set perspective for 3D */

  @media (min-width: 1024px) {
    display: flex; /* Visible on desktop */
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
`;

// --- Partners/Trusted By Section (MOVED TO TOP LEVEL) ---

const PartnersSection = styled(motion.div)`
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 4rem;
  text-align: center;
  position: relative; /* Keep on top of bg */
  z-index: 2;
  
  /* This moves the partners section up on desktop to be part of the hero */
  @media (min-width: 1024px) {
    grid-column: span 2;
    padding-top: 2rem;
  }
`;

const PartnersTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => (theme.text === '#212529' ? '#495057' : '#adb5bd')};
  margin-bottom: 2rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const PartnersContainer = styled.div`
  width: 100%;
  overflow: hidden;
  mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
`;

const PartnersTrack = styled.div`
  display: flex;
  width: fit-content;
  animation: ${scroll} 25s linear infinite;
`;

const PartnerLogo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  margin: 0 2rem;
  img {
    max-width: 120px;
    filter: ${({ theme }) => theme.text === '#e9ecef' ? 'invert(1) opacity(0.7)' : 'grayscale(1) opacity(0.5)'};
    transition: filter 0.3s ease;
  }
`;


// --- Animation Variants ---

const textContainerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const textItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
};

// --- Component ---

export default function InteractiveHero({ slides, partners }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const intervalRef = useRef(null);
  const activeSlide = slides[activeIndex];
  const theme = useTheme(); // <-- FIX: Get theme from context

  // Auto-sliding logic
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % slides.length);
      }, 5000); // Change slide every 5 seconds
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPlaying, slides.length]);

  const goToSlide = (index) => {
    clearInterval(intervalRef.current);
    setActiveIndex(index);
    if (isPlaying) {
      // Restart interval
      intervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % slides.length);
      }, 5000);
    }
  };

  // --- 3D Card Interaction Logic ---
  const containerRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 100, damping: 20 });
  const springY = useSpring(y, { stiffness: 100, damping: 20 });

  const rotateX = useTransform(springY, [-0.5, 0.5], ['15deg', '-15deg']);
  const rotateY = useTransform(springX, [-0.5, 0.5], ['-15deg', '15deg']);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = (mouseX / width) - 0.5;
    const yPct = (mouseY / height) - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <HeroOuterContainer>
      {/* NEW: Add Hexagon Background */}
      <HexagonBackground>
        <Hexagon />
        <Hexagon />
        <Hexagon />
        <Hexagon />
        <Hexagon />
        <Hexagon />
        <Hexagon />
      </HexagonBackground>

      <HeroContainer>
        {/* --- Left Text Content --- */}
        <TextContent>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              variants={textContainerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <HeroBadge variants={textItemVariants}>
                {activeSlide.buttonText}
              </HeroBadge>
              <Title variants={textItemVariants}>{activeSlide.title}</Title>
              <Subtitle variants={textItemVariants}>{activeSlide.subtitle}</Subtitle>
              <Button to={activeSlide.link} variants={textItemVariants}>
                {activeSlide.buttonText} <HiOutlineArrowRight />
              </Button>
            </motion.div>
          </AnimatePresence>

          <SliderControls>
            {slides.map((_, index) => (
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

        {/* --- Right Visual Content --- */}
        <VisualContent
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ rotateX, rotateY }}
        >
          {/* Back Card */}
          <Card
            style={{
              backgroundImage: `url(${slides[(activeIndex + 2) % slides.length].bg})`, // Use modulo for safety
              zIndex: 1,
            }}
            animate={{
              x: -100,
              y: 50,
              scale: 0.85,
            }}
            transition={{ type: 'spring' }}
          />
          {/* Middle Card */}
          <Card
            style={{
              backgroundImage: `url(${slides[(activeIndex + 1) % slides.length].bg})`, // Use modulo for safety
              zIndex: 2,
            }}
            animate={{
              x: 50,
              y: -50,
              scale: 0.9,
            }}
            transition={{ type: 'spring' }}
          />
          {/* Front Card (shows active slide) */}
          <Card
            style={{
              backgroundImage: `url(${activeSlide.bg})`, // Use active slide bg
              zIndex: 3,
            }}
            animate={{
              x: 0,
              y: 0,
              scale: 1,
            }}
            transition={{ type: 'spring' }}
          />
        </VisualContent>
        
        {/* Partners section is now part of the hero */}
        <PartnersSection
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <PartnersTitle>Trusted By Innovative Companies</PartnersTitle>
          <PartnersContainer>
              <PartnersTrack>
                {[...partners, ...partners].map((logo, index) => (
                  <PartnerLogo key={index}>
                    <img src={`https://placehold.co/120x60/fafafa/6c757d?text=${logo}&font=lato`} alt={`${logo} logo`} />
                  </PartnerLogo>
                ))}
              </PartnersTrack>
            </PartnersContainer>
        </PartnersSection>

      </HeroContainer>
    </HeroOuterContainer>
  );
}

