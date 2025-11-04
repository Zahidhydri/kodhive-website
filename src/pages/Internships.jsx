// src/pages/Internships.jsx
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const internships = [
  { title: 'Python Developer Intern', description: 'Work on backend services and data analysis scripts.' },
  { title: 'C++ Developer Intern', description: 'Optimize high-performance applications.' },
  { title: 'Java Developer Intern', description: 'Contribute to enterprise-level applications.' },
  { title: 'Frontend Developer (React)', description: 'Build modern, responsive user interfaces.' },
  { title: 'JavaScript Developer Intern', description: 'Develop full-stack applications with Node.js and React.' },
];

const googleFormUrl = "https://forms.gle/your-dummy-url";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 1.5rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;
`;

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Card = styled(motion.div)`
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  
  h2 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
  }
  
  p {
    color: ${({ theme }) => theme.text === '#212529' ? '#495057' : '#adb5bd'};
    margin-bottom: 1.5rem;
    flex-grow: 1;
  }
`;

const ApplyButton = styled.a`
  display: inline-block;
  text-align: center;
  padding: 0.6rem 1.2rem;
  background-color: ${({ theme }) => theme.buttonBg};
  color: ${({ theme }) => theme.buttonText};
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  &:hover {
    background-color: ${({ theme }) => theme.buttonHover};
  }
`;

export default function Internships() {
  return (
    <Container>
      <Title>Internship Opportunities</Title>
      <Grid
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1 }}
      >
        {internships.map((internship, index) => (
          <Card 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2>{internship.title}</h2>
            <p>{internship.description}</p>
            <ApplyButton 
              href={googleFormUrl} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Apply Now
            </ApplyButton>
          </Card>
        ))}
      </Grid>
    </Container>
  );
}