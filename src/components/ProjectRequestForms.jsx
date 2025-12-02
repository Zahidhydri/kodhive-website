// src/components/ProjectRequestForms.jsx
import { useState, useEffect, forwardRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HiOutlinePaperAirplane, 
  HiOutlineCurrencyRupee,
  HiOutlineCheckCircle,
  HiOutlineUser,
  HiOutlineMail,
  HiOutlineLightBulb,
  HiOutlinePencilAlt,
  HiOutlinePhone, 
  HiOutlineQuestionMarkCircle,
  HiOutlineOfficeBuilding, 
  HiOutlineExclamationCircle,
  HiOutlineArrowLeft,
  HiOutlineArrowRight,
  HiOutlineDesktopComputer,
  HiOutlineDeviceMobile,
  HiOutlineColorSwatch,
  HiOutlineVideoCamera,
  HiOutlineDotsHorizontal
} from 'react-icons/hi';

// --- STYLED COMPONENTS ---

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

const Container = styled(motion.div)`
  max-width: 900px;
  margin: 0 auto;
`;

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

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 2.5rem;
  margin-bottom: 3.5rem;
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
  background: ${({ theme }) => theme.body};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 8px 30px rgba(0,0,0,0.07);

  @media (max-width: 600px) {
    padding: 1.5rem;
  }
`;

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
  
  /* Add asterisk for required fields */
  label.required::after {
    content: " *";
    color: #ef4444;
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
  border: 1px solid ${({ theme, $hasError }) => $hasError ? '#ef4444' : theme.border};
  border-radius: 8px;
  background: ${({ theme }) => theme.card}; 
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${({ theme, $hasError }) => $hasError ? '#ef4444' : theme.buttonBg};
    box-shadow: 0 0 0 3px ${({ theme, $hasError }) => $hasError ? '#ef444433' : theme.buttonBg + '33'};
  }
`;

const TextArea = styled(motion.textarea)`
  background: ${({ theme }) => theme.card}; 
  border: 1px solid ${({ theme, $hasError }) => $hasError ? '#ef4444' : theme.border};
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
    border-color: ${({ theme, $hasError }) => $hasError ? '#ef4444' : theme.buttonBg};
    box-shadow: 0 0 0 4px ${({ theme, $hasError }) => $hasError ? '#ef444433' : theme.buttonBg + '33'};
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

  ${Input} {
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
  margin: 0;
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

const StepIndicator = styled.div`
  font-size: 0.9rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text === '#212529' ? '#495057' : '#adb5bd'};
  margin-bottom: 2rem;
  text-align: center;
`;

const FormNavigation = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2.5rem;
`;

const NavButton = styled(motion.button)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background-color: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.body};
    border-color: ${({ theme }) => theme.text};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  ${props => props.$isNext && `
    background-color: ${props.theme.buttonBg};
    color: ${props.theme.buttonText};
    border-color: ${props.theme.buttonBg};
    
    &:hover {
      background-color: ${props.theme.buttonHover};
      border-color: ${props.theme.buttonHover};
    }
  `}
`;

const SelectionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const SelectionCard = styled(motion.div)`
  border: 2px solid ${({ theme, $selected }) => $selected ? theme.buttonBg : theme.border};
  background: ${({ theme, $selected }) => $selected ? `${theme.buttonBg}11` : theme.card};
  border-radius: 12px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: center;

  &:hover {
    border-color: ${({ theme }) => theme.buttonBg};
    background: ${({ theme }) => theme.card};
    transform: translateY(-2px);
  }

  svg {
    font-size: 2rem;
    color: ${({ theme, $selected }) => $selected ? theme.buttonBg : theme.text === '#212529' ? '#6c757d' : '#adb5bd'};
  }

  span {
    font-size: 0.9rem;
    font-weight: 600;
    color: ${({ theme, $selected }) => $selected ? theme.buttonBg : theme.text};
  }
`;

const PriceGrid = styled(SelectionGrid)`
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
`;

const ErrorMessage = styled(motion.div)`
  color: #ef4444;
  font-size: 0.9rem;
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  svg {
    font-size: 1.1rem;
  }
`;

// --- Animation Variants ---
const formAnimVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -15, transition: { duration: 0.2 } }
};

// --- Reusable Step Components ---

const StepContactInfo = ({ data, updateData, errors }) => (
  <motion.div variants={formAnimVariants} initial="hidden" animate="visible" exit="exit">
    <FormStepTitle>Step 1: The Basics</FormStepTitle>
    <InfoGrid>
      <InputGroup>
        <label htmlFor="name" className="required">Your Name</label>
        <SelectWrapper>
          <HiOutlineUser className="input-icon" />
          <Input 
            type="text" 
            name="name" 
            id="name" 
            required 
            placeholder="e.g., Adrien Rabiot" 
            value={data.name || ''}
            onChange={(e) => updateData('name', e.target.value)}
            $hasError={!!errors.name}
          />
        </SelectWrapper>
        {errors.name && (
          <ErrorMessage initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <HiOutlineExclamationCircle /> This field is required
          </ErrorMessage>
        )}
      </InputGroup>
      <InputGroup>
        <label htmlFor="organization" className="required">College / Organisation Name</label>
        <SelectWrapper>
          <HiOutlineOfficeBuilding className="input-icon" />
          <Input 
            type="text" 
            name="organization" 
            id="organization" 
            required
            placeholder="e.g., Kodhive or XYZ College" 
            value={data.organization || ''}
            onChange={(e) => updateData('organization', e.target.value)}
            $hasError={!!errors.organization}
          />
        </SelectWrapper>
        {errors.organization && (
          <ErrorMessage initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <HiOutlineExclamationCircle /> This field is required
          </ErrorMessage>
        )}
      </InputGroup>
      <InputGroup>
        <label htmlFor="email" className="required">Your Email</label>
        <SelectWrapper>
          <HiOutlineMail className="input-icon" />
          <Input 
            type="email" 
            name="email" 
            id="email" 
            required 
            placeholder="e.g., Adrien@example.com" 
            value={data.email || ''}
            onChange={(e) => updateData('email', e.target.value)}
            $hasError={!!errors.email}
          />
        </SelectWrapper>
        {errors.email && (
          <ErrorMessage initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <HiOutlineExclamationCircle /> This field is required
          </ErrorMessage>
        )}
      </InputGroup>
      <InputGroup>
        <label htmlFor="phone" className="required">Phone Number</label>
        <SelectWrapper>
          <HiOutlinePhone className="input-icon" />
          <Input 
            type="tel" 
            name="phone" 
            id="phone" 
            required
            placeholder="e.g., +91 98765 43210" 
            value={data.phone || ''}
            onChange={(e) => updateData('phone', e.target.value)}
            $hasError={!!errors.phone}
          />
        </SelectWrapper>
        {errors.phone && (
          <ErrorMessage initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <HiOutlineExclamationCircle /> This field is required
          </ErrorMessage>
        )}
      </InputGroup>
    </InfoGrid>
  </motion.div>
);

// --- Form Components ---

const FullProjectForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    projectType: 'Website',
    priceRange: 'Below ₹10,000'
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("Submit Full Request");
  const totalSteps = 4;

  const updateData = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    // Clear error when user types
    if (errors[key]) {
      setErrors(prev => ({ ...prev, [key]: null }));
    }
  };

  const validateStep = () => {
    const newErrors = {};
    let isValid = true;

    if (step === 1) {
      if (!formData.name?.trim()) newErrors.name = true;
      if (!formData.organization?.trim()) newErrors.organization = true;
      if (!formData.email?.trim()) newErrors.email = true;
      if (!formData.phone?.trim()) newErrors.phone = true;
    }
    
    if (step === 3) {
      if (!formData.requirements?.trim()) newErrors.requirements = true;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      isValid = false;
    }

    return isValid;
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep(prev => Math.min(prev + 1, totalSteps));
    }
  };
  
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const projectFormUrl = `https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_PROJECT_ID}`;
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step !== totalSteps) return;

    setStatus("Submitting...");
    
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    
    const assets = [];
    if (formData.assetDesign) assets.push("Design/Mockup");
    if (formData.assetBrand) assets.push("Brand Guide/Logo");
    if (formData.assetCode) assets.push("Existing Code");
    data.append('assets', assets.join(', '));
    
    try {
      const response = await fetch(projectFormUrl, {
        method: "POST",
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        setStatus("Request Sent!");
        setFormData({
            projectType: 'Website',
            priceRange: 'Below ₹10,000'
        });
        setStep(1);
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

  const projectTypes = [
    { label: 'Website', icon: HiOutlineDesktopComputer },
    { label: 'Mobile App', icon: HiOutlineDeviceMobile },
    { label: 'Design', icon: HiOutlineColorSwatch },
    { label: 'Editing', icon: HiOutlineVideoCamera },
    { label: 'Other', icon: HiOutlineDotsHorizontal },
  ];

  const priceRanges = [
    'Below ₹10,000',
    '₹10k - ₹15k',
    '₹15k - ₹50k',
    '₹50k - ₹1L',
    '₹1L - ₹2.5L',
    '₹2.5L+',
  ];

  return (
    <FormContainer>
      <StepIndicator>Step {step} of {totalSteps}</StepIndicator>
      <Form onSubmit={handleSubmit}>
        <AnimatePresence mode="wait">
          {step === 1 && (
            <StepContactInfo data={formData} updateData={updateData} errors={errors} key="step1" />
          )}

          {step === 2 && (
            <motion.div variants={formAnimVariants} initial="hidden" animate="visible" exit="exit" key="step2">
              <FormStepTitle>Step 2: Project Scope</FormStepTitle>
              
              <InputGroup>
                <label>Project Type</label>
                <SelectionGrid>
                  {projectTypes.map((type) => (
                    <SelectionCard 
                      key={type.label}
                      $selected={formData.projectType === type.label}
                      onClick={() => updateData('projectType', type.label)}
                      whileTap={{ scale: 0.98 }}
                    >
                      <type.icon />
                      <span>{type.label}</span>
                    </SelectionCard>
                  ))}
                </SelectionGrid>
              </InputGroup>
              
              <InputGroup style={{marginTop: '2rem'}}>
                <label>Budget Estimate (INR)</label>
                <PriceGrid>
                  {priceRanges.map((price) => (
                    <SelectionCard 
                      key={price}
                      $selected={formData.priceRange === price}
                      onClick={() => updateData('priceRange', price)}
                      whileTap={{ scale: 0.98 }}
                    >
                      <HiOutlineCurrencyRupee />
                      <span>{price}</span>
                    </SelectionCard>
                  ))}
                </PriceGrid>
              </InputGroup>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div variants={formAnimVariants} initial="hidden" animate="visible" exit="exit" key="step3">
              <FormStepTitle>Step 3: Your Idea</FormStepTitle>
              <InputGroup>
                <label htmlFor="requirements-full" className="required">What do you want to build or create?</label>
                <TextArea 
                  name="requirements" 
                  id="requirements-full" 
                  placeholder="e.g., 'Build a responsive 5-page landing site...' or 'Design a modern, minimalist logo...' or 'Edit a 10-minute vlog for YouTube...'" 
                  required 
                  value={formData.requirements || ''}
                  onChange={(e) => updateData('requirements', e.target.value)}
                  $hasError={!!errors.requirements}
                />
                 {errors.requirements && (
                  <ErrorMessage initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <HiOutlineExclamationCircle /> Please describe your project requirements
                  </ErrorMessage>
                )}
              </InputGroup>
            </motion.div>
          )}

          {step === 4 && (
             <motion.div variants={formAnimVariants} initial="hidden" animate="visible" exit="exit" key="step4">
              <FormStepTitle>Step 4: Additional Details</FormStepTitle>
              <InfoGrid>
                <InputGroup>
                  <label>Do you need documentation?</label>
                  <OptionsGroup>
                    <HiddenInput 
                      type="radio" 
                      name="documentation" 
                      id="doc-yes" 
                      value="Yes" 
                      checked={formData.documentation === 'Yes'}
                      onChange={(e) => updateData('documentation', e.target.value)}
                    />
                    <StyledLabel htmlFor="doc-yes"><HiOutlineCheckCircle /> Yes, I need technical docs.</StyledLabel>
                    
                    <HiddenInput 
                      type="radio" 
                      name="documentation" 
                      id="doc-no" 
                      value="No" 
                      checked={!formData.documentation || formData.documentation === 'No'}
                      onChange={(e) => updateData('documentation', e.target.value)}
                    />
                    <StyledLabel htmlFor="doc-no"><HiOutlineCheckCircle /> No, just the final product.</StyledLabel>
                  </OptionsGroup>
                </InputGroup>

                <InputGroup>
                  <label>Do you have existing assets?</label>
                  <OptionsGroup>
                    <HiddenInput 
                      type="checkbox" 
                      name="assets" 
                      id="asset-design" 
                      value="Design/Mockup"
                      checked={!!formData.assetDesign}
                      onChange={(e) => updateData('assetDesign', e.target.checked)}
                    />
                    <StyledLabel htmlFor="asset-design"><HiOutlineCheckCircle /> I have a design/mockup</StyledLabel>
                    
                    <HiddenInput 
                      type="checkbox" 
                      name="assets" 
                      id="asset-brand" 
                      value="Brand Guide/Logo" 
                      checked={!!formData.assetBrand}
                      onChange={(e) => updateData('assetBrand', e.target.checked)}
                    />
                    <StyledLabel htmlFor="asset-brand"><HiOutlineCheckCircle /> I have a brand guide/logo</StyledLabel>

                    <HiddenInput 
                      type="checkbox" 
                      name="assets" 
                      id="asset-code" 
                      value="Existing Code" 
                      checked={!!formData.assetCode}
                      onChange={(e) => updateData('assetCode', e.target.checked)}
                    />
                    <StyledLabel htmlFor="asset-code"><HiOutlineCheckCircle /> I have existing code</StyledLabel>
                  </OptionsGroup>
                </InputGroup>
              </InfoGrid>
              <ImportantNote>
                <HiOutlineExclamationCircle />
                <span>Important Note: Documentation and/or presentation services will incur extra costs.</span>
              </ImportantNote>
            </motion.div>
          )}
        </AnimatePresence>

        <FormNavigation>
          <NavButton 
            type="button" 
            onClick={prevStep} 
            disabled={step === 1}
            whileTap={{ scale: 0.95 }}
          >
            <HiOutlineArrowLeft /> Previous
          </NavButton>

          {step < totalSteps && (
            <NavButton 
              type="button" 
              $isNext 
              onClick={nextStep}
              whileTap={{ scale: 0.95 }}
            >
              Next <HiOutlineArrowRight />
            </NavButton>
          )}

          {step === totalSteps && (
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
          )}
        </FormNavigation>
      </Form>
    </FormContainer>
  );
};

const GuidanceForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    projectType: 'Unsure'
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("Submit Idea");
  const totalSteps = 3;

  const updateData = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors(prev => ({ ...prev, [key]: null }));
    }
  };

  const validateStep = () => {
    const newErrors = {};
    let isValid = true;

     if (step === 1) {
      if (!formData.name?.trim()) newErrors.name = true;
      if (!formData.organization?.trim()) newErrors.organization = true;
      if (!formData.email?.trim()) newErrors.email = true;
      if (!formData.phone?.trim()) newErrors.phone = true;
     }
     
     if (step === 3) {
       if (!formData.idea?.trim()) newErrors.idea = true;
     }

     if (Object.keys(newErrors).length > 0) {
       setErrors(newErrors);
       isValid = false;
     }
     return isValid;
  };

  const nextStep = () => {
     if (validateStep()) {
       setStep(prev => Math.min(prev + 1, totalSteps));
     }
  };
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));
  
  const contactFormUrl = `https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_CONTACT_ID}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step !== totalSteps) return;

    setStatus("Submitting...");
    
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    data.append('message', formData.idea || '');

    try {
      const response = await fetch(contactFormUrl, {
        method: "POST",
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        setStatus("Idea Sent!");
        setFormData({
            projectType: 'Unsure'
        });
        setStep(1);
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

  const projectTypes = [
    { label: 'Unsure', icon: HiOutlineQuestionMarkCircle },
    { label: 'Website', icon: HiOutlineDesktopComputer },
    { label: 'App', icon: HiOutlineDeviceMobile },
    { label: 'Design', icon: HiOutlineColorSwatch },
    { label: 'Other', icon: HiOutlineDotsHorizontal },
  ];

  return (
    <FormContainer
      key="guidance-form"
      variants={formAnimVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <StepIndicator>Step {step} of {totalSteps}</StepIndicator>
      <Form onSubmit={handleSubmit}>
        <AnimatePresence mode="wait">
          {step === 1 && (
            <StepContactInfo data={formData} updateData={updateData} errors={errors} key="g-step1" />
          )}

          {step === 2 && (
            <motion.div variants={formAnimVariants} initial="hidden" animate="visible" exit="exit" key="g-step2">
              <FormStepTitle>Step 2: Your Idea</FormStepTitle>
              
              <InputGroup>
                <label>Project Type (if known)</label>
                <SelectionGrid>
                  {projectTypes.map((type) => (
                    <SelectionCard 
                      key={type.label}
                      $selected={formData.projectType === type.label}
                      onClick={() => updateData('projectType', type.label)}
                      whileTap={{ scale: 0.98 }}
                    >
                      <type.icon />
                      <span>{type.label}</span>
                    </SelectionCard>
                  ))}
                </SelectionGrid>
              </InputGroup>
                
              <InputGroup style={{marginTop: '2rem'}}>
                <label htmlFor="main-question">What is your main question?</label>
                <SelectWrapper>
                  <HiOutlineQuestionMarkCircle className="input-icon" />
                  <Input 
                    type="text" 
                    name="main_question" 
                    id="main-question" 
                    placeholder="e.g., 'How much would this cost?'" 
                    value={formData.main_question || ''}
                    onChange={(e) => updateData('main_question', e.target.value)}
                  />
                </SelectWrapper>
              </InputGroup>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div variants={formAnimVariants} initial="hidden" animate="visible" exit="exit" key="g-step3">
              <FormStepTitle>Step 3: Describe Your Idea</FormStepTitle>
              <InputGroup>
                <label htmlFor="idea-guide" className="required">Describe your idea or challenge</label>
                <SimpleTextArea 
                  name="idea" 
                  id="idea-guide" 
                  placeholder="e.g., 'I have an idea for a mobile app...'" 
                  required 
                  value={formData.idea || ''}
                  onChange={(e) => updateData('idea', e.target.value)}
                  $hasError={!!errors.idea}
                />
                {errors.idea && (
                  <ErrorMessage initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <HiOutlineExclamationCircle /> Please describe your idea
                  </ErrorMessage>
                )}
              </InputGroup>
            </motion.div>
          )}
        </AnimatePresence>

        <FormNavigation>
          <NavButton 
            type="button" 
            onClick={prevStep} 
            disabled={step === 1}
            whileTap={{ scale: 0.95 }}
          >
            <HiOutlineArrowLeft /> Previous
          </NavButton>

          {step < totalSteps && (
            <NavButton 
              type="button" 
              $isNext 
              onClick={nextStep}
              whileTap={{ scale: 0.95 }}
            >
              Next <HiOutlineArrowRight />
            </NavButton>
          )}

          {step === totalSteps && (
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
          )}
        </FormNavigation>
      </Form>
    </FormContainer>
  );
};


// --- MAIN COMPONENT (The one exported) ---

const ProjectRequestForms = forwardRef((props, ref) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const formType = searchParams.get('form');
  
  const [activeTab, setActiveTab] = useState(formType === 'guidance' ? 'guidance' : 'full');

  useEffect(() => {
    const newTab = formType === 'guidance' ? 'guidance' : 'full';
    setActiveTab(newTab);
  }, [formType]);
  
  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    setSearchParams({ form: tabName });
  };

  return (
    <Section 
      id="form-section" 
      ref={ref} 
      $alt={true} 
      style={{ paddingTop: '6rem', paddingBottom: '6rem' }}
    >
      <Container>
      
        <FormSectionHeader>
          <FormSectionTitle>Choose Your Path</FormSectionTitle>
          <FormSectionSubtitle>
            Select 'Custom Project' if you have a clear plan. 
            Choose 'Idea Guidance' if you're just starting and need help with your concept.
          </FormSectionSubtitle>
        </FormSectionHeader>
      
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
  );
});

ProjectRequestForms.displayName = 'ProjectRequestForms';
export default ProjectRequestForms;