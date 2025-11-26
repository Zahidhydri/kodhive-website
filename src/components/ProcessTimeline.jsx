import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { HiOutlineClipboardCheck, HiOutlineChatAlt2, HiOutlineCode, HiOutlineBadgeCheck } from 'react-icons/hi';

const steps = [
  {
    id: 1,
    title: "Submit Request",
    desc: "Fill out our simple form with your project idea or editing requirements.",
    icon: HiOutlineClipboardCheck
  },
  {
    id: 2,
    title: "Free Consultation",
    desc: "We discuss the scope, budget, and deadline. Students get a synopsis overview.",
    icon: HiOutlineChatAlt2
  },
  {
    id: 3,
    title: "Development / Editing",
    desc: "Our team builds your project. You get regular updates and previews.",
    icon: HiOutlineCode
  },
  {
    id: 4,
    title: "Delivery & Support",
    desc: "Receive the final source code, video file, or design. We include documentation support.",
    icon: HiOutlineBadgeCheck
  }
];

const Section = styled.section`
  padding: 6rem 1.5rem;
  background: ${({ theme }) => theme.card}; 
  border-top: 1px solid ${({ theme }) => theme.border};
  border-bottom: 1px solid ${({ theme }) => theme.border};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 4rem;
  color: ${({ theme }) => theme.text};
`;

const TimelineContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 3rem;

  @media (min-width: 768px) {
    flex-direction: row;
    gap: 0;
    justify-content: space-between;
    
    /* Connecting Line */
    &::before {
      content: '';
      position: absolute;
      top: 30px;
      left: 0;
      width: 100%;
      height: 4px;
      background: ${({ theme }) => theme.border};
      z-index: 0;
    }
  }
`;

const StepWrapper = styled(motion.div)`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 1.5rem;
  position: relative;
  z-index: 1;
  flex: 1;

  @media (min-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 0 1rem;
  }
`;

const IconCircle = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${({ theme }) => theme.buttonBg};
  color: ${({ theme }) => theme.buttonText};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  box-shadow: 0 0 0 8px ${({ theme }) => theme.card}; /* Creates gap effect */
  flex-shrink: 0;
`;

const StepContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const StepTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
`;

const StepDesc = styled.p`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.textSecondary};
  line-height: 1.5;
`;

export default function ProcessTimeline() {
  return (
    <Section>
      <Container>
        <Title>How It Works</Title>
        <TimelineContainer>
          {steps.map((step, i) => (
            <StepWrapper 
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
            >
              <IconCircle>
                <step.icon />
              </IconCircle>
              <StepContent>
                <StepTitle>{step.title}</StepTitle>
                <StepDesc>{step.desc}</StepDesc>
              </StepContent>
            </StepWrapper>
          ))}
        </TimelineContainer>
      </Container>
    </Section>
  );
}