import React from 'react';
import { Delete } from 'lucide-react';

interface NumpadProps {
  onNumber: (num: number) => void;
  onDelete: () => void;
  onEnter: () => void;
  disabled?: boolean;
}

export function Numpad({ onNumber, onDelete, onEnter, disabled }: NumpadProps) {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div className="flex justify-center h-screen mt-5">
      <div className="grid grid-cols-3 gap-3 w-full max-w-[300px] max-h-[200px] mx-auto">
        {numbers.map((num) => (
          <button
            key={num}
            onClick={() => onNumber(num)}
            disabled={disabled}
            className="aspect-square rounded-2xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors flex items-center justify-center text-2xl font-bold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {num}
          </button>
        ))}
        <button
          onClick={onDelete}
          disabled={disabled}
          className="aspect-square rounded-2xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Delete className="w-6 h-6" />
        </button>
        <button
          onClick={() => onNumber(0)} // Ensure the 0 button triggers the onNumber event
          disabled={disabled}
          className="aspect-square rounded-2xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors flex items-center justify-center text-2xl font-bold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          0
        </button>
        <button
          onClick={onEnter}
          disabled={disabled}
          className="aspect-square rounded-2xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors flex items-center justify-center text-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          OK
        </button>
      </div>
    </div>
  );
}
