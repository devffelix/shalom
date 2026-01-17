import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, RotateCcw, Trophy, Heart, Star } from 'lucide-react';

/* --- TYPES --- */
type Point = { x: number; y: number };
type Maze = {
    level: number;
    start: Point;
    end: Point;
    obstacles: { x: number; y: number; width: number; height: number }[];
    difficulty: 'easy' | 'medium' | 'hard';
};

/* --- MAZE LEVELS (10 LEVELS) --- */
const MAZES: Maze[] = [
    {
        level: 1,
        difficulty: 'easy',
        start: { x: 10, y: 50 },
        end: { x: 90, y: 50 },
        obstacles: [
            { x: 25, y: 10, width: 3, height: 35 },
            { x: 25, y: 55, width: 3, height: 35 },
            { x: 50, y: 25, width: 3, height: 50 },
            { x: 75, y: 10, width: 3, height: 35 },
            { x: 75, y: 55, width: 3, height: 35 },
        ]
    },
    {
        level: 2,
        difficulty: 'easy',
        start: { x: 10, y: 10 },
        end: { x: 90, y: 90 },
        obstacles: [
            { x: 20, y: 20, width: 3, height: 40 },
            { x: 35, y: 0, width: 3, height: 50 },
            { x: 35, y: 65, width: 3, height: 35 },
            { x: 50, y: 30, width: 3, height: 50 },
            { x: 65, y: 0, width: 3, height: 50 },
            { x: 65, y: 65, width: 3, height: 35 },
            { x: 80, y: 20, width: 3, height: 40 },
        ]
    },
    {
        level: 3,
        difficulty: 'medium',
        start: { x: 50, y: 10 },
        end: { x: 50, y: 90 },
        obstacles: [
            { x: 15, y: 20, width: 25, height: 3 },
            { x: 65, y: 20, width: 25, height: 3 },
            { x: 10, y: 35, width: 30, height: 3 },
            { x: 65, y: 35, width: 30, height: 3 },
            { x: 15, y: 50, width: 25, height: 3 },
            { x: 65, y: 50, width: 25, height: 3 },
            { x: 10, y: 65, width: 30, height: 3 },
            { x: 65, y: 65, width: 30, height: 3 },
            { x: 20, y: 80, width: 20, height: 3 },
            { x: 65, y: 80, width: 20, height: 3 },
        ]
    },
    {
        level: 4,
        difficulty: 'medium',
        start: { x: 10, y: 50 },
        end: { x: 90, y: 50 },
        obstacles: [
            { x: 18, y: 10, width: 3, height: 30 },
            { x: 18, y: 60, width: 3, height: 30 },
            { x: 30, y: 25, width: 3, height: 50 },
            { x: 42, y: 10, width: 3, height: 35 },
            { x: 42, y: 55, width: 3, height: 35 },
            { x: 54, y: 20, width: 3, height: 60 },
            { x: 66, y: 10, width: 3, height: 35 },
            { x: 66, y: 55, width: 3, height: 35 },
            { x: 78, y: 25, width: 3, height: 50 },
        ]
    },
    {
        level: 5,
        difficulty: 'medium',
        start: { x: 10, y: 10 },
        end: { x: 90, y: 90 },
        obstacles: [
            { x: 20, y: 0, width: 3, height: 45 },
            { x: 20, y: 60, width: 3, height: 40 },
            { x: 35, y: 15, width: 3, height: 70 },
            { x: 50, y: 0, width: 3, height: 50 },
            { x: 50, y: 65, width: 3, height: 35 },
            { x: 65, y: 15, width: 3, height: 70 },
            { x: 80, y: 0, width: 3, height: 45 },
            { x: 80, y: 60, width: 3, height: 40 },
        ]
    },
    {
        level: 6,
        difficulty: 'hard',
        start: { x: 50, y: 10 },
        end: { x: 50, y: 90 },
        obstacles: [
            { x: 10, y: 18, width: 35, height: 3 },
            { x: 60, y: 18, width: 35, height: 3 },
            { x: 15, y: 30, width: 25, height: 3 },
            { x: 65, y: 30, width: 25, height: 3 },
            { x: 10, y: 42, width: 35, height: 3 },
            { x: 60, y: 42, width: 35, height: 3 },
            { x: 15, y: 54, width: 25, height: 3 },
            { x: 65, y: 54, width: 25, height: 3 },
            { x: 10, y: 66, width: 35, height: 3 },
            { x: 60, y: 66, width: 35, height: 3 },
            { x: 20, y: 78, width: 20, height: 3 },
            { x: 65, y: 78, width: 20, height: 3 },
        ]
    },
    {
        level: 7,
        difficulty: 'hard',
        start: { x: 10, y: 50 },
        end: { x: 90, y: 50 },
        obstacles: [
            { x: 15, y: 5, width: 3, height: 40 },
            { x: 15, y: 55, width: 3, height: 40 },
            { x: 25, y: 20, width: 3, height: 60 },
            { x: 35, y: 5, width: 3, height: 40 },
            { x: 35, y: 55, width: 3, height: 40 },
            { x: 45, y: 15, width: 3, height: 70 },
            { x: 55, y: 5, width: 3, height: 40 },
            { x: 55, y: 55, width: 3, height: 40 },
            { x: 65, y: 20, width: 3, height: 60 },
            { x: 75, y: 5, width: 3, height: 40 },
            { x: 75, y: 55, width: 3, height: 40 },
            { x: 85, y: 25, width: 3, height: 50 },
        ]
    },
    {
        level: 8,
        difficulty: 'hard',
        start: { x: 10, y: 10 },
        end: { x: 90, y: 90 },
        obstacles: [
            { x: 18, y: 0, width: 3, height: 40 },
            { x: 18, y: 60, width: 3, height: 40 },
            { x: 28, y: 15, width: 3, height: 70 },
            { x: 38, y: 0, width: 3, height: 50 },
            { x: 38, y: 65, width: 3, height: 35 },
            { x: 48, y: 10, width: 3, height: 80 },
            { x: 58, y: 0, width: 3, height: 50 },
            { x: 58, y: 65, width: 3, height: 35 },
            { x: 68, y: 15, width: 3, height: 70 },
            { x: 78, y: 0, width: 3, height: 40 },
            { x: 78, y: 60, width: 3, height: 40 },
        ]
    },
    {
        level: 9,
        difficulty: 'hard',
        start: { x: 50, y: 10 },
        end: { x: 50, y: 90 },
        obstacles: [
            { x: 8, y: 15, width: 30, height: 3 },
            { x: 65, y: 15, width: 30, height: 3 },
            { x: 12, y: 25, width: 25, height: 3 },
            { x: 68, y: 25, width: 25, height: 3 },
            { x: 8, y: 35, width: 30, height: 3 },
            { x: 65, y: 35, width: 30, height: 3 },
            { x: 12, y: 45, width: 25, height: 3 },
            { x: 68, y: 45, width: 25, height: 3 },
            { x: 8, y: 55, width: 30, height: 3 },
            { x: 65, y: 55, width: 30, height: 3 },
            { x: 12, y: 65, width: 25, height: 3 },
            { x: 68, y: 65, width: 25, height: 3 },
            { x: 8, y: 75, width: 30, height: 3 },
            { x: 65, y: 75, width: 30, height: 3 },
            { x: 15, y: 85, width: 20, height: 3 },
            { x: 70, y: 85, width: 20, height: 3 },
        ]
    },
    {
        level: 10,
        difficulty: 'hard',
        start: { x: 10, y: 50 },
        end: { x: 90, y: 50 },
        obstacles: [
            { x: 12, y: 0, width: 3, height: 35 },
            { x: 12, y: 65, width: 3, height: 35 },
            { x: 20, y: 15, width: 3, height: 70 },
            { x: 28, y: 0, width: 3, height: 40 },
            { x: 28, y: 60, width: 3, height: 40 },
            { x: 36, y: 10, width: 3, height: 80 },
            { x: 44, y: 0, width: 3, height: 45 },
            { x: 44, y: 55, width: 3, height: 45 },
            { x: 52, y: 5, width: 3, height: 90 },
            { x: 60, y: 0, width: 3, height: 45 },
            { x: 60, y: 55, width: 3, height: 45 },
            { x: 68, y: 10, width: 3, height: 80 },
            { x: 76, y: 0, width: 3, height: 40 },
            { x: 76, y: 60, width: 3, height: 40 },
            { x: 84, y: 15, width: 3, height: 70 },
        ]
    },
];

const MazeGame: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [level, setLevel] = useState(0);
    const [isDrawing, setIsDrawing] = useState(false);
    const [path, setPath] = useState<Point[]>([]);
    const [hasWon, setHasWon] = useState(false);
    const [hasFailed, setHasFailed] = useState(false);
    const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

    const currentMaze = MAZES[level];

    useEffect(() => {
        updateCanvasSize();
        window.addEventListener('resize', updateCanvasSize);
        return () => window.removeEventListener('resize', updateCanvasSize);
    }, []);

    useEffect(() => {
        drawMaze();
    }, [level, path, canvasSize]);

    const updateCanvasSize = () => {
        const container = canvasRef.current?.parentElement;
        if (container) {
            // Increased size for mobile - more space
            const width = Math.min(container.clientWidth - 16, 700);
            const height = Math.min(width * 1.1, 600); // Taller canvas
            setCanvasSize({ width, height });
        }
    };

    const drawMaze = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw background gradient
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, '#fef3c7');
        gradient.addColorStop(1, '#fde68a');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw obstacles
        ctx.fillStyle = '#7c3aed';
        ctx.shadowColor = 'rgba(124, 58, 237, 0.3)';
        ctx.shadowBlur = 10;
        currentMaze.obstacles.forEach(obs => {
            const x = (obs.x / 100) * canvas.width;
            const y = (obs.y / 100) * canvas.height;
            const w = (obs.width / 100) * canvas.width;
            const h = (obs.height / 100) * canvas.height;

            ctx.beginPath();
            ctx.roundRect(x, y, w, h, 8);
            ctx.fill();
        });
        ctx.shadowBlur = 0;

        // Draw path
        if (path.length > 0) {
            ctx.strokeStyle = '#3b82f6';
            ctx.lineWidth = 10; // Thicker line for better visibility
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.shadowColor = 'rgba(59, 130, 246, 0.5)';
            ctx.shadowBlur = 15;

            ctx.beginPath();
            ctx.moveTo(path[0].x, path[0].y);
            path.forEach(point => ctx.lineTo(point.x, point.y));
            ctx.stroke();
            ctx.shadowBlur = 0;
        }

        // Draw start point (child emoji) - LARGER
        const startX = (currentMaze.start.x / 100) * canvas.width;
        const startY = (currentMaze.start.y / 100) * canvas.height;
        ctx.font = '64px Arial'; // Increased from 48px
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('👶', startX, startY);

        // Draw end point (Jesus) - LARGER
        const endX = (currentMaze.end.x / 100) * canvas.width;
        const endY = (currentMaze.end.y / 100) * canvas.height;

        // Jesus illustration (glowing effect)
        ctx.save();
        ctx.shadowColor = 'rgba(251, 191, 36, 0.8)';
        ctx.shadowBlur = 25;
        ctx.font = '72px Arial'; // Increased from 56px
        ctx.fillText('✝️', endX, endY);
        ctx.restore();

        // Halo effect
        ctx.strokeStyle = 'rgba(251, 191, 36, 0.4)';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(endX, endY - 30, 30, 0, Math.PI * 2);
        ctx.stroke();
    };

    const getCanvasPoint = (e: React.MouseEvent | React.TouchEvent): Point => {
        const canvas = canvasRef.current;
        if (!canvas) return { x: 0, y: 0 };

        const rect = canvas.getBoundingClientRect();
        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

        return {
            x: clientX - rect.left,
            y: clientY - rect.top
        };
    };

    const isPointInObstacle = (point: Point): boolean => {
        const canvas = canvasRef.current;
        if (!canvas) return false;

        return currentMaze.obstacles.some(obs => {
            const x = (obs.x / 100) * canvas.width;
            const y = (obs.y / 100) * canvas.height;
            const w = (obs.width / 100) * canvas.width;
            const h = (obs.height / 100) * canvas.height;

            // Add small margin for easier gameplay
            const margin = 5;
            return point.x >= x - margin && point.x <= x + w + margin &&
                point.y >= y - margin && point.y <= y + h + margin;
        });
    };

    const isNearPoint = (p1: Point, p2: Point, threshold: number): boolean => {
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        return Math.sqrt(dx * dx + dy * dy) < threshold;
    };

    const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
        const point = getCanvasPoint(e);
        const canvas = canvasRef.current;
        if (!canvas) return;

        const startX = (currentMaze.start.x / 100) * canvas.width;
        const startY = (currentMaze.start.y / 100) * canvas.height;

        // Larger hit area for easier start
        if (isNearPoint(point, { x: startX, y: startY }, 50)) {
            setIsDrawing(true);
            setPath([point]);
            setHasFailed(false);
            setHasWon(false);
        }
    };

    const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
        if (!isDrawing) return;

        const point = getCanvasPoint(e);

        // Check collision with obstacles
        if (isPointInObstacle(point)) {
            setIsDrawing(false);
            setHasFailed(true);
            setTimeout(() => {
                setPath([]);
                setHasFailed(false);
            }, 1000);
            return;
        }

        setPath(prev => [...prev, point]);

        // Check if reached end
        const canvas = canvasRef.current;
        if (!canvas) return;

        const endX = (currentMaze.end.x / 100) * canvas.width;
        const endY = (currentMaze.end.y / 100) * canvas.height;

        // Larger hit area for easier completion
        if (isNearPoint(point, { x: endX, y: endY }, 50)) {
            setIsDrawing(false);
            setHasWon(true);
        }
    };

    const handleEnd = () => {
        setIsDrawing(false);
    };

    const resetLevel = () => {
        setPath([]);
        setHasWon(false);
        setHasFailed(false);
        setIsDrawing(false);
    };

    const nextLevel = () => {
        if (level < MAZES.length - 1) {
            setLevel(level + 1);
            resetLevel();
        } else {
            setLevel(0);
            resetLevel();
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 -m-8 p-4 md:p-8 font-kids flex flex-col items-center pb-20 md:pb-8">
            {/* HEADER */}
            <div className="w-full max-w-3xl flex items-center justify-between mb-4">
                <button onClick={onBack} className="p-3 bg-white rounded-full shadow-lg border-2 border-blue-200 text-blue-500 hover:scale-105 transition-transform">
                    <ArrowLeft size={24} />
                </button>
                <div className="bg-white px-6 py-2 rounded-full shadow-lg border-2 border-purple-200 flex items-center gap-2">
                    <Star size={20} className="text-purple-500" />
                    <span className="font-bold text-purple-600">Nível {level + 1}</span>
                </div>
                <button onClick={resetLevel} className="p-3 bg-white rounded-full shadow-lg border-2 border-orange-200 text-orange-500 hover:rotate-180 transition-transform duration-500">
                    <RotateCcw size={24} />
                </button>
            </div>

            {/* TITLE */}
            <div className="text-center mb-4">
                <h1 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-purple-600 to-pink-500 drop-shadow-sm">
                    Caminho até Jesus
                </h1>
                <p className="text-purple-500 font-bold text-xs md:text-sm mt-1">👶 Desenhe o caminho até Jesus ✝️</p>
            </div>

            {/* CANVAS */}
            <div className="relative mb-4 w-full flex justify-center">
                <canvas
                    ref={canvasRef}
                    width={canvasSize.width}
                    height={canvasSize.height}
                    onMouseDown={handleStart}
                    onMouseMove={handleMove}
                    onMouseUp={handleEnd}
                    onMouseLeave={handleEnd}
                    onTouchStart={handleStart}
                    onTouchMove={handleMove}
                    onTouchEnd={handleEnd}
                    className="bg-white rounded-3xl shadow-2xl border-4 border-purple-200 cursor-crosshair touch-none"
                    style={{ maxWidth: '100%' }}
                />

                {/* Failed Overlay */}
                {hasFailed && (
                    <div className="absolute inset-0 bg-red-500/20 rounded-3xl flex items-center justify-center animate-pulse">
                        <div className="bg-white rounded-2xl px-6 py-3 shadow-xl border-4 border-red-400">
                            <p className="text-xl md:text-2xl font-black text-red-600">Ops! Tente novamente!</p>
                        </div>
                    </div>
                )}
            </div>

            {/* INSTRUCTIONS */}
            <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg border-3 border-purple-200 max-w-3xl w-full">
                <h3 className="font-black text-purple-600 text-base md:text-lg mb-2">📝 Como Jogar:</h3>
                <ul className="text-stone-700 font-bold space-y-1 text-xs md:text-sm">
                    <li>• Toque na criança 👶 e arraste até Jesus ✝️</li>
                    <li>• Não encoste nas paredes roxas!</li>
                    <li>• Se errar, tente de novo!</li>
                </ul>
            </div>

            {/* WIN MODAL */}
            {hasWon && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
                    <div className="bg-white rounded-[2rem] p-8 max-w-sm w-full text-center shadow-2xl border-4 border-yellow-300 relative overflow-hidden">
                        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-yellow-300/20 to-transparent"></div>

                        <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6 relative z-10 animate-bounce">
                            <Trophy size={48} className="text-yellow-600" />
                        </div>

                        <h2 className="text-3xl font-black text-yellow-500 mb-2">Você Conseguiu!</h2>
                        <p className="text-stone-500 font-bold mb-2">A criança chegou até Jesus! 🙏</p>
                        <p className="text-purple-500 text-sm mb-8 italic">"Deixai vir a mim as crianças" - Jesus</p>

                        <button
                            onClick={nextLevel}
                            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-black py-4 rounded-xl shadow-lg hover:scale-105 transition-transform flex items-center justify-center gap-2 text-lg"
                        >
                            {level < MAZES.length - 1 ? 'Próximo Nível' : 'Jogar Novamente'} <Heart size={20} />
                        </button>
                    </div>

                    {/* Confetti */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        {[...Array(15)].map((_, i) => (
                            <div key={i} className="absolute animate-fall" style={{
                                left: `${Math.random() * 100}%`,
                                top: `-${Math.random() * 20}%`,
                                animationDelay: `${Math.random() * 2}s`,
                                fontSize: `${Math.random() * 20 + 15}px`
                            }}>
                                {['✨', '⭐', '💫', '🌟', '✝️'][Math.floor(Math.random() * 5)]}
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

export default MazeGame;
