
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Heart, Share2, X, MessageCircle, Sparkles, BookOpen, Music, Shield, Sun, CheckCircle2 } from 'lucide-react';
import { PSALMS, Psalm } from '../data/psalmsData';
import { useProgress } from '../contexts/ProgressContext';

const PsalmsExplained: React.FC = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const [activePsalm, setActivePsalm] = useState<Psalm | null>(null);
    const { isPsalmRead, markPsalmAsRead } = useProgress();

    // Extract unique tags
    const allTags = useMemo(() => {
        const tags = new Set<string>();
        PSALMS.forEach(p => p.tags.forEach(t => tags.add(t)));
        return Array.from(tags).sort();
    }, []);

    // Filter psalms
    const filteredPsalms = useMemo(() => {
        return PSALMS.filter(p => {
            const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.explanation.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.number.toString().includes(searchTerm);
            const matchesTag = selectedTag ? p.tags.includes(selectedTag) : true;
            return matchesSearch && matchesTag;
        });
    }, [searchTerm, selectedTag]);

    const handleShare = async (psalm: Psalm) => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: `Salmo ${psalm.number}: ${psalm.title}`,
                    text: `"${psalm.verse}"\n\nExplicação: ${psalm.explanation}\n\nVia App Shalom`,
                });
            } catch (error) {
                console.log('Error sharing', error);
            }
        }
    };

    return (
        <div className="min-h-screen bg-stone-50 md:bg-stone-100 font-sans pb-20 md:pb-0">
            {/* Header */}
            <div className="bg-white sticky top-0 z-30 shadow-sm border-b border-stone-100">
                <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
                    <button onClick={() => navigate(-1)} className="p-2 hover:bg-stone-100 rounded-full transition-colors text-stone-600">
                        <ArrowLeft size={24} />
                    </button>
                    <div>
                        <h1 className="text-xl font-serif font-black text-stone-800 leading-none">Salmos Explicados</h1>
                        <p className="text-[10px] md:text-xs text-blue-600 font-bold mt-1 uppercase tracking-wider flex items-center gap-1">
                            <Sparkles size={10} fill="currentColor" /> Atualizamos todos os dias
                        </p>
                    </div>
                </div>

                {/* Search & Filter Bar */}
                <div className="max-w-4xl mx-auto px-4 pb-4 overflow-x-auto no-scrollbar flex gap-3 items-center">
                    <div className="relative flex-1 min-w-[200px]">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={16} />
                        <input
                            type="text"
                            placeholder="Buscar salmo ou número..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-stone-100 pl-10 pr-4 py-2.5 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-stone-200 transition-all placeholder:text-stone-400"
                        />
                    </div>
                    {allTags.map(tag => (
                        <button
                            key={tag}
                            onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${selectedTag === tag
                                ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                                : 'bg-white text-stone-600 border-stone-200 hover:border-stone-400'
                                }`}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content Grid */}
            <div className="max-w-4xl mx-auto p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredPsalms.map(psalm => (
                    <div
                        key={psalm.id}
                        onClick={() => setActivePsalm(psalm)}
                        className="bg-white p-6 rounded-[2rem] shadow-sm border border-stone-100 hover:border-blue-200 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between h-auto min-h-[14rem]"
                    >
                        <div>
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex gap-2">
                                    {psalm.tags.map(tag => (
                                        <span key={tag} className="px-2 py-0.5 bg-blue-50 text-[10px] font-bold uppercase tracking-wider text-blue-600 rounded-md">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <span className="text-lg font-black text-stone-300">#{psalm.number}</span>
                            </div>
                            <h3 className="text-xl font-serif font-black text-stone-800 mb-2 leading-tight group-hover:text-blue-600 transition-colors flex items-start justify-between gap-2">
                                {psalm.title}
                                {isPsalmRead(psalm.id) && <CheckCircle2 size={18} className="text-emerald-500 flex-shrink-0 mt-1" fill="currentColor" opacity={0.2} />}
                            </h3>
                            <p className="text-stone-500 text-sm line-clamp-3 leading-relaxed italic">
                                "{psalm.verse}"
                            </p>
                        </div>
                        <div className="mt-4 flex items-center justify-between border-t border-stone-50 pt-4">
                            <div className="flex items-center gap-3">
                                {isPsalmRead(psalm.id) && (
                                    <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 px-2 py-0.5 rounded-full">Estudado</span>
                                )}
                                <span className="text-xs font-bold text-blue-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                    Ver explicação <ArrowLeft className="rotate-180" size={12} />
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Full Screen Study Environment (Folder/Presentation Style) */}
            {activePsalm && (
                <div className="fixed inset-0 z-[100] bg-stone-900 flex items-center justify-center p-0 md:p-8 animate-in fade-in zoom-in-95 duration-500 overflow-hidden">
                    {/* Atmospheric Background */}
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-900/20 via-stone-900 to-indigo-900/20"></div>

                    {/* Exit Button */}
                    <button
                        onClick={() => setActivePsalm(null)}
                        className="absolute top-4 right-4 md:top-6 md:right-6 z-[110] p-3 md:p-4 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all backdrop-blur-md border border-white/10 shadow-2xl group"
                    >
                        <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
                    </button>

                    {/* The "Study Folder" Container */}
                    <div className="w-full max-w-6xl h-full md:h-auto md:max-h-[90vh] bg-white md:rounded-[3rem] shadow-[0_30px_120px_rgba(0,0,0,0.6)] relative overflow-hidden flex flex-col md:flex-row animate-in slide-in-from-bottom-12 duration-700 font-sans">

                        {/* Wrapper for scrollable area on mobile */}
                        <div className="flex-1 flex flex-col md:flex-row overflow-y-auto md:overflow-hidden">

                            {/* Sidebar: Verse & Header */}
                            <div className="w-full md:w-[35%] bg-blue-600 p-8 md:p-12 text-white flex flex-col relative overflow-hidden flex-shrink-0">
                                <div className="relative z-10 flex flex-col h-full">
                                    <div className="flex items-center gap-4 mb-6 md:mb-8">
                                        <div className="w-12 h-12 md:w-16 md:h-16 bg-white/20 backdrop-blur-md rounded-xl md:rounded-2xl flex items-center justify-center border border-white/30 shadow-xl">
                                            <Music size={24} className="md:size-8" />
                                        </div>
                                        <div>
                                            <h2 className="text-3xl md:text-4xl font-serif font-black leading-none">Salmo {activePsalm.number}</h2>
                                            <p className="text-blue-100 text-[10px] md:text-sm font-bold uppercase tracking-widest mt-1 opacity-80">{activePsalm.title}</p>
                                        </div>
                                    </div>

                                    <div className="flex-1 flex flex-col justify-center py-4 md:py-0">
                                        <div className="relative">
                                            <span className="text-6xl md:text-8xl font-serif absolute -top-8 -left-4 md:-top-10 md:-left-6 opacity-20">"</span>
                                            <p className="text-xl md:text-3xl font-serif italic leading-relaxed relative z-10 selection:bg-blue-400">
                                                {activePsalm.verse}
                                            </p>
                                            <div className="w-16 h-1 bg-white/40 mt-6 md:mt-8"></div>
                                        </div>
                                    </div>

                                    <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-white/20">
                                        <div className="flex gap-2 flex-wrap">
                                            {activePsalm.tags.map(tag => (
                                                <span key={tag} className="px-2 py-1 md:px-3 md:py-1 bg-white/10 text-[9px] md:text-[10px] font-bold uppercase tracking-widest rounded-full border border-white/20">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Decorative Background Pattern */}
                                <Shield size={200} className="absolute -bottom-10 -right-10 opacity-10 -rotate-12 md:size-[300px] md:-bottom-20 md:-right-20" />
                            </div>

                            {/* Main Content Area: Detailed Study Folder */}
                            <div className="flex-1 bg-stone-50 overflow-y-auto no-scrollbar p-8 md:p-16">
                                <div className="max-w-3xl mx-auto space-y-8 md:space-y-12 pb-12 md:pb-0">

                                    {/* Section: Explanation */}
                                    <section className="animate-in fade-in slide-in-from-right-8 duration-700 delay-200">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-100 text-blue-600 rounded-lg md:rounded-xl flex items-center justify-center shadow-sm">
                                                <BookOpen size={18} className="md:size-5" />
                                            </div>
                                            <h3 className="text-[10px] md:text-lg font-black uppercase tracking-widest text-stone-400">Sabedoria do Salmo</h3>
                                        </div>
                                        <p className="text-lg md:text-xl text-stone-700 leading-relaxed font-serif">
                                            {activePsalm.explanation}
                                        </p>
                                    </section>

                                    {/* Section: Historical Context & Insight */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                                        {activePsalm.historicalContext && (
                                            <section className="bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-stone-100 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
                                                <h4 className="text-[10px] md:text-xs font-black uppercase tracking-widest text-amber-600 mb-4 flex items-center gap-2">
                                                    <Sun size={14} /> Contexto Histórico
                                                </h4>
                                                <p className="text-stone-600 text-sm leading-relaxed">
                                                    {activePsalm.historicalContext}
                                                </p>
                                            </section>
                                        )}
                                        {activePsalm.deeperInsight && (
                                            <section className="bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-stone-100 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-400">
                                                <h4 className="text-[10px] md:text-xs font-black uppercase tracking-widest text-indigo-600 mb-4 flex items-center gap-2">
                                                    <Sparkles size={14} /> Insight Profundo
                                                </h4>
                                                <p className="text-stone-600 text-sm leading-relaxed italic">
                                                    {activePsalm.deeperInsight}
                                                </p>
                                            </section>
                                        )}
                                    </div>

                                    {/* Section: Practice & Prayer */}
                                    <div className="grid grid-cols-1 gap-6 md:gap-8">
                                        <section className="bg-emerald-50 p-6 md:p-8 rounded-[2.5rem] border border-emerald-100 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500">
                                            <h4 className="text-[10px] md:text-xs font-black uppercase tracking-widest text-emerald-700 mb-4 flex items-center gap-2">
                                                <Shield size={16} /> Aplicação Prática
                                            </h4>
                                            <p className="text-emerald-900/80 leading-relaxed font-medium text-sm md:text-base">
                                                {activePsalm.practicalApplication}
                                            </p>
                                        </section>

                                        {activePsalm.prayerPrompt && (
                                            <section className="bg-stone-900 p-6 md:p-8 rounded-[2.5rem] text-white shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-700 delay-600">
                                                <h4 className="text-[10px] md:text-xs font-black uppercase tracking-widest text-blue-400 mb-4 flex items-center gap-2">
                                                    <Heart size={16} className="fill-blue-400" /> Momento de Oração
                                                </h4>
                                                <p className="text-base md:text-lg font-serif italic text-stone-200">
                                                    "{activePsalm.prayerPrompt}"
                                                </p>
                                            </section>
                                        )}
                                    </div>

                                    {/* Folder Footer Actions */}
                                    <div className="flex flex-col md:flex-row gap-4 pt-8 pb-10 md:pb-0 border-t border-stone-200">
                                        <button
                                            onClick={() => handleShare(activePsalm)}
                                            className="px-8 h-12 md:h-14 bg-white text-stone-800 font-bold rounded-2xl shadow-xl border border-stone-100 hover:scale-105 transition-all flex items-center justify-center gap-3 text-sm md:text-base selection:bg-stone-100"
                                        >
                                            <Share2 size={20} /> Compartilhar Estudo
                                        </button>
                                        <button
                                            onClick={() => {
                                                markPsalmAsRead(activePsalm.id);
                                                setActivePsalm(null);
                                            }}
                                            className="flex-1 h-12 md:h-14 bg-blue-600 text-white font-black rounded-2xl shadow-xl hover:scale-105 transition-all flex items-center justify-center text-sm md:text-base gap-2"
                                        >
                                            Concluir Estudo {isPsalmRead(activePsalm.id) && <CheckCircle2 size={20} />}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PsalmsExplained;
