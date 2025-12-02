// src/data/internshipData.js

export const internships = [
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

export const categories = ['All', ...new Set(internships.map(i => i.category))];