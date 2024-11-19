import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Numpad } from './Numpad';

interface GameProps {
  onCorrect: () => void;
  onWrong: () => void;
  debug: boolean;
  streak: number;
  multipliers: number[];
  selectedMode: "Multiplications" | "Additions" | "Soustractions" | "Équations";
}

export function Game({ onCorrect, onWrong, streak, multipliers, selectedMode }: GameProps) {
  const [equation, setEquation] = useState('');
  const [shownEquation, setShownEquation] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [userAnswer, setUserAnswer] = useState('');
  const [pointsScored, setPointsScored] = useState<number | null>(null);
  const [showRedCross, setShowRedCross] = useState(false);



  useEffect(() => {
    generateQuestion();
  }, []);  // This runs only once when the component is mounted

  useEffect(() => {
    // This ensures that shownEquation is updated whenever equation changes
    setShownEquation(equation);
  }, [equation]);

  const generateQuestion = () => {
    let randomFirstNumber = 0;
    let randomSecondNumber = 0;

    if (selectedMode === 'Additions') {
      // Pick two random numbers between 1 and 12. Lower probability for 1 and 2
      if (Math.random() < .3) {
        randomFirstNumber = Math.floor(Math.random() * 12) + 1;
        randomSecondNumber = Math.floor(Math.random() * 12) + 1;
      }
      else {
        randomFirstNumber = Math.floor(Math.random() * 10) + 3;
        randomSecondNumber = Math.floor(Math.random() * 10) + 3;
      }
      setEquation(`${randomFirstNumber} + ${randomSecondNumber} = _`);
      setCorrectAnswer((randomFirstNumber + randomSecondNumber).toString());
      setShownEquation(equation);
    } else if (selectedMode === 'Multiplications') {
      // Pick random numbers from the multipliers array
      randomFirstNumber = multipliers[Math.floor(Math.random() * multipliers.length)];
      randomSecondNumber = multipliers[Math.floor(Math.random() * multipliers.length)];
      setEquation(`${randomFirstNumber} × ${randomSecondNumber} = _`);
      setCorrectAnswer((randomFirstNumber * randomSecondNumber).toString());
    }
    else if (selectedMode === 'Soustractions') {
      //Pick a random number between 1 and 12, 1 with a lower probability
      if (Math.random() < .3) {
        randomFirstNumber = Math.floor(Math.random() * 12) + 1;
      }
      else {
        randomFirstNumber = Math.floor(Math.random() * 10) + 3;
      }
      randomSecondNumber = Math.floor(Math.random() * randomFirstNumber);
      setEquation(`${randomFirstNumber} - ${randomSecondNumber} = _`);
      setCorrectAnswer((randomFirstNumber - randomSecondNumber).toString());
    }
    else if (selectedMode === 'Équations') {
      //Randomly creates an addition or substraction
      if (Math.random() < .5) {
        // Addition
        randomFirstNumber = Math.floor(Math.random() * 12) + 1;
        randomSecondNumber = Math.floor(Math.random() * randomFirstNumber);
        setEquation(`${randomFirstNumber} = ${randomSecondNumber} +  _`);
        setCorrectAnswer((randomFirstNumber - randomSecondNumber).toString());
      }
      else {
        // Substraction
        randomFirstNumber = Math.floor(Math.random() * 12) + 1;
        randomSecondNumber = Math.floor(Math.random() * randomFirstNumber);
        setEquation(`${randomSecondNumber} = ${randomFirstNumber} -  _`);
        setCorrectAnswer((randomFirstNumber - randomSecondNumber).toString());
      }
      setShownEquation(equation);
    }
  };


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
    if (userAnswer.length < 3) {
      const newAnswer = userAnswer + num;
      setUserAnswer(newAnswer);
      setShownEquation(equation.replace('_', newAnswer));  // Update shownEquation dynamically
    }
  };

  const handleDelete = () => {
    const newAnswer = userAnswer.slice(0, -1);
    setUserAnswer(newAnswer);
    setShownEquation(equation.replace('_', newAnswer));  // Update shownEquation dynamically
  };

  const handleSubmit = () => {
    if (userAnswer === correctAnswer) {
      handleCorrectAnswer();
      setTimeout(() => {
        generateQuestion();
      }, 100);
    } else {
      handleWrongAnswer();
      setTimeout(() => {
      }, 1000);
    }
    setUserAnswer('');
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
          {shownEquation}
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
