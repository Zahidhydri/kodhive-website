// src/pages/ProjectRequest.jsx
import { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  HiOutlinePaperAirplane, 
  HiOutlineLightBulb, 
  HiOutlineChevronDown 
} from 'react-icons/hi';

// --- STYLED COMPONENTS ---

// Container is wider, cleaner
const Container = styled(motion.div)`
  max-width: 900px; /* Wider for a more "tool" feel */
  margin: 0 auto;
  padding: 4rem 1.5rem 6rem 1.5rem;
`;

// Title is larger
const Title = styled(motion.h1)`
  font-size: 3.25rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
`;

// Subtitle is more direct, like Jules
const Subtitle = styled(motion.p)`
  font-size: 1.25rem;
  text-align: center;
  color: ${({ theme }) => theme.text === '#212529' ? '#495057' : '#adb5bd'};
  margin-bottom: 3.5rem;
`;

// Form no longer has a card background, it's part of the page
const Form = styled(motion.form)`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const InputGroup = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  
  label {
    font-weight: 600;
    margin-bottom: 0.75rem;
    font-size: 1rem;
    color: ${({ theme }) => theme.text};
  }
`;

// NEW: This is the main "Jules-style" prompt box
const PromptArea = styled(motion.textarea)`
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 12px;
  padding: 1.5rem;
  color: ${({ theme }) => theme.text};
  font-size: 1.1rem;
  min-height: 300px; /* Much larger */
  resize: vertical;
  font-family: 'monospace', 'Courier New', Courier; /* "Code" font */
  line-height: 1.7;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.buttonBg};
    box-shadow: 0 0 0 4px ${({ theme }) => theme.buttonBg}33;
  }
  
  &::placeholder {
    color: ${({ theme }) => theme.text === '#212529' ? '#6c757d' : '#868e96'};
  }
`;

// NEW: Side-by-side grid for secondary info (Name, Email)
const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

// NEW: Minimalist text input
const Input = styled(motion.input)`
  width: 100%;
  padding: 0.85rem 1rem;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  background: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.buttonBg};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.buttonBg}33;
  }
`;

// NEW: Minimalist select
const Select = styled(motion.select)`
  padding: 0.85rem 1rem;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  background: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  appearance: none; /* Remove default browser arrow */
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.buttonBg};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.buttonBg}33;
  }
`;

// Wrapper for the select dropdown icon
const SelectWrapper = styled.div`
  position: relative;
  
  svg.select-arrow {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1.25rem;
    color: ${({ theme }) => theme.text === '#212529' ? '#6c757d' : '#adb5bd'};
    pointer-events: none; /* Make icon unclickable */
  }
`;

const SubmitButton = styled(motion.button)`
  padding: 1rem 2rem;
  background-color: ${({ theme }) => theme.buttonBg};
  color: ${({ theme }) => theme.buttonText};
  border-radius: 8px;
  border: none;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex; /* Centering */
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin: 1rem auto 0 auto; /* Center the button */
  width: 100%;
  max-width: 300px;
  
  svg {
    font-size: 1.25rem;
  }

  &:hover {
    background-color: ${({ theme }) => theme.buttonHover};
    transform: translateY(-3px);
    box-shadow: 0 8px 25px ${({ theme }) => theme.buttonBg}77;
  }

  &:disabled {
    background-color: ${({ theme }) => theme.border};
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

// Animation Variants
const pageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1, duration: 0.5 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

// --- COMPONENT ---

export default function ProjectRequest() {
  const [status, setStatus] = useState("Submit Request");
  const projectFormUrl = `https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_PROJECT_ID}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Submitting...");
    const form = e.target;
    const data = new FormData(form);

    try {
      const response = await fetch(projectFormUrl, {
        method: "POST",
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setStatus("Request Sent!");
        form.reset();
        setTimeout(() => setStatus("Submit Request"), 3000);
      } else {
        setStatus("Error. Try Again.");
        setTimeout(() => setStatus("Submit Request"), 3000);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus("Error. Try Again.");
      setTimeout(() => setStatus("Submit Request"), 3000);
    }
  };

  return (
    <Container
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <Title variants={itemVariants}>Give our team a task</Title>
      <Subtitle variants={itemVariants}>
        Describe your project below. Our team of vetted students will review the
        request and build a plan.
      </Subtitle>
      
      <Form 
        variants={itemVariants}
        action={projectFormUrl} 
        method="POST"
        onSubmit={handleSubmit}
      >
        {/* THIS IS THE MAIN PROMPT */}
        <InputGroup>
          <label htmlFor="requirements">What do you want to build?</label>
          <PromptArea 
            name="requirements" 
            id="requirements" 
            placeholder="e.g., 'Build a responsive landing page for my new SAAS product...' or 'Design a modern logo for my coffee shop...'" 
            required 
            variants={itemVariants}
          />
        </InputGroup>

        {/* This is the secondary info */}
        <InfoGrid>
          <InputGroup>
            <label htmlFor="projectType">Project Type</label>
            <SelectWrapper>
              <Select 
                name="projectType" 
                id="projectType"
                variants={itemVariants}
              >
                <option value="website">Website</option>
                <option value="logo">Logo / Graphic Design</option>
                <option value="mobile-app">Mobile App</option>
                <option value="other">Other</option>
              </Select>
              <HiOutlineChevronDown className="select-arrow" />
            </SelectWrapper>
          </InputGroup>

          <InputGroup>
            <label htmlFor="name">Your Name</label>
            <Input 
              type="text" 
              name="name" 
              id="name" 
              required 
              placeholder="e.g., Jane Doe"
              variants={itemVariants}
            />
          </InputGroup>
        </InfoGrid>

        <InputGroup>
          <label htmlFor="email">Your Email</label>
          <Input 
            type="email" 
            name="email" 
            id="email" 
            required 
            placeholder="So we can send you the plan"
            variants={itemVariants}
          />
        </InputGroup>

        {/* Submit button now has an icon */}
        <SubmitButton 
          type="submit"
          variants={itemVariants}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          disabled={status === "Submitting..." || status === "Request Sent!"}
        >
          {status === "Submitting..." ? "Submitting..." : (
            <>
              {status} <HiOutlinePaperAirplane style={{ transform: 'rotate(45deg)' }} />
            </>
          )}
        </SubmitButton>
      </Form>
    </Container>
  );
}