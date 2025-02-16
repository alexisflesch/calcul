import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calculator } from 'lucide-react';


const defaultMultipliers = [3, 4, 5, 6, 7, 8, 9, 10];

interface IndexPageProps {
    startGame: (multipliers: number[], time: number) => void;
    setTimeLeft: (time: number) => void;
    selectedMode: "Multiplications" | "Additions" | "Soustractions" | "Équations" | "Divers";
    setSelectedMode: (mode: "Multiplications" | "Additions" | "Soustractions" | "Équations" | "Divers") => void;
}

export function IndexPage({ startGame, setTimeLeft, selectedMode, setSelectedMode }: IndexPageProps) {
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

    const getBackgroundColor = (mode: "Multiplications" | "Additions" | "Soustractions" | "Équations" | "Divers") => {
        return selectedMode === mode ? "bg-blue-500 border-white" : "bg-white/10 border-white/10"; // Blue for selected mode, light gray for others
    };

    return (
        <div className="min-h-[100dvh] bg-gradient-to-b from-blue-700 to-blue-800 text-white p-4 flex flex-col">
            <div className="w-full h-full max-w-md mx-auto flex flex-col flex-grow">
                <h1 className="text-4xl font-bold mb-8 text-center">Calcul mental</h1>
                <div
                    className={`backdrop-blur-lg rounded-3xl p-6 mb-6 ${getBackgroundColor("Multiplications")} border-4`}
                    onClick={() => setSelectedMode("Multiplications")}
                >
                    <h2 className="text-2xl font-bold mb-4">Multiplications</h2>
                    <div className="grid grid-cols-4 gap-4">
                        {Array.from({ length: 12 }, (_, i) => i + 1).map((number) => (
                            <label key={number} className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={multipliers.includes(number)}
                                    onChange={() => handleCheckboxChange(number)}
                                    disabled={selectedMode !== "Multiplications"} // Disable checkboxes when not in "Multiplications" mode
                                    className="mr-2"
                                />
                                {number}
                            </label>
                        ))}
                    </div>
                </div>
                <div
                    className={`backdrop-blur-lg rounded-3xl p-2 mb-6 ${getBackgroundColor("Additions")} border-4`}
                    onClick={() => setSelectedMode("Additions")}
                >
                    <h2 className="text-2xl font-bold mb-1 mt-1 ml-3">Additions</h2>
                </div>
                <div
                    className={`backdrop-blur-lg rounded-3xl p-2 mb-6 ${getBackgroundColor("Soustractions")} border-4`}
                    onClick={() => setSelectedMode("Soustractions")}
                >
                    <h2 className="text-2xl font-bold mb-1 mt-1 ml-3">Soustractions</h2>
                </div>
                <div
                    className={`backdrop-blur-lg rounded-3xl p-2 mb-6 ${getBackgroundColor("Équations")} border-4`}
                    onClick={() => setSelectedMode("Équations")}
                >
                    <h2 className="text-2xl font-bold mb-1 mt-1 ml-3">Équations</h2>
                </div>
                <div
                    className={`backdrop-blur-lg rounded-3xl p-2 mb-6 ${getBackgroundColor("Divers")} border-4`}
                    onClick={() => setSelectedMode("Divers")}
                >
                    <h2 className="text-2xl font-bold mb-1 mt-1 ml-3">Divers</h2>
                </div>
                <div className="mt-4">
                    <label className="block text-xl font-bold mb-2">Durée (en secondes) : {time}</label>
                    <input
                        type="range"
                        value={time}
                        onChange={(e) => setTime(parseInt(e.target.value, 10))}
                        className="w-full h-12 rounded-2xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors appearance-none"
                        min="30"
                        max="600"
                        step="10"
                    />
                </div>

                <br />
                <button
                    onClick={handleStartGame}
                    className="bg-white text-blue-600 rounded-full px-8 py-4 text-xl font-bold shadow-lg hover:bg-blue-100 transition-colors flex justify-center items-center relative"
                >
                    <Calculator className="w-6 h-6 ml-2 absolute left-4" />
                    <span>Commencer</span>
                </button>


            </div>
        </div>
    );
}
