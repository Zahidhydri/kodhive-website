import { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HiOutlineUser, 
  HiOutlineMail, 
  HiOutlinePencilAlt,
  HiOutlineCheckCircle
} from 'react-icons/hi';
import logo from '../assets/kodhive-logo.png'; // Import the logo

// --- Styled Components ---

const Container = styled(motion.div)`
  max-width: 800px;
  margin: 0 auto;
  padding: 4rem 1.5rem;
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const LogoImage = styled.img`
  height: 40px;
  width: 40px;
`;

const LogoText = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  background: linear-gradient(to right, ${({ theme }) => theme.buttonBg}, #6f42c1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
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

// --- NEW: Grid for Name/Email ---
const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.75rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

// --- NEW: Enhanced InputGroup ---
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
    top: 50%;
    transform: translateY(7px); /* Aligns with input */
    font-size: 1.25rem;
    color: ${({ theme }) => theme.text === '#212529' ? '#6c757d' : '#adb5bd'};
    transition: color 0.3s ease;
    z-index: 1; /* Ensure icon is above input */
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
    
    ~ svg { /* Use ~ (sibling) selector */
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
    
    ~ svg { /* Use ~ (sibling) selector */
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

// --- NEW: Success Message ---
const SuccessCard = styled(motion.div)`
  background: #28a7451a;
  border: 1px solid #28a745;
  border-radius: 12px;
  padding: 2.5rem;
  text-align: center;
  
  svg {
    font-size: 3rem;
    color: #28a745;
    margin-bottom: 1rem;
  }
  
  h3 {
    font-size: 1.75rem;
    color: ${({ theme }) => theme.text};
    margin: 0 0 0.5rem 0;
  }
  
  p {
    font-size: 1.1rem;
    color: ${({ theme }) => theme.text === '#212529' ? '#495057' : '#adb5bd'};
    margin: 0;
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

// --- Component ---

export default function Contact() {
  const [status, setStatus] = useState("Send Message");
  const [isSubmitted, setIsSubmitted] = useState(false); // NEW state
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
        setIsSubmitted(true); // <-- NEW: Trigger success UI
        form.reset();
      } else {
        setStatus("Error. Try Again.");
        setTimeout(() => setStatus("Send Message"), 3000);
      }
    } catch (error) {
      console.error("Form submission error:", error);
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
      <LogoWrapper>
        <LogoImage src={logo} alt="Kodhive Logo" />
        <LogoText>Kodhive</LogoText>
      </LogoWrapper>
      <Title variants={itemVariants}>Get in Touch</Title>
      <Subtitle variants={itemVariants}>
        Have a question or a project idea? We'd love to hear from you.
      </Subtitle>

      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <Form 
            key="form"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: -10 }}
            onSubmit={handleSubmit}
          >
            <InfoGrid>
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
            </InfoGrid>

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
              disabled={status === "Sending..."}
            >
              {status}
            </SubmitButton>
          </Form>
        ) : (
          <SuccessCard
            key="success"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <HiOutlineCheckCircle />
            <h3>Message Sent!</h3>
            <p>Thanks for reaching out. We'll get back to you soon.</p>
          </SuccessCard>
        )}
      </AnimatePresence>
    </Container>
  );
}