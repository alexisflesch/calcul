import React, { useState, useEffect } from 'react';
import { Timer, Calculator } from 'lucide-react';
import { Game } from './components/Game';
import { GameOver } from './components/GameOver';

export default function App() {
  const [gameActive, setGameActive] = useState(false);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [streak, setStreak] = useState(0);  // Track streak count
  const [debug, setDebug] = useState(false);

  useEffect(() => {
    if (gameActive && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setGameActive(false);
    }
  }, [gameActive, timeLeft]);

  const startGame = () => {
    setGameActive(true);
    setScore(0);
    setAttempts(0);
    setStreak(0); // Reset streak at the start
    setTimeLeft(60);
  };

  const handleCorrectAnswer = () => {
    setScore((prev) => prev + 1);
    setAttempts((prev) => prev + 1);
    setStreak((prev) => prev + 1); // Increment streak
  };

  const handleWrongAnswer = () => {
    setAttempts((prev) => prev + 1);
    setStreak(0); // Reset streak on wrong answer
  };

  return (
    <div className="h-[100dvh] bg-gradient-to-b from-blue-700 to-blue-800 text-white p-4 flex flex-col">
      <div className="w-full h-full max-w-md mx-auto flex flex-col">
        <div className="flex justify-between items-center gap-4 mb-2">
          <div className="flex items-center gap-2 text-xl font-bold">
            <Timer className="w-6 h-6" />
            {timeLeft}s
          </div>
          {gameActive && (
            <div className="text-xl font-bold text-center flex-1">
              Streak: {streak} {/* Display streak count */}
            </div>
          )}
          <div className="text-xl font-bold">
            {score}/{attempts}
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-between min-h-0 pb-safe">
          {!gameActive && timeLeft === 60 && (
            <div className="text-center my-auto">
              <h1 className="text-4xl font-bold mb-8">Math Practice</h1>
              <button
                onClick={startGame}
                className="bg-white text-blue-600 rounded-full px-8 py-4 text-xl font-bold shadow-lg hover:bg-purple-100 transition-colors inline-flex items-center gap-2"
              >
                <Calculator className="w-6 h-6" />
                Start Game
              </button>
            </div>
          )}

          {gameActive && (
            <Game 
              onCorrect={handleCorrectAnswer} 
              onWrong={handleWrongAnswer} 
              debug={debug} 
              streak={streak}  // Pass streak to Game
            />
          )}

          {!gameActive && timeLeft === 0 && (
            <GameOver
              score={score}
              attempts={attempts}
              onRestart={startGame}
            />
          )}
        </div>
      </div>
    </div>
  );
}
