// src/pages/SignIn.jsx
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Navigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import styled from 'styled-components';

const Container = styled.div`
  padding: 6rem 1.5rem;
  display: flex;
  justify-content: center;
`;

const SignInCard = styled.div`
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  padding: 2.5rem;
  text-align: center;
  max-width: 400px;
  width: 100%;
  
  h1 {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: ${({ theme }) => theme.text === '#212529' ? '#495057' : '#adb5bd'};
    margin-bottom: 2rem;
  }
`;

const GoogleButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  background: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 6px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  
  svg {
    font-size: 1.5rem;
  }
  
  &:hover {
    background: ${({ theme }) => theme.border};
  }
`;

export default function SignIn() {
  const { googleSignIn, currentUser } = useAuth();
  const navigate = useNavigate();

  if (currentUser) {
    return <Navigate to="/profile" />;
  }

  const handleSignIn = async () => {
    try {
      await googleSignIn();
      navigate('/profile');
    } catch (error) {
      console.error('Failed to sign in with Google', error);
    }
  };

  return (
    <Container>
      <SignInCard>
        <h1>Sign In</h1>
        <p>Access your profile and opportunities.</p>
        <GoogleButton onClick={handleSignIn}>
          <FcGoogle />
          Sign In with Google
        </GoogleButton>
      </SignInCard>
    </Container>
  );
}