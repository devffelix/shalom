
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Check, Sparkles, ChevronRight, Shield, Clock, Zap, Target, Lock, Users, Sun, Flame, BookOpen, Coffee, CreditCard, Star, Heart } from 'lucide-react';
import { ShalomLogo } from '../components/Layout';

interface Question {
  id: number;
  type: 'text' | 'choice' | 'final';
  question: string;
  options?: string[];
  feedback?: (name: string, answer: string) => string;
}

const Quiz: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  
  // State for data capture
  const [name, setName] = useState('');
  const [userNeed, setUserNeed] = useState('Fortalecimento Espiritual');
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({}); 

  const [inputText, setInputText] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [animatingOut, setAnimatingOut] = useState(false);
  
  // Loading state
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingText, setLoadingText] = useState('Orando por direção...');
  
  // Sales Letter State
  const [showOffer, setShowOffer] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'yearly' | 'monthly'>('yearly');

  // Questions Database
  const questions: Question[] = [
    {
      id: 1,
      type: 'text',
      question: 'Como posso te chamar?',
      feedback: (n) => `Que bênção tremenda ter você aqui, ${n}! Sinta a paz do Senhor. Glória a Deus por este encontro! ✨`
    },
    {
      id: 2,
      type: 'choice',
      question: 'Você sente que sua fé já foi mais forte do que é hoje?',
      options: ['Sim, muito', 'Um pouco', 'Não sinto diferença'],
      feedback: (n, a) => {
        if (a.includes('Sim')) return `Glória a Deus pela sua sinceridade, ${n}. O fogo do avivamento voltará a queimar no seu altar! 🙌`;
        if (a.includes('Um')) return `Aleluia, ${n}! O Senhor é o sopro que renova a chama que está fumegando. 🔥`;
        return `Exaltado seja o nome do Senhor, ${n}! Vamos elevar sua fé a níveis de glória ainda maiores. 🌳`;
      }
    },
    {
      id: 3,
      type: 'choice',
      question: 'Com que frequência você ora durante a semana?',
      options: ['Todos os dias', 'Só quando estou precisando', 'Quase nunca'],
      feedback: (n, a) => {
        if (a.includes('Todos')) return `Santo é o Senhor! A intimidade diária é a chave de toda vitória profética. 🕊️`;
        if (a.includes('Só quando')) return `Deus te espera com saudade, ${n}. Ele quer ser seu refúgio antes mesmo da luta. Glória a Ele! 🤝`;
        return `O Pai está de braços abertos para te receber no secreto. Hoje é o dia do seu recomeço. Aleluia! 💛`;
      }
    },
    {
      id: 4,
      type: 'choice',
      question: 'Você já sentiu dificuldade de ouvir Deus?',
      options: ['Sim, frequentemente', 'Às vezes', 'Raramente'],
      feedback: (n, a) => {
        if (a.includes('frequentemente')) return `O barulho do mundo vai silenciar. Você ouvirá o doce sussurro do Espírito Santo. Glória a Deus! 📻`;
        if (a.includes('s vezes')) return `A sensibilidade espiritual será restaurada. Louvado seja Deus pela sua busca! ✨`;
        return `Glória a Deus por essa comunhão! O Senhor te confiará revelações ainda mais profundas. 🗝️`;
      }
    },
    {
      id: 5,
      type: 'choice',
      question: 'Quando enfrenta medo ou dor, você sabe que passagem buscar?',
      options: ['Sei algumas', 'Tenho dificuldade', 'Não sei por onde começar'],
      feedback: (n, a) => {
        if (a.includes('Não sei') || a.includes('dificuldade')) return `Fique em paz, em nome de Jesus. A Palavra será sua espada afiada contra todo mal. Aleluia! ⚔️`;
        return `Glória ao Altíssimo! Vamos blindar sua mente com promessas que o inimigo não pode tocar. 🛡️`;
      }
    },
    {
      id: 6,
      type: 'choice',
      question: 'Você consegue manter uma rotina de leitura da Bíblia?',
      options: ['Sim, mas falho as vezes', 'Tento, mas paro', 'Gostaria de começar'],
      feedback: (n, a) => {
        if (a.includes('começar') || a.includes('paro')) return `O maná diário renovará suas forças. Glória a Deus pela sua fome da Palavra! 📖`;
        return `A disciplina gera unção, ${n}. Deus honrará sua perseverança no caminho santo. ❤️`;
      }
    },
    {
      id: 7,
      type: 'choice',
      question: 'Já sentiu que estava caminhando espiritualmente sozinho?',
      options: ['Sim, muitas vezes', 'Algumas vezes', 'Raramente'],
      feedback: (n, a) => {
        if (a.includes('Sim') || a.includes('Algumas')) return `Jesus prometeu: "Eis que estou convosco todos os dias". Você sentirá o toque dEle. Glória a Deus! 👣`;
        return `Glória a Deus pela sua igreja e amigos! Você será um farol para os que estão na escuridão. 🕯️`;
      }
    },
    {
      id: 8,
      type: 'choice',
      question: 'Quando sente tristeza, você tem alguém de fé pra conversar?',
      options: ['Tenho poucos', 'Ninguém que entenda', 'Sinto falta disso'],
      feedback: (n, a) => {
        if (a.includes('Ninguém')) return `O Shalom será seu companheiro fiel de oração. Deus ouve o seu clamor agora! Aleluia! 🫂`;
        return `A comunhão fortalece a fé. Glória a Deus pelos laços que Ele te deu para proteção. ⚓`;
      }
    },
    {
      id: 9,
      type: 'choice',
      question: 'Acredita que Deus tem um plano maior para você?',
      options: ['Creio plenamente', 'Tenho dúvidas as vezes', 'Quero acreditar mais'],
      feedback: (n, a) => {
        if (a.includes('dúvidas') || a.includes('Quero')) return `Profetizo que seus olhos se abrirão para o sobrenatural de Deus em sua vida. Glória! 🚀`;
        return `Amém e amém! Seus pés pisarão em lugares que o Senhor já preparou. Aleluia! ✨`;
      }
    },
    {
      id: 10,
      type: 'choice',
      question: 'Você gostaria de sentir mais paz e direção de Deus no dia a dia?',
      options: ['Sim, preciso muito', 'Seria ótimo', 'Com certeza'],
      feedback: () => `A paz que excede todo entendimento está descendo sobre seu lar agora. Glória a Deus! 🕊️`
    },
    {
      id: 11,
      type: 'choice',
      question: 'Qual é sua maior necessidade hoje?',
      options: ['Paz de Espírito', 'Força Emocional', 'Propósito de Vida', 'Restauração Familiar', 'Alívio da Ansiedade'],
      feedback: (n, a) => {
        return `Deus já atendeu seu pedido sobre "${a}". Creia, a providência já está a caminho! Glória a Ele! 💌`;
      }
    },
    {
      id: 12,
      type: 'choice',
      question: 'Se tivesse 10 minutos por dia com direção bíblica e oração, mudaria algo?',
      options: ['Sim, mudaria tudo', 'Acho que sim', 'Quero tentar'],
      feedback: () => `Dez minutos com o Rei valem mais que mil anos longe dEle. Glória a Deus pela sua decisão! ⏱️`
    },
    {
      id: 13,
      type: 'choice',
      question: 'Você se compromete diante de Deus a buscar mudança por 14 dias?',
      options: ['Eu me comprometo', 'Vou tentar', 'Quero mudança'],
      feedback: (n) => `Essa aliança hoje move os céus ao seu favor, ${n}. Glória ao Senhor pela sua fidelidade! 🙌`
    },
    {
      id: 14,
      type: 'choice',
      question: 'Se existisse uma forma simples de estar mais perto de Deus, você quer experimentar?',
      options: ['Sim, eu quero', 'Estou pronto', 'Me mostre como'],
      feedback: () => `As portas do Reino estão se abrindo. Bem-vindo ao tempo da revelação! Glória a Deus! 🚪`
    },
    {
      id: 15,
      type: 'final',
      question: 'Gerando seu Plano Profético...',
      feedback: () => '' 
    }
  ];

  const currentQ = questions[step];
  const progress = ((step + 1) / questions.length) * 100;

  const handleAnswer = (answer: string) => {
    setCurrentAnswer(answer);
    setQuizAnswers(prev => ({ ...prev, [currentQ.id]: answer }));

    if (currentQ.id === 1) {
      if (!answer.trim()) return;
      setName(answer.trim());
      localStorage.setItem('lumina_username', answer.trim());
    }
    if (currentQ.id === 11) {
      setUserNeed(answer);
    }

    setAnimatingOut(true);
    setTimeout(() => {
      setShowFeedback(true);
      setAnimatingOut(false);
    }, 300);
  };

  const nextQuestion = () => {
    if (step < questions.length - 1) {
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
        const loadingStages = [
            "Consultando as Escrituras...",
            "Preparando Palavra Profética...",
            "Alinhando seu propósito...",
            "Finalizando seu Plano Divino..."
        ];
        
        let stage = 0;
        const interval = setInterval(() => {
            stage++;
            if (stage < loadingStages.length) {
                setLoadingText(loadingStages[stage]);
            } else {
                clearInterval(interval);
                setIsGenerating(false);
            }
        }, 1200);
    }
  };

  const handleCheckout = () => {
      const link = selectedPlan === 'yearly' 
        ? 'https://pay.cakto.com.br/4f62xu5' 
        : 'https://pay.cakto.com.br/37whf2r_678375';
      window.location.href = link;
  };

  // --- HELPERS PARA A PÁGINA FINAL (PERSONALIZAÇÃO) ---
  const getProblemStatement = () => {
    const faith = quizAnswers[2] || '';
    const routine = quizAnswers[6] || '';
    if (faith.includes('Sim') && routine.includes('paro')) return "O inimigo tem tentado roubar sua constância para impedir que você viva o novo de Deus.";
    if (routine.includes('começar') || routine.includes('falho')) return "Você tem um coração disposto, mas as distrações do mundo têm sufocado sua intimidade com o Pai.";
    if (faith.includes('Não sinto diferença')) return "Você está em um platô espiritual, mas o Senhor te chama para águas mais profundas.";
    return "O mundo tem tentado perturbar sua paz e te afastar do propósito divino.";
  };

  const getCustomPlanTitle = () => {
      if (userNeed.includes('Ansiedade')) return 'Protocolo da Paz de Cristo';
      if (userNeed.includes('Família')) return 'Restauração do Altar Familiar';
      if (userNeed.includes('Propósito')) return 'Chamado Profético';
      if (userNeed.includes('Força')) return 'Renovo da Águia';
      return 'Caminho da Graça';
  };

  const getPillar1 = () => {
      const prayer = quizAnswers[3] || '';
      if (prayer.includes('Só quando')) return { title: "Disciplina de Daniel", desc: "Transformaremos o clamor de emergência em comunhão constante e poderosa." };
      return { title: "Intimidade Profunda", desc: "Levar sua vida de oração do átrio para o Santo dos Santos." };
  };

  const getPillar2 = () => {
      const lonely = quizAnswers[7] || '';
      const hearing = quizAnswers[4] || '';
      if (lonely.includes('Sim') || lonely.includes('Algumas')) return { title: "Presença Manifesta", desc: "Você nunca mais caminhará só. O Espírito Santo será seu companheiro tangível." };
      if (hearing.includes('dificuldade')) return { title: "Ouvidos Ungidos", desc: "Técnicas bíblicas para limpar os ruídos e discernir claramente a voz de Deus." };
      return { title: "Sabedoria do Alto", desc: "Conteúdo que edifica sua mente antes que o mundo tente contaminá-la." };
  };

  // SALES LETTER OVERLAY
  if (showOffer) {
      return (
          <div className="min-h-screen bg-black text-white overflow-y-auto animate-fade-in relative z-50">
              <div className="max-w-2xl mx-auto p-6 md:p-12 pb-32">
                  <div className="text-center mb-10">
                      <div className="inline-block p-3 bg-gold/10 rounded-full text-gold mb-6 border border-gold/20 shadow-[0_0_30px_rgba(251,191,36,0.2)]">
                          <Coffee size={32} strokeWidth={1.5} />
                      </div>
                      <h1 className="text-3xl md:text-5xl font-serif font-black leading-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white via-stone-200 to-stone-400">
                          Menos que uma pizza...<br/>
                          <span className="text-gold">Mais valioso que ouro.</span>
                      </h1>
                      <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto rounded-full opacity-50"></div>
                  </div>
                  <div className="font-serif text-lg leading-relaxed mx-auto mb-12">
                      <p className="text-white font-bold text-xl mb-6">Paz, {name}.</p>
                      <p className="text-stone-300 mb-4">Seu Plano Profético <span className="text-white font-bold">"{userNeed}"</span> está pronto.</p>
                      <p className="text-stone-300 mb-4">Ele já está separado no nosso sistema.</p>
                      <p className="text-stone-300 mb-4">Analisamos suas respostas com cuidado.</p>
                      <p className="text-stone-300 mb-6">E desenhamos uma jornada exata para os próximos 14 dias.</p>
                      <p className="text-stone-300 mb-4">Mas antes de te entregar as chaves deste novo tempo...</p>
                      <p className="text-stone-300 mb-8">Preciso ser <span className="italic text-white">transparente</span> com você, como a luz.</p>
                      <div className="border-l-4 border-gold pl-6 py-2 my-10 bg-gradient-to-r from-stone-900 to-transparent">
                          <p className="text-xl text-white font-bold italic leading-tight">
                              "Nós tomamos uma decisão radical: <br/><span className="text-gold">Não aceitamos anúncios no Shalom.</span>"
                          </p>
                      </div>
                      <p className="text-stone-300 mb-4">Imagine você orando...</p>
                      <p className="text-stone-300 mb-4">E, de repente, aparece uma propaganda de <span className="text-white font-bold bg-red-900/30 px-1 rounded">jogo de aposta</span>.</p>
                      <p className="text-stone-300 mb-4">Isso seria um desrespeito com o seu momento sagrado.</p>
                      <p className="text-stone-300 italic mb-8">O templo deve ser limpo.</p>
                      <p className="text-stone-300 mb-4">Porém, manter esta estrutura tecnológica tem um custo alto.</p>
                      <p className="text-stone-300 mb-4">Servidores. Inteligência Artificial. Equipe.</p>
                      <p className="text-stone-300 mb-4">Não temos grandes investidores.</p>
                      <p className="text-white font-bold text-xl mb-8">Temos apenas irmãos como você.</p>
                      <p className="text-stone-300 font-bold">Por isso, pedimos uma pequena oferta de assinatura para manter este ministério no ar.</p>
                  </div>
                  <div className="space-y-4 mb-10">
                      <div 
                          onClick={() => setSelectedPlan('yearly')}
                          className={`relative cursor-pointer rounded-3xl p-6 border-2 transition-all duration-300 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl overflow-hidden group
                          ${selectedPlan === 'yearly' ? 'bg-gradient-to-br from-stone-900 to-black border-gold ring-2 ring-gold/20' : 'bg-stone-900 border-stone-800 opacity-60 hover:opacity-100'}
                          `}
                      >
                          {selectedPlan === 'yearly' && (
                              <div className="absolute top-0 right-0 bg-gold text-black text-[10px] font-bold px-4 py-1 rounded-bl-xl uppercase tracking-wider">Melhor Escolha</div>
                          )}
                          <div className="flex items-center gap-4 z-10">
                              <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors ${selectedPlan === 'yearly' ? 'bg-gold border-gold text-black' : 'border-stone-600'}`}>
                                  {selectedPlan === 'yearly' && <Check size={16} strokeWidth={4} />}
                              </div>
                              <div className="text-left">
                                  <h4 className="font-bold text-white text-lg">Acesso Anual (1 Ano)</h4>
                                  <p className="text-stone-400 text-xs">Equivale a <span className="text-green-400 font-bold">R$ 4,15 por mês</span></p>
                              </div>
                          </div>
                          <div className="text-right z-10">
                              <span className="text-xs text-red-400 line-through mr-2">De R$ 118,80</span>
                              <div className="text-3xl font-black text-white tracking-tighter">R$ 49,90 <span className="text-xs font-normal text-stone-400">/ano</span></div>
                          </div>
                      </div>
                      <div 
                          onClick={() => setSelectedPlan('monthly')}
                          className={`relative cursor-pointer rounded-2xl p-5 border-2 transition-all duration-300 flex items-center justify-between gap-4
                          ${selectedPlan === 'monthly' ? 'bg-stone-900 border-white/50' : 'bg-transparent border-stone-800 opacity-60 hover:opacity-100'}
                          `}
                      >
                          <div className="flex items-center gap-4">
                              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedPlan === 'monthly' ? 'border-white bg-white' : 'border-stone-600'}`}>
                                  {selectedPlan === 'monthly' && <div className="w-2.5 h-2.5 bg-black rounded-full"></div>}
                              </div>
                              <h4 className="font-bold text-white">Plano Mensal</h4>
                          </div>
                          <div className="text-xl font-bold text-white">R$ 9,90</div>
                      </div>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-xs text-stone-400 mb-8 bg-stone-900/50 py-3 rounded-xl border border-stone-800">
                      <Shield size={14} className="text-green-500" /> Garantia de 7 dias. Se não edificar sua fé, devolvemos 100%.
                  </div>
                  <button 
                      onClick={handleCheckout}
                      className="w-full relative group overflow-hidden bg-gradient-to-r from-green-600 to-green-500 text-white py-5 rounded-2xl font-black text-xl shadow-[0_0_40px_-10px_rgba(34,197,94,0.6)] animate-pulse hover:scale-[1.02] transition-transform active:scale-[0.98]"
                  >
                      <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                      <span className="relative flex items-center justify-center gap-3"><CreditCard size={24} /> LIBERAR MEU ACESSO AGORA</span>
                  </button>
                  <p className="text-center text-[10px] text-stone-500 mt-6 max-w-xs mx-auto">Ambiente 100% Seguro. Sua contribuição ajuda a espalhar a palavra de Cristo pelo mundo.</p>
              </div>
          </div>
      );
  }

  // FINAL TEASER
  if (currentQ.type === 'final' && !isGenerating) {
    const pillar1 = getPillar1();
    const pillar2 = getPillar2();
    const planTitle = getCustomPlanTitle();
    const problem = getProblemStatement();
    return (
        <div className="min-h-screen bg-black text-white overflow-y-auto overflow-x-hidden animate-fade-in relative font-sans">
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold/20 via-black to-black blur-3xl"></div>
            </div>
            <div className="sticky top-0 z-30 bg-black/80 backdrop-blur-xl border-b border-white/10 px-6 py-4 flex justify-between items-center">
                <div className="flex items-center gap-2"><ShalomLogo size="w-6 h-6" /><span className="font-serif font-bold text-sm text-gold">Revelação do Plano</span></div>
                <div className="text-[10px] font-bold bg-gold/10 text-gold border border-gold/30 px-3 py-1 rounded-full animate-pulse">DIREÇÃO CONFIRMADA</div>
            </div>
            <div className="max-w-xl mx-auto px-6 pb-36 pt-8 relative z-10">
                <div className="mb-10 text-center">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-gold/20 to-orange/20 border border-gold/30 text-gold text-xs font-bold uppercase tracking-widest mb-6">Glória a Deus!</div>
                    <h1 className="text-3xl md:text-4xl font-serif font-bold leading-tight mb-4 text-transparent bg-clip-text bg-gradient-to-b from-white to-stone-400">{name}, Deus preparou este caminho para <span className="text-gold underline decoration-gold/30 underline-offset-4">{userNeed}</span>.</h1>
                    <p className="text-stone-400 text-sm leading-relaxed max-w-sm mx-auto">Não é coincidência. Baseado no que você abriu do seu coração, o Espírito Santo desenhou esta jornada de 14 dias para você.</p>
                </div>
                <div className="bg-stone-900/80 backdrop-blur-md rounded-3xl p-8 border border-red-500/20 mb-8 relative overflow-hidden group hover:border-red-500/40 transition-colors">
                    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-red-500 to-orange-600"></div>
                    <h3 className="flex items-center gap-2 text-red-400 font-bold text-xs uppercase tracking-widest mb-4"><Zap size={14} /> Discernimento Espiritual</h3>
                    <p className="text-stone-300 font-serif italic text-lg leading-relaxed">"{problem}"</p>
                    <p className="text-xs text-stone-500 mt-6 uppercase font-bold tracking-widest flex items-center gap-2">Mas hoje nós declaramos: <span className="text-white">Basta.</span></p>
                </div>
                <div className="space-y-4 mb-12">
                    <h3 className="text-center text-xs font-bold text-stone-500 uppercase tracking-widest mb-6">A Trindade da Sua Transformação</h3>
                    <div className="bg-gradient-to-r from-stone-900 to-stone-900/50 rounded-2xl p-5 border border-white/10 flex items-start gap-4 hover:border-gold/30 transition-colors">
                        <div className="w-10 h-10 rounded-full bg-blue-900/30 flex items-center justify-center text-blue-400 flex-shrink-0 shadow-[0_0_15px_rgba(59,130,246,0.2)]"><Clock size={20} /></div>
                        <div><h4 className="font-bold text-white text-base mb-1">{pillar1.title}</h4><p className="text-xs text-stone-400 leading-relaxed">{pillar1.desc}</p></div>
                    </div>
                    <div className="bg-gradient-to-r from-stone-900 to-stone-900/50 rounded-2xl p-5 border border-white/10 flex items-start gap-4 hover:border-gold/30 transition-colors">
                        <div className="w-10 h-10 rounded-full bg-purple-900/30 flex items-center justify-center text-purple-400 flex-shrink-0 shadow-[0_0_15px_rgba(168,85,247,0.2)]"><Users size={20} /></div>
                        <div><h4 className="font-bold text-white text-base mb-1">{pillar2.title}</h4><p className="text-xs text-stone-400 leading-relaxed">{pillar2.desc}</p></div>
                    </div>
                    <div className="bg-gradient-to-br from-gold/10 via-orange/5 to-transparent rounded-2xl p-6 border border-gold/40 flex items-start gap-4 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-3 opacity-10 rotate-12"><Sun size={80} /></div>
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-orange flex items-center justify-center text-white flex-shrink-0 shadow-lg shadow-orange/20"><Shield size={20} /></div>
                        <div className="relative z-10"><h4 className="font-bold text-gold text-base mb-1">{planTitle}</h4><p className="text-xs text-stone-300 leading-relaxed">Uma rotina guiada pelo Espírito Santo para vencer {userNeed.toLowerCase()} através do poder da Palavra.</p></div>
                    </div>
                </div>
                <div className="text-center mb-8">
                    <div className="inline-block p-5 rounded-3xl bg-stone-900 border border-stone-800">
                        <p className="text-stone-500 text-[10px] uppercase tracking-widest mb-3">Deus testemunhou seu "Sim"</p>
                        <div className="flex items-center justify-center gap-3 text-white font-serif font-bold text-lg"><div className="bg-green-500/20 p-1 rounded-full"><Check className="text-green-500" size={16} /></div>"Eu me comprometo."</div>
                    </div>
                </div>
                <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black to-transparent z-40">
                    <button onClick={() => setShowOffer(true)} className="w-full relative group overflow-hidden bg-gradient-to-r from-gold via-orange to-gold text-white py-5 rounded-2xl font-black text-xl shadow-[0_0_50px_-10px_rgba(251,191,36,0.5)] hover:scale-[1.02] transition-transform active:scale-[0.98] border border-white/20">
                        <div className="absolute inset-0 bg-white/30 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
                        <span className="relative flex items-center justify-center gap-3"><Flame size={20} fill="currentColor" /> RECEBER MINHA BÊNÇÃO</span>
                    </button>
                    <p className="text-center text-[10px] text-stone-500 mt-4 flex items-center justify-center gap-1 opacity-60"><Lock size={10} /> Oferta profética disponível por tempo limitado</p>
                </div>
            </div>
        </div>
    );
  }

  // LOADING SCREEN
  if (isGenerating) {
      return (
          <div className="min-h-screen bg-black flex flex-col items-center justify-center p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold/10 via-black to-black animate-pulse-slow"></div>
              <div className="relative z-10 text-center w-full max-w-sm">
                  <div className="w-32 h-32 mx-auto mb-10 relative flex items-center justify-center">
                      <div className="absolute inset-0 bg-gold/20 rounded-full blur-2xl animate-pulse"></div>
                      <div className="absolute inset-0 border-t-2 border-gold rounded-full animate-spin"></div>
                      <div className="absolute inset-2 border-b-2 border-orange rounded-full animate-[spin_1.5s_linear_infinite_reverse]"></div>
                      <BookOpen className="text-white relative z-10 drop-shadow-[0_0_15px_rgba(251,191,36,0.8)]" size={40} />
                  </div>
                  <h2 className="text-2xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold to-white mb-4 animate-fade-in">{loadingText}</h2>
                  <p className="text-stone-500 text-xs uppercase tracking-widest">Aguarde a providência...</p>
              </div>
          </div>
      )
  }

  // FEEDBACK SCREEN RENDER (Spiritual Gradient + Particles)
  if (showFeedback) {
    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center text-center relative overflow-hidden animate-fade-in px-6">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-stone-900 via-black to-black"></div>
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {Array.from({ length: 15 }).map((_, i) => (
                    <div key={i} className="absolute rounded-full bg-gradient-to-t from-gold to-transparent blur-md opacity-0 animate-float-up"
                        style={{
                            left: `${Math.random() * 100}%`,
                            bottom: `-20px`,
                            width: `${Math.random() * 40 + 10}px`,
                            height: `${Math.random() * 40 + 10}px`,
                            animationDelay: `${Math.random() * 0.5}s`,
                            animationDuration: `${3 + Math.random()}s`
                        }}
                    ></div>
                ))}
            </div>
            <div className="relative z-10 max-w-xl">
                <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-10 rounded-[3rem] shadow-[0_0_60px_-15px_rgba(251,191,36,0.3)] transform transition-all duration-700 hover:border-gold/30">
                    <div className="mb-8 flex justify-center">
                        <div className="p-5 bg-gradient-to-br from-gold to-orange rounded-full shadow-[0_0_40px_rgba(251,191,36,0.5)] animate-pulse">
                            <Sparkles className="text-white" size={36} />
                        </div>
                    </div>
                    <h4 className="text-gold font-bold text-xs uppercase tracking-[0.3em] mb-4">Revelação do Espírito</h4>
                    <p className="text-2xl md:text-3xl font-serif font-bold text-stone-100 leading-tight mb-4 drop-shadow-lg">
                        {currentQ.feedback ? currentQ.feedback(name, currentAnswer) : "Glória a Deus!"}
                    </p>
                </div>
                <button onClick={nextQuestion} className="mt-12 group bg-white text-black px-10 py-5 rounded-2xl font-black text-lg shadow-2xl hover:bg-gold hover:scale-105 active:scale-95 transition-all flex items-center gap-3 mx-auto">
                    CONTINUAR JORNADA <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </div>
    );
  }

  // QUESTION SCREEN RENDER
  return (
    <div className={`min-h-screen bg-paper dark:bg-black text-ink dark:text-white flex flex-col transition-opacity duration-500 ${animatingOut ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
        <div className="fixed inset-0 pointer-events-none opacity-30 dark:opacity-20">
            <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-gold/10 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-orange/10 rounded-full blur-[100px]"></div>
        </div>
        <div className="h-1.5 w-full bg-stone-100 dark:bg-stone-900 relative z-20">
            <div className="h-full bg-gradient-to-r from-gold to-orange shadow-[0_0_10px_rgba(251,191,36,0.5)] transition-all duration-700 ease-out" style={{ width: `${progress}%` }}></div>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 max-w-3xl mx-auto w-full relative z-10">
            <div className="mb-10 opacity-50 grayscale hover:grayscale-0 transition-all duration-500"><ShalomLogo size="w-12 h-12" /></div>
            <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-[10px] font-bold text-subtle uppercase tracking-widest">Pergunta {step + 1} de {questions.length}</div>
            <h2 className="text-3xl md:text-5xl font-serif font-black text-center mb-12 leading-tight drop-shadow-sm">{currentQ.question}</h2>
            {currentQ.type === 'text' && (
                <div className="w-full max-w-md space-y-6">
                    <input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder="Digite aqui..." className="w-full bg-transparent border-b-2 border-stone-200 dark:border-stone-800 text-3xl md:text-4xl py-4 text-center font-bold outline-none focus:border-gold transition-colors placeholder-stone-300 dark:placeholder-stone-700" autoFocus onKeyDown={(e) => e.key === 'Enter' && handleAnswer(inputText)} />
                    <button onClick={() => handleAnswer(inputText)} disabled={!inputText.trim()} className="w-full py-5 bg-ink dark:bg-white text-white dark:text-ink rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3">Continuar <ArrowRight size={20} /></button>
                </div>
            )}
            {currentQ.type === 'choice' && currentQ.options && (
                <div className="w-full max-w-lg grid gap-4">
                    {currentQ.options.map((opt, idx) => (
                        <button key={idx} onClick={() => handleAnswer(opt)} className="w-full p-6 text-left bg-white dark:bg-stone-900/50 backdrop-blur-sm border-2 border-stone-100 dark:border-stone-800 rounded-3xl font-bold text-lg md:text-xl shadow-sm hover:border-gold dark:hover:border-gold hover:bg-gold/5 dark:hover:bg-gold/10 hover:-translate-y-1 transition-all group flex items-center justify-between">
                            <span className="text-stone-700 dark:text-stone-200 group-hover:text-ink dark:group-hover:text-white transition-colors">{opt}</span>
                            <div className="w-6 h-6 rounded-full border-2 border-stone-200 dark:border-stone-700 group-hover:border-gold group-hover:bg-gold transition-colors relative flex items-center justify-center"><div className="w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div></div>
                        </button>
                    ))}
                </div>
            )}
        </div>
    </div>
  );
};

export default Quiz;
