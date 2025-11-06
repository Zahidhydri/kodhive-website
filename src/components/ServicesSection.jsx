// src/components/ServicesSection.jsx
import { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiOutlineCode,
  HiOutlineColorSwatch,
  HiOutlineDeviceMobile,
  HiOutlineDatabase,
  HiOutlineTrendingUp,
  HiOutlineCloud,
  HiOutlineChevronDown,
} from 'react-icons/hi';

// --- Data for the new section ---
const servicesData = [
  {
    icon: HiOutlineCode,
    title: 'Web Development',
    description:
      'We build everything from sleek landing pages to complex, high-performance web applications. Our students are skilled in the latest frontend and backend technologies to bring your vision to life.',
    tech: ['React.js', 'Node.js', 'Python (Django/Flask)', 'Java (Spring)', 'HTML5 & CSS3', 'JavaScript/TypeScript'],
  },
  {
    icon: HiOutlineDeviceMobile,
    title: 'Mobile App Development',
    description:
      'Create beautiful, cross-platform mobile applications for both iOS and Android from a single codebase. We focus on responsive design and a smooth native feel.',
    tech: ['React Native', 'Expo', 'Firebase', 'REST APIs', 'Redux'],
  },
  {
    icon: HiOutlineColorSwatch,
    title: 'UI/UX & Brand Design',
    description:
      'A great product starts with a great design. Our design-focused students can help you with everything from logos and branding to complete user-flow wireframes and high-fidelity prototypes.',
    tech: ['Figma', 'Adobe XD', 'Sketch', 'User Research', 'Prototyping', 'Logo Design'],
  },
  {
    icon: HiOutlineDatabase,
    title: 'Data & AI',
    description:
      'Unlock the power of your data. We offer services in data analysis, visualization, and machine learning model implementation to help you make smarter business decisions.',
    tech: ['Python (Pandas, NumPy)', 'Machine Learning', 'TensorFlow', 'Scikit-learn', 'SQL', 'Tableau'],
  },
  {
    icon: HiOutlineCloud,
    title: 'Cloud & DevOps',
    description:
      'Streamline your development and deployment process. Our students can assist with setting up CI/CD pipelines, managing cloud infrastructure, and containerizing your applications.',
    tech: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Git', 'Bash Scripting'],
  },
  {
    icon: HiOutlineTrendingUp,
    title: 'Digital Marketing & Content',
    description:
      'Grow your audience with our technical content and marketing services. We specialize in SEO-driven blog posts, technical documentation, and social media management for tech brands.',
    tech: ['SEO', 'Content Writing', 'Google Analytics', 'Social Media', 'Developer Marketing'],
  },
];

// --- Styled Components ---

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

const AccordionContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const AccordionItem = styled(motion.div)`
  background: ${({ theme }) => theme.body};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;

  /* Add a subtle shadow when open */
  ${({ $isOpen, theme }) =>
    $isOpen &&
    `
    border-color: ${theme.buttonBg}88;
    box-shadow: 0 8px 25px ${theme.buttonBg}22;
  `}
`;

const AccordionHeader = styled(motion.button)`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 1.5rem;
  background: transparent;
  border: none;
  cursor: pointer;
  text-align: left;
  gap: 1rem;

  svg {
    flex-shrink: 0;
  }
`;

const HeaderIcon = styled.div`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.buttonBg};
  background: ${({ theme }) => theme.buttonBg}22;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HeaderTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
  color: ${({ theme }) => theme.text};
  flex-grow: 1;
`;

const ToggleIcon = styled(motion.div)`
  font-size: 1.5rem;
  color: ${({ theme }) => (theme.text === '#212529' ? '#495057' : '#adb5bd')};
`;

const AccordionContent = styled(motion.div)`
  overflow: hidden;
`;

const ContentWrapper = styled.div`
  padding: 0 1.5rem 1.5rem 1.5rem;
  margin-left: calc(44px + 1rem); /* Align with title */

  @media (max-width: 600px) {
    margin-left: 0; /* Stack on mobile */
    padding: 0 1.5rem 1.5rem 1.5rem;
  }
`;

const ServiceDescription = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => (theme.text === '#212529' ? '#6c757d' : '#adb5bd')};
  line-height: 1.6;
  margin: 0 0 1.5rem 0;
`;

const TechList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 0.75rem;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const TechItem = styled.li`
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.border};
  color: ${({ theme }) => (theme.text === '#212529' ? '#495057' : '#adb5bd')};
  padding: 0.25rem 0.75rem;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
`;

// --- Animation Variants ---
const sectionVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const contentVariant = {
  hidden: { opacity: 0, height: 0, y: -10 },
  visible: {
    opacity: 1,
    height: 'auto',
    y: 0,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    height: 0,
    y: -10,
    transition: { duration: 0.2, ease: 'easeIn' },
  },
};

// --- Component ---
export default function ServicesSection() {
  const [expandedIndex, setExpandedIndex] = useState(0); // Default first item open

  return (
    <Section
      id="services"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariant}
    >
      <Container>
        <SectionTitle>Our Services</SectionTitle>
        <SectionSubtitle>
          We provide a wide range of services by leveraging our diverse pool of student talent,
          all managed to ensure quality and timely delivery.
        </SectionSubtitle>

        <AccordionContainer>
          {servicesData.map((service, index) => {
            const isOpen = index === expandedIndex;
            const Icon = service.icon;

            return (
              <AccordionItem
                key={service.title}
                $isOpen={isOpen}
                variants={sectionVariant}
              >
                <AccordionHeader
                  onClick={() => setExpandedIndex(isOpen ? null : index)}
                  whileHover={{ backgroundColor: 'rgba(0,0,0,0.02)' }}
                >
                  <HeaderIcon>
                    <Icon />
                  </HeaderIcon>
                  <HeaderTitle>{service.title}</HeaderTitle>
                  <ToggleIcon
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <HiOutlineChevronDown />
                  </ToggleIcon>
                </AccordionHeader>

                <AnimatePresence>
                  {isOpen && (
                    <AccordionContent
                      variants={contentVariant}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <ContentWrapper>
                        <ServiceDescription>
                          {service.description}
                        </ServiceDescription>
                        <TechList>
                          {service.tech.map((item) => (
                            <TechItem key={item}>{item}</TechItem>
                          ))}
                        </TechList>
                      </ContentWrapper>
                    </AccordionContent>
                  )}
                </AnimatePresence>
              </AccordionItem>
            );
          })}
        </AccordionContainer>
      </Container>
    </Section>
  );
}