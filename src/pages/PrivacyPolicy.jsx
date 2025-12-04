import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiOutlineArrowLeft } from 'react-icons/hi';

const PageWrapper = styled(motion.div)`
  padding: 4rem 1.5rem;
  background: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  min-height: 100vh;
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.textSecondary};
  text-decoration: none;
  margin-bottom: 2rem;
  font-weight: 500;
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.buttonBg};
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.text};
`;

const LastUpdated = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.textSecondary};
  margin-bottom: 3rem;
`;

const Section = styled.section`
  margin-bottom: 2.5rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.text};
`;

const Text = styled.p`
  font-size: 1rem;
  line-height: 1.7;
  color: ${({ theme }) => theme.textSecondary};
  margin-bottom: 1rem;
`;

const List = styled.ul`
  list-style-type: disc;
  padding-left: 1.5rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.textSecondary};

  li {
    margin-bottom: 0.5rem;
    line-height: 1.6;
  }
`;

const ExternalLink = styled.a`
  color: ${({ theme }) => theme.buttonBg};
  text-decoration: none;
  font-weight: 500;
  
  &:hover {
    text-decoration: underline;
  }
`;

const pageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
};

export default function PrivacyPolicy() {
  return (
    <PageWrapper
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <Container>
        <BackButton to="/">
          <HiOutlineArrowLeft /> Back to Home
        </BackButton>
        
        <Title>Privacy Policy</Title>
        <LastUpdated>Last Updated: {new Date().toLocaleDateString()}</LastUpdated>

        <Section>
          <SectionTitle>1. Introduction</SectionTitle>
          <Text>
            Welcome to Skill Tensor. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights.
          </Text>
        </Section>

        <Section>
          <SectionTitle>2. Information We Collect</SectionTitle>
          <Text>
            We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
          </Text>
          <List>
            <li><strong>Identity Data:</strong> includes first name, last name, or similar identifier.</li>
            <li><strong>Contact Data:</strong> includes email address and telephone numbers.</li>
            <li><strong>Technical Data:</strong> includes internet protocol (IP) address, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform.</li>
            <li><strong>Usage Data:</strong> includes information about how you use our website and services.</li>
          </List>
        </Section>

        <Section>
          <SectionTitle>3. Third-Party Services & Data Collection</SectionTitle>
          <Text>
            We use <strong>Google Forms</strong> to collect information for internship applications and project requests. When you submit data through these forms, your information is processed by Google in accordance with their policies.
          </Text>
          <Text>
            For more information on how Google handles your data, please review the <ExternalLink href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google Privacy Policy</ExternalLink>.
          </Text>
        </Section>

        <Section>
          <SectionTitle>4. How We Use Your Data</SectionTitle>
          <Text>
            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
          </Text>
          <List>
            <li>To process your project requests and internship applications.</li>
            <li>To communicate with you regarding your inquiries.</li>
            <li>To improve our website, services, marketing and customer relationships.</li>
          </List>
        </Section>

        <Section>
          <SectionTitle>5. Data Security</SectionTitle>
          <Text>
            We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
          </Text>
        </Section>

        <Section>
          <SectionTitle>6. Contact Us</SectionTitle>
          <Text>
            If you have any questions about this privacy policy or our privacy practices, please contact us at: <strong>hello@skilltensor.com</strong>.
          </Text>
        </Section>

      </Container>
    </PageWrapper>
  );
}