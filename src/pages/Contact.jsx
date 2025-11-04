// src/pages/Contact.jsx
import { useState } from 'react';
// ... existing code ...
import { HiOutlineUser, HiOutlineMail, HiOutlinePencilAlt } from 'react-icons/hi';

const Container = styled(motion.div)`
// ... existing code ...
  max-width: 800px;
  margin: 0 auto;
  padding: 4rem 1.5rem;
`;

const Title = styled(motion.h1)`
// ... existing code ...
  font-size: 2.75rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
`;

const Subtitle = styled(motion.p)`
// ... existing code ...
  font-size: 1.15rem;
  text-align: center;
  color: ${({ theme }) => theme.text === '#212529' ? '#495057' : '#adb5bd'};
  margin-bottom: 3.5rem;
`;

const Form = styled(motion.form)`
// ... existing code ...
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 12px;
// ... existing code ...
  gap: 1.75rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
`;

const InputGroup = styled.div`
// ... existing code ...
  position: relative;
  display: flex;
// ... existing code ...
  
  label {
    font-weight: 600;
// ... existing code ...
    font-size: 0.9rem;
  }
  
  svg {
// ... existing code ...
    position: absolute;
    left: 1rem;
    top: 3.1rem;
    font-size: 1.25rem;
    color: ${({ theme }) => theme.text === '#212529' ? '#6c757d' : '#adb5bd'};
    transition: color 0.3s ease;
  }
`;

const Input = styled(motion.input)`
// ... existing code ...
  padding: 0.85rem 1rem 0.85rem 3rem; /* Add padding for icon */
  border: 1px solid ${({ theme }) => theme.border};
// ... existing code ...
  font-size: 1rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  
  &:focus {
// ... existing code ...
    outline: none;
    border-color: ${({ theme }) => theme.buttonBg};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.buttonBg}33;
    
    + svg {
      color: ${({ theme }) => theme.buttonBg};
    }
  }
`;

const TextArea = styled(motion.textarea)`
// ... existing code ...
  padding: 0.85rem 1rem 0.85rem 3rem; /* Add padding for icon */
  border: 1px solid ${({ theme }) => theme.border};
// ... existing code ...
  font-family: inherit;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  
  &:focus {
// ... existing code ...
    outline: none;
    border-color: ${({ theme }) => theme.buttonBg};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.buttonBg}33;
    
    + svg {
      color: ${({ theme }) => theme.buttonBg};
    }
  }
`;

const SubmitButton = styled(motion.button)`
// ... existing code ...
  padding: 0.85rem 1.5rem;
  background-color: ${({ theme }) => theme.buttonBg};
// ... existing code ...
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
// ... existing code ...
    background-color: ${({ theme }) => theme.buttonHover};
  }
  
  &:disabled {
// ... existing code ...
    background-color: ${({ theme }) => theme.border};
    cursor: not-allowed;
  }
`;

// Animation Variants
const pageVariants = {
// ... existing code ...
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
// ... existing code ...
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

export default function Contact() {
// ... existing code ...
  const [status, setStatus] = useState("Send Message");
  const contactFormUrl = `https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_CONTACT_ID}`;

  const handleSubmit = async (e) => {
// ... existing code ...
    setStatus("Sending...");
    const form = e.target;
// ... existing code ...

    try {
      const response = await fetch(contactFormUrl, {
// ... existing code ...
        method: "POST",
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
// ... existing code ...
        setStatus("Message Sent!");
        form.reset();
        setTimeout(() => setStatus("Send Message"), 3000);
      } else {
        setStatus("Error. Try Again.");
        setTimeout(() => setStatus("Send Message"), 3000);
      }
    } catch (error) {
      console.error("Form submission error:", error); // <-- FIX HERE
      setStatus("Error. Try Again.");
      setTimeout(() => setStatus("Send Message"), 3000);
    }
  };

  return (
    <Container
// ... existing code ...
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <Title variants={itemVariants}>Get in Touch</Title>
// ... existing code ...
      <Subtitle variants={itemVariants}>
        Have a question or a project idea? Send us a message!
      </Subtitle>
      <Form 
        variants={itemVariants}
        action={contactFormUrl} 
// ... existing code ...
        onSubmit={handleSubmit}
      >
        <InputGroup>
// ... existing code ...
          <label htmlFor="name">Name</label>
          <Input 
            type="text" 
// ... existing code ...
            whileFocus={{ scale: 1.02 }}
          />
          <HiOutlineUser />
        </InputGroup>
        
        <InputGroup>
          <label htmlFor="email">Email</label>
          <Input 
// ... existing code ...
            whileFocus={{ scale: 1.02 }}
          />
          <HiOutlineMail />
        </InputGroup>

        <InputGroup>
// ... existing code ...
          <label htmlFor="message">Message</label>
          <TextArea 
            name="message" 
// ... existing code ...
            whileFocus={{ scale: 1.02 }}
          />
          <HiOutlinePencilAlt style={{ top: '3.1rem' }} />
        </InputGroup>

        <SubmitButton 
// ... existing code ...
          type="submit"
          variants={itemVariants}
          whileHover={{ scale: 1.03 }}
// ... existing code ...
          disabled={status === "Sending..." || status === "Message Sent!"}
        >
          {status}
        </SubmitButton>
      </Form>
    </Container>
  );
}
