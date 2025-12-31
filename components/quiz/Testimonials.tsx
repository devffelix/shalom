import React from 'react';
import { Star, Quote, CheckCircle2, Users, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    name: "Carlos Mendes",
    role: "Liberto há 6 meses",
    text: "Eu estava perdido no vício do álcool há 10 anos. Minha família já tinha desistido de mim e eu já não tinha esperança. O Shalom não me julgou, me acolheu. As orações da madrugada foram meu refúgio quando a vontade batia. Hoje estou limpo, trabalhando e minha esposa voltou pra casa. Deus é fiel e esse app foi o instrumento dEle!",
    initial: "C",
    bg: "bg-blue-100 text-blue-600"
  },
  {
    name: "Ana Paula Souza",
    role: "Venceu a Depressão",
    text: "A depressão me impedia até de levantar da cama. Sentia um vazio que nada preenchia, remédios não faziam mais efeito. Comecei com o devocional diário no WhatsApp. Aquela mensagem era o oxigênio que eu precisava. Hoje voltei a sorrir, parei de chorar sem motivo e até entrei pro ministério de louvor!",
    initial: "A",
    bg: "bg-pink-100 text-pink-600"
  },
  {
    name: "Roberto & Júlia",
    role: "Casamento Restaurado",
    text: "Nosso casamento estava por um fio. Já dormíamos em quartos separados e os papéis do divórcio estavam prontos. O desafio de 14 dias para casais mudou nossa perspectiva. Aprendemos a perdoar e orar juntos. Deus fez o milagre e renovamos nossos votos semana passada. Obrigado Shalom!",
    initial: "R",
    bg: "bg-orange-100 text-orange-600"
  },
  {
    name: "Fernanda Lima",
    role: "Milagre de Cura",
    text: "Recebi um diagnóstico médico terrível mês passado. O medo tentou me paralisar. Orei com o Guia Espiritual de madrugada, chorando muito. Senti uma paz sobrenatural invadir meu quarto. Refiz os exames ontem... o médico não acreditou e pediu pra repetir. O cisto sumiu! Glória a Deus!",
    initial: "F",
    bg: "bg-purple-100 text-purple-600"
  }
];

const Testimonials: React.FC = () => {
  return (
    <div className="py-16 relative overflow-hidden bg-[#fafaf9] dark:bg-black/20">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full bg-stone-50/50 dark:bg-stone-900/50 -skew-y-2 transform origin-top-left -z-10 scale-110"></div>
      
      <div className="text-center mb-16 px-4 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange/10 text-orange font-black text-xs uppercase tracking-widest mb-6 shadow-sm border border-orange/20">
            <Users size={12} fill="currentColor" /> Comunidade Viva
        </div>
        
        <h2 className="text-4xl md:text-6xl font-serif font-black text-ink dark:text-white mb-6 leading-tight">
            Todos adoram <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange to-gold relative">
                O Shalom
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-orange/20" viewBox="0 0 200 9" fill="currentColor" preserveAspectRatio="none">
                    <path d="M2.00025 6.99997C2.00025 6.99997 64.759 2.62229 108.961 2.04498C153.163 1.46767 197.965 9 197.965 9" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                </svg>
            </span>
        </h2>
        
        <p className="text-stone-600 dark:text-stone-300 max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed">
            Junte-se a mais de <span className="text-ink dark:text-white font-bold bg-stone-100 dark:bg-stone-800 px-2 py-0.5 rounded border border-stone-200 dark:border-stone-700">10.000 evangélicos</span> que já ativaram o Shalom nos últimos dias e estão <span className="text-green-600 dark:text-green-400 font-bold underline decoration-green-200 decoration-4 underline-offset-4 decoration-wavy">restaurando suas rotinas de fé</span>.
        </p>
      </div>

      <div className="relative group">
          <div className="flex gap-6 overflow-x-auto pb-8 px-6 snap-x no-scrollbar md:grid md:grid-cols-2 lg:grid-cols-2 md:max-w-5xl md:mx-auto relative z-10">
            {testimonials.map((t, i) => (
                <div key={i} className="snap-center shrink-0 w-[85vw] md:w-auto bg-white dark:bg-stone-900 p-8 rounded-[2.5rem] shadow-xl border border-stone-100 dark:border-stone-800 relative group hover:-translate-y-1 transition-transform duration-300">
                    <Quote className="absolute top-8 right-8 text-stone-100 dark:text-stone-800 h-16 w-16 transform rotate-12" />
                    
                    <div className="flex items-center gap-4 mb-6">
                        <div className={`w-14 h-14 rounded-full flex items-center justify-center font-black text-xl shadow-inner ${t.bg}`}>
                            {t.initial}
                        </div>
                        <div>
                            <h4 className="font-bold text-lg text-ink dark:text-white">{t.name}</h4>
                            <div className="flex items-center gap-1">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                <p className="text-xs font-bold text-stone-400 uppercase tracking-wider">{t.role}</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex text-gold mb-4">
                        {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" className="drop-shadow-sm" />)}
                    </div>

                    <p className="text-stone-600 dark:text-stone-300 font-medium leading-relaxed italic relative z-10 text-sm md:text-base">
                        "{t.text}"
                    </p>
                </div>
            ))}
          </div>
          
          {/* Scroll Arrow Indicator - Visible only on mobile */}
          <div className="absolute top-1/2 right-2 -translate-y-1/2 z-20 md:hidden pointer-events-none">
              <div className="bg-white/80 dark:bg-stone-800/80 backdrop-blur-sm p-3 rounded-full shadow-lg border border-orange/20 text-orange animate-pulse">
                  <ChevronRight size={24} />
              </div>
          </div>
      </div>
      
      {/* Trust Indicator */}
      <div className="text-center mt-8 opacity-60">
          <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest flex items-center justify-center gap-2">
             <CheckCircle2 size={12} /> Histórias reais enviadas por membros da comunidade
          </p>
      </div>
    </div>
  );
};

export default Testimonials;