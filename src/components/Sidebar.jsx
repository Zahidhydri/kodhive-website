// src/components/StackedCardDeck.jsx
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion'; // <-- This line is now fixed
import styled from 'styled-components';
import { HiOutlineEye, HiOutlineThumbUp, HiOutlineSparkles } from 'react-icons/hi';

const cardData = [
  {
    title: "Real-World Experience",
    description: "Work on actual client projects, not just tutorials. Build a portfolio that gets you hired.",
    icon: HiOutlineEye,
    color: "#007bff"
  },
  {
    title: "Expert Mentorship",
    description: "Our senior developers and mentors guide you through every step of the project.",
    icon: HiOutlineThumbUp,
    color: "#6f42c1"
  },
  {
    title: "Innovative Culture",
    description: "We embrace cutting-edge technology and creative solutions. Bring your best ideas to the table.",
    icon: HiOutlineSparkles,
    color: "#198754"
  },
];

// This is the container that must be tall to create scroll distance
const DeckContainer = styled.div`
  position: relative;
  height: 300vh; // Height determines scroll duration
`;

// This container sticks to the viewport
const StickyWrapper = styled.div`
  position: sticky;
  top: 100px; // Sticks 100px from the top
  height: 100vh;
  overflow: hidden;
  /* Adds 3D perspective */
  perspective: 1500px;
`;

// Define the Card styled-component
const CardWrapper = styled(motion.div)`
  position: absolute;
  width: 90%;
  max-width: 800px;
  height: 400px;
  margin: 0 auto;
  left: 0;
  right: 0;
  border-radius: 16px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;
  box-shadow: 0 10px 30px -10px rgba(0,0,0,0.3);
  /* Enables 3D transforms */
  transform-style: preserve-3d;
`;

const CardIcon = styled.div`
  font-size: 3.5rem;
  margin-bottom: 1rem;
`;

const CardTitle = styled.h3`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const CardDescription = styled.p`
  font-size: 1.1rem;
  max-width: 90%;
`;

// --- Card Component ---
// This child component safely uses hooks
function Card({ i, scrollYProgress, total }) {
  // Each card scales and moves up based on its index (i)
  const range = [i / total, (i + 1) / total];
  
  // scale: Starts at 1, shrinks to 0.8
  const scale = useTransform(scrollYProgress, range, [1, 0.8]);
  
  // y: Starts at its position, moves up by 15% * (its remaining stack position)
  const y = useTransform(scrollYProgress, range, ['0%', `-${(total - i - 1) * 15}%`]);

  const item = cardData[i];

  return (
    <CardWrapper
      style={{
        backgroundColor: item.color,
        scale,
        y,
        zIndex: total - i // Keeps cards stacked correctly
      }}
    >
      <CardIcon as={item.icon} />
      <CardTitle>{item.title}</CardTitle>
      <CardDescription>{item.description}</CardDescription>
    </CardWrapper>
  );
}

// --- Main Deck Component ---
export default function StackedCardDeck() {
  const containerRef = useRef(null);
  
  // Get scroll progress *within the container*
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"] // Start when top hits top, end when bottom hits bottom
  });

  return (
    <DeckContainer ref={containerRef}>
      <StickyWrapper>
        {cardData.map((_, i) => (
          <Card
            key={i}
            i={i}
            scrollYProgress={scrollYProgress}
            total={cardData.length}
          />
        ))}
      </StickyWrapper>
    </DeckContainer>
  );
}