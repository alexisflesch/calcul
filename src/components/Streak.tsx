import React, { useEffect, useState } from 'react';
import { Star } from 'lucide-react';

interface StreakProps {
  count: number;
  debug: boolean;
}

export function Streak({ count, debug }: StreakProps) {
  const [showStars, setShowStars] = useState(false);
  const starCount = Math.floor(count / 5);

  useEffect(() => {
    if (debug || (count > 0 && count % 5 === 0)) {
      setShowStars(true);
      setTimeout(() => setShowStars(false), 3000);
    }
  }, [count, debug]);

  return (
    <div className="relative w-full mb-6">
      {showStars && (
        <div className="absolute inset-x-0 -top-4">
          {[...Array(starCount)].map((_, i) => (
            <div
              key={i}
              className="absolute left-1/2 animate-float"
              style={{
                transform: `translateX(${
                  -50 + (i - (starCount - 1) / 2) * 30
                }%)`,
                animationDelay: `${i * 0.1}s`,
              }}
            >
              <div className="animate-spin-slow">
                <Star className="w-12 h-12 text-yellow-300 fill-yellow-300" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
