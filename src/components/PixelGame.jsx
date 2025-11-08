// src/components/PixelGame.jsx
import React, { useState, useEffect, useRef, useMemo } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { HiPlay, HiRefresh } from 'react-icons/hi';

// --- Game Constants ---
const GAME_TIME = 20; // 20 seconds
const LINE_HEIGHT = 20; // Height of one code line
const GAME_HEIGHT = 200; // 10 lines visible
const LINES_COUNT = 50; // Total lines in the scrolling buffer
const SCROLL_SPEED = 2.5; // Seconds per line
const TARGET_COLOR = '#f57c00'; // Orange
const BUG_COLOR = '#e63946'; // Red

// --- Styled Components ---

const GameSection = styled(motion.section)`
  /* KEY: This uses the main page background. It will blend in perfectly. */
  background: ${({ theme }) => theme.body};
  padding: 6rem 1.5rem 4rem 1.5rem; /* More padding at top */
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  overflow: hidden; /* This is crucial */
`;

const GameTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: 600;
  text-align: center;
  color: ${({ theme }) => theme.text};
  margin: 0;
`;

const GameStats = styled.div`
  display: flex;
  gap: 2rem;
  font-family: 'monospace', 'Courier New', Courier;
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
`;

const Stat = styled.div`
  span {
    color: ${TARGET_COLOR};
    font-size: 1.75rem;
    margin-left: 0.5rem;
  }
`;

// This is the "game area" - a "computer terminal" window
const CodeTerminal = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;
  height: ${GAME_HEIGHT}px;
  background: ${({ theme }) => (theme.text === '#212529' ? '#1e1e1e' : '#fdfdfd')};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  padding: 10px 0; /* Padding top/bottom for the text */
`;

// This container holds all lines and scrolls up
const scrollAnim = keyframes`
  from { transform: translateY(0); }
  to { transform: translateY(-${LINE_HEIGHT * LINES_COUNT}px); }
`;

const CodeScroller = styled(motion.div)`
  position: absolute;
  width: 100%;
  animation: ${scrollAnim} ${SCROLL_SPEED * LINES_COUNT}s linear infinite;
  animation-play-state: ${props => (props.$running ? 'running' : 'paused')};
`;

const CodeLine = styled.pre`
  height: ${LINE_HEIGHT}px;
  line-height: ${LINE_HEIGHT}px;
  padding: 0 15px;
  margin: 0;
  font-family: 'monospace', 'Courier New', Courier;
  font-size: 0.85rem;
  white-space: pre;
  color: ${({ theme }) => (theme.text === '#212529' ? '#9cdcfe' : '#005cc5')};
  
  /* The "target" line */
  &[data-target="true"] {
    background: ${TARGET_COLOR}40; /* 25% opacity */
    color: ${TARGET_COLOR};
    font-weight: 700;
    cursor: pointer;
    
    /* The "bug" block */
    span.bug {
      background: ${BUG_COLOR};
      color: white;
      padding: 0 3px;
      border-radius: 3px;
      margin-right: 5px;
      box-shadow: 0 0 10px ${BUG_COLOR};
    }
  }

  /* Regular code styling */
  span.keyword { color: #c586c0; }
  span.string { color: #ce9178; }
  span.comment { color: #6a9955; }
`;

const Overlay = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  inset: 0;
  background: ${({ theme }) => theme.card}E6;
  backdrop-filter: blur(5px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  z-index: 10;
  color: ${({ theme }) => theme.text};
  border-radius: 8px; /* Match grid */
  
  h3 { font-size: 2.5rem; }
  p { font-size: 1.1rem; margin: 0; }
`;

const Button = styled(motion.button)`
  padding: 0.75rem 1.5rem;
  background-color: ${({ theme }) => theme.buttonBg};
  color: ${({ theme }) => theme.buttonText};
  border-radius: 8px;
  border: none;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  
  &:hover { background-color: ${({ theme }) => theme.buttonHover}; }
`;

// --- Custom useInterval Hook ---
function useInterval(callback, delay) {
  const savedCallback = useRef();
  useEffect(() => { savedCallback.current = callback; }, [callback]);
  useEffect(() => {
    function tick() { savedCallback.current(); }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

// --- Dummy Code Snippets ---
const codeSnippets = [
  `  <span class="keyword">const</span> <span class="variable">getX</span> = () => { ... };`,
  `  <span class="keyword">function</span> <span class="variable">onScroll</span>() { ... };`,
  `  <span class="string">'Hello Kodhive!'</span>;`,
  `  <span class="comment">// TODO: Refactor this</span>`,
  `  <span class="keyword">if</span> (user === <span class="string">'admin'</span>) {`,
  `  <span class="variable">launch</span>(<span class="string">'rocket'</span>);`,
  `  <span class="keyword">return</span> <span class="variable">true</span>;`,
  `  <span class="keyword">import</span> <span class="variable">Logo</span> <span class="keyword">from</span> <span class="string">'./logo.png'</span>;`,
  `  <span class="variable">margin</span>: <span class="string">'1rem'</span>;`,
  `  <span class="variable">padding</span>: <span class="string">'1.5rem'</span>;`,
  `  <span class="comment">// Click the buggy line!</span>`,
];

// This generates a long list of code lines, including a target
const generateLines = () => {
  let targetLine = Math.floor(Math.random() * (LINES_COUNT - 20)) + 10;
  // This is the "bug" that will be 
  let bug = `<span class="bug">BUG</span>`;
  
  return Array.from({ length: LINES_COUNT }).map((_, i) => {
    if (i === targetLine) {
      return { 
        id: i, 
        isTarget: true, 
        // Insert the "bug" at a random position
        code: `  ${bug} <span class="variable">err</span> = <span class="string">'${Math.random()}'</span>;` 
      };
    }
    return {
      id: i,
      isTarget: false,
      code: codeSnippets[i % codeSnippets.length]
    };
  });
};

// --- Game Component ---
export default function PixelGame() {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_TIME);
  const [gameState, setGameState] = useState('idle'); // 'idle', 'running', 'over'
  const [lines, setLines] = useState([]);
  
  useEffect(() => {
    setLines(generateLines());
  }, []); // Generate lines only once on mount

  // Game Timer
  useInterval(() => {
    if (gameState === 'running') {
      setTimeLeft(t => {
        if (t <= 1) {
          setGameState('over');
          return 0;
        }
        return t - 1;
      });
    }
  }, 1000);

  const handleTargetClick = (line) => {
    if (gameState !== 'running' || !line.isTarget) return;
    
    setScore(s => s + 1);
    
    // "Fix" the line and generate new lines
    setLines(prevLines => {
      // Find the clicked line and "fix" it
      const fixedLines = prevLines.map(l => 
        l.id === line.id ? { ...l, isTarget: false, code: `  <span class="comment">// Bug fixed!</span>` } : l
      );
      
      // Add a new target line
      let newTargetLine = Math.floor(Math.random() * (LINES_COUNT - 20)) + 10;
      let bug = `<span class="bug">BUG</span>`;
      fixedLines[newTargetLine] = {
        id: newTargetLine,
        isTarget: true,
        code: `  ${bug} <span class="variable">err</span> = <span class="string">'${Math.random()}'</span>;`
      };
      
      return fixedLines;
    });
  };

  const startGame = () => {
    setScore(0);
    setTimeLeft(GAME_TIME);
    setGameState('running');
    setLines(generateLines()); // Generate a fresh set of lines
  };

  return (
    <GameSection>
      <GameTitle>Code Reflex</GameTitle>
      <GameStats>
        <Stat>Score: <span>{score}</span></Stat>
        <Stat>Time: <span>{timeLeft}</span></Stat>
      </GameStats>

      <CodeTerminal>
        <AnimatePresence>
          {gameState !== 'running' && (
            <Overlay initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {gameState === 'idle' ? (
                <>
                  <HiPlay size="3rem" />
                  <h3>Tap the Buggy Line!</h3>
                  <Button onClick={startGame} whileHover={{ scale: 1.05 }}>
                    Start Game
                  </Button>
                </>
              ) : (
                <>
                  <h3>Game Over!</h3>
                  <p>Final Score: {score}</p>
                  <Button onClick={startGame} whileHover={{ scale: 1.05 }}>
                    <HiRefresh /> Try Again
                  </Button>
                </>
              )}
            </Overlay>
          )}
        </AnimatePresence>

        <CodeScroller $running={gameState === 'running'}>
          {lines.map((line) => (
            <CodeLine
              key={line.id}
              data-target={line.isTarget}
              onClick={() => handleTargetClick(line)}
              dangerouslySetInnerHTML={{ __html: line.code }}
            />
          ))}
        </CodeScroller>
        
      </CodeTerminal>
      <div>Click the highlighted "buggy" line!</div>
    </GameSection>
  );
}