
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeft, CheckCircle2, Heart, Sparkles, BookOpen,
    MessageCircle, Moon, Sun, Coffee, Footprints,
    ChevronRight, ChevronLeft, Share2, ShieldCheck, Star
} from 'lucide-react';
import { RECONNECTION_GUIDE, GuideStep } from '../data/reconnectionGuide';

const ReconnectionGuide: React.FC = () => {
    const navigate = useNavigate();
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const currentStep = RECONNECTION_GUIDE[currentStepIndex];

    const nextStep = () => {
        if (currentStepIndex < RECONNECTION_GUIDE.length - 1) {
            setCurrentStepIndex(currentStepIndex + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            navigate('/home');
        }
    };

    const prevStep = () => {
        if (currentStepIndex > 0) {
            setCurrentStepIndex(currentStepIndex - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const progress = ((currentStepIndex + 1) / RECONNECTION_GUIDE.length) * 100;

    return (
        <div className="min-h-screen bg-white md:bg-stone-50 font-sans pb-32">
            {/* Minimal Header */}
            <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-stone-100 px-4 py-4">
                <div className="max-w-2xl mx-auto flex items-center justify-between">
                    <button onClick={() => navigate(-1)} className="p-2 hover:bg-stone-100 rounded-full transition-colors">
                        <ArrowLeft size={20} className="text-stone-600" />
                    </button>
                    <div className="flex flex-col items-center">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400">Guia de Reaproximação</span>
                        <div className="flex gap-1 mt-1">
                            {RECONNECTION_GUIDE.map((_, i) => (
                                <div
                                    key={i}
                                    className={`h-1 rounded-full transition-all duration-500 ${i === currentStepIndex ? 'w-4 bg-emerald-500' : 'w-1 bg-stone-200'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                    <button className="p-2 text-stone-400 opacity-0 pointer-events-none">
                        <Share2 size={20} />
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="max-w-2xl mx-auto px-6 pt-12 animate-fade-in">
                <div className="flex flex-col items-center text-center mb-12">
                    <div className="w-20 h-20 bg-emerald-50 rounded-[2rem] flex items-center justify-center text-emerald-500 mb-6 shadow-sm transform -rotate-3 border border-emerald-100">
                        {currentStepIndex === 0 && <Heart size={40} fill="currentColor" opacity={0.2} />}
                        {currentStepIndex === 1 && <Coffee size={40} />}
                        {currentStepIndex === 2 && <Moon size={40} />}
                        {currentStepIndex === 3 && <MessageCircle size={40} />}
                        {currentStepIndex === 4 && <Footprints size={40} />}
                        {currentStepIndex === 5 && <ShieldCheck size={40} />}
                    </div>
                    <h2 className="text-xs font-black uppercase tracking-widest text-emerald-600 mb-2">Passo {currentStep.id} de {RECONNECTION_GUIDE.length}</h2>
                    <h1 className="text-3xl md:text-4xl font-serif font-black text-stone-800 leading-tight">
                        {currentStep.title}
                    </h1>
                    <p className="mt-4 text-lg text-stone-500 font-medium italic">
                        "{currentStep.subtitle}"
                    </p>
                </div>

                <div className="prose prose-stone max-w-none">
                    <p className="text-xl text-stone-700 leading-relaxed font-serif text-center mb-12 px-2">
                        {currentStep.description}
                    </p>

                    <div className="space-y-4 mb-12">
                        {currentStep.advice.map((item, i) => (
                            <div key={i} className="flex gap-4 p-5 bg-stone-50 rounded-2xl border border-stone-100 items-start hover:border-emerald-200 transition-colors">
                                <div className="mt-1 bg-emerald-100 text-emerald-600 p-1 rounded-full flex-shrink-0">
                                    <Sparkles size={12} fill="currentColor" />
                                </div>
                                <p className="text-stone-700 font-medium leading-relaxed">{item}</p>
                            </div>
                        ))}
                    </div>

                    {/* Bible Verse Box */}
                    <div className="relative p-10 bg-emerald-900 rounded-[3rem] text-white overflow-hidden shadow-2xl mb-12 group">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-3xl -mr-10 -mt-10"></div>
                        <div className="absolute bottom-0 left-0 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl -ml-10 -mb-10"></div>

                        <div className="relative z-10 text-center">
                            <Star className="mx-auto mb-6 text-emerald-300 opacity-50" size={32} />
                            <p className="text-2xl font-serif italic text-emerald-50 leading-relaxed mb-6">
                                "{currentStep.verse}"
                            </p>
                            <span className="text-xs font-black uppercase tracking-[0.3em] text-emerald-400">
                                {currentStep.verseRef}
                            </span>
                        </div>
                    </div>

                    {/* Action Item */}
                    <div className="bg-amber-50 border-2 border-amber-100 p-8 rounded-[2.5rem] mb-12 shadow-sm">
                        <h4 className="text-xs font-black uppercase tracking-widest text-amber-600 mb-4 flex items-center gap-2 justify-center">
                            <Star size={14} fill="currentColor" /> Desafio Prático
                        </h4>
                        <p className="text-stone-800 text-lg font-bold text-center leading-relaxed">
                            {currentStep.action}
                        </p>
                    </div>
                </div>
            </div>

            {/* Sticky Navigation Footer */}
            <div className="fixed bottom-0 inset-x-0 p-6 bg-gradient-to-t from-white via-white to-transparent pt-12 pointer-events-none">
                <div className="max-w-2xl mx-auto flex gap-4 pointer-events-auto">
                    {currentStepIndex > 0 && (
                        <button
                            onClick={prevStep}
                            className="w-16 h-16 bg-white border border-stone-200 rounded-full flex items-center justify-center text-stone-400 hover:text-stone-800 hover:border-stone-400 transition-all shadow-lg active:scale-95"
                        >
                            <ChevronLeft size={32} />
                        </button>
                    )}
                    <button
                        onClick={nextStep}
                        className="flex-1 bg-emerald-600 text-white rounded-[2rem] h-16 font-black text-lg flex items-center justify-center gap-2 shadow-xl shadow-emerald-600/20 hover:bg-emerald-700 transition-all active:scale-[0.98]"
                    >
                        {currentStepIndex === RECONNECTION_GUIDE.length - 1 ? (
                            <>Concluir Manual <CheckCircle2 size={24} /></>
                        ) : (
                            <>Próximo Passo <ChevronRight size={24} /></>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReconnectionGuide;
