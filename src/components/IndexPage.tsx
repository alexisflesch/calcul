import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const defaultMultipliers = [3, 4, 5, 6, 7, 8, 9, 10];

interface IndexPageProps {
    startGame: (multipliers: number[], time: number) => void;
    setTimeLeft: (time: number) => void;
}

export function IndexPage({ startGame, setTimeLeft }: IndexPageProps) {
    const [multipliers, setMultipliers] = useState<number[]>(defaultMultipliers);
    const [time, setTime] = useState(60);
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
        startGame(multipliers, time);
        setTimeLeft(time);
        navigate('/game');
    };

    return (
        <div className="h-[100dvh] bg-gradient-to-b from-blue-700 to-blue-800 text-white p-4 flex flex-col">
            <div className="w-full h-full max-w-md mx-auto flex flex-col">
                <h1 className="text-4xl font-bold mb-8 text-center">Calcul mental</h1>
                <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 mb-6">
                    <h2 className="text-2xl font-bold mb-4">Tables</h2>
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
                    <div className="mt-4">
                        <label className="block text-xl font-bold mb-2">Durée (en secondes) :</label>
                        <input
                            type="number"
                            value={time}
                            onChange={(e) => setTime(parseInt(e.target.value, 10))}
                            className="w-full h-12 p-5 aspect-square rounded-2xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors flex items-center justify-center text-2xl font-bold"
                            min="10"
                            max="300"
                        />
                    </div>
                </div>
                <button
                    onClick={handleStartGame}
                    className="bg-white text-blue-600 rounded-full px-8 py-4 text-xl font-bold shadow-lg hover:bg-blue-100 transition-colors"
                >
                    Commencer
                </button>
            </div>
        </div>
    );
}