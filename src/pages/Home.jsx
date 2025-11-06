// src/pages/Home.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  HiOutlineChevronRight,
  HiPlus,
  HiMinus,
  HiOutlineAcademicCap,
  HiOutlineClock,
  HiOutlineUsers,
  HiOutlineLightBulb,
  HiOutlinePaperAirplane,
  HiOutlineBriefcase,
} from 'react-icons/hi';

// --- Import Components ---
import InteractiveHero from '../components/InteractiveHero';
import LogoShowcase from '../components/LogoShowcase';
import ServicesSection from '../components/ServicesSection'; // <-- IMPORTED NEW COMPONENT

// --- Import Swiper ---
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules'; // <-- Removed Coverflow & Nav
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
// <-- Removed coverflow & nav CSS

// --- STYLED COMPONENT DEFINITIONS ---

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
`;

// General Section components
const Section = styled(motion.section)`
  padding: 6rem 0;
  background: ${({ theme, $alt }) => ($alt ? theme.card : 'transparent')};
  border-top: ${({ theme, $alt }) => ($alt ? `1px solid ${theme.border}` : 'none')};
  border-bottom: ${({ theme, $alt }) => ($alt ? `1px solid ${theme.border}` : 'none')};
  overflow-x: hidden;
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
  margin: 0 auto 3rem;
`;

// --- 2. OUR SERVICES (Coverflow - REMOVED) ---
// Old CoverflowSwiper, ServiceSlideContent, etc., are now removed.

// --- 3. Features Section ---
const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
`;
const FeatureCard = styled(motion.div)`
  background: ${({ theme }) => theme.card};
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  border: 1px solid ${({ theme }) => theme.border};
  transition: all 0.3s ease;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  }
`;
const FeatureIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${({ theme }) => theme.buttonBg}22; /* Light primary bg */
  color: ${({ theme }) => theme.buttonBg};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
`;
const FeatureTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.text};
`;
const FeatureDescription = styled.p`
  color: ${({ theme }) => (theme.text === '#212529' ? '#495057' : '#adb5bd')};
  font-size: 0.95rem;
`;

// --- 4. HOW IT WORKS (Timeline) ---
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
    box-shadow: 0 4px 15px ${({ theme }) => theme.buttonBg}44;
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
  color: ${({ theme }) => (theme.text === '#212529' ? '#495057' : '#adb5bd')};
  line-height: 1.6;
`;

// --- 5. Student Innovation Section ---
const InnovationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;
`;
const InnovationCard = styled(motion.div)`
  background: ${({ theme }) => theme.card};
  padding: 2.5rem;
  border-radius: 12px;
  text-align: center;
  border: 1px solid ${({ theme }) => theme.border};
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s;
  &:hover {
    transform: translateY(-5px);
  }
`;
const InnovationIconWrapper = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${({ theme }) => theme.buttonBg}22;
  color: ${({ theme }) => theme.buttonBg};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  font-size: 1.75rem;
`;
const InnovationTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
`;
const InnovationDescription = styled.p`
  color: ${({ theme }) => (theme.text === '#212529' ? '#495057' : '#adb5bd')};
  margin-bottom: 1.5rem;
`;
const PrimaryButton = styled(motion.button)`
  padding: 0.75rem 1.5rem;
  background-color: ${({ theme }) => theme.buttonBg};
  color: ${({ theme }) => theme.buttonText};
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  &:hover {
    background-color: ${({ theme }) => theme.buttonHover};
    transform: translateY(-2px);
  }
`;
const SecondaryButton = styled(PrimaryButton)`
  background: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.border};
  &:hover {
    background: ${({ theme }) => theme.body};
    border-color: ${({ theme }) => theme.text};
    transform: translateY(-2px);
  }
`;

// --- 6. Inspiration Section ---
const InspirationGrid = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 2rem;
  padding: 1rem 0;
  scroll-snap-type: x mandatory;
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  &::-webkit-scrollbar {
    height: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.border};
    border-radius: 4px;
  }
`;
const InspirationCard = styled(motion.div)`
  min-width: 320px;
  max-width: 320px;
  scroll-snap-align: start;
  background: ${({ theme }) => theme.card};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  border: 1px solid ${({ theme }) => theme.border};
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  }
`;
const QuoteContent = styled.div`
  padding: 1.5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const QuoteText = styled.p`
  font-style: italic;
  font-size: 1.1rem;
  color: ${({ theme }) => theme.text};
  margin-bottom: 1.5rem;
`;
const QuoteAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
const QuoteAuthorImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid ${({ theme }) => theme.buttonBg};
`;
const AuthorDetails = styled.div`
  .name {
    font-weight: 700;
    font-size: 1.1rem;
    color: ${({ theme }) => theme.text};
  }
  .role {
    font-size: 0.85rem;
    color: ${({ theme }) => (theme.text === '#212529' ? '#495057' : '#adb5bd')};
  }
`;

// --- 7. Featured Courses Section ---
const CoursesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
`;
const CourseCard = styled(motion.div)`
  background: ${({ theme }) => theme.card};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  border: 1px solid ${({ theme }) => theme.border};
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  }
`;
const CourseImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;
const CourseContent = styled.div`
  padding: 1.5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;
const CourseTitle = styled.h3`
  font-size: 1.35rem;
  margin-bottom: 0.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
`;
const CourseDescription = styled.p`
  color: ${({ theme }) => (theme.text === '#212529' ? '#495057' : '#adb5bd')};
  margin-bottom: 1rem;
  flex-grow: 1;
  font-size: 0.95rem;
`;
const PriceContainer = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
`;
const Price = styled.span`
  font-size: 1.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.buttonBg};
`;
const CutPrice = styled.span`
  text-decoration: line-through;
  color: ${({ theme }) => (theme.text === '#212529' ? '#495057' : '#adb5bd')};
`;
const LearnMoreButton = styled(Link)`
  padding: 0.75rem 1.5rem;
  background-color: ${({ theme }) => theme.buttonBg};
  color: ${({ theme }) => theme.buttonText};
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  text-align: center;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  &:hover {
    background-color: ${({ theme }) => theme.buttonHover};
    transform: translateY(-2px);
  }
`;

// --- 8. TESTIMONIALS ---
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
  color: ${({ theme }) => (theme.text === '#212529' ? '#495057' : '#adb5bd')};
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
    object-fit: cover;
  }
  span {
    font-weight: 600;
  }
`;

// --- 9. FAQ Section ---
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
  &[aria-expanded='true'] svg {
    transform: rotate(45deg);
  }
`;
const FaqAnswer = styled(motion.div)`
  padding: 0 1.5rem 1.5rem 1.5rem;
  font-size: 1rem;
  color: ${({ theme }) => (theme.text === '#212529' ? '#495057' : '#adb5bd')};
  line-height: 1.6;
`;

// --- 10. FINAL CTA ---
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
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};
const faqAnswerAnim = {
  hidden: { opacity: 0, height: 0, y: -10 },
  visible: { opacity: 1, height: 'auto', y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
};
const timelineContentAnim = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: 'easeOut' } },
};

// --- DUMMY DATA ---
const heroSlides = [
  // This data is now inside InteractiveHero.jsx
];
const partners = [
  // This data is now inside InteractiveHero.jsx
];

const howItWorks = [
  { step: 'Step 01', title: 'Request a Project', description: "Clients submit their project ideas, from logos to full-stack applications." },
  { step: 'Step 02', title: 'We Hire Students', description: 'We match your project with talented college students and freshers.' },
  { step: 'Step 03', title: 'Get it Done', description: 'Our students gain experience, and you get your project built, managed by us.' },
];

const testimonials = [
  { name: 'Aarav Sharma', quote: 'Kodhive delivered our project on time and exceeded all our expectations. Highly recommend!', img: 'https://placehold.co/100x100/4a69ff/FFFFFF?text=A' },
  { name: 'Priya Singh', quote: 'Working on a real project through Kodhive was an amazing experience. I learned so much.', img: 'https://placehold.co/100x100/f9c74f/1a2035?text=P' },
  { name: 'Rohan Gupta', quote: 'The student team was professional, creative, and incredibly responsive. We got a fantastic website.', img: 'https://placehold.co/100x100/198754/FFFFFF?text=R' },
];

const faqs = [
  { q: 'How do I request a project?', a: "You can request a project by visiting our 'Request a Project' page and filling out the form. We'll get back to you within 24-48 hours to discuss the details." },
  { q: 'What kind of projects can I request?', a: 'We accept a wide range of projects, including website development, logo design, mobile app prototypes, and more. If you have an idea, we\'d love to hear it.' },
  { q: 'How are students selected for projects?', a: 'Students are selected based on their skills, experience, and interest in the project. All students are vetted by our senior mentors to ensure quality.' },
  { q: 'What does it cost to get a project built?', a: "Costs vary. We provide a detailed quote after our initial consultation. Our goal is to provide high-value work while being budget-friendly." },
];

const coursesData = [
  {
    title: 'React for Beginners',
    description: 'Master the fundamentals of React, from components to state management, and build dynamic web applications.',
    image: 'https://images.unsplash.com/photo-1633356122544-f13432v4a6cee?q=80&w=2070&auto=format&fit=crop',
    price: '₹2,999',
    cutPrice: '₹4,999',
  },
  {
    title: 'Advanced CSS & Animation',
    description: 'Dive deep into modern CSS features like Flexbox, Grid, and animations to create stunning, responsive layouts.',
    image: 'https://images.unsplash.com/photo-1507721999472-8ed4421b4351?q=80&w=2070&auto=format&fit=crop',
    price: '₹1,999',
    cutPrice: '₹3,499',
  },
  {
    title: 'Full-Stack Node.js & Express',
    description: 'Learn to build robust back-end APIs with Node.js and Express, connecting them to a database.',
    image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?q=80&w=1974&auto=format&fit=crop',
    price: '₹3,499',
    cutPrice: '₹5,999',
  },
];

const inspirationData = [
  {
    quote: 'Failure is just a resting place. It is an opportunity to begin again more intelligently.',
    person: 'Henry Ford',
    role: 'Founder, Ford Motor Company',
    image: 'https://images.unsplash.com/photo-1516259771120-d31e53b4787d?q=80&w=1887&auto=format&fit=crop&h=60&w=60&fit=facearea',
  },
  {
    quote: "The biggest risk is not taking any risk. In a world that's changing really quickly, the only strategy that is guaranteed to fail is not taking risks.",
    person: 'Jeff Bezos',
    role: 'Founder, Amazon',
    image: 'https://images.unsplash.com/photo-1549490349-f9f38f121d4d?q=80&w=1974&auto=format&fit=crop&h=60&w=60&fit=facearea',
  },
  {
    quote: 'It\'s fine to celebrate success but it is more important to heed the lessons of failure.',
    person: 'Bill Gates',
    role: 'Co-founder, Microsoft',
    image: 'https://images.unsplash.com/photo-1543269664-7e79328229b4?q=80&w=2070&auto=format&fit=crop&h=60&w=60&fit=facearea',
  },
  {
    quote: 'Innovation distinguishes between a leader and a follower.',
    person: 'Steve Jobs',
    role: 'Co-founder, Apple',
    image: 'https://images.unsplash.com/photo-1594950269002-39046c8230b4?q=80&w=2070&auto=format&fit=crop&h=60&w=60&fit=facearea',
  },
];

// --- REACT COMPONENT ---

export default function Home() {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [activeTimelineIndex, setActiveTimelineIndex] = useState(0);

  return (
    <div>
      {/* --- 1. NEW InteractiveHero --- */}
      <InteractiveHero slides={heroSlides} partners={partners} />

      {/* --- NEW: LogoShowcase --- */}
      <LogoShowcase />

      {/* --- 2. NEW: Services Section --- */}
      <ServicesSection />

      {/* --- 3. Features Section --- */}
      <Section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariant}>
        <Container>
          <SectionTitle>Why Choose Kodhive?</SectionTitle>
          <SectionSubtitle>We provide a learning experience that is flexible, practical, and supported by a community of experts.</SectionSubtitle>
          <FeaturesGrid>
            <FeatureCard variants={sectionVariant}>
              <FeatureIcon>
                <HiOutlineAcademicCap />
              </FeatureIcon>
              <FeatureTitle>Expert Instructors</FeatureTitle>
              <FeatureDescription>Learn from industry professionals with years of real-world experience.</FeatureDescription>
            </FeatureCard>
            <FeatureCard variants={sectionVariant}>
              <FeatureIcon>
                <HiOutlineClock />
              </FeatureIcon>
              <FeatureTitle>Flexible Learning</FeatureTitle>
              <FeatureDescription>Access course materials anytime, anywhere, and learn at your own pace.</FeatureDescription>
            </FeatureCard>
            <FeatureCard variants={sectionVariant}>
              <FeatureIcon>
                <HiOutlineUsers />
              </FeatureIcon>
              <FeatureTitle>Community Support</FeatureTitle>
              <FeatureDescription>Join a vibrant community of learners and get help when you need it.</FeatureDescription>
            </FeatureCard>
          </FeaturesGrid>
        </Container>
      </Section>

      {/* --- 4. HOW IT WORKS (Timeline) --- */}
      <Section $alt={true} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariant}>
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
                <motion.div key={activeTimelineIndex} variants={timelineContentAnim} initial="hidden" animate="visible" exit="hidden">
                  <TimelineStep>{howItWorks[activeTimelineIndex].step}</TimelineStep>
                  <TimelineTitle>{howItWorks[activeTimelineIndex].title}</TimelineTitle>
                  <TimelineDescription>{howItWorks[activeTimelineIndex].description}</TimelineDescription>
                </motion.div>
              </AnimatePresence>
            </TimelineContent>
          </TimelineContainer>
        </Container>
      </Section>

      {/* --- 5. Student Innovation Section --- */}
      <Section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariant}>
        <Container>
          <SectionTitle>Turn Your Ideas into Reality</SectionTitle>
          <SectionSubtitle>Have an idea you want to build or need our team's expertise? We've got a path for your innovation.</SectionSubtitle>
          <InnovationGrid>
            <InnovationCard variants={sectionVariant}>
              <InnovationIconWrapper>
                <HiOutlineLightBulb />
              </InnovationIconWrapper>
              <InnovationTitle>Idea Submission & Guidance</InnovationTitle>
              <InnovationDescription>Have a project idea but need expert mentorship to execute it? Submit your concept and we'll guide you through the process.</InnovationDescription>
              <PrimaryButton as={Link} to="/contact">
                Get Expert Guidance
              </PrimaryButton>
            </InnovationCard>
            <InnovationCard variants={sectionVariant}>
              <InnovationIconWrapper>
                <HiOutlinePaperAirplane />
              </InnovationIconWrapper>
              <InnovationTitle>Custom Project Request</InnovationTitle>
              <InnovationDescription>Submit your requirements, and we can assign it to our talented students for development, giving them real-world experience.</InnovationDescription>
              <SecondaryButton as={Link} to="/request-project">
                Request Project Build
              </SecondaryButton>
            </InnovationCard>
          </InnovationGrid>
        </Container>
      </Section>

      {/* --- 6. Inspiration Section --- */}
      <Section $alt={true} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariant}>
        <Container>
          <SectionTitle>Get Inspired</SectionTitle>
          <SectionSubtitle>Powerful words from the personalities who have defined the tech world and beyond.</SectionSubtitle>
          <InspirationGrid>
            {inspirationData.map((item, index) => (
              <InspirationCard key={index} variants={sectionVariant}>
                <QuoteContent>
                  <QuoteText>“{item.quote}”</QuoteText>
                  <QuoteAuthor>
                    <QuoteAuthorImage src={item.image} alt={item.person} />
                    <AuthorDetails>
                      <p className="name">{item.person}</p>
                      <p className="role">{item.role}</p>
                    </AuthorDetails>
                  </QuoteAuthor>
                </QuoteContent>
              </InspirationCard>
            ))}
          </InspirationGrid>
        </Container>
      </Section>

      {/* --- 7. Featured Courses Section --- */}
      <Section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariant}>
        <Container>
          <SectionTitle>Featured Opportunities</SectionTitle>
          <SectionSubtitle>Get started with our most popular programs and kickstart your career in tech.</SectionSubtitle>
          <CoursesGrid>
            {coursesData.map((course, index) => (
              <CourseCard key={index} variants={sectionVariant}>
                <CourseImage src={course.image} alt={course.title} />
                <CourseContent>
                  <CourseTitle>{course.title}</CourseTitle>
                  <CourseDescription>{course.description}</CourseDescription>
                  <PriceContainer>
                    <Price>{course.price}</Price>
                    <CutPrice>{course.cutPrice}</CutPrice>
                  </PriceContainer>
                  <LearnMoreButton to="/internships">
                    <HiOutlineBriefcase /> Learn More
                  </LearnMoreButton>
                </CourseContent>
              </CourseCard>
            ))}
          </CoursesGrid>
        </Container>
      </Section>

      {/* --- 8. TESTIMONIALS --- */}
      <Section $alt={true} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariant}>
        <Container>
          <SectionTitle>What People Are Saying</SectionTitle>
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            breakpoints={{ 768: { slidesPerView: 2 } }}
            style={{ paddingBottom: '3rem' }}
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

      {/* --- 9. FAQ Section --- */}
      <Section $alt={true} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariant}>
        <Container>
          <SectionTitle>Frequently Asked Questions</SectionTitle>
          <FaqContainer>
            {faqs.map((faq, index) => (
              <FaqItem key={index}>
                <FaqQuestion onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)} aria-expanded={openFaqIndex === index}>
                  <span>{faq.q}</span>
                  {openFaqIndex === index ? <HiMinus /> : <HiPlus />}
                </FaqQuestion>
                <AnimatePresence>
                  {openFaqIndex === index && (
                    <FaqAnswer variants={faqAnswerAnim} initial="hidden" animate="visible" exit="hidden">
                      {faq.a}
                    </FaqAnswer>
                  )}
                </AnimatePresence>
              </FaqItem>
            ))}
          </FaqContainer>
        </Container>
      </Section>

      {/* --- 10. FINAL CTA --- */}
      <Container>
        <CTASection initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariant}>
          <CTATitle>Ready to Start Your Project?</CTATitle>
          <CTASubtitle>Let's build something amazing together. Request a project today or join our team of talented students.</CTASubtitle>
          <CTAButton to="/request-project">
            Request a Project <HiOutlineChevronRight />
          </CTAButton>
        </CTASection>
      </Container>
    </div>
  );
}