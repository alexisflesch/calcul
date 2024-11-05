import React from 'react';
import { Flame } from 'lucide-react';

interface StreakProps {
  count: number;
}

export function Streak({ count }: StreakProps) {
  let flameColor = 'text-gray-400'; // Default gray color

  if (count >= 10) {
    flameColor = 'text-red-600 fill-current'; // Fully-lit color with fill
  } else if (count >= 5) {
    flameColor = 'text-orange-400'; // Semi-lit color
  }

  return (
    <div className="flex items-center gap-2 text-xl font-bold">
      <Flame className={`w-6 h-6 ${flameColor}`} />
      {count}
    </div>
  );
}
