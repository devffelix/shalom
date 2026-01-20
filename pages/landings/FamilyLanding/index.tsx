import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Users, Baby, ChevronRight, ChevronDown, Plus, Minus, MessageCircle, Star, Music, Sparkles, Zap, Shield, ShieldCheck, BookOpen, Palette, Check, Bot, Search, Sun, HeartHandshake, BookHeart, Target, Music2, Map, Clapperboard, Library, Key, ArrowDown, CreditCard } from 'lucide-react';
import { FAMILY_LANDING_CONTENT } from './data';

const FamilyLanding: React.FC = () => {
    const navigate = useNavigate();
    const { hero, benefits, urgencyBlock, bonusesBlock, pricingBlock, faqBlock } = FAMILY_LANDING_CONTENT;
    const [openFaqIndex, setOpenFaqIndex] = React.useState<number | null>(null);

    React.useEffect(() => {
        // Meta Pixel Code
        const initPixel = () => {
            if ((window as any).fbq) return;

            let n: any;
            const w: any = window;

            if (w.fbq) return;

            n = w.fbq = function () {
                n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
            };

            if (!w._fbq) w._fbq = n;
            n.push = n;
            n.loaded = true;
            n.version = '2.0';
            n.queue = [];

            const t = document.createElement('script');
            t.async = true;
            t.src = 'https://connect.facebook.net/en_US/fbevents.js';

            const s = document.getElementsByTagName('script')[0];
            if (s && s.parentNode) {
                s.parentNode.insertBefore(t, s);
            }
        };

        initPixel();
        (window as any).fbq('init', '1447330990360231');
        (window as any).fbq('track', 'PageView');
    }, []);

    const scrollToPricing = () => {
        const pricingSection = document.getElementById('pricing');
        if (pricingSection) {
            pricingSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-black font-sans selection:bg-orange-500/30 overflow-x-hidden">


            {/* Hero Section */}
            <section className="pt-32 pb-20 px-4 bg-white dark:bg-black overflow-hidden relative">
                {/* Decorative background animations */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-100/40 via-transparent to-transparent opacity-60 dark:opacity-20 pointer-events-none animate-pulse duration-[5000ms]"></div>

                {/* Floating Icons Animation */}
                <div className="absolute top-20 left-[10%] opacity-20 animate-bounce duration-[3000ms]">
                    <Music className="w-12 h-12 text-orange-400" />
                </div>
                <div className="absolute top-32 right-[15%] opacity-20 animate-bounce duration-[4000ms] delay-700">
                    <Star className="w-8 h-8 text-yellow-500" />
                </div>
                <div className="absolute bottom-40 left-[20%] opacity-15 animate-ping duration-[3000ms]">
                    <Sparkles className="w-6 h-6 text-orange-600" />
                </div>

                <div className="max-w-5xl mx-auto text-center flex flex-col items-center relative z-10">

                    {/* 1. Headline */}
                    <h1 className="text-4xl md:text-6xl font-black text-black dark:text-white mb-8 leading-[1.1] tracking-tight max-w-4xl animate-fade-in-up">
                        Transforme o <span className="relative inline-block text-blue-600">
                            Vício em Telas
                        </span> em Momentos de <span className="text-pink-500">Fé</span> e <span className="text-green-500">Criatividade</span> com o <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-3 py-1 rounded-xl transform -rotate-1 inline-block shadow-lg hover:rotate-1 transition-transform cursor-default border-b-4 border-orange-600">Maior Acervo Cristão</span> do Brasil.
                    </h1>

                    {/* 2. Image (Center) - Blended with User Image */}
                    <div className="w-full max-w-5xl mb-8 relative group">
                        {/* Gradient Mask for Seamless White Blend */}
                        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white via-white/80 to-transparent z-20 pointer-events-none dark:from-black dark:via-black/80"></div>
                        <div className="absolute -inset-4 bg-orange-500/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>

                        <img
                            src={hero.image}
                            alt="Acervo Cristão Shalom Kids"
                            className="relative w-full h-auto block mx-auto object-contain z-10 animate-float-slow"
                            style={{
                                maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
                                WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)'
                            }}
                        />
                    </div>

                    {/* 3. Subheadline */}
                    <div className="text-lg md:text-2xl text-zinc-600 dark:text-zinc-400 mb-12 max-w-4xl mx-auto leading-relaxed font-medium text-center relative z-30">
                        <span className="font-bold text-white bg-black px-4 py-1.5 rounded-lg shadow-lg inline-block transform -rotate-2 hover:rotate-0 transition-transform mb-2 md:mb-0 mr-2 text-base md:text-lg border-2 border-orange-500/20">CHEGA DE MEDO</span> de conteúdos duvidosos. O App Shalom une o digital e o real para edificar seu filho: Acesso Liberado imediatamente a <span className="font-bold text-black dark:text-white decoration-yellow-400 decoration-wavy decoration-2 underline underline-offset-4">+125 moldes</span> de brinquedos, <span className="font-bold text-black dark:text-white decoration-yellow-400 decoration-wavy decoration-2 underline underline-offset-4">+150 desenhos</span>, e <span className="font-bold text-black dark:text-white decoration-yellow-400 decoration-wavy decoration-2 underline underline-offset-4">+37 histórias bíblicas</span>!
                    </div>

                    {/* 4. CTA Button - ENHANCED VISIBILITY & ANIMATION */}
                    <div className="w-full flex flex-col items-center pb-8 gap-6 relative z-30">
                        <button
                            onClick={scrollToPricing}
                            style={{ backgroundColor: '#22C55E', color: '#ffffff', boxShadow: '0 8px 0 #15803d' }}
                            className="relative w-full md:w-auto px-12 py-6 rounded-2xl font-black text-2xl md:text-4xl transition-all hover:translate-y-1 active:translate-y-2 uppercase tracking-wide group overflow-hidden"
                        >
                            <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                            <span className="relative z-10">
                                {hero.cta}
                            </span>
                        </button>
                    </div>

                </div>
            </section>

            {/* Block 02: Demonstrative Carousel (Multi-Card Coverflow) */}
            <section className="py-20 bg-white dark:bg-black overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-50/50 to-transparent pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
                    <h2 className="text-3xl md:text-5xl font-black text-black dark:text-white mb-8 max-w-4xl mx-auto leading-tight">
                        {FAMILY_LANDING_CONTENT.carousel.title}
                    </h2>

                    {/* Carousel Container - Multi-Card 3D Effect */}
                    <div className="relative w-full max-w-6xl mx-auto mb-16 perspective-1000 min-h-[400px] md:min-h-[500px]">
                        {/* Decorative background glow */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none"></div>

                        <Carousel images={FAMILY_LANDING_CONTENT.carousel.images} />
                    </div>

                    {/* Rich Text Description with Highlights */}
                    <p className="text-lg md:text-2xl text-zinc-600 dark:text-zinc-300 max-w-5xl mx-auto leading-relaxed font-medium">
                        O único aplicativo com <span className="font-bold text-blue-600">+125 Moldes de Brinquedos 3D</span> e <span className="font-bold text-pink-500">+75 Desenhos</span> para imprimir, <span className="font-bold text-green-600">+37 Vídeos Animados de Histórias Bíblicas</span>, <span className="font-bold text-red-500">+12 Jogos bíblicos</span>, <span className="font-bold text-purple-600">+32 atividades bíblicas lúdicas</span> e <span className="font-bold text-blue-500">+17 louvores infantis</span>. Seu filho brinca de criar, recortar, pintar, cantar e se diverte.
                    </p>
                </div>
            </section>

            {/* Block 03: Benefits Grid (Colorful 3D) */}
            <section className="py-20 bg-white dark:bg-zinc-950 relative overflow-hidden">
                {/* Fun Background Pattern - Increased Opacity for Visibility */}
                <div className="absolute inset-0 opacity-25 pointer-events-none"
                    style={{
                        backgroundImage: 'radial-gradient(circle, #F97316 2px, transparent 2px), radial-gradient(circle, #3B82F6 2px, transparent 2px)',
                        backgroundSize: '40px 40px',
                        backgroundPosition: '0 0, 20px 20px'
                    }}>
                </div>

                <div className="max-w-6xl mx-auto px-4 relative z-10">

                    {/* Header */}
                    <div className="text-center mb-16 px-4">
                        <div className="inline-block mb-4 px-6 py-2 rounded-full bg-yellow-100 text-yellow-700 font-black text-sm tracking-widest uppercase shadow-sm transform -rotate-2">
                            Para Pais e Filhos
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black text-zinc-900 dark:text-white leading-tight max-w-4xl mx-auto drop-shadow-sm">
                            {FAMILY_LANDING_CONTENT.benefitsBlock.title}
                        </h2>
                    </div>

                    {/* 3D Grid - Colorful Cards with High Contrast */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mb-16">
                        {FAMILY_LANDING_CONTENT.benefitsBlock.items.map((item, index) => {
                            // High Contrast Colors: bg-100, border-300/400
                            const colors = [
                                { bg: 'bg-blue-100', border: 'border-blue-400', text: 'text-blue-900', shadow: '#3B82F6' },
                                { bg: 'bg-pink-100', border: 'border-pink-400', text: 'text-pink-900', shadow: '#EC4899' },
                                { bg: 'bg-yellow-100', border: 'border-yellow-400', text: 'text-yellow-900', shadow: '#EAB308' },
                                { bg: 'bg-green-100', border: 'border-green-400', text: 'text-green-900', shadow: '#22C55E' },
                                { bg: 'bg-purple-100', border: 'border-purple-400', text: 'text-purple-900', shadow: '#A855F7' },
                            ];
                            const style = colors[index % colors.length];

                            return (
                                <div
                                    key={index}
                                    className={`group relative ${style.bg} border-[3px] ${style.border} rounded-[2rem] p-8 flex flex-col items-center text-center gap-6 transition-all duration-200 hover:-translate-y-2 active:translate-y-1 active:shadow-none cursor-default select-none h-full`}
                                    style={{
                                        boxShadow: `0 8px 0 0 ${style.shadow}`,
                                        marginBottom: '8px'
                                    }}
                                >
                                    <div className="w-24 h-24 rounded-full bg-white border-2 border-white/50 flex items-center justify-center text-6xl shadow-sm group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
                                        {item.icon}
                                    </div>
                                    <span className={`text-xl font-black ${style.text} leading-tight`}>
                                        {item.text}
                                    </span>
                                </div>
                            );
                        })}
                    </div>

                    {/* Footer Callout - Solid Purple High Contrast */}
                    <div className="max-w-4xl mx-auto bg-purple-600 text-white rounded-3xl shadow-2xl p-8 md:p-12 transform hover:scale-[1.02] transition-transform duration-300 relative overflow-hidden text-center border-b-8 border-purple-800">
                        {/* Shine effect */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-400/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

                        <p className="text-xl md:text-3xl font-black leading-relaxed relative z-10 drop-shadow-md">
                            <span className="opacity-90">{FAMILY_LANDING_CONTENT.benefitsBlock.footer.prefix}</span> <br className="hidden md:block" />
                            <span className="text-yellow-300 font-black underline decoration-wavy decoration-white/30 underline-offset-8 mt-2 inline-block">
                                {FAMILY_LANDING_CONTENT.benefitsBlock.footer.highlight}
                            </span>
                        </p>
                    </div>

                </div>
            </section>

            {/* Block 04: Urgency & Guarantee (Solid Black High Contrast) - MOVED HERE */}
            <section className="py-24 relative overflow-hidden bg-black">
                {/* Subtle Grid Pattern for texture */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>

                <div className="max-w-4xl mx-auto px-4 relative z-10 text-center text-white">
                    <div className="inline-block mb-6 px-6 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 text-white font-black text-sm tracking-widest uppercase shadow-lg animate-bounce">
                        Oferta por Tempo Limitado
                    </div>

                    <h2 className="text-3xl md:text-5xl font-black mb-10 leading-tight drop-shadow-lg">
                        Ainda hoje você <span className="text-yellow-400 decoration-wavy decoration-white underline underline-offset-8 mx-1">libera imediatamente</span> o acesso total a <span className="text-cyan-400 tracking-tighter">+300 conteúdos cristãos</span> e garante a <span className="text-green-400">tranquilidade</span> de saber que seu filho está aprendendo sobre <span className="text-orange-400">Jesus</span> em um ambiente <span className="text-green-400 border-b-4 border-green-500/50">100% seguro</span>.
                    </h2>

                    <div className="flex flex-col items-center gap-4">
                        <button
                            onClick={scrollToPricing}
                            className="group relative px-8 py-6 bg-white text-black rounded-full font-black text-2xl md:text-4xl shadow-[0_10px_20px_rgba(255,255,255,0.2)] hover:shadow-[0_20px_40px_rgba(255,255,255,0.4)] hover:-translate-y-1 active:translate-y-1 transition-all duration-300 overflow-hidden"
                        >
                            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-100 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
                            <span className="relative flex items-center gap-3">
                                <Zap className="w-8 h-8 md:w-10 md:h-10 fill-current animate-pulse text-yellow-500" />
                                {urgencyBlock?.cta || "QUERO ACESSO IMEDIATO AGORA"}
                            </span>
                        </button>

                        <p className="text-white/40 font-medium text-sm md:text-base flex items-center gap-2">
                            <Shield className="w-4 h-4 text-green-500/50" />
                            {urgencyBlock?.subtext || "Acesso liberado instantaneamente via e-mail"}
                        </p>
                    </div>
                </div>
            </section>

            {/* Block 05: Segmentation (Ideal For You) */}
            <section className="py-20 px-4 bg-white dark:bg-zinc-950/50">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-white uppercase tracking-widest leading-loose border-b-4 border-orange-500 inline-block pb-2">
                            {FAMILY_LANDING_CONTENT.segmentationBlock.title}
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {FAMILY_LANDING_CONTENT.segmentationBlock.items.map((item, index) => {
                            // Maximalist Color Styles
                            const colorStyles = {
                                blue: {
                                    gradient: 'from-blue-600 to-indigo-700',
                                    shadow: 'shadow-blue-500/50',
                                    iconColor: 'text-blue-600',
                                    accent: 'bg-blue-400/20'
                                },
                                yellow: {
                                    gradient: 'from-yellow-400 to-orange-500',
                                    shadow: 'shadow-yellow-500/50',
                                    iconColor: 'text-yellow-600',
                                    accent: 'bg-yellow-200/40'
                                },
                                pink: {
                                    gradient: 'from-pink-500 to-rose-600',
                                    shadow: 'shadow-pink-500/50',
                                    iconColor: 'text-pink-600',
                                    accent: 'bg-pink-300/20'
                                }
                            }[item.color as 'blue' | 'yellow' | 'pink'];

                            const Icon = {
                                ShieldCheck,
                                BookOpen,
                                Palette
                            }[item.icon as 'ShieldCheck' | 'BookOpen' | 'Palette'];

                            return (
                                <div
                                    key={index}
                                    className={`group relative p-10 rounded-[3rem] bg-gradient-to-br ${colorStyles.gradient} ${colorStyles.shadow} hover:shadow-2xl hover:-translate-y-4 transition-all duration-500 flex flex-col items-center text-center h-full overflow-hidden border-4 border-white/20`}
                                >
                                    {/* Decorative background shape */}
                                    <div className={`absolute -top-10 -right-10 w-40 h-40 ${colorStyles.accent} rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700`}></div>
                                    <div className={`absolute -bottom-10 -left-10 w-40 h-40 ${colorStyles.accent} rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700`}></div>

                                    {/* Icon Container */}
                                    <div className={`relative z-10 w-24 h-24 rounded-[2rem] bg-white flex items-center justify-center mb-8 shadow-2xl rotate-3 group-hover:rotate-0 transition-transform duration-500`}>
                                        {Icon && <Icon className={`w-12 h-12 ${colorStyles.iconColor}`} strokeWidth={2.5} />}
                                    </div>

                                    <h3 className={`relative z-10 text-2xl md:text-3xl font-black ${item.color === 'yellow' ? 'text-zinc-900' : 'text-white'} mb-6 leading-tight drop-shadow-sm`}>
                                        {item.title}
                                    </h3>

                                    <p className={`relative z-10 ${item.color === 'yellow' ? 'text-zinc-800' : 'text-white/90'} font-bold text-lg leading-relaxed`}>
                                        {item.description.split('**').map((part, i) =>
                                            i % 2 === 1 ? <span key={i} className={`font-black ${item.color === 'yellow' ? 'text-black' : 'text-yellow-300'} text-xl uppercase tracking-tight`}>{part}</span> : part
                                        )}
                                    </p>

                                    {/* Glass reflection effect */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none"></div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>



            {/* Block 06: Main Product (Image Showcase & Feature Box) */}
            <section className="py-24 bg-white dark:bg-black overflow-hidden relative">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-orange-50/50 dark:bg-orange-900/10 -skew-x-12 translate-x-1/3"></div>

                <div className="max-w-6xl mx-auto px-4 relative z-10">
                    <div className="flex flex-col md:flex-row items-center gap-12">

                        {/* Left: Device Showcase Image */}
                        <div className="w-full md:w-1/2 flex justify-center">
                            <div className="relative group">
                                <img
                                    src="/shalom_device_suite.png"
                                    alt="Shalom App em todos os dispositivos"
                                    className="relative w-full max-w-[550px] object-contain z-10 hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                        </div>

                        {/* Right: Feature Box */}
                        <div className="w-full md:w-1/2">
                            <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] shadow-2xl border-4 border-yellow-400 overflow-hidden relative transform hover:-translate-y-1 transition-transform duration-300">

                                {/* Top Banner/Header inside the box */}
                                <div className="bg-yellow-400 p-8 text-center relative overflow-hidden">
                                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                                    <h2 className="text-2xl md:text-3xl font-black leading-tight text-black uppercase tracking-tight relative z-10 drop-shadow-sm">
                                        VOCÊ VAI RECEBER <span className="bg-black text-yellow-400 px-2 rounded transform -rotate-1 inline-block">ACESSO IMEDIATO</span> AO APLICATIVO SHALOM:
                                    </h2>
                                </div>

                                {/* List Content */}
                                <div className="p-8 md:p-10 bg-white dark:bg-zinc-900 relative">
                                    <ul className="space-y-5 relative z-10">
                                        {FAMILY_LANDING_CONTENT.mainProductBlock.items.map((item, index) => (
                                            <li key={index} className="flex items-center gap-4 group">
                                                <div className="flex-shrink-0 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white shadow-md shadow-green-500/30 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                                                    <Check size={24} strokeWidth={4} />
                                                </div>
                                                <span className="text-lg md:text-xl font-black text-zinc-800 dark:text-zinc-100 group-hover:text-green-600 transition-colors">
                                                    {item}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Block 07: Bônus Exclusivos (Presentes) */}
            {bonusesBlock && (
                <section className="py-24 bg-zinc-50 dark:bg-zinc-900/50 relative overflow-hidden">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-400"></div>
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>

                    <div className="max-w-7xl mx-auto px-4 relative z-10">
                        {/* Header */}
                        <div className="text-center mb-20 max-w-5xl mx-auto">
                            <h2 className="text-3xl md:text-5xl font-black text-black dark:text-white uppercase leading-tight drop-shadow-sm">
                                {bonusesBlock.title}
                            </h2>
                            <div className="h-1.5 w-32 mx-auto bg-orange-500 rounded-full mt-6"></div>
                        </div>

                        {/* Bonuses Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {bonusesBlock.items.map((bonus, index) => {
                                const iconMap: Record<string, any> = {
                                    Bot, Search, Sun, HeartHandshake, BookHeart, Target, Music2, Map, Clapperboard, Library, Key
                                };
                                const Icon = iconMap[bonus.icon];

                                return (
                                    <div key={index} className="group relative bg-white dark:bg-zinc-950 rounded-3xl overflow-hidden shadow-lg border border-zinc-100 dark:border-zinc-800 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col h-full">
                                        {/* Top Image Area / Icon Placeholder */}
                                        <div className="h-40 bg-zinc-100 dark:bg-zinc-900/50 flex items-center justify-center relative overflow-hidden">
                                            {(bonus as any).image ? (
                                                <img
                                                    src={(bonus as any).image}
                                                    alt={bonus.name}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                            ) : (
                                                <>
                                                    <div className="absolute inset-0 bg-gradient-to-br from-orange-100/50 to-transparent dark:from-orange-900/20"></div>
                                                    {/* Huge Icon as Background */}
                                                    {Icon && <Icon className="w-32 h-32 text-orange-500/10 absolute -bottom-4 -right-4 transform rotate-12" />}

                                                    {/* Main Icon */}
                                                    <div className="relative z-10 w-20 h-20 bg-white dark:bg-zinc-800 rounded-2xl shadow-lg flex items-center justify-center text-orange-500 border-2 border-orange-100 dark:border-zinc-700 group-hover:scale-110 transition-transform duration-300">
                                                        {Icon && <Icon className="w-10 h-10" strokeWidth={2} />}
                                                    </div>
                                                </>
                                            )}
                                        </div>

                                        {/* Yellow Ribbon Title */}
                                        <div className="bg-yellow-400 py-3 px-4 relative">
                                            {/* Ribbon folding effect CSS triangle could go here if we wanted complex pure CSS, but simple is bold enough */}
                                            <h3 className="text-black font-black text-center text-sm md:text-base uppercase tracking-tight leading-4">
                                                {bonus.name}
                                            </h3>
                                        </div>

                                        {/* Description */}
                                        <div className="p-6 flex-grow flex flex-col justify-start">
                                            <p className="text-zinc-600 dark:text-zinc-400 text-sm font-medium leading-relaxed text-center">
                                                {bonus.description}
                                            </p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </section>
            )}

            {/* Block 08: Pricing Section (MOVED TO END) */}
            {pricingBlock && (
                <section id="pricing" className="py-24 bg-white dark:bg-black relative overflow-hidden text-black dark:text-white">
                    <div className="max-w-7xl mx-auto px-4 relative z-10">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-black uppercase leading-tight">
                                {pricingBlock.title}
                            </h2>
                            <div className="h-1.5 w-32 mx-auto bg-orange-500 rounded-full mt-6"></div>
                        </div>

                        <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
                            {/* Basic Plan */}
                            <div className="w-full lg:w-1/3 flex flex-col items-center">
                                <div className="w-full bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden flex flex-col">
                                    <div className="bg-green-600 py-4 text-center">
                                        <h3 className="text-xl font-black text-white uppercase">{pricingBlock.basic.title}</h3>
                                    </div>
                                    <div className="p-6 flex flex-col gap-6">
                                        <img src={pricingBlock.basic.image} alt="Plano Básico" className="w-full h-auto rounded-xl shadow-sm" />
                                        <div className="text-center">
                                            <ul className="text-left space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                                                {pricingBlock.basic.items.map((item, idx) => (
                                                    <li key={idx} className="flex gap-2">
                                                        <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="text-center mt-4">
                                            <div className="text-4xl font-black text-green-600">{pricingBlock.basic.price}</div>
                                            <div className="text-sm text-zinc-500">{pricingBlock.basic.installments}</div>
                                        </div>
                                        <a href={pricingBlock.basic.link} target="_blank" rel="noopener noreferrer" className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl transition-colors text-center uppercase">
                                            {pricingBlock.basic.buttonText}
                                        </a>

                                        {/* Attention Block */}
                                        {pricingBlock.attention && (
                                            <div className="mt-8 text-center animate-bounce">
                                                <div className="text-red-600 font-bold text-lg leading-tight mb-2">
                                                    {pricingBlock.attention.text}
                                                </div>
                                                <div className="flex justify-center gap-2 text-red-600">
                                                    <ArrowDown size={32} strokeWidth={3} />
                                                    <ArrowDown size={32} strokeWidth={3} />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Complete Plan */}
                            <div className="w-full lg:w-1/2 relative">
                                <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20 bg-yellow-400 text-black font-black px-6 py-2 rounded-full uppercase text-sm shadow-lg border-2 border-orange-500 flex items-center gap-2 whitespace-nowrap">
                                    {pricingBlock.complete.badge}
                                </div>
                                <div className="w-full bg-white dark:bg-zinc-900 rounded-3xl border-4 border-green-600 shadow-2xl overflow-hidden flex flex-col relative z-10 transform lg:-translate-y-8">
                                    <div className="bg-green-700 py-6 text-center pt-10">
                                        <h3 className="text-2xl md:text-3xl font-black text-white uppercase">{pricingBlock.complete.title}</h3>
                                    </div>
                                    <div className="p-8 flex flex-col gap-6">
                                        <img src={pricingBlock.complete.image} alt="Plano Completo" className="w-full h-auto rounded-xl shadow-lg border border-zinc-100" />

                                        <div className="space-y-6">
                                            <p className="text-center font-bold text-lg text-zinc-800 dark:text-zinc-100">{pricingBlock.complete.description}</p>

                                            <div className="grid md:grid-cols-2 gap-4 text-sm">
                                                <ul className="space-y-2">
                                                    {pricingBlock.complete.items.map((item, idx) => (
                                                        <li key={idx} className="flex gap-2 text-zinc-700 dark:text-zinc-300">
                                                            <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                                                            <span>{item}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                                <div className="bg-orange-50 dark:bg-orange-900/10 p-4 rounded-xl border border-orange-100 dark:border-orange-800/30">
                                                    <h4 className="font-bold text-orange-600 mb-2 uppercase text-xs tracking-wider">{pricingBlock.complete.bonusTitle}</h4>
                                                    <ul className="space-y-2">
                                                        {pricingBlock.complete.bonuses.map((bonus, idx) => (
                                                            <li key={idx} className="flex gap-2 text-zinc-700 dark:text-zinc-300 text-xs">
                                                                <Star className="w-3 h-3 text-orange-500 flex-shrink-0 mt-0.5" />
                                                                <span>{bonus}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-zinc-50 dark:bg-black/20 p-6 rounded-2xl text-center border border-zinc-100 dark:border-zinc-800 mt-4">
                                            <div className="text-zinc-400 line-through text-lg font-medium">{pricingBlock.complete.originalPrice}</div>
                                            <div className="text-5xl md:text-6xl font-black text-green-600 my-2">{pricingBlock.complete.price}</div>
                                            <div className="text-zinc-500 font-medium mb-4">{pricingBlock.complete.installments}</div>
                                            <div className="inline-block bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-4 py-1 rounded-full font-bold text-sm mb-6">
                                                {pricingBlock.complete.savings}
                                            </div>
                                            <a href={pricingBlock.complete.link} target="_blank" rel="noopener noreferrer" className="block w-full bg-green-600 hover:bg-green-700 hover:scale-105 transition-all text-white font-black py-5 rounded-2xl text-xl md:text-2xl uppercase shadow-xl shadow-green-600/20">
                                                {pricingBlock.complete.buttonText}
                                            </a>
                                            <div className="mt-4 flex items-center justify-center gap-2 text-xs md:text-sm text-zinc-500">
                                                <CreditCard className="w-4 h-4" />
                                                <span>{pricingBlock.complete.footer}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}


            {/* Block 09: FAQ Section */}
            {faqBlock && (
                <section className="py-24 bg-zinc-50 dark:bg-zinc-950">
                    <div className="max-w-4xl mx-auto px-4">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-black text-black dark:text-white uppercase tracking-tight">
                                {faqBlock.title}
                            </h2>
                            <div className="h-1.5 w-32 mx-auto bg-orange-500 rounded-full mt-6"></div>
                        </div>

                        <div className="space-y-4">
                            {faqBlock.items.map((faq, index) => (
                                <div key={index} className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md">
                                    <button
                                        onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                                        className="w-full p-6 text-left flex items-center justify-between gap-4"
                                    >
                                        <span className="text-lg md:text-xl font-black text-zinc-900 dark:text-white">
                                            {faq.question}
                                        </span>
                                        <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center transition-transform duration-300 ${openFaqIndex === index ? 'rotate-180 bg-orange-100 text-orange-600' : ''}`}>
                                            <ChevronDown size={20} />
                                        </div>
                                    </button>
                                    <div
                                        className={`transition-all duration-300 ease-in-out ${openFaqIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
                                    >
                                        <div className="p-6 pt-0 text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed border-t border-zinc-50 dark:border-zinc-800 mt-2">
                                            {faq.answer}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Block 10: Improved Footer */}
            <footer className="bg-white dark:bg-black border-t border-zinc-100 dark:border-zinc-900 pt-20 pb-10">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                        {/* Brand Column */}
                        <div className="col-span-1 md:col-span-2">
                            <div className="flex items-center gap-2 mb-6">
                                <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20">
                                    <Heart className="text-white w-6 h-6" />
                                </div>
                                <span className="text-2xl font-black text-black dark:text-white tracking-tight">Shalom Famílias</span>
                            </div>
                            <p className="text-zinc-500 dark:text-zinc-400 text-lg leading-relaxed max-w-md mb-8">
                                O primeiro aplicativo focado em transformar o tempo de tela em momentos de fé, criatividade e conexão real entre pais e filhos.
                            </p>
                            <div className="flex gap-4">
                                <a href="#" className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:bg-orange-500 hover:text-white transition-all">
                                    <MessageCircle size={20} />
                                </a>
                                <a href="#" className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:bg-orange-500 hover:text-white transition-all">
                                    <Users size={20} />
                                </a>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 className="text-black dark:text-white font-black uppercase tracking-wider mb-6">Legal</h4>
                            <ul className="space-y-4 text-zinc-500 dark:text-zinc-400 font-medium">
                                <li><a href="#" className="hover:text-orange-500 transition-colors">Termos de Uso</a></li>
                                <li><a href="#" className="hover:text-orange-500 transition-colors">Política de Privacidade</a></li>
                                <li><a href="#" className="hover:text-orange-500 transition-colors">Políticas de Cookies</a></li>
                            </ul>
                        </div>

                        {/* Support */}
                        <div>
                            <h4 className="text-black dark:text-white font-black uppercase tracking-wider mb-6">Suporte</h4>
                            <ul className="space-y-4 text-zinc-500 dark:text-zinc-400 font-medium">
                                <li><a href="mailto:contato@shalomapp.com.br" className="hover:text-orange-500 transition-colors">contato@shalomapp.com.br</a></li>
                                <li><a href="#" className="hover:text-orange-500 transition-colors">Área do Cliente</a></li>
                                <li><a href="#" className="hover:text-orange-500 transition-colors">Perguntas Frequentes</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="pt-10 border-t border-zinc-100 dark:border-zinc-900 text-center">
                        <p className="text-zinc-400 text-sm font-medium">
                            &copy; {new Date().getFullYear()} Shalom App. Feito com <Heart className="inline w-4 h-4 text-orange-500 mx-1 align-middle animate-beat" fill="currentColor" /> para famílias que buscam o melhor para seus filhos.
                        </p>
                    </div>
                </div>
            </footer>

            {/* Custom Animations Styles */}
            <style>{`
                @keyframes float-slow {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                .animate-float-slow {
                    animation: float-slow 6s ease-in-out infinite;
                }
                @keyframes beat {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.2); }
                }
                .animate-beat {
                    animation: beat 1s ease-in-out infinite;
                }
                @keyframes blob {
                    0% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .perspective-1000 {
                    perspective: 1000px;
                }
            `}</style>
        </div >
    );
};

// Internal 3D Carousel Component
const Carousel = ({ images }: { images: string[] }) => {
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = React.useState(true);

    React.useEffect(() => {
        if (!isAutoPlaying) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [images.length, isAutoPlaying]);

    const getPosition = (index: number) => {
        const diff = (index - currentIndex + images.length) % images.length;
        if (diff === 0) return 'center';
        if (diff === 1 || diff === -(images.length - 1)) return 'right';
        if (diff === -1 || diff === images.length - 1) return 'left';
        return 'hidden';
    };

    return (
        <div
            className="w-full h-[700px] md:h-[700px] relative flex items-center justify-center overflow-visible"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
        >
            {images.map((img, index) => {
                const position = getPosition(index);
                let zIndex = 0;
                let opacity = 0;
                // Base transform styles
                let transform = '';
                let left = '50%';

                if (position === 'center') {
                    zIndex = 50;
                    opacity = 1;
                    // Centered vertically (-50% Y) and horizontally (-50% X)
                    transform = 'translate(-50%, -50%) scale(1)';
                } else if (position === 'left') {
                    zIndex = 40;
                    opacity = 0.5; // Lower opacity for side items on mobile as requested
                    // Mobile: moved closer (15%) and scaled larger (0.85)
                    transform = 'translate(-50%, -50%) scale(0.85) perspective(1000px) rotateY(10deg)';
                    left = '15%';
                } else if (position === 'right') {
                    zIndex = 40;
                    opacity = 0.5; // Lower opacity for side items on mobile as requested
                    // Mobile: moved closer (85%) and scaled larger (0.85)
                    transform = 'translate(-50%, -50%) scale(0.85) perspective(1000px) rotateY(-10deg)';
                    left = '85%';
                } else {
                    opacity = 0;
                    transform = 'translate(-50%, -50%) scale(0.5)';
                    zIndex = -1;
                }

                if (position === 'hidden' && opacity === 0) return <div key={index} className="hidden" />;

                return (
                    <div
                        key={index}
                        // Mobile: w-[85%] (width driven), h-auto. Desktop: h-[90%] (height driven), w-auto.
                        className="absolute top-1/2 w-[85%] md:w-auto md:h-[90%] transition-all duration-700 ease-[cubic-bezier(0.25,0.8,0.25,1)] cursor-pointer origin-center flex justify-center items-center"
                        style={{
                            left,
                            transform,
                            zIndex,
                            opacity,
                        }}
                        onClick={() => setCurrentIndex(index)}
                    >
                        {/* Styles for LARGER screens (MD+) - Updated selectors to match new left values */}
                        <style>{`
                             @media (min-width: 768px) {
                                div[style*="left: 15%"] { left: 25% !important; transform: translate(-50%, -50%) scale(0.8) perspective(1000px) rotateY(15deg) !important; opacity: 0.7 !important; }
                                div[style*="left: 85%"] { left: 75% !important; transform: translate(-50%, -50%) scale(0.8) perspective(1000px) rotateY(-15deg) !important; opacity: 0.7 !important; }
                            }
                        `}</style>

                        {/* The Frame wraps the image tightly - TIGHT FIX */}
                        {/* We use the image to drive dimensions, and the border wraps it with box-sizing border-box */}
                        <div className="relative w-full h-auto md:w-auto md:h-full group border-[8px] md:border-[16px] border-zinc-900 rounded-[1.5rem] md:rounded-[2.5rem] bg-zinc-900 shadow-2xl overflow-hidden box-border">
                            {/* Inner Gloss */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none z-30"></div>

                            {/* Image - Fully fills the container, tight fit */}
                            <img
                                src={img}
                                alt={`App Preview ${index + 1}`}
                                className="w-full h-auto md:w-auto md:h-full object-cover bg-white block"
                                draggable={false}
                            />
                        </div>
                    </div>
                );
            })}

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 z-50">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`transition-all duration-300 rounded-full shadow-sm hover:scale-110 ${index === currentIndex
                            ? 'w-8 h-2.5 bg-orange-500 ring-2 ring-orange-200'
                            : 'w-2.5 h-2.5 bg-zinc-300 dark:bg-zinc-700 hover:bg-orange-400'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default FamilyLanding;
