// src/components/TechStack.jsx
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { 
  FaReact, FaNodeJs, FaPython, FaJava, FaFigma
} from 'react-icons/fa';
import { HiOutlineSparkles, HiOutlineFilm } from 'react-icons/hi';
import { 
  // Languages & Core
  SiJavascript, SiTypescript, SiCplusplus, SiPostgresql,
  // Frameworks
  SiVite, SiNextdotjs, SiFlask, SiTailwindcss,
  // Tools, Design & Cloud
  SiMongodb, SiFirebase, SiGooglecloud, SiVercel, SiRender, 
  SiCanva
} from 'react-icons/si';

// --- Base Styles ---
const Section = styled(motion.section)`
  /* Use global body background color */
  background: ${({ theme }) => theme.body};
  padding: 6rem 0;
  position: relative;
  overflow: hidden; // This is crucial for the scroller
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  position: relative;
  z-index: 2; // Sits above the background animation
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
  margin: 0 auto 3.5rem;
`;

// --- Horizontal Auto-Scroller Styles ---

const Scroller = styled.div`
  overflow: hidden;
  white-space: nowrap;
  
  /* Fade-out edges */
  -webkit-mask-image: linear-gradient(
    90deg, 
    transparent, 
    #000 10%, 
    #000 90%, 
    transparent
  );
  mask-image: linear-gradient(
    90deg, 
    transparent, 
    #000 10%, 
    #000 90%, 
    transparent
  );
`;

const scrollAnimation = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const ScrollerContent = styled(motion.div)`
  display: inline-flex;
  /* Calculate width based on items * (card width + margin) */
  /* This ensures the loop is seamless */
  width: calc(var(--item-count) * (var(--card-width) + 2rem) * 2);
  animation: ${scrollAnimation} var(--duration, 60s) linear infinite;
  animation-direction: ${({ $reverse }) => ($reverse ? 'reverse' : 'normal')};
  margin: 1.5rem 0;
`;

const TechCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  flex-shrink: 0;

  /* Mobile-first card sizing */
  width: var(--card-width);
  padding: 1.25rem 0.75rem;
  margin: 0 1rem;
  
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);

  /* The requested diagonal tilt */
  transform: rotate(-3deg);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  
  svg {
    font-size: 2rem;
    color: ${({ $color }) => $color};
  }
  
  span {
    font-size: 0.85rem;
    font-weight: 600;
  }

  &:hover {
    /* Straighten and lift on hover */
    transform: rotate(0deg) scale(1.05) translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    border-color: ${({ $color }) => $color};
  }
  
  /* Scale up for desktop */
  @media (min-width: 768px) {
    width: var(--card-width);
    padding: 1.5rem 1rem;
    
    svg {
      font-size: 2.5rem;
    }
    
    span {
      font-size: 1rem;
    }
  }
`;


// --- Tech Data (Categorized) ---

// 1. Programming Tech
const row1_dev = [
  { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
  { name: 'Python', icon: FaPython, color: '#3776AB' },
  { name: 'Java', icon: FaJava, color: '#f89820' },
  { name: 'C++', icon: SiCplusplus, color: '#00599C' },
  { name: 'PostgreSQL', icon: SiPostgresql, color: '#336791' },
  { name: 'MongoDB', icon: SiMongodb, color: '#4DB33D' },
];

// 2. Frameworks
const row2_frameworks = [
  { name: 'React', icon: FaReact, color: '#61DAFB' },
  { name: 'Node.js', icon: FaNodeJs, color: '#68A063' },
  { name: 'Next.js', icon: SiNextdotjs, color: '#000000' },
  { name: 'Flask', icon: SiFlask, color: '#000000' },
  { name: 'Vite', icon: SiVite, color: '#646CFF' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
];

// 3. Design, Cloud & Tools
const row3_tools = [
  { name: 'Figma', icon: FaFigma, color: '#F24E1E' },
  { name: 'Canva', icon: SiCanva, color: '#00C4CC' },
  { name: 'Adobe Express', icon: HiOutlineSparkles, color: '#FF0000' },
  { name: 'Clipchamp', icon: HiOutlineFilm, color: '#19A865' },
  { name: 'Firebase', icon: SiFirebase, color: '#FFCA28' },
  { name: 'Google Cloud', icon: SiGooglecloud, color: '#4285F4' },
  { name: 'Vercel', icon: SiVercel, color: '#000000' },
  { name: 'Render', icon: SiRender, color: '#46E3B7' },
];

// Helper to render the list twice for the loop
const renderCards = (techs) => (
  <>
    {techs.map((tech, i) => (
      <TechCard key={`${tech.name}-${i}`} $color={tech.color}>
        <tech.icon />
        <span>{tech.name}</span>
      </TechCard>
    ))}
    {/* Duplicate the list for the seamless loop */}
    {techs.map((tech, i) => (
      <TechCard key={`${tech.name}-dup-${i}`} $color={tech.color}>
        <tech.icon />
        <span>{tech.name}</span>
      </TechCard>
    ))}
  </>
);

// --- Animation Variants ---
const sectionVariant = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { duration: 0.6, ease: "easeOut" } 
  }
};

export default function TechStack() {
  // Define card width based on screen size for CSS variables
  const [cardWidth, setCardWidth] = React.useState('130px');

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setCardWidth('160px');
      } else {
        setCardWidth('130px');
      }
    };
    handleResize(); // Set initial size
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Section
      initial="hidden" 
      whileInView="visible" 
      viewport={{ once: true, amount: 0.1 }} 
      variants={sectionVariant}
      style={{
        '--card-width': cardWidth,
      }}
    >
      <Container>
        <SectionTitle>Our Complete Tech Stack</SectionTitle>
        <SectionSubtitle>
          From web and mobile development to AI and cloud, our students are skilled
          in a diverse range of modern tools.
        </SectionSubtitle>
      </Container>
      
      {/* Row 1: Development Languages */}
      <Scroller>
        <ScrollerContent 
          style={{ '--duration': '60s', '--item-count': row1_dev.length }}
        >
          {renderCards(row1_dev)}
        </ScrollerContent>
      </Scroller>
      
      {/* Row 2: Frameworks */}
      <Scroller>
        <ScrollerContent 
          $reverse 
          style={{ '--duration': '50s', '--item-count': row2_frameworks.length }}
        >
          {renderCards(row2_frameworks)}
        </ScrollerContent>
      </Scroller>
      
      {/* Row 3: Design, Cloud & Tools */}
      <Scroller>
        <ScrollerContent 
          style={{ '--duration': '70s', '--item-count': row3_tools.length }}
        >
          {renderCards(row3_tools)}
        </ScrollerContent>
      </Scroller>

    </Section>
  );
}