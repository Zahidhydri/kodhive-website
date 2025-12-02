import { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HiOutlineUser, 
  HiOutlineMail, 
  HiOutlinePencilAlt,
  HiOutlineCheckCircle,
  HiOutlineLocationMarker,
  HiOutlinePhone
} from 'react-icons/hi';
// import logo from '../assets/kodhive-logo.png'; 

// --- Styled Components ---

const PageWrapper = styled(motion.div)`
  min-height: 100vh;
  background: ${({ theme }) => theme.body};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 1.5rem;
  position: relative;
  overflow: hidden;
  
  /* Subtle background gradient */
  &::before {
    content: '';
    position: absolute;
    top: -20%;
    right: -10%;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, ${({ theme }) => theme.buttonBg}11 0%, transparent 70%);
    border-radius: 50%;
    filter: blur(60px);
    z-index: 0;
  }
`;

const Container = styled(motion.div)`
  width: 100%;
  max-width: 1000px;
  display: grid;
  grid-template-columns: 1fr;
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 24px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  z-index: 1;

  @media (min-width: 900px) {
    grid-template-columns: 0.8fr 1.2fr;
  }
`;

const ContactInfoPanel = styled.div`
  background: linear-gradient(135deg, ${({ theme }) => theme.buttonBg}, #6f42c1);
  padding: 3rem;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    bottom: -50px;
    right: -50px;
    width: 200px;
    height: 200px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
  }
`;

const InfoHeader = styled.div`
  margin-bottom: 3rem;
`;

const InfoTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: white;
`;

const InfoText = styled.p`
  font-size: 1rem;
  opacity: 0.9;
  line-height: 1.6;
`;

const InfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  font-size: 1rem;
  
  svg {
    font-size: 1.5rem;
    opacity: 0.8;
    flex-shrink: 0;
    margin-top: 2px;
  }
`;

const FormPanel = styled.div`
  padding: 3rem;
  background: ${({ theme }) => theme.card};
`;

const FormHeader = styled.div`
  margin-bottom: 2rem;
`;

const FormTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
  margin-bottom: 0.5rem;
`;

const Form = styled(motion.form)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputGroup = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  
  label {
    font-weight: 600;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
    color: ${({ theme }) => theme.text};
  }
`;

const InputWrapper = styled.div`
  position: relative;
  
  svg {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1.2rem;
    color: ${({ theme }) => theme.text === '#212529' ? '#6c757d' : '#adb5bd'};
    transition: color 0.3s ease;
    pointer-events: none;
  }

  /* TextArea icon alignment */
  &.textarea-wrapper svg {
    top: 1.2rem; 
    transform: none;
  }
`;

const Input = styled(motion.input)`
  width: 100%;
  padding: 0.85rem 1rem 0.85rem 3rem;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  background: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.buttonBg};
    box-shadow: 0 0 0 4px ${({ theme }) => theme.buttonBg}22;
    background: ${({ theme }) => theme.card};
    
    + svg { 
      color: ${({ theme }) => theme.buttonBg};
    }
  }
`;

const TextArea = styled(motion.textarea)`
  width: 100%;
  padding: 0.85rem 1rem 0.85rem 3rem;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  background: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
  font-family: inherit;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.buttonBg};
    box-shadow: 0 0 0 4px ${({ theme }) => theme.buttonBg}22;
    background: ${({ theme }) => theme.card};
    
    + svg {
      color: ${({ theme }) => theme.buttonBg};
    }
  }
`;

const SubmitButton = styled(motion.button)`
  padding: 1rem 2rem;
  background: ${({ theme }) => theme.buttonBg};
  color: ${({ theme }) => theme.buttonText};
  border-radius: 8px;
  border: none;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  align-self: flex-start;
  box-shadow: 0 4px 15px ${({ theme }) => theme.buttonBg}44;
  
  &:hover {
    background: ${({ theme }) => theme.buttonHover};
    transform: translateY(-2px);
    box-shadow: 0 8px 20px ${({ theme }) => theme.buttonBg}66;
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
`;

const SuccessView = styled(motion.div)`
  text-align: center;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  
  svg {
    font-size: 4rem;
    color: #10B981;
    margin-bottom: 1.5rem;
  }
  
  h3 {
    font-size: 1.8rem;
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.text};
  }
  
  p {
    font-size: 1.1rem;
    color: ${({ theme }) => theme.text === '#212529' ? '#495057' : '#adb5bd'};
  }
`;

const Contact = () => {
  const [status, setStatus] = useState("Send Message");
  const [isSubmitted, setIsSubmitted] = useState(false);
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
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        setStatus("Message Sent!");
        setIsSubmitted(true);
        form.reset();
      } else {
        setStatus("Error. Try Again.");
        setTimeout(() => setStatus("Send Message"), 3000);
      }
    } catch (error) {
      console.error("Form error:", error);
      setStatus("Error. Try Again.");
      setTimeout(() => setStatus("Send Message"), 3000);
    }
  };

  return (
    <PageWrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Container
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Left Panel: Contact Info */}
        <ContactInfoPanel>
          <InfoHeader>
            <InfoTitle>Let's Talk</InfoTitle>
            <InfoText>
              Have a project in mind or just want to say hi? We'd love to hear from you.
            </InfoText>
          </InfoHeader>
          
          <InfoList>
            <InfoItem>
              <HiOutlineMail />
              <span>hello@skilltensor.com</span>
            </InfoItem>
            <InfoItem>
              <HiOutlinePhone />
              <span>+91 98765 43210</span>
            </InfoItem>
            <InfoItem>
              <HiOutlineLocationMarker />
              <span>Nagpur, Maharashtra, India</span>
            </InfoItem>
          </InfoList>
        </ContactInfoPanel>

        {/* Right Panel: Form */}
        <FormPanel>
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.div
                key="form-view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <FormHeader>
                  <FormTitle>Send us a Message</FormTitle>
                </FormHeader>

                <Form onSubmit={handleSubmit}>
                  <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
                    <InputGroup>
                      <label htmlFor="name">Name</label>
                      <InputWrapper>
                        <Input type="text" name="name" id="name" required placeholder="John Doe" />
                        <HiOutlineUser />
                      </InputWrapper>
                    </InputGroup>

                    <InputGroup>
                      <label htmlFor="email">Email</label>
                      <InputWrapper>
                        <Input type="email" name="email" id="email" required placeholder="john@example.com" />
                        <HiOutlineMail />
                      </InputWrapper>
                    </InputGroup>
                  </div>

                  <InputGroup>
                    <label htmlFor="message">Message</label>
                    <InputWrapper className="textarea-wrapper">
                      <TextArea name="message" id="message" required placeholder="Tell us about your project..." />
                      <HiOutlinePencilAlt />
                    </InputWrapper>
                  </InputGroup>

                  <SubmitButton 
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={status === "Sending..."}
                  >
                    {status}
                  </SubmitButton>
                </Form>
              </motion.div>
            ) : (
              <SuccessView
                key="success-view"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <HiOutlineCheckCircle />
                <h3>Message Sent!</h3>
                <p>Thank you for reaching out. We'll get back to you shortly.</p>
              </SuccessView>
            )}
          </AnimatePresence>
        </FormPanel>
      </Container>
    </PageWrapper>
  );
};

export default Contact;