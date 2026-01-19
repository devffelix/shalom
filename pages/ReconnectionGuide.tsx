
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeft, CheckCircle2, Heart, Sparkles, BookOpen,
    MessageCircle, Moon, Sun, Coffee, Footprints,
    ChevronRight, ChevronLeft, Share2, ShieldCheck, Star, X
} from 'lucide-react';
import { RECONNECTION_GUIDE, GuideStep } from '../data/reconnectionGuide';
import { useProgress } from '../contexts/ProgressContext';

const ReconnectionGuide: React.FC = () => {
    const navigate = useNavigate();
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const currentStep = RECONNECTION_GUIDE[currentStepIndex];
    const { markManualAsCompleted, progress: userProgress } = useProgress();

    const nextStep = () => {
        if (currentStepIndex < RECONNECTION_GUIDE.length - 1) {
            setCurrentStepIndex(currentStepIndex + 1);
        } else {
            markManualAsCompleted();
            navigate('/app');
        }
    };

    const prevStep = () => {
        if (currentStepIndex > 0) {
            setCurrentStepIndex(currentStepIndex - 1);
        }
    };

    const progress = ((currentStepIndex + 1) / RECONNECTION_GUIDE.length) * 100;

    return (
        <div className="fixed inset-0 z-[100] bg-stone-900 flex items-center justify-center p-0 md:p-8 animate-in fade-in duration-700 overflow-hidden font-sans">
            {/* Atmospheric Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-stone-900 to-green-950 opacity-60"></div>
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-500/10 blur-[120px] rounded-full"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-green-500/10 blur-[120px] rounded-full"></div>

            {/* Exit Button */}
            <button
                onClick={() => navigate('/app')}
                className="absolute top-4 right-4 md:top-8 md:right-8 z-50 p-3 md:p-4 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all backdrop-blur-md border border-white/10 shadow-2xl group"
            >
                <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
            </button>

            {/* Slide Container */}
            <div className="w-full max-w-6xl h-full md:h-[85vh] bg-white md:rounded-[3rem] shadow-[0_30px_120px_rgba(0,0,0,0.4)] relative overflow-hidden flex flex-col md:flex-row animate-in slide-in-from-bottom-12 duration-700">

                {/* Visual Sidebar (Step info) */}
                <div className="w-full md:w-[35%] bg-emerald-600 p-8 md:p-12 text-white flex flex-col relative overflow-hidden flex-shrink-0">
                    <div className="relative z-10 flex flex-col h-full">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 md:w-16 md:h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30 shadow-xl">
                                <Footprints size={24} className="md:size-8" />
                            </div>
                            <div>
                                <h3 className="text-xl md:text-2xl font-serif font-black leading-tight">Manual</h3>
                                <p className="text-emerald-100 text-[10px] md:text-xs font-bold uppercase tracking-widest mt-0.5 opacity-80 decoration-emerald-300 underline decoration-2 underline-offset-4 flex items-center gap-1">
                                    Reaproximação <Sparkles size={10} className="inline" />
                                </p>
                                <p className="text-[8px] md:text-[10px] text-emerald-200/60 font-black uppercase tracking-[0.2em] mt-2">
                                    Atualizamos todos os dias
                                </p>
                            </div>
                        </div>

                        <div className="flex-1 flex flex-col justify-center">
                            <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-emerald-200 mb-4 block">Passo {currentStep.id} de {RECONNECTION_GUIDE.length}</span>
                            <h2 className="text-3xl md:text-5xl font-serif font-black mb-6 leading-[1.1] tracking-tight">
                                {currentStep.title}
                            </h2>
                            <div className="w-16 h-1.5 bg-emerald-400 rounded-full mb-6"></div>
                            <p className="text-emerald-50/90 text-sm md:text-lg font-medium italic leading-relaxed">
                                "{currentStep.subtitle}"
                            </p>
                        </div>

                        {/* Progress Indicator */}
                        <div className="mt-8">
                            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-emerald-200 mb-2">
                                <span>Progresso da Jornada</span>
                                <span>{Math.round(progress)}%</span>
                            </div>
                            <div className="h-1.5 w-full bg-emerald-800/50 rounded-full overflow-hidden">
                                <div className="h-full bg-white transition-all duration-700 ease-out shadow-[0_0_10px_rgba(255,255,255,0.5)]" style={{ width: `${progress}%` }}></div>
                            </div>
                        </div>
                    </div>

                    {/* Decorative Watermark */}
                    <Sparkles size={300} className="absolute -bottom-20 -right-20 opacity-10 -rotate-12 pointer-events-none" />
                </div>

                {/* Content Area */}
                <div className="flex-1 bg-stone-50 overflow-y-auto no-scrollbar relative p-8 md:p-16">
                    <div className="max-w-3xl mx-auto space-y-10 md:space-y-12 pb-24 md:pb-0">

                        {/* Description Section */}
                        <section className="animate-in fade-in slide-in-from-right-8 duration-700">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center shadow-sm">
                                    <MessageCircle size={18} />
                                </div>
                                <h4 className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-stone-400">A Reflexão</h4>
                            </div>
                            <p className="text-xl md:text-2xl text-stone-700 leading-relaxed font-serif">
                                {currentStep.description}
                            </p>
                        </section>

                        {/* Advice Cards */}
                        <div className="grid gap-4 md:grid-cols-1">
                            {currentStep.advice.map((item, i) => (
                                <div
                                    key={i}
                                    className="flex gap-4 p-5 md:p-6 bg-white rounded-3xl border border-stone-100 items-start hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-500/5 transition-all animate-in fade-in slide-in-from-bottom-4 duration-500"
                                    style={{ animationDelay: `${(i + 1) * 100}ms` }}
                                >
                                    <div className="mt-1 bg-emerald-50 text-emerald-600 p-2 rounded-xl flex-shrink-0">
                                        <CheckCircle2 size={16} />
                                    </div>
                                    <p className="text-stone-700 font-medium leading-relaxed text-sm md:text-base">{item}</p>
                                </div>
                            ))}
                        </div>

                        {/* Bible Verse Slide Component */}
                        <section className="relative p-10 md:p-12 bg-stone-900 rounded-[3rem] text-white overflow-hidden shadow-2xl group border border-stone-800">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] -mr-32 -mt-32"></div>
                            <div className="relative z-10 text-center">
                                <BookOpen className="mx-auto mb-6 text-emerald-400 opacity-80" size={32} />
                                <blockquote className="text-2xl md:text-3xl font-serif italic text-emerald-50 leading-relaxed mb-8">
                                    "{currentStep.verse}"
                                </blockquote>
                                <div className="inline-flex flex-col items-center">
                                    <div className="w-8 h-[2px] bg-emerald-500 mb-2"></div>
                                    <span className="text-xs font-black uppercase tracking-[0.4em] text-emerald-400">
                                        {currentStep.verseRef}
                                    </span>
                                </div>
                            </div>
                        </section>

                        {/* Action Challenge */}
                        <div className="bg-emerald-50/50 border-2 border-emerald-100 p-8 md:p-10 rounded-[2.5rem] relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-full h-1 bg-emerald-200"></div>
                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-700 mb-4 flex items-center gap-2 justify-center">
                                <Star size={14} fill="currentColor" className="text-orange-400" /> Desafio do Slide
                            </h4>
                            <p className="text-stone-800 text-lg md:text-xl font-black text-center leading-relaxed">
                                {currentStep.action}
                            </p>
                        </div>
                    </div>

                    {/* Sticky Footer Buttons inside Content Area on Mobile, Floating on desktop */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 bg-gradient-to-t from-stone-50 via-stone-50/95 to-transparent flex gap-4 items-center justify-between">
                        <div className="hidden md:flex gap-2">
                            {RECONNECTION_GUIDE.map((_, i) => (
                                <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === currentStepIndex ? 'w-8 bg-emerald-500' : 'w-2 bg-stone-300'}`}></div>
                            ))}
                        </div>
                        <div className="flex gap-4 w-full md:w-auto">
                            {currentStepIndex > 0 && (
                                <button
                                    onClick={prevStep}
                                    className="w-14 h-14 md:w-16 md:h-16 bg-white border border-stone-200 rounded-2xl flex items-center justify-center text-stone-600 hover:text-emerald-600 hover:border-emerald-200 transition-all shadow-xl active:scale-95 flex-shrink-0"
                                >
                                    <ChevronLeft size={32} />
                                </button>
                            )}
                            <button
                                onClick={nextStep}
                                className="flex-1 md:min-w-[240px] bg-stone-900 text-white rounded-[1.5rem] md:rounded-2xl h-14 md:h-16 font-black text-xs md:text-sm uppercase tracking-widest flex items-center justify-center gap-3 shadow-2xl hover:bg-emerald-700 transition-all active:scale-[0.98] group"
                            >
                                {currentStepIndex === RECONNECTION_GUIDE.length - 1 ? (
                                    <>{userProgress.completedManual ? 'Finalizado' : 'Finalizar Jornada'} <CheckCircle2 size={18} /></>
                                ) : (
                                    <>Próximo Slide <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" /></>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReconnectionGuide;
