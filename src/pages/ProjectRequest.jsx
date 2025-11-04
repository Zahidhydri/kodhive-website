// src/pages/ProjectRequest.jsx
import styled from 'styled-components';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 4rem 1.5rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  text-align: center;
  color: ${({ theme }) => theme.text === '#212529' ? '#495057' : '#adb5bd'};
  margin-bottom: 3rem;
`;

const Form = styled.form`
  background: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  
  label {
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 6px;
  background: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
`;

const Select = styled.select`
  padding: 0.75rem 1rem;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 6px;
  background: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
`;

const TextArea = styled.textarea`
  padding: 0.75rem 1rem;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 6px;
  background: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
`;

const SubmitButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: ${({ theme }) => theme.buttonBg};
  color: ${({ theme }) => theme.buttonText};
  border-radius: 6px;
  border: none;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.buttonHover};
  }
`;

const projectFormUrl = `https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_PROJECT_ID}`;

export default function ProjectRequest() {
  return (
    <Container>
      <Title>Request a Project</Title>
      <Subtitle>
        Let our talented students build your idea. Fill out the form below.
      </Subtitle>
      <Form 
        action={projectFormUrl} 
        method="POST"
      >
        <InputGroup>
          <label htmlFor="name">Your Name</label>
          <Input type="text" name="name" id="name" required />
        </InputGroup>
        
        <InputGroup>
          <label htmlFor="email">Your Email</label>
          <Input type="email" name="email" id="email" required />
        </InputGroup>

        <InputGroup>
          <label htmlFor="projectType">Project Type</label>
          <Select name="projectType" id="projectType">
            <option value="website">Website</option>
            <option value="logo">Logo / Graphic Design</option>
            <option value="mobile-app">Mobile App</option>
            <option value="other">Other</option>
          </Select>
        </InputGroup>

        <InputGroup>
          <label htmlFor="requirements">Project Requirements</label>
          <TextArea name="requirements" id="requirements" placeholder="Describe your project, key features, and what you need..." required />
        </InputGroup>

        <SubmitButton type="submit">Submit Project Request</SubmitButton>
      </Form>
    </Container>
  );
}