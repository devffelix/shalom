
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Heart, Share2, X, MessageCircle, Sparkles, BookOpen, Music, Shield, Sun } from 'lucide-react';
import { PSALMS, Psalm } from '../data/psalmsData';

const PsalmsExplained: React.FC = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const [activePsalm, setActivePsalm] = useState<Psalm | null>(null);

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
                        <p className="text-xs text-stone-500 font-medium mt-1">Sabedoria e conforto direto dos Salmos</p>
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
                            <h3 className="text-xl font-serif font-black text-stone-800 mb-2 leading-tight group-hover:text-blue-600 transition-colors">
                                {psalm.title}
                            </h3>
                            <p className="text-stone-500 text-sm line-clamp-3 leading-relaxed italic">
                                "{psalm.verse}"
                            </p>
                        </div>
                        <div className="mt-4 flex items-center justify-between border-t border-stone-50 pt-4">
                            <span className="text-xs font-bold text-blue-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                Ver explicação <ArrowLeft className="rotate-180" size={12} />
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Reading Modal */}
            {activePsalm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-lg overflow-hidden animate-slide-up relative flex flex-col max-h-[90vh]">
                        {/* Modal Header */}
                        <div className="bg-blue-50 p-8 pb-10 relative text-center">
                            <button
                                onClick={() => setActivePsalm(null)}
                                className="absolute top-4 right-4 p-2 bg-white/50 hover:bg-white rounded-full transition-colors text-stone-500"
                            >
                                <X size={20} />
                            </button>
                            <div className="w-16 h-16 bg-white rounded-2xl mx-auto flex items-center justify-center shadow-sm text-blue-500 mb-4 transform -rotate-3">
                                <Shield size={32} />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-serif font-black text-stone-800 leading-tight px-4">
                                Salmo {activePsalm.number}: {activePsalm.title}
                            </h2>
                        </div>

                        {/* Modal Content */}
                        <div className="p-8 -mt-6 bg-white rounded-t-[2.5rem] flex-1 overflow-y-auto">
                            <div className="space-y-6">
                                <div className="bg-stone-50 p-6 rounded-2xl border-l-4 border-blue-400">
                                    <p className="text-lg text-stone-700 leading-relaxed font-serif italic">
                                        "{activePsalm.verse}"
                                    </p>
                                </div>

                                <section>
                                    <h4 className="text-xs font-black uppercase tracking-widest text-blue-600 mb-2 flex items-center gap-2">
                                        <BookOpen size={14} /> Explicação
                                    </h4>
                                    <p className="text-stone-600 leading-relaxed">
                                        {activePsalm.explanation}
                                    </p>
                                </section>

                                <section className="bg-green-50/50 p-5 rounded-2xl border border-green-100">
                                    <h4 className="text-xs font-black uppercase tracking-widest text-green-600 mb-2 flex items-center gap-2">
                                        <Sun size={14} /> Na Prática
                                    </h4>
                                    <p className="text-stone-600 leading-relaxed text-sm">
                                        {activePsalm.practicalApplication}
                                    </p>
                                </section>
                            </div>
                        </div>

                        {/* Modal Footer / Actions */}
                        <div className="p-6 border-t border-stone-100 bg-stone-50 flex gap-4">
                            <button
                                onClick={() => handleShare(activePsalm)}
                                className="flex-1 py-4 bg-white text-stone-800 font-bold rounded-2xl shadow-sm border border-stone-200 hover:bg-stone-50 transition-all flex items-center justify-center gap-2"
                            >
                                <Share2 size={18} /> Compartilhar
                            </button>
                            <button
                                onClick={() => setActivePsalm(null)}
                                className="flex-1 py-4 bg-stone-800 text-white font-bold rounded-2xl shadow-lg hover:bg-stone-900 transition-all flex items-center justify-center gap-2"
                            >
                                <Heart size={18} className="text-red-500" fill="currentColor" /> Guardar no Coração
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PsalmsExplained;
