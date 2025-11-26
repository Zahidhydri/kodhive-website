import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import logo from '../assets/kodhive-logo.png'; // Keeping the hex mark

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

const LogoWrapper = styled(motion.div)`
  width: 100px;
  height: 100px;
  margin-bottom: 2rem;
  position: relative;
`;

const LogoImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 0 15px ${({ theme }) => theme.buttonBg}66);
`;

const LoadingBar = styled.div`
  width: 200px;
  height: 4px;
  background: ${({ theme }) => theme.border};
  border-radius: 4px;
  overflow: hidden;
  position: relative;
`;

const ProgressBar = styled(motion.div)`
  height: 100%;
  background: linear-gradient(90deg, ${({ theme }) => theme.buttonBg}, #6f42c1);
  width: 0%;
`;

const BrandText = styled(motion.h2)`
  font-size: 1.5rem;
  font-weight: 700;
  margin-top: 1.5rem;
  background: linear-gradient(to right, ${({ theme }) => theme.buttonBg}, #6f42c1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: 1px;
`;

export default function Preloader({ onComplete }) {
  return (
    <PreloaderContainer
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, pointerEvents: 'none' }}
      transition={{ duration: 0.5 }}
    >
      <LogoWrapper
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <LogoImg src={logo} alt="Skill Tensor" />
      </LogoWrapper>

      <LoadingBar>
        <ProgressBar
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, ease: "easeInOut" }}
          onAnimationComplete={onComplete}
        />
      </LoadingBar>

      <BrandText
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        Skill Tensor
      </BrandText>
    </PreloaderContainer>
  );
}