import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RefreshCw, Star } from 'lucide-react';

interface GameOverProps {
  score: number;
  attempts: number;
  correctAnswers: number;
  onRestart: () => void;
}

export function GameOver({ score, attempts, correctAnswers, onRestart }: GameOverProps) {
  const navigate = useNavigate();
  const percentage = attempts > 0 ? Math.round((correctAnswers / attempts) * 100) : 0;
  const stars = Math.floor(score / 10);

  const handlePlayAgain = () => {
    navigate('/');
  };

  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold mb-4">Time's Up!</h2>

      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 mb-6">
        <div className="text-5xl font-bold mb-2">{percentage}%</div>
        <div className="text-xl mb-4">Accuracy</div>

        <div className="grid grid-cols-2 gap-4 text-center mb-4">
          <div>
            <div className="text-3xl font-bold">{correctAnswers}</div>
            <div className="text-sm opacity-75">Correct</div>
          </div>
          <div>
            <div className="text-3xl font-bold">{attempts}</div>
            <div className="text-sm opacity-75">Total</div>
          </div>
        </div>

        <button
          onClick={handlePlayAgain}
          className="bg-white text-blue-600 rounded-full px-8 py-4 text-xl font-bold shadow-lg hover:bg-blue-100 transition-colors inline-flex items-center gap-2"
        >
          <RefreshCw className="w-6 h-6" />
          Play Again
        </button>
      </div>
    </div>
  );
}