import React from 'react';
import { ShalomLogo } from '../Layout';
import { MoreVertical, Check, Play, Send } from 'lucide-react';

const WhatsAppMockup: React.FC = () => {
  return (
    <div className="py-12 mb-20 relative px-4 md:px-0">
        <div className="text-center mb-10">
            <p className="font-kids text-2xl md:text-3xl text-stone-500 font-bold mb-4 transform -rotate-1" style={{ fontFamily: '"Comic Sans MS", "Chalkboard SE", sans-serif' }}>
                O Principal - A Cereja do Bolo 🍒
            </p>
            <h2 className="text-4xl md:text-6xl font-serif font-black text-ink dark:text-white leading-none mb-6">
                DEUS na Palma<br/>da Sua Mão!
            </h2>
            <p className="text-lg text-stone-600 dark:text-stone-300 max-w-2xl mx-auto leading-relaxed">
                <strong className="text-green-600 dark:text-green-400">Mentor Espiritual 24h e Ilimitado</strong> que foi treinado na Bíblia inteira e ficará disponível no seu WhatsApp para tirar dúvidas, conversar com você e ensinar cada passagem com clareza.
            </p>
        </div>

        {/* WhatsApp Mockup Container */}
        <div className="max-w-md mx-auto w-full bg-white dark:bg-stone-800 rounded-[2.5rem] shadow-2xl overflow-hidden border-[8px] md:border-[12px] border-stone-900 relative ring-4 ring-stone-200/50 dark:ring-stone-800">
            {/* Fake Phone Speaker */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-6 bg-stone-900 rounded-b-2xl z-20"></div>
            
            {/* Chat Header */}
            <div className="bg-[#075E54] p-4 pt-10 flex items-center gap-3 text-white">
                <div className="relative shrink-0">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center overflow-hidden">
                        <ShalomLogo size="w-6 h-6" />
                    </div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-[#075E54]"></div>
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm truncate">Guia Espiritual Shalom</h3>
                    <p className="text-xs opacity-80 truncate">Online agora</p>
                </div>
                <MoreVertical size={20} className="shrink-0" />
            </div>

            {/* Chat Body */}
            <div className="bg-[#E5DDD5] dark:bg-[#1a1a1a] p-4 h-[400px] md:h-[450px] overflow-y-auto flex flex-col gap-4 relative">
                {/* Background Pattern Overlay */}
                <div className="absolute inset-0 opacity-[0.06] pointer-events-none bg-[url('https://i.pinimg.com/originals/8f/9b/26/8f9b2693822f7b473722967154236965.png')] bg-repeat"></div>

                {/* Date Bubble */}
                <div className="self-center bg-[#dcf8c6] dark:bg-[#075E54] shadow-sm rounded-lg px-2 py-1 mb-2 relative z-10">
                    <span className="text-[10px] text-stone-600 dark:text-stone-200 font-medium">HOJE</span>
                </div>

                {/* Message 1: User Question */}
                <div className="self-end bg-[#dcf8c6] dark:bg-[#005c4b] p-3 rounded-lg rounded-tr-none shadow-sm max-w-[85%] relative z-10 animate-slide-up">
                    <p className="text-sm text-stone-800 dark:text-stone-100 leading-snug">
                        Estou passando por um momento muito difícil, sinto que Deus me abandonou... Por que o justo sofre se eu tento fazer tudo certo? 😔
                    </p>
                    <div className="flex justify-end items-center gap-1 mt-1">
                        <span className="text-[9px] text-stone-500 dark:text-stone-400">10:42</span>
                        <div className="text-blue-500 dark:text-blue-300"><Check size={12} strokeWidth={3} /></div>
                    </div>
                </div>

                {/* Message 2: Agent Response */}
                <div className="self-start bg-white dark:bg-stone-800 p-3 rounded-lg rounded-tl-none shadow-sm max-w-[90%] relative z-10 animate-slide-up" style={{ animationDelay: '0.5s' }}>
                    <p className="text-sm text-stone-800 dark:text-stone-100 leading-snug">
                        <span className="font-bold text-orange block mb-1 text-xs">@Viajante</span>
                        A paz, meu irmão. Sinto sua dor em suas palavras. 🤍
                        <br/><br/>
                        Lembre-se de Jó. Ele perdeu tudo, mas não perdeu a fé. Deus não nos promete ausência de dor, mas Sua presença nela.
                        <br/><br/>
                        Em <strong>Isaías 43:2</strong> Ele diz: <em>"Quando passares pelas águas, estarei contigo"</em>.
                        <br/><br/>
                        O sofrimento não é abandono, é forja. O ouro precisa do fogo para ser purificado. Estou aqui orando com você agora. Vamos fazer uma oração juntos?
                    </p>
                    <div className="flex justify-end mt-1">
                        <span className="text-[9px] text-stone-400">10:42</span>
                    </div>
                </div>

                {/* Message 3: Audio (Optional touch) */}
                <div className="self-start bg-white dark:bg-stone-800 p-2 pr-3 rounded-lg rounded-tl-none shadow-sm max-w-[85%] relative z-10 flex items-center gap-3 animate-slide-up" style={{ animationDelay: '1.5s' }}>
                    <div className="w-8 h-8 rounded-full bg-orange text-white flex items-center justify-center shrink-0">
                        <Play size={14} fill="currentColor" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="h-1 bg-stone-200 dark:bg-stone-600 rounded-full w-full mb-1"></div>
                        <span className="text-[9px] text-stone-400 truncate block">Oração de Conforto • 0:45</span>
                    </div>
                </div>
            </div>

            {/* Chat Input */}
            <div className="bg-[#f0f0f0] dark:bg-stone-900 p-2 px-3 flex items-center gap-2">
                <div className="bg-white dark:bg-stone-800 flex-1 rounded-full px-4 py-2 text-sm text-stone-400">
                    Digite uma mensagem...
                </div>
                <div className="w-10 h-10 bg-[#075E54] rounded-full flex items-center justify-center text-white shadow-sm shrink-0">
                    <Send size={18} />
                </div>
            </div>
        </div>
    </div>
  );
};

export default WhatsAppMockup;