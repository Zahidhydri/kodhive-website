// src/pages/Internships.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { HiOutlineLocationMarker, HiOutlineClock, HiOutlineX, HiOutlineCode } from 'react-icons/hi';

// --- UPDATED Internship Data ---
const internships = [
  { 
    id: 1,
    title: 'Frontend Developer (React)', 
    description: 'Build and maintain modern, responsive user interfaces using React.js. You will work closely with our design and backend teams to implement new features and create seamless user experiences.',
    image: 'https://images.unsplash.com/photo-1633356122544-f13432v4a6cee?auto=format&fit=crop&q=80&w=800',
    location: 'Remote',
    type: 'Part-time',
    skills: ['React', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'Git']
  },
  { 
    id: 2,
    title: 'Python Developer Intern', 
    description: 'Work on backend services, data analysis scripts, and automation tasks. This role is perfect for someone who loves to solve complex problems and work with data.',
    image: 'https://images.unsplash.com/photo-1555949963-ff980e62553f?auto=format&fit=crop&q=80&w=800',
    location: 'Nagpur, India',
    type: 'Full-time',
    skills: ['Python', 'Django', 'Flask', 'SQL', 'APIs']
  },
  { 
    id: 3,
    title: 'UI/UX Design Intern', 
    description: 'Translate concepts into user flows, wireframes, mockups, and prototypes. You will help create intuitive and engaging designs for our web and mobile applications.',
    image: 'https://images.unsplash.com/photo-1581291518857-4e275087a113?auto=format&fit=crop&q=80&w=800',
    location: 'Remote',
    type: 'Part-time',
    skills: ['Figma', 'Sketch', 'Adobe XD', 'Prototyping', 'User Research']
  },
  { 
    id: 4,
    title: 'C++ Developer Intern', 
    description: 'Join our systems programming team to optimize high-performance applications. This role involves deep diving into algorithms, data structures, and system architecture.',
    image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=800',
    location: 'Nagpur, India',
    type: 'Full-time',
    skills: ['C++', 'Data Structures', 'Algorithms', 'Linux', 'GDB']
  },
  { 
    id: 5,
    title: 'Java Developer Intern', 
    description: 'Contribute to enterprise-level applications, working with Spring Boot and microservices. You will learn to build robust, scalable, and secure backend systems.',
    image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&q=80&w=800',
    location: 'Remote',
    type: 'Full-time',
    skills: ['Java', 'Spring Boot', 'Microservices', 'SQL', 'Maven']
  },
  { 
    id: 6,
    title: 'Digital Marketing Intern', 
    description: 'Assist in creating and managing marketing campaigns, analyzing SEO/SEM performance, and engaging with our community on social media platforms.',
    image: 'https://images.unsplash.com/photo-1557862921-3e16d9eb1687?auto=format&fit=crop&q=80&w=800',
    location: 'Remote',
    type: 'Part-time',
    skills: ['SEO', 'Content Writing', 'Social Media', 'Google Analytics']
  },
];

// !!! IMPORTANT: Replace this with your own Google Form embed URL !!!
const googleFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSdwgNGUNqIYNcq-kXg1-UxF-bO3n-nsvA-D-k-12345ABCDE/viewform?embedded=true";

// --- Styled Components ---

const Container = styled(motion.div)`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem 4rem 1.5rem;

  @media (min-width: 768px) {
    padding: 4rem 1.5rem;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2.5rem;

  @media (min-width: 768px) {
    margin-bottom: 3.5rem;
  }
`;

const Title = styled(motion.h1)`
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    font-size: 2.75rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.text === '#212529' ? '#495057' : '#adb5bd'};
  max-width: 600px;
  margin: 0 auto;

  @media (min-width: 768px) {
    font-size: 1.15rem;
  }
`;

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;
  
  @media (min-width: 1024px) {
    grid-template-columns: 350px 1fr;
  }
`;

const InternshipList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  @media (min-width: 1024px) {
    max-height: 700px; /* Make list scrollable on desktop */
    overflow-y: auto;
    padding-right: 1rem; /* Space for scrollbar */
  }
`;

const ListCard = styled(motion.button)`
  display: flex;
  gap: 1rem;
  padding: 1rem;
  border-radius: 12px;
  border: 1px solid ${({ theme, $isActive }) => $isActive ? theme.buttonBg : theme.border};
  background: ${({ theme, $isActive }) => $isActive ? theme.card : theme.body};
  cursor: pointer;
  text-align: left;
  width: 100%;
  transition: all 0.3s ease;
  box-shadow: ${({ theme, $isActive }) => $isActive ? `0 4px 15px ${theme.buttonBg}33` : 'none'};
  transform: ${({ $isActive }) => $isActive ? 'scale(1.02)' : 'scale(1)'};

  &:hover {
    border-color: ${({ theme }) => theme.buttonBg};
    background: ${({ theme }) => theme.card};
  }
`;

const ListCardImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 8px;
  object-fit: cover;
  flex-shrink: 0;

  @media (min-width: 768px) {
    width: 60px;
    height: 60px;
  }
`;

const ListCardContent = styled.div`
  overflow: hidden;
  h3 {
    font-size: 1.1rem;
    font-weight: 600;
    color: ${({ theme }) => theme.text};
    margin: 0 0 0.25rem 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  p {
    font-size: 0.9rem;
    color: ${({ theme }) => theme.text === '#212529' ? '#495057' : '#adb5bd'};
    margin: 0;
  }
`;

const FeaturedInternship = styled(motion.div)`
  /* OPTIMIZATION: Hide on mobile */
  display: none; 
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(0,0,0,0.05);

  /* OPTIMIZATION: Show on desktop */
  @media (min-width: 1024px) {
    display: block; 
    position: sticky; /* Stick to top while scrolling list */
    top: 6rem;
  }
`;

const FeaturedImage = styled.img`
  width: 100%;
  height: 250px; /* Smaller height for mobile modal */
  object-fit: cover;

  @media (min-width: 1024px) {
    height: 300px; /* Taller on desktop */
  }
`;

const FeaturedContent = styled.div`
  padding: 1.5rem;

  @media (min-width: 768px) {
    padding: 2rem;
  }
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    gap: 1rem;
  }
`;

const Tag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.35rem 0.75rem;
  border-radius: 20px;
  background: ${({ theme }) => theme.body};
  border: 1px solid ${({ theme }) => theme.border};
  font-size: 0.85rem;
  font-weight: 500;
  
  svg {
    font-size: 1.1em;
    opacity: 0.7;
  }
`;

const SkillsContainer = styled.div`
  margin: 1.5rem 0;
  h4 {
    margin-bottom: 0.75rem;
    font-size: 1rem;
    font-weight: 600;
    color: ${({ theme }) => theme.text};
  }
  div {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
`;

const SkillBadge = styled.span`
  background: ${({ theme }) => theme.buttonBg}22;
  color: ${({ theme }) => theme.buttonBg};
  padding: 0.3rem 0.8rem;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
`;

const ApplyButton = styled(motion.button)`
  display: block;
  width: 100%;
  padding: 0.85rem 1.5rem;
  background-color: ${({ theme }) => theme.buttonBg};
  color: ${({ theme }) => theme.buttonText};
  border-radius: 8px;
  border: none;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: ${({ theme }) => theme.buttonHover};
  }
`;

// --- Modal Components ---

const ModalBackdrop = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(5px);
  z-index: 100;
`;

const FormModalContainer = styled(motion.div)`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 90vw;
  height: 85vh;
  max-width: 800px;
  background: ${({ theme }) => theme.card};
  border-radius: 16px;
  z-index: 101;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;

  /* OPTIMIZATION: Full screen on mobile */
  @media (max-width: 768px) {
    width: 100vw;
    height: 100vh;
    border-radius: 0;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  flex-shrink: 0;

  h2 {
    font-size: 1.1rem;
    font-weight: 600;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    @media (min-width: 768px) {
      font-size: 1.25rem;
    }
  }
`;

const CloseButton = styled.button`
  background: ${({ theme }) => theme.body};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${({ theme }) => theme.text};
  font-size: 1.25rem;
  flex-shrink: 0;
  
  &:hover {
    background: ${({ theme }) => theme.border};
  }
`;

const IframeWrapper = styled.div`
  flex-grow: 1;
  overflow: hidden;
`;

const StyledIframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`;

// --- NEW Detail Modal (for mobile) ---

const DetailModalContainer = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: ${({ theme }) => theme.body};
  z-index: 90;
  display: flex;
  flex-direction: column;
  overflow-y: auto;

  @media (min-width: 1024px) {
    display: none; // Only for mobile
  }
`;

const DetailModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 1rem 1rem 0 1rem;
  flex-shrink: 0;
`;

// --- Reusable Content Component ---

function FeaturedInternshipContent({ internship, onApplyClick }) {
  if (!internship) return null;

  return (
    <>
      <FeaturedImage src={internship.image} alt={internship.title} />
      <FeaturedContent>
        <TagContainer>
          <Tag><HiOutlineLocationMarker /> {internship.location}</Tag>
          <Tag><HiOutlineClock /> {internship.type}</Tag>
        </TagContainer>
        <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>{internship.title}</h2>
        <p style={{ color: "var(--subtitle-color)", lineHeight: 1.6 }}>{internship.description}</p>
        
        <SkillsContainer>
          <h4><HiOutlineCode style={{ verticalAlign: 'middle', marginRight: '0.25rem' }} /> Required Skills</h4>
          <div>
            {internship.skills.map((skill) => (
              <SkillBadge key={skill}>{skill}</SkillBadge>
            ))}
          </div>
        </SkillsContainer>

        <ApplyButton
          onClick={onApplyClick}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          Apply Now
        </ApplyButton>
      </FeaturedContent>
    </>
  );
}


// --- Page Component ---

export default function Internships() {
  const [selectedInternship, setSelectedInternship] = useState(internships[0]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false); // NEW state for mobile detail view

  const openForm = () => setIsFormOpen(true);
  const closeForm = () => setIsFormOpen(false);

  // NEW: Handle logic for selecting an internship
  const handleInternshipSelect = (internship) => {
    setSelectedInternship(internship);
    // On mobile, open the detail modal. On desktop, the side panel just updates.
    if (window.innerWidth < 1024) {
      setIsDetailModalOpen(true);
    }
  };

  const pageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const formModalVariants = {
    hidden: { opacity: 0, x: "-50%", y: "-45%", scale: 0.95 },
    visible: { opacity: 1, x: "-50%", y: "-50%", scale: 1, transition: { duration: 0.3, ease: "easeOut" } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2, ease: "easeIn" } }
  };

  const detailModalVariants = {
    hidden: { x: "100%" },
    visible: { x: 0, transition: { duration: 0.3, ease: "easeOut" } },
    exit: { x: "100%", transition: { duration: 0.3, ease: "easeOut" } }
  };

  return (
    <>
      <Container
        variants={pageVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        <Header>
          <Title>Find Your Opportunity</Title>
          <Subtitle>
            Browse our open internships and apply to join a team of innovators. 
            New positions are added weekly.
          </Subtitle>
        </Header>

        <ContentWrapper>
          <InternshipList>
            {internships.map((internship) => (
              <ListCard
                key={internship.id}
                $isActive={!isDetailModalOpen && selectedInternship.id === internship.id}
                onClick={() => handleInternshipSelect(internship)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ListCardImage src={internship.image} alt={internship.title} />
                <ListCardContent>
                  <h3>{internship.title}</h3>
                  <p>{internship.location}</p>
                </ListCardContent>
              </ListCard>
            ))}
          </InternshipList>

          {/* Desktop featured panel */}
          <FeaturedInternship>
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedInternship.id} // Re-animate when selected internship changes
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <FeaturedInternshipContent internship={selectedInternship} onApplyClick={openForm} />
              </motion.div>
            </AnimatePresence>
          </FeaturedInternship>
        </ContentWrapper>
      </Container>

      {/* --- Form Modal --- */}
      <AnimatePresence>
        {isFormOpen && (
          <>
            <ModalBackdrop
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeForm}
            />
            <FormModalContainer
              variants={formModalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <ModalHeader>
                <h2>Apply for: {selectedInternship.title}</h2>
                <CloseButton onClick={closeForm}>
                  <HiOutlineX />
                </CloseButton>
              </ModalHeader>
              <IframeWrapper>
                <StyledIframe 
                  src={googleFormUrl}
                  title={`Apply for ${selectedInternship.title}`}
                />
              </IframeWrapper>
            </FormModalContainer>
          </>
        )}
      </AnimatePresence>

      {/* --- NEW Mobile Detail Modal --- */}
      <AnimatePresence>
        {isDetailModalOpen && (
          <DetailModalContainer
            variants={detailModalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <DetailModalHeader>
              <CloseButton onClick={() => setIsDetailModalOpen(false)}>
                <HiOutlineX />
              </CloseButton>
            </DetailModalHeader>
            {/* We pass a special onApplyClick to close this modal *before* opening the next one */}
            <FeaturedInternshipContent 
              internship={selectedInternship} 
              onApplyClick={() => {
                setIsDetailModalOpen(false);
                setTimeout(openForm, 300); // Wait for transition to finish
              }} 
            />
          </DetailModalContainer>
        )}
      </AnimatePresence>
    </>
  );
}