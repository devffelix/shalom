
import React from 'react';
import { X, Play, Plus, Info, Star, Tv } from 'lucide-react';

interface UpdatesModalProps {
  onClose: () => void;
}

const ShalomflixMockup = () => {
  return (
    <div className="relative mx-auto border-gray-900 bg-gray-900 border-[8px] md:border-[10px] rounded-[1.5rem] md:rounded-[2rem] h-[250px] w-full max-w-[90vw] md:h-[480px] md:w-[700px] shadow-2xl flex flex-col overflow-hidden ring-4 ring-stone-200 dark:ring-stone-800 transform rotate-1 hover:rotate-0 transition-transform duration-500">
        {/* Camera/Sensors */}
        <div className="absolute top-1/2 left-[-8px] md:left-[-10px] transform -translate-y-1/2 w-[8px] md:w-[10px] h-[30px] md:h-[40px] bg-gray-800 rounded-l-md z-20"></div>
        
        {/* Screen Content */}
        <div className="flex-1 bg-[#141414] overflow-hidden relative font-sans text-white">
            
            {/* Header Overlay */}
            <div className="absolute top-0 left-0 right-0 h-10 md:h-12 bg-gradient-to-b from-black/80 to-transparent z-20 flex items-center justify-between px-4 md:px-6">
                <span className="text-red-600 font-black tracking-tighter text-sm md:text-lg font-serif">SHALOMFLIX</span>
                <div className="flex gap-2 md:gap-4 text-[8px] md:text-[10px] font-bold text-gray-300">
                    <span>Séries</span>
                    <span>Filmes</span>
                    <span>Kids</span>
                </div>
            </div>

            {/* SCROLLING CONTENT ANIMATION */}
            <div className="animate-[scrollVertical_15s_ease-in-out_infinite_alternate] w-full">
                
                {/* HERO SECTION */}
                <div className="relative h-[180px] md:h-[250px] w-full">
                    <img 
                        src="https://files.catbox.moe/5snlpo.png" 
                        className="w-full h-full object-cover object-top opacity-80"
                        alt="Hero"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent"></div>
                    
                    <div className="absolute bottom-3 md:bottom-4 left-4 md:left-6 z-10 space-y-1 md:space-y-2">
                        <div className="inline-flex items-center gap-1 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded text-[8px] border border-white/20">
                            <Star size={8} className="text-yellow-400 fill-yellow-400" />
                            <span>Novidade</span>
                        </div>
                        <h1 className="text-xl md:text-3xl font-black font-serif leading-none drop-shadow-lg">O Príncipe<br/>do Egito</h1>
                        <div className="flex gap-2 pt-1">
                            <button className="bg-white text-black px-3 py-1 md:px-4 md:py-1.5 rounded flex items-center gap-1 text-[8px] md:text-[10px] font-bold hover:scale-105 transition-transform">
                                <Play size={8} fill="currentColor" /> Assistir
                            </button>
                            <button className="bg-gray-500/50 text-white px-3 py-1 md:px-4 md:py-1.5 rounded flex items-center gap-1 text-[8px] md:text-[10px] font-bold backdrop-blur-sm">
                                <Plus size={8} /> Minha Lista
                            </button>
                        </div>
                    </div>
                </div>

                {/* ROW 1: Kids */}
                <div className="px-4 md:px-6 mb-4 md:mb-6">
                    <h3 className="text-xs md:text-sm font-bold text-gray-200 mb-2">Histórias da Bíblia Kids</h3>
                    <div className="flex gap-2 md:gap-3 overflow-hidden">
                        {[
                            "https://files.catbox.moe/gn38m8.png", 
                            "https://files.catbox.moe/m2s3zo.png", 
                            "https://files.catbox.moe/smmqid.png", 
                            "https://files.catbox.moe/n7jo7k.png" 
                        ].map((src, i) => (
                            <div key={i} className="h-24 md:h-32 w-16 md:w-24 rounded-md overflow-hidden relative shrink-0 hover:scale-110 transition-transform duration-300 border border-white/10 group">
                                <img src={src} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Play size={20} fill="currentColor" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ROW 2: Family */}
                <div className="px-4 md:px-6 mb-4 md:mb-6">
                    <h3 className="text-xs md:text-sm font-bold text-gray-200 mb-2">Para Assistir em Família</h3>
                    <div className="flex gap-2 md:gap-3 overflow-hidden">
                        {[
                            "https://img.freepik.com/fotos-gratis/close-up-maos-segurando-cruz-de-madeira_23-2149176395.jpg", // Cross
                            "https://img.freepik.com/fotos-gratis/silhueta-de-homem-ao-por-do-sol_1150-18153.jpg", // Prayer
                            "https://img.freepik.com/fotos-gratis/mao-segurando-trigo-no-campo_23-2148753234.jpg" // Harvest
                        ].map((src, i) => (
                            <div key={i} className="h-16 md:h-20 w-28 md:w-36 rounded-md overflow-hidden relative shrink-0 border border-white/10">
                                <img src={src} className="w-full h-full object-cover" />
                                <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black to-transparent">
                                    <span className="text-[8px] font-bold">Episódio {i+1}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    </div>
  );
};

const UpdatesModal: React.FC<UpdatesModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
        <div className="bg-white dark:bg-stone-950 w-full max-w-4xl max-h-[90dvh] overflow-y-auto rounded-[2.5rem] shadow-2xl relative animate-slide-up border border-stone-200 dark:border-stone-800 flex flex-col">
            
            {/* Header */}
            <div className="p-6 md:p-8 flex justify-between items-start border-b border-stone-100 dark:border-stone-900 bg-stone-50/50 dark:bg-black/20 shrink-0">
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-xs font-bold uppercase tracking-widest mb-2">
                        <Tv size={12} /> Próxima Atualização
                    </div>
                    <h2 className="text-2xl md:text-4xl font-serif font-black text-ink dark:text-white leading-none">
                        Vem aí... <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-500 to-orange-500 drop-shadow-sm">Shalomflix</span>
                    </h2>
                    <p className="text-stone-500 mt-2 max-w-md text-sm md:text-base">
                        Uma plataforma completa de streaming cristão dentro do seu app. Desenhos, séries e filmes seguros para edificar sua família.
                    </p>
                </div>
                <button 
                    onClick={onClose}
                    className="p-2 bg-stone-200 dark:bg-stone-800 rounded-full hover:bg-stone-300 dark:hover:bg-stone-700 transition-colors text-stone-500 dark:text-stone-400"
                >
                    <X size={20} />
                </button>
            </div>

            {/* Body - Animation Canvas */}
            <div className="p-4 md:p-12 flex-1 bg-stone-100 dark:bg-[#0c0a09] flex flex-col items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none"></div>
                
                {/* The Mockup */}
                <ShalomflixMockup />

                <div className="mt-6 md:mt-8 text-center space-y-2 relative z-10 pb-4">
                    <p className="text-xs font-bold text-stone-400 uppercase tracking-[0.2em] animate-pulse">Disponível na próxima versão</p>
                    <div className="flex gap-2 justify-center flex-wrap">
                        <span className="px-2 py-1 bg-stone-200 dark:bg-stone-800 rounded text-[10px] text-stone-500 font-bold">Sem Anúncios</span>
                        <span className="px-2 py-1 bg-stone-200 dark:bg-stone-800 rounded text-[10px] text-stone-500 font-bold">100% Bíblico</span>
                        <span className="px-2 py-1 bg-stone-200 dark:bg-stone-800 rounded text-[10px] text-stone-500 font-bold">Modo Kids</span>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="p-4 md:p-6 border-t border-stone-100 dark:border-stone-900 flex justify-between items-center bg-white dark:bg-stone-950 rounded-b-[2.5rem] shrink-0">
                <div className="text-xs text-stone-400">
                    <p>Status: <span className="text-orange font-bold">Em Desenvolvimento</span></p>
                </div>
                <button 
                    onClick={onClose}
                    className="px-6 py-3 bg-ink dark:bg-white text-white dark:text-ink rounded-xl font-bold text-sm shadow-lg hover:scale-105 transition-transform"
                >
                    Mal posso esperar!
                </button>
            </div>

        </div>
        
        <style>{`
            @keyframes scrollVertical {
                0% { transform: translateY(0); }
                20% { transform: translateY(0); }
                45% { transform: translateY(-50px); }
                55% { transform: translateY(-50px); }
                80% { transform: translateY(-10px); }
                100% { transform: translateY(0); }
            }
        `}</style>
    </div>
  );
};

export default UpdatesModal;
