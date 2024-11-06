import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RefreshCw, Star } from 'lucide-react';

interface GameOverProps {
  score: number;
  attempts: number;
  correctAnswers: number;
  initialTime: number;
  multipliers: number[];
  selectedMode: "Multiplications" | "Additions";
  onRestart: () => void;
}

export function GameOver({ score, attempts, correctAnswers, initialTime, multipliers, onRestart, selectedMode }: GameOverProps) {
  const navigate = useNavigate();
  const [buttonEnabled, setButtonEnabled] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setButtonEnabled(true);
    }, 2000); // Enable the button after 2 seconds

    return () => clearTimeout(timer);
  }, []);

  const handlePlayAgain = () => {
    navigate('/');
  };

  const percentage = attempts > 0 ? Math.round((correctAnswers / attempts) * 100) : 0;
  const stars = Math.floor(score / 10);

  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold mb-4">Terminé !</h2>

      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 mb-6">
        <div className="text-5xl font-bold mb-2">{percentage}%</div>
        <div className="text-xl mb-4">Précision</div>

        <div className="grid grid-cols-5 gap-4 text-center mb-4">
          <div>
            <div className="text-3xl font-bold">{correctAnswers}</div>
            <div className="text-sm opacity-75">Correct</div>
          </div>
          <div>
            <div className="text-3xl font-bold">{attempts}</div>
            <div className="text-sm opacity-75">Total</div>
          </div>
          <div>
            <div className="text-3xl font-bold">{Math.round(correctAnswers * 60 / initialTime)}</div>
            <div className="text-sm opacity-75">{selectedMode == "Additions" ? "Add" : "Mult"}  /min</div>
          </div>
          <div>
            <div className="text-3xl font-bold">{score}</div>
            <div className="text-sm opacity-75">Points</div>
          </div>
          <div>
            <div className="text-3xl font-bold">{initialTime}</div>
            <div className="text-sm opacity-75">Temps</div>
          </div>
        </div>
        <br />

        <div className="text-2xl mb-4 ml-3 text-left font-bold">
          {selectedMode === 'Multiplications' ?
            <span>Tables : {multipliers.join(', ')}.</span>
            :
            <span>Additions</span>}
        </div>

        <br />
        <button
          onClick={handlePlayAgain}
          className={`bg-white text-blue-600 rounded-full px-8 py-4 text-xl font-bold shadow-lg transition-colors inline-flex items-center gap-2 ${buttonEnabled ? 'hover:bg-blue-100' : 'opacity-50 cursor-not-allowed'}`}
          disabled={!buttonEnabled}
        >
          <RefreshCw className="w-6 h-6" />
          Rejouer
        </button>
      </div>
    </div>
  );
}