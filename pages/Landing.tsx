import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Music, Zap, Sparkles, Star, ChevronRight, Shield, Heart, Mail, X, Loader2, ArrowRight, Check, CreditCard, HelpCircle, Lock, MessageCircle, Home, Battery, Sun, Share2, Book, Palette, MessageSquare, Bell, WifiOff, AlertTriangle, Coffee, Headphones, Smartphone, TrendingUp, XCircle, AlertOctagon, CheckCircle2, ChevronDown, ChevronUp, Gift, AlertCircle, Baby, HeartHandshake, ArrowDown, Download, Cloud, Moon, Info, Quote, Flame, Clock, Play, UserMinus } from 'lucide-react';
import { ShalomLogo } from '../components/Layout';
import { checkSubscription } from '../services/supabase';

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState(''); 
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('yearly');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const handleStart = () => {
    const savedEmail = localStorage.getItem('lumina_email');
    if (savedEmail) {
      navigate('/app');
    } else {
      setShowEmailModal(true);
      setLoginError('');
    }
  };

  const handleSaveEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (!email.trim() || !email.includes('@')) {
      setLoginError("Por favor, insira um e-mail válido.");
      return;
    }

    setIsLoading(true);
    
    try {
        const hasActiveSubscription = await checkSubscription(email.trim().toLowerCase());

        if (hasActiveSubscription) {
            localStorage.setItem('lumina_email', email);
            setShowEmailModal(false);
            navigate('/app');
        } else {
            setLoginError("Assinatura não encontrada para este e-mail.");
            
            setTimeout(() => {
                setShowEmailModal(false);
                const el = document.getElementById('pricing');
                el?.scrollIntoView({ behavior: 'smooth' });
                alert("E-mail não encontrado na base de assinantes. Por favor, escolha um plano para começar.");
            }, 1500);
        }
    } catch (error) {
        setLoginError("Erro de conexão. Tente novamente.");
    } finally {
        setIsLoading(false);
    }
  };

  const faqs = [
    { q: "Preciso pagar algo a mais pelas conversas no WhatsApp?", a: "Não! O plano anual cobre o acesso ilimitado ao Guia Espiritual e todas as funcionalidades do app." },
    { q: "Funciona no iPhone e Android?", a: "Sim, o Shalom é um Web App compatível com todos os celulares modernos, tablets e computadores." },
    { q: "Como cancelo se não gostar?", a: "Direto pelo app ou enviando um e-mail para nosso suporte. É simples, rápido e sem burocracia." }
  ];

  return (
    <div className="min-h-screen bg-paper dark:bg-black text-ink dark:text-white font-sans selection:bg-gold/30">
      
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-40 px-6 py-4 flex justify-between items-center backdrop-blur-xl bg-paper/70 dark:bg-black/70 border-b border-stone-200/50 dark:border-white/5 transition-all duration-300">
        <div className="flex items-center gap-2">
          <ShalomLogo />
          <span className="font-serif font-bold text-xl tracking-tight hidden md:block">Shalom</span>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => {
                const el = document.getElementById('pricing');
                el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-sm font-bold text-subtle hover:text-ink dark:hover:text-white transition-colors hidden md:block"
          >
            Planos
          </button>
          <button 
            onClick={handleStart}
            className="px-6 py-2.5 rounded-full bg-ink dark:bg-white text-white dark:text-ink font-bold text-sm hover:scale-105 active:scale-95 transition-all shadow-lg hover:shadow-xl"
          >
            Entrar
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden min-h-[80vh] flex flex-col items-center justify-center">
        
        {/* Dynamic Background */}
        <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[140%] h-[90%] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold/40 via-paper to-transparent dark:from-gold/20 dark:via-black dark:to-black blur-3xl opacity-80"></div>
            <div className="absolute inset-0 opacity-[0.4] dark:opacity-[0.15]" style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/stardust.png")` }}></div>
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10 animate-fade-in flex flex-col items-center justify-center h-full">
          
          <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/60 dark:bg-white/10 backdrop-blur-xl border border-stone-200 dark:border-white/10 shadow-lg mb-10 hover:scale-105 transition-transform cursor-default animate-slide-up ring-1 ring-white/20">
             <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-ink/90 dark:text-white/90">
                Você nunca mais vai caminhar sozinho.
             </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-black leading-[1.05] mb-10 tracking-tighter text-ink dark:text-white drop-shadow-sm max-w-6xl">
            Seu tempo com Deus, <span className="text-transparent bg-clip-text bg-gradient-to-br from-gold via-orange to-gold-dark relative inline-block">
              todos os dias
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-orange opacity-40" viewBox="0 0 100 10" preserveAspectRatio="none">
                 <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
              </svg>
            </span>.
          </h1>
          
          <p className="text-xl md:text-2xl text-subtle max-w-4xl mx-auto mb-12 leading-relaxed font-medium">
            Um guia espiritual no WhatsApp que fortalece sua fé, te lembra da Palavra e te acompanha nas batalhas diárias.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full">
            <button 
              onClick={handleStart}
              className="group relative w-full sm:w-auto px-12 py-6 bg-ink dark:bg-white text-white dark:text-ink rounded-3xl font-black text-xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.4)] dark:shadow-[0_0_50px_-12px_rgba(255,255,255,0.4)] hover:shadow-2xl hover:scale-[1.03] active:scale-[0.98] transition-all flex items-center justify-center gap-4 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              <span>Começar Agora</span>
              <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* SLOGAN 1: HERO - Floating */}
          <div className="mt-16 animate-float-up" style={{ animationDelay: '0.5s' }}>
             <div className="inline-block px-8 py-4 rounded-2xl bg-white/80 dark:bg-stone-900/80 backdrop-blur-md border border-stone-200 dark:border-stone-800 shadow-xl transform rotate-1 hover:rotate-0 transition-transform cursor-default">
                <p className="font-serif italic text-lg text-ink dark:text-white">
                   "Deus presente todos os dias na palma da sua mão"
                </p>
             </div>
          </div>

        </div>
      </section>

      {/* MAIN NARRATIVE SECTION */}
      <section className="py-12 px-6 bg-white dark:bg-stone-950 border-t border-stone-100 dark:border-stone-900">
         <div className="max-w-6xl mx-auto">
            
            {/* NEW SECTION: "Ele sente sua falta" (Emotional Hook) */}
            <div className="my-24 relative rounded-[3rem] overflow-hidden bg-black text-white shadow-2xl">
               <div className="absolute inset-0">
                  <img 
                    src="https://images.unsplash.com/photo-1561448817-f17eed390089?q=80&w=1332&auto=format&fit=crop" 
                    className="w-full h-full object-cover opacity-40 mix-blend-screen"
                    alt="Man in shadows"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
               </div>

               <div className="relative z-10 p-10 md:p-20 max-w-3xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/20 text-white rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                      <UserMinus size={12} /> Um alerta para sua alma
                  </div>
                  <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8 leading-tight">
                     Você já parou para pensar em como <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-orange">Jesus se sente?</span>
                  </h2>
                  <div className="space-y-6 text-lg md:text-xl font-serif text-stone-300 leading-relaxed border-l-2 border-white/20 pl-6">
                     <p>O dia amanhece. Você pega o celular.</p>
                     <p>Vê notícias, responde mensagens, trabalha, ri de memes, vê séries.</p>
                     <p>O dia termina. O cansaço bate. Você dorme.</p>
                     <p>E Ele ficou lá... <strong className="text-white">esperando.</strong></p>
                     <p>Imagine alguém que morreu por você ser tratado com tanto silêncio.</p>
                     <p className="text-white">Jesus não está com raiva de você. <span className="underline decoration-orange decoration-2 underline-offset-4">Ele está triste.</span></p>
                     <p>Ele vê sua ansiedade crescendo porque você tenta carregar o mundo sozinho, enquanto Ele está a uma oração de distância querendo carregar o fardo por você.</p>
                  </div>
               </div>
            </div>

            {/* SLOGAN 2: SEPARATOR */}
            <div className="flex justify-center mb-24 relative z-10">
                <div className="px-8 py-4 rounded-xl bg-gradient-to-r from-gold/20 to-orange/20 border border-gold/30 backdrop-blur-sm shadow-lg transform -rotate-2 hover:rotate-0 transition-all duration-500">
                    <p className="font-serif font-bold text-xl text-ink dark:text-white flex items-center gap-3">
                        <Sparkles size={20} className="text-gold" /> "A fé que te acompanha" <Sparkles size={20} className="text-gold" />
                    </p>
                </div>
            </div>

            {/* NEW SECTION: OPEN LETTER (Fear/Anxiety Hook) */}
            <div className="max-w-2xl mx-auto mb-32 text-center md:text-left animate-fade-in">
                <div className="border-l-4 border-gold pl-6 py-3 mb-10 bg-stone-50 dark:bg-stone-900/50 rounded-r-xl inline-block shadow-sm">
                    <p className="font-bold text-ink dark:text-white text-xl md:text-2xl italic font-serif m-0">"Caros irmãos e irmãs..."</p>
                </div>

                <div className="font-serif text-xl md:text-2xl text-stone-600 dark:text-stone-300 leading-relaxed space-y-8">
                    <p>O mundo está ficando insuportável.</p>

                    <p>A pressão no trabalho aumenta, mas o salário não.</p>

                    <p>Seus filhos estão expostos a coisas na internet que você nem imagina.</p>

                    <p>O casamento, que deveria ser seu porto seguro, virou um campo minado.</p>

                    <p>Você sorri na igreja, mas <span className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-bold px-1">chora escondido no banheiro</span>.</p>

                    <p>E a pior sensação de todas...</p>

                    <p>A sensação de que Deus ficou em silêncio bem na hora que sua vida desmorona.</p>

                    <p className="font-bold text-ink dark:text-white border-l-4 border-red-500 pl-4 py-1">Você não está apenas cansado. Você está com medo.</p>
                    
                    <p>Medo do futuro. Medo de falhar. Medo de não ser o suficiente.</p>

                    <p>A cada notificação de notícia ruim no celular, o coração dispara.</p>

                    <p>Você olha para o lado e vê famílias que pareciam perfeitas sendo destruídas do dia para a noite.</p>

                    <p>E uma voz sussurra na sua mente: "E se o próximo for você?"</p>

                    <p>A solidão bate na porta do quarto, mesmo com a casa cheia de gente.</p>

                    <p>Você tenta orar, mas o cansaço é tanto que as palavras travam na garganta.</p>

                    <p>O inimigo não está brincando. Ele quer roubar sua paz e matar sua esperança.</p>

                    <p>E sem a armadura certa, blindada pela Palavra diária, <span className="font-bold text-red-600 dark:text-red-400">você é um alvo fácil</span>.</p>
                </div>
            </div>

            {/* 1. THE PROBLEM (Text + Visual Split) */}
            <div className="grid md:grid-cols-2 gap-12 items-center mb-32 relative">
                
                {/* Visual Decoration Slogan - "O mundo grita..." */}
                <div className="hidden md:block absolute top-0 right-0 transform translate-x-10 -translate-y-10 z-20">
                    <div className="bg-white dark:bg-stone-800 p-4 rounded-lg shadow-xl border border-stone-100 dark:border-stone-700 rotate-6">
                        <p className="font-serif text-sm font-bold text-red-500">"O mundo grita..."</p>
                    </div>
                </div>

                <div className="space-y-8 order-2 md:order-1">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-100 dark:bg-red-900/20 text-red-600 rounded-full text-xs font-bold uppercase tracking-widest">
                        <AlertTriangle size={12} /> O Perigo do Esfriamento
                    </div>
                    <h2 className="font-serif font-bold text-4xl md:text-5xl text-ink dark:text-white leading-tight">
                        A fé não morre de uma vez. Ela esfria aos poucos.
                    </h2>
                    <div className="space-y-6 text-xl text-stone-600 dark:text-stone-300 font-serif leading-relaxed border-l-2 border-stone-200 dark:border-stone-800 pl-6">
                        <p>Começa com um dia sem orar.</p>
                        <p>Depois, a Bíblia fica fechada no domingo.</p>
                        <p>Logo, os problemas parecem gigantes e Deus parece distante.</p>
                        <p>Nós criamos o Shalom para <span className="bg-red-50 dark:bg-red-900/20 px-1 font-bold text-red-600 dark:text-red-400">salvar a sua fé</span> dessa rotina devoradora.</p>
                    </div>
                </div>
                
                {/* Visual: Image 2 (Cry Out) */}
                <div className="order-1 md:order-2 relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 rounded-[2.5rem] blur-2xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
                    <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white dark:border-stone-800 h-[500px]">
                        <img 
                            src="https://michellemartins.wordpress.com/wp-content/uploads/2012/12/clame-a-deuss.jpg" 
                            className="w-full h-full object-cover transition-all duration-700 hover:scale-105" 
                            alt="Mulher Clamando" 
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 text-center">
                                <Flame size={48} className="text-white mx-auto mb-2 animate-pulse" />
                                <p className="text-white font-bold uppercase tracking-widest text-sm">Reacenda a Chama</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. THE SOLUTION - BIBLE (Text + Slogan Card) */}
            <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
                
                {/* Visual: REPLACING PHONE MOCKUP WITH SLOGAN CARD */}
                <div className="relative order-1 flex justify-center">
                    {/* Abstract Background Blob */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gold/20 rounded-full blur-[80px] pointer-events-none"></div>
                    
                    {/* Floating Card */}
                    <div className="relative bg-white/80 dark:bg-stone-900/80 backdrop-blur-xl border border-stone-200 dark:border-stone-700 p-10 rounded-[2rem] shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-700 max-w-sm cursor-default group">
                        <div className="absolute -top-6 -right-6 w-12 h-12 bg-orange text-white rounded-2xl flex items-center justify-center shadow-lg transform rotate-12 group-hover:rotate-0 transition-transform">
                            <Book size={24} />
                        </div>
                        
                        <p className="font-serif text-2xl font-bold text-ink dark:text-white leading-tight mb-4">
                            "Lâmpada para os meus pés é a tua palavra."
                        </p>
                        <div className="flex items-center gap-2">
                            <div className="h-0.5 w-8 bg-gold"></div>
                            <p className="text-xs font-bold text-subtle uppercase tracking-widest">Salmos 119:105</p>
                        </div>
                    </div>
                </div>

                {/* Text Copy */}
                <div className="space-y-8 order-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold/10 text-gold-dark dark:text-gold rounded-full text-xs font-bold uppercase tracking-widest">
                        <BookOpen size={12} /> A Palavra Viva
                    </div>
                    <h2 className="font-serif font-bold text-4xl md:text-5xl text-ink dark:text-white leading-tight">
                        A Bíblia deixa de ser um livro fechado.
                    </h2>
                    <div className="space-y-6 text-xl text-stone-600 dark:text-stone-300 font-serif leading-relaxed">
                        <p>Muitos tentam ler e param no terceiro dia.</p>
                        <p>O texto parece difícil. O sono vem.</p>
                        <p>No <span className="font-bold text-gold-dark dark:text-gold">Shalom</span>, é diferente.</p>
                        <p>Entregamos porções digeríveis.</p>
                        <p>Com explicações que tocam sua vida hoje.</p>
                        <p>Não é sobre ler muito. É sobre ler e ser transformado.</p>
                    </div>
                </div>
            </div>

            {/* --- NEW SECTION: CASAMENTO (Couple Praying) --- */}
            <div className="my-24 bg-gradient-to-br from-stone-50 to-orange-50 dark:from-stone-900 dark:to-stone-800 rounded-[3rem] p-8 md:p-12 relative overflow-hidden border border-stone-200 dark:border-stone-800">
               <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
                  <div className="space-y-8">
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-white dark:bg-white/10 text-orange rounded-full text-xs font-bold uppercase tracking-widest shadow-sm">
                          <HeartHandshake size={12} /> Aliança Blindada
                      </div>
                      <h3 className="font-serif font-bold text-3xl md:text-5xl text-ink dark:text-white leading-tight">
                          Seu casamento precisa de um terceiro elo.
                      </h3>
                      <div className="font-serif text-lg md:text-xl text-stone-600 dark:text-stone-300 leading-loose">
                          <p>As lutas diárias desgastam o amor.</p>
                          <p>Pequenas brigas viram grandes silêncios.</p>
                          <p>O segredo para reverter isso não é apenas diálogo, é <span className="font-bold text-ink dark:text-white">oração conjunta</span>.</p>
                          <p>O Shalom envia devocionais para casais que quebram o orgulho e unem os corações diante de Deus.</p>
                          <p className="italic font-medium text-orange">"O cordão de três dobras não se rompe facilmente."</p>
                      </div>
                  </div>
                  
                  {/* Visual: Couple Praying */}
                  <div className="relative group">
                      <div className="absolute inset-0 bg-orange/20 rounded-[2.5rem] transform rotate-3 transition-transform group-hover:rotate-0"></div>
                      <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl h-[450px]">
                          <img 
                              src="https://img.freepik.com/fotos-gratis/homem-e-mulher-orando-juntos_23-2148822684.jpg?semt=ais_hybrid&w=740&q=80" 
                              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                              alt="Casal Orando"
                          />
                          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                              <p className="text-white font-serif italic text-center">"Senhor, restaura nossa união..."</p>
                          </div>
                      </div>
                  </div>
               </div>
            </div>

            {/* SLOGAN 3: NEAR FAMILY/WORSHIP */}
            <div className="flex justify-end pr-10 -mt-10 mb-10 relative z-20">
                <div className="bg-white dark:bg-stone-800 p-5 rounded-2xl shadow-xl border-2 border-gold/20 transform rotate-3 hover:rotate-0 transition-all duration-300 max-w-xs text-center">
                    <p className="font-serif italic text-lg text-ink dark:text-white">"Oração que te alcança onde você estiver"</p>
                </div>
            </div>

            {/* --- SEÇÃO FAMÍLIA (Updated Image) --- */}
            <div className="my-24 bg-stone-50 dark:bg-stone-900/50 rounded-[3rem] p-8 md:p-12 border border-stone-200 dark:border-stone-800">
               <div className="grid md:grid-cols-2 gap-12 items-center">
                  {/* Visual Column (Left for variation) */}
                  <div className="order-2 md:order-1 relative group">
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-[2.5rem] blur-2xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
                      <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl h-[500px]">
                          <img 
                              src="https://img.freepik.com/fotos-gratis/familia-crista-de-tiro-medio-rezando-juntos_23-2149386644.jpg?semt=ais_hybrid&w=740&q=80" 
                              className="w-full h-full object-cover" 
                              alt="Família Orando"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                          
                          {/* Floating UI Card - Kids Mode */}
                          <div className="absolute bottom-8 left-8 right-8 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md p-4 rounded-2xl shadow-xl animate-float-up border border-white/20">
                              <div className="flex items-center gap-4">
                                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                                      <Baby size={24} />
                                  </div>
                                  <div>
                                      <p className="text-[10px] font-bold text-subtle uppercase tracking-widest">Shalom Kids</p>
                                      <h4 className="font-bold text-ink dark:text-white">Ensinando os Pequenos</h4>
                                      <div className="flex gap-1 mt-1">
                                          <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                                          <span className="text-[10px] text-green-600">Histórias Bíblicas</span>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>

                  {/* Text Column */}
                  <div className="order-1 md:order-2 space-y-8">
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-full text-xs font-bold uppercase tracking-widest">
                          <Home size={12} /> Proteção do Lar
                      </div>
                      <h3 className="font-serif font-bold text-3xl md:text-4xl text-ink dark:text-white leading-tight">
                          Seus filhos veem você orando?
                      </h3>
                      <div className="font-serif text-lg md:text-xl text-stone-600 dark:text-stone-300 leading-loose">
                          <p>O mundo lá fora não tem misericórdia da sua família.</p>
                          <p>Seus filhos são bombardeados por valores invertidos na escola e nas telas.</p>
                          <p>Se você não ensinar a verdade em casa, <strong className="text-red-500">o mundo ensinará a mentira lá fora.</strong></p>
                          <p>O <span className="font-bold text-ink dark:text-white">Shalom</span> ajuda você a levantar um altar na sua sala.</p>
                          <p className="bg-indigo-50 dark:bg-indigo-900/10 p-2 rounded-lg border-l-4 border-indigo-500 font-bold text-indigo-800 dark:text-indigo-200">
                              Salve a fé da próxima geração. Comece hoje.
                          </p>
                      </div>
                  </div>
               </div>
            </div>

            {/* --- SEÇÃO VISUAL NOVA 1: ATMOSFERA DE ADORAÇÃO --- */}
            <div className="my-24 bg-stone-900 dark:bg-black rounded-[3rem] p-8 md:p-12 relative overflow-hidden text-white shadow-2xl">
                
                {/* SLOGAN 4: INSIDE WORSHIP */}
                <div className="absolute top-6 right-6 md:top-10 md:right-10 z-20 animate-float">
                    <div className="bg-white/10 backdrop-blur-md px-6 py-2 rounded-full border border-white/20">
                        <p className="font-bold text-sm text-gold tracking-wider uppercase flex items-center gap-2">
                            <Music size={14} /> "A paz que fala com você"
                        </p>
                    </div>
                </div>

                {/* Background Image Overlay */}
                <div className="absolute inset-0 z-0">
                    <img src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1200&auto=format&fit=crop" className="w-full h-full object-cover opacity-30 mix-blend-overlay" alt="Worship Atmosphere" />
                    <div className="absolute inset-0 bg-gradient-to-r from-stone-900 via-stone-900/90 to-transparent"></div>
                </div>

                <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                    <div className="flex-1 space-y-6">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/20 text-gold rounded-full text-xs font-bold uppercase tracking-widest border border-gold/30">
                            <Music size={14} /> Atmosfera de Adoração
                        </div>
                        <h3 className="font-serif font-bold text-3xl md:text-5xl leading-tight">
                            A música certa quebra cadeias invisíveis.
                        </h3>
                        <p className="text-stone-300 text-lg leading-relaxed max-w-md">
                            Shalom seleciona louvores específicos para o estado do seu coração. Se está ansioso, cansado ou grato, temos a melodia certa para conectar você ao Céu em segundos.
                        </p>
                    </div>
                    
                    {/* Visual Card */}
                    <div className="w-full md:w-1/2 relative group">
                        <div className="absolute -inset-2 bg-gradient-to-r from-gold to-orange rounded-[2rem] blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-700"></div>
                        <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-[2rem] flex items-center gap-4 hover:-translate-y-2 transition-transform duration-500">
                            <div className="w-20 h-20 rounded-full bg-cover bg-center shadow-lg border-2 border-white/30" style={{backgroundImage: "url('https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=300&auto=format&fit=crop')"}}></div>
                            <div>
                                <p className="text-[10px] text-gold font-bold uppercase tracking-widest mb-1">Tocando Agora</p>
                                <h4 className="font-bold text-xl mb-1">Milagres do Caminho</h4>
                                <p className="text-stone-400 text-sm">Soraya Moraes</p>
                            </div>
                            <div className="ml-auto w-12 h-12 bg-gold rounded-full flex items-center justify-center text-ink shadow-lg animate-pulse">
                                <Play size={20} fill="currentColor" className="ml-1" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- NOVO BLOCO VISUAL: A ROTINA TRANSFORMADA (ESTILO JORNAL) --- */}
            <div className="my-16 py-12 bg-stone-50 dark:bg-stone-900/50 border-y-2 border-stone-200 dark:border-stone-800 -mx-6 px-6 md:rounded-3xl md:mx-0">
                <div className="max-w-xl mx-auto">
                    <h3 className="text-center font-serif font-black text-3xl text-ink dark:text-white mb-10 tracking-tight">
                        Um Dia na Presença
                    </h3>
                    
                    <div className="space-y-10 relative">
                        {/* Linha conectora */}
                        <div className="absolute left-[27px] top-4 bottom-4 w-0.5 bg-stone-300 dark:bg-stone-700"></div>

                        {/* Manhã */}
                        <div className="flex gap-6 relative group">
                            <div className="w-14 h-14 rounded-full bg-white dark:bg-stone-800 border-4 border-stone-200 dark:border-stone-700 flex items-center justify-center text-gold z-10 shrink-0 shadow-sm group-hover:border-gold transition-colors duration-300">
                                <Sun size={24} />
                            </div>
                            <div className="bg-white dark:bg-stone-800 p-5 rounded-2xl shadow-sm border border-stone-100 dark:border-stone-700 flex-1">
                                <h4 className="font-bold text-lg text-ink dark:text-white mb-1 flex items-center gap-2">
                                    07:00 <span className="text-stone-300">|</span> O Maná Escondido
                                </h4>
                                <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed font-serif">
                                    Antes que o caos do mundo comece, você recebe um versículo profético e uma direção clara. Sua mente é blindada antes de sair de casa.
                                </p>
                            </div>
                        </div>

                        {/* Tarde */}
                        <div className="flex gap-6 relative group">
                            <div className="w-14 h-14 rounded-full bg-white dark:bg-stone-800 border-4 border-stone-200 dark:border-stone-700 flex items-center justify-center text-red-500 z-10 shrink-0 shadow-sm group-hover:border-red-500 transition-colors duration-300">
                                <Shield size={24} />
                            </div>
                            <div className="bg-white dark:bg-stone-800 p-5 rounded-2xl shadow-sm border border-stone-100 dark:border-stone-700 flex-1">
                                <h4 className="font-bold text-lg text-ink dark:text-white mb-1 flex items-center gap-2">
                                    14:00 <span className="text-stone-300">|</span> O Escudo da Fé
                                </h4>
                                <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed font-serif">
                                    No auge do estresse do trabalho, quando a ansiedade bater, o Shalom te envia um louvor ou oração que acalma sua alma em 3 minutos.
                                </p>
                            </div>
                        </div>

                        {/* Noite */}
                        <div className="flex gap-6 relative group">
                            <div className="w-14 h-14 rounded-full bg-white dark:bg-stone-800 border-4 border-stone-200 dark:border-stone-700 flex items-center justify-center text-blue-500 z-10 shrink-0 shadow-sm group-hover:border-blue-500 transition-colors duration-300">
                                <Moon size={24} />
                            </div>
                            <div className="bg-white dark:bg-stone-800 p-5 rounded-2xl shadow-sm border border-stone-100 dark:border-stone-700 flex-1">
                                <h4 className="font-bold text-lg text-ink dark:text-white mb-1 flex items-center gap-2">
                                    22:00 <span className="text-stone-300">|</span> O Descanso da Alma
                                </h4>
                                <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed font-serif">
                                    Ao deitar, nada de notícias ruins. Uma reflexão de paz te ajuda a entregar os problemas a Deus e dormir o sono dos justos.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- SEÇÃO VISUAL NOVA 2: GALERIA DE JORNADAS --- */}
            <div className="my-24">
                <div className="text-center mb-12">
                    <h3 className="font-serif font-black text-3xl md:text-4xl text-ink dark:text-white mb-4">
                        Escolha sua Jornada
                    </h3>
                    <p className="text-subtle max-w-lg mx-auto">
                        Não importa qual batalha você esteja enfrentando, o Shalom tem um plano de 7 a 30 dias para guiar seus passos de volta à paz.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Card 1: Ansiedade */}
                    <div className="h-80 rounded-[2.5rem] relative overflow-hidden group cursor-default">
                        <img src="https://images.unsplash.com/photo-1474418397713-7ede21d49118?q=80&w=800&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Peaceful Snow" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                        <div className="absolute bottom-0 p-8 text-white">
                            <div className="mb-3 w-10 h-10 bg-orange rounded-full flex items-center justify-center">
                                <Zap size={20} fill="currentColor" />
                            </div>
                            <h4 className="font-bold text-2xl mb-2">Detox de Ansiedade</h4>
                            <p className="text-stone-300 text-sm leading-relaxed">7 dias para trocar o medo pela paz absoluta de Deus através da entrega total.</p>
                        </div>
                    </div>

                    {/* Card 2: Sabedoria */}
                    <div className="h-80 rounded-[2.5rem] relative overflow-hidden group cursor-default">
                        <img src="https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=800&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Open Book" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                        <div className="absolute bottom-0 p-8 text-white">
                            <div className="mb-3 w-10 h-10 bg-gold rounded-full flex items-center justify-center text-ink">
                                <Star size={20} fill="currentColor" />
                            </div>
                            <h4 className="font-bold text-2xl mb-2">Sabedoria de Provérbios</h4>
                            <p className="text-stone-300 text-sm leading-relaxed">31 dias mergulhando na fonte de sabedoria para decisões difíceis.</p>
                        </div>
                    </div>

                    {/* Card 3: Gratidão */}
                    <div className="h-80 rounded-[2.5rem] relative overflow-hidden group cursor-default md:col-span-1">
                        <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Sunrise" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                        <div className="absolute bottom-0 p-8 text-white">
                            <div className="mb-3 w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center">
                                <Heart size={20} fill="currentColor" />
                            </div>
                            <h4 className="font-bold text-2xl mb-2">Jornada da Gratidão</h4>
                            <p className="text-stone-300 text-sm leading-relaxed">Transforme sua mente e coração descobrindo a alegria nas pequenas coisas.</p>
                        </div>
                    </div>
                </div>
            </div>

            <article className="prose prose-lg prose-stone dark:prose-invert font-serif text-lg md:text-xl leading-loose space-y-8 text-ink dark:text-stone-300 max-w-2xl mx-auto">
                {/* Part 5: Unique Differential */}
                <div className="my-16 bg-gradient-to-br from-gold to-orange p-1 rounded-3xl shadow-xl transform rotate-1 hover:rotate-0 transition-transform duration-500">
                    <div className="bg-white dark:bg-stone-900 rounded-[1.3rem] p-8 md:p-10 text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange/10 rounded-full blur-3xl -ml-10 -mb-10"></div>
                        
                        <div className="relative z-10">
                            <h3 className="font-serif font-bold text-2xl text-ink dark:text-white mb-4">Diferencial Único</h3>
                            
                            <p className="text-lg md:text-xl leading-relaxed font-medium text-stone-600 dark:text-stone-300">
                                É o único companheiro espiritual <span className="text-gold-dark dark:text-gold font-bold">disponível 24h</span>, pronto para orar, ensinar e manter a presença de Deus no seu dia.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Investment/Value */}
                <div className="mt-16 mb-8 text-center bg-stone-50 dark:bg-stone-900 p-8 rounded-3xl border border-stone-200 dark:border-stone-800">
                     <h3 className="font-serif font-bold text-2xl mb-6 text-ink dark:text-white">Um Investimento Eterno</h3>
                     <div className="space-y-4 text-lg text-stone-600 dark:text-stone-300 leading-relaxed">
                        <p>Muitos de nós gastamos sem pensar com streamings, lanches e coisas que perecem.</p>
                        <p>Mas hesitamos em investir no fortalecimento do nosso espírito.</p>
                        <p>Shalom custa menos que um cafezinho por dia.</p>
                        <p>Mas o valor de ter sua mente blindada pela Palavra...</p>
                        <p className="font-bold text-gold text-xl mt-4">Isso não tem preço.</p>
                     </div>
                </div>

                <p className="text-2xl font-serif font-bold text-center mt-12 mb-12 text-ink dark:text-white">
                    Shalom — a fé que te acompanha.<br/>
                    <span className="text-gold">A paz que fala com você.</span>
                </p>

            </article>

            {/* Social Proof Interjection with Image */}
            <div className="my-16 bg-stone-50 dark:bg-stone-900 p-8 rounded-[2.5rem] border border-stone-100 dark:border-stone-800 relative">
                <div className="absolute top-0 right-0 -mt-6 -mr-6 md:mr-10 opacity-10">
                    <Quote size={120} className="text-ink dark:text-white rotate-12" />
                </div>
                
                <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                    <div className="flex-shrink-0">
                        <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-br from-gold to-orange">
                            <img 
                                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop" 
                                className="w-full h-full rounded-full object-cover border-4 border-stone-50 dark:border-stone-900" 
                                alt="User"
                            />
                        </div>
                        <div className="flex text-gold justify-center mt-3 gap-1">
                            <Star fill="currentColor" size={14} />
                            <Star fill="currentColor" size={14} />
                            <Star fill="currentColor" size={14} />
                            <Star fill="currentColor" size={14} />
                            <Star fill="currentColor" size={14} />
                        </div>
                    </div>
                    
                    <div className="text-center md:text-left">
                        <p className="text-xl md:text-2xl italic font-serif text-ink dark:text-stone-300 mb-4 leading-relaxed">
                            "Eu estava à beira de um burnout. O Guia Espiritual no WhatsApp foi a voz de Deus nas minhas madrugadas de insônia. Não sei o que seria de mim sem essa ferramenta."
                        </p>
                        <div>
                            <p className="font-bold text-lg text-ink dark:text-white">Juliana M.</p>
                            <p className="text-sm text-subtle">Membro há 3 meses • São Paulo</p>
                        </div>
                    </div>
                </div>
            </div>

         </div>
      </section>

      {/* PRICING SECTION - The Offer */}
      <section id="pricing" className="py-24 px-6 relative bg-gradient-to-b from-white to-stone-50 dark:from-stone-950 dark:to-black">
         <div className="max-w-3xl mx-auto relative z-10">
            {/* Headlines */}
            <div className="text-center mb-10">
                <h2 className="text-3xl md:text-5xl font-serif font-black mb-4 text-ink dark:text-white leading-tight">
                    Quanto vale a paz da sua alma e a <br />
                    <span className="text-gold">proteção da sua família?</span>
                </h2>
                <p className="text-lg text-subtle font-medium max-w-xl mx-auto">
                    Provavelmente não tem preço. Mas hoje, nós tornamos isso acessível para todos.
                </p>
            </div>

            {/* Main Card */}
            <div className="bg-surface dark:bg-stone-900 rounded-[2.5rem] shadow-2xl border border-stone-100 dark:border-stone-800 overflow-hidden relative">
                
                <div className="p-6 md:p-10">
                    
                    {/* Header Badge & Title */}
                    <div className="text-center mb-10">
                        <div className="inline-block bg-orange text-white text-[10px] md:text-xs font-bold px-6 py-2 rounded-full uppercase tracking-widest mb-6 shadow-lg shadow-orange/30">
                            <Gift size={14} className="inline mr-1 mb-0.5" /> Oferta Exclusiva de Lançamento
                        </div>
                        <h3 className="text-2xl md:text-3xl font-serif font-bold text-ink dark:text-white">
                            Pacote Completo "Vida Cristã"
                        </h3>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
                       {[
                         { icon: MessageCircle, label: "Guia Espiritual 24h" },
                         { icon: Music, label: "Louvores Exclusivos" },
                         { icon: Baby, label: "Kit Kids e Histórias" }, 
                         { icon: Sparkles, label: "Reflexões Diárias" }
                       ].map((feat, i) => (
                           <div key={i} className="bg-stone-50 dark:bg-stone-800/50 p-3 rounded-xl flex flex-col items-center text-center gap-2 border border-stone-100 dark:border-stone-800">
                               <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center">
                                   <feat.icon size={16} />
                               </div>
                               <span className="text-xs font-bold text-subtle leading-tight">{feat.label}</span>
                           </div>
                       ))}
                    </div>

                    <p className="text-center text-xs font-bold text-subtle uppercase tracking-widest mb-4">Selecione seu plano:</p>

                    <div className="space-y-4">
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

                        {/* Yearly Option (Highlighted) */}
                        <div 
                            onClick={() => setSelectedPlan('yearly')}
                            className={`relative cursor-pointer rounded-3xl p-6 border-2 transition-all flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl ${selectedPlan === 'yearly' ? 'border-gold bg-white dark:bg-stone-800 ring-4 ring-gold/10' : 'border-stone-200 opacity-60'}`}
                        >
                             {/* Badge */}
                             <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-100 text-green-700 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wide border border-green-200">
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
                             <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-stone-900 text-white text-[10px] font-bold px-4 py-1.5 rounded-full shadow-lg flex items-center gap-1 whitespace-nowrap">
                                <TrendingUp size={10} className="text-green-400" /> R$ 0,14 POR DIA
                             </div>
                        </div>
                    </div>

                    {/* Yellow Warning Box */}
                    <div className="mt-10 mb-8 bg-yellow-50 dark:bg-yellow-900/10 border-2 border-yellow-200 dark:border-yellow-800/30 border-dashed rounded-2xl p-6 text-center">
                        <div className="flex items-center justify-center gap-2 mb-2 text-yellow-700 dark:text-yellow-500 font-bold text-sm uppercase tracking-widest">
                            <AlertCircle size={16} /> Por que tão barato?
                        </div>
                        <p className="text-sm text-yellow-800 dark:text-yellow-200/80 leading-relaxed font-medium">
                            "Nossa missão é espalhar o Evangelho através da tecnologia. Porém, devido aos altos custos de IA, <span className="bg-yellow-200 dark:bg-yellow-800 text-yellow-900 dark:text-yellow-100 px-1 rounded">não conseguiremos manter este preço por muito tempo.</span> Se você fechar esta página, amanhã o valor pode ter voltado para <span className="underline decoration-red-500 text-red-600 dark:text-red-400 font-bold">R$ 97,00</span>."
                        </p>
                    </div>

                    {/* Button */}
                    <button 
                        onClick={() => {
                            const link = selectedPlan === 'yearly' 
                                ? 'https://pay.cakto.com.br/4f62xu5' 
                                : 'https://pay.cakto.com.br/37whf2r_678375';
                            window.location.href = link;
                        }}
                        className="w-full py-5 bg-green-500 hover:bg-green-600 text-white rounded-2xl font-black text-xl shadow-[0_4px_0_rgb(21,128,61)] active:shadow-none active:translate-y-1 transition-all flex flex-col items-center leading-none gap-1"
                    >
                        <span className="flex items-center gap-2">QUERO MEU ACESSO {selectedPlan === 'yearly' ? 'ANUAL' : 'MENSAL'} <ChevronRight strokeWidth={4} size={20} /></span>
                        <span className="text-[10px] font-medium opacity-90 tracking-widest uppercase">Acesso imediato ao App e ao WhatsApp</span>
                    </button>
                    
                </div>
            </div>
            
            {/* Guarantee and FAQ below remain similar or are kept from previous implementation */}
            <div className="mt-16 max-w-2xl mx-auto text-center bg-stone-100 dark:bg-stone-900 p-8 rounded-3xl border border-stone-200 dark:border-stone-800">
                <div className="w-16 h-16 bg-white dark:bg-stone-800 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md text-gold">
                    <Shield size={32} />
                </div>
                <h3 className="text-xl font-bold text-ink dark:text-white mb-2">Garantia Incondicional de 7 Dias</h3>
                <p className="text-subtle text-sm">
                    Entre, use o app, converse com o Guia. Se não sentir paz no seu coração, nós devolvemos 100% do seu dinheiro. Sem perguntas.
                </p>
            </div>

            {/* FAQ */}
            <div className="mt-16 max-w-2xl mx-auto">
                <h3 className="text-lg font-bold text-center text-subtle uppercase tracking-widest mb-6">Dúvidas?</h3>
                <div className="space-y-4">
                    {faqs.map((item, i) => (
                        <div key={i} className="border-b border-stone-200 dark:border-stone-800">
                            <button 
                                onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                                className="w-full flex items-center justify-between py-4 text-left font-bold text-ink dark:text-white"
                            >
                                {item.q}
                                {openFaqIndex === i ? <ChevronUp className="text-gold" /> : <ChevronDown className="text-stone-400" />}
                            </button>
                            <div 
                                className={`text-stone-600 dark:text-stone-400 leading-relaxed overflow-hidden transition-all duration-300 ${openFaqIndex === i ? 'max-h-40 pb-4 opacity-100' : 'max-h-0 opacity-0'}`}
                            >
                                {item.a}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

         </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 px-6 pb-32 text-center">
        <div className="text-subtle text-sm flex flex-col items-center gap-2">
          <ShalomLogo size="w-6 h-6" />
          <p>© {new Date().getFullYear()} Shalom App. Feito com fé.</p>
          
          {/* Secret Button to Quiz */}
          <button 
            onClick={() => navigate('/quiz')}
            className="opacity-5 hover:opacity-100 transition-opacity duration-300 text-[10px] uppercase tracking-widest mt-4 p-2"
          >
            Acessar Quiz Secreto
          </button>
        </div>
      </section>

      {/* Email Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/60 backdrop-blur-md animate-fade-in">
          <div className="bg-surface dark:bg-stone-900 w-full max-w-md p-8 rounded-[2.5rem] shadow-2xl relative animate-slide-up border border-stone-100 dark:border-stone-800">
            <button 
              onClick={() => setShowEmailModal(false)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors text-subtle"
            >
              <X size={20} />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-gold to-orange rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-orange/30">
                <CreditCard size={32} className="text-white" />
              </div>

              <h3 className="text-2xl font-serif font-bold text-ink dark:text-white mb-2">
                Acesse sua conta
              </h3>
              <p className="text-subtle text-sm mb-8 leading-relaxed max-w-xs">
                Para entrar, insira o e-mail utilizado na compra.
              </p>

              <form onSubmit={handleSaveEmail} className="w-full space-y-4">
                <div className="relative group">
                   <div className="absolute inset-0 bg-gradient-to-r from-gold to-orange rounded-2xl opacity-0 group-focus-within:opacity-100 blur transition-opacity duration-300 -z-10"></div>
                   <input
                    type="email"
                    placeholder="Seu e-mail de acesso"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-4 bg-paper dark:bg-stone-950 rounded-2xl border-2 border-transparent outline-none text-ink dark:text-white font-medium placeholder:text-stone-400 focus:bg-white dark:focus:bg-stone-900 transition-all shadow-inner"
                    autoFocus
                  />
                </div>
                
                {loginError && (
                    <div className="text-red-500 text-xs font-bold animate-pulse flex items-center justify-center gap-1">
                        <AlertCircle size={12} /> {loginError}
                    </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 bg-ink dark:bg-white text-white dark:text-ink rounded-2xl font-bold text-lg shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <>Entrar <ArrowRight size={20} /></>
                  )}
                </button>
              </form>

              <p className="mt-6 text-[10px] text-stone-400 uppercase tracking-widest flex items-center gap-1 justify-center">
                <Lock size={10} /> Ambiente Seguro
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Landing;