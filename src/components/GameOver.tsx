import React from 'react';
import { RefreshCw, Star } from 'lucide-react';

interface GameOverProps {
  score: number;
  attempts: number;
  onRestart: () => void;
}

export function GameOver({ score, attempts, onRestart }: GameOverProps) {
  const percentage = attempts > 0 ? Math.round((score / attempts) * 100) : 0;
  const stars = Math.floor(score / 5);
  
  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold mb-4">Time's Up!</h2>
      
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 mb-6">
        <div className="text-5xl font-bold mb-2">{percentage}%</div>
        <div className="text-xl mb-4">Accuracy</div>
        
        <div className="grid grid-cols-2 gap-4 text-center mb-4">
          <div>
            <div className="text-3xl font-bold">{score}</div>
            <div className="text-sm opacity-75">Correct</div>
          </div>
          <div>
            <div className="text-3xl font-bold">{attempts}</div>
            <div className="text-sm opacity-75">Total</div>
          </div>
        </div>

        {stars > 0 && (
          <div className="flex flex-wrap justify-center gap-2">
            {[...Array(stars)].map((_, i) => (
              <Star key={i} className="w-6 h-6 text-yellow-300 fill-yellow-300" />
            ))}
          </div>
        )}
      </div>

      <button
        onClick={onRestart}
        className="flex items-center justify-center gap-2 mx-auto bg-white text-purple-600 rounded-full px-8 py-4 text-xl font-bold shadow-lg hover:bg-purple-100 transition-colors"
      >
        <RefreshCw className="w-5 h-5" />
        Play Again
      </button>
    </div>
  );
}