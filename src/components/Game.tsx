import React, { useState, useEffect } from 'react';
import { Check, X } from 'lucide-react';
import { Numpad } from './Numpad';

interface GameProps {
  onCorrect: () => void;
  onWrong: () => void;
  debug: boolean;
  streak: number;
  multipliers: number[];
}

export function Game({ onCorrect, onWrong, debug, streak, multipliers }: GameProps) {
  const [firstNumber, setFirstNumber] = useState(0);
  const [secondNumber, setSecondNumber] = useState(0);
  const [answer, setAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState<string | null>(null);
  const [pointsScored, setPointsScored] = useState<number | null>(null);
  const [showRedCross, setShowRedCross] = useState(false);

  const generateQuestion = () => {
    // Pick random numbers from the multipliers array
    const randomFirstNumber = multipliers[Math.floor(Math.random() * multipliers.length)];
    const randomSecondNumber = multipliers[Math.floor(Math.random() * multipliers.length)];
    setFirstNumber(randomFirstNumber);
    setSecondNumber(randomSecondNumber);
    setAnswer('');
  };

  useEffect(() => {
    generateQuestion();
  }, []);

  useEffect(() => {
    if (pointsScored !== null) {
      const timer = setTimeout(() => {
        setPointsScored(null);
      }, 1000); // Hide the points scored text after 1 second
      return () => clearTimeout(timer);
    }
  }, [pointsScored]);

  useEffect(() => {
    if (showRedCross) {
      const timer = setTimeout(() => {
        setShowRedCross(false);
      }, 1000); // Hide the red cross after 1 second
      return () => clearTimeout(timer);
    }
  }, [showRedCross]);

  const handleNumberInput = (num: number) => {
    if (answer.length < 3) {
      setAnswer((prev) => prev + num);
    }
  };

  const handleDelete = () => {
    setAnswer((prev) => prev.slice(0, -1));
  };

  const handleSubmit = () => {
    const correctAnswer = firstNumber * secondNumber;
    const userAnswer = parseInt(answer, 10);

    if (userAnswer === correctAnswer) {
      setShowFeedback('correct');
      handleCorrectAnswer();
      setTimeout(() => {
        setShowFeedback(null);
        generateQuestion();
      }, 100);
    } else {
      setShowFeedback('wrong');
      handleWrongAnswer();
      setTimeout(() => {
        setShowFeedback(null);
        setAnswer('');
      }, 1000);
    }
  };

  const handleCorrectAnswer = () => {
    let points = 1;
    if (streak >= 9) {
      points = 3; // Big streak
    } else if (streak >= 4) {
      points = 2; // Small streak
    }
    setPointsScored(points);
    onCorrect();
  };

  const handleWrongAnswer = () => {
    setShowRedCross(true);
    onWrong();
  };

  return (
    <div className="flex flex-col h-screen max-h-screen justify-between gap-4 overflow-hidden">
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 relative flex items-center justify-center max-h-[30vh] min-h-[80px] overflow-hidden">
        <div className="text-5xl md:text-6xl font-bold text-center">
          {firstNumber} × {secondNumber} = {answer || '_'}
        </div>
      </div>


      {showRedCross && (
        <div className="absolute inset-0 flex items-start justify-center mt-0 z-50">
          <X className="text-red-600" style={{ width: '200px', height: '200px' }} />
        </div>
      )}


      <Numpad
        onNumber={handleNumberInput}
        onDelete={handleDelete}
        onEnter={handleSubmit}
      />
    </div>
  );
}
