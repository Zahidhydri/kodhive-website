// src/pages/ProjectRequest.jsx
import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineLightBulb, HiOutlinePaperAirplane, HiOutlineCheckCircle, HiArrowSmRight, HiOutlineUser, HiOutlineMail, HiOutlinePencilAlt, HiOutlinePaperClip, HiOutlineMenu } from 'react-icons/hi';
import TechStack from '../components/TechStack';

// --- STYLED COMPONENTS (Unchanged) ---
const PageWrapper = styled(motion.div)`
  overflow: hidden; /* Prevent horizontal overflow */
`;
const Section = styled(motion.section)`
  padding: 4rem 1.5rem;
  background: ${({ $alt, theme }) => $alt ? theme.card : theme.body};
  border-bottom: 1px solid ${({ theme }) => theme.border};
  position: relative;
  overflow: hidden;
`;
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
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
const HeroSlideshow = styled.div`
  position: relative;
  width: 100%;
  max-width: 1000px;
  height: 400px;
  margin: 0 auto;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
`;
const Slide = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: flex-end;
  padding: 2rem;
  
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(0deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%);
  }
`;
const SlideContent = styled(motion.div)`
  position: relative;
  z-index: 2;
  color: #ffffff;
  
  h3 {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    text-shadow: 0 2px 4px rgba(0,0,0,0.5);
  }
  
  p {
    font-size: 1.1rem;
    max-width: 600px;
    text-shadow: 0 1px 3px rgba(0,0,0,0.5);
  }
`;
const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
`;
const TabButton = styled.button`
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  background: ${({ $isActive, theme }) => $isActive ? theme.buttonBg : theme.card};
  color: ${({ $isActive, theme }) => $isActive ? theme.buttonText : theme.text};
  border: 1px solid ${({ $isActive, theme }) => $isActive ? theme.buttonBg : theme.border};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${({ $isActive, theme }) => $isActive ? theme.buttonHover : theme.body};
    border-color: ${({ $isActive, theme }) => $isActive ? theme.buttonHover : theme.border};
  }
`;
const FormWrapper = styled(motion.div)`
  max-width: 800px;
  margin: 0 auto;
  background: ${({ theme }) => theme.body};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 12px;
  padding: 2.5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
`;
const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;
const Label = styled.label`
  display: block;
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;
const Input = styled.input`
  width: 100%;
  padding: 0.85rem 1rem;
  font-size: 1rem;
  color: ${({ theme }) => theme.text};
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 6px;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.buttonBg};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.buttonBg}44;
  }
`;
const Textarea = styled(Input).attrs({ as: 'textarea' })`
  resize: vertical;
  min-height: 120px;
`;
const Select = styled(Input).attrs({ as: 'select' })`
  cursor: pointer;
`;
const FileInputLabel = styled(Label)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.85rem 1rem;
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 6px;
  cursor: pointer;
  
  &:hover {
    background: ${({ theme }) => theme.body};
  }
  
  input[type="file"] {
    display: none;
  }
`;
const SubmitButton = styled.button`
  display: block;
  width: 100%;
  padding: 0.85rem 1.75rem;
  background-color: ${({ theme }) => theme.buttonBg};
  color: ${({ theme }) => theme.buttonText};
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  
  &:hover {
    background-color: ${({ theme }) => theme.buttonHover};
  }
`;
const SuccessMessage = styled(motion.div)`
  text-align: center;
  padding: 2rem;
  background: ${({ theme }) => theme.card};
  border: 1px solid #28a745;
  border-radius: 12px;
  
  svg {
    font-size: 3rem;
    color: #28a745;
    margin-bottom: 1rem;
  }
  
  h3 {
    font-size: 1.5rem;
    color: #28a745;
    margin-bottom: 0.5rem;
  }
  
  p {
    font-size: 1rem;
    color: ${({ theme }) => (theme.text === '#212529' ? '#495057' : '#adb5bd')};
    margin-bottom: 1.5rem;
  }
`;
const NewRequestButton = styled(SubmitButton)`
  width: auto;
  background: transparent;
  color: ${({ theme }) => theme.buttonBg};
  border: 2px solid ${({ theme }) => theme.buttonBg};
  
  &:hover {
    background: ${({ theme }) => theme.buttonBg}20;
    color: ${({ theme }) => theme.buttonBg};
  }
`;

// --- [MODIFIED] Update pageVariants and add exit prop ---
const pageVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut', staggerChildren: 0.1 } },
  exit: { opacity: 0, y: -15, transition: { duration: 0.2, ease: 'easeIn' } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

// --- ANIMATION VARIANTS (Unchanged) ---
const slideVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] } },
  exit: { opacity: 0, x: -50, transition: { duration: 0.4, ease: 'easeIn' } }
};
const slideContentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.5 } }
};
const formVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
};

// --- (Unchanged Data and Components) ---
const heroSlides = [
  { 
    title: "Have an Idea?", 
    subtitle: "We provide the expert guidance and student talent to turn your concepts into reality.",
    img: "https://images.unsplash.com/photo-1542744095-291d1f67b221?auto=format&fit=crop&q=80&w=1200"
  },
  { 
    title: "Need a Project Built?", 
    subtitle: "Submit your requirements and let our curated teams of skilled students build it for you.",
    img: "https://images.unsplash.com/photo-1516321497487-e28a62560340?auto=format&fit=crop&q=80&w=1200"
  },
  { 
    title: "Foster Innovation", 
    subtitle: "Partner with us to mentor the next generation of tech leaders while getting your projects built.",
    img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200"
  }
];

const GuidanceForm = () => (
  <motion.div variants={formVariants} initial="hidden" animate="visible" exit="exit">
    <FormGroup>
      <Label htmlFor="g_name">Full Name</Label>
      <Input type="text" id="g_name" name="name" required />
    </FormGroup>
    <FormGroup>
      <Label htmlFor="g_email">Email Address</Label>
      <Input type="email" id="g_email" name="email" required />
    </FormGroup>
    <FormGroup>
      <Label htmlFor="g_projectIdea">Project Idea/Concept</Label>
      <Textarea id="g_projectIdea" name="projectIdea" placeholder="Briefly describe your project idea..." required />
    </FormGroup>
    <FormGroup>
      <Label htmlFor="g_help">What kind of guidance do you need?</Label>
      <Select id="g_help" name="help_type">
        <option>Technical Mentorship</option>
        <option>Project Planning & Roadmap</option>
        <option>Finding Teammates</option>
        <option>Other</option>
      </Select>
    </FormGroup>
    <SubmitButton type="submit">Request Guidance</SubmitButton>
  </motion.div>
);

const FullProjectForm = () => (
  <motion.div variants={formVariants} initial="hidden" animate="visible" exit="exit">
    <FormGroup>
      <Label htmlFor="f_name">Full Name / Company Name</Label>
      <Input type="text" id="f_name" name="name" required />
    </FormGroup>
    <FormGroup>
      <Label htmlFor="f_email">Contact Email</Label>
      <Input type="email" id="f_email" name="email" required />
    </FormGroup>
    <FormGroup>
      <Label htmlFor="f_projectName">Project Name</Label>
      <Input type="text" id="f_projectName" name="projectName" required />
    </FormGroup>
    <FormGroup>
      <Label htmlFor="f_description">Project Description</Label>
      <Textarea id="f_description" name="description" placeholder="Describe the project goals, features, and requirements..." required />
    </FormGroup>
    <FormGroup>
      <Label>Relevant Documents</Label>
      <FileInputLabel>
        <HiOutlinePaperClip />
        <span>Upload (e.g., spec sheet, wireframes)</span>
        <input type="file" name="documents" />
      </FileInputLabel>
    </FormGroup>
    <FormGroup>
      <Label htmlFor="f_timeline">Ideal Timeline</Label>
      <Select id="f_timeline" name="timeline">
        <option>Flexible</option>
        <option>Under 1 Month</option>
        <option>1-3 Months</option>
        <option>3+ Months</option>
      </Select>
    </FormGroup>
    <SubmitButton type="submit">Submit Project Request</SubmitButton>
  </motion.div>
);


export default function ProjectRequest() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeTab, setActiveTab] = useState('guidance'); // 'guidance' or 'full'
  const [isSubmitted, setIsSubmitted] = useState(false);
  const location = useLocation();
  const formSectionRef = useRef(null);
  
  // Slide animation
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  
  // Check URL params for form type
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const formType = params.get('form');
    if (formType === 'full') {
      setActiveTab('full');
      // Scroll to form section
      setTimeout(() => {
        formSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else if (formType === 'guidance') {
      setActiveTab('guidance');
      setTimeout(() => {
        formSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [location]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Add real form submission logic here
    console.log("Form submitted for:", activeTab);
    setIsSubmitted(true);
  };
  
  return (
    <PageWrapper
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="exit" // <-- [NEW] Add exit prop
    >
      {/* --- HERO SLIDESHOW SECTION --- */}
      <Section variants={itemVariants} style={{ paddingBottom: 0, paddingTop: '4rem' }}>
        <Container>
          <HeroSlideshow>
            <AnimatePresence>
              <Slide
                key={activeSlide}
                style={{ backgroundImage: `url(${heroSlides[activeSlide].img})` }}
                variants={slideVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <SlideContent variants={slideContentVariants} initial="hidden" animate="visible">
                  <h3>{heroSlides[activeSlide].title}</h3>
                  <p>{heroSlides[activeSlide].subtitle}</p>
                </SlideContent>
              </Slide>
            </AnimatePresence>
          </HeroSlideshow>
        </Container>
      </Section>

      {/* --- TECH STACK SECTION --- */}
      <TechStack />

      {/* --- FORM SECTION (TABBED) --- */}
      <Section 
        id="form-section" 
        ref={formSectionRef} 
        $alt={true} 
        style={{ paddingTop: '6rem', paddingBottom: '6rem' }}
      >
        <Container>
          <SectionTitle>Submit Your Request</SectionTitle>
          <SectionSubtitle>
            Choose the path that best suits your needs. We're excited to see what you want to build.
          </SectionSubtitle>
          
          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <SuccessMessage
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <HiOutlineCheckCircle />
                <h3>Thank You!</h3>
                <p>Your request has been submitted. We will review it and get back to you shortly.</p>
                <NewRequestButton onClick={() => setIsSubmitted(false)}>
                  Submit Another Request
                </NewRequestButton>
              </SuccessMessage>
            ) : (
              <motion.div key="form">
                <TabContainer>
                  <TabButton $isActive={activeTab === 'guidance'} onClick={() => setActiveTab('guidance')}>
                    <HiOutlineLightBulb style={{marginRight: '0.5rem'}}/> Get Guidance
                  </TabButton>
                  <TabButton $isActive={activeTab === 'full'} onClick={() => setActiveTab('full')}>
                    <HiOutlinePaperAirplane style={{marginRight: '0.5rem'}}/> Request Full Project
                  </TabButton>
                </TabContainer>
                
                <FormWrapper as="form" onSubmit={handleFormSubmit}>
                  <AnimatePresence mode="wait">
                    {activeTab === 'guidance' ? (
                      <GuidanceForm key="guidance" />
                    ) : (
                      <FullProjectForm key="full" />
                    )}
                  </AnimatePresence>
                </FormWrapper>
              </motion.div>
            )}
          </AnimatePresence>
        </Container>
      </Section>

    </PageWrapper>
  );
}