// src/components/PopularInternships.jsx
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiOutlineArrowRight, HiOutlineLocationMarker, HiOutlineClock } from 'react-icons/hi';

// ... (Data and other styled components remain the same) ...
// --- DATA: Selected Popular Internships (Updated to 3) ---
const popularInternships = [
  { 
    id: 1,
    title: 'Frontend Developer (React)', 
    description: 'Build and maintain modern, responsive user interfaces using React.js. Implement new features and create seamless user experiences.',
    image: 'https://images.unsplash.com/photo-1633356122544-f13432v4a6cee?auto=format&fit=crop&q=80&w=600',
    location: 'Remote',
    type: 'Part-time',
    skills: ['React', 'JavaScript', 'HTML', 'CSS'],
    category: 'Development'
  },
  { 
    id: 2,
    title: 'Python Developer Intern', 
    description: 'Work on backend services, data analysis scripts, and automation tasks. Perfect for someone who loves to solve complex problems.',
    image: 'https://images.unsplash.com/photo-1555949963-ff980e62553f?auto=format&fit=crop&q=80&w=600',
    location: 'Remote',
    type: 'Full-time',
    skills: ['Python', 'Django', 'Flask', 'APIs'],
    category: 'Development'
  },
  { 
    id: 5,
    title: 'Java Developer Intern', 
    description: 'Contribute to enterprise-level applications, working with Spring Boot and microservices. Build robust, scalable, and secure backend systems.',
    image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&q=80&w=600',
    location: 'Remote',
    type: 'Full-time',
    skills: ['Java', 'Spring Boot', 'SQL'],
    category: 'Development'
  },
];


// --- Re-usable Base Styles (from FeaturedProjects.jsx) ---
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
const InternshipGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

// UPDATED: InternshipCard is now a styled Link component
const InternshipCard = styled(motion(Link))`
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  height: 100%; 
  display: flex;
  flex-direction: column;
  text-decoration: none; /* Important for Link component */
  color: inherit; /* Inherit text color for accessibility */
  cursor: pointer; 

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
  }
`;

const InternshipImage = styled.img`
  width: 100%;
  height: 150px; 
  object-fit: cover;
  border-bottom: 1px solid ${({ theme }) => theme.border};
`;

const InternshipContent = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const InfoTags = styled.div`
    display: flex;
    gap: 1rem;
    margin-bottom: 0.75rem;
`;

const Tag = styled.span`
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    font-size: 0.85rem;
    font-weight: 500;
    color: ${({ theme }) => theme.text === '#212529' ? '#495057' : '#adb5bd'};
    
    svg {
        color: ${({ theme }) => theme.buttonBg};
    }
`;

const InternshipTitle = styled.h3`
  font-size: 1.35rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  color: ${({ theme }) => theme.text};
`;

const InternshipDescription = styled.p`
  font-size: 0.95rem;
  color: ${({ theme }) => (theme.text === '#212529' ? '#495057' : '#adb5bd')};
  line-height: 1.6;
  margin-bottom: 1rem;
  flex-grow: 1;
`;

const SkillsTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const SkillBadge = styled.span`
  background: ${({ theme }) => theme.body};
  border: 1px solid ${({ theme }) => theme.border};
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const CtaWrapper = styled.div`
  text-align: center;
`;

// --- Animation Variants (Reused) ---
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


export default function PopularInternships() {
  return (
    <Section 
      initial="hidden" 
      whileInView="visible" 
      viewport={{ once: true, amount: 0.2 }} 
      variants={sectionVariant}
    >
      <Container>
        <SectionTitle>Top Internships & Opportunities</SectionTitle>
        <SectionSubtitle>
          Apply to our most sought-after roles and gain real-world experience 
          to kickstart your tech career.
        </SectionSubtitle>

        <InternshipGrid
          variants={gridVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {popularInternships.map((internship) => (
            // [REMOVED] onClick handler
            <InternshipCard 
              key={internship.id} 
              variants={cardVariant}
              to="/internships" 
            >
              <InternshipImage src={internship.image} alt={internship.title} />
              <InternshipContent>
                <InternshipTitle>{internship.title}</InternshipTitle>
                
                <InfoTags>
                    <Tag><HiOutlineLocationMarker /> {internship.location}</Tag>
                    <Tag><HiOutlineClock /> {internship.type}</Tag>
                </InfoTags>
                
                <InternshipDescription>{internship.description}</InternshipDescription>
                
                <p style={{fontSize: '0.9rem', fontWeight: 600, color: '#007bff'}}>Top Skills:</p>
                <SkillsTags>
                  {internship.skills.slice(0, 3).map(skill => <SkillBadge key={skill}>{skill}</SkillBadge>)}
                </SkillsTags>
              </InternshipContent>
            </InternshipCard>
          ))}
        </InternshipGrid>
        
        <CtaWrapper>
          {/* [REMOVED] onClick handler */ }
          <PrimaryButton as={Link} to="/internships">
            View All Internships <HiOutlineArrowRight />
          </PrimaryButton>
        </CtaWrapper>
      </Container>
    </Section>
  );
}