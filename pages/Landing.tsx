
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
<<<<<<< HEAD
import { BookOpen, Music, Zap, Sparkles, Star, ChevronRight, Shield, Heart, Mail, X, Loader2, ArrowRight, Check, CreditCard, HelpCircle, Lock, MessageCircle, Home, Battery, Sun, Share2, Book, Palette, MessageSquare, Bell, WifiOff, AlertTriangle, Coffee, Headphones, Smartphone, TrendingUp, XCircle, AlertOctagon, CheckCircle2, ChevronDown, ChevronUp, Gift, AlertCircle, Baby, HeartHandshake, ArrowDown, Download, Cloud, Moon, Info, Quote, Flame, Clock, Play, UserMinus, Monitor, Tablet, Search, MoreVertical, Menu, Settings, Globe, ShieldCheck, Footprints, Gamepad2, Trophy, User, Stars } from 'lucide-react';
=======
import { BookOpen, Music, Zap, Sparkles, Star, ChevronRight, Shield, Heart, Mail, X, Loader2, ArrowRight, Check, CreditCard, HelpCircle, Lock, MessageCircle, Home, Battery, Sun, Share2, Book, Palette, MessageSquare, Bell, WifiOff, AlertTriangle, Coffee, Headphones, Smartphone, TrendingUp, XCircle, AlertOctagon, CheckCircle2, ChevronDown, ChevronUp, Gift, AlertCircle, Baby, HeartHandshake, ArrowDown, Download, Cloud, Moon, Info, Quote, Flame, Clock, Play, UserMinus, Monitor, Tablet, Search, MoreVertical, Menu, Settings, Globe, ShieldCheck } from 'lucide-react';
>>>>>>> a1c76c45b8057bdb889cea829282a0d7039dfa9e
import { ShalomLogo } from '../components/Layout';
import { checkSubscription } from '../services/supabase';
import { useLanguage } from '../contexts/LanguageContext';

const Landing: React.FC = () => {
<<<<<<< HEAD
    const navigate = useNavigate();
    const { t, language, setLanguage } = useLanguage();
    const [showEmailModal, setShowEmailModal] = useState(false);
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [loginError, setLoginError] = useState('');
    const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('yearly');
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
    const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

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

        // SUPER ADMIN CHECK
        if (email.trim() === 'pro@admin.user') {
            localStorage.setItem('lumina_email', email);
            navigate('/admin');
            return;
        }

        if (!email.trim() || !email.includes('@')) {
            setLoginError(t.landing.errorEmail);
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
                setLoginError(t.landing.errorNoSub);

                setTimeout(() => {
                    setShowEmailModal(false);
                    const el = document.getElementById('pricing');
                    el?.scrollIntoView({ behavior: 'smooth' });
                    alert(t.landing.errorNoSub);
                }, 1500);
            }
        } catch (error) {
            setLoginError(t.landing.errorConnection);
        } finally {
            setIsLoading(false);
        }
    };

    const faqs = t.landing.faqList || [];

    return (
        <div className="min-h-screen bg-paper dark:bg-black text-ink dark:text-white font-sans selection:bg-gold/30">

            {/* Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-40 px-6 py-4 flex justify-between items-center backdrop-blur-xl bg-paper/70 dark:bg-black/70 border-b border-stone-200/50 dark:border-white/5 transition-all duration-300">
                <div className="flex items-center gap-2">
                    <ShalomLogo />
                    <span className="font-serif font-bold text-xl tracking-tight hidden md:block">{t.common.appName}</span>
                </div>
                <div className="flex items-center gap-4">

                    {/* Language Switcher */}
                    <div className="relative">
                        <button onClick={() => setIsLangMenuOpen(!isLangMenuOpen)} className="flex items-center gap-1 text-sm font-bold text-subtle hover:text-ink dark:hover:text-white transition-colors">
                            <Globe size={16} /> <span className="uppercase">{language}</span>
                        </button>
                        {isLangMenuOpen && (
                            <div className="absolute top-10 right-0 bg-white dark:bg-stone-900 shadow-xl rounded-xl border border-stone-100 dark:border-stone-800 p-2 flex flex-col gap-1 w-24 animate-slide-up">
                                <button onClick={() => { setLanguage('pt'); setIsLangMenuOpen(false); }} className={`px-3 py-2 text-sm text-left rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 ${language === 'pt' ? 'font-bold text-orange' : 'text-stone-500'}`}>Português</button>
                                <button onClick={() => { setLanguage('en'); setIsLangMenuOpen(false); }} className={`px-3 py-2 text-sm text-left rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 ${language === 'en' ? 'font-bold text-orange' : 'text-stone-500'}`}>English</button>
                                <button onClick={() => { setLanguage('es'); setIsLangMenuOpen(false); }} className={`px-3 py-2 text-sm text-left rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 ${language === 'es' ? 'font-bold text-orange' : 'text-stone-500'}`}>Español</button>
                            </div>
                        )}
                    </div>

                    <button
                        onClick={() => {
                            const el = document.getElementById('pricing');
                            el?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="text-sm font-bold text-subtle hover:text-ink dark:hover:text-white transition-colors hidden md:block"
                    >
                        {t.landing.ctaPlans}
                    </button>
                    <button
                        onClick={handleStart}
                        className="px-6 py-2.5 rounded-full bg-ink dark:bg-white text-white dark:text-ink font-bold text-sm hover:scale-105 active:scale-95 transition-all shadow-lg hover:shadow-xl"
                    >
                        {t.landing.login}
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
                            {t.landing.slogan1}
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-black leading-[1.05] mb-10 tracking-tighter text-ink dark:text-white drop-shadow-sm max-w-6xl">
                        {t.landing.heroTitle} <span className="text-transparent bg-clip-text bg-gradient-to-br from-gold via-orange to-gold-dark relative inline-block">
                            {t.landing.heroSubtitle}
                            <svg className="absolute w-full h-3 -bottom-1 left-0 text-orange opacity-40" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                            </svg>
                        </span>.
                    </h1>

                    <p className="text-xl md:text-2xl text-subtle max-w-4xl mx-auto mb-12 leading-relaxed font-medium">
                        {t.landing.heroDesc}
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full">
                        <button
                            onClick={handleStart}
                            className="group relative w-full sm:w-auto px-12 py-6 bg-ink dark:bg-white text-white dark:text-ink rounded-3xl font-black text-xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.4)] dark:shadow-[0_0_50px_-12px_rgba(255,255,255,0.4)] hover:shadow-2xl hover:scale-[1.03] active:scale-[0.98] transition-all flex items-center justify-center gap-4 overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                            <span>{t.landing.ctaStart}</span>
                            <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>

                    {/* SLOGAN 1: HERO - Floating */}
                    <div className="mt-16 animate-float-up" style={{ animationDelay: '0.5s' }}>
                        <div className="inline-block px-8 py-4 rounded-2xl bg-white/80 dark:bg-stone-900/80 backdrop-blur-md border border-stone-200 dark:border-stone-800 shadow-xl transform rotate-1 hover:rotate-0 transition-transform cursor-default">
                            <p className="font-serif italic text-lg text-ink dark:text-white">
                                {t.landing.sloganFloat}
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
                                <UserMinus size={12} /> {t.landing.alertSoul}
                            </div>
                            <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8 leading-tight">
                                {t.landing.godFeelsTitle}
                            </h2>
                            <div className="space-y-6 text-lg md:text-xl font-serif text-stone-300 leading-relaxed border-l-2 border-white/20 pl-6">
                                {t.landing.godFeelsText.map((text, i) => (
                                    <p key={i}>{text}</p>
                                ))}

                                {/* ADDED VERSE BOX */}
                                <div className="mt-8 bg-white/5 border-l-4 border-gold p-6 rounded-r-2xl backdrop-blur-sm animate-fade-in group">
                                    <Sparkles size={16} className="text-gold mb-3 opacity-50 group-hover:opacity-100 transition-opacity" />
                                    <p className="font-serif italic text-white text-xl leading-relaxed m-0">
                                        {t.landing.godFeelsVerse}
                                    </p>
                                    <p className="mt-3 text-gold font-bold text-xs uppercase tracking-[0.2em] opacity-80">{t.landing.godFeelsRef}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SLOGAN 2: SEPARATOR */}
                    <div className="flex justify-center mb-24 relative z-10">
                        <div className="px-8 py-4 rounded-xl bg-gradient-to-r from-gold/20 to-orange/20 border border-gold/30 backdrop-blur-sm shadow-lg transform -rotate-2 hover:rotate-0 transition-all duration-500">
                            <p className="font-serif font-bold text-xl text-ink dark:text-white flex items-center gap-3">
                                <Sparkles size={20} className="text-gold" /> {t.landing.sloganFaith} <Sparkles size={20} className="text-gold" />
                            </p>
                        </div>
                    </div>

                    {/* NEW SECTION: OPEN LETTER */}
                    <div className="max-w-2xl mx-auto mb-32 text-center md:text-left animate-fade-in">
                        <div className="border-l-4 border-gold pl-6 py-3 mb-10 bg-stone-50 dark:bg-stone-900/50 rounded-r-xl inline-block shadow-sm">
                            <p className="font-bold text-ink dark:text-white text-xl md:text-2xl italic font-serif m-0">{t.landing.letterTitle}</p>
                        </div>

                        <div className="font-serif text-xl md:text-2xl text-stone-600 dark:text-stone-300 leading-relaxed space-y-10">
                            <p><span className="font-bold text-ink dark:text-white">{t.landing.letterP1}</span></p>

                            <p>{t.landing.letterP2}</p>

                            <p>{t.landing.letterP3}</p>

                            <p>{t.landing.letterP4}</p>

                            <p className="font-bold text-orange text-2xl">{t.landing.letterWorstFeeling}</p>

                            <p>{t.landing.letterAlone}</p>

                            <p>{t.landing.letterPain}</p>

                            <p>👉 {t.landing.letterNotWeakness}</p>

                            <p>{t.landing.letterFear}</p>

                            <p>{t.landing.letterFearList}</p>

                            <p className="text-center italic text-2xl md:text-3xl py-6 text-subtle">{t.landing.letterWhatIf}</p>

                            <p>{t.landing.letterSolitude}</p>

                            <p>{t.landing.letterTiredness}</p>

                            <p>{t.landing.letterCarryAlone}</p>

                            <p>{t.landing.letterDistance}</p>

                            {t.landing.letterLacks.map((item, i) => (
                                <p key={i}><span className="bg-stone-100 dark:bg-stone-800 px-1">{item}</span></p>
                            ))}

                            <p className="font-bold text-ink dark:text-white">{t.landing.letterWorldScreams}</p>

                            <p>{t.landing.letterSurvival}</p>

                            <p className="font-bold text-2xl">{t.landing.letterButIf}</p>

                            {t.landing.letterWhatIfList.map((item, i) => (
                                <p key={i}>👉 {item}</p>
                            ))}

                            <p><span className="font-black text-ink dark:text-white bg-gold/20 px-2 py-1 rounded">{t.landing.letterReason}</span></p>

                            <p>{t.landing.letterNotSubstitute}</p>

                            <p>{t.landing.letterWhere}</p>

                            <p className="font-bold text-ink dark:text-white">{t.landing.letterIncludes}</p>

                            <ul className="space-y-4 text-lg list-none p-0">
                                {t.landing.letterFeatures.map((item, i) => (
                                    <li key={i} className="flex items-start gap-2">{item}</li>
                                ))}
                            </ul>

                            <p className="font-bold">{t.landing.letterBonus}</p>

                            <p className="text-lg leading-relaxed">
                                {t.landing.letterBonusDesc}
                            </p>

                            <p>{t.landing.letterBibleOnly}</p>

                            <p className="text-center font-bold border-y border-stone-200 dark:border-stone-800 py-6">
                                {t.landing.letterJesus}
                            </p>

                            <p>Com o tempo, você vai perceber:</p>

                            <ul className="space-y-2 text-lg font-bold list-none p-0">
                                {t.landing.letterResults.map((item, i) => (
                                    <li key={i} className="flex items-center gap-2"><CheckCircle2 size={18} className="text-green-500" /> {item}</li>
                                ))}
                            </ul>

                            <p><span className="bg-ink text-white dark:bg-white dark:text-ink px-4 py-2 rounded-full font-bold">{t.landing.letterAutoExit}</span></p>

                            <p>{t.landing.letterCall}</p>

                            {t.landing.letterAction.map((item, i) => (
                                <p key={i}>{item}</p>
                            ))}

                            <p>{t.landing.letterSpecial}</p>

                            <p>{t.landing.letterTruth}</p>

                            <p className="text-2xl font-bold">{t.landing.letterGodHere}</p>

                            <p className="text-3xl font-serif font-black pt-10">{t.landing.letterFinal}</p>
                        </div>
                    </div>

                    {/* 1. THE PROBLEM (Text + Visual Split) */}
                    <div className="grid md:grid-cols-2 gap-12 items-center mb-32 relative">

                        {/* Visual Decoration Slogan */}
                        <div className="hidden md:block absolute top-0 right-0 transform translate-x-10 -translate-y-10 z-20">
                            <div className="bg-white dark:bg-stone-800 p-4 rounded-lg shadow-xl border border-stone-100 dark:border-stone-700 rotate-6">
                                <p className="font-serif text-sm font-bold text-red-500">"O mundo grita..."</p>
                            </div>
                        </div>

                        <div className="space-y-8 order-2 md:order-1">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-100 dark:bg-red-900/20 text-red-600 rounded-full text-xs font-bold uppercase tracking-widest">
                                <AlertTriangle size={12} /> {t.landing.problemAlert}
                            </div>
                            <h2 className="font-serif font-bold text-4xl md:text-5xl text-ink dark:text-white leading-tight">
                                {t.landing.problemTitle}
                            </h2>
                            <div className="space-y-6 text-xl text-stone-600 dark:text-stone-300 font-serif leading-relaxed border-l-2 border-stone-200 dark:border-stone-800 pl-6">
                                {t.landing.problemDesc.map((item, i) => (
                                    <p key={i}>{item}</p>
                                ))}
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
                                        <p className="text-white font-bold uppercase tracking-widest text-sm">{t.landing.rekindle}</p>
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
                                <BookOpen size={12} /> {t.landing.solutionTag}
                            </div>
                            <h2 className="font-serif font-bold text-4xl md:text-5xl text-ink dark:text-white leading-tight">
                                {t.landing.solutionTitle}
                            </h2>
                            <div className="space-y-6 text-xl text-stone-600 dark:text-stone-300 font-serif leading-relaxed">
                                {t.landing.solutionDesc.map((item, i) => (
                                    <p key={i}>{item}</p>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* --- NEW SECTION: CASAMENTO (Updated Pattern) --- */}
                    <div className="my-24 bg-gradient-to-br from-stone-50 to-orange-50 dark:from-stone-900 dark:to-stone-800 rounded-[3rem] p-8 md:p-12 relative overflow-hidden border border-stone-200 dark:border-stone-800">
                        <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
                            <div className="space-y-8">
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white dark:bg-white/10 text-orange rounded-full text-xs font-bold uppercase tracking-widest shadow-sm">
                                    <HeartHandshake size={12} /> {t.landing.marriageTag}
                                </div>
                                <h3 className="font-serif font-bold text-3xl md:text-5xl text-ink dark:text-white leading-tight">
                                    {t.landing.marriageTitle}
                                </h3>
                                <div className="font-serif text-lg md:text-xl text-stone-600 dark:text-stone-300 leading-loose space-y-6">
                                    {t.landing.marriageDesc.map((item, i) => (
                                        <p key={i}>{item}</p>
                                    ))}
                                    <p className="italic font-medium text-orange">{t.landing.marriageQuote}</p>
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
                            <p className="font-serif italic text-lg text-ink dark:text-white">{t.landing.sloganPrayer}</p>
                        </div>
                    </div>

                    {/* --- SEÇÃO FAMÍLIA (Updated Pattern) --- */}
                    <div className="my-24 bg-stone-50 dark:bg-stone-900/50 rounded-[3rem] p-8 md:p-12 border border-stone-200 dark:border-stone-800">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            {/* Visual Column */}
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
                                    <Home size={12} /> {t.landing.familyTag}
                                </div>
                                <h3 className="font-serif font-bold text-3xl md:text-4xl text-ink dark:text-white leading-tight">
                                    {t.landing.familyTitle}
                                </h3>
                                <div className="font-serif text-lg md:text-xl text-stone-600 dark:text-stone-300 leading-loose space-y-6">
                                    {t.landing.familyDesc.map((item, i) => (
                                        <p key={i}>{item}</p>
                                    ))}
                                    <p className="bg-indigo-50 dark:bg-indigo-900/10 p-4 rounded-2xl border-l-4 border-indigo-500 font-bold text-indigo-800 dark:text-indigo-200">
                                        {t.landing.familyCall}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* --- SEÇÃO VISUAL NOVA 1: ATMOSFERA DE ADORAÇÃO (NEW COPY) --- */}
                    <div className="my-24 bg-stone-900 dark:bg-black rounded-[3rem] p-8 md:p-12 relative overflow-hidden text-white shadow-2xl">

                        {/* SLOGAN 4: INSIDE WORSHIP */}
                        <div className="absolute top-6 right-6 md:top-10 md:right-10 z-20 animate-float">
                            <div className="bg-white/10 backdrop-blur-md px-6 py-2 rounded-full border border-white/20">
                                <p className="font-bold text-sm text-gold tracking-wider uppercase flex items-center gap-2">
                                    <Music size={14} /> {t.landing.worshipSlogan}
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
                                    <Music size={14} /> {t.landing.worshipTag}
                                </div>
                                <h3 className="font-serif font-bold text-3xl md:text-5xl leading-tight">
                                    {t.landing.worshipTitle}
                                </h3>
                                <div className="space-y-4">
                                    <p className="text-white text-xl leading-relaxed font-bold">
                                        {t.landing.worshipDesc}
                                    </p>
                                    <p className="text-stone-300 text-lg leading-relaxed max-w-md">
                                        {t.landing.worshipSub}
                                    </p>
                                </div>
                            </div>

                            {/* Visual Card */}
                            <div className="w-full md:w-1/2 relative group">
                                <div className="absolute -inset-2 bg-gradient-to-r from-gold to-orange rounded-[2rem] blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-700"></div>
                                <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-[2rem] flex items-center gap-4 hover:-translate-y-2 transition-transform duration-500">
                                    <div className="w-20 h-20 rounded-full bg-cover bg-center shadow-lg border-2 border-white/30" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=300&auto=format&fit=crop')" }}></div>
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
                                {t.landing.routineTitle}
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
                                            {t.landing.routineMorning}
                                        </h4>
                                        <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed font-serif">
                                            {t.landing.routineMorningDesc}
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
                                            {t.landing.routineAfternoon}
                                        </h4>
                                        <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed font-serif">
                                            {t.landing.routineAfternoonDesc}
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
                                            {t.landing.routineNight}
                                        </h4>
                                        <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed font-serif">
                                            {t.landing.routineNightDesc}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* --- NEW SECTION: O ARSENAL PREMIUM (High Impact) --- */}
                    <section className="py-24 px-6 bg-white dark:bg-stone-950 overflow-hidden">
                        <div className="max-w-6xl mx-auto">
                            <div className="text-center mb-16 animate-fade-in">
                                <h2 className="text-4xl md:text-6xl font-serif font-black text-ink dark:text-white leading-tight mb-4">
                                    {t.landing.premiumTitle}
                                </h2>
                                <p className="text-xl text-subtle max-w-2xl mx-auto font-medium italic">
                                    {t.landing.premiumSubtitle}
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8">
                                {/* Shalom Flix */}
                                <div className="group p-8 md:p-12 bg-stone-50 dark:bg-stone-900 rounded-[3rem] border border-stone-100 dark:border-stone-800 hover:border-gold/30 transition-all duration-500 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full blur-3xl -mr-10 -mt-10 group-hover:scale-150 transition-transform"></div>
                                    <div className="relative z-10">
                                        <div className="w-16 h-16 bg-ink dark:bg-white text-white dark:text-ink rounded-2xl flex items-center justify-center mb-8 shadow-lg group-hover:rotate-3 transition-transform">
                                            <Play size={32} fill="currentColor" />
                                        </div>
                                        <h3 className="text-2xl md:text-3xl font-serif font-black mb-4 text-ink dark:text-white leading-tight">
                                            {t.landing.flixTitle}
                                        </h3>
                                        <p className="text-lg text-stone-600 dark:text-stone-400 leading-relaxed">
                                            {t.landing.flixDesc}
                                        </p>
                                    </div>
                                </div>

                                {/* Salmos Explicados */}
                                <div className="group p-8 md:p-12 bg-ink text-white rounded-[3rem] border border-white/5 hover:border-gold/30 transition-all duration-500 relative overflow-hidden">
                                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -ml-10 -mb-10 group-hover:scale-150 transition-transform"></div>
                                    <div className="relative z-10">
                                        <div className="w-16 h-16 bg-white/10 backdrop-blur-md text-gold rounded-2xl flex items-center justify-center mb-8 border border-white/10 shadow-lg group-hover:-rotate-3 transition-transform">
                                            <ShieldCheck size={32} />
                                        </div>
                                        <h3 className="text-2xl md:text-3xl font-serif font-black mb-4 leading-tight">
                                            {t.landing.psalmsTitle}
                                        </h3>
                                        <p className="text-lg text-stone-300 leading-relaxed">
                                            {t.landing.psalmsDesc}
                                        </p>
                                    </div>
                                </div>

                                {/* Jesus queria que você soubesse */}
                                <div className="group p-8 md:p-12 bg-stone-50 dark:bg-stone-900 rounded-[3rem] border border-stone-100 dark:border-stone-800 hover:border-emerald-200 transition-all duration-500 relative overflow-hidden">
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-500/5 rounded-full blur-[80px] pointer-events-none"></div>
                                    <div className="relative z-10">
                                        <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform">
                                            <Sparkles size={32} fill="currentColor" />
                                        </div>
                                        <h3 className="text-2xl md:text-3xl font-serif font-black mb-4 text-ink dark:text-white leading-tight">
                                            {t.landing.whatJesusTitle}
                                        </h3>
                                        <p className="text-lg text-stone-600 dark:text-stone-400 leading-relaxed">
                                            {t.landing.whatJesusDesc}
                                        </p>
                                    </div>
                                </div>

                                {/* Manual de Reaproximação */}
                                <div className="group p-8 md:p-12 bg-amber-50 dark:bg-amber-900/10 rounded-[3rem] border border-amber-100 dark:border-amber-900/20 hover:border-amber-300 transition-all duration-500 relative overflow-hidden">
                                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-amber-200/20 rounded-full blur-3xl group-hover:bg-amber-400/20 transition-colors"></div>
                                    <div className="relative z-10">
                                        <div className="w-16 h-16 bg-white dark:bg-stone-800 text-amber-600 rounded-2xl flex items-center justify-center mb-8 shadow-sm border border-amber-100 dark:border-amber-800 group-hover:translate-x-1 transition-transform">
                                            <Footprints size={32} />
                                        </div>
                                        <h3 className="text-2xl md:text-3xl font-serif font-black mb-4 text-ink dark:text-white leading-tight">
                                            {t.landing.reconnectionTitle}
                                        </h3>
                                        <p className="text-lg text-stone-700 dark:text-stone-300 leading-relaxed font-medium">
                                            {t.landing.reconnectionDesc}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-20 text-center">
                                <p className="text-2xl md:text-3xl font-serif font-bold text-ink dark:text-white">
                                    {t.landing.valueCall}
                                </p>
                                <div className="mt-8 h-1 w-24 bg-gold mx-auto rounded-full"></div>
                            </div>
                        </div>
                    </section>

                    {/* --- NEW SECTION: MERGULHE NA EXPERIÊNCIA (High-Fidelity Mockups) --- */}
                    <section className="py-24 px-6 bg-stone-50 dark:bg-stone-900/30 overflow-hidden border-y border-stone-200 dark:border-stone-800">
                        <div className="max-w-7xl mx-auto">
                            <div className="text-center mb-20 animate-fade-in">
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold/10 text-gold-dark dark:text-gold rounded-full text-xs font-bold uppercase tracking-widest mb-4">
                                    <Monitor size={14} /> Veja por dentro
                                </div>
                                <h2 className="text-4xl md:text-6xl font-serif font-black text-ink dark:text-white leading-tight mb-4">
                                    Mergulhe na Experiência Shalom
                                </h2>
                                <p className="text-xl text-subtle max-w-2xl mx-auto">
                                    Uma interface pensada para elevar sua alma e proteger sua família.
                                </p>
                            </div>

                            <div className="space-y-32">
                                {/* MOCKUP 1: SHALOM FLIX (Netflix Style) */}
                                <div className="grid lg:grid-cols-12 gap-12 items-center">
                                    <div className="lg:col-span-5 space-y-8 order-2 lg:order-1">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="w-12 h-12 bg-red-600 text-white rounded-xl shadow-lg flex items-center justify-center">
                                                <Play size={24} fill="currentColor" />
                                            </div>
                                            <h3 className="text-3xl md:text-4xl font-serif font-black text-ink dark:text-white">Shalom Flix</h3>
                                        </div>
                                        <p className="text-xl text-stone-600 dark:text-stone-300 leading-relaxed font-serif">
                                            O streaming que edifica. Esqueça as sugestões mundanas de outras plataformas. Aqui, cada pixel é dedicado à glória de Deus e à educação da sua família.
                                        </p>
                                        <ul className="space-y-4">
                                            {[
                                                "Animações exclusivas em alta definição",
                                                "Categorias por Temas (Fé, Milagres, Sabedoria)",
                                                "Continue assistindo de onde parou",
                                                "Conteúdo livre de anúncios e valores invertidos"
                                            ].map((item, i) => (
                                                <li key={i} className="flex items-center gap-3 text-stone-700 dark:text-stone-300 font-bold">
                                                    <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 flex items-center justify-center">
                                                        <Check size={14} />
                                                    </div>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* THE REALISTIC MOCKUP: FLIX */}
                                    <div className="lg:col-span-7 order-1 lg:order-2">
                                        <div className="relative group">
                                            <div className="absolute inset-0 bg-red-600/10 rounded-[3rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                                            <div className="bg-black rounded-[2.5rem] border-[8px] border-stone-800 shadow-2xl overflow-hidden aspect-video relative">
                                                {/* Flix UI Header */}
                                                <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-black/80 to-transparent z-20 flex items-center px-8 justify-between">
                                                    <div className="flex items-center gap-8">
                                                        <ShalomLogo size="w-8" />
                                                        <div className="hidden md:flex gap-6 text-xs font-bold text-white/70">
                                                            <span className="text-white">Home</span>
                                                            <span>Séries</span>
                                                            <span>Filmes</span>
                                                            <span>Minha Lista</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-4 text-white">
                                                        <Search size={18} />
                                                        <Bell size={18} />
                                                        <div className="w-8 h-8 rounded bg-gold flex items-center justify-center text-black font-black text-xs">J</div>
                                                    </div>
                                                </div>

                                                {/* Flix Hero Content */}
                                                <div className="absolute inset-0 z-0">
                                                    <img
                                                        src="https://files.catbox.moe/y1hf4n.png"
                                                        className="w-full h-full object-cover"
                                                        alt="Biblical Animation Hero"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent"></div>
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                                                </div>

                                                {/* Flix Hero Text */}
                                                <div className="absolute bottom-24 left-10 z-10 max-w-sm">
                                                    <h4 className="text-4xl font-black text-white mb-2 leading-none uppercase tracking-tighter">Davi e a Ovelha Perdida</h4>
                                                    <p className="text-white/80 text-[10px] font-medium mb-4 line-clamp-2">Uma lição emocionante sobre o cuidado do Bom Pastor e a importância de cada ovelha no Reino de Deus.</p>
                                                    <div className="flex gap-2">
                                                        <button className="px-6 py-2 bg-white text-black rounded font-black text-xs flex items-center gap-2 hover:bg-white/90 transition-colors">
                                                            <Play size={12} fill="currentColor" /> Assistir
                                                        </button>
                                                        <button className="px-6 py-2 bg-white/20 text-white backdrop-blur-md rounded font-black text-xs border border-white/20 hover:bg-white/30 transition-colors">
                                                            Saiba Mais
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Flix Rows */}
                                                <div className="absolute bottom-4 inset-x-0 px-10 z-10 hidden md:block">
                                                    <p className="text-[10px] font-bold text-white uppercase tracking-widest mb-2">Original Shalom Productions</p>
                                                    <div className="flex gap-2 overflow-hidden">
                                                        {[
                                                            "https://files.catbox.moe/b98izg.png", // Moisés
                                                            "https://files.catbox.moe/5vf4vu.png", // Nascimento
                                                            "https://files.catbox.moe/zuwgi9.png", // Rute
                                                            "https://files.catbox.moe/vxcyls.png"  // Ester
                                                        ].map((img, i) => (
                                                            <div key={i} className="flex-none w-32 aspect-video rounded-md overflow-hidden border border-white/10 hover:border-gold transition-colors">
                                                                <img src={img} className="w-full h-full object-cover" />
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* MOCKUP 2: KIDS ZONE (Playful Style) */}
                                <div className="grid lg:grid-cols-12 gap-12 items-center">
                                    {/* THE REALISTIC MOCKUP: KIDS */}
                                    <div className="lg:col-span-7 order-1 relative">
                                        <div className="absolute -inset-10 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-[100px] opacity-50"></div>
                                        <div className="bg-white dark:bg-stone-800 rounded-[3rem] border-[10px] border-stone-200 dark:border-stone-700 shadow-2xl overflow-hidden aspect-[4/3] relative">
                                            {/* Kids Header */}
                                            <div className="absolute top-0 inset-x-0 h-20 bg-gradient-to-b from-blue-500 to-blue-600 z-20 flex items-center px-10 justify-between">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-lg">
                                                        <Baby size={28} />
                                                    </div>
                                                    <h4 className="text-white font-serif font-black text-2xl tracking-tighter">Kids Zone</h4>
                                                </div>
                                                <div className="flex gap-4">
                                                    <div className="w-12 h-12 bg-white/20 rounded-full border border-white/30 flex items-center justify-center text-white">
                                                        <Stars size={24} />
                                                    </div>
                                                    <div className="px-4 py-2 bg-yellow-400 text-yellow-900 rounded-2xl font-black text-sm flex items-center gap-2 shadow-lg">
                                                        <Trophy size={18} /> 250 XP
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Kids Main Content Area */}
                                            <div className="absolute inset-0 pt-20 bg-blue-50 dark:bg-stone-900 flex flex-col gap-6 p-8 overflow-y-auto">
                                                <div className="flex justify-between items-end">
                                                    <h5 className="font-serif font-black text-2xl text-blue-800 dark:text-blue-300">Nossas Histórias ✨</h5>
                                                    <span className="text-xs font-bold text-blue-500 uppercase">Ver todas</span>
                                                </div>

                                                {/* Story Cards */}
                                                <div className="flex gap-6 overflow-hidden pb-4">
                                                    <div className="flex-none w-64 bg-white dark:bg-stone-800 rounded-[2.5rem] shadow-xl border border-stone-100 dark:border-stone-700 p-4 transform hover:rotate-2 transition-transform">
                                                        <div className="w-full aspect-square rounded-[2rem] overflow-hidden mb-4 border-4 border-blue-50">
                                                            <img src="https://files.catbox.moe/vlhr3q.png" className="w-full h-full object-cover" alt="Noah's Ark" />
                                                        </div>
                                                        <div className="px-2">
                                                            <h6 className="font-black text-blue-900 dark:text-white text-lg">A Arca de Noé</h6>
                                                            <p className="text-xs text-stone-500 font-medium mb-3">6 Min • Aventura</p>
                                                            <button className="w-full py-3 bg-blue-500 text-white rounded-2xl font-black text-sm shadow-lg shadow-blue-500/20">LER AGORA</button>
                                                        </div>
                                                    </div>
                                                    <div className="flex-none w-64 bg-white dark:bg-stone-800 rounded-[2.5rem] shadow-xl border border-stone-100 dark:border-stone-700 p-4 opacity-70 scale-95 origin-left">
                                                        <div className="w-full aspect-square rounded-[2rem] overflow-hidden mb-4 grayscale opacity-50">
                                                            <img src="https://files.catbox.moe/ftn0hj.png" className="w-full h-full object-cover" alt="Jesus Story" />
                                                            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                                                                <Lock size={24} className="text-white" />
                                                            </div>
                                                        </div>
                                                        <h6 className="font-black text-stone-400 text-lg">História de Jesus</h6>
                                                        <p className="text-xs text-stone-400 font-medium">Bloqueado • Nível 2</p>
                                                    </div>
                                                </div>

                                                {/* Games Shortcut */}
                                                <div className="bg-purple-600 rounded-[2.5rem] p-6 text-white flex items-center justify-between shadow-xl shadow-purple-600/30 overflow-hidden relative group cursor-pointer">
                                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                                                    <div className="flex items-center gap-4 relative z-10">
                                                        <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20">
                                                            <Gamepad2 size={32} />
                                                        </div>
                                                        <div>
                                                            <h5 className="font-black text-xl">Jogos Bíblicos</h5>
                                                            <p className="text-xs text-purple-200 font-bold tracking-widest uppercase">Novos desafios!</p>
                                                        </div>
                                                    </div>
                                                    <ChevronRight className="relative z-10 group-hover:translate-x-2 transition-transform" />
                                                </div>
                                            </div>

                                            {/* App Dock/Navbar Mockup */}
                                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-48 h-14 bg-white/90 dark:bg-stone-800/90 backdrop-blur-lg rounded-full border border-white/20 shadow-2xl flex items-center justify-around px-4 z-20">
                                                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-full flex items-center justify-center"><Home size={20} /></div>
                                                <div className="w-10 h-10 text-stone-400 flex items-center justify-center"><BookOpen size={20} /></div>
                                                <div className="w-10 h-10 text-stone-400 flex items-center justify-center"><User size={20} /></div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="lg:col-span-5 space-y-8 order-2">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="w-12 h-12 bg-blue-600 text-white rounded-xl shadow-lg flex items-center justify-center">
                                                <Baby size={28} />
                                            </div>
                                            <h3 className="text-3xl md:text-4xl font-serif font-black text-ink dark:text-white">Kids Zone</h3>
                                        </div>
                                        <p className="text-xl text-stone-600 dark:text-stone-300 leading-relaxed font-serif">
                                            Seus filhos merecem o melhor da tecnologia aliado ao melhor da fé. Um ambiente 100% blindado contra o assédio visual do mundo moderno.
                                        </p>
                                        <ul className="space-y-4">
                                            {[
                                                "Histórias interativas em formato de quadrinhos",
                                                "Sistema de XP e Recompensas (Gamification)",
                                                "Jogos que ensinam princípios bíblicos",
                                                "Interface segura e de fácil navegação para crianças"
                                            ].map((item, i) => (
                                                <li key={i} className="flex items-center gap-3 text-stone-700 dark:text-stone-300 font-bold">
                                                    <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center">
                                                        <Sparkles size={14} />
                                                    </div>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="pt-6">
                                            <button onClick={handleStart} className="px-8 py-4 bg-ink dark:bg-white text-white dark:text-ink rounded-2xl font-black shadow-xl hover:scale-105 transition-all text-sm uppercase tracking-widest flex items-center gap-2">
                                                Ativar para meus filhos <ArrowRight size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <div className="my-24">
                        <div className="text-center mb-12">
                            <h3 className="font-serif font-black text-3xl md:text-4xl text-ink dark:text-white mb-4">
                                {t.landing.journeysTitle}
                            </h3>
                            <p className="text-subtle max-w-lg mx-auto">
                                {t.landing.journeysDesc}
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
                                    <h4 className="font-bold text-2xl mb-2">{t.landing.journeyAnxiety}</h4>
                                    <p className="text-stone-300 text-sm leading-relaxed">{t.landing.journeyAnxietyDesc}</p>
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
                                    <h4 className="font-bold text-2xl mb-2">{t.landing.journeyWisdom}</h4>
                                    <p className="text-stone-300 text-sm leading-relaxed">{t.landing.journeyWisdomDesc}</p>
                                </div>
                            </div>

                            {/* Card 2: Gratidão */}
                            <div className="h-80 rounded-[2.5rem] relative overflow-hidden group cursor-default md:col-span-1">
                                <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Sunrise" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                                <div className="absolute bottom-0 p-8 text-white">
                                    <div className="mb-3 w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center">
                                        <Heart size={20} fill="currentColor" />
                                    </div>
                                    <h4 className="font-bold text-2xl mb-2">{t.landing.journeyGratitude}</h4>
                                    <p className="text-stone-300 text-sm leading-relaxed">{t.landing.journeyGratitudeDesc}</p>
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
                                    <h3 className="font-serif font-bold text-2xl text-ink dark:text-white mb-4">{t.landing.differentialTitle}</h3>

                                    <p className="text-lg md:text-xl leading-relaxed font-medium text-stone-600 dark:text-stone-300">
                                        {t.landing.differentialDesc}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Investment/Value */}
                        <div className="mt-16 mb-8 text-center bg-stone-50 dark:bg-stone-900 p-8 rounded-3xl border border-stone-200 dark:border-stone-800">
                            <h3 className="font-serif font-bold text-2xl mb-6 text-ink dark:text-white">{t.landing.investmentTitle}</h3>
                            <div className="space-y-4 text-lg text-stone-600 dark:text-stone-300 leading-relaxed">
                                {t.landing.investmentDesc.map((item, i) => (
                                    <p key={i}>{item}</p>
                                ))}
                            </div>
                        </div>

                        <p className="text-2xl font-serif font-bold text-center mt-12 mb-12 text-ink dark:text-white">
                            {t.landing.letterFinal}
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
                                    {t.landing.testimonialQuote}
                                </p>
                                <div>
                                    <p className="font-bold text-lg text-ink dark:text-white">{t.landing.testimonialAuthor}</p>
                                    <p className="text-sm text-subtle">{t.landing.testimonialInfo}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* PRICING SECTION - The Offer */}
            <section id="pricing" className="py-24 px-6 relative bg-gradient-to-b from-white to-stone-50 dark:from-stone-950 dark:to-black">

                {/* --- MULTI-DEVICE MOCKUP SECTION (Fiel à Interface do App) --- */}
                <div className="max-w-6xl mx-auto mb-32 relative">
                    <div className="text-center mb-24 px-6">
                        <div className="inline-flex items-center gap-2 text-gold font-bold text-xs uppercase tracking-widest mb-4">
                            <Smartphone size={16} /> <Tablet size={16} /> <Monitor size={16} /> {t.landing.devicesTag}
                        </div>
                        <h3 className="text-3xl md:text-6xl font-serif font-black text-ink dark:text-white mb-6 leading-tight">
                            {t.landing.devicesTitle}
                        </h3>
                        <p className="text-subtle text-lg max-w-2xl mx-auto">
                            {t.landing.devicesDesc}
                        </p>
                    </div>

                    <div className="relative h-[500px] md:h-[750px] w-full flex items-center justify-center">

                        {/* 1. MOCKUP PC (MELHORADO) - BÍBLIA ABERTA NO DESKTOP */}
                        <div className="absolute w-[90%] md:w-[70%] aspect-video bg-[#0f172a] rounded-[2rem] shadow-[0_60px_120px_-30px_rgba(0,0,0,0.8)] border-[12px] border-[#1e293b] overflow-hidden transform -translate-y-24 z-0 scale-90 md:scale-100 group">
                            {/* Top Browser Bar */}
                            <div className="h-10 bg-[#1e293b] border-b border-white/5 flex items-center px-4 gap-2">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                                    <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                                </div>
                                <div className="mx-auto bg-black/30 rounded-md px-6 py-1 text-[10px] text-stone-400 font-medium">app.shalom.com/bible/genesis-1</div>
                            </div>

                            <div className="flex h-full w-full bg-[#fafaf9] dark:bg-[#0c0a09] font-sans">
                                {/* Realistic Sidebar */}
                                <div className="w-64 bg-white dark:bg-[#1c1917] border-r border-stone-200 dark:border-stone-800 flex flex-col py-6">
                                    <div className="px-6 mb-10 flex items-center gap-2">
                                        <ShalomLogo size="w-8 h-8" />
                                        <span className="font-serif font-black text-lg dark:text-white tracking-tighter">{t.common.appName}</span>
                                    </div>

                                    <div className="px-3 space-y-1">
                                        <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-stone-400 font-medium text-sm"><Home size={18} /> {t.nav.home}</div>
                                        <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-ink dark:bg-white text-white dark:text-ink font-bold text-sm shadow-lg"><BookOpen size={18} /> {t.nav.bible}</div>
                                        <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-stone-400 font-medium text-sm"><Music size={18} /> {t.nav.worship}</div>
                                        <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-stone-400 font-medium text-sm"><Zap size={18} /> {t.nav.journey}</div>
                                    </div>

                                    <div className="mt-auto px-6">
                                        <div className="p-4 bg-gold/10 rounded-2xl border border-gold/20">
                                            <p className="text-[10px] font-black text-gold uppercase mb-1">Seu Progresso</p>
                                            <div className="w-full h-1.5 bg-gold/20 rounded-full overflow-hidden mb-2">
                                                <div className="w-1/3 h-full bg-gold"></div>
                                            </div>
                                            <p className="text-[10px] text-stone-500 font-bold">15/50 Capítulos</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Content Area */}
                                <div className="flex-1 flex flex-col overflow-hidden bg-[#fafaf9] dark:bg-[#0c0a09]">
                                    {/* Top Internal Navigation */}
                                    <div className="px-8 py-4 border-b border-stone-100 dark:border-stone-800 flex justify-between items-center">
                                        <div className="flex items-center gap-4">
                                            <h4 className="font-serif font-black text-2xl dark:text-white">Gênesis <span className="text-orange">1</span></h4>
                                            <div className="bg-stone-100 dark:bg-stone-800 p-1.5 rounded-lg flex gap-1">
                                                <div className="w-4 h-4 bg-stone-300 rounded-sm"></div>
                                                <div className="w-4 h-4 bg-stone-300 rounded-sm"></div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-400"><Search size={14} /></div>
                                            <div className="w-20 h-8 rounded-full bg-ink dark:bg-white text-white dark:text-ink text-[10px] font-bold flex items-center justify-center shadow-md">LIDO</div>
                                        </div>
                                    </div>

                                    {/* Bible Reader Text */}
                                    <div className="flex-1 p-12 overflow-hidden relative">
                                        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-stone-200/20 to-transparent"></div>
                                        <div className="space-y-6 max-w-2xl mx-auto opacity-80">
                                            <div className="flex gap-4">
                                                <span className="text-orange font-black text-xs shrink-0 mt-1">1</span>
                                                <p className="text-lg font-serif dark:text-stone-300 leading-relaxed">No princípio criou Deus o céu e a terra.</p>
                                            </div>
                                            <div className="flex gap-4 bg-gold/10 border-l-4 border-gold p-4 rounded-r-xl">
                                                <span className="text-orange font-black text-xs shrink-0 mt-1">2</span>
                                                <p className="text-lg font-serif dark:text-stone-300 leading-relaxed">E a terra era sem forma e vazia; e havia trevas sobre a face do abismo; e o <span className="font-bold underline decoration-gold">Espírito de Deus</span> se movia sobre a face das águas.</p>
                                            </div>
                                            <div className="flex gap-4">
                                                <span className="text-orange font-black text-xs shrink-0 mt-1">3</span>
                                                <p className="text-lg font-serif dark:text-stone-300 leading-relaxed">E disse Deus: Haja luz; e houve luz.</p>
                                            </div>
                                            <div className="h-4 bg-stone-100 dark:bg-stone-800 rounded-full w-full opacity-50"></div>
                                            <div className="h-4 bg-stone-100 dark:bg-stone-800 rounded-full w-5/6 opacity-50"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 2. MOCKUP TABLET (Remains Realistic) */}
                        <div className="absolute left-[2%] md:left-[10%] w-[50%] md:w-[38%] aspect-[3/4] bg-stone-900 rounded-[3rem] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.7)] border-[14px] border-stone-950 overflow-hidden transform translate-y-24 -rotate-6 z-10 hover:rotate-0 transition-all duration-700 hidden md:block">
                            <div className="h-full w-full bg-stone-900 p-8 flex flex-col">
                                <div className="flex items-center gap-2 mb-8">
                                    <div className="w-8 h-8 bg-gold rounded-xl flex items-center justify-center text-ink"><Music size={16} /></div>
                                    <h4 className="text-white font-serif font-bold text-lg">{t.nav.worship}</h4>
                                </div>
                                <div className="relative aspect-square bg-stone-800 rounded-3xl mb-8 flex items-center justify-center overflow-hidden shadow-2xl group">
                                    <img src="https://images.unsplash.com/photo-1483043012503-8a8849b4c949?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="absolute inset-0 w-full h-full object-cover opacity-40" />
                                    <div className="w-20 h-20 bg-gold rounded-full flex items-center justify-center text-ink shadow-2xl animate-pulse"><Play size={32} fill="currentColor" /></div>
                                </div>
                                <div className="space-y-4">
                                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full bg-gold w-1/3"></div>
                                    </div>
                                    <div className="flex justify-between text-[10px] text-stone-400 font-mono"><span>1:24</span><span>4:15</span></div>
                                    <h5 className="text-white font-bold text-xl truncate">Milagres do Caminho</h5>
                                    <p className="text-gold text-xs font-bold uppercase tracking-widest">Soraya Moraes</p>
                                </div>
                            </div>
                        </div>

                        {/* 3. MOCKUP SMARTPHONE (DESTAQUE) */}
                        <div className="absolute right-[5%] md:right-[18%] w-[85%] md:w-[22%] aspect-[9/19.5] bg-stone-950 rounded-[3.5rem] shadow-[0_60px_120px_-20px_rgba(0,0,0,0.8)] border-[10px] border-stone-900 overflow-hidden z-20 transform translate-y-40 md:rotate-3 hover:rotate-0 transition-all duration-700">
                            <div className="h-full w-full bg-paper dark:bg-stone-950 flex flex-col p-6 overflow-hidden">
                                <div className="h-6 w-1/3 bg-stone-900 absolute top-0 left-1/2 -translate-x-1/2 rounded-b-2xl"></div>

                                <div className="mt-4 flex justify-between items-center mb-6">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black text-gold uppercase tracking-tighter">{t.home.greetingMorning},</span>
                                        <span className="text-sm font-serif font-black text-ink dark:text-white">Viajante</span>
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-orange/10 flex items-center justify-center text-orange"><Flame size={16} /></div>
                                </div>

                                <div className="w-full aspect-[4/5] bg-ink rounded-[2rem] p-5 relative overflow-hidden flex flex-col justify-center text-center shadow-lg mb-6">
                                    <img src="https://images.unsplash.com/photo-1458093257227-0f30303eb1f0?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="absolute inset-0 w-full h-full object-cover opacity-50" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                                    <div className="relative z-10">
                                        <Sparkles className="text-gold mx-auto mb-3" size={16} />
                                        <p className="text-white font-serif italic text-xs leading-relaxed">"O Senhor é o meu pastor, nada me faltará."</p>
                                        <p className="text-gold font-bold text-[8px] mt-2 tracking-widest uppercase">Salmos 23:1</p>
                                    </div>
                                </div>

                                <p className="text-[10px] font-bold text-subtle uppercase tracking-widest mb-3">{t.home.moodTitle}</p>
                                <div className="flex gap-2">
                                    <div className="w-12 h-16 bg-stone-100 dark:bg-stone-900 rounded-2xl flex flex-col items-center justify-center gap-1 border-2 border-gold shadow-sm">
                                        <div className="p-1 bg-gold rounded-full text-ink"><Zap size={10} /></div>
                                        <span className="text-[8px] font-bold text-gold">{t.moods.Anxious}</span>
                                    </div>
                                    <div className="w-12 h-16 bg-stone-100 dark:bg-stone-900 rounded-2xl flex flex-col items-center justify-center gap-1 opacity-40">
                                        <div className="p-1 bg-stone-700 rounded-full text-white"><Sun size={10} /></div>
                                        <span className="text-[8px] font-bold text-stone-500">{t.moods.Happy}</span>
                                    </div>
                                    <div className="w-12 h-16 bg-stone-100 dark:bg-stone-900 rounded-2xl flex flex-col items-center justify-center gap-1 opacity-40">
                                        <div className="p-1 bg-stone-700 rounded-full text-white"><Battery size={10} /></div>
                                        <span className="text-[8px] font-bold text-stone-500">{t.moods.Tired}</span>
                                    </div>
                                </div>

                                <div className="mt-auto -mx-6 h-14 bg-white dark:bg-stone-900 border-t border-stone-100 dark:border-stone-800 flex justify-around items-center px-4">
                                    <div className="text-gold"><Home size={18} /></div>
                                    <div className="text-stone-300"><BookOpen size={18} /></div>
                                    <div className="text-stone-300"><Music size={18} /></div>
                                    <div className="text-stone-300"><Zap size={18} /></div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="max-w-3xl mx-auto relative z-10">
                    {/* Headlines */}
                    <div className="text-center mb-10">
                        <h2 className="text-3xl md:text-5xl font-serif font-black mb-4 text-ink dark:text-white leading-tight">
                            {t.landing.pricingHeadline}
                        </h2>
                        <p className="text-lg text-subtle font-medium max-w-xl mx-auto">
                            {t.landing.pricingSub}
                        </p>
                    </div>

                    {/* Main Card */}
                    <div className="bg-surface dark:bg-stone-900 rounded-[2.5rem] shadow-2xl border border-stone-100 dark:border-stone-800 overflow-hidden relative">

                        <div className="p-6 md:p-10">

                            {/* Header Badge & Title */}
                            <div className="text-center mb-10">
                                <div className="inline-block bg-orange text-white text-[10px] md:text-xs font-bold px-6 py-2 rounded-full uppercase tracking-widest mb-6 shadow-lg shadow-orange/30">
                                    <Gift size={14} className="inline mr-1 mb-0.5" /> {t.landing.offerTag}
                                </div>
                                <h3 className="text-2xl md:text-3xl font-serif font-bold text-ink dark:text-white">
                                    {t.landing.packageTitle}
                                </h3>
                            </div>

                            {/* Features Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
                                {t.landing.features.map((feat, i) => {
                                    const Icon = [MessageCircle, Music, Baby, Sparkles][i];
                                    return (
                                        <div key={i} className="bg-stone-50 dark:bg-stone-800/50 p-3 rounded-xl flex flex-col items-center text-center gap-2 border border-stone-100 dark:border-stone-800">
                                            <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center">
                                                <Icon size={16} />
                                            </div>
                                            <span className="text-xs font-bold text-subtle leading-tight">{feat.label}</span>
                                        </div>
                                    )
                                })}
                            </div>

                            <p className="text-center text-xs font-bold text-subtle uppercase tracking-widest mb-4">{t.landing.selectPlan}</p>

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
                                            <h5 className="font-bold text-ink dark:text-white">{t.landing.monthly}</h5>
                                            <p className="text-xs text-subtle">{t.landing.monthlyFlex}</p>
                                        </div>
                                    </div>
                                    <span className="font-bold text-ink dark:text-white">{t.landing.monthlyPrice} <span className="text-xs font-normal text-subtle">{t.landing.monthlySub}</span></span>
                                </div>

                                {/* Yearly Option (Highlighted) */}
                                <div
                                    onClick={() => setSelectedPlan('yearly')}
                                    className={`relative cursor-pointer rounded-3xl p-6 border-2 transition-all flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl ${selectedPlan === 'yearly' ? 'border-gold bg-white dark:bg-stone-800 ring-4 ring-gold/10' : 'border-stone-200 opacity-60'}`}
                                >
                                    {/* Badge */}
                                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-green-100 text-green-700 text-sm font-black px-8 py-2.5 rounded-full uppercase tracking-widest border-2 border-green-200 shadow-md">
                                        {t.landing.yearlySave}
                                    </div>

                                    <div className="flex items-center gap-4 w-full md:w-auto">
                                        <div className="w-6 h-6 rounded-full bg-gold flex items-center justify-center text-white shrink-0">
                                            <Check size={14} strokeWidth={4} />
                                        </div>
                                        <div className="text-left">
                                            <h5 className="font-bold text-xl text-ink dark:text-white">{t.landing.yearly}</h5>
                                            <p className="text-xs text-red-400 line-through">{t.landing.yearlyOriginal}</p>
                                            <p className="text-sm font-bold text-green-600 dark:text-green-400">{t.landing.yearlyOnly}</p>
                                        </div>
                                    </div>

                                    <div className="text-center md:text-right">
                                        <span className="block text-4xl font-black text-ink dark:text-white tracking-tighter">{t.landing.yearlyPrice}</span>
                                        <span className="text-[10px] font-bold text-subtle uppercase tracking-wider block">{t.landing.yearlyPayment}</span>
                                    </div>

                                    {/* Float Badge */}
                                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-stone-900 text-white text-[10px] font-bold px-4 py-1.5 rounded-full shadow-lg flex items-center gap-1 whitespace-nowrap border border-white/10">
                                        <TrendingUp size={10} className="text-green-400" /> {t.landing.pizza}
                                    </div>
                                </div>
                            </div>

                            {/* Yellow Warning Box */}
                            <div className="mt-10 mb-8 bg-yellow-50 dark:bg-yellow-900/10 border-2 border-yellow-200 dark:border-yellow-800/30 border-dashed rounded-2xl p-6 text-center">
                                <div className="flex items-center justify-center gap-2 mb-2 text-yellow-700 dark:text-yellow-500 font-bold text-sm uppercase tracking-widest">
                                    <AlertCircle size={16} /> {t.landing.warningTitle}
                                </div>
                                <p className="text-sm text-yellow-800 dark:text-yellow-200/80 leading-relaxed font-medium">
                                    {t.landing.warningText}
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
                                <span className="flex items-center gap-2">{t.landing.ctaAccess} <ChevronRight strokeWidth={4} size={20} /></span>
                                <span className="text-[10px] font-medium opacity-90 tracking-widest uppercase">{t.landing.ctaAccessSub}</span>
                            </button>

                        </div>
                    </div>

                    {/* Guarantee and FAQ */}
                    <div className="mt-16 max-w-2xl mx-auto text-center bg-stone-100 dark:bg-stone-900 p-8 rounded-3xl border border-stone-200 dark:border-stone-800">
                        <div className="w-16 h-16 bg-white dark:bg-stone-800 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md text-gold">
                            <ShieldCheck size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-ink dark:text-white mb-2">{t.landing.guaranteeTitle}</h3>
                        <p className="text-subtle text-sm">
                            {t.landing.guaranteeDesc}
                        </p>
                    </div>

                    {/* FAQ */}
                    <div className="mt-16 max-w-2xl mx-auto">
                        <h3 className="text-lg font-bold text-center text-subtle uppercase tracking-widest mb-6">{t.landing.faqTitle}</h3>
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
                    <p>{t.landing.copyright}</p>

                    {/* Secret Button to Quiz */}
                    <button
                        onClick={() => navigate('/quiz')}
                        className="opacity-5 hover:opacity-100 transition-opacity duration-300 text-[10px] uppercase tracking-widest mt-4 p-2"
                    >
                        {t.landing.secretQuiz}
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
                                {t.landing.loginTitle}
                            </h3>
                            <p className="text-subtle text-sm mb-8 leading-relaxed max-w-xs">
                                {t.landing.loginDesc}
                            </p>

                            <form onSubmit={handleSaveEmail} className="w-full space-y-4">
                                <div className="relative group">
                                    <div className="absolute inset-0 bg-gradient-to-r from-gold to-orange rounded-2xl opacity-0 group-focus-within:opacity-100 blur transition-opacity duration-300 -z-10"></div>
                                    <input
                                        type="email"
                                        placeholder={t.landing.emailPlaceholder}
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
                                        <>{t.landing.login} <ArrowRight size={20} /></>
                                    )}
                                </button>
                            </form>

                            <p className="mt-6 text-[10px] text-stone-400 uppercase tracking-widest flex items-center gap-1 justify-center">
                                <Lock size={10} /> {t.landing.secureEnvironment}
                            </p>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
=======
  const navigate = useNavigate();
  const { t, language, setLanguage } = useLanguage();
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState(''); 
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('yearly');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

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

    // SUPER ADMIN CHECK
    if (email.trim() === 'pro@admin.user') {
        localStorage.setItem('lumina_email', email);
        navigate('/admin');
        return;
    }

    if (!email.trim() || !email.includes('@')) {
      setLoginError(t.landing.errorEmail);
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
            setLoginError(t.landing.errorNoSub);
            
            setTimeout(() => {
                setShowEmailModal(false);
                const el = document.getElementById('pricing');
                el?.scrollIntoView({ behavior: 'smooth' });
                alert(t.landing.errorNoSub);
            }, 1500);
        }
    } catch (error) {
        setLoginError(t.landing.errorConnection);
    } finally {
        setIsLoading(false);
    }
  };

  const faqs = t.landing.faqList || [];

  return (
    <div className="min-h-screen bg-paper dark:bg-black text-ink dark:text-white font-sans selection:bg-gold/30">
      
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-40 px-6 py-4 flex justify-between items-center backdrop-blur-xl bg-paper/70 dark:bg-black/70 border-b border-stone-200/50 dark:border-white/5 transition-all duration-300">
        <div className="flex items-center gap-2">
          <ShalomLogo />
          <span className="font-serif font-bold text-xl tracking-tight hidden md:block">{t.common.appName}</span>
        </div>
        <div className="flex items-center gap-4">
          
          {/* Language Switcher */}
          <div className="relative">
            <button onClick={() => setIsLangMenuOpen(!isLangMenuOpen)} className="flex items-center gap-1 text-sm font-bold text-subtle hover:text-ink dark:hover:text-white transition-colors">
                <Globe size={16} /> <span className="uppercase">{language}</span>
            </button>
            {isLangMenuOpen && (
                <div className="absolute top-10 right-0 bg-white dark:bg-stone-900 shadow-xl rounded-xl border border-stone-100 dark:border-stone-800 p-2 flex flex-col gap-1 w-24 animate-slide-up">
                    <button onClick={() => { setLanguage('pt'); setIsLangMenuOpen(false); }} className={`px-3 py-2 text-sm text-left rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 ${language === 'pt' ? 'font-bold text-orange' : 'text-stone-500'}`}>Português</button>
                    <button onClick={() => { setLanguage('en'); setIsLangMenuOpen(false); }} className={`px-3 py-2 text-sm text-left rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 ${language === 'en' ? 'font-bold text-orange' : 'text-stone-500'}`}>English</button>
                    <button onClick={() => { setLanguage('es'); setIsLangMenuOpen(false); }} className={`px-3 py-2 text-sm text-left rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 ${language === 'es' ? 'font-bold text-orange' : 'text-stone-500'}`}>Español</button>
                </div>
            )}
          </div>

          <button 
            onClick={() => {
                const el = document.getElementById('pricing');
                el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-sm font-bold text-subtle hover:text-ink dark:hover:text-white transition-colors hidden md:block"
          >
            {t.landing.ctaPlans}
          </button>
          <button 
            onClick={handleStart}
            className="px-6 py-2.5 rounded-full bg-ink dark:bg-white text-white dark:text-ink font-bold text-sm hover:scale-105 active:scale-95 transition-all shadow-lg hover:shadow-xl"
          >
            {t.landing.login}
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
                {t.landing.slogan1}
             </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-black leading-[1.05] mb-10 tracking-tighter text-ink dark:text-white drop-shadow-sm max-w-6xl">
            {t.landing.heroTitle} <span className="text-transparent bg-clip-text bg-gradient-to-br from-gold via-orange to-gold-dark relative inline-block">
              {t.landing.heroSubtitle}
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-orange opacity-40" viewBox="0 0 100 10" preserveAspectRatio="none">
                 <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
              </svg>
            </span>.
          </h1>
          
          <p className="text-xl md:text-2xl text-subtle max-w-4xl mx-auto mb-12 leading-relaxed font-medium">
            {t.landing.heroDesc}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full">
            <button 
              onClick={handleStart}
              className="group relative w-full sm:w-auto px-12 py-6 bg-ink dark:bg-white text-white dark:text-ink rounded-3xl font-black text-xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.4)] dark:shadow-[0_0_50px_-12px_rgba(255,255,255,0.4)] hover:shadow-2xl hover:scale-[1.03] active:scale-[0.98] transition-all flex items-center justify-center gap-4 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              <span>{t.landing.ctaStart}</span>
              <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* SLOGAN 1: HERO - Floating */}
          <div className="mt-16 animate-float-up" style={{ animationDelay: '0.5s' }}>
             <div className="inline-block px-8 py-4 rounded-2xl bg-white/80 dark:bg-stone-900/80 backdrop-blur-md border border-stone-200 dark:border-stone-800 shadow-xl transform rotate-1 hover:rotate-0 transition-transform cursor-default">
                <p className="font-serif italic text-lg text-ink dark:text-white">
                   {t.landing.sloganFloat}
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
                      <UserMinus size={12} /> {t.landing.alertSoul}
                  </div>
                  <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8 leading-tight">
                     {t.landing.godFeelsTitle}
                  </h2>
                  <div className="space-y-6 text-lg md:text-xl font-serif text-stone-300 leading-relaxed border-l-2 border-white/20 pl-6">
                     {t.landing.godFeelsText.map((text, i) => (
                        <p key={i}>{text}</p>
                     ))}
                     
                     {/* ADDED VERSE BOX */}
                     <div className="mt-8 bg-white/5 border-l-4 border-gold p-6 rounded-r-2xl backdrop-blur-sm animate-fade-in group">
                        <Sparkles size={16} className="text-gold mb-3 opacity-50 group-hover:opacity-100 transition-opacity" />
                        <p className="font-serif italic text-white text-xl leading-relaxed m-0">
                          {t.landing.godFeelsVerse}
                        </p>
                        <p className="mt-3 text-gold font-bold text-xs uppercase tracking-[0.2em] opacity-80">{t.landing.godFeelsRef}</p>
                     </div>
                  </div>
               </div>
            </div>

            {/* SLOGAN 2: SEPARATOR */}
            <div className="flex justify-center mb-24 relative z-10">
                <div className="px-8 py-4 rounded-xl bg-gradient-to-r from-gold/20 to-orange/20 border border-gold/30 backdrop-blur-sm shadow-lg transform -rotate-2 hover:rotate-0 transition-all duration-500">
                    <p className="font-serif font-bold text-xl text-ink dark:text-white flex items-center gap-3">
                        <Sparkles size={20} className="text-gold" /> {t.landing.sloganFaith} <Sparkles size={20} className="text-gold" />
                    </p>
                </div>
            </div>

            {/* NEW SECTION: OPEN LETTER */}
            <div className="max-w-2xl mx-auto mb-32 text-center md:text-left animate-fade-in">
                <div className="border-l-4 border-gold pl-6 py-3 mb-10 bg-stone-50 dark:bg-stone-900/50 rounded-r-xl inline-block shadow-sm">
                    <p className="font-bold text-ink dark:text-white text-xl md:text-2xl italic font-serif m-0">{t.landing.letterTitle}</p>
                </div>

                <div className="font-serif text-xl md:text-2xl text-stone-600 dark:text-stone-300 leading-relaxed space-y-10">
                    <p><span className="font-bold text-ink dark:text-white">{t.landing.letterP1}</span></p>

                    <p>{t.landing.letterP2}</p>

                    <p>{t.landing.letterP3}</p>

                    <p>{t.landing.letterP4}</p>

                    <p className="font-bold text-orange text-2xl">{t.landing.letterWorstFeeling}</p>

                    <p>{t.landing.letterAlone}</p>

                    <p>{t.landing.letterPain}</p>

                    <p>👉 {t.landing.letterNotWeakness}</p>

                    <p>{t.landing.letterFear}</p>

                    <p>{t.landing.letterFearList}</p>

                    <p className="text-center italic text-2xl md:text-3xl py-6 text-subtle">{t.landing.letterWhatIf}</p>

                    <p>{t.landing.letterSolitude}</p>

                    <p>{t.landing.letterTiredness}</p>

                    <p>{t.landing.letterCarryAlone}</p>

                    <p>{t.landing.letterDistance}</p>

                    {t.landing.letterLacks.map((item, i) => (
                        <p key={i}><span className="bg-stone-100 dark:bg-stone-800 px-1">{item}</span></p>
                    ))}

                    <p className="font-bold text-ink dark:text-white">{t.landing.letterWorldScreams}</p>

                    <p>{t.landing.letterSurvival}</p>

                    <p className="font-bold text-2xl">{t.landing.letterButIf}</p>

                    {t.landing.letterWhatIfList.map((item, i) => (
                        <p key={i}>👉 {item}</p>
                    ))}

                    <p><span className="font-black text-ink dark:text-white bg-gold/20 px-2 py-1 rounded">{t.landing.letterReason}</span></p>

                    <p>{t.landing.letterNotSubstitute}</p>

                    <p>{t.landing.letterWhere}</p>

                    <p className="font-bold text-ink dark:text-white">{t.landing.letterIncludes}</p>

                    <ul className="space-y-4 text-lg list-none p-0">
                      {t.landing.letterFeatures.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">{item}</li>
                      ))}
                    </ul>

                    <p className="font-bold">{t.landing.letterBonus}</p>

                    <p className="text-lg leading-relaxed">
                        {t.landing.letterBonusDesc}
                    </p>

                    <p>{t.landing.letterBibleOnly}</p>

                    <p className="text-center font-bold border-y border-stone-200 dark:border-stone-800 py-6">
                        {t.landing.letterJesus}
                    </p>

                    <p>Com o tempo, você vai perceber:</p>

                    <ul className="space-y-2 text-lg font-bold list-none p-0">
                      {t.landing.letterResults.map((item, i) => (
                          <li key={i} className="flex items-center gap-2"><CheckCircle2 size={18} className="text-green-500" /> {item}</li>
                      ))}
                    </ul>

                    <p><span className="bg-ink text-white dark:bg-white dark:text-ink px-4 py-2 rounded-full font-bold">{t.landing.letterAutoExit}</span></p>

                    <p>{t.landing.letterCall}</p>

                    {t.landing.letterAction.map((item, i) => (
                        <p key={i}>{item}</p>
                    ))}

                    <p>{t.landing.letterSpecial}</p>

                    <p>{t.landing.letterTruth}</p>

                    <p className="text-2xl font-bold">{t.landing.letterGodHere}</p>

                    <p className="text-3xl font-serif font-black pt-10">{t.landing.letterFinal}</p>
                </div>
            </div>

            {/* 1. THE PROBLEM (Text + Visual Split) */}
            <div className="grid md:grid-cols-2 gap-12 items-center mb-32 relative">
                
                {/* Visual Decoration Slogan */}
                <div className="hidden md:block absolute top-0 right-0 transform translate-x-10 -translate-y-10 z-20">
                    <div className="bg-white dark:bg-stone-800 p-4 rounded-lg shadow-xl border border-stone-100 dark:border-stone-700 rotate-6">
                        <p className="font-serif text-sm font-bold text-red-500">"O mundo grita..."</p>
                    </div>
                </div>

                <div className="space-y-8 order-2 md:order-1">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-100 dark:bg-red-900/20 text-red-600 rounded-full text-xs font-bold uppercase tracking-widest">
                        <AlertTriangle size={12} /> {t.landing.problemAlert}
                    </div>
                    <h2 className="font-serif font-bold text-4xl md:text-5xl text-ink dark:text-white leading-tight">
                        {t.landing.problemTitle}
                    </h2>
                    <div className="space-y-6 text-xl text-stone-600 dark:text-stone-300 font-serif leading-relaxed border-l-2 border-stone-200 dark:border-stone-800 pl-6">
                        {t.landing.problemDesc.map((item, i) => (
                            <p key={i}>{item}</p>
                        ))}
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
                                <p className="text-white font-bold uppercase tracking-widest text-sm">{t.landing.rekindle}</p>
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
                        <BookOpen size={12} /> {t.landing.solutionTag}
                    </div>
                    <h2 className="font-serif font-bold text-4xl md:text-5xl text-ink dark:text-white leading-tight">
                        {t.landing.solutionTitle}
                    </h2>
                    <div className="space-y-6 text-xl text-stone-600 dark:text-stone-300 font-serif leading-relaxed">
                        {t.landing.solutionDesc.map((item, i) => (
                            <p key={i}>{item}</p>
                        ))}
                    </div>
                </div>
            </div>

            {/* --- NEW SECTION: CASAMENTO (Updated Pattern) --- */}
            <div className="my-24 bg-gradient-to-br from-stone-50 to-orange-50 dark:from-stone-900 dark:to-stone-800 rounded-[3rem] p-8 md:p-12 relative overflow-hidden border border-stone-200 dark:border-stone-800">
               <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
                  <div className="space-y-8">
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-white dark:bg-white/10 text-orange rounded-full text-xs font-bold uppercase tracking-widest shadow-sm">
                          <HeartHandshake size={12} /> {t.landing.marriageTag}
                      </div>
                      <h3 className="font-serif font-bold text-3xl md:text-5xl text-ink dark:text-white leading-tight">
                          {t.landing.marriageTitle}
                      </h3>
                      <div className="font-serif text-lg md:text-xl text-stone-600 dark:text-stone-300 leading-loose space-y-6">
                          {t.landing.marriageDesc.map((item, i) => (
                              <p key={i}>{item}</p>
                          ))}
                          <p className="italic font-medium text-orange">{t.landing.marriageQuote}</p>
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
                    <p className="font-serif italic text-lg text-ink dark:text-white">{t.landing.sloganPrayer}</p>
                </div>
            </div>

            {/* --- SEÇÃO FAMÍLIA (Updated Pattern) --- */}
            <div className="my-24 bg-stone-50 dark:bg-stone-900/50 rounded-[3rem] p-8 md:p-12 border border-stone-200 dark:border-stone-800">
               <div className="grid md:grid-cols-2 gap-12 items-center">
                  {/* Visual Column */}
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
                          <Home size={12} /> {t.landing.familyTag}
                      </div>
                      <h3 className="font-serif font-bold text-3xl md:text-4xl text-ink dark:text-white leading-tight">
                          {t.landing.familyTitle}
                      </h3>
                      <div className="font-serif text-lg md:text-xl text-stone-600 dark:text-stone-300 leading-loose space-y-6">
                          {t.landing.familyDesc.map((item, i) => (
                              <p key={i}>{item}</p>
                          ))}
                          <p className="bg-indigo-50 dark:bg-indigo-900/10 p-4 rounded-2xl border-l-4 border-indigo-500 font-bold text-indigo-800 dark:text-indigo-200">
                              {t.landing.familyCall}
                          </p>
                      </div>
                  </div>
               </div>
            </div>

            {/* --- SEÇÃO VISUAL NOVA 1: ATMOSFERA DE ADORAÇÃO (NEW COPY) --- */}
            <div className="my-24 bg-stone-900 dark:bg-black rounded-[3rem] p-8 md:p-12 relative overflow-hidden text-white shadow-2xl">
                
                {/* SLOGAN 4: INSIDE WORSHIP */}
                <div className="absolute top-6 right-6 md:top-10 md:right-10 z-20 animate-float">
                    <div className="bg-white/10 backdrop-blur-md px-6 py-2 rounded-full border border-white/20">
                        <p className="font-bold text-sm text-gold tracking-wider uppercase flex items-center gap-2">
                            <Music size={14} /> {t.landing.worshipSlogan}
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
                            <Music size={14} /> {t.landing.worshipTag}
                        </div>
                        <h3 className="font-serif font-bold text-3xl md:text-5xl leading-tight">
                            {t.landing.worshipTitle}
                        </h3>
                        <div className="space-y-4">
                            <p className="text-white text-xl leading-relaxed font-bold">
                                {t.landing.worshipDesc}
                            </p>
                            <p className="text-stone-300 text-lg leading-relaxed max-w-md">
                                {t.landing.worshipSub}
                            </p>
                        </div>
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
                        {t.landing.routineTitle}
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
                                    {t.landing.routineMorning}
                                </h4>
                                <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed font-serif">
                                    {t.landing.routineMorningDesc}
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
                                    {t.landing.routineAfternoon}
                                </h4>
                                <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed font-serif">
                                    {t.landing.routineAfternoonDesc}
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
                                    {t.landing.routineNight}
                                </h4>
                                <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed font-serif">
                                    {t.landing.routineNightDesc}
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
                        {t.landing.journeysTitle}
                    </h3>
                    <p className="text-subtle max-w-lg mx-auto">
                        {t.landing.journeysDesc}
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
                            <h4 className="font-bold text-2xl mb-2">{t.landing.journeyAnxiety}</h4>
                            <p className="text-stone-300 text-sm leading-relaxed">{t.landing.journeyAnxietyDesc}</p>
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
                            <h4 className="font-bold text-2xl mb-2">{t.landing.journeyWisdom}</h4>
                            <p className="text-stone-300 text-sm leading-relaxed">{t.landing.journeyWisdomDesc}</p>
                        </div>
                    </div>

                    {/* Card 2: Gratidão */}
                    <div className="h-80 rounded-[2.5rem] relative overflow-hidden group cursor-default md:col-span-1">
                        <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Sunrise" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                        <div className="absolute bottom-0 p-8 text-white">
                            <div className="mb-3 w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center">
                                <Heart size={20} fill="currentColor" />
                            </div>
                            <h4 className="font-bold text-2xl mb-2">{t.landing.journeyGratitude}</h4>
                            <p className="text-stone-300 text-sm leading-relaxed">{t.landing.journeyGratitudeDesc}</p>
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
                            <h3 className="font-serif font-bold text-2xl text-ink dark:text-white mb-4">{t.landing.differentialTitle}</h3>
                            
                            <p className="text-lg md:text-xl leading-relaxed font-medium text-stone-600 dark:text-stone-300">
                                {t.landing.differentialDesc}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Investment/Value */}
                <div className="mt-16 mb-8 text-center bg-stone-50 dark:bg-stone-900 p-8 rounded-3xl border border-stone-200 dark:border-stone-800">
                     <h3 className="font-serif font-bold text-2xl mb-6 text-ink dark:text-white">{t.landing.investmentTitle}</h3>
                     <div className="space-y-4 text-lg text-stone-600 dark:text-stone-300 leading-relaxed">
                        {t.landing.investmentDesc.map((item, i) => (
                            <p key={i}>{item}</p>
                        ))}
                     </div>
                </div>

                <p className="text-2xl font-serif font-bold text-center mt-12 mb-12 text-ink dark:text-white">
                    {t.landing.letterFinal}
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
                            {t.landing.testimonialQuote}
                        </p>
                        <div>
                            <p className="font-bold text-lg text-ink dark:text-white">{t.landing.testimonialAuthor}</p>
                            <p className="text-sm text-subtle">{t.landing.testimonialInfo}</p>
                        </div>
                    </div>
                </div>
            </div>

         </div>
      </section>

      {/* PRICING SECTION - The Offer */}
      <section id="pricing" className="py-24 px-6 relative bg-gradient-to-b from-white to-stone-50 dark:from-stone-950 dark:to-black">
         
         {/* --- MULTI-DEVICE MOCKUP SECTION (Fiel à Interface do App) --- */}
         <div className="max-w-6xl mx-auto mb-32 relative">
             <div className="text-center mb-24 px-6">
                <div className="inline-flex items-center gap-2 text-gold font-bold text-xs uppercase tracking-widest mb-4">
                    <Smartphone size={16} /> <Tablet size={16} /> <Monitor size={16} /> {t.landing.devicesTag}
                </div>
                <h3 className="text-3xl md:text-6xl font-serif font-black text-ink dark:text-white mb-6 leading-tight">
                    {t.landing.devicesTitle}
                </h3>
                <p className="text-subtle text-lg max-w-2xl mx-auto">
                    {t.landing.devicesDesc}
                </p>
             </div>

             <div className="relative h-[500px] md:h-[750px] w-full flex items-center justify-center">
                 
                 {/* 1. MOCKUP PC (MELHORADO) - BÍBLIA ABERTA NO DESKTOP */}
                 <div className="absolute w-[90%] md:w-[70%] aspect-video bg-[#0f172a] rounded-[2rem] shadow-[0_60px_120px_-30px_rgba(0,0,0,0.8)] border-[12px] border-[#1e293b] overflow-hidden transform -translate-y-24 z-0 scale-90 md:scale-100 group">
                    {/* Top Browser Bar */}
                    <div className="h-10 bg-[#1e293b] border-b border-white/5 flex items-center px-4 gap-2">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                            <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                        </div>
                        <div className="mx-auto bg-black/30 rounded-md px-6 py-1 text-[10px] text-stone-400 font-medium">app.shalom.com/bible/genesis-1</div>
                    </div>
                    
                    <div className="flex h-full w-full bg-[#fafaf9] dark:bg-[#0c0a09] font-sans">
                        {/* Realistic Sidebar */}
                        <div className="w-64 bg-white dark:bg-[#1c1917] border-r border-stone-200 dark:border-stone-800 flex flex-col py-6">
                             <div className="px-6 mb-10 flex items-center gap-2">
                                <ShalomLogo size="w-8 h-8" />
                                <span className="font-serif font-black text-lg dark:text-white tracking-tighter">{t.common.appName}</span>
                             </div>
                             
                             <div className="px-3 space-y-1">
                                <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-stone-400 font-medium text-sm"><Home size={18} /> {t.nav.home}</div>
                                <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-ink dark:bg-white text-white dark:text-ink font-bold text-sm shadow-lg"><BookOpen size={18} /> {t.nav.bible}</div>
                                <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-stone-400 font-medium text-sm"><Music size={18} /> {t.nav.worship}</div>
                                <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-stone-400 font-medium text-sm"><Zap size={18} /> {t.nav.journey}</div>
                             </div>

                             <div className="mt-auto px-6">
                                <div className="p-4 bg-gold/10 rounded-2xl border border-gold/20">
                                    <p className="text-[10px] font-black text-gold uppercase mb-1">Seu Progresso</p>
                                    <div className="w-full h-1.5 bg-gold/20 rounded-full overflow-hidden mb-2">
                                        <div className="w-1/3 h-full bg-gold"></div>
                                    </div>
                                    <p className="text-[10px] text-stone-500 font-bold">15/50 Capítulos</p>
                                </div>
                             </div>
                        </div>

                        {/* Content Area */}
                        <div className="flex-1 flex flex-col overflow-hidden bg-[#fafaf9] dark:bg-[#0c0a09]">
                            {/* Top Internal Navigation */}
                            <div className="px-8 py-4 border-b border-stone-100 dark:border-stone-800 flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                    <h4 className="font-serif font-black text-2xl dark:text-white">Gênesis <span className="text-orange">1</span></h4>
                                    <div className="bg-stone-100 dark:bg-stone-800 p-1.5 rounded-lg flex gap-1">
                                        <div className="w-4 h-4 bg-stone-300 rounded-sm"></div>
                                        <div className="w-4 h-4 bg-stone-300 rounded-sm"></div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-400"><Search size={14} /></div>
                                    <div className="w-20 h-8 rounded-full bg-ink dark:bg-white text-white dark:text-ink text-[10px] font-bold flex items-center justify-center shadow-md">LIDO</div>
                                </div>
                            </div>
                            
                            {/* Bible Reader Text */}
                            <div className="flex-1 p-12 overflow-hidden relative">
                                <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-stone-200/20 to-transparent"></div>
                                <div className="space-y-6 max-w-2xl mx-auto opacity-80">
                                    <div className="flex gap-4">
                                        <span className="text-orange font-black text-xs shrink-0 mt-1">1</span>
                                        <p className="text-lg font-serif dark:text-stone-300 leading-relaxed">No princípio criou Deus o céu e a terra.</p>
                                    </div>
                                    <div className="flex gap-4 bg-gold/10 border-l-4 border-gold p-4 rounded-r-xl">
                                        <span className="text-orange font-black text-xs shrink-0 mt-1">2</span>
                                        <p className="text-lg font-serif dark:text-stone-300 leading-relaxed">E a terra era sem forma e vazia; e havia trevas sobre a face do abismo; e o <span className="font-bold underline decoration-gold">Espírito de Deus</span> se movia sobre a face das águas.</p>
                                    </div>
                                    <div className="flex gap-4">
                                        <span className="text-orange font-black text-xs shrink-0 mt-1">3</span>
                                        <p className="text-lg font-serif dark:text-stone-300 leading-relaxed">E disse Deus: Haja luz; e houve luz.</p>
                                    </div>
                                    <div className="h-4 bg-stone-100 dark:bg-stone-800 rounded-full w-full opacity-50"></div>
                                    <div className="h-4 bg-stone-100 dark:bg-stone-800 rounded-full w-5/6 opacity-50"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                 </div>

                 {/* 2. MOCKUP TABLET (Remains Realistic) */}
                 <div className="absolute left-[2%] md:left-[10%] w-[50%] md:w-[38%] aspect-[3/4] bg-stone-900 rounded-[3rem] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.7)] border-[14px] border-stone-950 overflow-hidden transform translate-y-24 -rotate-6 z-10 hover:rotate-0 transition-all duration-700 hidden md:block">
                    <div className="h-full w-full bg-stone-900 p-8 flex flex-col">
                        <div className="flex items-center gap-2 mb-8">
                            <div className="w-8 h-8 bg-gold rounded-xl flex items-center justify-center text-ink"><Music size={16} /></div>
                            <h4 className="text-white font-serif font-bold text-lg">{t.nav.worship}</h4>
                        </div>
                        <div className="relative aspect-square bg-stone-800 rounded-3xl mb-8 flex items-center justify-center overflow-hidden shadow-2xl group">
                            <img src="https://images.unsplash.com/photo-1483043012503-8a8849b4c949?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="absolute inset-0 w-full h-full object-cover opacity-40" />
                            <div className="w-20 h-20 bg-gold rounded-full flex items-center justify-center text-ink shadow-2xl animate-pulse"><Play size={32} fill="currentColor" /></div>
                        </div>
                        <div className="space-y-4">
                            <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full bg-gold w-1/3"></div>
                            </div>
                            <div className="flex justify-between text-[10px] text-stone-400 font-mono"><span>1:24</span><span>4:15</span></div>
                            <h5 className="text-white font-bold text-xl truncate">Milagres do Caminho</h5>
                            <p className="text-gold text-xs font-bold uppercase tracking-widest">Soraya Moraes</p>
                        </div>
                    </div>
                 </div>

                 {/* 3. MOCKUP SMARTPHONE (DESTAQUE) */}
                 <div className="absolute right-[5%] md:right-[18%] w-[85%] md:w-[22%] aspect-[9/19.5] bg-stone-950 rounded-[3.5rem] shadow-[0_60px_120px_-20px_rgba(0,0,0,0.8)] border-[10px] border-stone-900 overflow-hidden z-20 transform translate-y-40 md:rotate-3 hover:rotate-0 transition-all duration-700">
                    <div className="h-full w-full bg-paper dark:bg-stone-950 flex flex-col p-6 overflow-hidden">
                        <div className="h-6 w-1/3 bg-stone-900 absolute top-0 left-1/2 -translate-x-1/2 rounded-b-2xl"></div>
                        
                        <div className="mt-4 flex justify-between items-center mb-6">
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black text-gold uppercase tracking-tighter">{t.home.greetingMorning},</span>
                                <span className="text-sm font-serif font-black text-ink dark:text-white">Viajante</span>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-orange/10 flex items-center justify-center text-orange"><Flame size={16} /></div>
                        </div>

                        <div className="w-full aspect-[4/5] bg-ink rounded-[2rem] p-5 relative overflow-hidden flex flex-col justify-center text-center shadow-lg mb-6">
                            <img src="https://images.unsplash.com/photo-1458093257227-0f30303eb1f0?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="absolute inset-0 w-full h-full object-cover opacity-50" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                            <div className="relative z-10">
                                <Sparkles className="text-gold mx-auto mb-3" size={16} />
                                <p className="text-white font-serif italic text-xs leading-relaxed">"O Senhor é o meu pastor, nada me faltará."</p>
                                <p className="text-gold font-bold text-[8px] mt-2 tracking-widest uppercase">Salmos 23:1</p>
                            </div>
                        </div>

                        <p className="text-[10px] font-bold text-subtle uppercase tracking-widest mb-3">{t.home.moodTitle}</p>
                        <div className="flex gap-2">
                             <div className="w-12 h-16 bg-stone-100 dark:bg-stone-900 rounded-2xl flex flex-col items-center justify-center gap-1 border-2 border-gold shadow-sm">
                                <div className="p-1 bg-gold rounded-full text-ink"><Zap size={10} /></div>
                                <span className="text-[8px] font-bold text-gold">{t.moods.Anxious}</span>
                             </div>
                             <div className="w-12 h-16 bg-stone-100 dark:bg-stone-900 rounded-2xl flex flex-col items-center justify-center gap-1 opacity-40">
                                <div className="p-1 bg-stone-700 rounded-full text-white"><Sun size={10} /></div>
                                <span className="text-[8px] font-bold text-stone-500">{t.moods.Happy}</span>
                             </div>
                             <div className="w-12 h-16 bg-stone-100 dark:bg-stone-900 rounded-2xl flex flex-col items-center justify-center gap-1 opacity-40">
                                <div className="p-1 bg-stone-700 rounded-full text-white"><Battery size={10} /></div>
                                <span className="text-[8px] font-bold text-stone-500">{t.moods.Tired}</span>
                             </div>
                        </div>

                        <div className="mt-auto -mx-6 h-14 bg-white dark:bg-stone-900 border-t border-stone-100 dark:border-stone-800 flex justify-around items-center px-4">
                             <div className="text-gold"><Home size={18} /></div>
                             <div className="text-stone-300"><BookOpen size={18} /></div>
                             <div className="text-stone-300"><Music size={18} /></div>
                             <div className="text-stone-300"><Zap size={18} /></div>
                        </div>
                    </div>
                 </div>

             </div>
         </div>

         <div className="max-w-3xl mx-auto relative z-10">
            {/* Headlines */}
            <div className="text-center mb-10">
                <h2 className="text-3xl md:text-5xl font-serif font-black mb-4 text-ink dark:text-white leading-tight">
                    {t.landing.pricingHeadline}
                </h2>
                <p className="text-lg text-subtle font-medium max-w-xl mx-auto">
                    {t.landing.pricingSub}
                </p>
            </div>

            {/* Main Card */}
            <div className="bg-surface dark:bg-stone-900 rounded-[2.5rem] shadow-2xl border border-stone-100 dark:border-stone-800 overflow-hidden relative">
                
                <div className="p-6 md:p-10">
                    
                    {/* Header Badge & Title */}
                    <div className="text-center mb-10">
                        <div className="inline-block bg-orange text-white text-[10px] md:text-xs font-bold px-6 py-2 rounded-full uppercase tracking-widest mb-6 shadow-lg shadow-orange/30">
                            <Gift size={14} className="inline mr-1 mb-0.5" /> {t.landing.offerTag}
                        </div>
                        <h3 className="text-2xl md:text-3xl font-serif font-bold text-ink dark:text-white">
                            {t.landing.packageTitle}
                        </h3>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
                       {t.landing.features.map((feat, i) => {
                           const Icon = [MessageCircle, Music, Baby, Sparkles][i];
                           return (
                               <div key={i} className="bg-stone-50 dark:bg-stone-800/50 p-3 rounded-xl flex flex-col items-center text-center gap-2 border border-stone-100 dark:border-stone-800">
                                   <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center">
                                       <Icon size={16} />
                                   </div>
                                   <span className="text-xs font-bold text-subtle leading-tight">{feat.label}</span>
                               </div>
                           )
                       })}
                    </div>

                    <p className="text-center text-xs font-bold text-subtle uppercase tracking-widest mb-4">{t.landing.selectPlan}</p>

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
                                    <h5 className="font-bold text-ink dark:text-white">{t.landing.monthly}</h5>
                                    <p className="text-xs text-subtle">{t.landing.monthlyFlex}</p>
                                </div>
                            </div>
                            <span className="font-bold text-ink dark:text-white">{t.landing.monthlyPrice} <span className="text-xs font-normal text-subtle">{t.landing.monthlySub}</span></span>
                        </div>

                        {/* Yearly Option (Highlighted) */}
                        <div 
                            onClick={() => setSelectedPlan('yearly')}
                            className={`relative cursor-pointer rounded-3xl p-6 border-2 transition-all flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl ${selectedPlan === 'yearly' ? 'border-gold bg-white dark:bg-stone-800 ring-4 ring-gold/10' : 'border-stone-200 opacity-60'}`}
                        >
                             {/* Badge */}
                             <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-green-100 text-green-700 text-sm font-black px-8 py-2.5 rounded-full uppercase tracking-widest border-2 border-green-200 shadow-md">
                                {t.landing.yearlySave}
                             </div>

                             <div className="flex items-center gap-4 w-full md:w-auto">
                                <div className="w-6 h-6 rounded-full bg-gold flex items-center justify-center text-white shrink-0">
                                    <Check size={14} strokeWidth={4} />
                                </div>
                                <div className="text-left">
                                    <h5 className="font-bold text-xl text-ink dark:text-white">{t.landing.yearly}</h5>
                                    <p className="text-xs text-red-400 line-through">{t.landing.yearlyOriginal}</p>
                                    <p className="text-sm font-bold text-green-600 dark:text-green-400">{t.landing.yearlyOnly}</p>
                                </div>
                             </div>

                             <div className="text-center md:text-right">
                                 <span className="block text-4xl font-black text-ink dark:text-white tracking-tighter">{t.landing.yearlyPrice}</span>
                                 <span className="text-[10px] font-bold text-subtle uppercase tracking-wider block">{t.landing.yearlyPayment}</span>
                             </div>

                             {/* Float Badge */}
                             <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-stone-900 text-white text-[10px] font-bold px-4 py-1.5 rounded-full shadow-lg flex items-center gap-1 whitespace-nowrap border border-white/10">
                                <TrendingUp size={10} className="text-green-400" /> {t.landing.pizza}
                             </div>
                        </div>
                    </div>

                    {/* Yellow Warning Box */}
                    <div className="mt-10 mb-8 bg-yellow-50 dark:bg-yellow-900/10 border-2 border-yellow-200 dark:border-yellow-800/30 border-dashed rounded-2xl p-6 text-center">
                        <div className="flex items-center justify-center gap-2 mb-2 text-yellow-700 dark:text-yellow-500 font-bold text-sm uppercase tracking-widest">
                            <AlertCircle size={16} /> {t.landing.warningTitle}
                        </div>
                        <p className="text-sm text-yellow-800 dark:text-yellow-200/80 leading-relaxed font-medium">
                            {t.landing.warningText}
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
                        <span className="flex items-center gap-2">{t.landing.ctaAccess} <ChevronRight strokeWidth={4} size={20} /></span>
                        <span className="text-[10px] font-medium opacity-90 tracking-widest uppercase">{t.landing.ctaAccessSub}</span>
                    </button>
                    
                </div>
            </div>
            
            {/* Guarantee and FAQ */}
            <div className="mt-16 max-w-2xl mx-auto text-center bg-stone-100 dark:bg-stone-900 p-8 rounded-3xl border border-stone-200 dark:border-stone-800">
                <div className="w-16 h-16 bg-white dark:bg-stone-800 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md text-gold">
                    <ShieldCheck size={32} />
                </div>
                <h3 className="text-xl font-bold text-ink dark:text-white mb-2">{t.landing.guaranteeTitle}</h3>
                <p className="text-subtle text-sm">
                    {t.landing.guaranteeDesc}
                </p>
            </div>

            {/* FAQ */}
            <div className="mt-16 max-w-2xl mx-auto">
                <h3 className="text-lg font-bold text-center text-subtle uppercase tracking-widest mb-6">{t.landing.faqTitle}</h3>
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
          <p>{t.landing.copyright}</p>
          
          {/* Secret Button to Quiz */}
          <button 
            onClick={() => navigate('/quiz')}
            className="opacity-5 hover:opacity-100 transition-opacity duration-300 text-[10px] uppercase tracking-widest mt-4 p-2"
          >
            {t.landing.secretQuiz}
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
                {t.landing.loginTitle}
              </h3>
              <p className="text-subtle text-sm mb-8 leading-relaxed max-w-xs">
                {t.landing.loginDesc}
              </p>

              <form onSubmit={handleSaveEmail} className="w-full space-y-4">
                <div className="relative group">
                   <div className="absolute inset-0 bg-gradient-to-r from-gold to-orange rounded-2xl opacity-0 group-focus-within:opacity-100 blur transition-opacity duration-300 -z-10"></div>
                   <input
                    type="email"
                    placeholder={t.landing.emailPlaceholder}
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
                    <>{t.landing.login} <ArrowRight size={20} /></>
                  )}
                </button>
              </form>

              <p className="mt-6 text-[10px] text-stone-400 uppercase tracking-widest flex items-center gap-1 justify-center">
                <Lock size={10} /> {t.landing.secureEnvironment}
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
>>>>>>> a1c76c45b8057bdb889cea829282a0d7039dfa9e
};

export default Landing;
