// src/components/InnovationCta.jsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { HiOutlineLightBulb, HiOutlinePaperAirplane } from 'react-icons/hi';
import { useScroll } from '../contexts/ScrollContext'; // <-- [FIX] IMPORT THE HOOK

// ... (Styled components remain the same) ...
// --- STYLED COMPONENT DEFINITIONS ---

const Section = styled(motion.section)`
  padding: 6rem 0;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      45deg, 
      ${({ theme }) => theme.body}, 
      ${({ theme }) => theme.card}, 
      ${({ theme }) => theme.body}
    );
    background-size: 200% 200%;
    animation: gradientBG 15s ease infinite;
    z-index: 1;
  }

  @keyframes gradientBG {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  position: relative;
  z-index: 2; 
`;

const SectionTitle = styled(motion.h2)`
  font-size: 2.75rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
`;

const SectionSubtitle = styled(motion.p)`
  text-align: center;
  font-size: 1.15rem;
  color: ${({ theme }) => (theme.text === '#212529' ? '#495057' : '#adb5bd')};
  max-width: 600px;
  margin: 0 auto 3.5rem;
`;

const InnovationGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2.5rem; 
  max-width: 1000px;
  margin: 0 auto;
`;

const InnovationCard = styled(motion.div)`
  background: ${({ theme }) => theme.nav}; 
  backdrop-filter: blur(10px);
  
  padding: 2.5rem;
  border-radius: 16px; 
  text-align: center;
  border: 1px solid ${({ theme }) => theme.border};
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1); 
  
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InnovationIconWrapper = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  
  background: linear-gradient(135deg, ${({ theme }) => theme.buttonBg}, ${({ theme }) => theme.buttonHover});
  color: ${({ theme }) => theme.buttonText};
  
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  font-size: 1.75rem;
  box-shadow: 0 4px 15px ${({ theme }) => theme.buttonBg}88;
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
  flex-grow: 1; 
`;

const PrimaryButton = styled(motion(Link))`
  padding: 0.85rem 1.75rem;
  background-color: ${({ theme }) => theme.buttonBg};
  color: ${({ theme }) => theme.buttonText};
  border-radius: 8px;
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
    box-shadow: 0 8px 25px ${({ theme }) => theme.buttonBg}77;
  }
`;

const SecondaryButton = styled(PrimaryButton)`
  background: transparent;
  color: ${({ theme }) => theme.text};
  border: 2px solid ${({ theme }) => theme.buttonBg};
  
  &:hover {
    background: ${({ theme }) => theme.buttonBg};
    color: ${({ theme }) => theme.buttonText};
    box-shadow: 0 8px 25px ${({ theme }) => theme.buttonBg}77;
  }
`;

// --- Animation Variants ---
const sectionVariant = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.1 } 
  }
};

const cardVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 12 },
  },
};

export default function InnovationCta() {
  
  // --- [FIX] Add scroll context and handler ---
  const mainScrollRef = useScroll();
  const handleScrollToTop = () => {
    if (mainScrollRef && mainScrollRef.current) {
      mainScrollRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };
  // --- End Fix ---

  return (
    <Section 
      initial="hidden" 
      whileInView="visible" 
      viewport={{ once: true, amount: 0.2 }} 
      variants={sectionVariant}
    >
      <Container>
        <SectionTitle variants={cardVariant}>Turn Your Ideas into Reality</SectionTitle>
        <SectionSubtitle variants={cardVariant}>
          Have an idea you want to build or need our team's expertise? We've got a path for your innovation.
        </SectionSubtitle>
        <InnovationGrid>
          <InnovationCard 
            variants={cardVariant}
            whileHover={{ scale: 1.03, transition: { type: 'spring', stiffness: 300 } }}
          >
            <InnovationIconWrapper><HiOutlineLightBulb /></InnovationIconWrapper>
            <InnovationTitle>Idea Submission & Guidance</InnovationTitle>
            <InnovationDescription>
              Have a project idea but need expert mentorship to execute it? Submit your concept and we'll guide you through the process.
            </InnovationDescription>
            {/* [FIX] Add onClick handler */ }
            <PrimaryButton 
              to="/request-project?form=guidance" 
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleScrollToTop}
            >
              Get Expert Guidance
            </PrimaryButton>
          </InnovationCard>
          <InnovationCard 
            variants={cardVariant}
            whileHover={{ scale: 1.03, transition: { type: 'spring', stiffness: 300 } }}
          >
            <InnovationIconWrapper><HiOutlinePaperAirplane /></InnovationIconWrapper>
            <InnovationTitle>Custom Project Request</InnovationTitle>
            <InnovationDescription>
              Submit your requirements, and we can assign it to our talented students for development, giving them real-world experience.
            </InnovationDescription>
            {/* [FIX] Add onClick handler */ }
            <SecondaryButton 
              to="/request-project?form=full" 
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleScrollToTop}
            >
              Request Project Build
            </SecondaryButton>
          </InnovationCard>
        </InnovationGrid>
      </Container>
    </Section>
  );
}