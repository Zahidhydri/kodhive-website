import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HiOutlineSearch, 
  HiOutlineBriefcase, 
  HiOutlineCalendar,
  HiOutlineXCircle,
  HiOutlineCheckCircle,
  HiOutlineRefresh // For loading spinner
} from 'react-icons/hi';
import logo from '../assets/kodhive-logo.png'; // Import the logo

// Get URL from .env
const googleSheetURL = import.meta.env.VITE_GOOGLE_SHEET_CSV_URL;

// --- Styled Components ---

const PageContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: flex-start; /* Align to top */
  min-height: 80vh;
  text-align: center;
  padding: 4rem 1.5rem;
  background-color: ${({ theme }) => theme.body};
`;

const VerifyBox = styled.div`
  background: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text};
  padding: 2.5rem;
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  border: 1px solid ${({ theme }) => theme.border};
  max-width: 550px;
  width: 100%;
  transition: all 0.3s ease;
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

const Header = styled.h2`
  color: ${({ theme }) => theme.text};
  border-bottom: 2px solid ${({ theme }) => theme.border};
  padding-bottom: 1rem;
  margin-bottom: 1.5rem;
  font-size: 1.75rem;
  font-weight: 700;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column; 
  gap: 1rem;
  margin-bottom: 2rem;
`;

const InputGroup = styled.div`
  position: relative;
  
  label {
    font-weight: 600;
    font-size: 0.9rem;
    text-align: left;
    color: ${({ theme }) => theme.text};
    display: block;
    margin-bottom: 0.5rem;
  }

  svg { /* Icon inside the input */
    position: absolute;
    left: 1rem;
    top: calc(50% + 7px); /* Adjust for label height */
    transform: translateY(-50%);
    color: ${({ theme }) => theme.text === '#212529' ? '#6c757d' : '#adb5bd'};
    font-size: 1.25rem;
  }
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 0.85rem 1rem 0.85rem 3rem; /* Padding for inner icon */
  font-size: 1rem;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  box-sizing: border-box;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.buttonBg};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.buttonBg}33;
  }
`;

const VerifyButton = styled(motion.button)`
  width: 100%; /* Back to full width */
  padding: 0.85rem 1.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  display: flex; /* Added to center spinner */
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  color: ${({ theme }) => theme.buttonText};
  background-color: ${({ theme }) => theme.buttonBg};
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:disabled {
    background-color: ${({ theme }) => theme.border};
    cursor: not-allowed;
  }
`;

const ResultArea = styled.div`
  text-align: left;
  margin-top: 1.5rem;
`;

const ResultCardBase = styled(motion.div)`
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid;
`;

const VerifiedCard = styled(ResultCardBase)`
  background-color: #28a7451a;
  border-color: #28a745;
`;

const ErrorCard = styled(ResultCardBase)`
  background-color: #dc35451a;
  border-color: #dc3545;
  color: #dc3545;
  display: flex;
  align-items: center;
  gap: 0.75rem;

  svg {
    font-size: 1.75rem;
    flex-shrink: 0;
  }

  h3 {
    margin: 0;
  }
`;

const VerifiedHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #28a745;
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 1.5rem;

  svg {
    font-size: 1.75rem;
  }
`;

const InternName = styled.h3`
  font-size: 1.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
  margin: 0 0 1.5rem 0;
`;

const DetailRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;

  svg {
    font-size: 1.25rem;
    color: ${({ theme }) => theme.text === '#212529' ? '#495057' : '#adb5bd'};
    flex-shrink: 0;
  }

  div {
    display: flex;
    flex-direction: column;
  }

  span:first-child {
    font-size: 0.85rem;
    font-weight: 600;
    color: ${({ theme }) => theme.text === '#212529' ? '#495057' : '#adb5bd'};
  }
  
  span:last-child {
    font-size: 1rem;
    font-weight: 500;
    color: ${({ theme }) => theme.text};
  }
`;

// --- Page Component ---

function VerifyCertificate() {
  const [certId, setCertId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!certId) {
      setStatusMessage(
        <ErrorCard>
          <HiOutlineXCircle />
          <div>
            <h3>Error</h3>
            <p>Please enter a certificate ID.</p>
          </div>
        </ErrorCard>
      );
      return;
    }

    setIsLoading(true);
    setStatusMessage(null);

    // Check if the URL is set
    if (!googleSheetURL) {
       setStatusMessage(
        <ErrorCard>
          <HiOutlineXCircle />
          <div>
            <h3>Configuration Error</h3>
            <p>The verification service URL is not set. Please contact support.</p>
          </div>
        </ErrorCard>
      );
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(googleSheetURL);
      if (!response.ok) throw new Error('Network error');
      
      const csvText = await response.text();
      const rows = csvText.split(/\r?\n/);
      const headers = rows[0].split(',').map(h => h.trim());

      const idColumnIndex = headers.indexOf('UniqueID');
      const firstNameIndex = headers.indexOf('FirstName');
      const lastNameIndex = headers.indexOf('LastName');
      const internshipNameIndex = headers.indexOf('InternshipName');
      const issueDateIndex = headers.indexOf('IssueDate');

      if ([idColumnIndex, firstNameIndex, lastNameIndex, internshipNameIndex, issueDateIndex].includes(-1)) {
        setStatusMessage(
          <ErrorCard>
            <HiOutlineXCircle />
            <div>
              <h3>Configuration Error</h3>
              <p>The data sheet is missing required columns. Please check your headers.</p>
            </div>
          </ErrorCard>
        );
        console.error("Missing columns. Found headers:", headers);
        setIsLoading(false);
        return;
      }

      let found = false;
      for (let i = 1; i < rows.length; i++) {
        const rowData = rows[i].split(',');
        if (rowData[idColumnIndex] && rowData[idColumnIndex].trim() === certId.trim()) {
          
          const firstName = rowData[firstNameIndex].trim();
          const lastName = rowData[lastNameIndex].trim();
          const internshipName = rowData[internshipNameIndex].trim();
          const issueDate = rowData[issueDateIndex].trim();

          setStatusMessage(
            <VerifiedCard>
              <VerifiedHeader>
                <HiOutlineCheckCircle />
                <span>Certificate Verified</span>
              </VerifiedHeader>

              <InternName>{firstName} {lastName}</InternName>

              <DetailRow>
                <HiOutlineBriefcase />
                <div>
                  <span>Internship</span>
                  <span>{internshipName}</span>
                </div>
              </DetailRow>

              <DetailRow>
                <HiOutlineCalendar />
                <div>
                  <span>Issue Date</span>
                  <span>{issueDate}</span>
                </div>
              </DetailRow>
            </VerifiedCard>
          );
          found = true;
          break;
        }
      }

      if (!found) {
        setStatusMessage(
          <ErrorCard>
            <HiOutlineXCircle />
            <div>
              <h3>Invalid ID</h3>
              <p>Certificate ID <strong>{certId}</strong> was not found in our records.</p>
            </div>
          </ErrorCard>
        );
      }
    } catch (error) {
      console.error('Fetch Error:', error);
      setStatusMessage(
        <ErrorCard>
          <HiOutlineXCircle />
          <div>
            <h3>Error</h3>
            <p>Could not connect to the verification service. Please try again later.</p>
          </div>
        </ErrorCard>
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageContainer
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
    >
      <VerifyBox>
        <LogoWrapper>
          <LogoImage src={logo} alt="Kodhive Logo" />
          <LogoText>Kodhive</LogoText>
        </LogoWrapper>
        <Header>Certificate Verification</Header>
        
        <StyledForm onSubmit={handleVerify}>
          <InputGroup>
            <label htmlFor="certId">Enter Certificate ID</label>
            <StyledInput
              type="text"
              id="certId"
              value={certId}
              onChange={(e) => setCertId(e.target.value)}
              placeholder="e.g., KH-2025-001"
            />
            <HiOutlineSearch />
          </InputGroup>
          <VerifyButton 
            type="submit" 
            disabled={isLoading}
            whileTap={{ scale: 0.98 }}
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
              >
                <HiOutlineRefresh />
              </motion.div>
            ) : (
              'Verify'
            )}
          </VerifyButton>
        </StyledForm>

        <AnimatePresence>
          {statusMessage && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <ResultArea>
                {statusMessage}
              </ResultArea>
            </motion.div>
          )}
        </AnimatePresence>
      </VerifyBox>
    </PageContainer>
  );
}

export default VerifyCertificate;