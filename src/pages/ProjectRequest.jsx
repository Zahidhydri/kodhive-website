// src/pages/ProjectRequest.jsx
import { useRef } from 'react'; // <-- MODIFIED: Only need useRef
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  HiOutlineLightBulb,
  HiOutlinePencilAlt,
  HiOutlineArrowLeft,
} from 'react-icons/hi';
import TechStack from '../components/TechStack'; 
import ProjectRequestForms from '../components/ProjectRequestForms'; // <-- IMPORT new component

// --- Swiper Imports ---
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';

// --- Data for Hero Slideshow ---
const projectHeroSlides = [
  {
    title: "Custom Web & Mobile Apps",
    subtitle: "Have a clear vision? We'll build your full-stack application, from UI to database.",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=1200"
  },
  {
    title: "Branding & UI/UX Design",
    subtitle: "Logos, posters, and high-fidelity prototypes designed in Figma and Adobe Express.",
    image: "https://images.unsplash.com/photo-1581291518857-4e275087a113?auto=format&fit=crop&q=80&w=1200"
  },
  {
    title: "Video & Photo Editing",
    subtitle: "Engaging content for social media, YouTube, and portfolios using Clipchamp and more.",
    image: "https://images.unsplash.com/photo-1631003881485-a787a2c71286?auto=format&fit=crop&q=80&w=1200"
  },
  {
    title: "Just Have an Idea?",
    subtitle: "Not sure where to start? Our 'Idea Guidance' form is perfect for you.",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200"
  }
];


// --- STYLED COMPONENTS (Only Hero/Page styles remain) ---

const PageWrapper = styled(motion.div)`
  width: 100%;
`;

const Container = styled(motion.div)`
  max-width: 900px;
  margin: 0 auto;
  padding: 4rem 1.5rem 6rem 1.5rem;
`;

const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  margin-bottom: 1.5rem; /* Space below the button */
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.body};
    border-color: ${({ theme }) => theme.buttonBg};
  }
`;

const Section = styled(motion.section)`
  padding: 4rem 1.5rem;
  overflow: hidden;
  
  &:first-of-type {
    padding-top: 4rem;
    padding-bottom: 4rem;
  }
`;

// --- Hero Slideshow Styles ---
const HeroSlideshowContainer = styled.div`
  width: 100%;
  height: 40vh;
  min-height: 320px; /* Increased min-height for buttons */
  max-height: 400px; /* Increased max-height */
  border-radius: 16px;
  overflow: hidden;
  background: ${({ theme }) => theme.card};
  position: relative;

  .swiper { width: 100%; height: 100%; }
  .swiper-pagination-bullet { background: white; opacity: 0.7; }
  .swiper-pagination-bullet-active { opacity: 1; background: ${({ theme }) => theme.buttonBg}; }
`;

const HeroSlide = styled.div`
  width: 100%; height: 100%;
  background-size: cover; background-position: center;
  position: relative;
  &::before {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.2) 100%);
  }
`;

const HeroContent = styled(motion.div)`
  position: absolute; 
  bottom: 10%; 
  left: 5%;
  right: 5%; 
  color: white; 
  padding: 0 1.5rem; 
  max-width: 600px;
  
  @media (min-width: 768px) { 
    padding: 0 2.5rem; 
    left: 5%;
    right: auto;
  }
`;

const HeroTitle = styled.h2`
  font-size: 1.75rem; font-weight: 700; margin: 0 0 0.5rem 0;
  @media (min-width: 768px) { font-size: 2.25rem; }
`;

const HeroSubtitle = styled.p`
  font-size: 1rem; opacity: 0.9; line-height: 1.5;
  margin-bottom: 1.5rem;
  @media (min-width: 768px) { font-size: 1.1rem; }
`;

const HeroButtonContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  @media (min-width: 600px) {
    flex-direction: row;
  }
`;

const HeroButton = styled(motion.button)`
  padding: 0.75rem 1.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  border-radius: 8px;
  border: 2px solid;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  ${props => props.$primary && `
    background: ${props.theme.buttonBg};
    border-color: ${props.theme.buttonBg};
    color: ${props.theme.buttonText};

    &:hover {
      background: ${props.theme.buttonHover};
      border-color: ${props.theme.buttonHover};
    }
  `}

  ${props => !props.$primary && `
    background: transparent;
    border-color: #ffffff;
    color: #ffffff;

    &:hover {
      background: rgba(255, 255, 255, 0.15);
    }
  `}
`;
// --- End Hero Slideshow Styles ---

// --- ALL FORM STYLED COMPONENTS HAVE BEEN MOVED ---

// --- Animation Variants ---
const pageVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, duration: 0.4 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

// --- Form Components (FullProjectForm, GuidanceForm) ---
// --- MOVED TO ProjectRequestForms.jsx ---


// --- MAIN PAGE COMPONENT ---

export default function ProjectRequest() {
  const navigate = useNavigate();
  
  // Ref for the form section
  const formSectionRef = useRef(null);
  
  // Scroll handler function
  const scrollToForm = (tabName) => {
    // We pass the tabName to the component via URL search param
    // The component itself will handle setting the active tab
    navigate(`/request-project?form=${tabName}`);
    
    // Scroll to the form section
    formSectionRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start' // Aligns to the top of the section
    });
  };


  return (
    <PageWrapper
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      {/* --- HERO SLIDESHOW SECTION --- */}
      <Section variants={itemVariants} style={{ paddingBottom: 0, paddingTop: '4rem' }}>
        <Container style={{ paddingBottom: 0, paddingTop: 0, maxWidth: '1000px' }}>
          <BackButton onClick={() => navigate(-1)}>
            <HiOutlineArrowLeft />
            Go Back
          </BackButton>
        
          <HeroSlideshowContainer>
            <Swiper
              modules={[Pagination, Autoplay, EffectFade]}
              pagination={{ clickable: true }}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              effect="fade"
              fadeEffect={{ crossFade: true }}
              loop={true}
            >
              {projectHeroSlides.map((slide, index) => (
                <SwiperSlide key={index}>
                  <HeroSlide style={{ backgroundImage: `url(${slide.image})` }}>
                    <HeroContent
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                    >
                      <HeroTitle>{slide.title}</HeroTitle>
                      <HeroSubtitle>{slide.subtitle}</HeroSubtitle>
                      
                      <HeroButtonContainer>
                        <HeroButton
                          $primary
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => scrollToForm('full')}
                        >
                          <HiOutlinePencilAlt />
                          Custom Project Request
                        </HeroButton>
                        <HeroButton
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => scrollToForm('guidance')}
                        >
                          <HiOutlineLightBulb />
                          Idea Submission & Guidance
                        </HeroButton>
                      </HeroButtonContainer>

                    </HeroContent>
                  </HeroSlide>
                </SwiperSlide>
              ))}
            </Swiper>
          </HeroSlideshowContainer>
        </Container>
      </Section>

      {/* --- TECH STACK SECTION --- */}
      <TechStack />

      {/* --- FORM SECTION (Now a component) --- */}
      {/* We pass the ref to the new component */}
      <ProjectRequestForms ref={formSectionRef} />

    </PageWrapper>
  );
}