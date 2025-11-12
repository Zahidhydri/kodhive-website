// src/components/InternshipListings.jsx
import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { 
  HiOutlineLocationMarker, 
  HiOutlineClock, 
  HiOutlineCode, 
  HiOutlineSearch
} from 'react-icons/hi';

// --- Internship Data (Moved Here) ---
const internships = [
  { 
    id: 1,
    title: 'Frontend Developer (React)', 
    description: 'Build and maintain modern, responsive user interfaces using React.js. You will work closely with our design and backend teams to implement new features and create seamless user experiences.',
    image: 'https://images.unsplash.com/photo-1633356122544-f13432v4a6cee?auto=format&fit=crop&q=80&w=800',
    location: 'Remote',
    type: 'Part-time',
    skills: ['React', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'Git'],
    category: 'Development'
  },
  { 
    id: 2,
    title: 'Python Developer Intern', 
    description: 'Work on backend services, data analysis scripts, and automation tasks. This role is perfect for someone who loves to solve complex problems and work with data.',
    image: 'https://images.unsplash.com/photo-1555949963-ff980e62553f?auto=format&fit=crop&q=80&w=800',
    location: 'Remote',
    type: 'Full-time',
    skills: ['Python', 'Django', 'Flask', 'SQL', 'APIs'],
    category: 'Development'
  },
  { 
    id: 3,
    title: 'UI/UX Design Intern', 
    description: 'Translate concepts into user flows, wireframes, mockups, and prototypes. You will help create intuitive and engaging designs for our web and mobile applications.',
    image: 'https://images.unsplash.com/photo-1581291518857-4e275087a113?auto=format&fit=crop&q=80&w=800',
    location: 'Remote',
    type: 'Part-time',
    skills: ['Figma', 'Sketch', 'Adobe XD', 'Prototyping', 'User Research'],
    category: 'Design'
  },
  { 
    id: 4,
    title: 'C++ Developer Intern', 
    description: 'Join our systems programming team to optimize high-performance applications. This role involves deep diving into algorithms, data structures, and system architecture.',
    image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=800',
    location: 'Remote',
    type: 'Full-time',
    skills: ['C++', 'Data Structures', 'Algorithms', 'Linux', 'GDB'],
    category: 'Development'
  },
  { 
    id: 5,
    title: 'Java Developer Intern', 
    description: 'Contribute to enterprise-level applications, working with Spring Boot and microservices. You will learn to build robust, scalable, and secure backend systems.',
    image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&q=80&w=800',
    location: 'Remote',
    type: 'Full-time',
    skills: ['Java', 'Spring Boot', 'Microservices', 'SQL', 'Maven'],
    category: 'Development'
  },
  { 
    id: 6,
    title: 'Digital Marketing Intern', 
    description: 'Assist in creating and managing marketing campaigns, analyzing SEO/SEM performance, and engaging with our community on social media platforms.',
    image: 'https://images.unsplash.com/photo-1557862921-3e16d9eb1687?auto=format&fit=crop&q=80&w=800',
    location: 'Remote',
    type: 'Part-time',
    skills: ['SEO', 'Content Writing', 'Social Media', 'Google Analytics'],
    category: 'Marketing'
  },
  { 
    id: 7,
    title: 'Data Analyst Intern', 
    description: 'Analyze large datasets to identify trends, develop reports, and provide actionable insights. Work with tools like SQL, Python (Pandas), and Tableau.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    location: 'Remote',
    type: 'Part-time',
    skills: ['SQL', 'Python', 'Pandas', 'Tableau', 'Statistics'],
    category: 'Data'
  },
  { 
    id: 8,
    title: 'DevOps Intern', 
    description: 'Help build and maintain our CI/CD pipelines, manage cloud infrastructure, and improve system reliability. Learn AWS, Docker, and Kubernetes.',
    image: 'https://images.unsplash.com/photo-1605647540924-852290f6b0d5?auto=format&fit=crop&q=80&w=800',
    location: 'Remote',
    type: 'Full-time',
    skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Bash'],
    category: 'Development'
  },
  { 
    id: 9,
    title: 'React Native Developer', 
    description: 'Develop cross-platform mobile applications for iOS and Android using React Native. You will be responsible for building new features and improving performance.',
    image: 'https://images.unsplash.com/photo-1607252650355-f7fd0460c118?auto=format&fit=crop&q=80&w=800',
    location: 'Remote',
    type: 'Part-time',
    skills: ['React Native', 'JavaScript', 'Redux', 'APIs', 'Mobile UI/UX'],
    category: 'Development'
  },
  { 
    id: 10,
    title: 'Machine Learning Intern', 
    description: 'Work on real-world machine learning models. You will assist in data preprocessing, model training, and evaluation. Basic knowledge of Scikit-learn and TensorFlow is a plus.',
    image: 'https://images.unsplash.com/photo-1620712943543-aebc69232c81?auto=format&fit=crop&q=80&w=800',
    location: 'Remote',
    type: 'Full-time',
    skills: ['Python', 'TensorFlow', 'Scikit-learn', 'NumPy', 'Data Modeling'],
    category: 'Data'
  },
  { 
    id: 11,
    title: 'Node.js Backend Intern', 
    description: 'Develop scalable backend services and APIs using Node.js, Express, and MongoDB. You will write unit tests and collaborate on system design.',
    image: 'https://images.unsplash.com/photo-1639628735078-ed2f038a193e?auto=format&fit=crop&q=80&w=800',
    location: 'Remote',
    type: 'Part-time',
    skills: ['Node.js', 'Express', 'MongoDB', 'REST APIs', 'JWT'],
    category: 'Development'
  },
  { 
    id: 12,
    title: 'Technical Content Writer', 
    description: 'Create compelling blog posts, tutorials, and documentation for our developer audience. A strong understanding of software development concepts is required.',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800',
    location: 'Remote',
    type: 'Part-time',
    skills: ['Writing', 'Editing', 'SEO', 'Developer Marketing', 'Git'],
    category: 'Marketing'
  },
];

const categories = ['All', ...new Set(internships.map(i => i.category))]; 

// --- Styled Components (Moved Here) ---

// --- Search & Filter Components ---
const SearchFilterContainer = styled.div`
  margin-bottom: 2.5rem;
`;

const SearchBarContainer = styled.div`
  position: relative;
  margin-bottom: 1.5rem;

  svg {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: ${({ theme }) => theme.text === '#212529' ? '#6c757d' : '#adb5bd'};
    font-size: 1.25rem;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.85rem 1rem 0.85rem 3rem; 
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 12px;
  background: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.buttonBg};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.buttonBg}33;
  }
`;

const FilterTabs = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

const FilterButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid ${({ theme, $isActive }) => $isActive ? theme.buttonBg : theme.border};
  background: ${({ theme, $isActive }) => $isActive ? theme.buttonBg : theme.card};
  color: ${({ theme, $isActive }) => $isActive ? theme.buttonText : theme.text};

  &:hover {
    border-color: ${({ theme }) => theme.buttonBg};
    color: ${({ theme, $isActive }) => !$isActive && theme.buttonBg};
  }
`;

// --- 2-Column Layout Components ---
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
    max-height: 700px; 
    overflow-y: auto;
    padding-right: 1rem; 
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
  display: none; // Hidden on mobile
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(0,0,0,0.05);

  @media (min-width: 1024px) {
    display: block; // Visible on desktop
    position: sticky; 
    top: 6rem; // Sticky position
  }
`;

// --- Reusable Content Component (Defined & Exported) ---
const FeaturedImage = styled.img`
  width: 100%;
  height: 250px; 
  object-fit: cover;

  @media (min-width: 1024px) {
    height: 300px;
  }
`;

const FeaturedContent = styled.div`
  padding: 1.5rem;

  @media (min-width: 768px) {
    padding: 2rem;
  }
  @media (min-width: 1024px) {
    padding: 2rem 2.5rem;
  }
`;

const FeaturedContentWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
  
  @media (min-width: 1024px) {
    max-width: 100%;
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

// This component is now EXPORTED so Internships.jsx can use it in the modal
export function FeaturedInternshipContent({ internship, onApplyClick }) {
  if (!internship) return (
    <FeaturedContentWrapper>
      <FeaturedContent>
        <p>Select an internship from the list to see the details.</p>
      </FeaturedContent>
    </FeaturedContentWrapper>
  );

  return (
    <FeaturedContentWrapper>
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
    </FeaturedContentWrapper>
  );
}


// --- Main Component (Default Export) ---
export default function InternshipListings({ 
  selectedInternship, 
  setSelectedInternship, 
  setIsDetailModalOpen, 
  openForm,
  isDetailModalOpen 
}) {
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Memoized filtering logic
  const filteredInternships = useMemo(() => {
    return internships.filter(internship => {
      const matchesCategory = selectedCategory === 'All' || internship.category === selectedCategory;
      const matchesSearch = internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            internship.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, selectedCategory]);
  
  // Effect to set default selected internship when filter changes
  useEffect(() => {
    if (filteredInternships.length > 0) {
      if (!selectedInternship || !filteredInternships.find(i => i.id === selectedInternship.id)) {
        setSelectedInternship(filteredInternships[0]);
      }
    } else {
      setSelectedInternship(null);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredInternships]); 

  const handleInternshipSelect = (internship) => {
    setSelectedInternship(internship);
    if (window.innerWidth < 1024) {
      setIsDetailModalOpen(true);
    }
  };

  return (
    <>
      <SearchFilterContainer>
        <SearchBarContainer>
          <HiOutlineSearch />
          <SearchInput 
            type="text"
            placeholder="Search by title or skill (e.g., React, Python)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchBarContainer>
        <FilterTabs>
          {categories.map((category) => (
            <FilterButton
              key={category}
              $isActive={selectedCategory === category}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </FilterButton>
          ))}
        </FilterTabs>
      </SearchFilterContainer>

      <ContentWrapper>
        <InternshipList>
          {filteredInternships.length > 0 ? (
            filteredInternships.map((internship) => (
              <ListCard
                key={internship.id}
                $isActive={!isDetailModalOpen && selectedInternship?.id === internship.id}
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
            ))
          ) : (
            <p>No internships found matching your criteria.</p>
          )}
        </InternshipList>

        {/* Desktop featured panel */}
        <FeaturedInternship>
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedInternship?.id || 'empty'}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <FeaturedInternshipContent 
                internship={selectedInternship} 
                onApplyClick={openForm} 
              />
            </motion.div>
          </AnimatePresence>
        </FeaturedInternship>
      </ContentWrapper>
    </>
  );
}