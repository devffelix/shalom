import React from 'react';
import { ArrowLeft, Palette, Camera, Brain } from 'lucide-react';

const KidsBonus: React.FC = () => {
  return (
    <div className="mt-24 mb-16 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/50 to-transparent -z-10 rounded-3xl transform -skew-y-2"></div>
        
        <div className="text-center mb-8 px-4">
            <span className="font-kids text-3xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 font-black drop-shadow-sm" style={{ fontFamily: '"Comic Sans MS", "Chalkboard SE", sans-serif' }}>
                Super Bônus
            </span>
            <h3 className="text-xl md:text-2xl font-bold text-ink mt-4 mb-2">Shalom Kids</h3>
            <p className="text-stone-600 max-w-lg mx-auto text-sm md:text-base leading-relaxed">
                Um espaço <span className="font-bold text-green-500">100% seguro e bíblico</span> para seus filhos aprenderem sobre o Reino de forma divertida e protegida.
            </p>
        </div>

        {/* Tablet Mockup - Responsive (Portrait Mobile / Landscape Desktop) */}
        <div className="relative max-w-4xl mx-auto px-4 md:px-0">
            <div className="bg-stone-900 rounded-[2rem] md:rounded-[2.5rem] border-[8px] md:border-[12px] border-stone-900 shadow-2xl overflow-hidden relative ring-4 ring-stone-200 dark:ring-stone-700 aspect-[4/5] md:aspect-video h-auto mx-auto w-full max-w-md md:max-w-full">
                
                {/* Simulated Screen */}
                <div className="bg-[#f0f9ff] w-full h-full flex flex-col p-5 md:p-8 font-sans">
                    
                    {/* Header */}
                    <div className="w-full flex justify-between items-center mb-4 md:mb-6 shrink-0">
                        <div className="bg-white p-2 rounded-full shadow-sm"><ArrowLeft size={20} className="text-blue-400"/></div>
                        <span className="font-black text-xl md:text-2xl text-blue-500 tracking-tight">Kids Zone</span>
                        <div className="w-10"></div>
                    </div>
                    
                    {/* Responsive Grid: 2 Cols Mobile / 3 Cols Desktop */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 w-full h-full content-start md:content-center overflow-y-auto no-scrollbar pb-4">
                        
                        {/* 1. Paint & Create (Full Width on Mobile Row 1, 2 Cols on Desktop) */}
                        <div className="col-span-2 bg-gradient-to-br from-violet-400 to-fuchsia-500 rounded-2xl md:rounded-3xl shadow-lg p-4 md:p-6 flex flex-row items-center relative overflow-hidden group min-h-[120px] md:min-h-0">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-2xl -mr-10 -mt-10"></div>
                            <div className="text-white z-10 text-left">
                                <h4 className="text-lg md:text-2xl font-black mb-0.5 md:mb-1 leading-tight">Pintar & Criar</h4>
                                <p className="text-[10px] md:text-xs opacity-90 font-medium">Use a IA para desenhar!</p>
                            </div>
                            <Palette className="text-white/30 absolute bottom-[-5px] right-[-5px] md:bottom-[-10px] md:right-[-10px] w-20 h-20 md:w-24 md:h-24 rotate-12" />
                        </div>

                        {/* 2. Photo (1 Col) */}
                        <div className="col-span-1 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl md:rounded-3xl shadow-lg p-3 md:p-4 flex flex-col items-center justify-center text-white relative overflow-hidden aspect-square md:aspect-auto">
                                <Camera className="w-8 h-8 md:w-12 md:h-12 mb-1 md:mb-2" />
                                <span className="font-bold text-xs md:text-sm">Foto</span>
                        </div>

                        {/* 3. Quiz (1 Col) */}
                        <div className="col-span-1 bg-gradient-to-br from-sky-400 to-blue-500 rounded-2xl md:rounded-3xl shadow-lg p-3 md:p-4 flex flex-col items-center justify-center text-white aspect-square md:aspect-auto">
                                <Brain className="w-8 h-8 md:w-12 md:h-12 mb-1 md:mb-2" />
                                <span className="font-bold text-xs md:text-sm">Quiz</span>
                        </div>

                        {/* 4. Coming Soon (Full Width Mobile, 2 Cols Desktop) */}
                        <div className="col-span-2 bg-white border-4 border-dashed border-blue-200 rounded-2xl md:rounded-3xl flex items-center justify-center text-blue-300 font-black text-base md:text-xl uppercase tracking-widest min-h-[80px] md:min-h-0">
                            Em Breve
                        </div>
                    </div>
                </div>
                
                {/* Glare Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none rounded-[2rem]"></div>
            </div>
            
            {/* Decor Elements */}
            <div className="absolute -top-4 -right-2 md:-top-6 md:-right-6 w-12 h-12 md:w-16 md:h-16 bg-yellow-400 rounded-full blur-xl opacity-60 animate-pulse"></div>
            <div className="absolute -bottom-4 -left-2 md:-bottom-6 md:-left-6 w-16 h-16 md:w-20 md:h-20 bg-pink-400 rounded-full blur-xl opacity-60 animate-pulse delay-700"></div>
        </div>
    </div>
  );
};

export default KidsBonus;