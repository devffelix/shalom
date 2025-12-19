
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// Fix: Added missing BookOpen import from lucide-react
import { ArrowRight, Check, Sparkles, ChevronRight, Zap, Star, MessageCircle, Quote, AlertCircle, Loader2, PenTool, Calendar, TrendingUp, Sun, Flame, Battery, HelpCircle, BookOpen } from 'lucide-react';
import { ShalomLogo } from '../components/Layout';

// Image Optimization Helper
const optimizeImg = (url: string) => `https://wsrv.nl/?url=${encodeURIComponent(url)}&w=800&q=80&output=webp`;

const ALL_QUIZ_IMAGES = [
  "https://files.catbox.moe/jg59lo.png",
  "https://files.catbox.moe/tnwf7r.png",
  "https://files.catbox.moe/6cpmb1.png",
  "https://files.catbox.moe/mi2tyx.png",
  "https://files.catbox.moe/2mxx5i.png",
  "https://files.catbox.moe/z6h7br.png",
  "https://files.catbox.moe/xnke72.png",
  "https://files.catbox.moe/tlhrp2.png",
  "https://files.catbox.moe/9ijb3y.png",
  "https://files.catbox.moe/82k0mn.png",
  "https://files.catbox.moe/jvm5by.png",
  "https://files.catbox.moe/r5vgr9.png"
].map(optimizeImg);

interface Question {
  id: number;
  type: 'text' | 'choice' | 'final';
  question: string;
  image?: string;
  options?: string[];
  feedbackTitle?: string;
  feedback?: (name: string, answer: string) => string | React.ReactNode;
}

const Highlight: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="bg-orange/20 px-1.5 py-0.5 rounded-sm font-bold border-b border-orange/30 inline-block">{children}</span>
);

const Circle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="relative inline-block px-2 py-0.5 mx-1">
    <span className="absolute inset-0 border-2 border-orange/40 rounded-[45%_55%_50%_50%/_50%_50%_50%_50%] transform -rotate-1 scale-110"></span>
    <span className="relative italic font-bold text-ink">{children}</span>
  </span>
);

const questions: Question[] = [
  {
    id: 1,
    type: 'text',
    question: 'Quiz de 55 segundos. Como posso te chamar?',
    image: optimizeImg("https://files.catbox.moe/jg59lo.png"),
    feedbackTitle: "Deus na palma da sua mão!",
    feedback: (n) => (
      <div className="text-left space-y-6 font-sans text-stone-700">
        <p className="font-serif italic text-2xl text-orange mb-4 leading-tight">Que bênção ter você aqui, irmão(ã) <span className="font-black not-italic text-ink">{n}</span>. 🙏</p>
        <div className="space-y-4 text-base md:text-lg leading-relaxed">
          <p className="font-bold text-ink text-xl">Não foi por acaso que você chegou até aqui.</p>
          <p>Antes de continuar, preciso ser muito claro com você. <Circle>Essa não é mais uma conversa genérica.</Circle></p>
          <p>Esse quiz não foi feito para todo mundo. Ele existe por um <Highlight>propósito maior</Highlight>.</p>
          <p>Nós acreditamos que Deus trabalha com direção, não com acaso. Deus conhece o seu nome. E, a partir daqui, eu vou caminhar com você também. 🤍</p>
          <p className="font-serif italic text-sm mt-4">📖 “O Senhor firma os passos de quem nele confia.” — Salmos 37:23</p>
        </div>
      </div>
    )
  },
  {
    id: 2,
    type: 'choice',
    question: 'Hoje, como você sente que está sua fé?',
    image: optimizeImg("https://files.catbox.moe/tnwf7r.png"),
    options: ['Já foi mais firme do que é hoje', 'Oscila muito conforme os problemas', 'Está viva, mas precisa ser fortalecida'],
    feedbackTitle: "AUTOAVALIAÇÃO DE FÉ",
    feedback: (n) => (
      <div className="text-left space-y-5 text-stone-700 leading-relaxed">
        <p className="font-bold text-xl text-ink">Irmão(ã) {n}, <Highlight>reconhecer isso não é fracasso.</Highlight></p>
        <p>Mas ignorar esse sinal seria perigoso. A fé nunca desaparece de uma vez — <Circle>ela esfria</Circle> quando não é cuidada.</p>
        <p>E Deus está te mostrando isso agora… não amanhã.</p>
        <p className="bg-orange/5 p-6 rounded-xl border-l-4 border-orange italic font-serif text-xl">
          “Tenho, porém, contra ti que abandonaste o teu <Highlight>primeiro amor</Highlight>.” — Apocalipse 2:4
        </p>
      </div>
    )
  },
  {
    id: 3,
    type: 'choice',
    question: 'Com que frequência a oração faz parte do seu dia a dia?',
    image: optimizeImg("https://files.catbox.moe/6cpmb1.png"),
    options: ['Só quando estou enfrentando algo difícil', 'Em alguns dias, mas sem constância', 'Poderia ser muito melhor do que é hoje'],
    feedbackTitle: "ROTINA DE ORAÇÃO",
    feedback: () => (
      <div className="text-left space-y-5 text-stone-700 leading-relaxed">
        <p className="font-bold text-2xl text-ink">Deus não se afasta. <Circle>Somos nós que vamos ficando ocupados demais.</Circle></p>
        <p>A questão não é se você acredita. É se sua rotina reflete essa fé.</p>
        <p className="bg-gold/10 p-6 rounded-2xl border-l-4 border-gold-dark italic font-serif text-xl text-ink">
          “Clama a mim e responder-te-ei.” — Jeremias 33:3
        </p>
      </div>
    )
  },
  {
    id: 4,
    type: 'choice',
    question: 'Você sente clareza ao tentar ouvir a direção de Deus?',
    image: optimizeImg("https://files.catbox.moe/mi2tyx.png"),
    options: ['Muitas vezes me sinto confuso(a)', 'Às vezes entendo, às vezes não', 'Sinto que preciso aprender a ouvir melhor'],
    feedbackTitle: "CONEXÃO / ESCUTA",
    feedback: () => (
      <div className="text-left space-y-5 text-stone-700 leading-relaxed">
        <p className="font-bold text-xl text-ink">Quando Deus parece em silêncio, geralmente o <Highlight>coração está cheio demais.</Highlight></p>
        <p>Cheio de ruído. Cheio de medo. <Circle>Cheio de pressa.</Circle> A boa notícia? Quem aprende a parar… volta a ouvir com clareza.</p>
        <p className="italic text-sm">“As minhas ovelhas ouvem a minha voz.” (João 10:27)</p>
      </div>
    )
  },
  {
    id: 5,
    type: 'choice',
    question: 'Quando enfrenta medo, ansiedade ou tristeza você sabe exatamente que passagem bíblica buscar?',
    image: optimizeImg("https://files.catbox.moe/2mxx5i.png"),
    options: ['Não, geralmente fico perdido(a)', 'Às vezes lembro de algo, mas não aprofundo', 'Sinto que poderia usar melhor a Palavra'],
    feedbackTitle: "CONHECIMENTO BÍBLICO",
    feedback: () => (
      <div className="text-left space-y-5 text-stone-700 leading-relaxed">
        <p className="font-bold text-2xl text-ink"><Circle>O inimigo conhece a Palavra.</Circle></p>
        <p>Por isso, quem não conhece… luta desarmado. Não é sobre decorar versículos. É sobre ter a <Highlight>Palavra certa na hora certa.</Highlight></p>
        <p className="italic text-sm">“O meu povo foi destruído por falta de conhecimento.” — Oséias 4:6</p>
      </div>
    )
  },
  {
    id: 6,
    type: 'choice',
    question: 'Como é sua rotina de leitura bíblica hoje?',
    image: optimizeImg("https://files.catbox.moe/z6h7br.png"),
    options: ['Não consigo manter uma rotina', 'Leio quando lembro ou quando sobra tempo', 'Sei que preciso de mais constância'],
    feedbackTitle: "CONSTÂNCIA NA BÍBLIA",
    feedback: () => (
      <div className="text-left space-y-5 text-stone-700 leading-relaxed">
        <p className="font-bold text-xl text-ink">Fé sem constância vira <Circle>emoção passageira.</Circle></p>
        <p>E emoção não sustenta batalha longa. Deus trabalha com disciplina diária, aos poucos…</p>
        <p className="bg-orange/5 p-6 rounded-xl border-l-4 border-orange italic font-serif text-xl">
          “Quem é <Highlight>fiel no pouco</Highlight>, também é fiel no muito.” — Lucas 16:10
        </p>
      </div>
    )
  },
  {
    id: 7,
    type: 'choice',
    question: 'Em algum momento recente você sentiu que estava lutando espiritualmente sozinho?',
    image: optimizeImg("https://files.catbox.moe/xnke72.png"),
    options: ['Sim, com frequência', 'Às vezes, principalmente nos dias difíceis', 'Tento ser forte, mas sinto falta de apoio'],
    feedbackTitle: "SOLIDÃO ESPIRITUAL",
    feedback: (n) => (
      <div className="text-left space-y-5 text-stone-700 leading-relaxed">
        <p className="font-bold text-2xl text-ink leading-tight">Caminhar sem direção espiritual gera <Highlight>cansaço profundo</Highlight>.</p>
        <p>Deus nunca planejou que você lutasse sozinho. Mesmo quando ninguém te entende, Jesus te segura pela mão. E aqui, você não vai mais caminhar sozinho, {n}.</p>
        <p className="italic text-sm">“Não é bom que o homem esteja só.” — Gênesis 2:18</p>
      </div>
    )
  },
  {
    id: 8,
    type: 'choice',
    question: 'Quando sente tristeza ou desânimo, você tem alguém de fé para conversar?',
    image: optimizeImg("https://files.catbox.moe/tlhrp2.png"),
    options: ['Não, geralmente guardo tudo para mim', 'Às vezes, mas não com frequência', 'Sinto falta de alguém disponível no dia a dia'],
    feedbackTitle: "APOIO EMOCIONAL",
    feedback: () => (
      <div className="text-left space-y-5 text-stone-700 leading-relaxed">
        <p className="font-bold text-2xl text-ink"><Highlight>Silenciar a dor não a cura.</Highlight></p>
        <p>Só a empurra para dentro. E o coração que não fala… <Circle>adoece em silêncio</Circle>. Dor compartilhada pesa menos.</p>
        <p className="italic text-sm">“Levai as cargas uns dos outros.” — Gálatas 6:2</p>
      </div>
    )
  },
  {
    id: 9,
    type: 'choice',
    question: 'Viver mais perto de Deus e com paz no coração é importante para você hoje?',
    image: optimizeImg("https://files.catbox.moe/9ijb3y.png"),
    options: ['Sim, é algo que eu preciso', 'Sim, sinto falta disso', 'Sim, mas não sei por onde começar'],
    feedbackTitle: "FÉ NO PROPÓSITO",
    feedback: () => (
      <div className="text-left space-y-5 text-stone-700 leading-relaxed">
        <p className="font-bold text-xl text-ink">Esse desejo não nasceu em você <Circle>por acaso</Circle>.</p>
        <p>Perder a clareza do que tem que ser feito é o primeiro passo para aceitar menos do que Deus prometeu. Deus nunca chamou você para apenas sobreviver.</p>
        <p className="italic text-sm">“Aproximem-se de Deus, e Ele se aproximará de vocês.” (Tiago 4:8)</p>
      </div>
    )
  },
  {
    id: 10,
    type: 'choice',
    question: 'O que mais tem te impedido de viver essa proximidade com Deus no dia a dia?',
    image: optimizeImg("https://files.catbox.moe/82k0mn.png"),
    options: ['Falta de direção prática', 'Falta de constância', 'Cansaço e correria', 'Sempre deixo para depois'],
    feedbackTitle: "DESEJO DE MUDANÇA",
    feedback: () => (
      <div className="text-left space-y-5 text-stone-700 leading-relaxed">
        <p className="font-bold text-2xl text-ink leading-tight"><Highlight>Entender já é um sinal.</Highlight></p>
        <p>Mas entender sem decisão vira frustração espiritual. A pergunta agora é: você vai continuar desejando… ou começar a agir?</p>
        <p className="italic text-sm">“O espírito está pronto, mas a carne é fraca.” (Mateus 26:41)</p>
      </div>
    )
  },
  {
    id: 11,
    type: 'choice',
    question: 'Se existisse uma forma simples de caminhar com Deus todos os dias, direto no WhatsApp, faria sentido para você?',
    image: optimizeImg("https://files.catbox.moe/jvm5by.png"),
    options: ['Sim, facilitaria muito', 'Sim, seria exatamente o que preciso', 'Sim, me ajudaria a manter constância'],
    feedbackTitle: "A SOLUÇÃO",
    feedback: () => (
      <div className="text-left space-y-5 text-stone-700 leading-relaxed">
        <p className="font-black text-2xl text-orange"><Circle>O chamado já foi feito.</Circle></p>
        <p className="bg-orange/5 p-6 rounded-xl border-l-4 border-orange italic font-serif text-xl">
          📖 “Escolhei hoje a quem servireis.” — Josué 24:15
        </p>
      </div>
    )
  },
  {
    id: 12,
    type: 'choice',
    question: 'Irmão(ã) [nome], Deus preparou algo especial só para você! Seu Plano Espiritual de 14 dias está pronto.',
    image: optimizeImg("https://files.catbox.moe/r5vgr9.png"),
    options: ['Quero começar agora', 'Quero conhecer como funciona', 'Sinto que Deus me trouxe por um motivo'],
    feedbackTitle: "ENTREGA",
    feedback: (n) => (
      <div className="text-left space-y-5 text-stone-700 leading-relaxed">
        <p className="font-bold text-xl text-ink">Prepare seu coração, {n}.</p>
        <p>O que você vai receber a seguir é uma <Highlight>rota de fuga</Highlight> do cansaço e do desânimo. Você está a um passo da sua nova rotina com o Criador.</p>
        <p className="italic text-sm">“Melhor é serem dois do que um.” (Eclesiastes 4:9)</p>
      </div>
    )
  },
  {
    id: 13,
    type: 'final',
    question: 'Consolidando seu Plano Profético...',
    feedback: () => '' 
  }
];

const Quiz: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [userNeed, setUserNeed] = useState('seu Renovo Espiritual');
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({}); 
  const [inputText, setInputText] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [animatingOut, setAnimatingOut] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingText, setLoadingText] = useState('Orando por direção...');
  const [showOffer, setShowOffer] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'yearly' | 'monthly'>('yearly');

  useEffect(() => {
    if (quizAnswers[10] === 'Cansaço e correria') setUserNeed('Combate ao Cansaço e Estresse');
    else if (quizAnswers[10] === 'Falta de constância') setUserNeed('Constância e Disciplina Espiritual');
    else if (quizAnswers[2] === 'Oscila muito conforme os problemas') setUserNeed('Fortalecimento da Fé Inabalável');
  }, [quizAnswers]);

  const handleAnswer = (answer: string) => {
    if (currentQ.type === 'text' && !answer.trim()) return;
    setCurrentAnswer(answer);
    setQuizAnswers(prev => ({ ...prev, [currentQ.id]: answer }));
    if (currentQ.id === 1) {
      setName(answer.trim());
      localStorage.setItem('lumina_username', answer.trim());
    }
    setAnimatingOut(true);
    setTimeout(() => {
      setShowFeedback(true);
      setAnimatingOut(false);
    }, 300);
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
        }, 300);
    } else {
        setIsGenerating(true);
        const loadingStages = ["Analisando suas respostas...", "Consultando as Escrituras...", "Preparando sua Carta de Direção...", "Alinhando seu propósito...", "Finalizando seu Plano Divino..."];
        let stage = 0;
        const interval = setInterval(() => {
            stage++;
            if (stage < loadingStages.length) setLoadingText(loadingStages[stage]);
            else { clearInterval(interval); setIsGenerating(false); setStep(questions.length - 1); }
        }, 1200);
    }
  };

  const currentQ = questions[step];
  const progressPercent = ((step + 1) / (questions.length - 1)) * 100;

  if (showOffer) {
    return (
        <div className="min-h-screen bg-[#fcfbf7] text-ink overflow-y-auto animate-fade-in relative z-50 selection:bg-orange/20">
            <div className="bg-orange text-white py-3 text-center font-black text-[10px] md:text-xs uppercase tracking-[0.2em] shadow-md sticky top-0 z-[60] flex items-center justify-center gap-2">
               <Zap size={14} fill="currentColor" /> PROMOÇÃO DE DEZEMBRO - ÚLTIMAS VAGAS COM DESCONTO
            </div>

            <div className="max-w-2xl mx-auto p-6 md:p-12 pb-32">
                <div className="text-center mb-10">
                    <div className="inline-block p-4 bg-orange/10 rounded-3xl text-orange mb-6 border border-orange/20 shadow-soft">
                        <Flame size={40} strokeWidth={1.5} className="animate-pulse" />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-serif font-black leading-tight mb-4 text-ink">
                        Sua fé merece um <br/>
                        <span className="text-orange underline decoration-orange/20 underline-offset-8 italic">novo recomeço.</span>
                    </h1>
                </div>
                
                <div className="font-serif text-lg md:text-xl leading-relaxed mx-auto mb-12 space-y-8 text-stone-800">
                    <p className="text-ink font-bold text-2xl">Prezado(a) {name},</p>
                    <p>Sua jornada espiritual está prestes a mudar de nível. Através das suas respostas, identificamos que o que você mais precisa hoje é de <strong className="text-orange">{userNeed}</strong>.</p>
                    <p>O Shalom não é apenas um app. É o seu companheiro diário que não te deixa desistir. Imagine acordar e, antes de qualquer estresse, receber uma oração e a direção bíblica exata para o seu dia no WhatsApp.</p>
                    <div className="bg-white border-2 border-dashed border-stone-200 p-8 my-10 shadow-sm rounded-3xl relative overflow-hidden group">
                        <Quote className="absolute -top-4 -left-2 text-gold/10 group-hover:text-gold/20 transition-colors" size={100} />
                        <p className="text-2xl text-ink font-bold italic leading-tight mb-4 relative z-10">
                           "Investir na sua vida espiritual é o único investimento com retorno eterno."
                        </p>
                        <p className="text-xs text-subtle font-sans font-bold uppercase tracking-widest">— EQUIPE SHALOM</p>
                    </div>
                </div>

                <div className="space-y-6 mb-12">
                    <div onClick={() => setSelectedPlan('yearly')} className={`relative cursor-pointer rounded-[2.5rem] overflow-hidden border-2 transition-all duration-300 flex flex-col shadow-2xl group ${selectedPlan === 'yearly' ? 'bg-white border-gold ring-8 ring-gold/10 scale-105' : 'bg-white border-stone-200 opacity-70 hover:opacity-100'}`}>
                        <div className="p-8">
                            <div className="absolute top-4 right-4 bg-gold text-ink text-[10px] font-black px-5 py-2 rounded-full uppercase tracking-widest shadow-lg">RECOMENDADO</div>
                            <div className="flex items-center justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-colors ${selectedPlan === 'yearly' ? 'bg-gold border-gold text-white' : 'border-stone-200'}`}>
                                        <Check size={20} strokeWidth={4} />
                                    </div>
                                    <div className="text-left">
                                        <h4 className="font-black text-ink text-2xl tracking-tight">Plano Anual</h4>
                                        <p className="text-stone-500 text-xs font-bold">Apenas R$ 0,13 por dia</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="text-xs text-red-500 line-through font-bold">R$ 118,80</span>
                                    <div className="text-4xl font-black text-ink tracking-tighter">R$ 49,90 <span className="text-xs font-normal text-stone-400">/ano</span></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div onClick={() => setSelectedPlan('monthly')} className={`relative cursor-pointer rounded-3xl overflow-hidden border-2 transition-all duration-300 flex flex-col ${selectedPlan === 'monthly' ? 'bg-white border-stone-800' : 'bg-transparent border-stone-200 opacity-60'}`}>
                        <div className="p-6 flex items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedPlan === 'monthly' ? 'border-ink bg-ink' : 'border-stone-300'}`}>
                                    {selectedPlan === 'monthly' && <div className="w-2 h-2 bg-white rounded-full"></div>}
                                </div>
                                <h4 className="font-bold text-ink text-lg">Plano Mensal</h4>
                            </div>
                            <div className="text-2xl font-black text-ink">R$ 9,90</div>
                        </div>
                    </div>
                </div>

                <button onClick={() => { const link = selectedPlan === 'yearly' ? 'https://pay.cakto.com.br/4f62xu5' : 'https://pay.cakto.com.br/37whf2r_678375'; window.location.href = link; }} className="w-full relative group overflow-hidden bg-green-500 text-white py-7 rounded-3xl font-black text-2xl shadow-[0_10px_0_rgb(21,128,61)] hover:bg-green-600 hover:-translate-y-1 transition-all active:translate-y-1 active:shadow-none mb-4">
                    <span className="relative flex items-center justify-center gap-3">ATIVAR MEU ACESSO AGORA <ArrowRight size={28} /></span>
                </button>
                <p className="text-center text-[10px] text-stone-400 uppercase tracking-[0.2em] font-black">🔒 AMBIENTE 100% SEGURO. ACESSO IMEDIATO.</p>
            </div>
        </div>
    );
  }

  if (currentQ.type === 'final' && !isGenerating) {
    return (
        <div className="min-h-screen bg-[#f5f3f0] text-ink overflow-y-auto animate-fade-in relative font-sans">
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]"></div>
            <div className="max-w-xl mx-auto px-6 pb-36 pt-16 relative z-10">
                <div className="mb-12 text-center">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-orange/10 border border-orange/20 text-orange text-[10px] font-bold uppercase tracking-[0.3em] mb-6">Diagnóstico Confirmado</div>
                    <h1 className="text-4xl md:text-5xl font-serif font-black leading-tight mb-6 text-ink">
                        Irmão(ã) <span className="text-orange">{name}</span>, isso não é coincidência. <br/>
                        <Circle>É direção.</Circle>
                    </h1>
                </div>

                <div className="bg-[#fdfcf0] shadow-2xl rounded-sm p-8 md:p-12 mb-12 border-t-[20px] border-orange/10 relative transform -rotate-1">
                    <div className="absolute top-4 right-4 opacity-20"><PenTool size={32} className="text-orange" /></div>
                    <div className="space-y-6 font-serif text-xl leading-relaxed text-stone-800">
                        <p className="font-bold text-2xl text-ink leading-tight">Vimos que <Highlight>está faltando constância</Highlight> e clareza no seu caminhar.</p>
                        <p className="italic underline decoration-orange/30 underline-offset-8 text-lg">E isso está afetando sua paz, sua fé e como você lida com o cansaço.</p>
                        <p>Deus não te trouxe até aqui para voltar ao automático. <Circle>Este é o seu ponto de virada.</Circle></p>
                        <div className="py-6 border-y border-stone-200 space-y-4 text-center">
                            <p className="font-black text-ink text-2xl leading-tight">Escolha hoje: <br/> Continuar tentando sozinho… <br/> Ou começar uma nova rotina com o Mestre.</p>
                        </div>
                        <p className="text-center font-bold text-orange text-2xl">📖 “Eis que faço novas todas as coisas.” — Ap 21:5</p>
                    </div>
                </div>

                <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#f5f3f0] via-[#f5f3f0] to-transparent z-40">
                    <div className="max-w-xl mx-auto space-y-4">
                        <button onClick={() => setShowOffer(true)} className="w-full relative group overflow-hidden bg-green-500 text-white py-6 rounded-[2rem] font-black text-2xl shadow-[0_10px_40px_-10px_rgba(34,197,94,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all flex flex-col items-center leading-none gap-1">
                            <span className="flex items-center gap-2">ATIVAR PLANO COMPLETO <ArrowRight size={28} /></span>
                            <span className="text-[10px] opacity-80 font-black tracking-[0.2em] uppercase">R$ 49,90 • PROMOÇÃO DE DEZEMBRO</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
  }

  if (isGenerating) {
    return (
        <div className="min-h-screen bg-paper flex flex-col items-center justify-center p-8 relative overflow-hidden">
            <div className="relative z-10 text-center w-full max-w-sm">
                <div className="w-24 h-24 mx-auto mb-8 relative flex items-center justify-center">
                    <div className="absolute inset-0 border-t-4 border-orange rounded-full animate-spin"></div>
                    <BookOpen className="text-orange" size={40} />
                </div>
                <h2 className="text-3xl font-serif font-black text-ink mb-2 animate-pulse">{loadingText}</h2>
            </div>
        </div>
    )
  }

  if (showFeedback) {
    return (
        <div className="min-h-screen bg-stone-100 flex flex-col items-center justify-start text-center relative overflow-y-auto animate-fade-in px-4 py-12 md:py-20 no-scrollbar">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-stone-50 to-stone-200"></div>
            <div className="relative z-10 max-w-2xl w-full flex flex-col items-center">
                <div className="w-full bg-[#fdfcf0] shadow-2xl border-t-[30px] border-orange/5 rounded-sm relative px-8 py-12 md:px-16 md:py-20 animate-slide-up transform -rotate-[0.5deg]">
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]"></div>
                    <div className="mb-10 flex justify-center"><div className="p-5 bg-orange text-white rounded-full shadow-xl scale-110"><Sparkles size={32} /></div></div>
                    <h4 className="text-orange font-black text-[10px] uppercase tracking-[0.4em] mb-10 border-b border-orange/10 pb-4 inline-block">{currentQ.feedbackTitle}</h4>
                    <div className="text-ink font-serif text-xl leading-loose relative z-10">{typeof currentQ.feedback === 'function' ? currentQ.feedback(name, currentAnswer) : "Deus é fiel!"}</div>
                    <div className="mt-12 pt-8 border-t border-stone-200/50 flex justify-between items-center opacity-40"><span className="text-[10px] font-black uppercase tracking-widest">Passo {currentQ.id} • Shalom</span><div className="flex gap-1">{[1,2,3].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-stone-300"></div>)}</div></div>
                </div>
                <button onClick={nextQuestion} className="mt-12 group bg-ink text-white px-20 py-7 rounded-[2rem] font-black text-2xl shadow-2xl hover:bg-orange hover:scale-105 active:scale-95 transition-all flex items-center gap-4 animate-slide-up uppercase tracking-widest">CONTINUAR <ArrowRight size={28} /></button>
            </div>
        </div>
    );
  }

  return (
    <div className={`min-h-screen bg-paper text-ink flex flex-col transition-opacity duration-500 ${animatingOut ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
        <div className="h-3 w-full bg-stone-100 relative z-20"><div className="h-full bg-orange transition-all duration-700 ease-out" style={{ width: `${progressPercent}%` }}></div></div>
        <div className="flex-1 flex flex-col items-center justify-start md:justify-center p-6 md:p-12 max-w-4xl mx-auto w-full relative z-10 pt-16 overflow-y-auto no-scrollbar">
            <div className="mb-8 opacity-20"><ShalomLogo size="w-14 h-14" /></div>
            {currentQ.image && <div className="w-full max-w-lg aspect-[16/9] rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white mb-10 animate-slide-up"><img src={currentQ.image} className="w-full h-full object-cover" alt="Questão" /></div>}
            <div className="mb-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-stone-100 text-[10px] font-black text-subtle uppercase tracking-[0.2em]">ETAPA {step + 1} DE {questions.length - 1}</div>
            <h2 className="text-3xl md:text-5xl font-serif font-black text-center mb-12 leading-tight text-ink max-w-2xl">{currentQ.question.replace('[nome]', name)}</h2>
            {currentQ.type === 'text' && (
                <div className="w-full max-w-md space-y-8 animate-slide-up">
                    <input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder="Escreva seu nome..." className="w-full bg-transparent border-b-4 border-stone-200 text-4xl md:text-5xl py-4 text-center font-black outline-none focus:border-orange transition-colors placeholder:text-stone-200" autoFocus onKeyDown={(e) => e.key === 'Enter' && handleAnswer(inputText)} />
                    <button onClick={() => handleAnswer(inputText)} disabled={!inputText.trim()} className="w-full py-6 bg-ink text-white rounded-[2rem] font-black text-xl shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-3 uppercase tracking-widest">Continuar <ArrowRight size={24} /></button>
                </div>
            )}
            {currentQ.type === 'choice' && currentQ.options && (
                <div className="w-full max-w-lg grid gap-4 animate-slide-up pb-10">
                    {currentQ.options.map((opt, idx) => (
                        <button key={idx} onClick={() => handleAnswer(opt)} className="w-full p-6 md:p-8 text-left bg-white border-2 border-stone-100 rounded-[2.5rem] font-black text-lg md:text-xl shadow-soft hover:border-orange hover:bg-orange/5 hover:-translate-y-1 transition-all group flex items-center justify-between">
                            <span className="text-stone-700 group-hover:text-ink transition-colors">{opt}</span>
                            <div className="w-8 h-8 rounded-full border-2 border-stone-200 group-hover:border-orange group-hover:bg-orange transition-colors flex items-center justify-center"><ChevronRight size={18} className="text-transparent group-hover:text-white" /></div>
                        </button>
                    ))}
                </div>
            )}
        </div>
    </div>
  );
};

export default Quiz;
