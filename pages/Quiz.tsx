import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Sparkles, ChevronRight, Clock, Lock, Users, BookOpen, Shield, Star, Quote } from 'lucide-react';
import { ShalomLogo } from '../components/Layout';
import { initQuizSession, saveQuizAnswer, updateSessionStatus } from '../services/supabase';
import { questions, getTerm } from '../data/quizQuestions';
import QuizOffer from '../components/quiz/QuizOffer';

// --- MAIN QUIZ COMPONENT ---
const Quiz: React.FC = () => {
  const [hasStarted, setHasStarted] = useState(false); // Controls Landing vs Quiz
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [userNeed, setUserNeed] = useState('seu Renovo Espiritual');
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({}); 
  const [inputText, setInputText] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [animatingOut, setAnimatingOut] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingText, setLoadingText] = useState('Orando por direção...');
  const [showOffer, setShowOffer] = useState(false);
  
  // Timer State for Offer
  const [timeLeft, setTimeLeft] = useState(20 * 60); // 20 minutes in seconds
  
  // Supabase Session State
  const sessionIdRef = useRef<string | null>(null);

  // Timer Effect
  useEffect(() => {
    if (showOffer) {
        const timer = setInterval(() => {
            setTimeLeft(prev => prev > 0 ? prev - 1 : 0);
        }, 1000);
        return () => clearInterval(timer);
    }
  }, [showOffer]);

  const formatTime = (seconds: number) => {
      const m = Math.floor(seconds / 60);
      const s = seconds % 60;
      return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Initialize Session on Start
  const handleStartQuiz = async () => {
    setHasStarted(true);
    const id = await initQuizSession();
    if (id) sessionIdRef.current = id;
  };

  // Preload next image for speed
  useEffect(() => {
    if (hasStarted) {
        const nextQ = questions[step + 1];
        if (nextQ?.image) {
        const img = new Image();
        img.src = nextQ.image;
        }
    }
  }, [step, hasStarted]);

  useEffect(() => {
    if (quizAnswers[13]) {
        const map: Record<string, string> = {
            'Paz': 'Paz que Excede o Entendimento',
            'Ansiedade': 'Libertação da Ansiedade',
            'Propósito': 'Clareza de Propósito',
            'Família': 'Restauração Familiar',
            'Força': 'Renovo de Forças'
        };
        if (map[quizAnswers[13]]) setUserNeed(map[quizAnswers[13]]);
    } else if (quizAnswers[12] === 'Cansaço e correria') {
        setUserNeed('Combate ao Cansaço e Estresse');
    }
  }, [quizAnswers]);

  const handleAnswer = async (answer: string) => {
    if (currentQ.type === 'text' && !answer.trim()) return;
    
    // Logic to move straight to next question if it's info type
    if (currentQ.type === 'info') {
        setAnimatingOut(true);
        setTimeout(() => {
            setStep(s => s + 1);
            setAnimatingOut(false);
        }, 200);
        return;
    }

    setCurrentAnswer(answer);
    setQuizAnswers(prev => ({ ...prev, [currentQ.id]: answer }));
    
    // ID 1 is Gender
    if (currentQ.id === 1) {
        setGender(answer);
    }

    // ID 2 is now the NAME question
    if (currentQ.id === 2) {
      const cleanName = answer.trim();
      setName(cleanName);
      localStorage.setItem('lumina_username', cleanName);
    }

    // Send to Supabase
    if (!sessionIdRef.current) {
        const id = await initQuizSession();
        if (id) {
            sessionIdRef.current = id;
            saveQuizAnswer(id, currentQ.id, currentQ.question, answer);
        }
    } else {
        saveQuizAnswer(sessionIdRef.current, currentQ.id, currentQ.question, answer);
    }

    setAnimatingOut(true);
    setTimeout(() => {
      // For questions with feedback, show it.
      if (currentQ.feedback && typeof currentQ.feedback === 'function') {
          setShowFeedback(true);
      } else {
          setStep(s => s + 1);
      }
      setAnimatingOut(false);
    }, 200);
  };

  const nextQuestion = () => {
    if (step < questions.length - 2) {
        setAnimatingOut(true);
        setTimeout(() => {
            setStep(s => s + 1);
            setShowFeedback(false);
            setAnimatingOut(false);
            setInputText('');
            setCurrentAnswer(''); 
        }, 200);
    } else {
        setIsGenerating(true);
        // Completed Quiz -> Update Status
        if (sessionIdRef.current) {
            updateSessionStatus(sessionIdRef.current, 'completed');
        }

        const loadingStages = ["Analisando...", "Buscando na Palavra...", "Criando Plano...", "Finalizando..."];
        let stage = 0;
        const interval = setInterval(() => {
            stage++;
            if (stage < loadingStages.length) setLoadingText(loadingStages[stage]);
            else { 
                clearInterval(interval); 
                setIsGenerating(false); 
                setShowOffer(true);
            }
        }, 800);
    }
  };

  const currentQ = questions[step];
  const progressPercent = ((step + 1) / (questions.length - 1)) * 100;
  const genderTerm = gender === 'Homem' ? 'Irmão' : (gender === 'Mulher' ? 'Irmã' : 'Irmão(ã)');

  // --- 0. LANDING / INTRO VIEW ---
  if (!hasStarted) {
    return (
        <div className="h-[100dvh] bg-paper dark:bg-stone-950 text-ink dark:text-white flex flex-col font-sans animate-fade-in relative overflow-hidden">
            {/* Background Blob */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[60%] bg-gradient-to-b from-orange/5 to-transparent dark:from-gold/5 rounded-b-[100%] -z-10"></div>

            {/* Header: Logo & Trust Badges */}
            <div className="w-full max-w-lg mx-auto p-4 pt-6 shrink-0 flex flex-col items-center relative z-20 gap-3">
                <div className="drop-shadow-xl hover:scale-105 transition-transform duration-500">
                    <ShalomLogo size="w-12 h-12" />
                </div>
                <div className="flex items-center gap-3 scale-90">
                    <div className="flex items-center gap-1.5 px-4 py-1.5 bg-white/80 dark:bg-stone-900/80 backdrop-blur-md rounded-full shadow-sm border border-stone-200/60 dark:border-stone-800 text-[10px] font-bold text-subtle">
                        <Shield size={12} className="text-green-500 shrink-0" fill="currentColor" />
                        <span>Ambiente Seguro</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-4 py-1.5 bg-white/80 dark:bg-stone-900/80 backdrop-blur-md rounded-full shadow-sm border border-stone-200/60 dark:border-stone-800 text-[10px] font-bold text-orange">
                        <Star size={12} fill="currentColor" />
                        <span className="text-ink dark:text-white">4.8</span>
                    </div>
                </div>
            </div>

            <div className="flex-1 flex flex-col items-center justify-between max-w-md mx-auto px-6 pb-6 pt-2 text-center relative z-10 w-full">
                {/* Top Section */}
                <div className="flex flex-col items-center justify-center flex-1 min-h-0 w-full">
                    <div className="mb-4 animate-slide-up shrink-0" style={{animationDelay: '0.1s'}}>
                        <span className="inline-flex items-center gap-2 text-[9px] font-black text-orange uppercase tracking-widest bg-orange/10 px-3 py-1 rounded-full border border-orange/10 shadow-sm">
                            <Users size={10} fill="currentColor" /> + 10 mil vidas impactadas
                        </span>
                    </div>
                    <div className="relative w-full h-full max-h-[28vh] aspect-square animate-slide-up flex items-center justify-center shrink-1" style={{animationDelay: '0.2s'}}>
                        <div className="absolute inset-0 rounded-full bg-gold/20 blur-[50px] scale-75 animate-pulse"></div>
                        <img 
                            src="https://files.catbox.moe/rgpqg7.webp" 
                            alt="Mãos em Oração 3D"
                            className="relative z-10 h-full w-auto object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-700" 
                        />
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="flex flex-col items-center shrink-0 w-full mt-4">
                    <h1 className="font-serif font-black text-2xl md:text-4xl text-ink dark:text-white leading-[1.1] mb-2 animate-slide-up" style={{animationDelay: '0.3s'}}>
                        Descubra o que sua vida espiritual <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-orange">precisa hoje</span>.
                    </h1>
                    <p className="text-subtle text-xs md:text-base mb-5 leading-relaxed max-w-xs mx-auto animate-slide-up line-clamp-3" style={{animationDelay: '0.4s'}}>
                        Faça o teste, entenda seu momento com Deus e receba um <strong>Plano de Oração Personalizado</strong>.
                    </p>
                    <div className="flex flex-wrap justify-center gap-2 mb-6 w-full animate-slide-up" style={{animationDelay: '0.5s'}}>
                        <div className="flex items-center gap-1.5 bg-stone-100 dark:bg-stone-900 px-2.5 py-1.5 rounded-lg text-[10px] font-bold text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-800">
                            <Clock size={12} className="text-orange" /> 55s
                        </div>
                        <div className="flex items-center gap-1.5 bg-stone-100 dark:bg-stone-900 px-2.5 py-1.5 rounded-lg text-[10px] font-bold text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-800">
                            <BookOpen size={12} className="text-stone-500" /> Bíblico
                        </div>
                        <div className="flex items-center gap-1.5 bg-stone-100 dark:bg-stone-900 px-2.5 py-1.5 rounded-lg text-[10px] font-bold text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-800">
                            <Sparkles size={12} className="text-gold" /> Personalizado
                        </div>
                    </div>
                    <div className="w-full space-y-2 animate-slide-up" style={{animationDelay: '0.6s'}}>
                        <button 
                            onClick={handleStartQuiz}
                            className="w-full bg-ink dark:bg-white text-white dark:text-ink py-4 rounded-xl font-black text-base shadow-xl shadow-orange/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                        >
                            QUERO MEU PLANO <ChevronRight size={18} strokeWidth={3} />
                        </button>
                        <div className="flex items-center justify-center gap-1.5 text-[9px] font-bold text-stone-400 uppercase tracking-widest">
                            <Lock size={9} /> Privacidade Garantida
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }

  // --- OFFER PAGE RENDER (Refactored to separate file) ---
  if (showOffer) {
    return (
        <QuizOffer 
            name={name}
            genderTerm={genderTerm}
            timeLeft={timeLeft}
            formatTime={formatTime}
            sessionId={sessionIdRef.current}
            updateSessionStatus={updateSessionStatus}
        />
    );
  }

  // --- LOADING RENDER ---
  if (isGenerating) {
    return (
        <div className="min-h-[100dvh] bg-paper flex flex-col items-center justify-center p-8 relative overflow-hidden">
            <div className="relative z-10 text-center w-full max-w-sm">
                <div className="w-20 h-20 mx-auto mb-6 relative flex items-center justify-center">
                    <div className="absolute inset-0 border-t-4 border-orange rounded-full animate-spin"></div>
                    <BookOpen className="text-orange" size={32} />
                </div>
                <h2 className="text-2xl font-serif font-black text-ink mb-2 animate-pulse">{loadingText}</h2>
            </div>
        </div>
    )
  }

  // --- FEEDBACK RENDER (Used for ID 1 and 2 mostly) ---
  if (showFeedback) {
    return (
        <div className="min-h-[100dvh] bg-stone-100 flex flex-col items-center justify-center text-center relative overflow-y-auto animate-fade-in px-4 py-8">
            <div className="w-full max-w-lg bg-[#fdfcf0] shadow-2xl border-t-[8px] border-orange/10 rounded-2xl relative px-6 py-10 animate-slide-up">
                <div className="mb-6 flex justify-center"><div className="p-4 bg-orange text-white rounded-full shadow-lg"><Sparkles size={24} /></div></div>
                <h4 className="text-orange font-black text-[10px] uppercase tracking-[0.3em] mb-6 border-b border-orange/10 pb-3 inline-block">{currentQ.feedbackTitle}</h4>
                <div className="text-ink font-serif text-lg leading-relaxed relative z-10">{typeof currentQ.feedback === 'function' ? currentQ.feedback(name, currentAnswer, gender) : "Deus é fiel!"}</div>
                <button onClick={nextQuestion} className="mt-10 w-full bg-ink text-white py-5 rounded-xl font-black text-xl shadow-xl hover:bg-stone-800 active:scale-95 transition-all flex items-center justify-center gap-3 uppercase tracking-widest">
                    CONTINUAR <ArrowRight size={24} />
                </button>
            </div>
        </div>
    );
  }

  // --- QUESTION RENDER (DEFAULT) ---
  return (
    <div className={`min-h-[100dvh] bg-paper text-ink flex flex-col transition-opacity duration-300 ${animatingOut ? 'opacity-0' : 'opacity-100'}`}>
        
        {/* Progress Bar */}
        <div className="h-2 w-full bg-stone-100 relative z-20">
            <div className="h-full bg-orange transition-all duration-500 ease-out" style={{ width: `${progressPercent}%` }}></div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center p-6 max-w-xl mx-auto w-full relative z-10 overflow-y-auto no-scrollbar">
            
            {/* Logo faded */}
            <div className="absolute top-4 left-4 opacity-30 scale-75 origin-top-left"><ShalomLogo /></div>
            
            {/* Step Counter */}
            <div className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 text-[9px] font-black text-subtle uppercase tracking-[0.2em]">
                ETAPA {step + 1} DE {questions.length - 1}
            </div>

            {/* CUSTOM INFO/LETTER RENDER (ID 3) */}
            {currentQ.type === 'info' && (
               <div className="w-full max-w-2xl mx-auto animate-slide-up pb-10">
                   <div className="bg-[#fdfcf0] p-8 md:p-10 rounded-2xl shadow-xl border-t-8 border-orange relative overflow-hidden">
                       
                       {/* Top Image if present (for ID 3) */}
                       {currentQ.image && (
                           <div className="mb-8 rounded-2xl overflow-hidden shadow-md border-4 border-white">
                               <img src={currentQ.image} alt="Contexto" className="w-full h-auto object-cover" />
                           </div>
                       )}

                       {/* Header */}
                       <div className="text-center mb-8 relative z-10">
                          <h2 className="font-serif font-black text-3xl md:text-4xl text-ink leading-tight mb-2">Deus na palma da sua mão!</h2>
                          <p className="text-orange font-bold uppercase tracking-[0.2em] text-xs">Personalizado para você</p>
                       </div>

                       {/* Body */}
                       <div className="font-serif text-lg md:text-xl text-stone-700 leading-relaxed space-y-6 text-left relative z-10">
                          <p>Que bênção ter você aqui, <span className="font-bold text-ink">{genderTerm} {name}</span>. 🙏</p>
                          <p>Não foi por acaso que você chegou até aqui.</p>
                          
                          <div className="w-20 h-1 bg-orange/20 rounded-full"></div>

                          <p>Antes de continuar, preciso ser <span className="font-bold text-ink underline decoration-orange/30 decoration-2 underline-offset-4">muito claro</span> com você.</p>

                          <p>Essa não é mais uma conversa genérica.<br/>Esse quiz não foi feito para todo mundo.</p>

                          <p className="font-bold text-ink text-xl">Ele existe por um propósito maior.</p>

                          <p>Nós acreditamos que Deus trabalha com direção, não com acaso.<br/>E que cada pessoa vive um momento espiritual diferente.</p>

                          <p className="bg-orange/5 border-l-4 border-orange pl-4 py-2 rounded-r-lg">
                             👉 Esse quiz foi criado para identificar exatamente o estágio em que seu espírito está hoje.<br/>
                             E, no final, te entregar um <span className="font-bold text-ink">plano de ação bíblico</span>, simples e aplicável à sua realidade.
                          </p>

                          <p>Aqui não existem fórmulas prontas.<br/>Não existe mensagem copiada e colada.</p>

                          <p>O agente espiritual que criamos foi treinado com a Bíblia Sagrada,<br/>para ensinar a Palavra com exatidão, clareza e amor,<br/>respeitando o tempo, as dores e os desafios de cada pessoa.</p>

                          <p className="italic text-stone-500">Cada resposta sua importa.<br/>Porque cada pessoa é única diante de Deus.</p>

                          <p>Se você continuar, você não vai apenas responder perguntas.</p>

                          <p className="font-bold text-ink">Você vai sair daqui com:</p>
                          <ul className="space-y-3 font-medium bg-white/50 p-6 rounded-xl border border-stone-100 shadow-sm">
                             <li className="flex gap-3"><span className="text-xl">1️⃣</span> Direção espiritual clara para o que você está vivendo hoje</li>
                             <li className="flex gap-3"><span className="text-xl">2️⃣</span> Um plano prático para caminhar com Deus todos os dias</li>
                             <li className="flex gap-3"><span className="text-xl">3️⃣</span> Um acompanhamento que te lembra da Palavra quando você mais precisa</li>
                          </ul>

                          <p className="font-bold text-ink text-xl pt-4">Agora, algo muito importante:</p>

                          <p>👉 Se o que vamos te apresentar não fizer sentido para você, a conversa para aqui.<br/>Sem pressão. Sem culpa. Sem insistência.</p>

                          <p className="font-bold text-ink">Mas, se você continuar…</p>

                          <p>Faça isso com sinceridade.<br/>Não responda o que “parece certo”.<br/>Responda o que é verdade no seu coração.</p>

                          <p>Não existe resposta errada.<br/>Não existe julgamento.<br/>Não existe vergonha aqui.</p>

                          <p>O agente espiritual precisa ter certeza<br/>se realmente conseguirá caminhar ao seu lado e te ajudar.</p>

                          <p className="bg-ink text-white p-4 rounded-xl font-bold text-center shadow-lg">
                             👉 É isso que define se esse próximo nível é para você.
                          </p>

                          <p>A partir de agora, essa jornada é pessoal.</p>

                          <p>Deus conhece o seu nome.<br/>E, a partir daqui, eu vou caminhar com você também. 🤍</p>

                          <p className="text-center italic font-medium text-orange pt-4 border-t border-stone-200 mt-6">
                             📖 “O Senhor firma os passos de quem nele confia.” — Salmos 37:23
                          </p>
                       </div>

                       {/* Button */}
                       <div className="mt-10 relative z-10">
                          <button 
                             onClick={() => handleAnswer('continue')} 
                             className="w-full bg-green-600 text-white py-5 rounded-xl font-black text-xl shadow-[0_4px_0_rgb(21,128,61)] active:shadow-none active:translate-y-1 transition-all flex items-center justify-center gap-3 hover:bg-green-500 uppercase tracking-widest"
                          >
                             Eu Aceito Continuar <ArrowRight size={24} />
                          </button>
                       </div>

                       {/* Watermark/Decor */}
                       <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
                          <Quote size={200} />
                       </div>
                   </div>
               </div>
            )}

            {/* Question Title (Hidden for Info Type) */}
            {currentQ.type !== 'info' && (
                <h2 className="text-2xl md:text-4xl font-serif font-black text-center mb-8 leading-tight text-ink w-full animate-slide-up">
                    {currentQ.question.replace('[nome]', name).replace('[DESAFIO]', userNeed).replace('Irmão(ã)', genderTerm)}
                </h2>
            )}

            {/* Image (Responsive height) */}
            {currentQ.image && currentQ.type !== 'info' && (
                <div className="w-full max-h-[25vh] md:max-h-[40vh] rounded-3xl overflow-hidden shadow-lg border-4 border-white mb-8 shrink-0 animate-slide-up">
                    <img src={currentQ.image} className="w-full h-full object-cover" alt="Questão" />
                </div>
            )}

            {/* Input Type */}
            {currentQ.type === 'text' && (
                <div className="w-full space-y-6 animate-slide-up">
                    <input 
                        type="text" 
                        value={inputText} 
                        onChange={(e) => setInputText(e.target.value)} 
                        placeholder="Digite aqui..." 
                        className="w-full bg-transparent border-b-4 border-stone-200 text-3xl py-3 text-center font-black outline-none focus:border-orange transition-colors placeholder:text-stone-300" 
                        autoFocus 
                        onKeyDown={(e) => e.key === 'Enter' && handleAnswer(inputText)} 
                    />
                    <button 
                        onClick={() => handleAnswer(inputText)} 
                        disabled={!inputText.trim()} 
                        className="w-full py-5 bg-ink text-white rounded-2xl font-black text-xl shadow-xl active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                    >
                        Confirmar <ArrowRight size={24} />
                    </button>
                </div>
            )}

            {/* CUSTOM GENDER RENDER (ID 1) */}
            {currentQ.id === 1 && currentQ.options && (
               <div className="w-full animate-slide-up flex flex-col gap-6">
                   <div className="grid grid-cols-2 gap-4">
                       <button onClick={() => handleAnswer('Homem')} className="group relative rounded-3xl overflow-hidden aspect-[3/4] shadow-lg border-4 border-white active:scale-95 transition-transform">
                           <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-110" alt="Homem" />
                           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                           <div className="absolute bottom-4 left-4 right-4 bg-white/20 backdrop-blur-md border border-white/20 text-white font-bold text-center py-3 rounded-2xl flex items-center justify-between px-4">
                               <span>Homem</span> <ChevronRight size={16} />
                           </div>
                       </button>
                       <button onClick={() => handleAnswer('Mulher')} className="group relative rounded-3xl overflow-hidden aspect-[3/4] shadow-lg border-4 border-white active:scale-95 transition-transform">
                           <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-110" alt="Mulher" />
                           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                           <div className="absolute bottom-4 left-4 right-4 bg-white/20 backdrop-blur-md border border-white/20 text-white font-bold text-center py-3 rounded-2xl flex items-center justify-between px-4">
                               <span>Mulher</span> <ChevronRight size={16} />
                           </div>
                       </button>
                   </div>
                   <p className="text-center text-xs text-subtle leading-relaxed max-w-xs mx-auto">
                       Para que o Shalom possa se dirigir a você com o respeito e o carinho adequados (Irmão ou Irmã) em todas as mensagens.
                   </p>
               </div>
            )}

            {/* Standard Choice Type (Not Gender) */}
            {currentQ.type === 'choice' && currentQ.id !== 1 && currentQ.options && (
                <div className="w-full grid gap-3 animate-slide-up pb-4">
                    {currentQ.options.map((opt, idx) => (
                        <button key={idx} onClick={() => handleAnswer(opt)} className="w-full p-5 text-left bg-white border-2 border-stone-100 rounded-2xl font-bold text-lg shadow-sm hover:border-orange hover:bg-orange/5 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] transition-all group flex items-center justify-between">
                            <span className="text-stone-700 group-hover:text-ink">{opt}</span>
                            <ChevronRight size={20} className="text-stone-300 group-hover:text-orange" />
                        </button>
                    ))}
                </div>
            )}
        </div>
    </div>
  );
};

export default Quiz;