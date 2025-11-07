// src/components/ServiceCard.jsx
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// --- STYLED COMPONENTS ---

const ServiceCardStyled = styled(motion.div)`
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 10px 30px rgba(0,0,0,0.07);
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  opacity: 1;
  border-top: 4px solid ${({ $color }) => $color};
  
  /* --- SIMPLIFIED STYLES --- */
  /* These styles work for all screen sizes inside Swiper */
  width: 100%;
  margin: 0 auto; 
  box-sizing: border-box;
  flex-shrink: 0;
  /* Ensure the card has a minimum height if content is short */
  min-height: 250px; 
  /* The desktop-specific media query has been removed */
`;

const HeaderIcon = styled.div`
  font-size: 1.5rem;
  color: ${({ $color }) => $color};
  background: ${({ $color }) => $color}22;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const HeaderTitle = styled.h3`
  font-size: 1.35rem;
  font-weight: 600;
  margin: 0;
  color: ${({ theme }) => theme.text};
`;

const ServiceDescription = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => (theme.text === '#212529' ? '#495057' : '#adb5bd')};
  line-height: 1.6;
  margin: 0;
`;

// --- COMPONENT ---

export const ServiceCard = ({ service }) => {
  const Icon = service.icon;
  return (
    // The 'style' prop is removed as it's no longer needed
    <ServiceCardStyled $color={service.bgColor}>
      <HeaderIcon $color={service.bgColor}>
        <Icon />
      </HeaderIcon>
      <HeaderTitle>{service.title}</HeaderTitle>
      <ServiceDescription>
        {service.description}
      </ServiceDescription>
    </ServiceCardStyled>
  );
};