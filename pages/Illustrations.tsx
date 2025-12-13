
import React from 'react';
import { Download, Palette } from 'lucide-react';

const ILLUSTRATIONS = [
  {
    id: 1,
    title: "Oração da Noite",
    category: "Oração",
    url: "https://i.ibb.co/wzn2X6k/menino-orando.png", 
    fallbackUrl: "https://ibb.co/NkFt5jB",
    desc: "A pureza da oração de uma criança conecta o céu e a terra."
  },
  {
    id: 2,
    title: "A Palavra de Deus",
    category: "Bíblia",
    url: "https://i.ibb.co/gTKb0qL/criancas-lendo.png",
    fallbackUrl: "https://ibb.co/wh8DRbmj",
    desc: "Lâmpada para os meus pés é a Tua palavra."
  },
  {
    id: 3,
    title: "Jesus e as Crianças",
    category: "Amor",
    url: "https://i.ibb.co/hWtHjL3/jesus-criancas.png",
    fallbackUrl: "https://ibb.co/1Jj2fpWd",
    desc: "Deixai vir a mim os pequeninos, pois deles é o Reino dos Céus."
  },
  {
    id: 4,
    title: "Maior Amor do Mundo",
    category: "Cruz",
    url: "https://i.ibb.co/QnYtq5S/jesus-cruz.png",
    fallbackUrl: "https://ibb.co/3bc8p2N",
    desc: "Foi por amor a você que Ele se entregou."
  },
  {
    id: 5,
    title: "Jornada de Fé",
    category: "Caminho",
    url: "https://i.ibb.co/sKwy1zM/caminho.png", 
    fallbackUrl: "https://ibb.co/FLWr51Zk",
    desc: "Caminhando lado a lado com o Mestre."
  },
  {
    id: 6,
    title: "Luz do Mundo",
    category: "Esperança",
    url: "https://i.ibb.co/BqJqJqL/luz.png",
    fallbackUrl: "https://ibb.co/rRQD9K9G",
    desc: "Aquele que me segue não andará em trevas."
  }
];

const Illustrations: React.FC = () => {
  const handleDownload = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="animate-fade-in space-y-8 pb-20">
      <div className="px-2">
        <h2 className="text-3xl font-serif font-bold text-ink dark:text-white mb-2">Arte & Fé</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ILLUSTRATIONS.map((item) => (
          <div key={item.id} className="group bg-surface dark:bg-stone-900 rounded-[2.5rem] p-4 shadow-card border border-stone-100 dark:border-stone-800 hover:border-gold/50 transition-all">
            <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-white dark:bg-stone-800 flex items-center justify-center p-8">
                {/* 
                   Mantendo a lógica de imagem para garantir visualização
                */}
                <img 
                    src={item.fallbackUrl.replace('ibb.co', 'i.ibb.co') + '/' + item.fallbackUrl.split('/').pop() + '.png'} 
                    onError={(e) => {
                        e.currentTarget.src = "https://cdn-icons-png.flaticon.com/512/3063/3063823.png";
                    }}
                    alt={item.title}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100 mix-blend-multiply dark:mix-blend-normal"
                />
                
                <div className="absolute top-4 right-4 bg-stone-100 dark:bg-stone-700 p-2 rounded-full">
                    <Palette size={18} className="text-stone-400 dark:text-stone-300" />
                </div>

                {/* Desktop Hover Button */}
                <div className="hidden md:flex absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity items-center justify-center gap-3 rounded-[2rem]">
                    <button 
                        onClick={() => handleDownload(item.fallbackUrl)}
                        className="bg-white text-ink px-6 py-3 rounded-2xl font-bold text-sm shadow-xl hover:scale-105 transition-transform flex items-center gap-2"
                    >
                        <Download size={18} /> Baixar
                    </button>
                </div>
            </div>

            {/* Mobile Visible Button */}
            <button 
                onClick={() => handleDownload(item.fallbackUrl)}
                className="md:hidden w-full py-3 mt-2 bg-stone-100 dark:bg-stone-800 text-ink dark:text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 active:bg-stone-200 dark:active:bg-stone-700 transition-colors border border-stone-200 dark:border-stone-700"
            >
                <Download size={16} /> Baixar Imagem
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Illustrations;
