// src/components/ServicesSection.jsx
import React from 'react'; // Added React import
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Import Swiper for carousel
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

// Import icons and data
import {
  HiOutlinePencilAlt,
  HiOutlineBriefcase,
  HiOutlineUsers,
  HiOutlineColorSwatch,
  HiOutlineDeviceMobile, // Re-using this icon for Photo/Video
} from 'react-icons/hi';

// --- DATA ---
const servicesData = [
  {
    icon: HiOutlinePencilAlt,
    title: 'Project Development',
    description:
      'We build high-quality, small-scale projects for clients and college students. From web apps to custom software, our student teams deliver results.',
    bgColor: '#4a69ff',
  },
  {
    icon: HiOutlineBriefcase,
    title: 'Internship Opportunities',
    description:
      'We provide valuable remote internship opportunities specifically for freshers and engineering college students, helping you gain real-world experience.',
    bgColor: '#00796b',
  },
  {
    icon: HiOutlineDeviceMobile, // Re-using existing icon
    title: 'Photo Video Editing',
    description:
      'Need professional media? Our team offers photo and video editing services to make your content stand out, from simple touch-ups to full edits.',
    bgColor: '#f57c00', // Orange
  },
  {
    icon: HiOutlineColorSwatch,
    title: 'Brand Designing',
    description:
      'Build a strong brand identity. We design everything from professional logos and business posters to eye-catching social media graphics.',
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

// --- STYLED COMPONENTS ---

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
    height: auto; 
  }
`;

// --- [MERGED] Styles from ServiceCard.jsx ---

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
  
  /* Styles for Swiper */
  width: 100%;
  margin: 0 auto; 
  box-sizing: border-box;
  flex-shrink: 0;
  /* Ensure cards have same height in a slide */
  height: 100%; 
  min-height: 250px; 
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
  flex-grow: 1; /* Ensures content pushes to fill height */
`;
// --- End Merged Styles ---

// --- ANIMATION ---
const sectionVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

// --- MAIN COMPONENT ---
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
          At Kodhive, we bridge the gap for freshers and students by offering
          remote internships, building projects, and providing creative design services.
        </SectionSubtitle>

        {/* --- Carousel for all devices --- */}
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
            {servicesData.map((service) => {
              const Icon = service.icon; // Get icon component
              return (
                <SwiperSlide key={service.title} style={{ height: 'auto' }}>
                  {/* --- [INLINED] Card logic --- */}
                  <ServiceCardStyled $color={service.bgColor}>
                    <HeaderIcon $color={service.bgColor}>
                      <Icon />
                    </HeaderIcon>
                    <HeaderTitle>{service.title}</HeaderTitle>
                    <ServiceDescription>
                      {service.description}
                    </ServiceDescription>
                  </ServiceCardStyled>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </SwiperWrapper>
        
      </Container>
    </Section>
  );
}