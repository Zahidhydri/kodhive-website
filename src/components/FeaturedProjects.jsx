// src/components/FeaturedProjects.jsx
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiOutlineArrowRight } from 'react-icons/hi';

// --- Re-usable Base Styles (from Home.jsx) ---
const Section = styled(motion.section)`
  padding: 6rem 0;
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
// --- End Base Styles ---

// --- Component-Specific Styles ---
const ProjectGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const ProjectCard = styled(motion.div)`
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
  }
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-bottom: 1px solid ${({ theme }) => theme.border};
`;

const ProjectContent = styled.div`
  padding: 1.5rem;
`;

const ProjectCategory = styled.span`
  display: inline-block;
  font-size: 0.85rem;
  font-weight: 600;
  color: ${({ theme }) => theme.buttonBg};
  margin-bottom: 0.5rem;
`;

const ProjectTitle = styled.h3`
  font-size: 1.35rem;
  font-weight: 600;
  margin: 0 0 0.75rem 0;
  color: ${({ theme }) => theme.text};
`;

const ProjectDescription = styled.p`
  font-size: 0.95rem;
  color: ${({ theme }) => (theme.text === '#212529' ? '#495057' : '#adb5bd')};
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const ProjectTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const Tag = styled.span`
  background: ${({ theme }) => theme.body};
  border: 1px solid ${({ theme }) => theme.border};
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const CtaWrapper = styled.div`
  text-align: center;
`;

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
    transition: { staggerChildren: 0.2 },
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

// --- Placeholder Data ---
const projects = [
  {
    category: "Web Application",
    title: "Student Portfolio Hub",
    description: "A full-stack platform for students to showcase their projects, skills, and gain visibility from recruiters.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600",
    tags: ["React", "Node.js", "Firebase", "Figma"]
  },
  {
    category: "Mobile App",
    title: "Campus Connect",
    description: "A cross-platform mobile app for university students to connect, share notes, and stay updated on campus events.",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&q=80&w=600",
    tags: ["React Native", "Firebase", "UI/UX"]
  },
  {
    category: "UI/UX & Branding",
    title: "EcoFresh Logistics",
    description: "A complete branding and UI/UX design prototype for a local sustainable delivery service startup.",
    image: "https://images.unsplash.com/photo-1581291518857-4e275087a113?auto=format&fit=crop&q=80&w=600",
    tags: ["Figma", "Adobe Illustrator", "Prototyping"]
  }
];

export default function FeaturedProjects() {
  return (
    <Section 
      initial="hidden" 
      whileInView="visible" 
      viewport={{ once: true, amount: 0.2 }} 
      variants={sectionVariant}
    >
      <Container>
        <SectionTitle>Our Featured Projects</SectionTitle>
        <SectionSubtitle>
          See what our talented students have built. From full-stack web apps to 
          stunning mobile designs, our community delivers results.
        </SectionSubtitle>

        <ProjectGrid
          variants={gridVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {projects.map((project, index) => (
            <ProjectCard key={index} variants={cardVariant}>
              <ProjectImage src={project.image} alt={project.title} />
              <ProjectContent>
                <ProjectCategory>{project.category}</ProjectCategory>
                <ProjectTitle>{project.title}</ProjectTitle>
                <ProjectDescription>{project.description}</ProjectDescription>
                <ProjectTags>
                  {project.tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
                </ProjectTags>
              </ProjectContent>
            </ProjectCard>
          ))}
        </ProjectGrid>
        
        <CtaWrapper>
          <PrimaryButton as={Link} to="/internships">
            Explore More Opportunities <HiOutlineArrowRight />
          </PrimaryButton>
        </CtaWrapper>
      </Container>
    </Section>
  );
}