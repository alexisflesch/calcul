import React from 'react';
import { Flame } from 'lucide-react';

interface StreakProps {
  count: number;
}

export function Streak({ count }: StreakProps) {
  // Define default colors for fill and stroke
  let fillColorOuter = 'fill-gray-400';
  let strokeColorOuter = 'white';
  let fillColorInner = 'fill-yellow-400';
  let strokeColorInner = 'stroke-yellow-400';

  // Change colors based on count
  if (count >= 10) {
    fillColorOuter = 'fill-orange-600';
    // strokeColorOuter = 'stroke-orange-600';
    fillColorInner = 'fill-red-600';
    strokeColorInner = 'stroke-red-600';
  } else if (count >= 5) {
    fillColorOuter = 'fill-yellow-500';
    // strokeColorOuter = 'stroke-yellow-500';
    fillColorInner = 'fill-orange-500';
    strokeColorInner = 'stroke-orange-500';
  }

  return (
    <div className="flex items-center gap-2 text-xl font-bold">
      {/* Outer flame */}
      <div className="relative w-7 h-7">
        <Flame
          className={`absolute top-0 left-0 w-full h-full ${fillColorOuter} ${strokeColorOuter}`}
        />

        {/* Inner flame, slightly smaller */}
        <Flame
          className={`w-3 h-3 ${fillColorInner} ${strokeColorInner}`}
          style={{ position: 'absolute', top: '40%', left: '35%' }}
        />
      </div>

      {count}
    </div>
  );
}
