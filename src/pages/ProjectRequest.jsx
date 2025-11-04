// src/pages/ProjectRequest.jsx
import { useState } from 'react';
// ... existing code ...
import { HiOutlineUser, HiOutlineMail, HiOutlinePencilAlt, HiOutlineLightBulb, HiOutlineChevronDown } from 'react-icons/hi';


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
  
  /* Icon for Input */
// ... existing code ...
  svg.input-icon {
    position: absolute;
    left: 1rem;
// ... existing code ...
    color: ${({ theme }) => theme.text === '#212529' ? '#6c757d' : '#adb5bd'};
    transition: color 0.3s ease;
    pointer-events: none; /* Make icon unclickable */
  }

  /* Icon for Select */
// ... existing code ...
  svg.select-arrow {
    position: absolute;
    right: 1rem;
// ... existing code ...
    color: ${({ theme }) => theme.text === '#212529' ? '#6c757d' : '#adb5bd'};
    transition: color 0.3s ease;
    pointer-events: none; /* Make icon unclickable */
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
    
    + svg.input-icon {
      color: ${({ theme }) => theme.buttonBg};
    }
  }
`;

const Select = styled(motion.select)`
// ... existing code ...
  padding: 0.85rem 1rem 0.85rem 3rem; /* Add padding for icon */
  border: 1px solid ${({ theme }) => theme.border};
// ... existing code ...
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  appearance: none; /* Remove default browser arrow */
  
  &:focus {
// ... existing code ...
    outline: none;
    border-color: ${({ theme }) => theme.buttonBg};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.buttonBg}33;
    
    + svg.input-icon,
// ... existing code ...
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
    
    + svg.input-icon {
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

export default function ProjectRequest() {
// ... existing code ...
  const [status, setStatus] = useState("Submit Request");
  const projectFormUrl = `https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_PROJECT_ID}`;

  const handleSubmit = async (e) => {
// ... existing code ...
    setStatus("Submitting...");
    const form = e.target;
// ... existing code ...

    try {
      const response = await fetch(projectFormUrl, {
// ... existing code ...
        method: "POST",
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
// ... existing code ...
        setStatus("Request Sent!");
        form.reset();
        setTimeout(() => setStatus("Submit Request"), 3000);
      } else {
        setStatus("Error. Try Again.");
        setTimeout(() => setStatus("Submit Request"), 3000);
      }
    } catch (error) {
      console.error("Form submission error:", error); // <-- FIX HERE
      setStatus("Error. Try Again.");
      setTimeout(() => setStatus("Submit Request"), 3000);
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
      <Title variants={itemVariants}>Request a Project</Title>
// ... existing code ...
      <Subtitle variants={itemVariants}>
        Let our talented students build your idea. Fill out the form below.
      </Subtitle>
      <Form 
// ... existing code ...
        action={projectFormUrl} 
        method="POST"
        onSubmit={handleSubmit}
      >
        <InputGroup>
// ... existing code ...
          <label htmlFor="name">Your Name</label>
          <Input 
            type="text" 
// ... existing code ...
            whileFocus={{ scale: 1.02 }}
          />
          <HiOutlineUser className="input-icon" />
        </InputGroup>
        
        <InputGroup>
// ... existing code ...
          <label htmlFor="email">Your Email</label>
          <Input 
            type="email" 
// ... existing code ...
            whileFocus={{ scale: 1.02 }}
          />
          <HiOutlineMail className="input-icon" />
        </InputGroup>

        <InputGroup>
// ... existing code ...
          <label htmlFor="projectType">Project Type</label>
          <Select 
            name="projectType" 
// ... existing code ...
            whileFocus={{ scale: 1.02 }}
          >
            <option value="website">Website</option>
// ... existing code ...
            <option value="other">Other</option>
          </Select>
          <HiOutlineLightBulb className="input-icon" />
          <HiOutlineChevronDown className="select-arrow" />
        </InputGroup>

        <InputGroup>
// ... existing code ...
          <label htmlFor="requirements">Project Requirements</label>
          <TextArea 
            name="requirements" 
// ... existing code ...
            whileFocus={{ scale: 1.02 }}
          />
          <HiOutlinePencilAlt className="input-icon" style={{ top: '3.1rem' }} />
        </InputGroup>

        <SubmitButton 
// ... existing code ...
          type="submit"
          variants={itemVariants}
          whileHover={{ scale: 1.03 }}
// ... existing code ...
          disabled={status === "Submitting..." || status === "Request Sent!"}
        >
          {status}
        </SubmitButton>
      </Form>
    </Container>
  );
}
