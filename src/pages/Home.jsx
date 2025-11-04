// src/pages/Home.jsx
import { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { 
  HiOutlineChevronRight, 
  HiOutlineArrowRight,
  HiOutlineChevronDown,
  HiPlus,
  HiMinus
} from 'react-icons/hi';

// --- Import Swiper ---
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectFade, EffectCoverflow, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';


// --- STYLED COMPONENT DEFINITIONS ---

// Main layout
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
`;

// --- 1. HERO SLIDESHOW Section ---
const HeroSwiper = styled(Swiper)`
  width: 100%;
  height: 90vh;
  max-height: 700px;
  margin-top: -1px;
  
  /* Custom Swiper Pagination */
  --swiper-pagination-color: #ffffff;
  --swiper-pagination-bullet-inactive-color: #ffffff;
  --swiper-pagination-bullet-inactive-opacity: 0.5;
  --swiper-pagination-bullet-size: 8px;
  --swiper-pagination-bullet-horizontal-gap: 6px;
`;

// Keyframes for Ken Burns effect
const kenBurns = keyframes`
  0% {
    transform: scale(1.1) translate(0, 0);
  }
  100% {
    transform: scale(1) translate(5px, 5px);
  }
`;

const HeroSlide = styled(SwiperSlide)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
  color: white;
  overflow: hidden; // Needed for Ken Burns
  
  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.3));
    z-index: 2;
  }
  
  /* Background image with effect */
  & > div.hero-bg {
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background-size: cover;
    background-position: center;
    z-index: 1;
    animation: ${kenBurns} 20s ease-out infinite alternate;
  }
`;

// This wrapper adds 3D perspective for the hover effect
const HeroSlideContentWrapper = styled(motion.div)`
  position: relative;
  z-index: 3;
  max-width: 700px;
  perspective: 1000px; // 3D space
`;

const HeroSlideContent = styled(motion.div)`
  /* This part will tilt */
  transform-style: preserve-3d;
`;

const HeroTitle = styled(motion.h1)`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.2;
  text-shadow: 0 2px 10px rgba(0,0,0,0.5);
  @media (min-width: 768px) {
    font-size: 4rem;
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  text-shadow: 0 2px 5px rgba(0,0,0,0.5);
`;

const HeroButton = styled(motion(Link))`
  padding: 0.75rem 1.5rem;
  background-color: #ffffff;
  color: #0d6efd;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  transition: background-color 0.3s ease, transform 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);

  &:hover {
    background-color: #f0f0f0;
    transform: translateY(-2px);
  }
`;

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
`;

const ScrollDownIndicator = styled(motion.div)`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  color: white;
  font-size: 2.5rem;
  animation: ${bounce} 2s infinite;
  opacity: 0.8;
`;

// General Section components
const Section = styled(motion.section)`
  padding: 6rem 0;
  background: ${({ theme, $alt }) => $alt ? theme.card : 'transparent'};
  border-top: ${({ theme, $alt }) => $alt ? `1px solid ${theme.border}` : 'none'};
  border-bottom: ${({ theme, $alt }) => $alt ? `1px solid ${theme.border}` : 'none'};
  overflow-x: hidden;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3.5rem;
`;

// --- 2. OUR SERVICES (NEW Coverflow Carousel) ---
const CoverflowSwiper = styled(Swiper)`
  width: 100%;
  padding-top: 2rem;    /* Make space for slide content */
  padding-bottom: 4rem; /* Make space for navigation */
  overflow: visible;      /* IMPORTANT: Show side slides */

  /* This is the main slide card */
  .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 320px;
    height: 450px;
    border-radius: 16px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    
    /* Add the overlay for text */
    &::before {
      content: '';
      position: absolute;
      bottom: 0; left: 0; right: 0;
      height: 60%;
      background: linear-gradient(0deg, rgba(0, 0, 0, 0.8), transparent);
      border-radius: 16px; /* Match slide border-radius */
    }
  }

  /* Style the custom navigation arrows */
  .swiper-button-next,
  .swiper-button-prev {
    width: 44px;
    height: 44px;
    background: ${({ theme }) => theme.card};
    color: ${({ theme }) => theme.text};
    border-radius: 50%;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    transition: background-color 0.3s ease, color 0.3s ease;
    
    &:hover {
      background: ${({ theme }) => theme.buttonBg};
      color: ${({ theme }) => theme.buttonText};
    }
    
    /* Style the arrow icon inside */
    &::after {
      font-size: 1.25rem;
      font-weight: bold;
    }
  }
  
  .swiper-button-prev {
    left: 20px;
  }
  .swiper-button-next {
    right: 20px;
  }
`;

const ServiceSlideContent = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.5rem;
  color: white;
  z-index: 2;
  text-align: left;
`;

const ServiceTitle = styled(motion.h3)`
  font-size: 1.75rem;
  font-weight: 600;
  margin: 0;
  margin-bottom: 0.5rem;
  text-shadow: 0 2px 4px rgba(0,0,0,0.5);
`;

const ServiceDescription = styled(motion.p)`
  font-size: 1rem;
  line-height: 1.5;
  opacity: 0.9;
  text-shadow: 0 1px 3px rgba(0,0,0,0.5);
`;


// --- 3. HOW IT WORKS (Interactive Timeline) ---
const TimelineContainer = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: 768px) {
    flex-direction: row;
    gap: 2rem;
  }
`;

const TimelineNav = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  @media (min-width: 768px) {
    flex-direction: column;
    justify-content: flex-start;
    gap: 1rem;
    margin-bottom: 0;
  }
`;

const TimelineButton = styled(motion.button)`
  padding: 1rem 1.5rem;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text};
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  text-align: left;
  transition: all 0.3s ease;
  
  &.active {
    background: ${({ theme }) => theme.buttonBg};
    color: ${({ theme }) => theme.buttonText};
    border-color: ${({ theme }) => theme.buttonBg};
    box-shadow: 0 4px 15px rgba(0, 123, 255, 0.3);
  }
`;

const TimelineContent = styled.div`
  flex: 1;
  position: relative;
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 16px;
  padding: 2rem;
  min-height: 250px;
`;

const TimelineStep = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.buttonBg};
  margin-bottom: 0.5rem;
`;

const TimelineTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const TimelineDescription = styled.p`
  color: ${({ theme }) => theme.text === '#212529' ? '#495057' : '#adb5bd'};
  line-height: 1.6;
`;


// --- 4. TESTIMONIALS ---
const TestimonialCard = styled.div`
  background: ${({ theme }) => theme.body};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  padding: 2rem;
  margin: 1rem;
`;

const Quote = styled.p`
  font-size: 1.1rem;
  font-style: italic;
  color: ${({ theme }) => theme.text === '#212529' ? '#495057' : '#adb5bd'};
  margin-bottom: 1.5rem;
  position: relative;
  
  &::before {
    content: '“';
    font-size: 4rem;
    color: ${({ theme }) => theme.border};
    position: absolute;
    left: -1rem;
    top: -1.5rem;
    opacity: 0.8;
  }
`;

const Author = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  
  span {
    font-weight: 600;
  }
`;

// --- 5. PARTNERS ---
const scroll = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-100%); }
`;

const PartnersContainer = styled.div`
  width: 100%;
  overflow: hidden;
  mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
`;

const PartnersTrack = styled.div`
  display: flex;
  width: fit-content;
  animation: ${scroll} 20s linear infinite;
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
  
  &:hover img {
    filter: none;
  }
`;

// --- 6. FAQ Section ---
const FaqContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FaqItem = styled.div`
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  overflow: hidden;
`;

const FaqQuestion = styled.button`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  background: ${({ theme }) => theme.card};
  border: none;
  color: ${({ theme }) => theme.text};
  font-size: 1.1rem;
  font-weight: 600;
  text-align: left;
  cursor: pointer;
  
  svg {
    font-size: 1.5rem;
    flex-shrink: 0;
    margin-left: 1rem;
    color: ${({ theme }) => theme.buttonBg};
    transition: transform 0.3s ease;
  }
  
  &[aria-expanded="true"] svg {
    transform: rotate(45deg);
  }
`;

const FaqAnswer = styled(motion.div)`
  padding: 0 1.5rem 1.5rem 1.5rem;
  font-size: 1rem;
  color: ${({ theme }) => theme.text === '#212529' ? '#495057' : '#adb5bd'};
  line-height: 1.6;
`;


// --- 7. FINAL CTA ---
const CTASection = styled(motion.section)`
  background: linear-gradient(135deg, ${({ theme }) => theme.buttonBg}, #6f42c1);
  padding: 6rem 1.5rem;
  border-radius: 16px;
  text-align: center;
  color: white;
  margin: 6rem auto;
  max-width: 1200px;
`;

const CTATitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
`;

const CTASubtitle = styled.p`
  font-size: 1.25rem;
  opacity: 0.9;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const CTAButton = styled(Link)`
  padding: 0.75rem 1.5rem;
  background-color: #ffffff;
  color: #0d6efd;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  transition: background-color 0.3s ease, transform 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background-color: #f0f0f0;
    transform: translateY(-2px);
  }
`;


// --- ANIMATION VARIANTS ---
const sectionVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" } 
  }
};

const heroSlideContainerAnim = {
  animate: { 
    transition: { 
      staggerChildren: 0.1,
      delayChildren: 0.3,
    } 
  }
};
const heroTextAnim = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const faqAnswerAnim = {
  hidden: { opacity: 0, height: 0, y: -10 },
  visible: { opacity: 1, height: 'auto', y: 0, transition: { duration: 0.3, ease: "easeOut" } }
};

const timelineContentAnim = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" } }
};


// --- DUMMY DATA ---
const heroSlides = [
  { 
    title: "Build Your Future at Kodhive", 
    subtitle: "Connecting bright students with innovative real-world projects.", 
    buttonText: "Find Internships", 
    link: "/internships",
    bg: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto-format&fit=crop&q=80&w=2070" 
  },
  { 
    title: "Have an Idea? Let's Build It.", 
    subtitle: "Get your project built by our team of talented, vetted students and freshers.", 
    buttonText: "Request a Project", 
    link: "/request-project",
    bg: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=2070" 
  },
  { 
    title: "Logos, Websites, and More", 
    subtitle: "From stunning brand identities to complex web applications, our talent pool has you covered.", 
    buttonText: "Our Services", 
    link: "#services",
    bg: "https://images.unsplash.com/photo-1558692003-2b2f8e1d2c12?auto=format&fit=crop&q=80&w=1932" 
  }
];

const services = [
  { 
    title: "Custom Websites", 
    description: "Complex web applications built with modern tech.",
    bg: "https://images.unsplash.com/photo-1542744095-291d1f67b221?auto=format&fit=crop&q=80&w=2070"
  },
  { 
    title: "Logo & Brand Design", 
    description: "Crafting the perfect visual identity for your brand.",
    bg: "https://images.unsplash.com/photo-1600132806307-83b4b5952329?auto=format&fit=crop&q=80&w=1974"
  },
  { 
    title: "Student Opportunities", 
    description: "Connecting students with real-world projects.",
    bg: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=2070"
  }
];

const howItWorks = [
  { step: "Step 01", title: "Request a Project", description: "Clients submit their project ideas, from logos to full-stack applications." },
  { step: "Step 02", title: "We Hire Students", description: "We match your project with talented college students and freshers." },
  { step: "Step 03", title: "Get it Done", description: "Our students gain experience, and you get your project built, managed by us." }
];

const testimonials = [
  { name: "Client A", quote: "Kodhive delivered our project on time and exceeded all our expectations. Highly recommend!", img: "https://via.placeholder.com/50/007BFF/FFFFFF?text=A" },
  { name: "Student B", quote: "Working on a real project through Kodhive was an amazing experience. I learned so much.", img: "https://via.placeholder.com/50/6F42C1/FFFFFF?text=B" },
  { name: "Client C", quote: "The student team was professional, creative, and incredibly responsive. We got a fantastic website.", img: "https://via.placeholder.com/50/198754/FFFFFF?text=C" }
];

const partners = [ "Partner1", "Partner2", "Partner3", "Partner4", "Partner5" ];

const faqs = [
  {
    q: "How do I request a project?",
    a: "You can request a project by visiting our 'Request a Project' page and filling out the form. We'll get back to you within 24-48 hours to discuss the details."
  },
  {
    q: "What kind of projects can I request?",
    a: "We accept a wide range of projects, including website development, logo design, mobile app prototypes, and more. If you have an idea, we'd love to hear it."
  },
  {
    q: "How are students selected for projects?",
    a: "Students are selected based on their skills, experience, and interest in the project. All students are vetted by our senior mentors to ensure quality."
  },
  {
    q: "What does it cost to get a project built?",
    a: "Costs vary depending on the project's scope and complexity. We provide a detailed quote after our initial consultation. Our goal is to provide high-value work while being budget-friendly."
  }
];

// --- Reusable 3D Hero Content Component (Unchanged) ---
function HeroSlide3D({ children }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-150, 150], ['10deg', '-10deg']);
  const rotateY = useTransform(x, [-200, 200], ['-10deg', '10deg']);

  function handleMouse(event) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set(event.clientX - rect.left - rect.width / 2);
    y.set(event.clientY - rect.top - rect.height / 2);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <HeroSlideContentWrapper
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
    >
      <HeroSlideContent style={{ rotateX, rotateY }}>
        {children}
      </HeroSlideContent>
    </HeroSlideContentWrapper>
  );
}


// --- REACT COMPONENT ---

export default function Home() {
  // REMOVED expandedIndex state
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  
  // State for Interactive Timeline
  const [activeTimelineIndex, setActiveTimelineIndex] = useState(0);

  return (
    <div>
      {/* --- 1. HERO SLIDESHOW (Unchanged) --- */}
      <HeroSwiper
        modules={[Autoplay, Pagination, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
      >
        {heroSlides.map((slide, index) => (
          <HeroSlide key={index}>
            <div className="hero-bg" style={{ backgroundImage: `url(${slide.bg})` }} />
            <HeroSlide3D>
              <motion.div
                initial="initial"
                whileInView="animate" // Use whileInView to trigger animation on slide change
                viewport={{ once: true }}
                variants={heroSlideContainerAnim}
              >
                <HeroTitle variants={heroTextAnim}>{slide.title}</HeroTitle>
                <HeroSubtitle variants={heroTextAnim}>{slide.subtitle}</HeroSubtitle>
                <HeroButton variants={heroTextAnim} to={slide.link}>
                  {slide.buttonText} <HiOutlineArrowRight />
                </HeroButton>
              </motion.div>
            </HeroSlide3D>
          </HeroSlide>
        ))}
         <ScrollDownIndicator
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1 }}
         >
          <HiOutlineChevronDown />
        </ScrollDownIndicator>
      </HeroSwiper>
      
      {/* --- 2. OUR SERVICES (REPLACED with Coverflow) --- */}
      <Section
        $alt={true}
        initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariant}
        id="services"
      >
        <Container>
          <SectionTitle>Our Services</SectionTitle>
          {/* NEW CAROUSEL ADDED HERE */}
          <CoverflowSwiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'} // 'auto' is best for coverflow
            loop={true}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            coverflowEffect={{
              rotate: 0,
              stretch: 80, // Space between slides
              depth: 200, // 3D depth
              modifier: 1, // Effect multiplier
              slideShadows: false, // Turned off shadows for a cleaner look
            }}
            navigation={true} // Use custom styled arrows
            modules={[EffectCoverflow, Navigation, Autoplay]} // Added modules
          >
            {services.map((service, index) => (
              <SwiperSlide 
                key={index} 
                style={{ backgroundImage: `url(${service.bg})` }}
              >
                <ServiceSlideContent
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <ServiceTitle>{service.title}</ServiceTitle>
                  <ServiceDescription>{service.description}</ServiceDescription>
                </ServiceSlideContent>
              </SwiperSlide>
            ))}
          </CoverflowSwiper>
        </Container>
      </Section>
      
      {/* --- 3. HOW IT WORKS (Unchanged) --- */}
      <Section
        initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariant}
      >
        <Container>
          <SectionTitle>How It Works</SectionTitle>
          <TimelineContainer>
            <TimelineNav>
              {howItWorks.map((item, index) => (
                <TimelineButton
                  key={index}
                  onClick={() => setActiveTimelineIndex(index)}
                  className={activeTimelineIndex === index ? 'active' : ''}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.step}
                </TimelineButton>
              ))}
            </TimelineNav>
            <TimelineContent>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTimelineIndex} // This makes AnimatePresence work
                  variants={timelineContentAnim}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  <TimelineStep>{howItWorks[activeTimelineIndex].step}</TimelineStep>
                  <TimelineTitle>{howItWorks[activeTimelineIndex].title}</TimelineTitle>
                  <TimelineDescription>{howItWorks[activeTimelineIndex].description}</TimelineDescription>
                </motion.div>
              </AnimatePresence>
            </TimelineContent>
          </TimelineContainer>
        </Container>
      </Section>


      {/* --- 4. TESTIMONIALS CAROUSEL (Unchanged) --- */}
      <Section
        $alt={true}
        initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariant}
      >
        <Container>
          <SectionTitle>What People Are Saying</SectionTitle>
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            breakpoints={{
              768: { slidesPerView: 2 },
            }}
            style={{paddingBottom: '3rem'}}
          >
            {testimonials.map((t, index) => (
              <SwiperSlide key={index}>
                <TestimonialCard>
                  <Quote>{t.quote}</Quote>
                  <Author>
                    <img src={t.img} alt={t.name} />
                    <span>{t.name}</span>
                  </Author>
                </TestimonialCard>
              </SwiperSlide>
            ))}
          </Swiper>
        </Container>
      </Section>

      {/* --- 5. OUR PARTNERS (Unchanged) --- */}
      <Section
        initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariant}
      >
        <Container>
          <SectionTitle>Trusted By</SectionTitle>
          <PartnersContainer>
            <PartnersTrack>
              {[...partners, ...partners].map((logo, index) => (
                <PartnerLogo key={index}>
                  <img src={`https://via.placeholder.com/120x60/808080/FFFFFF?text=${logo}`} alt={`Partner ${index + 1}`} />
                </PartnerLogo>
              ))}
            </PartnersTrack>
          </PartnersContainer>
        </Container>
      </Section>

      {/* --- 6. FAQ Section (Unchanged) --- */}
      <Section
        $alt={true}
        initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariant}
      >
        <Container>
          <SectionTitle>Frequently Asked Questions</SectionTitle>
          <FaqContainer>
            {faqs.map((faq, index) => (
              <FaqItem key={index}>
                <FaqQuestion 
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  aria-expanded={openFaqIndex === index}
                >
                  <span>{faq.q}</span>
                  {openFaqIndex === index ? <HiMinus /> : <HiPlus />}
                </FaqQuestion>
                <AnimatePresence>
                  {openFaqIndex === index && (
                    <FaqAnswer
                      variants={faqAnswerAnim}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                    >
                      {faq.a}
                    </FaqAnswer>
                  )}
                </AnimatePresence>
              </FaqItem>
            ))}
          </FaqContainer>
        </Container>
      </Section>

      {/* --- 7. FINAL CTA (Unchanged) --- */}
      <Container>
        <CTASection
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariant}
        >
          <CTATitle>Ready to Start Your Project?</CTATitle>
          <CTASubtitle>
            Let's build something amazing together. Request a project today or join our team of talented students.
          </CTASubtitle>
          <CTAButton to="/request-project">
            Request a Project <HiOutlineChevronRight />
          </CTAButton>
        </CTASection>
      </Container>
    </div>
  );
}

