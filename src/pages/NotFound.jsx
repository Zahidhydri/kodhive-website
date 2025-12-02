import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { HiOutlineHome } from 'react-icons/hi';

// Import your Lottie file here. 
// Ideally, upload "cat404.lottie" to src/assets/ and import it.
// For now, I'm using the existing one as a placeholder.
import notFoundAnimation from '../assets/cat404.lottie'; 

const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  padding: 2rem;
  text-align: center;
  background: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
`;

const LottieWrapper = styled.div`
  width: 100%;
  max-width: 500px;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1rem;
  background: linear-gradient(to right, ${({ theme }) => theme.buttonBg}, #6f42c1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Message = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.text === '#212529' ? '#495057' : '#adb5bd'};
  margin-bottom: 2.5rem;
  max-width: 600px;
`;

const HomeButton = styled(motion.create(Link))`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.85rem 1.75rem;
  background-color: ${({ theme }) => theme.buttonBg};
  color: ${({ theme }) => theme.buttonText};
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.buttonHover};
    transform: translateY(-2px);
    box-shadow: 0 8px 25px ${({ theme }) => theme.buttonBg}77;
  }
`;

const pageVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3 } }
};

export default function NotFound() {
  return (
    <Container
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <LottieWrapper>
        {/* Replace src with your cat404.lottie file path */}
        <DotLottieReact
          src={notFoundAnimation}
          loop
          autoplay
        />
      </LottieWrapper>
      
      <Title>Oops! Page Not Found</Title>
      <Message>
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </Message>

      <HomeButton 
        to="/" 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <HiOutlineHome /> Go Back Home
      </HomeButton>
    </Container>
  );
}