// src/pages/Contact.jsx
import { useState } from 'react';
import styled from 'styled-components'; // <-- ADDED
import { motion } from 'framer-motion'; // <-- ADDED
import { HiOutlineUser, HiOutlineMail, HiOutlinePencilAlt } from 'react-icons/hi';

const Container = styled(motion.div)`
  max-width: 800px;
// ... (rest of the file is correct) ...
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
  
  svg {
    position: absolute;
    left: 1rem;
    top: 3.1rem;
    font-size: 1.25rem;
    color: ${({ theme }) => theme.text === '#212529' ? '#6c757d' : '#adb5bd'};
    transition: color 0.3s ease;
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
    
    + svg {
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
    
    + svg {
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

export default function Contact() {
  const [status, setStatus] = useState("Send Message");
  const contactFormUrl = `https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_CONTACT_ID}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");
    const form = e.target;
    const data = new FormData(form);

    try {
      const response = await fetch(contactFormUrl, {
        method: "POST",
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setStatus("Message Sent!");
        form.reset();
        setTimeout(() => setStatus("Send Message"), 3000);
      } else {
        setStatus("Error. Try Again.");
        setTimeout(() => setStatus("Send Message"), 3000);
      }
    } catch (error) {
      console.error("Form submission error:", error); // Fixed ESLint warning
      setStatus("Error. Try Again.");
      setTimeout(() => setStatus("Send Message"), 3000);
    }
  };

  return (
    <Container
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <Title variants={itemVariants}>Get in Touch</Title>
      <Subtitle variants={itemVariants}>
        Have a question or a project idea? Send us a message!
      </Subtitle>
      <Form 
        variants={itemVariants}
        action={contactFormUrl} 
        method="POST"
        onSubmit={handleSubmit}
      >
        <InputGroup>
          <label htmlFor="name">Name</label>
          <Input 
            type="text" 
            name="name" 
            id="name" 
            required 
            variants={itemVariants}
            whileFocus={{ scale: 1.02 }}
          />
          <HiOutlineUser />
        </InputGroup>
        
        <InputGroup>
          <label htmlFor="email">Email</label>
          <Input 
            type="email" 
            name="email" 
            id="email" 
            required 
            variants={itemVariants}
            whileFocus={{ scale: 1.02 }}
          />
          <HiOutlineMail />
        </InputGroup>

        <InputGroup>
          <label htmlFor="message">Message</label>
          <TextArea 
            name="message" 
            id="message" 
            required 
            variants={itemVariants}
            whileFocus={{ scale: 1.02 }}
          />
          <HiOutlinePencilAlt style={{ top: '3.1rem' }} />
        </InputGroup>

        <SubmitButton 
          type="submit"
          variants={itemVariants}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          disabled={status === "Sending..." || status === "Message Sent!"}
        >
          {status}
        </SubmitButton>
      </Form>
    </Container>
  );
}

