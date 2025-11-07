// src/components/ServicesSection.jsx
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Import Swiper for carousel
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

// Import the individual card component
import { ServiceCard } from './ServiceCard'; 

// Import icons and data
import {
  HiOutlinePencilAlt,
  HiOutlineBriefcase,
  HiOutlineUsers,
  HiOutlineColorSwatch,
  HiOutlineDeviceMobile,
} from 'react-icons/hi';

// --- DATA (Lottie file import removed as it's no longer used) ---
const servicesData = [
  {
    icon: HiOutlinePencilAlt,
    title: 'Project Development',
    description:
      'Have an idea for a web app, mobile app, or a new brand? Our teams of vetted students, guided by senior mentors, will build and deliver your project from concept to launch.',
    bgColor: '#4a69ff',
  },
  {
    icon: HiOutlineBriefcase,
    title: 'Internship Opportunities',
    description:
      'Gain real-world experience. We connect talented students with paid internships and projects, allowing you to build your portfolio and work on live applications.',
    bgColor: '#00796b',
  },
  {
    icon: HiOutlineDeviceMobile,
    title: 'Mobile App Development',
    description:
      'Create beautiful, cross-platform mobile applications for both iOS and Android from a single codebase. We focus on responsive design and a smooth native feel.',
    bgColor: '#f57c00', // Orange
  },
  {
    icon: HiOutlineColorSwatch,
    title: 'UI/UX & Brand Design',
    description:
      'A great product starts with a great design. Our students can help you with everything from logos and branding to complete user-flow wireframes and high-fidelity prototypes.',
    bgColor: '#d81b60',
  },
  {
    icon: HiOutlineUsers,
    title: 'Community & Mentorship',
    description:
      'Join a vibrant community of learners, builders, and industry experts. Get access to workshops, network with peers, and receive guidance to accelerate your tech career.',
    bgColor: '#6f42c1', // Purple
  },
];

// --- STYLED COMPONENTS (Simplified) ---

const Section = styled(motion.section)`
  padding: 6rem 0;
  background: ${({ theme }) => theme.body};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
`;

const SectionSubtitle = styled.p`
  text-align: center;
  font-size: 1.1rem;
  color: ${({ theme }) => (theme.text === '#212529' ? '#495057' : '#adb5bd')};
  max-width: 600px;
  margin: 0 auto 4rem;
`;

// This wrapper is now used for all screen sizes
const SwiperWrapper = styled.div`
  width: 100%;
  
  /* Style Swiper pagination dots */
  .swiper-pagination-bullet {
    background: ${({ theme }) => theme.border};
    opacity: 0.8;
  }
  .swiper-pagination-bullet-active {
    background: ${({ theme }) => theme.buttonBg} !important;
    opacity: 1;
  }
  .swiper-slide {
    padding-bottom: 3rem; // Space for pagination
    /* Ensure slides have height to be visible */
    height: auto; 
  }
`;

// --- ANIMATION ---
const sectionVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

// --- MAIN COMPONENT (Simplified) ---
export default function ServicesSection() {

  return (
    <Section
      id="services"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={sectionVariant}
    >
      <Container>
        <SectionTitle>Our Core Offerings</SectionTitle>
        <SectionSubtitle>
          We bridge the gap between education and industry, providing invaluable
          experience for students and high-quality results for clients.
        </SectionSubtitle>

        {/* --- SIMPLIFIED: Just the Swiper Carousel --- */}
        <SwiperWrapper>
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={30}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            // Responsive breakpoints
            breakpoints={{
              // Mobile (default)
              0: {
                slidesPerView: 1,
              },
              // Tablet
              768: {
                slidesPerView: 2,
              },
              // Desktop
              1024: {
                slidesPerView: 3,
              },
            }}
          >
            {servicesData.map((service) => (
              <SwiperSlide key={service.title}>
                <ServiceCard service={service} />
              </SwiperSlide>
            ))}
          </Swiper>
        </SwiperWrapper>
        
      </Container>
    </Section>
  );
}