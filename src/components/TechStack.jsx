// src/components/TechStack.jsx
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  FaReact, FaNodeJs, FaPython, FaJava, FaFigma, FaDocker, FaAws
} from 'react-icons/fa';
import { 
  SiVite, SiFirebase, SiCplusplus, SiMongodb, SiJavascript // Removed SiReactNative
} from 'react-icons/si';

// --- Re-usable Base Styles (from Home.jsx) ---
const Section = styled(motion.section)`
  padding: 6rem 0;
  background: ${({ theme }) => theme.card};
  border-top: 1px solid ${({ theme }) => theme.border};
  border-bottom: 1px solid ${({ theme }) => theme.border};
  overflow-x: hidden;
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
  margin: 0 auto 3rem;
`;
// --- End Base Styles ---

// --- Component-Specific Styles ---
const TechGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 1.5rem;
  max-width: 900px;
  margin: 0 auto;

  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 2rem;
  }
`;

const TechCard = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 1.5rem;
  background: ${({ theme }) => theme.body};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 12px;
  transition: all 0.3s ease;
  color: ${({ theme }) => theme.text};

  svg {
    font-size: 3rem;
    color: ${({ $color }) => $color};
  }
  
  span {
    font-size: 1rem;
    font-weight: 600;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.07);
    border-color: ${({ $color }) => $color};
  }
`;

// --- Tech Data ---
const technologies = [
  { name: 'React', icon: FaReact, color: '#61DAFB' },
  { name: 'React Native', icon: FaReact, color: '#61DAFB' }, // <-- FIXED: Changed icon to FaReact
  { name: 'Node.js', icon: FaNodeJs, color: '#68A063' },
  { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
  { name: 'Python', icon: FaPython, color: '#3776AB' },
  { name: 'Java', icon: FaJava, color: '#f89820' },
  { name: 'C++', icon: SiCplusplus, color: '#00599C' },
  { name: 'Firebase', icon: SiFirebase, color: '#FFCA28' },
  { name: 'MongoDB', icon: SiMongodb, color: '#4DB33D' },
  { name: 'Figma', icon: FaFigma, color: '#F24E1E' },
  { name: 'Vite', icon: SiVite, color: '#646CFF' },
  { name: 'Docker', icon: FaDocker, color: '#2496ED' },
];

// --- Animation Variants ---
const sectionVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" } 
  }
};

const gridVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariant = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 120, damping: 14 },
  },
};

export default function TechStack() {
  return (
    <Section
      $alt={true}
      initial="hidden" 
      whileInView="visible" 
      viewport={{ once: true, amount: 0.2 }} 
      variants={sectionVariant}
    >
      <Container>
        <SectionTitle>Technologies We Use</SectionTitle>
        <SectionSubtitle>
          Our students are trained on the latest technologies to build modern,
          scalable, and maintainable applications.
        </SectionSubtitle>
        <TechGrid
          variants={gridVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {technologies.map(tech => (
            <TechCard key={tech.name} variants={cardVariant} $color={tech.color}>
              <tech.icon />
              <span>{tech.name}</span>
            </TechCard>
          ))}
        </TechGrid>
      </Container>
    </Section>
  );
}