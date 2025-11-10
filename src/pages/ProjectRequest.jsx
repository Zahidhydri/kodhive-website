// src/pages/ProjectRequest.jsx
import { useState, useEffect, useRef } from 'react'; // Added useRef
import { useSearchParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HiOutlinePaperAirplane, 
  HiOutlineChevronDown,
  HiOutlineCurrencyRupee,
  HiOutlineDocumentText,
  HiOutlineCheckCircle,
  HiOutlineUser,
  HiOutlineMail,
  HiOutlineLightBulb,
  HiOutlinePencilAlt,
  HiOutlineArrowLeft,
  HiOutlinePhone, 
  HiOutlineQuestionMarkCircle,
  HiOutlineOfficeBuilding, 
  HiOutlineExclamationCircle 
} from 'react-icons/hi';
import TechStack from '../components/TechStack'; 

// --- Swiper Imports ---
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';

// --- Data for Hero Slideshow ---
const projectHeroSlides = [
  {
    title: "Custom Web & Mobile Apps",
    subtitle: "Have a clear vision? We'll build your full-stack application, from UI to database.",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=1200"
  },
  {
    title: "Branding & UI/UX Design",
    subtitle: "Logos, posters, and high-fidelity prototypes designed in Figma and Adobe Express.",
    image: "https://images.unsplash.com/photo-1581291518857-4e275087a113?auto=format&fit=crop&q=80&w=1200"
  },
  {
    title: "Video & Photo Editing",
    subtitle: "Engaging content for social media, YouTube, and portfolios using Clipchamp and more.",
    image: "https://images.unsplash.com/photo-1631003881485-a787a2c71286?auto=format&fit=crop&q=80&w=1200"
  },
  {
    title: "Just Have an Idea?",
    subtitle: "Not sure where to start? Our 'Idea Guidance' form is perfect for you.",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200"
  }
];


// --- STYLED COMPONENTS ---

const PageWrapper = styled(motion.div)`
  width: 100%;
`;

const Container = styled(motion.div)`
  max-width: 900px;
  margin: 0 auto;
  padding: 4rem 1.5rem 6rem 1.5rem;
`;

// --- Back Button Style ---
const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  margin-bottom: 1.5rem; /* Space below the button */
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.body};
    border-color: ${({ theme }) => theme.buttonBg};
  }
`;

const Section = styled(motion.section)`
  padding: 4rem 1.5rem;
  overflow: hidden;

  ${props => props.$alt && `
    background: ${props.theme.card};
    border-top: 1px solid ${props.theme.border};
    border-bottom: 1px solid ${props.theme.border};
  `}
  
  &:first-of-type {
    padding-top: 4rem;
    padding-bottom: 4rem;
  }
`;

// --- Hero Slideshow Styles ---
const HeroSlideshowContainer = styled.div`
  width: 100%;
  height: 40vh;
  min-height: 320px; /* Increased min-height for buttons */
  max-height: 400px; /* Increased max-height */
  border-radius: 16px;
  overflow: hidden;
  background: ${({ theme }) => theme.card};
  position: relative;

  .swiper { width: 100%; height: 100%; }
  .swiper-pagination-bullet { background: white; opacity: 0.7; }
  .swiper-pagination-bullet-active { opacity: 1; background: ${({ theme }) => theme.buttonBg}; }
`;

const HeroSlide = styled.div`
  width: 100%; height: 100%;
  background-size: cover; background-position: center;
  position: relative;
  &::before {
    content: ''; position: absolute; inset: 0;
    /* Darker gradient to make text & buttons stand out */
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.2) 100%);
  }
`;

const HeroContent = styled(motion.div)`
  position: absolute; 
  bottom: 10%; 
  left: 5%;
  right: 5%; /* Allow content to use width */
  color: white; 
  padding: 0 1.5rem; 
  max-width: 600px;
  
  @media (min-width: 768px) { 
    padding: 0 2.5rem; 
    left: 5%;
    right: auto; /* Reset right on desktop */
  }
`;

const HeroTitle = styled.h2`
  font-size: 1.75rem; font-weight: 700; margin: 0 0 0.5rem 0;
  @media (min-width: 768px) { font-size: 2.25rem; }
`;

const HeroSubtitle = styled.p`
  font-size: 1rem; opacity: 0.9; line-height: 1.5;
  margin-bottom: 1.5rem; /* Added margin for button spacing */
  @media (min-width: 768px) { font-size: 1.1rem; }
`;

// --- [NEW] Hero Buttons ---
const HeroButtonContainer = styled(motion.div)`
  display: flex;
  flex-direction: column; /* Stack on mobile */
  gap: 0.75rem;

  @media (min-width: 600px) {
    flex-direction: row; /* Side-by-side on tablet+ */
  }
`;

const HeroButton = styled(motion.button)`
  padding: 0.75rem 1.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  border-radius: 8px;
  border: 2px solid;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  /* Primary Button Style */
  ${props => props.$primary && `
    background: ${props.theme.buttonBg};
    border-color: ${props.theme.buttonBg};
    color: ${props.theme.buttonText};

    &:hover {
      background: ${props.theme.buttonHover};
      border-color: ${props.theme.buttonHover};
    }
  `}

  /* Secondary Button Style */
  ${props => !props.$primary && `
    background: transparent;
    border-color: #ffffff;
    color: #ffffff;

    &:hover {
      background: rgba(255, 255, 255, 0.15);
    }
  `}
`;
// --- End Hero Slideshow Styles ---


// --- [NEW] Important Note Style ---
const ImportantNote = styled.div`
  background: ${({ theme }) => theme.buttonBg}1A;
  border: 1px solid ${({ theme }) => theme.buttonBg};
  color: ${({ theme }) => theme.text};
  border-radius: 8px;
  padding: 1rem 1.5rem;
  font-size: 0.95rem;
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-top: 1.5rem;
  
  svg {
    flex-shrink: 0;
    color: ${({ theme }) => theme.buttonBg};
    font-size: 1.5rem;
  }
`;

// --- [NEW] SectionTitle & Subtitle for Form Section ---
const FormSectionHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const FormSectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
  margin-bottom: 1rem;
`;

const FormSectionSubtitle = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.text === '#212529' ? '#495057' : '#adb5bd'};
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

// --- [CHANGED] Simple Tab Switcher ---
const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap; /* Allow wrapping on small screens */
  gap: 1rem;
  margin-top: 2.5rem; // Space between subtitle and tabs
  margin-bottom: 3.5rem; // Space between tabs and form
`;

const TabButton = styled(motion.button)`
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 8px;
  border: 2px solid ${({ theme, $isActive }) => $isActive ? theme.buttonBg : theme.border};
  background: ${({ theme, $isActive }) => $isActive ? theme.buttonBg : 'transparent'};
  color: ${({ theme, $isActive }) => $isActive ? theme.buttonText : theme.text};
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: ${({ theme, $isActive }) => !$isActive && theme.body};
    border-color: ${({ theme }) => theme.buttonBg};
  }
`;

const FormContainer = styled(motion.div)`
  /* This component now just handles the animation */
  background: ${({ theme }) => theme.body};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 8px 30px rgba(0,0,0,0.07);

  @media (max-width: 600px) {
    padding: 1.5rem;
  }
`;

// --- FORM STYLES (Shared) ---
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`;

const FormStepTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid ${({ theme }) => theme.border};
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

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

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

const Select = styled(motion.select)`
  padding: 0.85rem 1rem;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  background: ${({ theme }) => theme.card}; 
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  appearance: none;
  width: 100%;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.buttonBg};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.buttonBg}33;
  }
`;

const TextArea = styled(motion.textarea)`
  background: ${({ theme }) => theme.card}; 
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 12px;
  padding: 1.5rem;
  color: ${({ theme }) => theme.text};
  font-size: 1.1rem;
  min-height: 250px;
  resize: vertical;
  font-family: 'monospace', 'Courier New', Courier;
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

const SimpleTextArea = styled(TextArea)`
  min-height: 180px;
  font-family: inherit;
  font-size: 1rem;
  line-height: 1.6;
`;

const SelectWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  svg.input-icon {
    position: absolute;
    left: 1rem;
    font-size: 1.25rem;
    color: ${({ theme }) => theme.text === '#212529' ? '#6c757d' : '#868e96'};
    pointer-events: none;
  }

  svg.select-arrow {
    position: absolute;
    right: 1rem;
    font-size: 1.25rem;
    color: ${({ theme }) => theme.text === '#212529' ? '#6c757d' : '#868e96'};
    pointer-events: none;
  }

  ${Select}, ${Input} {
    padding-left: 3rem;
  }
`;

const OptionsGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const HiddenInput = styled.input`
  opacity: 0;
  position: absolute;
  width: 0;
  height: 0;
`;

const StyledLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.85rem 1.25rem;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.card}; 
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;

  svg {
    font-size: 1.25rem;
    flex-shrink: 0;
    color: ${({ theme }) => theme.text === '#212529' ? '#6c757d' : '#868e96'};
    transition: all 0.3s ease;
  }

  ${HiddenInput}:checked + & {
    border-color: ${({ theme }) => theme.buttonBg};
    background: ${({ theme }) => theme.buttonBg}11;
    color: ${({ theme }) => theme.buttonBg};
    font-weight: 600;

    svg {
      color: ${({ theme }) => theme.buttonBg};
    }
  }

  ${HiddenInput}:focus + & {
    box-shadow: 0 0 0 3px ${({ theme }) => theme.buttonBg}33;
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
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin: 1rem auto 0 auto;
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

// --- Animation Variants ---
const pageVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, duration: 0.4 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const formAnimVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -15, transition: { duration: 0.2 } }
};

// --- Form Components (FullProjectForm, GuidanceForm) ---

const FullProjectForm = () => {
  const [status, setStatus] = useState("Submit Full Request");
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
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        setStatus("Request Sent!");
        form.reset();
        setTimeout(() => setStatus("Submit Full Request"), 3000);
      } else {
        setStatus("Error. Try Again.");
        setTimeout(() => setStatus("Submit Full Request"), 3000);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus("Error. Try Again.");
      setTimeout(() => setStatus("Submit Full Request"), 3000);
    }
  };

  return (
    <FormContainer
      key="full-form"
      variants={formAnimVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <Form 
        action={projectFormUrl} 
        method="POST"
        onSubmit={handleSubmit}
      >
        {/* --- SECTION 1: CORE DETAILS --- */}
        <div>
          <FormStepTitle>Step 1: The Basics</FormStepTitle>
          <InfoGrid>
            <InputGroup>
              <label htmlFor="name-full">Your Name</label>
              <SelectWrapper>
                <HiOutlineUser className="input-icon" />
                <Input type="text" name="name" id="name-full" required placeholder="e.g., Adrien Rabiot" />
              </SelectWrapper>
            </InputGroup>
            <InputGroup>
              <label htmlFor="org-full">College / Organisation Name</label>
              <SelectWrapper>
                <HiOutlineOfficeBuilding className="input-icon" />
                <Input type="text" name="organization" id="org-full" placeholder="e.g., Kodhive or XYZ College" />
              </SelectWrapper>
            </InputGroup>
            <InputGroup>
              <label htmlFor="email-full">Your Email</label>
              <SelectWrapper>
                <HiOutlineMail className="input-icon" />
                <Input type="email" name="email" id="email-full" required placeholder="e.g., Adrien@example.com" />
              </SelectWrapper>
            </InputGroup>
            <InputGroup>
              <label htmlFor="phone-full">Phone Number (Optional)</label>
              <SelectWrapper>
                <HiOutlinePhone className="input-icon" />
                <Input type="tel" name="phone" id="phone-full" placeholder="e.g., +91 98765 43210" />
              </SelectWrapper>
            </InputGroup>
          </InfoGrid>
        </div>

        {/* --- SECTION 2: PROJECT SCOPE --- */}
        <div>
          <FormStepTitle>Step 2: Project Scope</FormStepTitle>
          <InfoGrid>
            <InputGroup>
              <label htmlFor="projectType-full">Project Type</label>
              <SelectWrapper>
                <HiOutlinePencilAlt className="input-icon" />
                <Select name="projectType" id="projectType-full">
                  <option value="Website">Website</option>
                  <option value="Mobile App">Mobile App</option>
                  <option value="Logo / Graphic Design">Logo / Graphic Design</option>
                  <option value="Photo/Video Editing">Photo/Video Editing</option>
                  <option value="Other">Other</option>
                </Select>
                <HiOutlineChevronDown className="select-arrow" />
              </SelectWrapper>
            </InputGroup>
            
            <InputGroup>
              <label htmlFor="priceRange-full">Budget (Est. INR)</label>
              <SelectWrapper>
                <HiOutlineCurrencyRupee className="input-icon" />
                {/* --- [UPDATED] Price Range --- */}
                <Select name="priceRange" id="priceRange-full">
                  <option value="Below ₹10,000">Below ₹10,000</option>
                  <option value="₹10,000 - ₹15,000">₹10,000 - ₹15,000</option>
                  <option value="₹15,000 - ₹50,000">₹15,000 - ₹50,000</option>
                  <option value="₹50,000 - ₹1,00,000">₹50,000 - ₹1,00,000</option>
                  <option value="₹1,00,000 - ₹2,50,000">₹1,00,000 - ₹2,50,000</option>
                  <option value="₹2,50,000+">₹2,50,000+</option>
                </Select>
                <HiOutlineChevronDown className="select-arrow" />
              </SelectWrapper>
            </InputGroup>
          </InfoGrid>
        </div>

        {/* --- SECTION 3: YOUR IDEA --- */}
        <div>
          <FormStepTitle>Step 3: Your Idea</FormStepTitle>
          <InputGroup>
            <label htmlFor="requirements-full">What do you want to build or create?</label>
            <TextArea 
              name="requirements" 
              id="requirements-full" 
              placeholder="e.g., 'Build a responsive 5-page landing site...' or 'Design a modern, minimalist logo...' or 'Edit a 10-minute vlog for YouTube...'" 
              required 
            />
          </InputGroup>
        </div>

        {/* --- SECTION 4: EXTRAS --- */}
        <div>
          <FormStepTitle>Step 4: Additional Details</FormStepTitle>
          <InfoGrid>
            <InputGroup>
              <label>Do you need documentation?</label>
              <OptionsGroup>
                <HiddenInput type="radio" name="documentation" id="doc-yes" value="Yes" />
                <StyledLabel htmlFor="doc-yes"><HiOutlineCheckCircle /> Yes, I need technical docs.</StyledLabel>
                
                <HiddenInput type="radio" name="documentation" id="doc-no" value="No" defaultChecked />
                <StyledLabel htmlFor="doc-no"><HiOutlineCheckCircle /> No, just the final product.</StyledLabel>
              </OptionsGroup>
            </InputGroup>

            <InputGroup>
              <label>Do you have existing assets?</label>
              <OptionsGroup>
                <HiddenInput type="checkbox" name="assets" id="asset-design" value="Design/Mockup" />
                <StyledLabel htmlFor="asset-design"><HiOutlineCheckCircle /> I have a design/mockup</StyledLabel>
                
                <HiddenInput type="checkbox" name="assets" id="asset-brand" value="Brand Guide/Logo" />
                <StyledLabel htmlFor="asset-brand"><HiOutlineCheckCircle /> I have a brand guide/logo</StyledLabel>

                <HiddenInput type="checkbox" name="assets" id="asset-code" value="Existing Code" />
                <StyledLabel htmlFor="asset-code"><HiOutlineCheckCircle /> I have existing code</StyledLabel>
              </OptionsGroup>
            </InputGroup>
          </InfoGrid>
        </div>
        
        {/* --- [NEW] Important Note --- */}
        <ImportantNote>
          <HiOutlineExclamationCircle />
          <span>Important Note: Documentation and/or presentation services will incur extra costs, which will be determined based on the project's complexity and scope.</span>
        </ImportantNote>

        {/* --- SUBMIT --- */}
        <SubmitButton 
          type="submit"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          disabled={status.includes("Submitting...") || status.includes("Sent!")}
        >
          {status.includes("Submitting...") ? "Submitting..." : (
            <>
              {status} <HiOutlinePaperAirplane style={{ transform: 'rotate(45deg)' }} />
            </>
          )}
        </SubmitButton>
      </Form>
    </FormContainer>
  );
};

const GuidanceForm = () => {
  const [status, setStatus] = useState("Submit Idea");
  const contactFormUrl = `https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_CONTACT_ID}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Submitting...");
    const form = e.target;
    const data = new FormData(form);

    try {
      const response = await fetch(contactFormUrl, {
        method: "POST",
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        setStatus("Idea Sent!");
        form.reset();
        setTimeout(() => setStatus("Submit Idea"), 3000);
      } else {
        setStatus("Error. Try Again.");
        setTimeout(() => setStatus("Submit Idea"), 3000);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus("Error. Try Again.");
      setTimeout(() => setStatus("Submit Idea"), 3000);
    }
  };

  return (
    <FormContainer
      key="guidance-form"
      variants={formAnimVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <Form 
        action={contactFormUrl} 
        method="POST"
        onSubmit={handleSubmit}
      >
        {/* --- SECTION 1: CORE DETAILS --- */}
        <div>
          <FormStepTitle>Step 1: Get In Touch</FormStepTitle>
          <InfoGrid>
            <InputGroup>
              <label htmlFor="name-guide">Your Name</label>
              <SelectWrapper>
                <HiOutlineUser className="input-icon" />
                <Input type="text" name="name" id="name-guide" required placeholder="e.g., Alex Johnson" />
              </SelectWrapper>
            </InputGroup>
            <InputGroup>
              <label htmlFor="org-guide">College / Organisation Name</label>
              <SelectWrapper>
                <HiOutlineOfficeBuilding className="input-icon" />
                <Input type="text" name="organization" id="org-guide" placeholder="e.g., Kodhive or XYZ College" />
              </SelectWrapper>
            </InputGroup>
            <InputGroup>
              <label htmlFor="email-guide">Your Email</label>
              <SelectWrapper>
                <HiOutlineMail className="input-icon" />
                <Input type="email" name="email" id="email-guide" required placeholder="e.g., alex@example.com" />
              </SelectWrapper>
            </InputGroup>
            <InputGroup>
              <label htmlFor="phone-guide">Phone Number (Optional)</label>
              <SelectWrapper>
                <HiOutlinePhone className="input-icon" />
                <Input type="tel" name="phone" id="phone-guide" placeholder="e.g., +91 98765 43210" />
              </SelectWrapper>
            </InputGroup>
          </InfoGrid>
        </div>
        
        {/* --- [NEW] Enhanced Idea Section --- */}
        <div>
          <FormStepTitle>Step 2: Your Idea</FormStepTitle>
          <InfoGrid>
            <InputGroup>
              <label htmlFor="projectType-guide">Project Type (if known)</label>
              <SelectWrapper>
                <HiOutlinePencilAlt className="input-icon" />
                <Select name="projectType" id="projectType-guide">
                  <option value="Unsure">I'm not sure</option>
                  <option value="Website">Website</option>
                  <option value="Mobile App">Mobile App</option>
                  <option value="Logo / Graphic Design">Logo / Graphic Design</option>
                  <option value="Photo/Video Editing">Photo/Video Editing</option>
                  <option value="Other">Other</option>
                </Select>
                <HiOutlineChevronDown className="select-arrow" />
              </SelectWrapper>
            </InputGroup>
            
            <InputGroup>
              <label htmlFor="main-question">What is your main question?</label>
              <SelectWrapper>
                <HiOutlineQuestionMarkCircle className="input-icon" />
                <Input type="text" name="main_question" id="main-question" placeholder="e.g., 'How much would this cost?'" />
              </SelectWrapper>
            </InputGroup>
          </InfoGrid>
        </div>

        {/* --- SECTION 3: YOUR IDEA DESCRIPTION --- */}
        <div>
          <FormStepTitle>Step 3: Describe Your Idea</FormStepTitle>
          <InputGroup>
            <label htmlFor="idea-guide">Describe your idea or challenge</label>
            <SimpleTextArea 
              name="message" 
              id="idea-guide" 
              placeholder="e.g., 'I have an idea for a mobile app to help local musicians, but I'm not sure where to start...' or 'I want to build a website, but I don't know what technology to use...'" 
              required 
            />
          </InputGroup>
        </div>

        {/* --- SUBMIT --- */}
        <SubmitButton 
          type="submit"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          disabled={status.includes("Submitting...") || status.includes("Sent!")}
        >
          {status.includes("Submitting...") ? "Submitting..." : (
            <>
              {status} <HiOutlineLightBulb />
            </>
          )}
        </SubmitButton>
      </Form>
    </FormContainer>
  );
};


// --- MAIN PAGE COMPONENT ---

export default function ProjectRequest() {
  const [searchParams, setSearchParams] = useSearchParams();
  const formType = searchParams.get('form');
  
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState(formType === 'guidance' ? 'guidance' : 'full');

  // --- [NEW] Ref for the form section ---
  const formSectionRef = useRef(null);

  useEffect(() => {
    // Set tab based on URL param
    const newTab = formType === 'guidance' ? 'guidance' : 'full';
    setActiveTab(newTab);
  }, [formType]);
  
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    // Update URL param without reloading page
    setSearchParams({ form: tabName });
  };

  // --- [NEW] Scroll handler function ---
  const scrollToForm = (tabName) => {
    // Set the active tab
    handleTabClick(tabName);
    
    // Scroll to the form section
    formSectionRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start' // Aligns to the top of the section
    });
  };


  return (
    <PageWrapper
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      {/* --- HERO SLIDESHOW SECTION --- */}
      <Section variants={itemVariants} style={{ paddingBottom: 0, paddingTop: '4rem' }}>
        <Container style={{ paddingBottom: 0, paddingTop: 0, maxWidth: '1000px' }}>
          <BackButton onClick={() => navigate(-1)}>
            <HiOutlineArrowLeft />
            Go Back
          </BackButton>
        
          <HeroSlideshowContainer>
            <Swiper
              modules={[Pagination, Autoplay, EffectFade]}
              pagination={{ clickable: true }}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              effect="fade"
              fadeEffect={{ crossFade: true }}
              loop={true}
            >
              {projectHeroSlides.map((slide, index) => (
                <SwiperSlide key={index}>
                  <HeroSlide style={{ backgroundImage: `url(${slide.image})` }}>
                    <HeroContent
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                    >
                      <HeroTitle>{slide.title}</HeroTitle>
                      <HeroSubtitle>{slide.subtitle}</HeroSubtitle>
                      
                      {/* --- [NEW] Buttons Added Here --- */}
                      <HeroButtonContainer>
                        <HeroButton
                          $primary
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => scrollToForm('full')}
                        >
                          <HiOutlinePencilAlt />
                          Custom Project Request
                        </HeroButton>
                        <HeroButton
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => scrollToForm('guidance')}
                        >
                          <HiOutlineLightBulb />
                          Idea Submission & Guidance
                        </HeroButton>
                      </HeroButtonContainer>

                    </HeroContent>
                  </HeroSlide>
                </SwiperSlide>
              ))}
            </Swiper>
          </HeroSlideshowContainer>
        </Container>
      </Section>

      {/* --- TECH STACK SECTION --- */}
      <TechStack />

      {/* --- FORM SECTION (TABBED) --- */}
      {/* --- [NEW] Added id and ref --- */}
      <Section 
        id="form-section" 
        ref={formSectionRef} 
        $alt={true} 
        style={{ paddingTop: '6rem', paddingBottom: '6rem' }}
      >
        <Container>
        
          {/* --- [NEW] Clearer Section Header --- */}
          <FormSectionHeader>
            <FormSectionTitle>Choose Your Path</FormSectionTitle>
            <FormSectionSubtitle>
              Select 'Custom Project' if you have a clear plan. 
              Choose 'Idea Guidance' if you're just starting and need help with your concept.
            </FormSectionSubtitle>
          </FormSectionHeader>
        
          {/* --- [NEW] Simple Tab Switcher --- */}
          <TabContainer>
            <TabButton
              $isActive={activeTab === 'full'}
              onClick={() => handleTabClick('full')}
              whileTap={{ scale: 0.95 }}
            >
              <HiOutlinePencilAlt />
              Custom Project Request
            </TabButton>
            <TabButton
              $isActive={activeTab === 'guidance'}
              onClick={() => handleTabClick('guidance')}
              whileTap={{ scale: 0.95 }}
            >
              <HiOutlineLightBulb />
              Idea Submission & Guidance
            </TabButton>
          </TabContainer>
        
          <AnimatePresence mode="wait">
            {activeTab === 'full' ? (
              <FullProjectForm />
            ) : (
              <GuidanceForm />
            )}
          </AnimatePresence>
        </Container>
      </Section>

    </PageWrapper>
  );
}