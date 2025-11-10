// src/components/ServicesSection.jsx
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Import icons
import {
  HiOutlinePencilAlt,
  HiOutlineBriefcase,
  HiOutlineUsers,
  HiOutlineColorSwatch,
  HiOutlineDeviceMobile,
} from 'react-icons/hi';

// --- DATA ---
const servicesData = [
  {
    icon: HiOutlinePencilAlt,
    title: 'Project Development',
    description:
      'Have an idea for a web app, mobile app, or a new brand? Our teams of vetted students, guided by senior mentors, will build and deliver your project from concept to launch.',
    bgColor: '#4a69ff',
  },
  {
    icon: HiOutlineBriefcase,
    title: 'Internship Opportunities',
    description:
      'Gain real-world experience. We connect talented students with paid internships and projects, allowing you to build your portfolio and work on live applications.',
    bgColor: '#00796b',
  },
  {
    icon: HiOutlineDeviceMobile,
    title: 'Mobile App Development',
    description:
      'Create beautiful, cross-platform mobile applications for both iOS and Android from a single codebase. We focus on responsive design and a smooth native feel.',
    bgColor: '#f57c00', // Orange
  },
  {
    icon: HiOutlineColorSwatch,
    title: 'UI/UX & Brand Design',
    description:
      'A great product starts with a great design. Our students can help you with everything from logos and branding to complete user-flow wireframes and high-fidelity prototypes.',
    bgColor: '#d81b60',
  },
  {
    icon: HiOutlineUsers,
    title: 'Community & Mentorship',
    description:
      'Join a vibrant community of learners, builders, and industry experts. Get access to workshops, network with peers, and receive guidance to accelerate your tech career.',
    bgColor: '#6f42c1', // Purple
  },
];

// --- STYLED COMPONENTS ---

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

// --- [NEW] Simple Grid Layout ---
const ServiceGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
`;

// --- [MERGED] Card Component (from ServiceCard.jsx) ---
const ServiceCardStyled = styled(motion.div)`
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 10px 30px rgba(0,0,0,0.07);
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  border-top: 4px solid ${({ $color }) => $color};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 35px rgba(0,0,0,0.1);
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
  color: ${({ theme }) => (theme.text === '#212529' ? '#495057' : '#adb5bd')};
  line-height: 1.6;
  margin: 0;
`;
// --- End Merged Card ---


// --- ANIMATION ---
const sectionVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const gridVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 12 },
  },
};

// --- MAIN COMPONENT (Simplified) ---
export default function ServicesSection() {

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

        {/* --- [NEW] Simple Responsive Grid --- */}
        <ServiceGrid
          variants={gridVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {servicesData.map((service) => {
            const Icon = service.icon;
            return (
              <ServiceCardStyled 
                key={service.title} 
                $color={service.bgColor}
                variants={cardVariant}
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
        </ServiceGrid>
        
      </Container>
    </Section>
  );
}