// src/components/InteractiveHero.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import styled, { keyframes, useTheme } from 'styled-components';
import { HiOutlineArrowRight } from 'react-icons/hi';

// --- Styled Components ---

const HeroOuterContainer = styled.section`
  /* Set background to the main page body color */
  background-color: ${({ theme }) => theme.body};
  padding: 4rem 1.5rem 2rem 1.5rem; /* Add padding top/bottom */
  overflow: hidden;
  
  /* Add a subtle top border to separate from the sticky nav */
  border-top: 1px solid ${({ theme }) => theme.border};
`;

const HeroContainer = styled.div`
  min-height: 75vh;
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    min-height: 70vh;
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

  @media (min-width: 768px) {
    font-size: 4.5rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.1rem;
  margin-bottom: 2rem;
  color: ${({ theme }) => (theme.text === '#212529' ? '#495057' : '#adb5bd')};
  max-width: 500px;
  line-height: 1.6;
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

// --- Visual Animation Area ---

const VisualContent = styled(motion.div)`
  position: relative;
  display: none; /* Hidden on mobile */
  align-items: center;
  justify-content: center;
  min-height: 450px;

  @media (min-width: 1024px) {
    display: flex; /* Visible on desktop */
  }
`;

const AnimatedShape = styled(motion.div)`
  position: absolute;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  border: 1px solid ${({ theme }) => theme.border};
`;

// --- Partners/Trusted By Section ---

const scroll = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-100%); }
`;

const PartnersSection = styled(motion.div)`
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 4rem;
  text-align: center;
  
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
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const textItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
};

// --- Component ---

export default function InteractiveHero({ slides, partners }) {
  // We no longer need tabs, so we'll just use the first slide's data
  const activeSlide = slides[0];
  const theme = useTheme(); // <-- FIX: Get theme from context

  return (
    <HeroOuterContainer>
      <HeroContainer>
        <TextContent
          variants={textContainerVariants}
          initial="hidden"
          animate="visible"
        >
          <HeroBadge variants={textItemVariants}>
            Build Your Future
          </HeroBadge>
          <Title variants={textItemVariants}>{activeSlide.title}</Title>
          <Subtitle variants={textItemVariants}>{activeSlide.subtitle}</Subtitle>
          <Button 
            to={activeSlide.link}
            variants={textItemVariants}
          >
            {activeSlide.buttonText} <HiOutlineArrowRight />
          </Button>
        </TextContent>

        <VisualContent>
          {/* Shape 1 (Back) */}
          <AnimatedShape
            style={{
              width: 300,
              height: 400,
              background: `linear-gradient(135deg, ${theme.card}, ${theme.body})`, // <-- FIX: theme is now defined
              x: 50,
              y: 20,
            }}
            animate={{
              y: [20, -10, 20],
              rotate: [0, 2, 0]
            }}
            transition={{
              duration: 8,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          />
          {/* Shape 2 (Middle) */}
          <AnimatedShape
            style={{
              width: 320,
              height: 300,
              background: `linear-gradient(135deg, ${theme.buttonBg}22, ${theme.card})`, // <-- FIX: theme is now defined
              x: -30,
              y: -50,
              zIndex: 2,
            }}
            animate={{
              y: [-50, -30, -50],
              rotate: [0, -3, 0]
            }}
            transition={{
              duration: 10,
              ease: "easeInOut",
              repeat: Infinity,
              delay: 1,
            }}
          />
           {/* Shape 3 (Front) */}
          <AnimatedShape
            style={{
              width: 280,
              height: 200,
              background: theme.buttonBg, // <-- FIX: theme is now defined
              x: 80,
              y: -20,
              zIndex: 3,
            }}
            animate={{
              y: [-20, 0, -20],
              rotate: [0, 5, 0]
            }}
            transition={{
              duration: 7,
              ease: "easeInOut",
              repeat: Infinity,
              delay: 0.5
            }}
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

