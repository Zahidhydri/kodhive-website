import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

// Ideally, you should import the lottie file directly if your bundler supports it
// import loadingAnimation from '../assets/loading.lottie';
// For now, I will assume it is in the public folder or assets and referenced as a string
// If you are using the lottie player, ensure the file is accessible.

// Assuming you have uploaded "loading.lottie" to src/assets/
import loadingAnimation from '../assets/loading.lottie';

const PreloaderContainer = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: ${({ theme }) => theme.body};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const LottieWrapper = styled.div`
  width: 300px; /* Adjust size as needed */
  height: 300px;
`;

const BrandText = styled(motion.h2)`
  font-size: 1.5rem;
  font-weight: 700;
  margin-top: 1rem;
  background: linear-gradient(to right, ${({ theme }) => theme.buttonBg}, #6f42c1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: 1px;
`;

export default function Preloader({ onComplete }) {
  // We can use a simple timeout to simulate loading completion 
  // OR use the onComplete event from the Lottie player if it's not a loop.
  // Since most loading animations loop, a timer is standard for a preloader.

  React.useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000); // Show preloader for 3 seconds

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <PreloaderContainer
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, pointerEvents: 'none' }}
      transition={{ duration: 0.5 }}
    >
      <LottieWrapper>
        <DotLottieReact
          src={loadingAnimation}
          loop
          autoplay
        />
      </LottieWrapper>

      <BrandText
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Skill Tensor
      </BrandText>
    </PreloaderContainer>
  );
}