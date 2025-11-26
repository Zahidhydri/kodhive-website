import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HiOutlineAcademicCap, 
  HiOutlineCode, 
  HiOutlineVideoCamera, 
  HiOutlineBriefcase, 
  HiOutlineColorSwatch,
  HiOutlineChip
} from 'react-icons/hi';

const services = {
  students: [
    {
      title: "Mini & Major Projects",
      icon: HiOutlineCode,
      desc: "Complete source code, documentation, and viva support for final year projects (Java, Python, MERN).",
      color: "#4a69ff"
    },
    {
      title: "Internship Programs",
      icon: HiOutlineBriefcase,
      desc: "Gain experience with 1-6 month remote internships. Get certified and build a real portfolio.",
      color: "#00796b"
    },
    {
      title: "Skill Training",
      icon: HiOutlineAcademicCap,
      desc: "One-on-one mentorship in React, Data Science, and Video Editing to get you job-ready.",
      color: "#f57c00"
    }
  ],
  business: [
    {
      title: "Web & App Development",
      icon: HiOutlineChip,
      desc: "Custom websites, e-commerce stores, and mobile apps built for small businesses and startups.",
      color: "#6f42c1"
    },
    {
      title: "Pro Video Editing",
      icon: HiOutlineVideoCamera,
      desc: "High-end editing for YouTube channels, reels, corporate promos, and wedding highlights.",
      color: "#d81b60"
    },
    {
      title: "Branding & Graphics",
      icon: HiOutlineColorSwatch,
      desc: "Logo design, social media kits, and brochures to give your brand a premium look.",
      color: "#007bff"
    }
  ]
};

const Section = styled.section`
  padding: 6rem 1.5rem;
  background: ${({ theme }) => theme.body};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.text};
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.textSecondary};
  max-width: 600px;
  margin: 0 auto;
`;

const ToggleContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
`;

const ToggleButton = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 30px;
  font-size: 1rem;
  font-weight: 600;
  border: 2px solid ${({ theme, $active }) => $active ? theme.buttonBg : theme.border};
  background: ${({ theme, $active }) => $active ? theme.buttonBg : 'transparent'};
  color: ${({ theme, $active }) => $active ? theme.buttonText : theme.text};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const Card = styled(motion.div)`
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 16px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  transition: all 0.3s ease;
  border-top: 4px solid ${({ $color }) => $color};

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0,0,0,0.08);
  }
`;

const IconBox = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 12px;
  background: ${({ $color }) => $color}22;
  color: ${({ $color }) => $color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
`;

const CardDesc = styled.p`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.textSecondary};
  line-height: 1.6;
`;

export default function ServicesSection() {
  const [activeTab, setActiveTab] = useState('students');

  return (
    <Section>
      <Container>
        <Header>
          <Title>What We Do</Title>
          <Subtitle>Tailored solutions for ambitious students and growing businesses.</Subtitle>
        </Header>

        <ToggleContainer>
          <ToggleButton 
            $active={activeTab === 'students'} 
            onClick={() => setActiveTab('students')}
          >
            For Students
          </ToggleButton>
          <ToggleButton 
            $active={activeTab === 'business'} 
            onClick={() => setActiveTab('business')}
          >
            For Business
          </ToggleButton>
        </ToggleContainer>

        <AnimatePresence mode="wait">
          <Grid
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {services[activeTab].map((service, index) => (
              <Card key={index} $color={service.color}>
                <IconBox $color={service.color}>
                  <service.icon />
                </IconBox>
                <CardTitle>{service.title}</CardTitle>
                <CardDesc>{service.desc}</CardDesc>
              </Card>
            ))}
          </Grid>
        </AnimatePresence>
      </Container>
    </Section>
  );
}