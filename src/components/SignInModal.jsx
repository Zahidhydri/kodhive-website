// src/components/SignInModal.jsx
import { useAuth } from '../contexts/AuthContext.jsx'; // Corrected path
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { HiX } from 'react-icons/hi';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// This is the semi-transparent background
const ModalBackdrop = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(5px);
  z-index: 100;
`;

// This wrapper centers the modal card
// UPDATED: Changed to flexbox for perfect centering
const ModalWrapper = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 101;
  padding: 1rem; /* Ensures a small gap from screen edges on mobile */
`;

const SignInCard = styled.div`
  position: relative;
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 12px;
  padding: 2.5rem;
  text-align: center;
  max-width: 400px;
  width: 100%; /* Changed from 90vw to 100% to respect wrapper padding */
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  
  h1 {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: ${({ theme }) => theme.text === '#212529' ? '#495057' : '#adb5bd'};
    margin-bottom: 2rem;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.text};
  font-size: 1.75rem;
  cursor: pointer;
  padding: 0.25rem;
  line-height: 1;
  opacity: 0.6;
  
  &:hover {
    opacity: 1;
  }
`;

const GoogleButton = styled(motion.button)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  background: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  
  svg {
    font-size: 1.5rem;
  }
  
  &:hover {
    background: ${({ theme }) => theme.border};
  }
`;

// Animation variants for framer-motion
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { opacity: 0, y: -50, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

export default function SignInModal({ closeModal }) {
  const { googleSignIn } = useAuth();
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      await googleSignIn();
      closeModal(); // Close the modal on success
      navigate('/'); // UPDATED: Redirect to home page instead of profile
    } catch (error) {
      console.error('Failed to sign in with Google', error);
    }
  };

  return (
    <>
      <ModalBackdrop
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        onClick={closeModal} // Close modal if backdrop is clicked
        transition={{ duration: 0.3 }}
      />
      <ModalWrapper
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <SignInCard>
          <CloseButton onClick={closeModal}>
            <HiX />
          </CloseButton>
          <h1>Join Kodhive</h1>
          <p>Sign in to access your profile and opportunities.</p>
          <GoogleButton 
            onClick={handleSignIn}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FcGoogle />
            Sign In with Google
          </GoogleButton>
        </SignInCard>
      </ModalWrapper>
    </>
  );
}