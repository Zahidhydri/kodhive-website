// src/components/InteractiveHero.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components'; // Removed useTheme
import { HiOutlineArrowRight, HiOutlinePause, HiOutlinePlay } from 'react-icons/hi';

// --- Data ---
const heroSlides = [
  { 
    title: "Innovate with Kodhive", 
    subtitle: "We connect bright student talent with real-world projects, helping you build the future while they build their careers.", 
    buttonText: "About Us", 
    link: "/contact", // Changed to /contact, as there's no /about page
    bg: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=2070" 
  },
  { 
    title: "Find Your Next Opportunity", 
    subtitle: "Gain hands-on experience by applying for internships and projects posted by our partner companies.", 
    buttonText: "See Internships", 
    link: "/internships", // Correct link to internships page
    bg: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2070" 
  },
  { 
    title: "Have an Idea? Let's Build It.", 
    subtitle: "Submit your project requirements, and our curated team of talented students will bring your vision to life.", 
    buttonText: "Request a Project", 
    link: "/request-project", // Correct link to project request page
    bg: "https://images.unsplash.com/photo-1542744095-291d1f67b221?auto=format&fit=crop&q=80&w=2070"
  },
  { 
    title: "Join Our Tech Community", 
    subtitle: "Learn, grow, and network with fellow students, mentors, and industry professionals in our vibrant community.", 
    buttonText: "Get in Touch", 
    link: "/contact",
    bg: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=2070" 
  }
];


// --- Keyframes for Animations ---

const float = keyframes`
  0% { transform: translateY(0px) rotate(0deg); opacity: 0.05; }
  50% { transform: translateY(-25px) rotate(10deg); opacity: 0.1; }
  100% { transform: translateY(0px) rotate(0deg); opacity: 0.05; }
`;

// --- Styled Components ---

const HeroOuterContainer = styled.section`
  background-color: ${({ theme }) => theme.body};
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

const Hexagon = styled.div`
  position: absolute;
  width: 100px;
  height: 115px;
  background-color: ${({ theme }) => theme.buttonBg};
  opacity: 0.05; 
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  animation: ${float} 8s ease-in-out infinite;

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
  box-shadow: 0 2px 10px ${({ theme }) => theme.buttonBg}44;
`;

const Title = styled(motion.h1)`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  line-height: 1.1;
  color: ${({ theme }) => theme.text};
  min-height: 110px; 

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
  min-height: 80px; 
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
  perspective: 1500px; 

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

const textContainerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const textItemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: 'spring', stiffness: 100, damping: 15 } 
  }
};

// --- Component ---

export default function InteractiveHero() { 
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const intervalRef = useRef(null);
  const activeSlide = heroSlides[activeIndex];
  // REMOVED theme variable

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
  }, [isPlaying]); // REMOVED heroSlides.length

  const goToSlide = (index) => {
    clearInterval(intervalRef.current);
    setActiveIndex(index);
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % heroSlides.length);
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
      <HexagonBackground>
        <Hexagon /> <Hexagon /> <Hexagon /> <Hexagon /> <Hexagon /> <Hexagon /> <Hexagon />
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
              <Button 
                to={activeSlide.link} 
                variants={textItemVariants}
                onClick={() => {
                  if (activeSlide.link.startsWith('/')) {
                    window.scrollTo(0, 0);
                  }
                }}
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
              backgroundImage: `url(${heroSlides[(activeIndex + 2) % heroSlides.length].bg})`, 
              zIndex: 1,
            }}
            animate={{ x: -100, y: 50, scale: 0.85, }}
            transition={{ type: 'spring' }}
          />
          {/* Middle Card */}
          <Card
            style={{
              backgroundImage: `url(${heroSlides[(activeIndex + 1) % heroSlides.length].bg})`, 
              zIndex: 2,
            }}
            animate={{ x: 50, y: -50, scale: 0.9, }}
            transition={{ type: 'spring' }}
          />
          {/* Front Card (shows active slide) */}
          <Card
            style={{
              backgroundImage: `url(${activeSlide.bg})`, 
              zIndex: 3,
            }}
            animate={{ x: 0, y: 0, scale: 1, }}
            transition={{ type: 'spring' }}
          />
        </VisualContent>
        
      </HeroContainer>
    </HeroOuterContainer>
  );
}

