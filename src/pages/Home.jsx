// src/pages/Home.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { HiChevronDown, HiOutlineBriefcase, HiOutlineAcademicCap, HiOutlineUserGroup, HiOutlinePencilAlt, HiOutlinePresentationChartLine, HiOutlineLightBulb } from 'react-icons/hi';

import InteractiveHero from '../components/InteractiveHero';
import LogoShowcase from '../components/LogoShowcase';
import PopularInternships from '../components/PopularInternships';
import InnovationCta from '../components/InnovationCta';
import ServicesSection from '../components/ServicesSection';
import TechStack from '../components/TechStack';
import ProcessTimeline from '../components/ProcessTimeline'; 

const pageVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  exit: { opacity: 0, y: -15, transition: { duration: 0.2, ease: 'easeIn' } }
};

// Fixed: Use motion.create() pattern or styled(motion.section) correctly
const Section = styled(motion.section)`
  padding: 6rem 1.5rem;
  background: ${({ $alt, theme }) => $alt ? theme.card : theme.body};
  border-bottom: 1px solid ${({ theme }) => theme.border};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

// FIXED: Changed styled.h2 to styled(motion.h2) so it accepts 'variants'
const SectionTitle = styled(motion.h2)`
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
`;

// FIXED: Changed styled.p to styled(motion.p) so it accepts 'variants'
const SectionSubtitle = styled(motion.p)`
  text-align: center;
  font-size: 1.1rem;
  color: ${({ theme }) => (theme.text === '#212529' ? '#495057' : '#adb5bd')};
  max-width: 600px;
  margin: 0 auto 3rem;
`;

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const Card = styled(motion.div)`
  background: ${({ theme }) => theme.body};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
`;

const IconWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, ${({ theme }) => theme.buttonBg}, ${({ theme }) => theme.buttonHover});
  color: ${({ theme }) => theme.buttonText};
  font-size: 1.75rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 15px ${({ theme }) => theme.buttonBg}88;
`;

const CardTitle = styled.h3`
  font-size: 1.35rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
`;

const CardText = styled.p`
  color: ${({ theme }) => (theme.text === '#212529' ? '#495057' : '#adb5bd')};
  line-height: 1.6;
`;

const FaqWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const FaqItem = styled.div`
  background: ${({ theme }) => theme.body};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  margin-bottom: 1rem;
  overflow: hidden;
`;

const FaqHeader = styled.button`
  background: transparent;
  border: none;
  width: 100%;
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: left;
  font-size: 1.1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
`;

const FaqContent = styled(motion.div)`
  padding: 0 1.5rem 1.5rem;
  color: ${({ theme }) => (theme.text === '#212529' ? '#495057' : '#adb5bd')};
  line-height: 1.6;
`;

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

const faqContentVariants = {
  hidden: { opacity: 0, height: 0, y: -10 },
  visible: { opacity: 1, height: 'auto', y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  exit: { opacity: 0, height: 0, y: -10, transition: { duration: 0.2, ease: 'easeIn' } }
};

const faqData = [
  { 
    q: "What is Skill Tensor?", 
    a: "Skill Tensor is a platform that bridges the gap between students and companies. We provide students with real-world project experience and internship opportunities, while helping companies find fresh talent and get projects built." 
  },
  { 
    q: "Who can join Skill Tensor?", 
    a: "Currently, Skill Tensor is open to all university students, recent graduates, and companies looking to hire interns or get projects developed. We welcome everyone from coders and designers to marketers and project managers." 
  },
  { 
    q: "How do I get an internship?", 
    a: "Simply sign up, complete your profile to showcase your skills and experience, and start applying to the internships listed on our platform. Companies will review your application and contact you directly if you're a good fit." 
  },
  { 
    q: "I have a project idea. How can Skill Tensor help?", 
    a: "You can submit your project through our 'Request a Project' form. You can either request expert guidance to build it with your team, or you can have our curated pool of talented students build it for you under expert supervision." 
  },
];

const testimonials = [
  { 
    name: "Aarav Sharma", 
    role: "B.Tech Student, IIT Delhi", 
    quote: "Working on a real-world project through Skill Tensor was a game-changer. I learned more in 3 months than in a year of classes. It directly helped me land my dream internship." 
  },
  { 
    name: "Priya Singh, HR Manager", 
    role: "TechStart Solutions", 
    quote: "The interns we found on Skill Tensor are exceptional. They're motivated, skilled, and brought fresh perspectives to our team. The platform made the entire hiring process seamless." 
  },
  { 
    name: "Rohan Gupta, Project Lead", 
    role: "Student Innovator", 
    quote: "Skill Tensor provided the mentorship and structure we needed to turn our hackathon idea into a functional prototype. The guidance was invaluable." 
  },
];

export default function Home() {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  
  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };
  
  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <InteractiveHero />
      <LogoShowcase />
      
      {/* Services Section */}
      <ServicesSection />
      
      {/* Process Timeline */}
      <ProcessTimeline />
      
      <Section $alt={true} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariant}>
        <Container>
          <SectionTitle variants={cardVariant}>Why Choose Skill Tensor?</SectionTitle>
          <SectionSubtitle variants={cardVariant}>
            We're more than a platform; we're a community dedicated to launching tech careers and fostering innovation.
          </SectionSubtitle>
          <Grid
            variants={gridVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <Card variants={cardVariant}>
              <IconWrapper><HiOutlineBriefcase /></IconWrapper>
              <CardTitle>Real-World Experience</CardTitle>
              <CardText>Don't just learn—do. Apply your skills to actual projects from real companies.</CardText>
            </Card>
            <Card variants={cardVariant}>
              <IconWrapper><HiOutlineAcademicCap /></IconWrapper>
              <CardTitle>Expert Mentorship</CardTitle>
              <CardText>Get guidance from industry veterans who help you navigate challenges and grow.</CardText>
            </Card>
            <Card variants={cardVariant}>
              <IconWrapper><HiOutlineUserGroup /></IconWrapper>
              <CardTitle>Vibrant Community</CardTitle>
              <CardText>Connect with peers, mentors, and companies. Learn, share, and build together.</CardText>
            </Card>
          </Grid>
        </Container>
      </Section>
      
      <PopularInternships />
      <TechStack />
      <InnovationCta $alt={false} />

      <Section $alt={true} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariant}>
        <Container>
            <SectionTitle variants={cardVariant}>How We Foster Innovation</SectionTitle>
            <SectionSubtitle variants={cardVariant}>
              Our ecosystem is built to support every stage of the development lifecycle, from idea to launch.
            </SectionSubtitle>
            <Grid
              variants={gridVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <Card variants={cardVariant}>
                <IconWrapper><HiOutlinePencilAlt /></IconWrapper>
                <CardTitle>Project Incubation</CardTitle>
                <CardText>We help students refine their ideas and provide the resources to get started.</CardText>
              </Card>
              <Card variants={cardVariant}>
                <IconWrapper><HiOutlinePresentationChartLine /></IconWrapper>
                <CardTitle>Skill Development</CardTitle>
                <CardText>Access workshops and courses to learn the latest technologies and methodologies.</CardText>
              </Card>
              <Card variants={cardVariant}>
                <IconWrapper><HiOutlineLightBulb /></IconWrapper>
                <CardTitle>Showcase & Launch</CardTitle>
                <CardText>We provide a platform for you to showcase your finished projects to a wide audience.</CardText>
              </Card>
            </Grid>
        </Container>
      </Section>

      <Section initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariant}>
        <Container>
          <SectionTitle variants={cardVariant}>What Our Community Says</SectionTitle>
          <SectionSubtitle variants={cardVariant}>
            Hear from students, mentors, and partners who are part of the Skill Tensor journey.
          </SectionSubtitle>
          <Grid
            variants={gridVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {testimonials.map((testimonial, index) => (
              <Card as="blockquote" variants={cardVariant} key={index} style={{textAlign: 'left', background: '#f8f9fa'}}>
                <CardText style={{fontStyle: 'italic', fontSize: '1.05rem', color: '#212529'}}>"{testimonial.quote}"</CardText>
                <cite style={{marginTop: '1rem', display: 'block', notWidth: '100%'}}>
                  <strong style={{display: 'block', color: '#007bff'}}>{testimonial.name}</strong>
                  <span style={{fontSize: '0.9rem', color: '#495057'}}>{testimonial.role}</span>
                </cite>
              </Card>
            ))}
          </Grid>
        </Container>
      </Section>

      <Section $alt={true} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariant}>
        <Container>
          <SectionTitle variants={cardVariant}>Frequently Asked Questions</SectionTitle>
          <SectionSubtitle variants={cardVariant}>
            Have questions? We've got answers. Find out everything you need to know about Skill Tensor.
          </SectionSubtitle>
          <FaqWrapper>
            {faqData.map((item, index) => (
              <FaqItem key={index}>
                <FaqHeader onClick={() => toggleFaq(index)}>
                  {item.q}
                  <motion.div
                    animate={{ rotate: openFaqIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <HiChevronDown />
                  </motion.div>
                </FaqHeader>
                <AnimatePresence>
                  {openFaqIndex === index && (
                    <FaqContent
                      variants={faqContentVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      {item.a}
                    </FaqContent>
                  )}
                </AnimatePresence>
              </FaqItem>
            ))}
          </FaqWrapper>
        </Container>
      </Section>
      
    </motion.div>
  );
}