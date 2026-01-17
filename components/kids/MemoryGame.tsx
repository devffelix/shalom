import React, { useState, useEffect } from 'react';
import { ArrowLeft, RotateCcw, PartyPopper, Crown, Star } from 'lucide-react';

/* --- 3D EMOJI ICONS --- */
const ICONS = [
    { id: 'lion', emoji: '🦁', name: 'Leão', bg: 'from-amber-400 to-orange-500' },
    { id: 'cross', emoji: '✝️', name: 'Cruz', bg: 'from-purple-400 to-indigo-500' },
    { id: 'star', emoji: '⭐', name: 'Estrela', bg: 'from-yellow-400 to-amber-500' },
    { id: 'angel', emoji: '👼', name: 'Anjo', bg: 'from-blue-300 to-cyan-400' },
    { id: 'pray', emoji: '🙏', name: 'Oração', bg: 'from-pink-400 to-rose-500' },
    { id: 'sheep', emoji: '🐑', name: 'Ovelha', bg: 'from-green-400 to-emerald-500' },
    { id: 'dove', emoji: '🕊️', name: 'Pomba', bg: 'from-sky-300 to-blue-400' },
    { id: 'heart', emoji: '❤️', name: 'Amor', bg: 'from-red-400 to-pink-500' },
    { id: 'bible', emoji: '📖', name: 'Bíblia', bg: 'from-indigo-400 to-purple-500' },
    { id: 'rainbow', emoji: '🌈', name: 'Arco-íris', bg: 'from-violet-400 to-fuchsia-500' },
    { id: 'sun', emoji: '☀️', name: 'Sol', bg: 'from-orange-400 to-yellow-400' },
    { id: 'fish', emoji: '🐟', name: 'Peixe', bg: 'from-teal-400 to-cyan-500' },
    { id: 'crown', emoji: '👑', name: 'Coroa', bg: 'from-yellow-500 to-amber-600' },
    { id: 'fire', emoji: '🔥', name: 'Fogo Santo', bg: 'from-orange-500 to-red-500' },
    { id: 'globe', emoji: '🌍', name: 'Mundo', bg: 'from-green-500 to-teal-500' },
    { id: 'gift', emoji: '🎁', name: 'Presente', bg: 'from-rose-400 to-pink-500' },
    { id: 'bread', emoji: '🍞', name: 'Pão', bg: 'from-amber-500 to-orange-400' },
    { id: 'candle', emoji: '🕯️', name: 'Luz', bg: 'from-yellow-500 to-orange-500' },
];

/* --- TYPES --- */
type Card = {
    id: number;
    iconId: string;
    isFlipped: boolean;
    isMatched: boolean;
};

/* --- LEVELS CONFIG --- */
const LEVELS = [
    { level: 1, pairs: 2, cols: 2 }, // 4 cards (Easy)
    { level: 2, pairs: 3, cols: 3 }, // 6 cards
    { level: 3, pairs: 4, cols: 4 }, // 8 cards
    { level: 4, pairs: 6, cols: 3 }, // 12 cards (Grid 3x4)
    { level: 5, pairs: 8, cols: 4 }, // 16 cards (Grid 4x4)
    { level: 6, pairs: 10, cols: 4 }, // 20 cards (Grid 4x5)
    { level: 7, pairs: 12, cols: 4 }, // 24 cards (Grid 4x6)
    { level: 8, pairs: 14, cols: 4 }, // 28 cards (Grid 4x7)
    { level: 9, pairs: 16, cols: 4 }, // 32 cards (Grid 4x8)
    { level: 10, pairs: 18, cols: 4 }, // 36 cards (Grid 4x9)
];

const MemoryGame: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [level, setLevel] = useState(1);
    const [cards, setCards] = useState<Card[]>([]);
    const [flippedCards, setFlippedCards] = useState<number[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isLevelComplete, setIsLevelComplete] = useState(false);
    const [moves, setMoves] = useState(0);

    // Initialize Level
    useEffect(() => {
        startLevel(level);
    }, [level]);

    const startLevel = (lvl: number) => {
        const config = LEVELS[lvl - 1] || LEVELS[0];
        const selectedIcons = ICONS.slice(0, config.pairs);

        // Create pairs
        const gameCards: Card[] = [...selectedIcons, ...selectedIcons].map((item, index) => ({
            id: index,
            iconId: item.id,
            isFlipped: false,
            isMatched: false
        }));

        // Shuffle
        gameCards.sort(() => Math.random() - 0.5);

        setCards(gameCards);
        setFlippedCards([]);
        setIsLevelComplete(false);
        setIsProcessing(false);
        setMoves(0);
    };

    const handleCardClick = (id: number) => {
        // Block clicks if processing, already flipped, or matched
        if (isProcessing || cards.find(c => c.id === id)?.isFlipped || cards.find(c => c.id === id)?.isMatched) return;

        // Flip card
        const newCards = cards.map(c => c.id === id ? { ...c, isFlipped: true } : c);
        setCards(newCards);

        const newFlipped = [...flippedCards, id];
        setFlippedCards(newFlipped);

        // Check match if 2 cards flipped
        if (newFlipped.length === 2) {
            setIsProcessing(true);
            setMoves(moves + 1);
            checkForMatch(newFlipped, newCards);
        }
    };

    const checkForMatch = (flippedIds: number[], currentCards: Card[]) => {
        const [firstId, secondId] = flippedIds;
        const card1 = currentCards.find(c => c.id === firstId);
        const card2 = currentCards.find(c => c.id === secondId);

        if (card1 && card2 && card1.iconId === card2.iconId) {
            // Match!
            setTimeout(() => {
                setCards(prev => prev.map(c =>
                    c.id === firstId || c.id === secondId ? { ...c, isMatched: true, isFlipped: true } : c
                ));
                setFlippedCards([]);
                setIsProcessing(false);
            }, 500);
        } else {
            // No Match
            setTimeout(() => {
                setCards(prev => prev.map(c =>
                    c.id === firstId || c.id === secondId ? { ...c, isFlipped: false } : c
                ));
                setFlippedCards([]);
                setIsProcessing(false);
            }, 1000);
        }
    };

    useEffect(() => {
        if (cards.length > 0 && cards.every(c => c.isMatched)) {
            setIsLevelComplete(true);
        }
    }, [cards]);

    const nextLevel = () => {
        if (level < LEVELS.length) {
            setLevel(level + 1);
        } else {
            // Loop back or end game? Let's just restart level 1 for endless fun
            setLevel(1);
        }
    };

    const getGridClass = () => {
        const cols = LEVELS[level - 1]?.cols || 4;
        switch (cols) {
            case 2: return 'grid-cols-2 max-w-sm';
            case 3: return 'grid-cols-3 max-w-md';
            case 4: return 'grid-cols-4 max-w-2xl'; // Increased max-width for larger grids
            default: return 'grid-cols-4 max-w-2xl';
        }
    };

    const getIconData = (iconId: string) => {
        return ICONS.find(i => i.id === iconId);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 -m-8 p-8 font-kids flex flex-col items-center">
            {/* HEADER */}
            <div className="w-full max-w-2xl flex items-center justify-between mb-8">
                <button onClick={onBack} className="p-3 bg-white rounded-full shadow-lg border-2 border-purple-200 text-purple-500 hover:scale-105 transition-transform">
                    <ArrowLeft size={24} />
                </button>
                <div className="bg-white px-6 py-2 rounded-full shadow-lg border-2 border-purple-200 flex items-center gap-2">
                    <Crown size={20} className="text-purple-500" />
                    <span className="font-bold text-purple-600">Nível {level}</span>
                </div>
                <button onClick={() => startLevel(level)} className="p-3 bg-white rounded-full shadow-lg border-2 border-orange-200 text-orange-500 hover:rotate-180 transition-transform duration-500">
                    <RotateCcw size={24} />
                </button>
            </div>

            {/* TITLE */}
            <div className="text-center mb-8">
                <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-purple-600 to-pink-500 drop-shadow-sm">
                    Jogo da Memória
                </h1>
                <p className="text-purple-500 font-bold text-sm mt-2">Encontre os pares iguais!</p>
            </div>

            {/* GAME GRID */}
            <div className={`grid ${getGridClass()} gap-4 w-full`}>
                {cards.map(card => {
                    const iconData = getIconData(card.iconId);
                    return (
                        <button
                            key={card.id}
                            onClick={() => handleCardClick(card.id)}
                            className={`aspect-square rounded-2xl relative transition-all duration-500 transform ${card.isFlipped ? 'rotate-y-180' : 'hover:scale-105 active:scale-95'
                                }`}
                            style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
                        >
                            {/* Front (Hidden when flipped) */}
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl border-4 border-white shadow-xl flex items-center justify-center backface-hidden z-10">
                                <div className="text-6xl">✨</div>
                            </div>

                            {/* Back (Revealed when flipped) */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${iconData?.bg || 'from-gray-400 to-gray-500'} rounded-2xl border-4 ${card.isMatched ? 'border-yellow-400' : 'border-white'
                                } shadow-xl flex flex-col items-center justify-center backface-hidden rotate-y-180 z-10`}>
                                <div className={`text-6xl md:text-7xl transition-all duration-500 ${card.isMatched ? 'scale-125 animate-bounce' : 'scale-100'
                                    }`}>
                                    {iconData?.emoji}
                                </div>
                                {card.isMatched && (
                                    <div className="absolute inset-0 bg-yellow-300/30 rounded-2xl animate-pulse"></div>
                                )}
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* LEVEL COMPLETE MODAL */}
            {isLevelComplete && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
                    <div className="bg-white rounded-[2rem] p-8 max-w-sm w-full text-center shadow-2xl border-4 border-yellow-300 relative overflow-hidden">
                        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-yellow-300/20 to-transparent"></div>

                        <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6 relative z-10 animate-bounce">
                            <PartyPopper size={48} className="text-yellow-600" />
                        </div>

                        <h2 className="text-3xl font-black text-yellow-500 mb-2">Parabéns!</h2>
                        <p className="text-stone-500 font-bold mb-2">Você completou o Nível {level}!</p>
                        <p className="text-stone-400 text-sm mb-8">Em {moves} jogadas</p>

                        <button
                            onClick={nextLevel}
                            className="w-full bg-gradient-to-r from-green-400 to-emerald-600 text-white font-black py-4 rounded-xl shadow-lg hover:scale-105 transition-transform flex items-center justify-center gap-2 text-lg"
                        >
                            Próximo Nível <Crown size={20} />
                        </button>
                    </div>

                    {/* Confetti Effect */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        {[...Array(20)].map((_, i) => (
                            <div key={i} className="absolute animate-fall" style={{
                                left: `${Math.random() * 100}%`,
                                top: `-${Math.random() * 20}%`,
                                animationDelay: `${Math.random() * 2}s`,
                                fontSize: `${Math.random() * 20 + 10}px`
                            }}>
                                {['✨', '🎉', '⭐', '🌟', '💫'][Math.floor(Math.random() * 5)]}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* GLOBAL STYLES FOR FLIP CARD 3D */}
            <style>{`
        .rotate-y-180 { transform: rotateY(180deg); }
        .backface-hidden { backface-visibility: hidden; }
        @keyframes fall {
          0% { transform: translateY(-20px) rotate(0deg); opacity: 0; }
          20% { opacity: 1; }
          100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
        .animate-fall { animation: fall 3s linear infinite; }
      `}</style>
        </div>
    );
};

export default MemoryGame;
