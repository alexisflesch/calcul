import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const defaultMultipliers = [3, 4, 5, 6, 7, 8, 9, 10];

interface IndexPageProps {
    startGame: (multipliers: number[]) => void;
}

export function IndexPage({ startGame }: IndexPageProps) {
    const [multipliers, setMultipliers] = useState<number[]>(defaultMultipliers);
    const navigate = useNavigate();

    const handleCheckboxChange = (number: number) => {
        setMultipliers((prev) =>
            prev.includes(number)
                ? prev.filter((n) => n !== number)
                : [...prev, number]
        );
    };

    const handleStartGame = () => {
        console.log('Starting game with multipliers:', multipliers);
        startGame(multipliers);
        navigate('/game');
    };

    return (
        <div className="h-[100dvh] bg-gradient-to-b from-blue-700 to-blue-800 text-white p-4 flex flex-col">
            <div className="w-full h-full max-w-md mx-auto flex flex-col">
                <h1 className="text-4xl font-bold mb-8 text-center">Math Practice</h1>
                <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 mb-6">
                    <h2 className="text-2xl font-bold mb-4">Select Multipliers</h2>
                    <div className="grid grid-cols-4 gap-4">
                        {Array.from({ length: 12 }, (_, i) => i + 1).map((number) => (
                            <label key={number} className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={multipliers.includes(number)}
                                    onChange={() => handleCheckboxChange(number)}
                                    className="mr-2"
                                />
                                {number}
                            </label>
                        ))}
                    </div>
                </div>
                <button
                    onClick={handleStartGame}
                    className="bg-white text-blue-600 rounded-full px-8 py-4 text-xl font-bold shadow-lg hover:bg-blue-100 transition-colors"
                >
                    Start Game
                </button>
            </div>
        </div>
    );
}