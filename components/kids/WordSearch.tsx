import React, { useState, useEffect } from 'react';
import { ArrowLeft, RotateCcw, Trophy, Star, Check } from 'lucide-react';

/* --- TYPES --- */
type Position = { row: number; col: number };
type Direction = 'horizontal' | 'vertical' | 'diagonal' | 'diagonal-reverse';
type Word = {
    word: string;
    start: Position;
    direction: Direction;
    found: boolean;
};

type Level = {
    level: number;
    size: number;
    words: string[];
};

/* --- LEVELS --- */
const LEVELS: Level[] = [
    { level: 1, size: 8, words: ['JESUS', 'AMOR', 'PAZ', 'FÉ', 'DEUS'] },
    { level: 2, size: 10, words: ['ORAÇÃO', 'BÍBLIA', 'ANJO', 'CRUZ', 'GRAÇA', 'LUZ'] },
    { level: 3, size: 12, words: ['SALVAÇÃO', 'PERDÃO', 'ESPÍRITO', 'SANTO', 'MILAGRE', 'GLÓRIA'] },
    { level: 4, size: 12, words: ['ALELUIA', 'AMÉM', 'BENÇÃO', 'LOUVOR', 'ADORAÇÃO', 'VIDA'] },
    { level: 5, size: 14, words: ['ETERNIDADE', 'RESSURREIÇÃO', 'ESPERANÇA', 'VERDADE', 'CAMINHO', 'REINO'] },
];

const WordSearch: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [level, setLevel] = useState(0);
    const [grid, setGrid] = useState<string[][]>([]);
    const [words, setWords] = useState<Word[]>([]);
    const [selectedCells, setSelectedCells] = useState<Position[]>([]);
    const [foundCells, setFoundCells] = useState<Set<string>>(new Set());
    const [isSelecting, setIsSelecting] = useState(false);
    const [hasWon, setHasWon] = useState(false);

    const currentLevel = LEVELS[level];

    useEffect(() => {
        generatePuzzle();
    }, [level]);

    useEffect(() => {
        if (words.length > 0 && words.every(w => w.found)) {
            setHasWon(true);
        }
    }, [words]);

    const generatePuzzle = () => {
        const size = currentLevel.size;
        const newGrid: string[][] = Array(size).fill(null).map(() => Array(size).fill(''));
        const placedWords: Word[] = [];

        // Place each word
        currentLevel.words.forEach(word => {
            let placed = false;
            let attempts = 0;
            const maxAttempts = 100;

            while (!placed && attempts < maxAttempts) {
                const direction: Direction = ['horizontal', 'vertical', 'diagonal', 'diagonal-reverse'][Math.floor(Math.random() * 4)] as Direction;
                const start = getRandomStart(size, word.length, direction);

                if (canPlaceWord(newGrid, word, start, direction)) {
                    placeWord(newGrid, word, start, direction);
                    placedWords.push({ word, start, direction, found: false });
                    placed = true;
                }
                attempts++;
            }
        });

        // Fill empty cells with random letters
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                if (newGrid[i][j] === '') {
                    newGrid[i][j] = letters[Math.floor(Math.random() * letters.length)];
                }
            }
        }

        setGrid(newGrid);
        setWords(placedWords);
        setFoundCells(new Set());
        setSelectedCells([]);
        setHasWon(false);
    };

    const getRandomStart = (size: number, wordLength: number, direction: Direction): Position => {
        let maxRow = size - 1;
        let maxCol = size - 1;

        if (direction === 'horizontal') maxCol = size - wordLength;
        if (direction === 'vertical') maxRow = size - wordLength;
        if (direction === 'diagonal' || direction === 'diagonal-reverse') {
            maxRow = size - wordLength;
            maxCol = size - wordLength;
        }

        return {
            row: Math.floor(Math.random() * (maxRow + 1)),
            col: Math.floor(Math.random() * (maxCol + 1))
        };
    };

    const canPlaceWord = (grid: string[][], word: string, start: Position, direction: Direction): boolean => {
        const positions = getWordPositions(start, word.length, direction);

        return positions.every(pos => {
            if (pos.row < 0 || pos.row >= grid.length || pos.col < 0 || pos.col >= grid[0].length) {
                return false;
            }
            const cell = grid[pos.row][pos.col];
            return cell === '' || cell === word[positions.indexOf(pos)];
        });
    };

    const placeWord = (grid: string[][], word: string, start: Position, direction: Direction) => {
        const positions = getWordPositions(start, word.length, direction);
        positions.forEach((pos, i) => {
            grid[pos.row][pos.col] = word[i];
        });
    };

    const getWordPositions = (start: Position, length: number, direction: Direction): Position[] => {
        const positions: Position[] = [];
        for (let i = 0; i < length; i++) {
            let row = start.row;
            let col = start.col;

            if (direction === 'horizontal') col += i;
            if (direction === 'vertical') row += i;
            if (direction === 'diagonal') { row += i; col += i; }
            if (direction === 'diagonal-reverse') { row += i; col -= i; }

            positions.push({ row, col });
        }
        return positions;
    };

    const handleCellMouseDown = (row: number, col: number) => {
        setIsSelecting(true);
        setSelectedCells([{ row, col }]);
    };

    const handleCellMouseEnter = (row: number, col: number) => {
        if (!isSelecting) return;

        const last = selectedCells[selectedCells.length - 1];
        if (!last) return;

        // Only allow straight lines (horizontal, vertical, diagonal)
        const rowDiff = row - selectedCells[0].row;
        const colDiff = col - selectedCells[0].col;

        const isHorizontal = rowDiff === 0;
        const isVertical = colDiff === 0;
        const isDiagonal = Math.abs(rowDiff) === Math.abs(colDiff);

        if (isHorizontal || isVertical || isDiagonal) {
            const newSelection = getLineSelection(selectedCells[0], { row, col });
            setSelectedCells(newSelection);
        }
    };

    const handleCellMouseUp = () => {
        setIsSelecting(false);
        checkWord();
    };

    const getLineSelection = (start: Position, end: Position): Position[] => {
        const positions: Position[] = [];
        const rowDiff = end.row - start.row;
        const colDiff = end.col - start.col;
        const steps = Math.max(Math.abs(rowDiff), Math.abs(colDiff));

        const rowStep = rowDiff === 0 ? 0 : rowDiff / Math.abs(rowDiff);
        const colStep = colDiff === 0 ? 0 : colDiff / Math.abs(colDiff);

        for (let i = 0; i <= steps; i++) {
            positions.push({
                row: start.row + (rowStep * i),
                col: start.col + (colStep * i)
            });
        }

        return positions;
    };

    const checkWord = () => {
        const selectedWord = selectedCells.map(pos => grid[pos.row][pos.col]).join('');
        const reversedWord = selectedWord.split('').reverse().join('');

        const foundWord = words.find(w =>
            (w.word === selectedWord || w.word === reversedWord) && !w.found
        );

        if (foundWord) {
            // Mark word as found
            setWords(prev => prev.map(w =>
                w.word === foundWord.word ? { ...w, found: true } : w
            ));

            // Add cells to found set
            const newFoundCells = new Set(foundCells);
            selectedCells.forEach(pos => {
                newFoundCells.add(`${pos.row}-${pos.col}`);
            });
            setFoundCells(newFoundCells);
        }

        setSelectedCells([]);
    };

    const resetLevel = () => {
        generatePuzzle();
    };

    const nextLevel = () => {
        if (level < LEVELS.length - 1) {
            setLevel(level + 1);
        } else {
            setLevel(0);
        }
    };

    const isCellSelected = (row: number, col: number): boolean => {
        return selectedCells.some(pos => pos.row === row && pos.col === col);
    };

    const isCellFound = (row: number, col: number): boolean => {
        return foundCells.has(`${row}-${col}`);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-100 via-emerald-100 to-teal-100 -m-8 p-4 md:p-8 font-kids flex flex-col items-center pb-20 md:pb-8">
            {/* HEADER */}
            <div className="w-full max-w-4xl flex items-center justify-between mb-4">
                <button onClick={onBack} className="p-3 bg-white rounded-full shadow-lg border-2 border-green-200 text-green-500 hover:scale-105 transition-transform">
                    <ArrowLeft size={24} />
                </button>
                <div className="bg-white px-6 py-2 rounded-full shadow-lg border-2 border-emerald-200 flex items-center gap-2">
                    <Star size={20} className="text-emerald-500" />
                    <span className="font-bold text-emerald-600">Nível {level + 1}</span>
                </div>
                <button onClick={resetLevel} className="p-3 bg-white rounded-full shadow-lg border-2 border-orange-200 text-orange-500 hover:rotate-180 transition-transform duration-500">
                    <RotateCcw size={24} />
                </button>
            </div>

            {/* TITLE */}
            <div className="text-center mb-4">
                <h1 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-green-600 to-teal-500 drop-shadow-sm">
                    Caça-Palavras
                </h1>
                <p className="text-emerald-500 font-bold text-xs md:text-sm mt-1">🔍 Encontre as palavras escondidas!</p>
            </div>

            <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* GRID */}
                <div className="lg:col-span-2 flex justify-center">
                    <div
                        className="inline-grid gap-1 bg-white p-4 rounded-2xl shadow-xl border-4 border-emerald-200"
                        style={{
                            gridTemplateColumns: `repeat(${currentLevel.size}, minmax(0, 1fr))`,
                            touchAction: 'none',
                            userSelect: 'none'
                        }}
                        onMouseLeave={() => setIsSelecting(false)}
                    >
                        {grid.map((row, rowIndex) =>
                            row.map((letter, colIndex) => (
                                <div
                                    key={`${rowIndex}-${colIndex}`}
                                    onMouseDown={() => handleCellMouseDown(rowIndex, colIndex)}
                                    onMouseEnter={() => handleCellMouseEnter(rowIndex, colIndex)}
                                    onMouseUp={handleCellMouseUp}
                                    onTouchStart={() => handleCellMouseDown(rowIndex, colIndex)}
                                    onTouchEnd={handleCellMouseUp}
                                    className={`
                                        w-8 h-8 md:w-10 md:h-10 flex items-center justify-center
                                        font-black text-sm md:text-base rounded-lg cursor-pointer
                                        transition-all duration-200 select-none
                                        ${isCellFound(rowIndex, colIndex)
                                            ? 'bg-green-400 text-white scale-95'
                                            : isCellSelected(rowIndex, colIndex)
                                                ? 'bg-yellow-300 text-stone-800 scale-105'
                                                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                                        }
                                    `}
                                >
                                    {letter}
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* WORD LIST */}
                <div className="bg-white rounded-2xl p-6 shadow-xl border-4 border-emerald-200 h-fit">
                    <h3 className="font-black text-emerald-600 text-lg mb-4 flex items-center gap-2">
                        📝 Palavras para Encontrar:
                    </h3>
                    <ul className="space-y-2">
                        {words.map((wordObj, index) => (
                            <li
                                key={index}
                                className={`
                                    flex items-center gap-2 p-3 rounded-xl font-bold text-sm md:text-base
                                    transition-all duration-300
                                    ${wordObj.found
                                        ? 'bg-green-100 text-green-700 line-through'
                                        : 'bg-stone-100 text-stone-700'
                                    }
                                `}
                            >
                                {wordObj.found && <Check size={18} className="text-green-600" />}
                                {wordObj.word}
                            </li>
                        ))}
                    </ul>

                    <div className="mt-6 p-4 bg-emerald-50 rounded-xl border-2 border-emerald-200">
                        <p className="text-xs text-emerald-700 font-bold">
                            💡 Dica: Arraste o mouse/dedo sobre as letras para selecionar!
                        </p>
                    </div>
                </div>
            </div>

            {/* WIN MODAL */}
            {hasWon && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
                    <div className="bg-white rounded-[2rem] p-8 max-w-sm w-full text-center shadow-2xl border-4 border-yellow-300 relative overflow-hidden">
                        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-yellow-300/20 to-transparent"></div>

                        <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6 relative z-10 animate-bounce">
                            <Trophy size={48} className="text-yellow-600" />
                        </div>

                        <h2 className="text-3xl font-black text-yellow-500 mb-2">Parabéns!</h2>
                        <p className="text-stone-500 font-bold mb-2">Você encontrou todas as palavras! 🎉</p>
                        <p className="text-emerald-500 text-sm mb-8 italic">Continue buscando a Palavra de Deus!</p>

                        <button
                            onClick={nextLevel}
                            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-black py-4 rounded-xl shadow-lg hover:scale-105 transition-transform flex items-center justify-center gap-2 text-lg"
                        >
                            {level < LEVELS.length - 1 ? 'Próximo Nível' : 'Jogar Novamente'} <Star size={20} />
                        </button>
                    </div>

                    {/* Confetti */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        {[...Array(20)].map((_, i) => (
                            <div key={i} className="absolute animate-fall" style={{
                                left: `${Math.random() * 100}%`,
                                top: `-${Math.random() * 20}%`,
                                animationDelay: `${Math.random() * 2}s`,
                                fontSize: `${Math.random() * 20 + 15}px`
                            }}>
                                {['✨', '⭐', '💫', '🌟', '📖'][Math.floor(Math.random() * 5)]}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <style>{`
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

export default WordSearch;
