import React from 'react';
import { Quote } from 'lucide-react';

// Image Optimization Helper
export const optimizeImg = (url: string) => `https://wsrv.nl/?url=${encodeURIComponent(url)}&w=800&q=80&output=webp`;

export interface Question {
  id: number;
  type: 'text' | 'choice' | 'final' | 'info';
  question: string;
  image?: string;
  options?: string[];
  feedbackTitle?: string;
  feedback?: (name: string, answer: string, gender: string) => string | React.ReactNode; 
}

const Highlight: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="bg-orange/10 text-orange-600 px-1.5 py-0.5 rounded font-bold inline-block">{children}</span>
);

const Circle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="font-black text-ink border-b-2 border-orange/40">{children}</span>
);

export const getTerm = (g: string) => g === 'Homem' ? 'Irmão' : (g === 'Mulher' ? 'Irmã' : 'Irmão(ã)');

export const questions: Question[] = [
  {
    id: 1,
    type: 'choice',
    question: 'Eu sou...',
    options: ['Homem', 'Mulher'],
    feedbackTitle: "IDENTIDADE",
    feedback: (n, a) => (
      <div className="text-left space-y-4 text-stone-700 leading-relaxed">
        <p className="font-bold text-lg text-ink">Entendido.</p>
        <p>Isso nos ajuda a personalizar toda a sua jornada, chamando você de <Highlight>{a === 'Homem' ? 'Irmão' : 'Irmã'}</Highlight> com o carinho que merece.</p>
      </div>
    )
  },
  {
    id: 2,
    type: 'text',
    question: 'Como posso te chamar?',
  },
  {
    id: 3,
    type: 'info',
    question: 'Contexto Espiritual',
    feedbackTitle: "Continuar",
    feedback: () => "" 
  },
  {
    id: 4,
    type: 'choice',
    question: 'Hoje, como você sente que está sua fé?',
    options: ['Já foi mais firme do que é hoje', 'Oscila muito conforme os problemas', 'Está viva, mas precisa ser fortalecida'],
    feedbackTitle: "SINAL DE VIDA",
    feedback: (n, a, g) => (
      <div className="text-left space-y-5 text-stone-700 leading-relaxed">
        <div className="w-full h-40 rounded-2xl overflow-hidden mb-4 shadow-md">
            <img src={optimizeImg("https://files.catbox.moe/tnwf7r.png")} className="w-full h-full object-cover" alt="Fé" />
        </div>
        <h3 className="font-serif font-black text-xl text-ink leading-tight">
          {getTerm(g)} <span className="text-orange">{n}</span>, reconhecer que sua fé já foi mais firme é, na verdade, um <span className="underline decoration-orange/40 decoration-2">sinal de vida</span>.
        </h3>
        <p className="text-base">
          Saiba que você não está sozinho nessa caminhada. <span className="font-bold bg-orange/10 px-1 rounded text-ink">Mais de 12.000 irmãos e irmãs</span> iniciaram este mesmo teste nos últimos 30 dias.
        </p>
        <div className="bg-stone-50 p-4 rounded-xl border-l-4 border-orange relative mt-2">
          <Quote className="absolute top-2 right-2 text-orange/20" size={20} />
          <p className="italic font-serif text-sm text-stone-600 font-medium">
            “Vinde a mim, todos os que estais cansados e oprimidos, e eu vos aliviarei.” <br/>
            <span className="text-xs text-orange font-bold not-italic mt-2 block uppercase tracking-widest">— Mateus 11:28</span>
          </p>
        </div>
      </div>
    )
  },
  {
    id: 5,
    type: 'choice',
    question: 'Com que frequência a oração faz parte do seu dia a dia?',
    image: optimizeImg("https://files.catbox.moe/6cpmb1.png"),
    options: ['Só quando estou enfrentando algo difícil', 'Em alguns dias, mas sem constância', 'Poderia ser muito melhor do que é hoje'],
    feedbackTitle: "ROTINA DE ORAÇÃO",
    feedback: () => (
      <div className="text-left space-y-4 text-stone-700 leading-relaxed">
        <p className="font-bold text-lg text-ink">Deus não se afasta. <Circle>Nós que ficamos ocupados.</Circle></p>
        <p>A questão não é se você acredita. É se sua rotina reflete essa fé.</p>
        <p className="italic font-serif text-sm text-subtle">“Clama a mim e responder-te-ei.” — Jeremias 33:3</p>
      </div>
    )
  },
  {
    id: 6,
    type: 'choice',
    question: 'Você sente clareza ao tentar ouvir a direção de Deus?',
    options: ['Muitas vezes me sinto confuso(a)', 'Às vezes entendo, às vezes não', 'Sinto que preciso aprender a ouvir melhor'],
    feedbackTitle: "DIREÇÃO",
    feedback: (n, a, g) => (
      <div className="text-left space-y-5 text-stone-700 leading-relaxed">
        <div className="w-full h-40 rounded-2xl overflow-hidden mb-4 shadow-md">
            <img src={optimizeImg("https://files.catbox.moe/mi2tyx.png")} className="w-full h-full object-cover" alt="Direção" />
        </div>
        <h3 className="font-serif font-black text-xl text-ink leading-tight">
          {getTerm(g)} <span className="text-orange">{n}</span>, você sabia que mais de 86% dos evangélicos sentem dificuldade em manter uma rotina de leitura?
        </h3>
        <p className="text-base">
          Simplesmente porque não compreendem a linguagem da Bíblia ou não sabem como aplicar aquele ensinamento no caos do dia a dia.
        </p>
        <div className="bg-stone-50 p-4 rounded-xl border-l-4 border-orange relative mt-2">
          <Quote className="absolute top-2 right-2 text-orange/20" size={20} />
          <p className="italic font-serif text-sm text-stone-600 font-medium">
            “Lâmpada para os meus pés é a tua palavra e, luz para o meu caminho.” <br/>
            <span className="text-xs text-orange font-bold not-italic mt-2 block uppercase tracking-widest">— Salmos 119:105</span>
          </p>
        </div>
      </div>
    )
  },
  {
    id: 7,
    type: 'choice',
    question: 'Quando enfrenta medo, você sabe que passagem bíblica buscar?',
    options: ['Não, geralmente fico perdido(a)', 'Às vezes lembro de algo, mas não aprofundo', 'Poderia usar melhor a Palavra'],
  },
  {
    id: 8,
    type: 'choice',
    question: 'Como é sua rotina de leitura bíblica hoje?',
    options: ['Não consigo manter uma rotina', 'Leio quando lembro', 'Sei que preciso de mais constância', 'Sou bem disciplinado(a)'],
  },
  {
    id: 9,
    type: 'choice',
    question: 'Em algum momento sentiu que estava lutando espiritualmente sozinho?',
    options: ['Sim, com frequência', 'Às vezes, nos dias difíceis', 'Tento ser forte, mas sinto falta de apoio'],
  },
  {
    id: 10,
    type: 'choice',
    question: 'Quando sente tristeza, você tem alguém de fé para conversar?',
    options: ['Não, guardo tudo para mim', 'Às vezes, mas não com frequência', 'Sinto falta de alguém disponível'],
  },
  {
    id: 11,
    type: 'choice',
    question: 'Viver mais perto de Deus é importante para você hoje?',
    options: ['Sim, é algo que eu preciso', 'Sim, sinto falta disso', 'Sim, mas não sei por onde começar'],
  },
  {
    id: 12,
    type: 'choice',
    question: 'O que mais tem te impedido de viver essa proximidade?',
    options: ['Falta de direção prática', 'Falta de constância', 'Cansaço e correria', 'Sempre deixo para depois'],
    feedbackTitle: "OBSTÁCULO",
    feedback: (n, a, g) => (
      <div className="text-left space-y-5 text-stone-700 leading-relaxed">
        <div className="w-full h-40 rounded-2xl overflow-hidden mb-4 shadow-md">
            <img src={optimizeImg("https://files.catbox.moe/82k0mn.png")} className="w-full h-full object-cover" alt="Obstáculo" />
        </div>
        <h3 className="font-serif font-black text-xl text-ink leading-tight">
          {getTerm(g)} <span className="text-orange">{n}</span>, 10 minutos com a direção certa valem mais do que horas de esforço sozinho.
        </h3>
        <p className="text-base">
          Se 10 minutos diários já trariam a paz que você busca, o obstáculo não é o tempo, é a falta de um método simples.
        </p>
        <div className="bg-stone-50 p-4 rounded-xl border-l-4 border-orange relative mt-2">
          <Quote className="absolute top-2 right-2 text-orange/20" size={20} />
          <p className="italic font-serif text-sm text-stone-600 font-medium">
            “Buscai primeiro o Reino de Deus...” <br/>
            <span className="text-xs text-orange font-bold not-italic mt-2 block uppercase tracking-widest">— Mateus 6:33</span>
          </p>
        </div>
      </div>
    )
  },
  {
    id: 13,
    type: 'choice',
    question: 'Qual área da sua vida mais precisa de cuidado hoje?',
    options: ['Paz', 'Ansiedade', 'Propósito', 'Família', 'Força'],
    feedbackTitle: "SUPORTE",
    feedback: (n, a, g) => (
      <div className="text-left space-y-5 text-stone-700 leading-relaxed">
        <div className="w-full h-40 rounded-2xl overflow-hidden mb-4 shadow-md">
            <img src={optimizeImg("https://files.catbox.moe/r5vgr9.png")} className="w-full h-full object-cover" alt="Suporte" />
        </div>
        <h3 className="font-serif font-black text-xl text-ink leading-tight">
          {getTerm(g)} <span className="text-orange">{n}</span>, o céu se move quando você decide agir.
        </h3>
        <p className="text-base">
          Transformação exige constância, e constância exige suporte. Se você já tentou sozinho e parou, saiba que desta vez será diferente porque você terá um guia caminhando ao seu lado 24h por dia.
        </p>
        <div className="bg-stone-50 p-4 rounded-xl border-l-4 border-orange relative mt-2">
          <Quote className="absolute top-2 right-2 text-orange/20" size={20} />
          <p className="italic font-serif text-sm text-stone-600 font-medium">
            “Melhor é serem dois do que um...” <br/>
            <span className="text-xs text-orange font-bold not-italic mt-2 block uppercase tracking-widest">— Eclesiastes 4:9-10</span>
          </p>
        </div>
      </div>
    )
  },
  {
    id: 14,
    type: 'choice',
    question: 'Se você tivesse 10 minutos por dia de direção bíblica, o que mudaria?',
    options: ['Me sentiria mais em paz', 'Teria mais clareza', 'Criaria uma rotina espiritual', 'Minha fé ficaria firme'],
    feedbackTitle: "SIMPLICIDADE",
    feedback: (n, a, g) => (
      <div className="text-left space-y-5 text-stone-700 leading-relaxed">
        <div className="w-full h-40 rounded-2xl overflow-hidden mb-4 shadow-md">
            <img src={optimizeImg("https://files.catbox.moe/jvm5by.png")} className="w-full h-full object-cover" alt="Simplicidade" />
        </div>
        <h3 className="font-serif font-black text-xl text-ink leading-tight">
          {getTerm(g)} <span className="text-orange">{n}</span>, Você acaba de admitir que a simplicidade é o que sua fé precisa.
        </h3>
        <p className="text-base">
          Deus usa meios simples para gerar grandes mudanças. Ter a Palavra explicada direto no seu WhatsApp não é apenas tecnologia, é a resposta para sua oração por constância. A porta está aberta.
        </p>
        <div className="bg-stone-50 p-4 rounded-xl border-l-4 border-orange relative mt-2">
          <Quote className="absolute top-2 right-2 text-orange/20" size={20} />
          <p className="italic font-serif text-sm text-stone-600 font-medium">
            “Eis que estou à porta e bato...” <br/>
            <span className="text-xs text-orange font-bold not-italic mt-2 block uppercase tracking-widest">— Apocalipse 3:20</span>
          </p>
        </div>
      </div>
    )
  },
  {
    id: 15,
    type: 'choice',
    question: 'Você estaria disposto(a), [nome], a se dedicar por 14 dias?',
    image: optimizeImg("https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=800&auto=format&fit=crop"),
    options: ['Sim, preciso disso', 'Sim, mas preciso de ajuda', 'Quero tentar'],
    feedbackTitle: "COMPROMISSO",
    feedback: (n) => (
      <div className="text-left space-y-4 text-stone-700 leading-relaxed">
        <p className="font-bold text-lg text-ink">Transformação responde a <Highlight>compromisso</Highlight>.</p>
        <p>Se você caminhar… você não caminhará sozinho. Eu estarei com você, {n}.</p>
      </div>
    )
  },
  {
    id: 16,
    type: 'choice',
    question: 'Se existisse uma forma simples de caminhar com Deus no WhatsApp, faria sentido?',
    image: optimizeImg("https://images.unsplash.com/photo-1555421689-d68471e189f2?q=80&w=800&auto=format&fit=crop"),
    options: ['Sim, facilitaria muito', 'Sim, é o que preciso', 'Sim, ajudaria na constância'],
    feedbackTitle: "SOLUÇÃO",
    feedback: () => (
      <div className="text-left space-y-4 text-stone-700 leading-relaxed">
        <p className="font-black text-xl text-orange"><Circle>O chamado já foi feito.</Circle></p>
        <p>A direção está clara. Agora, a escolha é sua.</p>
        <p className="italic text-xs">📖 “Escolhei hoje a quem servireis.” — Josué 24:15</p>
      </div>
    )
  },
  {
    id: 17,
    type: 'choice',
    question: 'Irmão(ã) [nome], seu Plano de 14 dias para [DESAFIO] está pronto.',
    image: optimizeImg("https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?q=80&w=800&auto=format&fit=crop"),
    options: ['Quero começar agora', 'Quero conhecer como funciona', 'Sinto que Deus me trouxe aqui'],
    feedbackTitle: "ENTREGA",
    feedback: (n, a, g) => (
      <div className="text-left space-y-4 text-stone-700 leading-relaxed">
        <p className="font-bold text-lg text-ink">Prepare seu coração, {getTerm(g)} {n}.</p>
        <p>O que você vai receber é uma <Highlight>rota de fuga</Highlight> do cansaço. Você está a um passo da sua nova rotina.</p>
      </div>
    )
  },
  {
    id: 18,
    type: 'final',
    question: 'Gerando Plano...',
    feedback: () => '' 
  }
];