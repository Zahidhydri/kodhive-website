// src/components/ServicesSection.jsx
import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import {
  HiOutlinePencilAlt,
  HiOutlineBriefcase,
  HiOutlineUsers,
  HiOutlineColorSwatch,
  HiOutlineDeviceMobile,
} from 'react-icons/hi';

// --- 1. IMPORT YOUR LOTTIE FILE ---
import dashboardLottie from '../assets/Animated Dashboards.lottie';

// --- 2. EXPANDED DATA (5 Cards) ---
const servicesData = [
  {
    icon: HiOutlinePencilAlt,
    title: 'Project Development',
    description:
      'Have an idea for a web app, mobile app, or a new brand? Our teams of vetted students, guided by senior mentors, will build and deliver your project from concept to launch.',
    visual: 'lottie',
    lottieFile: dashboardLottie,
    bgColor: '#4a69ff',
  },
  {
    icon: HiOutlineBriefcase,
    title: 'Internship Opportunities',
    description:
      'Gain real-world experience. We connect talented students with paid internships and projects, allowing you to build your portfolio and work on live applications.',
    visual: 'icon',
    lottieFile: null,
    bgColor: '#00796b',
  },
  {
    icon: HiOutlineDeviceMobile,
    title: 'Mobile App Development',
    description:
      'Create beautiful, cross-platform mobile applications for both iOS and Android from a single codebase. We focus on responsive design and a smooth native feel.',
    visual: 'icon',
    lottieFile: null,
    bgColor: '#f57c00', // Orange
  },
  {
    icon: HiOutlineColorSwatch,
    title: 'UI/UX & Brand Design',
    description:
      'A great product starts with a great design. Our students can help you with everything from logos and branding to complete user-flow wireframes and high-fidelity prototypes.',
    visual: 'icon',
    lottieFile: null,
    bgColor: '#d81b60',
  },
  {
    icon: HiOutlineUsers,
    title: 'Community & Mentorship',
    description:
      'Join a vibrant community of learners, builders, and industry experts. Get access to workshops, network with peers, and receive guidance to accelerate your tech career.',
    visual: 'icon',
    lottieFile: null,
    bgColor: '#6f42c1', // Purple
  },
];

// --- 3. STYLED COMPONENTS ---

const Section = styled(motion.section)`
  padding: 6rem 0;
  background: ${({ theme }) => theme.body};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
`;

const SectionSubtitle = styled.p`
  text-align: center;
  font-size: 1.1rem;
  color: ${({ theme }) => (theme.text === '#212529' ? '#495057' : '#adb5bd')};
  max-width: 600px;
  margin: 0 auto 4rem;
`;

// This container controls the "hijacked" scroll.
const StickyScrollContainer = styled.div`
  position: relative;
  height: ${servicesData.length * 100}vh; // 100vh per card
`;

// This holds the 2-column layout and sticks to the top
const StickyContentWrapper = styled(motion.div)`
  position: sticky;
  top: 0;
  height: 100vh;
  width: 100%;
  overflow: hidden; // Clips the content
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  height: 100%;

  @media (min-width: 1024px) {
    /* ENHANCED: 40% / 60% split */
    grid-template-columns: 2fr 3fr; 
  }
`;

// --- LEFT (VISUALS) COLUMN ---
const VisualColumn = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: none; 

  @media (min-width: 1024px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

// ENHANCED: Wrapper is now transparent
const GraphicWrapper = styled(motion.div)`
  width: 100%;
  max-width: 500px;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  /* REMOVED background, border, and shadow */

  div {
    width: 100% !important;
    height: 100% !important;
  }
`;

const FallbackIcon = styled(motion.div)`
  font-size: 18rem; // Huge icon
  color: ${({ $color }) => $color}55; // Muted color from data
`;

// --- RIGHT (CARDS) COLUMN ---
const CardsColumn = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  /* This is key: it hides the cards that are off-screen */
  overflow: hidden;
  height: 100%;

  @media (max-width: 1023px) {
    /* On mobile, just stack them vertically */
    flex-direction: column;
    overflow: visible;
    height: auto;
    gap: 2rem;
  }
`;

// This container moves horizontally based on scroll
const HorizontalCardTrack = styled(motion.div)`
  display: flex;
  width: ${servicesData.length * 100}%; // 100% width per card
  
  @media (max-width: 1023px) {
    display: contents; // Disable horizontal track on mobile
  }
`;

// ENHANCED: Card is larger
const ServiceCardStyled = styled(motion.div)`
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 12px;
  padding: 2.5rem;
  box-shadow: 0 10px 30px rgba(0,0,0,0.07);
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  opacity: 1;
  border-top: 4px solid ${({ $color }) => $color};
  
  /* Each card takes up its portion of the track */
  width: ${100 / servicesData.length}%;
  flex-shrink: 0;
  margin: 0 1.5rem; // Add spacing between cards

  @media (max-width: 1023px) {
    width: 100%; // Full width on mobile
    margin: 0;
  }
`;

const HeaderIcon = styled.div`
  font-size: 1.5rem;
  color: ${({ $color }) => $color};
  background: ${({ $color }) => $color}22;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const HeaderTitle = styled.h3`
  font-size: 1.35rem;
  font-weight: 600;
  margin: 0;
  color: ${({ theme }) => theme.text};
`;

const ServiceDescription = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => (theme.text === '#212529' ? '#6c757d' : '#adb5bd')};
  line-height: 1.6;
  margin: 0;
`;

// --- 4. ANIMATION & COMPONENTS ---
const sectionVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const graphicVariant = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3, ease: 'easeIn' } },
};

// --- 5. MAIN COMPONENT ---
export default function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['start start', 'end end'],
  });
  
  const cardCount = servicesData.length;

  // NEW: Map scroll progress (0 to 1) to a horizontal X position
  // We want to move (cardCount - 1) cards.
  // Each card is 100% of the *column*, but the track is 500% wide.
  // So each card is 20% of the *track*.
  // We move (5-1) * 20% = 80%.
  const x = useTransform(scrollYProgress, [0, 1], ['0%', `-${100 - (100 / cardCount)}%`]);

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      const newIndex = Math.min(Math.floor(latest * cardCount), cardCount - 1);
      setActiveIndex(newIndex);
    });
  }, [scrollYProgress, cardCount]);

  const activeService = servicesData[activeIndex];
  const ActiveIcon = activeService.icon;

  return (
    <Section
      id="services"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={sectionVariant}
    >
      <Container>
        <SectionTitle>Our Core Offerings</SectionTitle>
        <SectionSubtitle>
          We bridge the gap between education and industry, providing invaluable
          experience for students and high-quality results for clients.
        </SectionSubtitle>
      </Container>

      {/* This container has a large height to "hijack" the scroll */}
      <StickyScrollContainer ref={scrollRef}>
        
        {/* This content sticks to the top of the viewport */}
        <StickyContentWrapper>
          <GridContainer>
            
            {/* --- LEFT (VISUALS) COLUMN --- */}
            <VisualColumn>
              <AnimatePresence mode="wait">
                <GraphicWrapper
                  key={activeService.title} // Change graphic when title changes
                  variants={graphicVariant}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {activeService.lottieFile ? (
                    <DotLottieReact src={activeService.lottieFile} loop autoplay />
                  ) : (
                    <FallbackIcon $color={activeService.bgColor}>
                      <ActiveIcon />
                    </FallbackIcon>
                  )}
                </GraphicWrapper>
              </AnimatePresence>
            </VisualColumn>

            {/* --- RIGHT (CARDS) COLUMN --- */}
            <CardsColumn>
              {/* This track moves horizontally */}
              <HorizontalCardTrack style={{ x }}>
                {servicesData.map((service) => { // <-- FIX: Removed unused 'i'
                  const Icon = service.icon;
                  return (
                    <ServiceCardStyled
                      key={service.title}
                      $color={service.bgColor}
                    >
                      <HeaderIcon $color={service.bgColor}>
                        <Icon />
                      </HeaderIcon>
                      <HeaderTitle>{service.title}</HeaderTitle>
                      <ServiceDescription>
                        {service.description}
                      </ServiceDescription>
                    </ServiceCardStyled>
                  );
                })}
              </HorizontalCardTrack>
            </CardsColumn>

          </GridContainer>
        </StickyContentWrapper>
      </StickyScrollContainer>
    </Section>
  );
}