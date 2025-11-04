// src/pages/ProjectRequest.jsx
import { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { HiOutlineUser, HiOutlineMail, HiOutlinePencilAlt, HiOutlineLightBulb, HiOutlineChevronDown } from 'react-icons/hi';


const Container = styled(motion.div)`
  max-width: 800px;
  margin: 0 auto;
  padding: 4rem 1.5rem;
`;

const Title = styled(motion.h1)`
  font-size: 2.75rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
`;

const Subtitle = styled(motion.p)`
  font-size: 1.15rem;
  text-align: center;
  color: ${({ theme }) => theme.text === '#212529' ? '#495057' : '#adb5bd'};
  margin-bottom: 3.5rem;
`;

const Form = styled(motion.form)`
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 12px;
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
`;

const InputGroup = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  
  label {
    font-weight: 600;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
  }
  
  /* Icon for Input */
  svg.input-icon {
    position: absolute;
    left: 1rem;
    top: 3.1rem;
    font-size: 1.25rem;
    color: ${({ theme }) => theme.text === '#212529' ? '#6c757d' : '#adb5bd'};
    transition: color 0.3s ease;
    pointer-events: none; /* Make icon unclickable */
  }

  /* Icon for Select */
  svg.select-arrow {
    position: absolute;
    right: 1rem;
    top: 3.1rem;
    font-size: 1.25rem;
    color: ${({ theme }) => theme.text === '#212529' ? '#6c757d' : '#adb5bd'};
    transition: color 0.3s ease;
    pointer-events: none; /* Make icon unclickable */
  }
`;

const Input = styled(motion.input)`
  padding: 0.85rem 1rem 0.85rem 3rem; /* Add padding for icon */
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  background: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.buttonBg};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.buttonBg}33;
    
    + svg.input-icon {
      color: ${({ theme }) => theme.buttonBg};
    }
  }
`;

const Select = styled(motion.select)`
  padding: 0.85rem 1rem 0.85rem 3rem; /* Add padding for icon */
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  background: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  appearance: none; /* Remove default browser arrow */
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.buttonBg};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.buttonBg}33;
    
    + svg.input-icon,
    + svg.input-icon + svg.select-arrow {
      color: ${({ theme }) => theme.buttonBg};
    }
  }
`;

const TextArea = styled(motion.textarea)`
  padding: 0.85rem 1rem 0.85rem 3rem; /* Add padding for icon */
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  background: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  min-height: 160px;
  resize: vertical;
  font-family: inherit;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.buttonBg};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.buttonBg}33;
    
    + svg.input-icon {
      color: ${({ theme }) => theme.buttonBg};
    }
  }
`;

const SubmitButton = styled(motion.button)`
  padding: 0.85rem 1.5rem;
  background-color: ${({ theme }) => theme.buttonBg};
  color: ${({ theme }) => theme.buttonText};
  border-radius: 8px;
  border: none;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.buttonHover};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.border};
    cursor: not-allowed;
  }
`;

// Animation Variants
const pageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

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
      <Title variants={itemVariants}>Request a Project</Title>
      <Subtitle variants={itemVariants}>
        Let our talented students build your idea. Fill out the form below.
      </Subtitle>
      <Form 
        variants={itemVariants}
        action={projectFormUrl} 
        method="POST"
        onSubmit={handleSubmit}
      >
        <InputGroup>
          <label htmlFor="name">Your Name</label>
          <Input 
            type="text" 
            name="name" 
            id="name" 
            required 
            variants={itemVariants}
            whileFocus={{ scale: 1.02 }}
          />
          <HiOutlineUser className="input-icon" />
        </InputGroup>
        
        <InputGroup>
          <label htmlFor="email">Your Email</label>
          <Input 
            type="email" 
            name="email" 
            id="email" 
            required 
            variants={itemVariants}
            whileFocus={{ scale: 1.02 }}
          />
          <HiOutlineMail className="input-icon" />
        </InputGroup>

        <InputGroup>
          <label htmlFor="projectType">Project Type</label>
          <Select 
            name="projectType" 
            id="projectType"
            variants={itemVariants}
            whileFocus={{ scale: 1.02 }}
          >
            <option value="website">Website</option>
            <option value="logo">Logo / Graphic Design</option>
            <option value="mobile-app">Mobile App</option>
            <option value="other">Other</option>
          </Select>
          <HiOutlineLightBulb className="input-icon" />
          <HiOutlineChevronDown className="select-arrow" />
        </InputGroup>

        <InputGroup>
          <label htmlFor="requirements">Project Requirements</label>
          <TextArea 
            name="requirements" 
            id="requirements" 
            placeholder="Describe your project, key features, and what you need..." 
            required 
            variants={itemVariants}
            whileFocus={{ scale: 1.02 }}
          />
          <HiOutlinePencilAlt className="input-icon" style={{ top: '3.1rem' }} />
        </InputGroup>

        <SubmitButton 
          type="submit"
          variants={itemVariants}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          disabled={status === "Submitting..." || status === "Request Sent!"}
        >
          {status}
        </SubmitButton>
      </Form>
    </Container>
  );
}

