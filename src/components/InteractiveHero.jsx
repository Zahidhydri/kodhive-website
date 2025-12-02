// src/components/InteractiveHero.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { HiOutlineArrowRight, HiOutlinePause, HiOutlinePlay } from 'react-icons/hi';
import { useScroll } from '../contexts/ScrollContext';

const heroSlides = [
  { 
    title: "Innovate with Skill Tensor", 
    subtitle: "We connect bright student talent with real-world projects, helping you build the future while they build their careers.", 
    buttonText: "About Us", 
    link: "/contact",
    bg: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=2070",
    badgeColor: "#00796b"
  },
  { 
    title: "Find Your Next Opportunity", 
    subtitle: "Gain hands-on experience by applying for internships and projects posted by our partner companies.", 
    buttonText: "See Internships", 
    link: "/internships",
    bg: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2070",
    badgeColor: "#3f51b5"
  },
  { 
    title: "Have an Idea? Let's Build It.", 
    subtitle: "Submit your project requirements, and our curated team of talented students will bring your vision to life.", 
    buttonText: "Request a Project", 
    link: "/request-project",
    bg: "https://images.unsplash.com/photo-1542744095-291d1f67b221?auto=format&fit=crop&q=80&w=2070",
    badgeColor: "#d81b60"
  },
  { 
    title: "Join Our Tech Community", 
    subtitle: "Learn, grow, and network with fellow students, mentors, and industry professionals in our vibrant community.", 
    buttonText: "Get in Touch", 
    link: "/contact",
    bg: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=2070",
    badgeColor: "#f57c00"
  }
];

// --- Styled Components ---

const HeroOuterContainer = styled.section`
  /* Clean, modern background with a subtle gradient mesh effect */
  background: ${({ theme }) => theme.body};
  padding: 6rem 1.5rem 2rem 1.5rem; /* Adjusted padding */
  overflow: hidden;
  position: relative;
  min-height: 85vh; /* Taller hero for impact */
  display: flex;
  align-items: center;

  /* Subtle radial gradient for depth */
  &::before {
    content: '';
    position: absolute;
    top: -20%;
    right: -10%;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, ${({ theme }) => theme.buttonBg}22 0%, transparent 70%);
    border-radius: 50%;
    filter: blur(60px);
    z-index: 0;
    animation: pulse 10s ease-in-out infinite;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -20%;
    left: -10%;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, #6f42c122 0%, transparent 70%); /* Purple accent */
    border-radius: 50%;
    filter: blur(60px);
    z-index: 0;
    animation: pulse 12s ease-in-out infinite reverse;
  }

  @keyframes pulse {
    0% { transform: scale(1); opacity: 0.6; }
    50% { transform: scale(1.1); opacity: 0.8; }
    100% { transform: scale(1); opacity: 0.6; }
  }
`;

const HeroContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  gap: 4rem; /* Increased gap */
  max-width: 1280px; /* Wider container */
  margin: 0 auto;
  width: 100%;
  position: relative;
  z-index: 2;

  @media (min-width: 1024px) {
    grid-template-columns: 1.2fr 0.8fr; /* More space for text */
    gap: 2rem;
  }
`;

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
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: ${({ theme }) => theme.card};
  color: ${({ $color }) => $color || '#007bff'};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 30px;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(5px);
`;

const Title = styled(motion.h1)`
  font-size: 2.75rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  line-height: 1.1;
  color: ${({ theme }) => theme.text};
  letter-spacing: -0.02em;

  @media (min-width: 768px) {
    font-size: 4rem;
  }

  @media (min-width: 1280px) {
    font-size: 5rem;
  }

  /* Gradient text effect */
  span.highlight {
    background: linear-gradient(135deg, #007bff, #6f42c1);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.125rem;
  margin-bottom: 2.5rem;
  color: ${({ theme }) => theme.textSecondary || '#6c757d'};
  max-width: 600px;
  line-height: 1.6;
  font-weight: 400;

  @media (min-width: 768px) {
    font-size: 1.25rem;
  }
`;

const ButtonGroup = styled(motion.div)`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;

  @media (min-width: 1024px) {
    justify-content: flex-start;
  }
`;

// Fix for motion() deprecated warning: use motion.create()
const Button = styled(motion.create(Link))`
  padding: 1rem 2rem;
  background-color: ${({ theme, $primary }) => $primary ? theme.buttonBg : 'transparent'};
  color: ${({ theme, $primary }) => $primary ? theme.buttonText : theme.text};
  border: 2px solid ${({ theme, $primary }) => $primary ? theme.buttonBg : theme.border};
  border-radius: 12px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background-color: ${({ theme, $primary }) => $primary ? theme.buttonHover : theme.body};
    border-color: ${({ theme, $primary }) => $primary ? theme.buttonHover : theme.text};
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const SliderControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 3rem;
`;

const ProgressDot = styled.button`
  width: 3rem; /* Elongated dots */
  height: 4px;
  border-radius: 2px;
  border: none;
  padding: 0;
  background: ${({ theme, $isActive }) => ($isActive ? theme.buttonBg : theme.border)};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.buttonBg}88;
  }
`;

const PlayPauseButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.textSecondary};
  font-size: 1.25rem;
  cursor: pointer;
  margin-left: 1rem;
  display: flex;
  align-items: center;
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.text};
  }
`;

// --- Right Side: Visual Animation (Glassmorphism Card Stack) ---

const VisualContent = styled.div`
  position: relative;
  display: flex; /* Visible on mobile now too, but maybe scaled down? No, keep hidden on very small if needed, but grid layout handles it. */
  align-items: center;
  justify-content: center;
  min-height: 400px;
  perspective: 1200px;
  
  /* Hide on small mobile to save space? Or scale it. Let's scale it. */
  @media (max-width: 768px) {
    min-height: 300px;
    transform: scale(0.8);
  }
`;

const Card = styled(motion.div)`
  position: absolute;
  width: 340px;
  height: 460px;
  border-radius: 24px;
  box-shadow: 
    0 20px 50px rgba(0,0,0,0.1),
    0 1px 3px rgba(0,0,0,0.05);
  border: 1px solid ${({ theme }) => theme.cardBorder || 'rgba(255,255,255,0.2)'};
  background-size: cover;
  background-position: center;
  overflow: hidden;
  
  /* Glassmorphism overlay effect inside the card */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.4) 100%);
    z-index: 1;
  }

  /* Content inside card (optional) */
  .card-content {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 1.5rem;
    z-index: 2;
    color: white;
    transform: translateY(20px);
    opacity: 0;
    transition: all 0.4s ease;
  }

  &:hover .card-content {
    transform: translateY(0);
    opacity: 1;
  }

  @media (max-width: 768px) {
    width: 280px;
    height: 380px;
  }
`;

// --- Animation Variants ---

const textContainerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.1, 
      delayChildren: 0.2 
    }
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 } 
  }
};

const textItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: 'spring', stiffness: 50, damping: 20 } 
  }
};

const cardVariants = {
  initial: { 
    x: 100, 
    y: 0, 
    scale: 0.8, 
    opacity: 0,
    zIndex: 0,
    rotateY: 45
  }, 
  animate: (i) => ({
    x: i.x,
    y: i.y,
    scale: i.scale,
    opacity: i.opacity,
    zIndex: i.zIndex,
    rotateY: i.rotateY || 0,
    transition: {
      type: 'spring',
      stiffness: 60, 
      damping: 20,
      delay: i.delay || 0
    }
  }),
  exit: {
    x: -100, 
    scale: 0.8, 
    opacity: 0,
    zIndex: 0,
    rotateY: -45,
    transition: { duration: 0.4, ease: "easeInOut" } 
  }
};

export default function InteractiveHero() { 
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const intervalRef = useRef(null);
  
  const activeSlide = heroSlides[activeIndex];
  const activeBadgeColor = activeSlide.badgeColor;

  const mainScrollRef = useScroll();
  const handleScrollToTop = () => {
    if (mainScrollRef && mainScrollRef.current) {
      mainScrollRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % heroSlides.length);
      }, 6000); // Slower interval for better reading time
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
      }, 6000);
    }
  };

  return (
    <HeroOuterContainer>
      <HeroContainer>
        {/* --- Left Text Content --- */}
        <TextContent>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              variants={textContainerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{ width: '100%' }} // Ensure it takes full width for alignment
            >
              <HeroBadge 
                variants={textItemVariants} 
                $color={activeBadgeColor}
              >
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: activeBadgeColor }}></span>
                {activeSlide.title.split(' ')[0]} Update
              </HeroBadge>
              
              <Title variants={textItemVariants}>
                {activeSlide.title}
              </Title>
              
              <Subtitle variants={textItemVariants}>
                {activeSlide.subtitle}
              </Subtitle>
              
              <ButtonGroup variants={textItemVariants}>
                <Button 
                  to={activeSlide.link} 
                  $primary={true}
                  onClick={handleScrollToTop}
                >
                  {activeSlide.buttonText} <HiOutlineArrowRight />
                </Button>
                <Button 
                  to="/projects" 
                  onClick={handleScrollToTop}
                >
                  Explore Projects
                </Button>
              </ButtonGroup>
            </motion.div>
          </AnimatePresence>

          <SliderControls>
            <PlayPauseButton onClick={() => setIsPlaying(!isPlaying)} aria-label={isPlaying ? "Pause slides" : "Play slides"}>
              {isPlaying ? <HiOutlinePause /> : <HiOutlinePlay />}
            </PlayPauseButton>
            {heroSlides.map((_, index) => (
              <ProgressDot
                key={index}
                $isActive={index === activeIndex}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </SliderControls>
        </TextContent>

        {/* --- Right Visual Content (3D Stack) --- */}
        <VisualContent>
          <AnimatePresence>
            {[...heroSlides].reverse().map((slide, i) => {
              const originalIndex = heroSlides.length - 1 - i;
              
              // Show current, next, and next-next (looped)
              // This logic ensures a continuous stack feel
              const relativeIndex = (originalIndex - activeIndex + heroSlides.length) % heroSlides.length;

              if (relativeIndex > 2) return null; // Only render top 3 cards

              const stackProps = [
                // Front Card (Active)
                { zIndex: 10, x: 0, y: 0, scale: 1, opacity: 1, rotateY: 0, delay: 0.1 },
                // Middle Card
                { zIndex: 5, x: 40, y: -30, scale: 0.9, opacity: 0.6, rotateY: -5, delay: 0 },
                // Back Card
                { zIndex: 1, x: 80, y: -60, scale: 0.8, opacity: 0.3, rotateY: -10, delay: 0 }
              ];

              const props = stackProps[relativeIndex];

              return (
                <Card
                  key={originalIndex} 
                  style={{
                    backgroundImage: `url(${slide.bg})`, 
                  }}
                  custom={props}
                  variants={cardVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  whileHover={{ scale: 1.02, rotateY: 0, zIndex: 11, transition: { duration: 0.3 } }}
                >
                  <div className="card-content">
                    <h3>{slide.title}</h3>
                  </div>
                </Card>
              );
            })}
          </AnimatePresence>
        </VisualContent>
        
      </HeroContainer>
    </HeroOuterContainer>
  );
}