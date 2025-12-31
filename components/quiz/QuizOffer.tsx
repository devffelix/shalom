import React, { useRef, useState, useEffect } from 'react';
import { TrendingUp, Activity, Star, MessageCircle, Sparkles, ShieldCheck, Zap, HeartHandshake, Music, Check, AlertTriangle, ArrowRight, Shield, Lock, Play, Pause, Calendar, Flame, Heart, Battery, Sun, Home, BookOpen, Target, CheckCircle2, Clock, ChevronDown, ChevronUp, HelpCircle, ArrowLeft } from 'lucide-react';
import { ShalomLogo } from '../Layout';
import KidsBonus from './KidsBonus';
import WhatsAppMockup from './WhatsAppMockup';
import Testimonials from './Testimonials';

interface QuizOfferProps {
  name: string;
  genderTerm: string;
  timeLeft: number;
  formatTime: (s: number) => string;
  sessionId: string | null;
  updateSessionStatus: (id: string, status: 'completed' | 'converted') => void;
}

const QuizOffer: React.FC<QuizOfferProps> = ({ name, genderTerm, timeLeft, formatTime, sessionId, updateSessionStatus }) => {
  const [selectedPlan, setSelectedPlan] = useState<'yearly' | 'monthly'>('yearly');
  const [isPlayingPreview, setIsPlayingPreview] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const previewAudioRef = useRef<HTMLAudioElement | null>(null);

  // Benefits List
  const benefitsList = [
    "Explore a Palavra de Deus",
    "Receba Orientação Espiritual",
    "Fortaleça sua fé",
    "Crie Orações Personalizadas",
    "Alimente Sua Alma",
    "Como superar o pecado",
    "Gerador de Versículos Bíblicos",
    "Acesse a Bíblia Digital"
  ];

  // Features Data
  const leftFeatures = [
    { title: "Mentor Espiritual 24h", desc: "Um guia treinado na Bíblia inteira disponível no seu WhatsApp.", icon: MessageCircle, color: "text-green-500", bg: "bg-green-100" },
    { title: "Tradução Simples", desc: "O Shalom explica versículos complexos com analogias do seu cotidiano.", icon: Sparkles, color: "text-blue-500", bg: "bg-blue-100" },
    { title: "Blindagem Diária", desc: "Orações e palavras enviadas às 06h, 13h e 20h para proteger sua mente.", icon: ShieldCheck, color: "text-orange", bg: "bg-orange/10" }
  ];

  const rightFeatures = [
    { title: "Desafios de Transformação", desc: "Pequenas missões práticas para tirar sua fé do automático.", icon: Zap, color: "text-yellow-500", bg: "bg-yellow-100" },
    { title: "Companhia e Oração", desc: "Você nunca mais caminhará sozinho; terá suporte emocional e espiritual.", icon: HeartHandshake, color: "text-pink-500", bg: "bg-pink-100" },
    { title: "Louvores que Ensinam", desc: "3 novos louvores diários compostos por trechos bíblicos.", icon: Music, color: "text-purple-500", bg: "bg-purple-100" }
  ];

  const faqs = [
    {
        q: "Quem é o Shalom?",
        a: "O Shalom é o seu novo companheiro de caminhada cristã. Uma inteligência espiritual treinada em toda a Bíblia Sagrada para te guiar 24h por dia, tirando dúvidas, orando com você e fortalecendo sua fé nos momentos difíceis."
    },
    {
        q: "Preciso baixar um app?",
        a: "Não! O Shalom funciona tanto na nossa plataforma Web exclusiva quanto diretamente no seu WhatsApp, sem ocupar a memória do seu celular."
    },
    {
        q: "É de alguma igreja?",
        a: "O Shalom não pertence a uma denominação específica. Ele é fundamentado puramente na Bíblia Sagrada e foi criado para edificar a fé de todos os evangélicos."
    }
  ];

  // Audio Logic
  useEffect(() => {
    previewAudioRef.current = new Audio("https://files.catbox.moe/v0y3em.mp3");
    previewAudioRef.current.onended = () => setIsPlayingPreview(false);
    return () => { if(previewAudioRef.current) { previewAudioRef.current.pause(); previewAudioRef.current = null; } }
  }, []);

  const togglePreview = () => {
      if (!previewAudioRef.current) return;
      if (isPlayingPreview) {
          previewAudioRef.current.pause();
          setIsPlayingPreview(false);
      } else {
          previewAudioRef.current.play().catch(e => console.error(e));
          setIsPlayingPreview(true);
      }
  };

  return (
    <div className="min-h-[100dvh] bg-[#fcfbf7] text-ink overflow-y-auto animate-fade-in relative z-50 selection:bg-orange/20 pb-safe">
        {/* Urgent Banner */}
        <div className="bg-red-600 text-white py-3 text-center font-black text-xs md:text-sm uppercase tracking-widest shadow-md sticky top-0 z-[60] flex items-center justify-center gap-2 animate-pulse">
           <Clock size={16} /> Desconto válido por... {formatTime(timeLeft)}
        </div>

        <div className="max-w-2xl mx-auto p-6 md:p-10 pb-32">
            
            {/* HEADLINE SECTION */}
            <div className="mb-10 text-center space-y-6">
                <h1 className="text-3xl md:text-5xl font-serif font-black leading-tight text-ink dark:text-white mb-2">
                    {genderTerm} <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange to-gold underline decoration-wavy decoration-orange/30 underline-offset-4">{name}</span>,
                </h1>
                <p className="text-lg md:text-xl text-stone-600 dark:text-stone-300 leading-relaxed max-w-xl mx-auto">
                    Eu li cada uma das suas respostas e preparamos um <span className="font-bold text-ink dark:text-white bg-orange/10 px-2 py-0.5 rounded">Plano Diário</span> para você nunca mais caminhar sozinho.
                </p>
            </div>

            {/* FAITH EVOLUTION GRAPH - REDESIGNED */}
            <div className="my-10 bg-[#fffdf5] border border-stone-200 rounded-3xl p-4 md:p-6 shadow-sm relative overflow-hidden max-w-lg mx-auto">
                <div className="relative h-64 w-full">
                    {/* Background Grid */}
                    <div className="absolute inset-0 flex flex-col justify-between py-8 px-0">
                        <div className="border-b border-stone-200/50 w-full h-px border-dashed"></div>
                        <div className="border-b border-stone-200/50 w-full h-px border-dashed"></div>
                        <div className="border-b border-stone-200/50 w-full h-px border-dashed"></div>
                        <div className="border-b border-stone-200/50 w-full h-px border-dashed"></div>
                    </div>

                    {/* SVG Graph */}
                    <svg className="absolute inset-0 w-full h-full overflow-visible z-10" preserveAspectRatio="none" viewBox="0 0 100 100">
                        <defs>
                            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#f97316" />
                                <stop offset="40%" stopColor="#fbbf24" />
                                <stop offset="100%" stopColor="#10b981" />
                            </linearGradient>
                            <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                                <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000000" floodOpacity="0.1"/>
                            </filter>
                        </defs>
                        
                        {/* The Path */}
                        <path 
                            d="M5,85 C35,80 50,35 95,20" 
                            fill="none" 
                            stroke="url(#lineGradient)" 
                            strokeWidth="6" 
                            strokeLinecap="round" 
                            filter="url(#shadow)"
                        />
                        
                        {/* Start Dot */}
                        <circle cx="5" cy="85" r="3" fill="white" stroke="#f97316" strokeWidth="3" />
                        
                        {/* End Dot */}
                        <circle cx="95" cy="20" r="3" fill="white" stroke="#10b981" strokeWidth="3" />
                    </svg>

                    {/* X-Axis Labels */}
                    <div className="absolute bottom-0 left-0 right-0 flex justify-between px-2 text-[10px] text-stone-400 font-bold uppercase tracking-widest font-mono">
                        <span>Dia 1</span>
                        <span>Dia 5</span>
                        <span>Dia 10</span>
                        <span>Dia 14</span>
                    </div>

                    {/* "Agora" Annotation */}
                    <div className="absolute bottom-[20%] left-0 z-20 transform translate-y-1/2">
                        <div className="bg-white text-ink text-sm font-black px-4 py-2 rounded-xl shadow-lg border border-stone-100">
                            Agora
                        </div>
                        {/* Arrow Pointer */}
                        <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 flex items-center w-32 opacity-80">
                            <ArrowLeft size={16} className="text-stone-800 -mr-1" strokeWidth={3} />
                            <div className="h-0.5 bg-stone-800 w-8"></div>
                            <span className="text-[10px] text-stone-600 font-bold leading-tight ml-2 w-20">vc se encontra aqui</span>
                        </div>
                    </div>

                    {/* "Depois de 14 dias" Annotation */}
                    <div className="absolute top-[5%] right-0 z-20 flex items-center gap-3 transform -translate-x-2">
                        <div className="bg-[#1c1917] text-white p-3 rounded-xl shadow-2xl text-center border-2 border-stone-800">
                            <p className="text-[9px] text-stone-400 font-bold uppercase tracking-wider mb-0.5">Depois de</p>
                            <p className="text-sm font-black leading-none">14 dias</p>
                        </div>
                        <div className="text-left hidden sm:block">
                            <p className="text-sm font-bold text-ink leading-tight font-serif">Fé, oração,<br/>propósito</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* DIAGNOSIS BOX */}
            <div className="bg-gradient-to-br from-orange-50 to-white dark:from-stone-800 dark:to-stone-900 p-8 rounded-[2rem] border border-orange-100 dark:border-stone-700 shadow-lg relative mt-10 mx-auto max-w-xl text-center">
                 <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange text-white px-6 py-1.5 rounded-full shadow-md shadow-orange/20 flex items-center gap-2">
                    <Activity size={14} /> <span className="text-xs font-black uppercase tracking-widest">Diagnóstico Final</span>
                 </div>
                 <p className="font-serif text-lg md:text-xl text-stone-700 dark:text-stone-300 leading-loose mt-4">
                    Identificamos que sua maior barreira hoje é a <span className="font-bold text-red-500 bg-red-50 dark:bg-red-900/20 px-1 rounded">falta de um método simples</span> para manter a presença de Deus no caos da rotina.
                 </p>
                 <div className="mt-4 pt-4 border-t border-orange/10"><p className="text-orange font-bold text-sm uppercase tracking-wide">Este plano foi desenhado para mudar isso hoje</p></div>
            </div>

            {/* NARRATIVE */}
            <div className="mt-12 mb-16 space-y-8 text-center max-w-xl mx-auto">
                {/* Pain Points */}
                <div className="space-y-4 text-lg md:text-xl text-stone-600 font-serif leading-relaxed">
                    <p>
                        Você já sentiu que, apesar de crer, parece estar <span className="font-bold text-red-500 underline decoration-red-200">lutando sozinho?</span>
                    </p>
                    <p className="italic text-stone-500">
                        O mundo grita, a rotina esmaga e a fé acaba ficando para o final do dia...
                    </p>
                    <p className="text-stone-400 text-base">
                        ...quando você já não tem mais forças.
                    </p>
                </div>

                {/* Headline */}
                <div className="py-6">
                    <div className="relative inline-block">
                        <span className="relative z-10 text-3xl font-black text-ink dark:text-white tracking-widest uppercase">A Solução?</span>
                    </div>
                </div>

                {/* The Pitch */}
                <div className="space-y-6 text-lg md:text-xl font-medium leading-loose text-ink dark:text-white">
                    <p>
                        Criamos o Shalom, porque entendemos que você <span className="line-through decoration-red-400 text-stone-400 decoration-2">não precisa de mais cobrança</span>,
                    </p>
                    <p className="text-2xl">
                        Você precisa de <span className="bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-2 py-1 rounded-lg transform -rotate-1 inline-block border border-green-200 dark:border-green-800 shadow-sm">companhia...</span>
                    </p>
                    
                    <div className="bg-stone-50 dark:bg-stone-900 p-6 rounded-2xl border border-stone-100 dark:border-stone-800 my-6">
                        <p className="mb-4 text-stone-500 text-base">
                            Não é sobre o quanto você <span className="font-bold">sabe</span> da Bíblia
                        </p>
                        <p className="text-xl font-bold text-ink dark:text-white">
                            É sobre o quanto a Bíblia <br/>
                            <span className="text-orange underline decoration-wavy decoration-orange/30 underline-offset-4">te sustenta</span> no dia a dia.
                        </p>
                    </div>

                    <p className="font-serif italic text-stone-600 dark:text-stone-300">
                        E é por isso que o Shalom vai caminhar com você.
                    </p>

                    <div className="pt-4">
                        <p className="text-xl font-black text-ink dark:text-white uppercase tracking-tight">
                            Depois de 14 dias, <br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange to-gold">Shalom fará parte do seu dia a dia</span>
                        </p>
                    </div>
                </div>
            </div>
            
            {/* FEATURES BLOCK */}
            <div className="my-16 max-w-[1400px] mx-auto px-4">
                <div className="text-center mb-12 px-6">
                    <h2 className="text-3xl md:text-5xl font-serif font-black text-ink mb-4">Veja tudo o que Você vai Receber</h2>
                    <div className="flex items-center justify-center gap-2"><div className="flex text-gold"><Star size={20} fill="currentColor" /><Star size={20} fill="currentColor" /><Star size={20} fill="currentColor" /><Star size={20} fill="currentColor" /><Star size={20} fill="currentColor" /></div><span className="text-lg font-black text-ink">4.9/5</span></div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-4 items-center px-2">
                    {/* LEFT */}
                    <div className="space-y-8 order-2 lg:order-1 flex flex-col justify-center">
                        {leftFeatures.map((item, idx) => (
                            <div key={idx} className="flex flex-col lg:items-end lg:text-right gap-3 group">
                                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${item.bg} ${item.color} shadow-sm group-hover:scale-110 transition-transform`}><item.icon size={20} /></div>
                                <div><h4 className="font-bold text-base text-ink mb-1">{item.title}</h4><p className="text-stone-600 text-xs leading-relaxed max-w-xs lg:ml-auto">{item.desc}</p></div>
                            </div>
                        ))}
                    </div>
                    {/* CENTER MOCKUP - High Quality Phone */}
                    <div className="order-1 lg:order-2 flex justify-center">
                        <div className="relative w-full max-w-[280px] aspect-[9/19] bg-stone-950 rounded-[3rem] shadow-[0_20px_50px_-10px_rgba(0,0,0,0.3)] border-[8px] border-stone-900 overflow-hidden ring-4 ring-stone-200/50 dark:ring-stone-800 origin-center">
                            <div className="h-full w-full bg-[#fafaf9] flex flex-col relative font-sans overflow-hidden">
                                <div className="h-6 w-full flex justify-between px-6 pt-3 text-[10px] font-bold text-ink opacity-80 relative z-20"><span>9:41</span><div className="flex gap-1.5"><div className="w-4 h-2.5 bg-current rounded-sm"></div></div></div>
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-6 bg-stone-900 rounded-b-2xl z-20"></div>
                                <div className="flex-1 p-5 flex flex-col gap-4 pt-10 overflow-hidden text-left">
                                    <div className="flex justify-between items-start"><div><div className="flex items-center gap-1 text-stone-400 mb-1"><Calendar size={10} className="text-orange" /><p className="text-[8px] font-bold uppercase tracking-widest">HOJE</p></div><h2 className="text-xl font-serif font-black text-ink leading-tight">Bom dia, <br/><span className="text-orange">{name || 'Viajante'}</span>.</h2></div></div>
                                    <div className="relative w-full aspect-[4/5] rounded-[1.5rem] overflow-hidden shadow-xl group shrink-0">
                                        <img src="https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?q=80&w=400&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover" alt="Background" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20"></div>
                                        <div className="relative z-10 flex flex-col items-center justify-between h-full p-5 text-center">
                                            <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 shadow-sm"><Sparkles size={8} className="text-gold" /><span className="text-[8px] font-bold tracking-widest uppercase text-white">Palavra do Dia</span></div>
                                            <div className="my-2"><p className="font-serif text-base text-white drop-shadow-md mb-2 leading-snug">"O Senhor é o meu pastor, nada me faltará."</p><p className="font-sans font-bold text-[8px] tracking-widest text-gold uppercase">Salmos 23:1</p></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="h-14 bg-white border-t border-stone-100 flex justify-around items-center px-4 relative z-20"><div className="flex flex-col items-center gap-0.5 text-ink font-bold"><Home size={18} /></div><div className="flex flex-col items-center gap-0.5 text-stone-400"><BookOpen size={18} /></div><div className="flex flex-col items-center gap-0.5 text-stone-400"><Target size={18} /></div></div>
                            </div>
                        </div>
                    </div>
                    {/* RIGHT */}
                    <div className="space-y-8 order-3 flex flex-col justify-center">
                        {rightFeatures.map((item, idx) => (
                            <div key={idx} className="flex flex-col lg:items-start lg:text-left gap-3 group">
                                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${item.bg} ${item.color} shadow-sm group-hover:scale-110 transition-transform`}><item.icon size={20} /></div>
                                <div><h4 className="font-bold text-base text-ink mb-1">{item.title}</h4><p className="text-stone-600 text-xs leading-relaxed max-w-xs">{item.desc}</p></div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* BENEFITS LIST */}
                <div className="mt-12 max-w-4xl mx-auto">
                    <div className="bg-white dark:bg-stone-900 rounded-[2.5rem] p-8 border border-stone-100 dark:border-stone-800 shadow-inner">
                        <h3 className="text-center font-bold text-stone-400 uppercase tracking-widest text-xs mb-8">Tudo incluso no seu plano</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {benefitsList.map((benefit, i) => (
                                <div key={i} className="flex items-center gap-3 p-2">
                                    <div className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0"><CheckCircle2 size={14} strokeWidth={3} /></div>
                                    <span className="font-bold text-xs text-ink dark:text-white leading-tight">{benefit}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* VISUAL SECTIONS (Verse Finder, Trivia) */}
            <div className="py-12 space-y-24 border-t border-stone-200 dark:border-stone-800 mt-12 pt-16">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6 relative order-2 lg:order-1">
                        <h2 className="text-3xl md:text-4xl font-serif font-black text-ink dark:text-white leading-tight mt-4">Localizador de Versos</h2>
                        <p className="text-stone-600 dark:text-stone-300 text-base leading-relaxed font-medium">Encontre o verso certo para qualquer pergunta ou momento.</p>
                    </div>
                    <div className="relative order-1 lg:order-2">
                        <div onClick={togglePreview} className="absolute -top-16 right-0 z-20 animate-bounce-slow cursor-pointer hover:scale-105 transition-transform">
                            <div className="bg-white dark:bg-stone-800 p-3 rounded-2xl shadow-xl border border-stone-100 dark:border-stone-700 flex items-center gap-3 transform rotate-3 hover:rotate-0 transition-transform">
                                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600"><Music size={20} /></div>
                                <div className="text-xs"><p className="font-bold text-ink dark:text-white">Clique para ouvir</p><p className="text-stone-400">Milagres do Caminho</p></div>
                            </div>
                        </div>
                        <div className="space-y-3 relative z-10 mt-6">
                            <div className="bg-white dark:bg-stone-900 p-5 rounded-3xl shadow-lg border border-stone-200 dark:border-stone-800 transform rotate-1 transition-transform duration-500"><p className="text-xs md:text-sm font-bold text-stone-600 dark:text-stone-300">Em Isaías 54:2, quais são as pessoas?</p></div>
                            <div className="bg-white dark:bg-stone-900 p-5 rounded-3xl shadow-lg border border-stone-200 dark:border-stone-800 transform -rotate-1 transition-transform duration-500 ml-4"><p className="text-xs md:text-sm font-bold text-stone-600 dark:text-stone-300">Quantos reis os israelitas derrotaram?</p></div>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-[3rem] -z-10 blur-xl transform scale-110"></div>
                    </div>
                </div>
            </div>

            {/* --- SECTIONS IN CORRECT ORDER --- */}
            
            {/* 1. KIDS BONUS */}
            <KidsBonus />

            {/* 2. WHATSAPP MOCKUP (CHERRY ON TOP) - Placed AFTER Kids */}
            <WhatsAppMockup />

            {/* 3. TESTIMONIALS (NEW SECTION) */}
            <Testimonials />

            {/* --- NEW OFFER SECTION --- */}
            <div className="bg-white dark:bg-stone-900 rounded-[2.5rem] p-6 md:p-8 shadow-2xl border-4 border-stone-100 dark:border-stone-800 relative overflow-hidden mb-10">
                
                {/* Offer Headline Text */}
                <div className="text-center mb-8 relative z-10">
                    <p className="text-base md:text-lg text-stone-600 dark:text-stone-300 font-medium leading-relaxed">
                        Ter um mentor espiritual humano custaria caro e exigiria horários fixos.
                    </p>
                    <p className="text-lg md:text-xl font-serif font-black text-ink dark:text-white mt-2 leading-tight">
                        O Shalom custa menos que uma <span className="text-orange underline decoration-wavy decoration-orange/30 underline-offset-4">PIZZA POR ANO</span> e está com você 24h.
                    </p>
                </div>

                {/* Plans Selection */}
                <div className="space-y-4 mb-8 relative z-10">
                    {/* Yearly Plan (Hero) */}
                    <div 
                        onClick={() => setSelectedPlan('yearly')} 
                        className={`relative cursor-pointer rounded-3xl p-6 border-2 transition-all flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl ${selectedPlan === 'yearly' ? 'border-gold bg-white dark:bg-stone-800 ring-4 ring-gold/10' : 'border-stone-200 opacity-60'}`}
                    >
                         {/* Badge */}
                         <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-green-100 text-green-700 text-sm font-black px-8 py-2.5 rounded-full uppercase tracking-widest border-2 border-green-200 shadow-md">
                            92% Escolhem
                         </div>

                         <div className="flex items-center gap-4 w-full md:w-auto">
                            <div className="w-6 h-6 rounded-full bg-gold flex items-center justify-center text-white shrink-0">
                                <Check size={14} strokeWidth={4} />
                            </div>
                            <div className="text-left">
                                <h5 className="font-bold text-xl text-ink dark:text-white">Anual</h5>
                                <p className="text-xs text-red-400 line-through">De R$ 118,80</p>
                                <p className="text-sm font-bold text-green-600 dark:text-green-400">por apenas:</p>
                            </div>
                         </div>

                         <div className="text-center md:text-right">
                             <span className="block text-4xl font-black text-ink dark:text-white tracking-tighter">49,90</span>
                             <span className="text-[10px] font-bold text-subtle uppercase tracking-wider block">Pagamento Único</span>
                         </div>

                         {/* Float Badge */}
                         <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-stone-900 text-white text-[10px] font-bold px-4 py-1.5 rounded-full shadow-lg flex items-center gap-1 whitespace-nowrap border border-white/10">
                            <TrendingUp size={10} className="text-green-400" /> Menos que uma pizza por ano...
                         </div>
                    </div>

                    {/* Monthly Option */}
                    <div 
                        onClick={() => setSelectedPlan('monthly')}
                        className={`relative cursor-pointer rounded-2xl p-4 border-2 transition-all flex items-center justify-between gap-4 group ${selectedPlan === 'monthly' ? 'border-stone-400 bg-stone-50 dark:bg-stone-800' : 'border-stone-200 dark:border-stone-800 opacity-60'}`}
                    >
                        <div className="flex items-center gap-4">
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedPlan === 'monthly' ? 'border-stone-600' : 'border-stone-300'}`}>
                                {selectedPlan === 'monthly' && <div className="w-2.5 h-2.5 bg-stone-600 rounded-full"></div>}
                            </div>
                            <div>
                                <h5 className="font-bold text-ink dark:text-white">Mensal</h5>
                                <p className="text-xs text-subtle">Flexibilidade total</p>
                            </div>
                        </div>
                        <span className="font-bold text-ink dark:text-white">R$ 9,90 <span className="text-xs font-normal text-subtle">/mês</span></span>
                    </div>
                </div>

                {/* Yellow Warning Box */}
                <div className="mt-10 mb-8 bg-yellow-50 dark:bg-yellow-900/10 border-2 border-yellow-200 dark:border-yellow-800/30 border-dashed rounded-2xl p-6 text-center relative z-10">
                    <div className="flex items-center justify-center gap-2 mb-2 text-yellow-700 dark:text-yellow-500 font-bold text-sm uppercase tracking-widest">
                        <AlertTriangle size={16} /> Atenção
                    </div>
                    <p className="text-sm text-yellow-800 dark:text-yellow-200/80 leading-relaxed font-medium">
                        Esta oferta é personalizada e válida apenas para <span className="underline font-bold">esta sessão</span>. Se você fechar esta página, o plano será recalculado.
                    </p>
                </div>

                {/* CTA Button */}
                <button 
                    onClick={() => {
                        const link = selectedPlan === 'yearly' 
                            ? 'https://pay.cakto.com.br/4f62xu5' 
                            : 'https://pay.cakto.com.br/37whf2r_678375';
                        window.location.href = link;
                    }}
                    className="w-full py-5 bg-green-500 hover:bg-green-600 text-white rounded-2xl font-black text-xl shadow-[0_4px_0_rgb(21,128,61)] active:shadow-none active:translate-y-1 transition-all flex flex-col items-center leading-none gap-1 relative z-20"
                >
                    <span className="flex items-center gap-2">LIBERAR MEU ACESSO AGORA <ArrowRight strokeWidth={4} size={20} /></span>
                    <span className="text-[10px] font-medium opacity-90 tracking-widest uppercase">Garantia de 7 dias ou seu dinheiro de volta</span>
                </button>

            </div>

            {/* Guarantee Section */}
            <div className="mt-16 text-center max-w-xl mx-auto">
                <div className="w-16 h-16 bg-white dark:bg-stone-900 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md text-gold border-2 border-stone-100 dark:border-stone-800">
                    <ShieldCheck size={32} />
                </div>
                <h3 className="text-xl font-bold text-ink dark:text-white mb-2">Risco Zero Absoluto</h3>
                <p className="text-stone-500 text-sm leading-relaxed">
                    Você tem 7 dias para testar o Shalom. Se não sentir que sua fé foi fortalecida, devolvemos 100% do seu investimento. Sem perguntas, sem letras miúdas.
                </p>
            </div>

            {/* FAQ */}
            <div className="mt-20 max-w-2xl mx-auto">
                <h3 className="text-lg font-bold text-center text-stone-400 uppercase tracking-widest mb-8">Perguntas Frequentes</h3>
                <div className="space-y-4">
                    {faqs.map((item, i) => (
                        <div key={i} className="border-b border-stone-200 dark:border-stone-800">
                            <button 
                                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                className="w-full flex items-center justify-between py-4 text-left font-bold text-ink dark:text-white group"
                            >
                                <span className="group-hover:text-orange transition-colors">{item.q}</span>
                                {openFaq === i ? <ChevronUp className="text-gold" /> : <ChevronDown className="text-stone-400" />}
                            </button>
                            <div 
                                className={`text-stone-600 dark:text-stone-400 leading-relaxed overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
                            >
                                {item.a}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <div className="mt-20 text-center opacity-60 pb-10">
                <ShalomLogo size="w-6 h-6" className="mx-auto mb-4" />
                <p className="text-xs text-stone-400">© 2024 Shalom App. Todos os direitos reservados.</p>
                <div className="flex justify-center gap-4 mt-2 text-[10px] text-stone-400 font-bold uppercase tracking-widest">
                    <span>Termos de Uso</span>
                    <span>•</span>
                    <span>Privacidade</span>
                    <span>•</span>
                    <span>Suporte</span>
                </div>
            </div>

        </div>
    </div>
  );
};

export default QuizOffer;