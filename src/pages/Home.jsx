// src/pages/Home.jsx
import { useState } from 'react';
// FIX: Import AnimatePresence
import { motion, AnimatePresence } from 'framer-motion'; 
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  HiPlus,
  HiMinus,
  HiOutlineAcademicCap,
  HiOutlineClock,
  HiOutlineUsers,
  HiOutlineLightBulb,
  HiOutlinePaperAirplane,
} from 'react-icons/hi';

// --- Import Components ---
import InteractiveHero from '../components/InteractiveHero';
import LogoShowcase from '../components/LogoShowcase';
import ServicesSection from '../components/ServicesSection'; 

// --- Import Swiper ---
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

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

// --- Features Section ("Why Choose Kodhive?") ---
const FeaturesGrid = styled(motion.div)`
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
  /* ENHANCED: Added transition for hover */
  transition: all 0.3s ease;
  &:hover {
    /* ENHANCED: Hover effect from your original request */
    transform: translateY(-5px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  }
`;
const FeatureIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${({ theme }) => theme.buttonBg}22;
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

// --- Student Innovation Section ---
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

// --- Inspiration Section ---
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

// --- TESTIMONIALS ---
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

// --- FAQ Section ---
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


// --- ANIMATION VARIANTS ---
const sectionVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" } 
  }
};

// ENHANCED: Stagger animation for feature cards
const featuresGridVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Each card animates 0.2s after the previous
    },
  },
};

// ENHANCED: Creative "spring" animation for cards
const featureCardVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 12 },
  },
};
// End of enhanced animation

const faqAnswerAnim = {
  hidden: { opacity: 0, height: 0, y: -10 },
  visible: { opacity: 1, height: 'auto', y: 0, transition: { duration: 0.3, ease: "easeOut" } }
};

// --- DUMMY DATA ---
const heroSlides = [ /* Data is in InteractiveHero.jsx */ ];
const partners = [ /* Data is in InteractiveHero.jsx */ ];

const testimonials = [
  { name: 'Aarav Sharma', quote: 'Kodhive delivered our project on time and exceeded all our expectations. Highly recommend!', img: 'https://placehold.co/100x100/4a69ff/FFFFFF?text=A' },
  { name: 'Priya Singh', quote: 'Working on a real project through Kodhive was an amazing experience. I learned so much.', img: 'https://placehold.co/100x100/f9c74f/1a2035?text=P' },
  { name: 'Rohan Gupta', quote: 'The student team was professional, creative, and incredibly responsive. We got a fantastic website.', img: 'https://placehold.co/100x100/198754/FFFFFF?text=R' }
];

const faqs = [
  { q: 'How do I request a project?', a: "You can request a project by visiting our 'Request a Project' page and filling out the form. We'll get back to you within 24-48 hours to discuss the details." },
  { q: 'What kind of projects can I request?', a: 'We accept a wide range of projects, including website development, logo design, mobile app prototypes, and more. If you have an idea, we\'d love to hear it.' },
  { q: 'How are students selected for projects?', a: 'Students are selected based on their skills, experience, and interest in the project. All students are vetted by our senior mentors to ensure quality.' },
  { q: 'What does it cost to get a project built?', a: "Costs vary. We provide a detailed quote after our initial consultation. Our goal is to provide high-value work while being budget-friendly." }
];

const inspirationData = [
    {
        quote: "Failure is just a resting place. It is an opportunity to begin again more intelligently.",
        person: "Henry Ford",
        role: "Founder, Ford Motor Company",
        image: "https://images.unsplash.com/photo-1516259771120-d31e53b4787d?q=80&w=1887&auto=format&fit=crop&h=60&w=60&fit=facearea", 
    },
    {
        quote: "The biggest risk is not taking any risk. In a world that's changing really quickly, the only strategy that is guaranteed to fail is not taking risks.",
        person: "Jeff Bezos",
        role: "Founder, Amazon",
        image: "https://images.unsplash.com/photo-1549490349-f9f38f121d4d?q=80&w=1974&auto=format&fit=crop&h=60&w=60&fit=facearea",
    },
    {
        quote: "It's fine to celebrate success but it is more important to heed the lessons of failure.",
        person: "Bill Gates",
        role: "Co-founder, Microsoft",
        image: "https://images.unsplash.com/photo-1543269664-7e79328229b4?q=80&w=2070&auto=format&fit=crop&h=60&w=60&fit=facearea", 
    },
    {
        quote: "Innovation distinguishes between a leader and a follower.",
        person: "Steve Jobs",
        role: "Co-founder, Apple",
        image: "https://images.unsplash.com/photo-1594950269002-39046c8230b4?q=80&w=2070&auto=format&fit=crop&h=60&w=60&fit=facearea", 
    },
];

// --- REACT COMPONENT ---

export default function Home() {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  
  return (
    <div>
      {/* --- 1. InteractiveHero --- */}
      <InteractiveHero slides={heroSlides} partners={partners} />
      
      {/* --- 2. LogoShowcase --- */}
      <LogoShowcase />

      {/* --- 3. Services Section --- */}
      <ServicesSection />
      
      {/* --- 4. "Why Choose Kodhive?" Section (ENHANCED) --- */}
      <Section $alt={true} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariant}>
        <Container>
          <SectionTitle>Why Choose Kodhive?</SectionTitle>
          <SectionSubtitle>We provide a learning experience that is flexible, practical, and supported by a community of experts.</SectionSubtitle>
          {/* ENHANCED: Added variants for stagger animation */}
          <FeaturesGrid
            variants={featuresGridVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <FeatureCard variants={featureCardVariant}>
              <FeatureIcon><HiOutlineAcademicCap /></FeatureIcon>
              <FeatureTitle>Expert Instructors</FeatureTitle>
              <FeatureDescription>Learn from industry professionals with years of real-world experience.</FeatureDescription>
            </FeatureCard>
            <FeatureCard variants={featureCardVariant}>
              <FeatureIcon><HiOutlineClock /></FeatureIcon>
              <FeatureTitle>Flexible Learning</FeatureTitle>
              <FeatureDescription>Access course materials anytime, anywhere, and learn at your own pace.</FeatureDescription>
            </FeatureCard>
            <FeatureCard variants={featureCardVariant}>
              <FeatureIcon><HiOutlineUsers /></FeatureIcon>
              <FeatureTitle>Community Support</FeatureTitle>
              <FeatureDescription>Join a vibrant community of learners and get help when you need it.</FeatureDescription>
            </FeatureCard>
          </FeaturesGrid>
        </Container>
      </Section>

      {/* --- 5. HOW IT WORKS (REMOVED) --- */}

      {/* --- 6. Student Innovation Section --- */}
      <Section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariant}>
        <Container>
          <SectionTitle>Turn Your Ideas into Reality</SectionTitle>
          <SectionSubtitle>Have an idea you want to build or need our team's expertise? We've got a path for your innovation.</SectionSubtitle>
          <InnovationGrid>
            <InnovationCard variants={featureCardVariant}>
              <InnovationIconWrapper><HiOutlineLightBulb /></InnovationIconWrapper>
              <InnovationTitle>Idea Submission & Guidance</InnovationTitle>
              <InnovationDescription>Have a project idea but need expert mentorship to execute it? Submit your concept and we'll guide you through the process.</InnovationDescription>
              <PrimaryButton as={Link} to="/contact">Get Expert Guidance</PrimaryButton>
            </InnovationCard>
            <InnovationCard variants={featureCardVariant}>
              <InnovationIconWrapper><HiOutlinePaperAirplane /></InnovationIconWrapper>
              <InnovationTitle>Custom Project Request</InnovationTitle>
              <InnovationDescription>Submit your requirements, and we can assign it to our talented students for development, giving them real-world experience.</InnovationDescription>
              <SecondaryButton as={Link} to="/request-project">Request Project Build</SecondaryButton>
            </InnovationCard>
          </InnovationGrid>
        </Container>
      </Section>

      {/* --- 7. Inspiration Section --- */}
      <Section $alt={true} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariant}>
        <Container>
          <SectionTitle>Get Inspired</SectionTitle>
          <SectionSubtitle>Powerful words from the personalities who have defined the tech world and beyond.</SectionSubtitle>
          <InspirationGrid>
            {inspirationData.map((item, index) => (
              <InspirationCard key={index} variants={featureCardVariant}>
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

      {/* --- 8. Featured Opportunities Section (REMOVED) --- */}

      {/* --- 9. TESTIMONIALS --- */}
      <Section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariant}>
        <Container>
          <SectionTitle>What People Are Saying</SectionTitle>
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            breakpoints={{ 768: { slidesPerView: 2 } }}
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

      {/* --- 10. FAQ Section --- */}
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
                {/* FIX: AnimatePresence was not defined, but now it is. */}
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

      {/* --- 11. FINAL CTA (REMOVED) --- */}
      
    </div>
  );
}