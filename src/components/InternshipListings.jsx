// src/components/InternshipListings.jsx
import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { 
  HiOutlineLocationMarker, 
  HiOutlineClock, 
  HiOutlineCode, 
  HiOutlineSearch,
  HiOutlineXCircle // <-- 1. Import X icon
} from 'react-icons/hi';

// --- Data is now passed in as props ---

// --- Styled Components ---
const SearchFilterContainer = styled.div`
  margin-bottom: 2.5rem;
`;

const SearchBarContainer = styled.div`
  position: relative;
  margin-bottom: 1.5rem;
  
  /* Search Icon */
  svg:first-of-type { 
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: ${({ theme }) => theme.text === '#212529' ? '#6c757d' : '#adb5bd'};
    font-size: 1.25rem;
    z-index: 1;
  }
`;

// --- 2. ENHANCED: Clear button ---
const ClearButton = styled.button`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: ${({ theme }) => theme.text === '#212529' ? '#6c757d' : '#adb5bd'};
  font-size: 1.25rem;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  z-index: 2; /* Above input */

  &:hover {
    color: ${({ theme }) => theme.text};
  }
`;

const SearchInput = styled.input`
  width: 100%;
  /* 3. ENHANCED: Padding for both icons */
  padding: 0.85rem 2.75rem 0.85rem 3rem; 
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

// This component is EXPORTED so Internships.jsx can use it in the modal
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
  // --- 4. Receive data as props ---
  internships,
  categories,
  selectedInternship, 
  setSelectedInternship, 
  setIsDetailModalOpen, 
  openForm,
  isDetailModalOpen 
}) {
  
  // --- 5. ENHANCED: Debounced search state ---
  const [inputValue, setInputValue] = useState(''); // What the user types
  const [searchTerm, setSearchTerm] = useState('');   // What we actually search for
  const [selectedCategory, setSelectedCategory] = useState('All');

  // --- 6. ENHANCED: Debounce logic ---
  useEffect(() => {
    // Set a timer to update the search term 300ms after user stops typing
    const timer = setTimeout(() => {
      setSearchTerm(inputValue);
    }, 300);

    // Clear the timer if the user types again
    return () => clearTimeout(timer);
  }, [inputValue]); // This effect runs every time the input value changes

  // Memoized filtering logic
  const filteredInternships = useMemo(() => {
    // This now uses `searchTerm` (debounced) instead of `inputValue`
    return internships.filter(internship => {
      const matchesCategory = selectedCategory === 'All' || internship.category === selectedCategory;
      const matchesSearch = internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            internship.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, selectedCategory, internships]); // Added internships to dependency
  
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

  // --- 7. ENHANCED: Clear search handler ---
  const clearSearch = () => {
    setInputValue('');
    setSearchTerm('');
  };

  return (
    <>
      <SearchFilterContainer>
        <SearchBarContainer>
          <HiOutlineSearch />
          <SearchInput 
            type="text"
            placeholder="Search by title or skill (e.g., React, Python)"
            value={inputValue} // Use inputValue for the input
            onChange={(e) => setInputValue(e.target.value)} // Update inputValue
          />
          {/* --- 8. ENHANCED: Show clear button only when typing --- */}
          {inputValue && (
            <ClearButton onClick={clearSearch}>
              <HiOutlineXCircle />
            </ClearButton>
          )}
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