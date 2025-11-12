// src/pages/Internships.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';

import { useNavigate, Link } from 'react-router-dom';
import { 
  HiOutlineX, 
  HiOutlineArrowLeft,
  HiOutlineBadgeCheck 
} from 'react-icons/hi';

// --- Import Components ---
import InternshipListings from '../components/InternshipListings';
import { FeaturedInternshipContent } from '../components/InternshipListings'; // Import the named export

// --- Use .env variable for form URL ---
const googleFormUrl = `${import.meta.env.VITE_GOOGLE_FORM_INTERNSHIP_ID}`;

// --- Hero Slideshow Data ---
const internshipHeroSlides = [
  {
    title: "Your Career Starts Here",
    subtitle: "Explore dozens of remote internships from top-tier companies and startups.",
    image: "https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?auto=format&fit=crop&q=80&w=1200"
  },
  {
    title: "Gain Real-World Experience",
    subtitle: "Move beyond the classroom and apply your skills to solve real challenges.",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=1200"
  },
  {
    title: "Now Hiring: Python, Java, React & More",
    subtitle: "Find your perfect fit. Our top roles in development, data, and design are waiting for you.",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=1200"
  },
  {
    title: "100% Remote Opportunities",
    subtitle: "Work from anywhere, gain flexible experience, and build your global network.",
    image: "https://images.unsplash.com/photo-1588196749107-b29560901b8a?auto=format&fit=crop&q=80&w=1200"
  }
];

// --- Styled Components ---

const Container = styled(motion.div)`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 1.5rem 4rem 1.5rem; 

  @media (min-width: 768px) {
    padding: 2rem 1.5rem 4rem 1.5rem;
  }
`;

// (Hero components are unchanged)
const InternshipHeroContainer = styled.div`
  width: 100%;
  height: 40vh;
  min-height: 280px;
  max-height: 350px;
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 2.5rem;
  background: ${({ theme }) => theme.card};
  position: relative;

  .swiper { width: 100%; height: 100%; }
  .swiper-pagination-bullet { background: white; opacity: 0.7; }
  .swiper-pagination-bullet-active { opacity: 1; background: ${({ theme }) => theme.buttonBg}; }
`;
const HeroSlide = styled.div`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.1) 100%);
  }
`;
const HeroContent = styled(motion.div)`
  position: absolute;
  bottom: 10%;
  left: 5%;
  color: white;
  padding: 0 1.5rem;
  max-width: 600px;

  @media (min-width: 768px) {
    padding: 0 2.5rem;
  }
`;
const HeroTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;

  @media (min-width: 768px) {
    font-size: 2.25rem;
  }
`;
const HeroSubtitle = styled.p`
  font-size: 1rem;
  opacity: 0.9;
  line-height: 1.5;

  @media (min-width: 768px) {
    font-size: 1.1rem;
  }
`;
const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.body};
    border-color: ${({ theme }) => theme.buttonBg};
  }
`;

// --- NEW: Verify CTA Section ---
const VerifyCTASection = styled.section`
  background: ${({ theme }) => theme.card};
  border-top: 1px solid ${({ theme }) => theme.border};
  border-bottom: 1px solid ${({ theme }) => theme.border};
  padding: 4rem 1.5rem;
  text-align: center;
  margin-top: 3rem; /* Space from content above */
`;

const VerifyTitle = styled.h3`
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.text};
`;

const VerifySubtitle = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => (theme.text === '#212529' ? '#495057' : '#adb5bd')};
  max-width: 500px;
  margin: 0 auto 1.5rem auto;
  line-height: 1.6;
`;

const VerifyLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.buttonText};
  background: ${({ theme }) => theme.buttonBg};
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  border: 1px solid ${({ theme }) => theme.buttonBg};
  border-radius: 8px;
  transition: all 0.3s ease;
  
  svg { font-size: 1.25rem; }
  
  &:hover {
    background: ${({ theme }) => theme.buttonHover};
    border-color: ${({ theme }) => theme.buttonHover};
    transform: translateY(-2px);
    box-shadow: 0 8px 25px ${({ theme }) => theme.buttonBg}77;
  }
`;

// --- Modal Components (Unchanged) ---
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
const DetailModalContainer = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: ${({ theme }) => theme.body};
  z-index: 90;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  @media (min-width: 1024px) {
    display: none;
  }
`;
const DetailModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 1rem 1rem 0 1rem;
  flex-shrink: 0;
`;

// --- Page Component ---

const pageVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  exit: { opacity: 0, y: -15, transition: { duration: 0.2, ease: 'easeIn' } }
};

export default function Internships() {
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  
  const navigate = useNavigate();

  const openForm = () => setIsFormOpen(true);
  const closeForm = () => setIsFormOpen(false);

  const closeDetailModal = () => {
    setIsDetailModalOpen(false);
  };

  const formModalVariants = {
    hidden: { opacity: 0, x: "-50%", y: "-45%", scale: 0.95 },
    visible: { opacity: 1, x: "-50%", y: "-50%", scale: 1, transition: { duration: 0.3, ease: "easeOut" } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2, ease: "easeIn" } }
  };

  const detailModalVariants = {
    hidden: { y: "100%" },
    visible: { y: 0, transition: { duration: 0.4, ease: [0.1, 0.9, 0.2, 1] } },
    exit: { y: "100%", transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] } }
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <Container>
        
        <BackButton onClick={() => navigate(-1)}>
          <HiOutlineArrowLeft />
          Go Back
        </BackButton>

        {/* --- HERO SLIDESHOW --- */}
        <InternshipHeroContainer>
          <Swiper
            modules={[Pagination, Autoplay, EffectFade]}
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            loop={true}
          >
            {internshipHeroSlides.map((slide, index) => (
              <SwiperSlide key={index}>
                <HeroSlide style={{ backgroundImage: `url(${slide.image})` }}>
                  <HeroContent
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <HeroTitle>{slide.title}</HeroTitle>
                    <HeroSubtitle>{slide.subtitle}</HeroSubtitle>
                  </HeroContent>
                </HeroSlide>
              </SwiperSlide>
            ))}
          </Swiper>
        </InternshipHeroContainer>
        
        {/* --- This is the new component --- */}
        <InternshipListings
          selectedInternship={selectedInternship}
          setSelectedInternship={setSelectedInternship}
          setIsDetailModalOpen={setIsDetailModalOpen}
          openForm={openForm}
          isDetailModalOpen={isDetailModalOpen}
        />
        
      </Container>
      
      {/* --- NEW/MOVED Verify CTA Section --- */}
      <VerifyCTASection>
        <VerifyTitle>Have a Certificate?</VerifyTitle>
        <VerifySubtitle>
          You can verify the authenticity of any Kodhive certificate using our official tool.
        </VerifySubtitle>
        <VerifyLink to="/verify">
          <HiOutlineBadgeCheck />
          Verify Your Certificate
        </VerifyLink>
        <VerifySubtitle style={{ fontSize: '0.9rem', marginTop: '1.5rem', opacity: 0.8 }}>
          <strong>Want to see a demo?</strong> Add a sample intern to your Google Sheet with the ID "<strong>KH-DEMO-001</strong>" and try it!
        </VerifySubtitle>
      </VerifyCTASection>

      {/* --- Modals (Unchanged) --- */}
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
                <h2>Apply for: {selectedInternship?.title}</h2>
                <CloseButton onClick={closeForm}>
                  <HiOutlineX />
                </CloseButton>
              </ModalHeader>
              <IframeWrapper>
                <StyledIframe 
                  src={googleFormUrl}
                  title={`Apply for ${selectedInternship?.title}`}
                />
              </IframeWrapper>
            </FormModalContainer>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isDetailModalOpen && (
          <DetailModalContainer
            variants={detailModalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <DetailModalHeader>
              <CloseButton onClick={closeDetailModal}>
                <HiOutlineX />
              </CloseButton>
            </DetailModalHeader>
            
            <FeaturedInternshipContent 
              internship={selectedInternship} 
              onApplyClick={() => {
                closeDetailModal();
                setTimeout(openForm, 300);
              }} 
            />
          </DetailModalContainer>
        )}
      </AnimatePresence>
    </motion.div>
  );
}