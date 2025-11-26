import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiCheck, HiOutlineSparkles, HiOutlineCurrencyRupee } from 'react-icons/hi';

const pricingPlans = [
  {
    title: "Mini Project",
    price: "1,499",
    target: "For 2nd/3rd Year Students",
    color: "#007bff",
    features: [
      "Complete Source Code",
      "Database Integration (MySQL/Firebase)",
      "Basic Documentation (Synopsis)",
      "Setup Guide & 1 Support Call",
      "Delivery in 3-5 Days"
    ]
  },
  {
    title: "Major Project",
    price: "4,999",
    target: "For Final Year Students",
    color: "#6f42c1",
    popular: true,
    features: [
      "Advanced Source Code (MERN/Python)",
      "Full Documentation (Black Book format)",
      "PPT for Presentation",
      "Viva Q&A Preparation",
      "Unlimited Bug Fixes",
      "Delivery in 7-10 Days"
    ]
  },
  {
    title: "Video Editing",
    price: "999",
    target: "Per Minute of Output",
    color: "#d81b60",
    features: [
      "Professional Color Grading",
      "Sound Design & Mixing",
      "Motion Graphics & Titles",
      "Stock Footage Included",
      "2 Revisions",
      "4K Render Quality"
    ]
  }
];

const PageContainer = styled(motion.div)`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 1.5rem;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.text};
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.textSecondary};
  max-width: 600px;
  margin: 0 auto;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  align-items: start;
`;

const PricingCard = styled(motion.div)`
  background: ${({ theme }) => theme.card};
  border: 2px solid ${({ theme, $popular, $color }) => $popular ? $color : theme.border};
  border-radius: 20px;
  padding: 2.5rem;
  position: relative;
  display: flex;
  flex-direction: column;
  box-shadow: ${({ $popular, $color }) => $popular ? `0 10px 40px ${$color}33` : '0 10px 30px rgba(0,0,0,0.05)'};
`;

const PopularBadge = styled.div`
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  background: ${({ $color }) => $color};
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const PlanTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
  margin-bottom: 0.5rem;
`;

const PlanTarget = styled.span`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.textSecondary};
  margin-bottom: 2rem;
  display: block;
`;

const PriceWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.text};
  
  svg {
    font-size: 1.5rem;
    margin-top: 8px;
  }
`;

const Price = styled.span`
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1;
`;

const PriceLabel = styled.span`
  font-size: 1rem;
  color: ${({ theme }) => theme.textSecondary};
  align-self: flex-end;
  margin-bottom: 8px;
  margin-left: 5px;
`;

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 2.5rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  font-size: 1rem;
  color: ${({ theme }) => theme.text};

  svg {
    color: #28a745;
    font-size: 1.25rem;
    flex-shrink: 0;
  }
`;

const CtaButton = styled(Link)`
  width: 100%;
  padding: 1rem;
  border-radius: 10px;
  background: ${({ theme, $outline, $color }) => $outline ? 'transparent' : ($color || theme.buttonBg)};
  color: ${({ theme, $outline, $color }) => $outline ? ($color || theme.text) : '#fff'};
  border: 2px solid ${({ theme, $color }) => $color || theme.buttonBg};
  text-align: center;
  text-decoration: none;
  font-weight: 700;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px ${({ $color }) => $color}44;
    background: ${({ $color }) => $color};
    color: #fff;
  }
`;

export default function Pricing() {
  return (
    <PageContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Header>
        <Title>Transparent Pricing</Title>
        <Subtitle>
          Student-friendly rates for projects and professional pricing for business services. No hidden fees.
        </Subtitle>
      </Header>

      <Grid>
        {pricingPlans.map((plan, index) => (
          <PricingCard 
            key={index} 
            $popular={plan.popular} 
            $color={plan.color}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            {plan.popular && (
              <PopularBadge $color={plan.color}>
                <HiOutlineSparkles /> Most Popular
              </PopularBadge>
            )}
            <PlanTitle>{plan.title}</PlanTitle>
            <PlanTarget>{plan.target}</PlanTarget>
            
            <PriceWrapper>
              <HiOutlineCurrencyRupee />
              <Price>{plan.price}</Price>
              <PriceLabel>starting at</PriceLabel>
            </PriceWrapper>

            <FeaturesList>
              {plan.features.map((feat, i) => (
                <FeatureItem key={i}>
                  <HiCheck />
                  {feat}
                </FeatureItem>
              ))}
            </FeaturesList>

            <CtaButton 
              to={`/request-project?form=${plan.title.includes("Project") ? "full" : "guidance"}`}
              $color={plan.color}
              $outline={!plan.popular}
            >
              Get Started
            </CtaButton>
          </PricingCard>
        ))}
      </Grid>
    </PageContainer>
  );
}
