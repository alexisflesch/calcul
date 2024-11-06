import React, { useState, useEffect } from 'react';
import { useLocation, Routes, Route } from 'react-router-dom';
import { Timer, Calculator } from 'lucide-react';
import { Game } from './components/Game';
import { GameOver } from './components/GameOver';
import { Streak } from './components/Streak';
import { IndexPage } from './components/IndexPage';

function App() {
  const [gameActive, setGameActive] = useState(false);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [initialTime, setInitialTime] = useState(60);
  const [streak, setStreak] = useState(0);
  const [pointsScored, setPointsScored] = useState<number | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [multipliers, setMultipliers] = useState<number[]>([3, 4, 5, 6, 7, 8, 9, 10]);
  const [selectedMode, setSelectedMode] = useState<"Multiplications" | "Additions">("Multiplications"); // Track selected mode


  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.multipliers) {
      setMultipliers(location.state.multipliers);
      console.log('Multipliers set from location state:', location.state.multipliers);
    }
  }, [location.state]);

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

  useEffect(() => {
    if (pointsScored !== null) {
      const timer = setTimeout(() => {
        setPointsScored(null);
      }, 1000); // Hide the points scored text after 1 second
      return () => clearTimeout(timer);
    }
  }, [pointsScored]);

  const startGame = (selectedMultipliers: number[], time: number) => {
    console.log('Starting game with multipliers:', selectedMultipliers);
    setGameActive(true);
    setScore(0);
    setAttempts(0);
    setStreak(0);
    setTimeLeft(time);
    setInitialTime(time);
    setCorrectAnswers(0);
    setMultipliers(selectedMultipliers);
  };

  const handleCorrectAnswer = () => {
    setAttempts((prev) => prev + 1);
    setStreak((prev) => prev + 1);
    setCorrectAnswers((prev) => prev + 1);

    let points = 1;
    if (streak >= 9) {
      points = 3; // Big streak
    } else if (streak >= 4) {
      points = 2; // Small streak
    }
    setPointsScored(points);
    setScore((prev) => prev + points);
  };

  const handleWrongAnswer = () => {
    setAttempts((prev) => prev + 1);
    setStreak(0);
  };

  return (
    <Routes>
      <Route path="/" element={<IndexPage startGame={startGame} setTimeLeft={setTimeLeft} selectedMode={selectedMode} setSelectedMode={setSelectedMode} />} />
      <Route path="/game" element={
        <div className="h-[100dvh] bg-gradient-to-b from-blue-700 to-blue-800 text-white p-4 flex flex-col">
          <div className="w-full h-full max-w-md mx-auto flex flex-col">
            <div className="flex justify-between items-center gap-4 mb-2">
              <div className="flex items-center gap-2 text-xl font-bold">
                <Timer className="w-6 h-6" />
                {timeLeft}s
              </div>
              <div className="relative text-2xl font-bold">
                {score}
                {pointsScored !== null && (
                  <div className="absolute top-0 left-full ml-2 animate-fly-up text-green-500">
                    +{pointsScored}
                  </div>
                )}
              </div>
              {gameActive && <Streak count={streak} />}
            </div>
            <div className="flex-1 flex flex-col justify-between min-h-0 pb-safe">
              {gameActive && (
                <Game
                  onCorrect={handleCorrectAnswer}
                  onWrong={handleWrongAnswer}
                  streak={streak}
                  multipliers={multipliers}
                  debug={false}
                  selectedMode={selectedMode}
                />
              )}
              {!gameActive && timeLeft === 0 && (
                <GameOver
                  score={score}
                  attempts={attempts}
                  correctAnswers={correctAnswers}
                  initialTime={initialTime}
                  multipliers={multipliers}
                  selectedMode={selectedMode}
                  onRestart={() => startGame(multipliers, initialTime)}
                />
              )}
            </div>
          </div>
        </div>
      } />
    </Routes>
  );
}

export default App;