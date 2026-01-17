
import React, { useState, useRef, useEffect } from 'react';
import { X, Save, RefreshCw, Check, Palette, Undo, Loader2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

// Tipagem para as partes do desenho SVG (Legado/Compatibilidade)
export interface IllustrationPart {
  id: string;
  d: string;
  defaultColor?: string;
}

export interface VectorIllustration {
  id: string;
  title: string;
  viewBox: string;
  parts: IllustrationPart[];
}

interface ColoringBookProps {
  illustration?: VectorIllustration; // Opcional
  imageUrl?: string; // Novo: URL da imagem gerada por IA
  title?: string;
  onClose: () => void;
}

const PALETTE = [
  '#ef4444', '#f97316', '#f59e0b', '#eab308', '#84cc16', '#22c55e', '#06b6d4', 
  '#3b82f6', '#6366f1', '#8b5cf6', '#d946ef', '#f43f5e', '#78350f', '#000000', 
  '#ffffff', '#94a3b8', '#fecaca', '#bfdbfe', '#fde047', '#86efac'
];

// Helper para converter HEX para RGB
const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16),
    255 // Alpha
  ] : [0, 0, 0, 255];
};

const ColoringBook: React.FC<ColoringBookProps> = ({ illustration, imageUrl, title, onClose }) => {
  const { t } = useLanguage();
  const [selectedColor, setSelectedColor] = useState<string>('#3b82f6');
  
  // Estado SVG
  const [fillState, setFillState] = useState<Record<string, string>>({});
  
  // Estado Canvas (Imagem IA)
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [history, setHistory] = useState<ImageData[]>([]);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  // --- LOGIC FOR IMAGE (CANVAS) ---
  useEffect(() => {
    if (imageUrl && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (!ctx) return;

      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = imageUrl;
      img.onload = () => {
        // Ajustar tamanho do canvas para manter proporção mas caber na tela
        const maxSize = 1024; // Alta resolução interna
        let w = img.width;
        let h = img.height;
        
        if (w > h) {
            if (w > maxSize) { h *= maxSize / w; w = maxSize; }
        } else {
            if (h > maxSize) { w *= maxSize / h; h = maxSize; }
        }

        canvas.width = w;
        canvas.height = h;
        
        // Desenhar fundo branco primeiro (para PNGs transparentes)
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, w, h);
        ctx.drawImage(img, 0, 0, w, h);
        
        // Salvar estado inicial
        setHistory([ctx.getImageData(0, 0, w, h)]);
        setIsImageLoaded(true);
      };
    }
  }, [imageUrl]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || !isImageLoaded) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    // Obter coordenadas corretas considerando o scale do CSS
    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;

    if ('touches' in e) {
       // Touch event
       clientX = e.touches[0].clientX;
       clientY = e.touches[0].clientY;
    } else {
       // Mouse event
       clientX = (e as React.MouseEvent).clientX;
       clientY = (e as React.MouseEvent).clientY;
    }

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    const x = Math.floor((clientX - rect.left) * scaleX);
    const y = Math.floor((clientY - rect.top) * scaleY);

    floodFill(ctx, x, y, hexToRgb(selectedColor));
  };

  // Algoritmo Flood Fill Otimizado
  const floodFill = (ctx: CanvasRenderingContext2D, startX: number, startY: number, fillColor: number[]) => {
    const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
    const { width, height, data } = imageData;
    
    // Pega a cor do pixel clicado
    const startPos = (startY * width + startX) * 4;
    const startR = data[startPos];
    const startG = data[startPos + 1];
    const startB = data[startPos + 2];
    const startA = data[startPos + 3];

    // Se a cor clicada for igual a cor de preenchimento, não faz nada
    if (
        startR === fillColor[0] &&
        startG === fillColor[1] &&
        startB === fillColor[2] &&
        startA === fillColor[3]
    ) return;

    // Tolerância para contornos não perfeitos (anti-aliasing)
    const tolerance = 50; 

    const colorMatch = (pos: number) => {
        const r = data[pos];
        const g = data[pos + 1];
        const b = data[pos + 2];
        const a = data[pos + 3]; // Ignora alpha na comparação simples ou considera branco
        
        return (
            Math.abs(r - startR) < tolerance &&
            Math.abs(g - startG) < tolerance &&
            Math.abs(b - startB) < tolerance
        );
    };

    const stack = [[startX, startY]];

    while (stack.length) {
        const [x, y] = stack.pop()!;
        let pixelPos = (y * width + x) * 4;

        if (y < 0 || y >= height || x < 0 || x >= width) continue;
        
        // Verifica se já foi pintado ou se é borda
        if (!colorMatch(pixelPos)) continue;

        // Move para a esquerda para encontrar o início da linha
        let leftX = x;
        while (leftX > 0 && colorMatch((y * width + (leftX - 1)) * 4)) {
            leftX--;
        }

        // Pinta a linha para a direita
        let rightX = leftX;
        while (rightX < width && colorMatch((y * width + rightX) * 4)) {
            const pos = (y * width + rightX) * 4;
            data[pos] = fillColor[0];
            data[pos + 1] = fillColor[1];
            data[pos + 2] = fillColor[2];
            data[pos + 3] = 255; // Força opacidade total

            // Verifica pixels acima e abaixo para adicionar à pilha
            if (y > 0 && colorMatch(((y - 1) * width + rightX) * 4)) {
                stack.push([rightX, y - 1]);
            }
            if (y < height - 1 && colorMatch(((y + 1) * width + rightX) * 4)) {
                stack.push([rightX, y + 1]);
            }
            rightX++;
        }
    }

    ctx.putImageData(imageData, 0, 0);
    
    // Salva histórico (limitado a 10 passos)
    const newHistory = [...history, imageData];
    if (newHistory.length > 10) newHistory.shift();
    setHistory(newHistory);
  };

  const handleUndo = () => {
      if (history.length > 1 && canvasRef.current) {
          const newHistory = [...history];
          newHistory.pop(); // Remove atual
          const previousState = newHistory[newHistory.length - 1];
          setHistory(newHistory);
          
          const ctx = canvasRef.current.getContext('2d');
          if (ctx) ctx.putImageData(previousState, 0, 0);
      }
  };

  // --- LOGIC FOR SVG (VECTOR) ---
  const svgRef = useRef<SVGSVGElement>(null);
  const handleAreaClickSVG = (partId: string) => {
    setFillState(prev => ({ ...prev, [partId]: selectedColor }));
  };

  const handleReset = () => {
    if (window.confirm(t.kids.coloring.reset)) {
      if (imageUrl && canvasRef.current && history.length > 0) {
          const ctx = canvasRef.current.getContext('2d');
          if (ctx) ctx.putImageData(history[0], 0, 0);
          setHistory([history[0]]);
      } else {
          setFillState({});
      }
    }
  };

  const handleSave = () => {
    // Save SVG logic
    if (illustration && svgRef.current) {
        const serializer = new XMLSerializer();
        let source = serializer.serializeToString(svgRef.current);
        if(!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)){
            source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
        }
        const blob = new Blob([source], {type: "image/svg+xml;charset=utf-8"});
        const url = URL.createObjectURL(blob);
        const canvas = document.createElement('canvas');
        const box = illustration.viewBox.split(' ').map(Number);
        canvas.width = 1000;
        canvas.height = (box[3] / box[2]) * 1000;
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.onload = () => {
            if (ctx) {
                ctx.fillStyle = "white";
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                const pngUrl = canvas.toDataURL("image/png");
                downloadImage(pngUrl, `minha-arte-${illustration.title}.png`);
                URL.revokeObjectURL(url);
            }
        };
        img.src = url;
    } 
    // Save Canvas Logic
    else if (imageUrl && canvasRef.current) {
        const pngUrl = canvasRef.current.toDataURL("image/png");
        downloadImage(pngUrl, `minha-arte-ia.png`);
    }
  };

  const downloadImage = (url: string, filename: string) => {
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-[60] bg-[#fff5f7] flex flex-col animate-fade-in font-kids touch-none">
      
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white shadow-sm border-b-4 border-pink-100 z-10">
        <div className="flex items-center gap-3">
          <button onClick={onClose} className="p-2 hover:bg-stone-100 rounded-full transition-colors text-stone-500">
            <X size={28} />
          </button>
          <div className="flex flex-col">
             <span className="text-[10px] font-bold text-pink-500 uppercase tracking-widest">{t.kids.coloring.coloringTitle}</span>
             <h3 className="font-black text-xl text-stone-700 leading-none truncate max-w-[150px]">{illustration?.title || title || t.kids.coloring.magicCreator}</h3>
          </div>
        </div>
        
        <div className="flex gap-2">
          {imageUrl && (
              <button onClick={handleUndo} disabled={history.length <= 1} className="p-2 bg-stone-100 text-stone-500 rounded-xl hover:bg-stone-200 transition-colors disabled:opacity-30">
                <Undo size={24} />
              </button>
          )}
          <button onClick={handleReset} className="p-2 bg-stone-100 text-stone-500 rounded-xl hover:bg-stone-200 transition-colors">
            <RefreshCw size={24} />
          </button>
          <button onClick={handleSave} className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl font-bold shadow-md transition-transform active:scale-95 border-b-4 border-green-700 active:border-b-0 active:translate-y-1">
            <Save size={20} /> <span className="hidden md:inline">{t.kids.coloring.save}</span>
          </button>
        </div>
      </div>

      {/* Drawing Area */}
      <div className="flex-1 overflow-hidden relative flex items-center justify-center p-4 md:p-8 bg-[url('https://www.transparenttextures.com/patterns/graphy.png')]">
        <div className="w-full h-full max-w-3xl flex items-center justify-center bg-white shadow-2xl rounded-3xl overflow-hidden border-8 border-white ring-4 ring-pink-100 relative">
            
            {/* RENDER SVG */}
            {illustration && (
                <svg
                    ref={svgRef}
                    viewBox={illustration.viewBox}
                    className="w-full h-full touch-none select-none"
                    preserveAspectRatio="xMidYMid meet"
                >
                    <rect x="0" y="0" width="100%" height="100%" fill="white" />
                    {illustration.parts.map((part) => (
                        <path
                            key={part.id}
                            id={part.id}
                            d={part.d}
                            fill={fillState[part.id] || part.defaultColor || '#ffffff'}
                            stroke="black"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            onClick={() => handleAreaClickSVG(part.id)}
                            className="cursor-pointer transition-colors duration-200 hover:opacity-90"
                            style={{ fillRule: 'nonzero' }}
                        />
                    ))}
                </svg>
            )}

            {/* RENDER IMAGE (CANVAS) */}
            {imageUrl && (
                <>
                    {!isImageLoaded && <div className="absolute inset-0 flex items-center justify-center"><Loader2 className="w-10 h-10 text-pink-500 animate-spin" /></div>}
                    <canvas 
                        ref={canvasRef}
                        onClick={handleCanvasClick}
                        className="w-full h-full object-contain touch-none"
                    />
                </>
            )}

        </div>
      </div>

      {/* Palette Toolbar */}
      <div className="bg-white border-t-4 border-pink-100 p-4 pb-safe shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
         <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-2 mb-2 px-2">
                <Palette className="text-pink-500" size={18} />
                <span className="text-xs font-bold text-stone-400 uppercase tracking-widest">Escolha uma cor e toque no desenho</span>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-4 pt-2 no-scrollbar px-2 snap-x">
                {PALETTE.map((color) => (
                    <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`
                            w-14 h-14 rounded-full flex-shrink-0 border-4 transition-all transform snap-center relative shadow-sm
                            ${selectedColor === color ? 'border-stone-800 scale-110 shadow-lg z-10' : 'border-white scale-100 hover:scale-105'}
                        `}
                        style={{ backgroundColor: color }}
                    >
                        {selectedColor === color && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Check size={24} className={color === '#ffffff' ? 'text-black' : 'text-white'} strokeWidth={4} />
                            </div>
                        )}
                    </button>
                ))}
            </div>
         </div>
      </div>

    </div>
  );
};

export default ColoringBook;
