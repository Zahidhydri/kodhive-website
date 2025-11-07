// src/components/ServicesSection.jsx
import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

// NEW: Import Swiper for mobile
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

// NEW: Import the ServiceCard component
import { ServiceCard } from './ServiceCard'; 

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
  /* Only enable the sticky scroll 'hijack' on desktop */
  @media (min-width: 1024px) {
    height: ${servicesData.length * 100}vh; // 100vh per card
  }
`;

// This holds the 2-column layout and sticks to the top
const StickyContentWrapper = styled(motion.div)`
  /* Only apply stickiness on desktop */
  @media (min-width: 1024px) {
    position: sticky;
    top: 0;
    height: 100vh;
    width: 100%;
    overflow: hidden; // Clips the content
  }
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
  width: 100%;
  position: sticky;
  top: 8rem; // Sits below the navbar
  align-self: start;
  height: 500px; // Fixed height for the visual
  
  display: none; // Hidden on mobile

  @media (min-width: 1024px) {
    display: flex; // Visible on desktop
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
  height: 100%;

  /* On desktop, align center for the sticky effect */
  @media (min-width: 1024px) {
    align-items: center;
    overflow: hidden;
  }

  /* On mobile, stack them vertically */
  @media (max-width: 1023px) {
    flex-direction: column;
    height: auto;
  }
`;

// This container moves horizontally based on scroll (DESKTOP ONLY)
const HorizontalCardTrack = styled(motion.div)`
  display: none; // Hidden by default
  
  @media (min-width: 1024px) {
    display: flex;
    /* Each card is 100% width, so track is 500% wide */
    width: ${servicesData.length * 100}%; 
  }
`;

// NEW: Mobile Swiper Wrapper
const MobileSwiperWrapper = styled.div`
  display: block;
  width: 100%;
  
  /* Style Swiper pagination dots */
  .swiper-pagination-bullet {
    background: ${({ theme }) => theme.border};
    opacity: 0.8;
  }
  .swiper-pagination-bullet-active {
    background: ${({ theme }) => theme.buttonBg} !important;
    opacity: 1;
  }
  .swiper-slide {
    padding-bottom: 3rem; // Space for pagination
  }

  @media (min-width: 1024px) {
    display: none; // Hide on desktop
  }
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

  // Map scroll progress (0 to 1) to a horizontal X position
  // We move (cardCount - 1) cards.
  // We move (5-1) * 20% = 80%.
  const x = useTransform(scrollYProgress, [0, 1], ['0%', `-${100 - (100 / cardCount)}%`]);

  // Update activeIndex based on scroll for desktop
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

      {/* This container has a large height to "hijack" the scroll on DESKTOP ONLY */}
      <StickyScrollContainer ref={scrollRef}>
        
        {/* This content sticks to the top of the viewport on DESKTOP ONLY */}
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
              {/* --- DESKTOP: Horizontal Track --- */}
              <HorizontalCardTrack style={{ x }}>
                {servicesData.map((service) => ( 
                  <ServiceCard
                    key={service.title}
                    service={service}
                  />
                ))}
              </HorizontalCardTrack>

              {/* --- MOBILE: Swiper Carousel --- */}
              <MobileSwiperWrapper>
                <Swiper
                  modules={[Pagination, Autoplay]}
                  spaceBetween={30}
                  slidesPerView={1}
                  pagination={{ clickable: true }}
                  autoplay={{ delay: 5000, disableOnInteraction: false }}
                  onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                >
                  {servicesData.map((service) => (
                    <SwiperSlide key={service.title}>
                      <ServiceCard service={service} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </MobileSwiperWrapper>
              
            </CardsColumn>

          </GridContainer>
        </StickyContentWrapper>
      </StickyScrollContainer>
    </Section>
  );
}