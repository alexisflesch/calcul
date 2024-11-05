import React, { useState, useEffect } from 'react';
import { Check, X } from 'lucide-react';
import { Streak } from './Streak';
import { Numpad } from './Numpad';

interface GameProps {
  onCorrect: () => void;
  onWrong: () => void;
}

export function Game({ onCorrect, onWrong }: GameProps) {
  const [firstNumber, setFirstNumber] = useState(0);
  const [secondNumber, setSecondNumber] = useState(0);
  const [answer, setAnswer] = useState('');
  const [streak, setStreak] = useState(0);
  const [showFeedback, setShowFeedback] = useState<'correct' | 'wrong' | null>(
    null
  );

  const generateQuestion = () => {
    setFirstNumber(Math.floor(Math.random() * 10) + 1);
    setSecondNumber(Math.floor(Math.random() * 10) + 1);
    setAnswer('');
  };

  useEffect(() => {
    generateQuestion();
  }, []);

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
      setStreak((prev) => prev + 1);
      onCorrect();
      setTimeout(() => {
        setShowFeedback(null);
        generateQuestion();
      }, 500);
    } else {
      setShowFeedback('wrong');
      setStreak(0);
      onWrong();
      setTimeout(() => {
        setShowFeedback(null);
        setAnswer('');
      }, 500);
    }
  };

  return (
    <div className="flex flex-col h-screen max-h-screen justify-between gap-4 overflow-hidden">
      <Streak count={streak} />

      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 relative flex items-center justify-center max-h-[30vh] min-h-[80px] overflow-hidden">
        <div className="text-5xl md:text-6xl font-bold text-center">
          {firstNumber} × {secondNumber} = {answer || '_'}
        </div>

        {showFeedback && (
          <div className="absolute -right-1 -top-1">
            {showFeedback === 'correct' ? (
              <div className="bg-green-500 rounded-full p-2">
                <Check className="w-6 h-6" />
              </div>
            ) : (
              <div className="bg-red-500 rounded-full p-2">
                <X className="w-6 h-6" />
              </div>
            )}
          </div>
        )}
      </div>

      <Numpad
        onNumber={handleNumberInput}
        onDelete={handleDelete}
        onEnter={handleSubmit}
      />
    </div>
  );
}
