// src/components/ServiceCard.jsx
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// --- STYLED COMPONENTS ---

const ServiceCardStyled = styled(motion.div)`
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 16px; /* Increased border radius */
  padding: 2.5rem; /* Increased padding */
  box-shadow: 0 10px 30px rgba(0,0,0,0.07);
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  opacity: 1;
  border-top: 4px solid ${({ $color }) => $color};
  
  /* Each card takes up its portion of the track */
  width: ${100 / 5}%; /* 5 cards */
  flex-shrink: 0;
  margin: 0 1.5rem; // Add spacing between cards

  @media (max-width: 1023px) {
    width: 100%; // Full width on mobile
    margin: 0;
    max-width: 550px; // Set a max-width for mobile slides
    box-sizing: border-box; // Ensure padding doesn't break layout
  }
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

export const ServiceCard = ({ service, style = {} }) => {
  const Icon = service.icon;
  return (
    <ServiceCardStyled
      style={style} // Apply animation styles
      $color={service.bgColor}
    >
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