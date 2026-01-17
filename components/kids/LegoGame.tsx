import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Trash2, Sparkles, RotateCw } from 'lucide-react';

/* --- TYPES --- */
type Voxel = {
    id: number;
    x: number;
    y: number;
    z: number;
    color: string;
    falling?: boolean;
    fallVelocity?: { x: number; y: number; z: number };
    rotation?: { x: number; y: number; z: number };
};

type Structure3D = {
    name: string;
    emoji: string;
    description: string;
    voxels: { x: number; y: number; z: number; color: string }[];
};

/* --- 3D STRUCTURES (IMPROVED) --- */
const STRUCTURES: Structure3D[] = [
    {
        name: 'Cruz',
        emoji: '✝️',
        description: 'A Cruz de Jesus',
        voxels: [
            // Base
            { x: 2, y: 0, z: 2, color: '#6b21a8' },
            { x: 1, y: 0, z: 2, color: '#6b21a8' },
            { x: 3, y: 0, z: 2, color: '#6b21a8' },
            { x: 2, y: 0, z: 1, color: '#6b21a8' },
            { x: 2, y: 0, z: 3, color: '#6b21a8' },
            // Vertical beam
            { x: 2, y: 1, z: 2, color: '#7c3aed' },
            { x: 2, y: 2, z: 2, color: '#7c3aed' },
            { x: 2, y: 3, z: 2, color: '#8b5cf6' },
            { x: 2, y: 4, z: 2, color: '#8b5cf6' },
            { x: 2, y: 5, z: 2, color: '#9333ea' },
            { x: 2, y: 6, z: 2, color: '#a855f7' },
            // Vertical depth
            { x: 2, y: 1, z: 1, color: '#6b21a8' },
            { x: 2, y: 2, z: 1, color: '#6b21a8' },
            { x: 2, y: 1, z: 3, color: '#6b21a8' },
            { x: 2, y: 2, z: 3, color: '#6b21a8' },
            // Horizontal beam
            { x: 0, y: 4, z: 2, color: '#a78bfa' },
            { x: 1, y: 4, z: 2, color: '#a78bfa' },
            { x: 3, y: 4, z: 2, color: '#a78bfa' },
            { x: 4, y: 4, z: 2, color: '#a78bfa' },
            // Horizontal depth
            { x: 0, y: 4, z: 1, color: '#9333ea' },
            { x: 1, y: 4, z: 1, color: '#9333ea' },
            { x: 3, y: 4, z: 1, color: '#9333ea' },
            { x: 4, y: 4, z: 1, color: '#9333ea' },
            { x: 0, y: 4, z: 3, color: '#9333ea' },
            { x: 1, y: 4, z: 3, color: '#9333ea' },
            { x: 3, y: 4, z: 3, color: '#9333ea' },
            { x: 4, y: 4, z: 3, color: '#9333ea' },
        ]
    },
    {
        name: 'Leão',
        emoji: '🦁',
        description: 'Leão de Judá',
        voxels: [
            // Body (sitting position)
            { x: 1, y: 0, z: 2, color: '#d97706' },
            { x: 2, y: 0, z: 2, color: '#d97706' },
            { x: 3, y: 0, z: 2, color: '#d97706' },
            { x: 1, y: 0, z: 3, color: '#d97706' },
            { x: 2, y: 0, z: 3, color: '#d97706' },
            { x: 3, y: 0, z: 3, color: '#d97706' },
            { x: 1, y: 1, z: 2, color: '#f59e0b' },
            { x: 2, y: 1, z: 2, color: '#f59e0b' },
            { x: 3, y: 1, z: 2, color: '#f59e0b' },
            { x: 1, y: 1, z: 3, color: '#f59e0b' },
            { x: 2, y: 1, z: 3, color: '#f59e0b' },
            { x: 3, y: 1, z: 3, color: '#f59e0b' },
            // Head
            { x: 2, y: 2, z: 1, color: '#fbbf24' },
            { x: 1, y: 2, z: 1, color: '#fbbf24' },
            { x: 3, y: 2, z: 1, color: '#fbbf24' },
            { x: 2, y: 3, z: 1, color: '#fde68a' },
            // Mane (surrounding head)
            { x: 0, y: 2, z: 0, color: '#92400e' },
            { x: 1, y: 2, z: 0, color: '#92400e' },
            { x: 2, y: 2, z: 0, color: '#92400e' },
            { x: 3, y: 2, z: 0, color: '#92400e' },
            { x: 4, y: 2, z: 0, color: '#92400e' },
            { x: 0, y: 2, z: 1, color: '#92400e' },
            { x: 4, y: 2, z: 1, color: '#92400e' },
            { x: 0, y: 2, z: 2, color: '#92400e' },
            { x: 4, y: 2, z: 2, color: '#92400e' },
            { x: 0, y: 3, z: 0, color: '#b45309' },
            { x: 1, y: 3, z: 0, color: '#b45309' },
            { x: 2, y: 3, z: 0, color: '#b45309' },
            { x: 3, y: 3, z: 0, color: '#b45309' },
            { x: 4, y: 3, z: 0, color: '#b45309' },
            { x: 0, y: 3, z: 1, color: '#b45309' },
            { x: 1, y: 3, z: 1, color: '#b45309' },
            { x: 3, y: 3, z: 1, color: '#b45309' },
            { x: 4, y: 3, z: 1, color: '#b45309' },
            { x: 0, y: 3, z: 2, color: '#b45309' },
            { x: 4, y: 3, z: 2, color: '#b45309' },
            // Front paws
            { x: 1, y: 0, z: 0, color: '#d97706' },
            { x: 3, y: 0, z: 0, color: '#d97706' },
            { x: 1, y: 0, z: 1, color: '#d97706' },
            { x: 3, y: 0, z: 1, color: '#d97706' },
        ]
    },
    {
        name: 'Ovelha',
        emoji: '🐑',
        description: 'Ovelha do Senhor',
        voxels: [
            // Legs
            { x: 1, y: 0, z: 1, color: '#4b5563' },
            { x: 3, y: 0, z: 1, color: '#4b5563' },
            { x: 1, y: 0, z: 3, color: '#4b5563' },
            { x: 3, y: 0, z: 3, color: '#4b5563' },
            // Body layer 1
            { x: 1, y: 1, z: 1, color: '#e5e7eb' },
            { x: 2, y: 1, z: 1, color: '#e5e7eb' },
            { x: 3, y: 1, z: 1, color: '#e5e7eb' },
            { x: 1, y: 1, z: 2, color: '#e5e7eb' },
            { x: 2, y: 1, z: 2, color: '#f3f4f6' },
            { x: 3, y: 1, z: 2, color: '#e5e7eb' },
            { x: 1, y: 1, z: 3, color: '#e5e7eb' },
            { x: 2, y: 1, z: 3, color: '#e5e7eb' },
            { x: 3, y: 1, z: 3, color: '#e5e7eb' },
            // Body layer 2
            { x: 1, y: 2, z: 1, color: '#f3f4f6' },
            { x: 2, y: 2, z: 1, color: '#f3f4f6' },
            { x: 3, y: 2, z: 1, color: '#f3f4f6' },
            { x: 1, y: 2, z: 2, color: '#f3f4f6' },
            { x: 2, y: 2, z: 2, color: '#ffffff' },
            { x: 3, y: 2, z: 2, color: '#f3f4f6' },
            { x: 1, y: 2, z: 3, color: '#f3f4f6' },
            { x: 2, y: 2, z: 3, color: '#f3f4f6' },
            { x: 3, y: 2, z: 3, color: '#f3f4f6' },
            // Head
            { x: 0, y: 2, z: 2, color: '#d1d5db' },
            { x: 0, y: 3, z: 2, color: '#e5e7eb' },
        ]
    },
    {
        name: 'Coração',
        emoji: '❤️',
        description: 'Amor de Deus',
        voxels: [
            // Bottom point
            { x: 2, y: 0, z: 2, color: '#991b1b' },
            // Layer 1
            { x: 1, y: 1, z: 2, color: '#dc2626' },
            { x: 2, y: 1, z: 2, color: '#dc2626' },
            { x: 3, y: 1, z: 2, color: '#dc2626' },
            { x: 2, y: 1, z: 1, color: '#dc2626' },
            { x: 2, y: 1, z: 3, color: '#dc2626' },
            // Layer 2
            { x: 1, y: 2, z: 1, color: '#ef4444' },
            { x: 2, y: 2, z: 1, color: '#ef4444' },
            { x: 3, y: 2, z: 1, color: '#ef4444' },
            { x: 0, y: 2, z: 2, color: '#ef4444' },
            { x: 1, y: 2, z: 2, color: '#f87171' },
            { x: 2, y: 2, z: 2, color: '#f87171' },
            { x: 3, y: 2, z: 2, color: '#f87171' },
            { x: 4, y: 2, z: 2, color: '#ef4444' },
            { x: 1, y: 2, z: 3, color: '#ef4444' },
            { x: 2, y: 2, z: 3, color: '#ef4444' },
            { x: 3, y: 2, z: 3, color: '#ef4444' },
            // Layer 3 (top bumps)
            { x: 1, y: 3, z: 1, color: '#fca5a5' },
            { x: 3, y: 3, z: 1, color: '#fca5a5' },
            { x: 0, y: 3, z: 2, color: '#fca5a5' },
            { x: 1, y: 3, z: 2, color: '#fca5a5' },
            { x: 3, y: 3, z: 2, color: '#fca5a5' },
            { x: 4, y: 3, z: 2, color: '#fca5a5' },
            { x: 1, y: 3, z: 3, color: '#fca5a5' },
            { x: 3, y: 3, z: 3, color: '#fca5a5' },
        ]
    },
    {
        name: 'Igreja',
        emoji: '⛪',
        description: 'Casa de Deus',
        voxels: [
            // Base/Floor
            { x: 1, y: 0, z: 2, color: '#78350f' },
            { x: 2, y: 0, z: 2, color: '#78350f' },
            { x: 3, y: 0, z: 2, color: '#78350f' },
            { x: 1, y: 0, z: 3, color: '#78350f' },
            { x: 2, y: 0, z: 3, color: '#78350f' },
            { x: 3, y: 0, z: 3, color: '#78350f' },
            // Walls (with door opening in front)
            { x: 1, y: 1, z: 2, color: '#92400e' },
            { x: 3, y: 1, z: 2, color: '#92400e' },
            { x: 1, y: 1, z: 3, color: '#92400e' },
            { x: 2, y: 1, z: 3, color: '#92400e' },
            { x: 3, y: 1, z: 3, color: '#92400e' },
            { x: 1, y: 2, z: 2, color: '#b45309' },
            { x: 3, y: 2, z: 2, color: '#b45309' },
            { x: 1, y: 2, z: 3, color: '#b45309' },
            { x: 2, y: 2, z: 3, color: '#b45309' },
            { x: 3, y: 2, z: 3, color: '#b45309' },
            // Peaked roof
            { x: 1, y: 3, z: 2, color: '#dc2626' },
            { x: 2, y: 3, z: 2, color: '#dc2626' },
            { x: 3, y: 3, z: 2, color: '#dc2626' },
            { x: 1, y: 3, z: 3, color: '#dc2626' },
            { x: 2, y: 3, z: 3, color: '#dc2626' },
            { x: 3, y: 3, z: 3, color: '#dc2626' },
            { x: 2, y: 4, z: 2, color: '#b91c1c' },
            { x: 2, y: 4, z: 3, color: '#b91c1c' },
            // Steeple
            { x: 2, y: 5, z: 2, color: '#92400e' },
            // Cross on top
            { x: 2, y: 6, z: 2, color: '#fbbf24' },
            { x: 1, y: 6, z: 2, color: '#fbbf24' },
            { x: 3, y: 6, z: 2, color: '#fbbf24' },
            { x: 2, y: 7, z: 2, color: '#fbbf24' },
        ]
    },
];

const VOXEL_SIZE = 30; // pixels

const Lego3DGame: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [currentStructureIndex, setCurrentStructureIndex] = useState(0);
    const [voxels, setVoxels] = useState<Voxel[]>([]);
    const [isDestroying, setIsDestroying] = useState(false);
    const [isBuilding, setIsBuilding] = useState(false);
    const [rotation, setRotation] = useState({ x: -20, y: 45 });
    const [isDragging, setIsDragging] = useState(false);
    const [lastMouse, setLastMouse] = useState({ x: 0, y: 0 });
    const [autoRotate, setAutoRotate] = useState(true);
    const animationFrameRef = useRef<number>();
    const destroyAnimationRef = useRef<number>();

    const currentStructure = STRUCTURES[currentStructureIndex];

    useEffect(() => {
        buildStructure();
        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
            if (destroyAnimationRef.current) {
                cancelAnimationFrame(destroyAnimationRef.current);
            }
        };
    }, [currentStructureIndex]);

    // Auto-rotate
    useEffect(() => {
        if (!autoRotate || isDragging || isDestroying || isBuilding) return;

        const rotate = () => {
            setRotation(prev => ({ ...prev, y: (prev.y + 0.3) % 360 }));
            animationFrameRef.current = requestAnimationFrame(rotate);
        };

        animationFrameRef.current = requestAnimationFrame(rotate);
        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [autoRotate, isDragging, isDestroying, isBuilding]);

    const buildStructure = () => {
        setIsBuilding(true);
        setVoxels([]);

        // Group voxels by Y level (bottom to top)
        const layers: { [key: number]: typeof currentStructure.voxels } = {};
        currentStructure.voxels.forEach(v => {
            if (!layers[v.y]) layers[v.y] = [];
            layers[v.y].push(v);
        });

        const sortedLayers = Object.keys(layers).map(Number).sort((a, b) => a - b);

        // Build layer by layer
        sortedLayers.forEach((layerY, layerIndex) => {
            setTimeout(() => {
                const layerVoxels = layers[layerY].map((v, i) => ({
                    id: layerY * 100 + i,
                    x: v.x,
                    y: v.y,
                    z: v.z,
                    color: v.color
                }));

                setVoxels(prev => [...prev, ...layerVoxels]);

                if (layerIndex === sortedLayers.length - 1) {
                    setTimeout(() => setIsBuilding(false), 300);
                }
            }, layerIndex * 200);
        });
    };

    const destroyStructure = () => {
        if (isDestroying || isBuilding || voxels.length === 0) return;

        setIsDestroying(true);

        // Initialize falling voxels
        let fallingVoxels = voxels.map(v => ({
            ...v,
            falling: true,
            fallVelocity: {
                x: (Math.random() - 0.5) * 3,
                y: Math.random() * 2 + 2,
                z: (Math.random() - 0.5) * 3
            },
            rotation: {
                x: Math.random() * 360,
                y: Math.random() * 360,
                z: Math.random() * 360
            }
        }));

        // Animate falling with requestAnimationFrame
        const animate = () => {
            fallingVoxels = fallingVoxels.map(v => {
                if (!v.falling || !v.fallVelocity || !v.rotation) return v;

                return {
                    ...v,
                    y: v.y - v.fallVelocity.y * 0.15,
                    x: v.x + v.fallVelocity.x * 0.08,
                    z: v.z + v.fallVelocity.z * 0.08,
                    rotation: {
                        x: (v.rotation.x + 8) % 360,
                        y: (v.rotation.y + 8) % 360,
                        z: (v.rotation.z + 8) % 360
                    }
                };
            });

            setVoxels(fallingVoxels);

            // Check if all fallen below ground
            if (fallingVoxels.every(v => v.y < -6)) {
                setIsDestroying(false);
                setVoxels([]);
                setTimeout(() => {
                    setCurrentStructureIndex((prev) => (prev + 1) % STRUCTURES.length);
                }, 500);
            } else {
                destroyAnimationRef.current = requestAnimationFrame(animate);
            }
        };

        destroyAnimationRef.current = requestAnimationFrame(animate);
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setAutoRotate(false);
        setLastMouse({ x: e.clientX, y: e.clientY });
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;

        const deltaX = e.clientX - lastMouse.x;
        const deltaY = e.clientY - lastMouse.y;

        setRotation(prev => ({
            x: Math.max(-90, Math.min(0, prev.x - deltaY * 0.5)),
            y: (prev.y + deltaX * 0.5) % 360
        }));

        setLastMouse({ x: e.clientX, y: e.clientY });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 -m-8 p-4 md:p-8 font-kids flex flex-col items-center pb-20 md:pb-8">
            {/* HEADER */}
            <div className="w-full max-w-4xl flex items-center justify-between mb-4">
                <button onClick={onBack} className="p-3 bg-white rounded-full shadow-lg border-2 border-orange-200 text-orange-500 hover:scale-105 transition-transform">
                    <ArrowLeft size={24} />
                </button>
                <div className="bg-white px-6 py-2 rounded-full shadow-lg border-2 border-red-200 flex items-center gap-2">
                    <span className="text-2xl">{currentStructure.emoji}</span>
                    <span className="font-bold text-red-600">{currentStructure.name}</span>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => setAutoRotate(!autoRotate)}
                        className={`p-3 rounded-full shadow-lg border-2 transition-all ${autoRotate
                            ? 'bg-green-500 border-green-300 text-white'
                            : 'bg-white border-gray-200 text-gray-500'
                            }`}
                    >
                        <RotateCw size={24} />
                    </button>
                    <button
                        onClick={destroyStructure}
                        disabled={isDestroying || isBuilding}
                        className="p-3 bg-white rounded-full shadow-lg border-2 border-red-200 text-red-500 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed transition-transform"
                    >
                        <Trash2 size={24} />
                    </button>
                </div>
            </div>

            {/* TITLE */}
            <div className="text-center mb-6">
                <h1 className="text-3xl md:text-4xl font-black text-white drop-shadow-lg">
                    LEGO 3D Cristão
                </h1>
                <p className="text-orange-300 font-bold text-xs md:text-sm mt-1">🧱 Arraste para girar • Clique 🗑️ para destruir</p>
            </div>

            {/* 3D SCENE */}
            <div
                className="relative mb-6 cursor-grab active:cursor-grabbing select-none"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                style={{ perspective: '1200px' }}
            >
                <div
                    className="relative transition-transform duration-300"
                    style={{
                        transformStyle: 'preserve-3d',
                        transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                        width: `${VOXEL_SIZE * 5}px`,
                        height: `${VOXEL_SIZE * 7}px`,
                    }}
                >
                    {/* Ground plane */}
                    <div
                        className="absolute bg-gradient-to-br from-stone-600 to-stone-700 border-4 border-stone-500 rounded-lg opacity-50"
                        style={{
                            width: `${VOXEL_SIZE * 5}px`,
                            height: `${VOXEL_SIZE * 5}px`,
                            transform: `rotateX(90deg) translateZ(${-VOXEL_SIZE / 2}px)`,
                            transformStyle: 'preserve-3d',
                        }}
                    />

                    {/* Voxels */}
                    {voxels.map(voxel => (
                        <div
                            key={voxel.id}
                            className="absolute"
                            style={{
                                width: `${VOXEL_SIZE}px`,
                                height: `${VOXEL_SIZE}px`,
                                transform: `
                                    translate3d(
                                        ${(voxel.x - 2.5) * VOXEL_SIZE}px,
                                        ${-(voxel.y - 2) * VOXEL_SIZE}px,
                                        ${(voxel.z - 2) * VOXEL_SIZE}px
                                    )
                                    ${voxel.rotation ? `rotateX(${voxel.rotation.x}deg) rotateY(${voxel.rotation.y}deg) rotateZ(${voxel.rotation.z}deg)` : ''}
                                `,
                                transformStyle: 'preserve-3d',
                                opacity: voxel.y < -4 ? 0 : 1,
                                transition: voxel.falling ? 'none' : 'all 0.3s ease-out'
                            }}
                        >
                            {/* 3D Cube - 6 faces */}
                            {/* Front */}
                            <div className="absolute inset-0 border-2 border-black/30" style={{
                                backgroundColor: voxel.color,
                                transform: `translateZ(${VOXEL_SIZE / 2}px)`,
                                boxShadow: 'inset 0 0 10px rgba(255,255,255,0.3)'
                            }}>
                                <div className="absolute inset-2 grid grid-cols-2 gap-1">
                                    {[0, 1, 2, 3].map(i => (
                                        <div key={i} className="rounded-full bg-black/20 border border-black/30" />
                                    ))}
                                </div>
                            </div>
                            {/* Back */}
                            <div className="absolute inset-0 border-2 border-black/30" style={{
                                backgroundColor: voxel.color,
                                transform: `translateZ(${-VOXEL_SIZE / 2}px) rotateY(180deg)`,
                                filter: 'brightness(0.7)'
                            }} />
                            {/* Right */}
                            <div className="absolute inset-0 border-2 border-black/30" style={{
                                backgroundColor: voxel.color,
                                transform: `rotateY(90deg) translateZ(${VOXEL_SIZE / 2}px)`,
                                filter: 'brightness(0.85)'
                            }} />
                            {/* Left */}
                            <div className="absolute inset-0 border-2 border-black/30" style={{
                                backgroundColor: voxel.color,
                                transform: `rotateY(-90deg) translateZ(${VOXEL_SIZE / 2}px)`,
                                filter: 'brightness(0.85)'
                            }} />
                            {/* Top */}
                            <div className="absolute inset-0 border-2 border-black/30" style={{
                                backgroundColor: voxel.color,
                                transform: `rotateX(90deg) translateZ(${VOXEL_SIZE / 2}px)`,
                                filter: 'brightness(1.1)'
                            }}>
                                <div className="absolute inset-2 grid grid-cols-2 gap-1">
                                    {[0, 1, 2, 3].map(i => (
                                        <div key={i} className="rounded-full bg-black/20 border border-black/30" />
                                    ))}
                                </div>
                            </div>
                            {/* Bottom */}
                            <div className="absolute inset-0 border-2 border-black/30" style={{
                                backgroundColor: voxel.color,
                                transform: `rotateX(-90deg) translateZ(${VOXEL_SIZE / 2}px)`,
                                filter: 'brightness(0.6)'
                            }} />
                        </div>
                    ))}
                </div>

                {/* Status */}
                {(isBuilding || isDestroying) && (
                    <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 bg-white px-6 py-3 rounded-full shadow-lg border-3 border-orange-300 flex items-center gap-2">
                        <Sparkles size={20} className="text-orange-500 animate-spin" />
                        <span className="font-black text-orange-600">
                            {isBuilding ? 'Construindo...' : 'Destruindo...'}
                        </span>
                    </div>
                )}
            </div>

            {/* INFO */}
            <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg border-3 border-orange-200 max-w-md w-full text-center mt-8">
                <div className="text-5xl mb-3">{currentStructure.emoji}</div>
                <h3 className="text-xl font-black text-orange-600 mb-2">{currentStructure.description}</h3>
                <p className="text-stone-600 font-bold text-sm">
                    Arraste para girar a estrutura 3D!
                </p>
            </div>
        </div>
    );
};

export default Lego3DGame;
