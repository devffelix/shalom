
import { BibleBook, Challenge, ChallengeDayContent, Badge, Virtue, UserGoals, TriviaCategory } from './types';

// Gamification Constants
export const XP_PER_CHAPTER = 50;
export const XP_PER_CHALLENGE_DAY = 100;
export const XP_PER_BADGE = 500; // Bonus XP for earning a generic badge
export const XP_REWARD_JOURNEY = 200; // Specific reward for claiming a journey
export const XP_PER_TRIVIA = 30; // XP por resposta correta no trivia

export const INITIAL_GOALS: UserGoals = {
  dailyChapters: 3,
  dailyStudyMinutes: 15,
  focusVirtue: 'hope',
  targetJourneyId: null
};

// Organized Trivia Categories
export const TRIVIA_CATEGORIES: TriviaCategory[] = [
  {
    id: 'jesus',
    title: 'A Vida de Jesus',
    description: 'Milagres, parábolas e o ministério do Messias.',
    icon: 'Cross',
    gradient: 'from-red-500 to-rose-600',
    questions: [
      {
        id: 101,
        question: "Onde Jesus realizou seu primeiro milagre?",
        options: ["Nazaré", "Cafarnaum", "Caná", "Jerusalém"],
        correctAnswer: "Caná",
        reference: "João 2:11",
        explanation: "Jesus transformou água em vinho nas bodas de Caná da Galileia."
      },
      {
        id: 102,
        question: "Qual o nome do apóstolo que Jesus disse ser a 'pedra'?",
        options: ["João", "Pedro", "Paulo", "Tiago"],
        correctAnswer: "Pedro",
        reference: "Mateus 16:18",
        explanation: "Jesus disse: 'Tu és Pedro, e sobre esta pedra edificarei a minha igreja'."
      },
      {
        id: 103,
        question: "Quantos dias Jesus jejuou no deserto?",
        options: ["3 dias", "7 dias", "12 dias", "40 dias"],
        correctAnswer: "40 dias",
        reference: "Mateus 4:2",
        explanation: "Jesus jejuou quarenta dias e quarenta noites antes de ser tentado pelo diabo."
      },
      {
        id: 104,
        question: "Quem negou Jesus três vezes?",
        options: ["Judas", "Tomé", "Pedro", "André"],
        correctAnswer: "Pedro",
        reference: "Lucas 22:61",
        explanation: "Pedro negou conhecer Jesus antes que o galo cantasse, conforme profetizado."
      },
      {
        id: 105,
        question: "Qual é o menor versículo da Bíblia (sobre Jesus)?",
        options: ["Deus é amor", "Jesus chorou", "Orai sem cessar", "No princípio"],
        correctAnswer: "Jesus chorou",
        reference: "João 11:35",
        explanation: "O versículo mais curto descreve a humanidade e compaixão de Jesus."
      }
    ]
  },
  {
    id: 'parables',
    title: 'Parábolas',
    description: 'As histórias que ensinam verdades eternas.',
    icon: 'BookOpen',
    gradient: 'from-emerald-500 to-teal-600',
    questions: [
      {
        id: 501,
        question: "Na parábola do Filho Pródigo, o que o pai fez quando viu o filho voltando?",
        options: ["Fechou a porta", "Correu e o abraçou", "Esperou ele pedir perdão", "Mandou os servos expulsá-lo"],
        correctAnswer: "Correu e o abraçou",
        reference: "Lucas 15:20",
        explanation: "O pai, movido de íntima compaixão, correu, lançou-se ao pescoço dele e o beijou."
      },
      {
        id: 502,
        question: "O que o Bom Samaritano usou para curar as feridas do homem?",
        options: ["Água e Sal", "Azeite e Vinho", "Mel e Ervas", "Apenas orou"],
        correctAnswer: "Azeite e Vinho",
        reference: "Lucas 10:34",
        explanation: "Ele atou-lhe as feridas, deitando-lhes azeite e vinho."
      },
      {
        id: 503,
        question: "Onde o homem sábio construiu sua casa?",
        options: ["Na Areia", "Na Terra Fértil", "Na Rocha", "No Monte"],
        correctAnswer: "Na Rocha",
        reference: "Mateus 7:24",
        explanation: "Aquele que ouve as palavras de Jesus e as pratica é comparado ao homem que edificou sobre a rocha."
      },
      {
        id: 504,
        question: "Quantas ovelhas o pastor deixou para buscar a perdida?",
        options: ["10", "50", "99", "100"],
        correctAnswer: "99",
        reference: "Lucas 15:4",
        explanation: "Ele deixou as noventa e nove no deserto para buscar a que se havia perdido."
      }
    ]
  },
  {
    id: 'old_testament',
    title: 'Antigo Testamento',
    description: 'Heróis, profetas e as grandes histórias da criação.',
    icon: 'Scroll',
    gradient: 'from-gold-dark to-orange',
    questions: [
      {
        id: 201,
        question: "Quem foi engolido por um grande peixe?",
        options: ["Moisés", "Noé", "Jonas", "Elias"],
        correctAnswer: "Jonas",
        reference: "Jonas 1:17",
        explanation: "Jonas foi engolido por um grande peixe preparado por Deus após fugir de sua missão."
      },
      {
        id: 202,
        question: "Quem derrubou as muralhas de Jericó?",
        options: ["Josué", "Davi", "Sansão", "Gideão"],
        correctAnswer: "Josué",
        reference: "Josué 6",
        explanation: "Sob a liderança de Josué, o povo marchou e tocou trombetas, e as muralhas caíram."
      },
      {
        id: 203,
        question: "Quem foi vendido por seus irmãos como escravo?",
        options: ["Jacó", "José", "Benjamim", "Judá"],
        correctAnswer: "José",
        reference: "Gênesis 37",
        explanation: "José do Egito foi vendido por inveja de seus irmãos, mas Deus o exaltou."
      },
      {
        id: 204,
        question: "Quem abriu o Mar Vermelho?",
        options: ["Deus, através de Moisés", "Arão", "Josué", "Faraó"],
        correctAnswer: "Deus, através de Moisés",
        reference: "Êxodo 14",
        explanation: "Moisés estendeu a mão sobre o mar, e o Senhor o dividiu."
      },
      {
        id: 205,
        question: "Qual rei pediu sabedoria a Deus?",
        options: ["Davi", "Salomão", "Saul", "Ezequias"],
        correctAnswer: "Salomão",
        reference: "1 Reis 3:9",
        explanation: "Salomão pediu um coração compreensivo para julgar o povo, em vez de riquezas."
      }
    ]
  },
  {
    id: 'women',
    title: 'Mulheres de Fé',
    description: 'Heroínas que mudaram a história bíblica.',
    icon: 'Heart',
    gradient: 'from-pink-500 to-rose-500',
    questions: [
      {
        id: 601,
        question: "Quem disse: 'Para onde fores, irei; onde repousares, repousarei'?",
        options: ["Ester", "Noemi", "Rute", "Sara"],
        correctAnswer: "Rute",
        reference: "Rute 1:16",
        explanation: "Rute demonstrou lealdade inabalável à sua sogra Noemi e ao Deus de Israel."
      },
      {
        id: 602,
        question: "Qual rainha salvou o povo judeu da morte?",
        options: ["Vasti", "Jezabel", "Ester", "Bate-Seba"],
        correctAnswer: "Ester",
        reference: "Livro de Ester",
        explanation: "Ester arriscou sua vida ao entrar na presença do rei sem ser chamada para interceder por seu povo."
      },
      {
        id: 603,
        question: "Quem foi a mãe do profeta Samuel?",
        options: ["Penina", "Ana", "Raquel", "Lia"],
        correctAnswer: "Ana",
        reference: "1 Samuel 1",
        explanation: "Ana orou fervorosamente por um filho e o consagrou ao Senhor."
      },
      {
        id: 604,
        question: "Quem riu quando ouviu que teria um filho na velhice?",
        options: ["Rebeca", "Sara", "Isabel", "Hagar"],
        correctAnswer: "Sara",
        reference: "Gênesis 18:12",
        explanation: "Sara riu dentro de si, duvidando da promessa devido à sua idade avançada."
      }
    ]
  },
  {
    id: 'paul',
    title: 'Apóstolo Paulo',
    description: 'Viagens missionárias e cartas às igrejas.',
    icon: 'Map',
    gradient: 'from-blue-600 to-indigo-600',
    questions: [
      {
        id: 301,
        question: "Qual era o nome de Paulo antes de sua conversão?",
        options: ["Simão", "Saulo", "Estêvão", "Barnabé"],
        correctAnswer: "Saulo",
        reference: "Atos 9",
        explanation: "Ele era conhecido como Saulo de Tarso, um perseguidor dos cristãos."
      },
      {
        id: 302,
        question: "Em qual estrada Paulo teve um encontro com Jesus?",
        options: ["Estrada de Jericó", "Estrada de Emaús", "Estrada de Damasco", "Estrada de Jerusalém"],
        correctAnswer: "Estrada de Damasco",
        reference: "Atos 9:3",
        explanation: "Uma luz do céu brilhou ao seu redor enquanto ele ia para Damasco."
      },
      {
        id: 303,
        question: "Qual profissão Paulo exercia para se sustentar?",
        options: ["Carpinteiro", "Pescador", "Fabricante de Tendas", "Cobrador de Impostos"],
        correctAnswer: "Fabricante de Tendas",
        reference: "Atos 18:3",
        explanation: "Paulo trabalhava fazendo tendas para não ser pesado às igrejas."
      },
      {
        id: 304,
        question: "Quantas viagens missionárias principais Paulo fez?",
        options: ["Uma", "Duas", "Três", "Cinco"],
        correctAnswer: "Três",
        reference: "Atos 13-21",
        explanation: "O livro de Atos registra três grandes viagens missionárias de Paulo."
      },
      {
        id: 305,
        question: "De onde Paulo escreveu a carta aos Filipenses?",
        options: ["De sua casa", "Do templo", "Da prisão", "De um navio"],
        correctAnswer: "Da prisão",
        reference: "Filipenses 1:13",
        explanation: "Filipenses é conhecida como uma das 'Cartas da Prisão'."
      }
    ]
  },
  {
    id: 'wisdom',
    title: 'Sabedoria',
    description: 'Provérbios, Salmos e ensinamentos práticos.',
    icon: 'Brain',
    gradient: 'from-purple-500 to-violet-600',
    questions: [
      {
        id: 401,
        question: "O temor do Senhor é o princípio do quê?",
        options: ["Da Riqueza", "Do Conhecimento", "Da Felicidade", "Da Saúde"],
        correctAnswer: "Do Conhecimento",
        reference: "Provérbios 1:7",
        explanation: "O temor do Senhor é o princípio do conhecimento, mas os insensatos desprezam a sabedoria."
      },
      {
        id: 402,
        question: "Quem escreveu a maioria dos Salmos?",
        options: ["Moisés", "Asafe", "Salomão", "Davi"],
        correctAnswer: "Davi",
        reference: "Livro de Salmos",
        explanation: "Davi é atribuído como autor de cerca de metade dos Salmos."
      },
      {
        id: 403,
        question: "O que a Bíblia diz que vale mais que o rubis?",
        options: ["O Ouro", "A Prata", "A Sabedoria", "A Fama"],
        correctAnswer: "A Sabedoria",
        reference: "Provérbios 8:11",
        explanation: "Porque melhor é a sabedoria do que os rubis; e tudo o que mais se deseja não se pode comparar a ela."
      }
    ]
  },
  {
    id: 'prophets',
    title: 'Profetas',
    description: 'Vozes que clamaram no deserto.',
    icon: 'Flame',
    gradient: 'from-orange-600 to-red-700',
    questions: [
      {
        id: 701,
        question: "Qual profeta foi alimentado por corvos?",
        options: ["Eliseu", "Isaías", "Elias", "Jeremias"],
        correctAnswer: "Elias",
        reference: "1 Reis 17:6",
        explanation: "Deus ordenou aos corvos que levassem pão e carne para Elias no ribeiro de Querite."
      },
      {
        id: 702,
        question: "Quem é conhecido como o 'Profeta Chorão'?",
        options: ["Daniel", "Jeremias", "Ezequiel", "Oséias"],
        correctAnswer: "Jeremias",
        reference: "Livro de Jeremias",
        explanation: "Jeremias chorou muito pela destruição de Jerusalém e pela rebeldia do povo."
      },
      {
        id: 703,
        question: "Qual profeta viu um vale de ossos secos reviver?",
        options: ["Ezequiel", "Isaías", "Joel", "Amós"],
        correctAnswer: "Ezequiel",
        reference: "Ezequiel 37",
        explanation: "A visão dos ossos secos representava a restauração da casa de Israel."
      }
    ]
  }
];

export const VIRTUES: Virtue[] = [
  {
    id: 'hope',
    name: 'Esperança',
    description: 'Confiança inabalável no futuro de Deus.',
    icon: 'Anchor',
    colorFrom: 'from-blue-400',
    colorTo: 'to-cyan-300'
  },
  {
    id: 'charity',
    name: 'Caridade',
    description: 'Amor em ação ao próximo.',
    icon: 'HeartHandshake',
    colorFrom: 'from-rose-400',
    colorTo: 'to-pink-300'
  },
  {
    id: 'faith',
    name: 'Fé',
    description: 'Certeza das coisas que não se veem.',
    icon: 'Shield',
    colorFrom: 'from-gold',
    colorTo: 'to-orange'
  },
  {
    id: 'patience',
    name: 'Paciência',
    description: 'Paz durante a espera.',
    icon: 'Hourglass',
    colorFrom: 'from-emerald-400',
    colorTo: 'to-green-300'
  },
  {
    id: 'wisdom',
    name: 'Sabedoria',
    description: 'Discernimento para escolhas divinas.',
    icon: 'Brain',
    colorFrom: 'from-purple-400',
    colorTo: 'to-indigo-300'
  },
  {
    id: 'courage',
    name: 'Coragem',
    description: 'Força para agir apesar do medo.',
    icon: 'Sword',
    colorFrom: 'from-red-500',
    colorTo: 'to-orange-400'
  }
];

export const USER_LEVELS = [
  { level: 1, xp: 0, title: "Peregrino da Fé" },
  { level: 2, xp: 100, title: "Discípulo Iniciante" },
  { level: 3, xp: 300, title: "Servo Dedicado" },
  { level: 4, xp: 600, title: "Guerreiro de Oração" },
  { level: 5, xp: 1000, title: "Semeador da Verdade" },
  { level: 6, xp: 1500, title: "Mestre da Palavra" },
  { level: 7, xp: 2200, title: "Guardião do Templo" },
  { level: 8, xp: 3000, title: "Profeta do Reino" },
  { level: 9, xp: 4000, title: "Apóstolo da Paz" },
  { level: 10, xp: 5500, title: "Embaixador do Céu" }
];

export const STATIC_BADGES: Badge[] = [
  {
    id: 'badge_anxiety',
    title: 'Mente de Paz',
    description: 'Completou o Detox de Ansiedade.',
    icon: 'Brain',
    type: 'journey'
  },
  {
    id: 'badge_gratitude',
    title: 'Coração Grato',
    description: 'Completou a Jornada da Gratidão.',
    icon: 'Heart',
    type: 'journey'
  },
  {
    id: 'badge_proverbs',
    title: 'Sábio',
    description: 'Completou a Sabedoria de Provérbios.',
    icon: 'Scroll',
    type: 'journey'
  },
  {
    id: 'badge_healing',
    title: 'Fé Curadora',
    description: 'Completou a Jornada de Cura.',
    icon: 'Cross',
    type: 'journey'
  },
  {
    id: 'badge_doors',
    title: 'Portas Abertas',
    description: 'Completou a Jornada de Provisão.',
    icon: 'Key',
    type: 'journey'
  },
  {
    id: 'badge_restoration',
    title: 'Restaurador',
    description: 'Completou a Jornada de Restauração.',
    icon: 'Users',
    type: 'journey'
  },
  {
    id: 'badge_impossible',
    title: 'Movimentador de Montes',
    description: 'Completou a Jornada de Causas Impossíveis.',
    icon: 'Mountain',
    type: 'journey'
  }
];

export const BIBLE_BOOKS: BibleBook[] = [
  // Antigo Testamento
  { name: 'Gênesis', englishName: 'Genesis', chapters: 50, testament: 'Old', abbrev: 'gn' },
  { name: 'Êxodo', englishName: 'Exodus', chapters: 40, testament: 'Old', abbrev: 'ex' },
  { name: 'Levítico', englishName: 'Leviticus', chapters: 27, testament: 'Old', abbrev: 'lv' },
  { name: 'Números', englishName: 'Numbers', chapters: 36, testament: 'Old', abbrev: 'nm' },
  { name: 'Deuteronômio', englishName: 'Deuteronomy', chapters: 34, testament: 'Old', abbrev: 'dt' },
  { name: 'Josué', englishName: 'Joshua', chapters: 24, testament: 'Old', abbrev: 'js' },
  { name: 'Juízes', englishName: 'Judges', chapters: 21, testament: 'Old', abbrev: 'jg' },
  { name: 'Rute', englishName: 'Ruth', chapters: 4, testament: 'Old', abbrev: 'rt' },
  { name: '1 Samuel', englishName: '1 Samuel', chapters: 31, testament: 'Old', abbrev: '1sm' },
  { name: '2 Samuel', englishName: '2 Samuel', chapters: 24, testament: 'Old', abbrev: '2sm' },
  { name: '1 Reis', englishName: '1 Kings', chapters: 22, testament: 'Old', abbrev: '1ki' },
  { name: '2 Reis', englishName: '2 Kings', chapters: 25, testament: 'Old', abbrev: '2ki' },
  { name: '1 Crônicas', englishName: '1 Chronicles', chapters: 29, testament: 'Old', abbrev: '1ch' },
  { name: '2 Crônicas', englishName: '2 Chronicles', chapters: 36, testament: 'Old', abbrev: '2ch' },
  { name: 'Esdras', englishName: 'Ezra', chapters: 10, testament: 'Old', abbrev: 'ez' },
  { name: 'Neemias', englishName: 'Nehemiah', chapters: 13, testament: 'Old', abbrev: 'ne' },
  { name: 'Ester', englishName: 'Esther', chapters: 10, testament: 'Old', abbrev: 'es' },
  { name: 'Jó', englishName: 'Job', chapters: 42, testament: 'Old', abbrev: 'jb' },
  { name: 'Salmos', englishName: 'Psalms', chapters: 150, testament: 'Old', abbrev: 'ps' },
  { name: 'Provérbios', englishName: 'Proverbs', chapters: 31, testament: 'Old', abbrev: 'pr' },
  { name: 'Eclesiastes', englishName: 'Ecclesiastes', chapters: 12, testament: 'Old', abbrev: 'ec' },
  { name: 'Cânticos', englishName: 'Song of Solomon', chapters: 8, testament: 'Old', abbrev: 'so' },
  { name: 'Isaías', englishName: 'Isaiah', chapters: 66, testament: 'Old', abbrev: 'is' },
  { name: 'Jeremias', englishName: 'Jeremiah', chapters: 52, testament: 'Old', abbrev: 'je' },
  { name: 'Lamentações', englishName: 'Lamentations', chapters: 5, testament: 'Old', abbrev: 'lm' },
  { name: 'Ezequiel', englishName: 'Ezekiel', chapters: 48, testament: 'Old', abbrev: 'ek' },
  { name: 'Daniel', englishName: 'Daniel', chapters: 12, testament: 'Old', abbrev: 'da' },
  { name: 'Oseias', englishName: 'Hosea', chapters: 14, testament: 'Old', abbrev: 'ho' },
  { name: 'Joel', englishName: 'Joel', chapters: 3, testament: 'Old', abbrev: 'jl' },
  { name: 'Amós', englishName: 'Amos', chapters: 9, testament: 'Old', abbrev: 'am' },
  { name: 'Obadias', englishName: 'Obadiah', chapters: 1, testament: 'Old', abbrev: 'ob' },
  { name: 'Jonas', englishName: 'Jonah', chapters: 4, testament: 'Old', abbrev: 'jn' },
  { name: 'Miqueias', englishName: 'Micah', chapters: 7, testament: 'Old', abbrev: 'mi' },
  { name: 'Naum', englishName: 'Nahum', chapters: 3, testament: 'Old', abbrev: 'na' },
  { name: 'Habacuque', englishName: 'Habakkuk', chapters: 3, testament: 'Old', abbrev: 'hk' },
  { name: 'Sofonias', englishName: 'Zephaniah', chapters: 3, testament: 'Old', abbrev: 'zp' },
  { name: 'Ageu', englishName: 'Haggai', chapters: 2, testament: 'Old', abbrev: 'hg' },
  { name: 'Zacarias', englishName: 'Zechariah', chapters: 14, testament: 'Old', abbrev: 'zc' },
  { name: 'Malaquias', englishName: 'Malachi', chapters: 4, testament: 'Old', abbrev: 'ml' },
  // Novo Testamento
  { name: 'Mateus', englishName: 'Matthew', chapters: 28, testament: 'New', abbrev: 'mt' },
  { name: 'Marcos', englishName: 'Mark', chapters: 16, testament: 'New', abbrev: 'mk' },
  { name: 'Lucas', englishName: 'Luke', chapters: 24, testament: 'New', abbrev: 'lk' },
  { name: 'João', englishName: 'John', chapters: 21, testament: 'New', abbrev: 'jn' },
  { name: 'Atos', englishName: 'Acts', chapters: 28, testament: 'New', abbrev: 'ac' },
  { name: 'Romanos', englishName: 'Romans', chapters: 16, testament: 'New', abbrev: 'rm' },
  { name: '1 Coríntios', englishName: '1 Corinthians', chapters: 16, testament: 'New', abbrev: '1co' },
  { name: '2 Coríntios', englishName: '2 Corinthians', chapters: 13, testament: 'New', abbrev: '2co' },
  { name: 'Gálatas', englishName: 'Galatians', chapters: 6, testament: 'New', abbrev: 'ga' },
  { name: 'Efésios', englishName: 'Ephesians', chapters: 6, testament: 'New', abbrev: 'ep' },
  { name: 'Filipenses', englishName: 'Philippians', chapters: 4, testament: 'New', abbrev: 'ph' },
  { name: 'Colossenses', englishName: 'Colossians', chapters: 4, testament: 'New', abbrev: 'cl' },
  { name: '1 Tessalonicenses', englishName: '1 Thessalonians', chapters: 5, testament: 'New', abbrev: '1th' },
  { name: '2 Tessalonicenses', englishName: '2 Thessalonians', chapters: 3, testament: 'New', abbrev: '2th' },
  { name: '1 Timóteo', englishName: '1 Timothy', chapters: 6, testament: 'New', abbrev: '1ti' },
  { name: '2 Timóteo', englishName: '2 Timothy', chapters: 4, testament: 'New', abbrev: '2ti' },
  { name: 'Tito', englishName: 'Titus', chapters: 3, testament: 'New', abbrev: 'ti' },
  { name: 'Filemom', englishName: 'Philemon', chapters: 1, testament: 'New', abbrev: 'pl' },
  { name: 'Hebreus', englishName: 'Hebrews', chapters: 13, testament: 'New', abbrev: 'hb' },
  { name: 'Tiago', englishName: 'James', chapters: 5, testament: 'New', abbrev: 'jm' },
  { name: '1 Pedro', englishName: '1 Peter', chapters: 5, testament: 'New', abbrev: '1pe' },
  { name: '2 Pedro', englishName: '2 Peter', chapters: 3, testament: 'New', abbrev: '2pe' },
  { name: '1 João', englishName: '1 John', chapters: 5, testament: 'New', abbrev: '1jn' },
  { name: '2 João', englishName: '2 John', chapters: 1, testament: 'New', abbrev: '2jn' },
  { name: '3 João', englishName: '3 John', chapters: 1, testament: 'New', abbrev: '3jn' },
  { name: 'Judas', englishName: 'Jude', chapters: 1, testament: 'New', abbrev: 'jd' },
  { name: 'Apocalipse', englishName: 'Revelation', chapters: 22, testament: 'New', abbrev: 're' },
];

export const TOTAL_CHAPTERS = 1189;

export const POPULAR_VERSES = [
  "Jeremiah 29:11", "Philippians 4:13", "John 3:16", "Romans 8:28",
  "Isaiah 41:10", "Psalms 23:1", "Joshua 1:9", "Matthew 11:28",
  "Proverbs 3:5-6", "Isaiah 40:31", "Romans 12:2", "Philippians 4:6-7",
  "2 Timothy 1:7", "Hebrews 11:1", "1 Corinthians 13:4-7", "2 Corinthians 5:17",
  "Galatians 5:22-23", "Ephesians 2:8-9", "Psalm 46:1", "Psalm 91:1-2",
  "Lamentations 3:22-23", "Romans 8:38-39", "James 1:2-3", "1 Peter 5:7",
  "Micah 6:8", "Zephaniah 3:17", "John 14:27", "Psalm 121:1-2"
];

export const FALLBACK_VERSES_DATA: Record<string, string> = {
  "Jeremiah 29:11": "Porque eu bem sei os pensamentos que tenho a vosso respeito, diz o Senhor; pensamentos de paz, e não de mal, para vos dar o fim que esperais.",
  "Philippians 4:13": "Posso todas as coisas naquele que me fortalece.",
  "John 3:16": "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.",
  "Romans 8:28": "E sabemos que todas as coisas contribuem juntamente para o bem daqueles que amam a Deus, daqueles que são chamados segundo o seu propósito.",
  "Isaiah 41:10": "Não temas, porque eu sou contigo; não te assombres, porque eu sou teu Deus; eu te fortaleço, e te ajudo, e te sustento com a destra da minha justiça.",
  "Psalms 23:1": "O Senhor é o meu pastor, nada me faltará.",
  "Joshua 1:9": "Não to mandei eu? Esforça-te, e tem bom ânimo; não temas, nem te espantes; porque o Senhor teu Deus é contigo, por onde quer que andares.",
  "Matthew 11:28": "Vinde a mim, todos os que estais cansados e oprimidos, e eu vos aliviarei.",
  "Proverbs 3:5-6": "Confia no Senhor de todo o teu coração, e não te estribes no teu próprio entendimento. Reconhece-o em todos os teus caminhos, e ele endireitará as tuas veredas.",
  "Isaiah 40:31": "Mas os que esperam no Senhor renovarão as forças, subirão com asas como águias; correrão, e não se cansarão; caminharão, e não se fatigarão.",
  "Romans 12:2": "E não sede conformados com este mundo, mas sede transformados pela renovação do vosso entendimento, para que experimenteis qual seja a boa, agradável, e perfeita vontade de Deus.",
  "Philippians 4:6-7": "Não estejais inquietos por coisa alguma; antes as vossas petições sejam em tudo conhecidas diante de Deus pela oração e súplica, com ação de graças. E a paz de Deus, que excede todo o entendimento, guardará os vossos corações e os vossos sentimentos em Cristo Jesus.",
  "2 Timothy 1:7": "Porque Deus não nos deu o espírito de temor, mas de fortaleza, e de amor, e de moderação.",
  "Hebrews 11:1": "Ora, a fé é o firme fundamento das coisas que se esperam, e a prova das coisas que se não veem.",
  "1 Corinthians 13:4-7": "O amor é sofredor, é benigno; o amor não é invejoso; o amor não trata com leviandade, não se ensoberbece. Não se porta com indecência, não busca os seus interesses, não se irrita, não suspeita mal; Não folga com a injustiça, mas folga com a verdade; Tudo sofre, tudo crê, tudo espera, tudo suporta.",
  "2 Corinthians 5:17": "Assim que, se alguém está em Cristo, nova criatura é; as coisas velhas já passaram; eis que tudo se fez novo.",
  "Galatians 5:22-23": "Mas o fruto do Espírito é: amor, gozo, paz, longanimidade, benignidade, bondade, fé, mansidão, temperança. Contra estas coisas não há lei.",
  "Ephesians 2:8-9": "Porque pela graça sois salvos, por meio da fé; e isto não vem de vós, é dom de Deus. Não vem das obras, para que ninguém se glorie.",
  "Psalm 46:1": "Deus é o nosso refúgio e fortaleza, socorro bem presente na angústia.",
  "Psalm 91:1-2": "Aquele que habita no esconderijo do Altíssimo, à sombra do Onipotente descansará. Direi do Senhor: Ele é o meu Deus, o meu refúgio, a minha fortaleza, e nele confiarei.",
  "Lamentations 3:22-23": "As misericórdias do Senhor são a causa de não sermos consumidos, porque as suas misericórdias não têm fim; Novas são cada manhã; grande é a tua fidelidade.",
  "Romans 8:38-39": "Porque estou certo de que, nem a morte, nem a vida, nem os anjos, nem os principados, nem as potestades, nem o presente, nem o porvir, Nem a altura, nem a profundidade, nem alguma outra criatura nos poderá separar do amor de Deus, que está em Cristo Jesus nosso Senhor.",
  "James 1:2-3": "Meus irmãos, tende grande gozo quando cairdes em várias tentações; Sabendo que a prova da vossa fé opera a paciência.",
  "1 Peter 5:7": "Lançando sobre ele toda a vossa ansiedade, porque ele tem cuidado de vós.",
  "Micah 6:8": "Ele te declarou, ó homem, o que é bom; e que é o que o Senhor pede de ti, senão que pratiques a justiça, e ames a beneficência, e andes humildemente com o teu Deus?",
  "Zephaniah 3:17": "O Senhor teu Deus, o poderoso, está no meio de ti, ele salvará; ele se deleitará em ti com alegria; calar-se-á por seu amor, regozijar-se-á em ti com júbilo.",
  "John 14:27": "Deixo-vos a paz, a minha paz vos dou; não vo-la dou como o mundo a dá. Não se turbe o vosso coração, nem se atemorize.",
  "Psalm 121:1-2": "Levantarei os meus olhos para os montes, de onde vem o meu socorro. O meu socorro vem do Senhor que fez o céu e a terra."
};

// ... (Resto do arquivo permanece inalterado)
export const ANXIOUS_PRAYERS = [
  "Senhor, acalma meu coração agitado. Entrego a Ti cada preocupação que tenta roubar minha paz. Ajuda-me a confiar que Tu estás no controle de tudo e que o Teu amor por mim é perfeito. Que a Tua serenidade inunde minha alma agora. Em nome de Jesus, Amém. (Filipenses 4:6-7)",
  "Pai, neste momento de angústia, busco o Teu refúgio. Quando meus pensamentos se multiplicam, Tuas consolações alegram a minha alma. Troco o peso do medo pela leveza da Tua graça. Guarda minha mente em Tua perfeita paz. Amém. (Salmos 94:19)",
  "Deus de bondade, lanço sobre Ti toda a minha ansiedade, pois sei que tens cuidado de mim. Não quero carregar este fardo sozinho. Toma minhas preocupações e dá-me o Teu descanso. Confio que o amanhã está em Tuas mãos seguras. Amém. (1 Pedro 5:7)",
  "Senhor Jesus, Tu disseste: 'Deixo-vos a paz, a minha paz vos dou'. Eu recebo essa paz agora. Que ela guarde meu coração e meus pensamentos. Silencia as vozes da dúvida e fortalece minha fé na Tua presença constante. Amém. (João 14:27)",
  "Espírito Santo, sopra Tua brisa suave sobre minha mente cansada. Ajuda-me a focar no hoje e na Tua fidelidade presente. Rejeito a mentira de que estou sozinho e abraço a verdade de que Tu és meu Pastor e nada me faltará. Amém. (Salmos 23:1)",
  "Pai Celestial, Tu és meu abrigo e fortaleza. Quando o medo vier, eu confiarei em Ti. Lembra-me de que não me deste um espírito de covardia, mas de poder, amor e equilíbrio. Restaura meu equilíbrio emocional agora. Amém. (2 Timóteo 1:7)"
];

export const TIRED_PRAYERS = [
  "Senhor Jesus, meu corpo e minha alma estão exaustos. Aceito Teu convite: 'Vinde a mim, todos os que estais cansados'. Troco meu fardo pesado pelo Teu, que é leve. Dá-me o descanso que o sono não pode dar. Renova minhas forças enquanto repouso em Ti. Amém. (Mateus 11:28)",
  "Pai, sinto que não tenho mais forças para continuar. Mas a Tua Palavra diz que dás força ao cansado e multiplicas o vigor do que não tem nenhum. Eu recebo essa força sobrenatural agora. Renova minha esperança como a das águias para que eu possa voar novamente. Amém. (Isaías 40:29-31)",
  "Deus, minha mente não desliga e meu corpo dói de cansaço. Peço a Tua paz que excede todo o entendimento. Deito-me em paz e logo pego no sono, pois só Tu, Senhor, me fazes repousar em segurança. Guarda meus sonhos e restaura meu ânimo. Amém. (Salmos 4:8)",
  "Senhor, as demandas do dia me consumiram. Preciso da Tua presença, pois prometeste: 'A minha presença irá contigo, e eu te darei descanso'. Paro tudo agora apenas para respirar e lembrar que Tu estás no controle. Sou Teu filho(a), não um escravo do fazer. Amém. (Êxodo 33:14)",
  "Pastor da minha alma, leva-me às águas tranquilas. Refrigera o meu interior. O mundo exige muito de mim, mas Tu restauras as minhas forças. Não preciso carregar o peso do universo. Entrego tudo a Ti e descanso na Tua provisão e cuidado. Amém. (Salmos 23:2-3)",
  "Pai Amado, obrigado porque não preciso ser forte o tempo todo. Tua graça me basta, e o Teu poder se aperfeiçoa na minha fraqueza. Abraça-me nesta noite e deixa-me sentir o Teu amor curador restaurando cada célula do meu corpo. Amém. (2 Coríntios 12:9)"
];

export const HAPPY_PRAYERS = [
  "Senhor, meu coração transborda de alegria hoje! Obrigado por este dia incrível e por cada detalhe da Tua bondade. Que minha felicidade seja um reflexo do Teu amor e contagie todos ao meu redor. Te louvo porque és bom e Tua misericórdia dura para sempre. Amém. (Salmos 118:24)",
  "Pai Amado, te agradeço pelas bênçãos que recebí. Minha alma canta de gratidão! Ajuda-me a não esquecer que toda boa dádiva vem de Ti. Que eu use este momento de alegria para abençoar outros e glorificar o Teu nome. Amém. (Tiago 1:17)",
  "Deus de maravilhas, 'grandes coisas fez o Senhor por nós, por isso estamos alegres'. Celebro a Tua fidelidade e o Teu favor sobre minha vida. Que este sorriso no meu rosto seja um testemunho da Tua graça. Guardo este momento no coração como um tesouro. Amém. (Salmos 126:3)",
  "Senhor Jesus, obrigado porque a alegria do Senhor é a minha força! Mesmo nos dias bons, Tu és a minha maior fonte de prazer. Que eu use este momento com sabedoria e um coração grato, reconhecendo a Tua mão em tudo. Amém. (Neemias 8:10)",
  "Pai, hoje quero apenas dizer: OBRIGADO! Minha boca se enche de riso e minha língua de júbilo. Como é bom pertencer a Ti e viver sob o Teu cuidado. Recebe o meu louvor como oferta de gratidão neste dia feliz. Amém. (Salmos 100:4-5)",
  "Senhor, que a alegria que sinto hoje não seja passageira, mas enraizada na certeza da Tua salvação. 'Alegrai-vos sempre no Senhor'. Que meu espírito permaneça leve e grato, espalhando a luz de Cristo por onde eu passar. Amém. (Filipenses 4:4)"
];

export const ANXIETY_DETOX_DAYS: Record<number, ChallengeDayContent> = {
  1: {
    verse: "Lancem sobre ele toda a sua ansiedade, porque ele tem cuidado de vocês. - 1 Pedro 5:7",
    thought: "Hoje, entregue suas preocupações a Deus, pois Ele cuida de você.",
    action: "Escreva em um papel sua maior preocupação atual. Ore entregando-a a Deus e depois rasgue o papel como símbolo de confiança.",
    reflection: "A ansiedade opera como um ladrão silencioso, tentando roubar a paz do presente com medos de um futuro que talvez nunca chegue. Quando Pedro nos instrui a 'lançar' nossa ansiedade, ele usa um termo que implica um ato deliberado, vigoroso e intencional de transferência. Não fomos desenhados para carregar o peso do mundo sozinhos; fomos criados para depender daquele que sustenta o universo. A razão pela qual podemos fazer isso com segurança é simples e poderosa: Ele tem cuidado de nós. Não é um cuidado distante, mas pessoal e detalhado."
  },
  2: {
    verse: "Não andem ansiosos por coisa alguma, mas em tudo, pela oração e súplicas, e com ação de graças, apresentem seus pedidos a Deus. - Filipenses 4:6",
    thought: "A gratidão é o antídoto para a ansiedade. Troque o 'e se...' pelo 'obrigado Deus'.",
    action: "Faça uma lista de 5 coisas pelas quais você é grato hoje, por menores que sejam.",
    reflection: "A gratidão tem um poder neurobiológico e espiritual de reconfigurar nossa mente. É impossível sentir gratidão genuína e ansiedade extrema ao mesmo tempo. Paulo nos dá uma fórmula de troca: pegue sua preocupação e transforme-a em uma oração recheada de agradecimento. Quando agradecemos pelo que Deus já fez, fortalecemos nossa fé para confiar no que Ele fará a seguir. A ansiedade nos projeta para um cenário de catástrofe; a ação de graças nos ancora na bondade de Deus."
  },
  3: {
    verse: "Portanto, não se preocupem com o amanhã, pois o amanhã trará as suas próprias preocupações. - Mateus 6:34",
    thought: "Deus só te dá graça para viver o hoje. O amanhã pertence a Ele.",
    action: "Identifique uma tarefa que você pode resolver hoje e faça-a. Deixe o resto para amanhã.",
    reflection: "Jesus nos ensina a arte da compartimentalização espiritual. A ansiedade é, essencialmente, a tentativa arrogante de viver o futuro antes que ele aconteça, sofrendo duas vezes por problemas que talvez nem existam. Deus nos promete o 'pão de cada dia', não o estoque para a década. A graça de Deus é renovada a cada manhã e é medida exatamente para os desafios das próximas 24 horas. Tentar viver o amanhã com a força de hoje gera exaustão; viver o hoje com a presença de Deus gera paz."
  },
  4: {
    verse: "Quando a ansiedade já me dominava no íntimo, o teu consolo trouxe alívio à minha alma. - Salmos 94:19",
    thought: "Nos momentos de crise, o consolo de Deus é real e acessível.",
    action: "Ouça um louvor que traga paz e feche os olhos por 10 minutos, focando apenas na letra.",
    reflection: "O salmista admite um momento de vulnerabilidade extrema: quando a ansiedade se multiplicava dentro dele, criando um ruído ensurdecedor de pensamentos conflitantes. A resposta não veio de uma solução externa imediata, mas do 'consolo' divino que tocou sua alma. Esse consolo não é apenas uma ideia abstrata; é a presença tangível do Espírito Santo que acalma a tempestade interior, mesmo que a tempestade exterior ainda esteja rugindo. É um alívio sobrenatural."
  },
  5: {
    verse: "Deixo-lhes a paz; a minha paz lhes dou. Não a dou como o mundo a dá. Não se perturbem os seus corações, nem tenham medo. - João 14:27",
    thought: "A paz de Cristo não depende das circunstâncias, ela acontece apesar delas.",
    action: "Desligue as notificações do celular por 1 hora hoje para proteger sua paz mental.",
    reflection: "A paz que o mundo oferece é frágil porque depende da ausência de conflitos. Se tudo vai bem, temos paz; se algo dá errado, a paz desaparece. A paz que Jesus oferece é diferente: é 'Shalom' — uma plenitude e integridade que subsiste mesmo no meio do caos. É uma herança deixada por Ele ('deixo-lhes a paz') e um presente ativo ('a minha paz lhes dou'). Essa paz atua como uma sentinela, guardando nossos corações e mentes contra o medo irracional."
  },
  6: {
    verse: "Busquei o Senhor, e ele me respondeu; livrou-me de todos os meus temores. - Salmos 34:4",
    thought: "O medo mente, dizendo que você está sozinho. A verdade é que Deus ouve seu clamor.",
    action: "Ore em voz alta declarando: 'Deus está comigo, não temerei'.",
    reflection: "Davi escreveu este salmo em um momento de perigo real, fingindo loucura para escapar da morte. O livramento que ele celebra aqui não é apenas a sobrevivência física, mas a libertação da prisão do medo. Às vezes, Deus remove o problema imediatamente; outras vezes, Ele remove o medo do problema, capacitando-nos a enfrentá-lo com coragem. Buscar ao Senhor é o primeiro passo para quebrar a paralisia que a ansiedade provoca."
  },
  7: {
    verse: "O Senhor é o meu pastor; de nada terei falta... - Salmos 23:1",
    thought: "Você não precisa carregar o mundo nas costas. Você tem um Pastor que te guia.",
    action: "Tire um tempo de descanso hoje. Faça algo que renove suas energias e não envolva trabalho.",
    reflection: "A metáfora do pastor é profundamente terapêutica. A ansiedade muitas vezes surge quando tentamos assumir o papel de 'pastor' da nossa própria vida, achando que precisamos controlar cada detalhe para não faltar nada. O Salmo 23 nos convida a renunciar a esse controle excessivo. Se o Senhor é o seu Pastor, a responsabilidade final pela sua provisão, direção e proteção é dEle, não sua. Ovelhas não se preocupam com o pasto de amanhã; elas confiam no pastor de hoje."
  }
};

export const GRATITUDE_JOURNEY_DAYS: Record<number, ChallengeDayContent> = {
  1: {
    verse: "Então o Senhor Deus formou o homem do pó da terra e soprou em suas narinas o fôlego de vida... - Gênesis 2:7",
    thought: "O primeiro motivo de gratidão é o ar que você respira agora.",
    action: "Pare por 1 minuto. Respire fundo. Agradeça apenas pelo fôlego de vida.",
    reflection: "Muitas vezes buscamos grandes milagres para agradecer, esquecendo do milagre contínuo que ocorre em nossos pulmões a cada segundo. O 'fôlego de vida' (Ruach) é um presente direto de Deus, um empréstimo diário da Sua própria vitalidade. Gratidão começa no básico: estou vivo. Se há fôlego, há propósito. Agradecer pela vida é reconhecer que sua existência não é um acidente, mas um projeto intencional do Criador."
  },
  2: {
    verse: "Como é bom e agradável quando os irmãos convivem em união! - Salmos 133:1",
    thought: "Pessoas são presentes. Quem tem caminhado com você?",
    action: "Envie uma mensagem para alguém importante dizendo: 'Sou grato por você existir'.",
    reflection: "A gratidão horizontal (pelas pessoas) fortalece a gratidão vertical (a Deus). Ninguém chega a lugar nenhum sozinho. Deus usa pessoas como canais de sua graça, amor e correção. Hoje, reflita sobre as amizades, familiares ou mentores que, mesmo imperfeitos, tornam sua jornada mais leve. A união não é ausência de diferenças, mas a decisão de caminhar junto apesar delas. Isso é um presente divino."
  },
  3: {
    verse: "Os céus declaram a glória de Deus; o firmamento proclama a obra das suas mãos. - Salmos 19:1",
    thought: "A criação é uma carta de amor aberta diante dos seus olhos.",
    action: "Saia ou olhe pela janela. Encontre algo na natureza (uma árvore, o céu, um pássaro) e agradeça pela beleza.",
    reflection: "A natureza é o 'primeiro livro' de Deus. Ela prega sem palavras sobre a criatividade, poder e ordem do Senhor. Quando admiramos a beleza de um pôr do sol ou a complexidade de uma flor, estamos adorando o Artista por trás da obra. A gratidão pela criação nos reconecta com nossa pequenez e com a grandeza de Deus, tirando o foco dos nossos problemas imediatos e ampliando nossa perspectiva."
  },
  4: {
    verse: "Porque aos seus anjos dará ordem a teu respeito, para te guardarem em todos os teus caminhos. - Salmos 91:11",
    thought: "Você não vê, mas há livramentos acontecendo o tempo todo.",
    action: "Agradeça por 3 livramentos que você já viveu no passado.",
    reflection: "Quantas vezes o carro não bateu por um segundo? Quantas vezes uma porta fechada foi, na verdade, uma proteção contra um caminho destrutivo? A gratidão pela proteção reconhece que não estamos à mercê do acaso. Há uma providência ativa, muitas vezes invisível, trabalhando nos bastidores. Agradecer pelo que 'não aconteceu' de ruim é um exercício poderoso de fé e reconhecimento da soberania de Deus."
  },
  // ... Keep previous gratitude days ...
};

// ... Keep other journeys ...
export const PROVERBS_JOURNEY_DAYS: Record<number, ChallengeDayContent> = {
  1: {
    verse: "O temor do Senhor é o princípio do conhecimento, mas os insensatos desprezam a sabedoria e a disciplina. - Provérbios 1:7",
    thought: "Sabedoria não começa com livros, começa com reverência a Deus.",
    action: "Antes de tomar qualquer decisão hoje, pare e pergunte: 'Senhor, o que Tu pensas sobre isso?'.",
    reflection: "O 'temor do Senhor' não é medo de punição, mas um respeito profundo que reconhece Deus como a autoridade suprema sobre a realidade. É ajustar sua bússola moral pelo Norte verdadeiro. Sem esse ponto de partida, todo conhecimento humano é frágil. O sábio vive com a consciência constante da presença de Deus, o que pauta suas escolhas, palavras e atitudes."
  },
  // ...
};

export const HEALING_JOURNEY_DAYS: Record<number, ChallengeDayContent> = {
  1: {
    verse: "Mas ele foi traspassado pelas nossas transgressões... e pelas suas feridas fomos curados. - Isaías 53:5",
    thought: "A cura não é apenas uma possibilidade, é uma promessa paga na cruz.",
    action: "Tome a Ceia (pão e suco/vinho) em casa hoje, lembrando do corpo de Cristo quebrado pela sua saúde.",
    reflection: "A obra da cruz foi completa. Jesus não levou apenas nossos pecados, mas também nossas dores e enfermidades. A palavra 'salvação' (sozo) no grego implica integridade física, emocional e espiritual. Quando oramos por cura, não estamos tentando convencer Deus a fazer algo novo, mas reivindicando algo que Jesus já conquistou legalmente para nós há 2000 anos. A fé se apoia nesse fato consumado."
  },
  // ...
};

export const OPEN_DOORS_JOURNEY_DAYS: Record<number, ChallengeDayContent> = {
  1: {
    verse: "Eis que diante de ti pus uma porta aberta, e ninguém a pode fechar... - Apocalipse 3:8",
    thought: "O que Deus abre, homem nenhum, demônio nenhum pode fechar.",
    action: "Declare três vezes: 'Minha vida está sob o favor de Deus e Ele abre o caminho para mim'.",
    reflection: "A soberania de Deus é a base da nossa confiança por portas abertas. Não dependemos de 'sorte', 'QI' (quem indica) ou manipulação humana. Jesus tem a 'chave de Davi'. Quando Ele decide que é o tempo de uma nova estação em sua vida, as circunstâncias se alinham sobrenaturalmente. Descanse na certeza de que, se a porta for dEle, ela permanecerá aberta, não importa a oposição."
  },
  // ...
};

export const RESTORATION_JOURNEY_DAYS: Record<number, ChallengeDayContent> = {
  1: {
    verse: "Suportem-se uns aos outros e perdoem as queixas... Assim como o Senhor os perdoou, perdoem também. - Colossenses 3:13",
    thought: "O perdão não é um sentimento, é uma decisão de cancelar a dívida.",
    action: "Ore abençoando a pessoa que te feriu, decidindo não cobrar mais a ofensa emocionalmente.",
    reflection: "Restauração começa quando paramos de esperar que o outro pague pelo que fez. Jesus pagou nossa dívida impagável na cruz; isso nos tira o direito de sermos cobradores implacáveis dos outros. Perdoar não é esquecer ou concordar com o erro, é soltar o prisioneiro e descobrir que o prisioneiro era você. A decisão de perdoar desobstrui o canal para Deus restaurar o relacionamento ou curar seu coração."
  },
  // ...
};

export const IMPOSSIBLE_CAUSES_JOURNEY_DAYS: Record<number, ChallengeDayContent> = {
  1: {
    verse: "Porque para Deus nada é impossível. - Lucas 1:37",
    thought: "A palavra 'impossível' não existe no dicionário do Céu.",
    action: "Escreva seu problema 'impossível' em um papel e escreva em cima, grande: DEUS É MAIOR.",
    reflection: "O anjo Gabriel disse isso a Maria quando anunciou uma gravidez virginal. O cenário humano era biologicamente impossível, mas a realidade divina se sobrepôs. Sua causa pode parecer morta, enterrada ou sem solução lógica. Mas Deus é especialista em situações sem saída. Ele não precisa de matéria-prima favorável; Ele cria do nada. Comece esta jornada tirando os limites da sua fé."
  },
  // ...
};

export const INITIAL_CHALLENGES: Challenge[] = [
  {
    id: 'anxiety-detox',
    title: 'Detox de Ansiedade',
    description: '7 dias para trocar o medo pela paz de Deus através da entrega total.',
    days: 7,
    theme: 'Ansiedade'
  },
  {
    id: 'gratitude-journey',
    title: 'Jornada da Gratidão',
    description: '30 dias para transformar sua mente e coração através do poder da gratidão.',
    days: 30,
    theme: 'Gratidão'
  },
  {
    id: 'proverbs-wisdom',
    title: 'Sabedoria de Provérbios',
    description: '31 dias mergulhando na fonte de sabedoria para decisões e vida prática.',
    days: 31,
    theme: 'Sabedoria'
  },
  {
    id: 'healing-miracle',
    title: 'Milagre da Cura',
    description: '14 dias fortalecendo a fé para cura física, emocional e espiritual.',
    days: 14,
    theme: 'Cura Divina'
  },
  {
    id: 'open-doors',
    title: 'Portas Abertas',
    description: '21 dias de oração por provisão, emprego e direção profissional.',
    days: 21,
    theme: 'Provisão Financeira e Emprego'
  },
  {
    id: 'restoration',
    title: 'Restauração de Vínculos',
    description: '10 dias focados em perdão, amor e cura nos relacionamentos e casamento.',
    days: 10,
    theme: 'Amor, Perdão e Casamento'
  },
  {
    id: 'impossible-causes',
    title: 'Causas Impossíveis',
    description: '7 dias de clamor intenso por milagres urgentes.',
    days: 7,
    theme: 'Fé para Milagres Urgentes'
  }
];

export const BIBLE_TRIVIA_QUESTIONS = TRIVIA_CATEGORIES.flatMap(category => category.questions);
