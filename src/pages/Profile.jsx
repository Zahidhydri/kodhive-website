// src/pages/Profile.jsx
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding: 4rem 1.5rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;
`;

const ProfileCard = styled.div`
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileImage = styled.img`
  height: 128px;
  width: 128px;
  border-radius: 50%;
  border: 4px solid #007bff;
  margin-bottom: 1.5rem;
`;

const InfoGroup = styled.div`
  width: 100%;
  margin-bottom: 1rem;
  
  label {
    font-size: 0.9rem;
    font-weight: 600;
    color: ${({ theme }) => theme.text === '#212529' ? '#6c757d' : '#adb5bd'};
  }
  
  p {
    font-size: 1.1rem;
    padding: 0.75rem;
    background: ${({ theme }) => theme.body};
    border-radius: 6px;
    margin: 0.5rem 0 0 0;
  }
`;

export default function Profile() {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/signin" />;
  }

  return (
    <Container>
      <Title>Your Profile</Title>
      <ProfileCard>
        <ProfileImage 
          src={currentUser.photoURL} 
          alt={currentUser.displayName}
        />
        <InfoGroup>
          <label>Display Name</label>
          <p>{currentUser.displayName}</p>
        </InfoGroup>
        <InfoGroup>
          <label>Email</label>
          <p>{currentUser.email}</p>
        </InfoGroup>
      </ProfileCard>
    </Container>
  );
}