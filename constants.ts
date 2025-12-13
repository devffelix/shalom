

import { BibleBook, Challenge, ChallengeDayContent, Badge, Virtue, UserGoals } from './types';

// Gamification Constants
export const XP_PER_CHAPTER = 50;
export const XP_PER_CHALLENGE_DAY = 100;
export const XP_PER_BADGE = 500; // Bonus XP for earning a generic badge
export const XP_REWARD_JOURNEY = 200; // Specific reward for claiming a journey

export const INITIAL_GOALS: UserGoals = {
  dailyChapters: 3,
  dailyStudyMinutes: 15,
  focusVirtue: 'hope',
  targetJourneyId: null
};

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

// Mocked Prayers for Anxiety
export const ANXIOUS_PRAYERS = [
  "Senhor, acalma meu coração agitado. Entrego a Ti cada preocupação que tenta roubar minha paz. Ajuda-me a confiar que Tu estás no controle de tudo e que o Teu amor por mim é perfeito. Que a Tua serenidade inunde minha alma agora. Em nome de Jesus, Amém. (Filipenses 4:6-7)",
  "Pai, neste momento de angústia, busco o Teu refúgio. Quando meus pensamentos se multiplicam, Tuas consolações alegram a minha alma. Troco o peso do medo pela leveza da Tua graça. Guarda minha mente em Tua perfeita paz. Amém. (Salmos 94:19)",
  "Deus de bondade, lanço sobre Ti toda a minha ansiedade, pois sei que tens cuidado de mim. Não quero carregar este fardo sozinho. Toma minhas preocupações e dá-me o Teu descanso. Confio que o amanhã está em Tuas mãos seguras. Amém. (1 Pedro 5:7)",
  "Senhor Jesus, Tu disseste: 'Deixo-vos a paz, a minha paz vos dou'. Eu recebo essa paz agora. Que ela guarde meu coração e meus pensamentos. Silencia as vozes da dúvida e fortalece minha fé na Tua presença constante. Amém. (João 14:27)",
  "Espírito Santo, sopra Tua brisa suave sobre minha mente cansada. Ajuda-me a focar no hoje e na Tua fidelidade presente. Rejeito a mentira de que estou sozinho e abraço a verdade de que Tu és meu Pastor e nada me faltará. Amém. (Salmos 23:1)",
  "Pai Celestial, Tu és meu abrigo e fortaleza. Quando o medo vier, eu confiarei em Ti. Lembra-me de que não me deste um espírito de covardia, mas de poder, amor e equilíbrio. Restaura meu equilíbrio emocional agora. Amém. (2 Timóteo 1:7)"
];

// Mocked Prayers for Tired/Weary
export const TIRED_PRAYERS = [
  "Senhor Jesus, meu corpo e minha alma estão exaustos. Aceito Teu convite: 'Vinde a mim, todos os que estais cansados'. Troco meu fardo pesado pelo Teu, que é leve. Dá-me o descanso que o sono não pode dar. Renova minhas forças enquanto repouso em Ti. Amém. (Mateus 11:28)",
  "Pai, sinto que não tenho mais forças para continuar. Mas a Tua Palavra diz que dás força ao cansado e multiplicas o vigor do que não tem nenhum. Eu recebo essa força sobrenatural agora. Renova minha esperança como a das águias para que eu possa voar novamente. Amém. (Isaías 40:29-31)",
  "Deus, minha mente não desliga e meu corpo dói de cansaço. Peço a Tua paz que excede todo o entendimento. Deito-me em paz e logo pego no sono, pois só Tu, Senhor, me fazes repousar em segurança. Guarda meus sonhos e restaura meu ânimo. Amém. (Salmos 4:8)",
  "Senhor, as demandas do dia me consumiram. Preciso da Tua presença, pois prometeste: 'A minha presença irá contigo, e eu te darei descanso'. Paro tudo agora apenas para respirar e lembrar que Tu estás no controle. Sou Teu filho(a), não um escravo do fazer. Amém. (Êxodo 33:14)",
  "Pastor da minha alma, leva-me às águas tranquilas. Refrigera o meu interior. O mundo exige muito de mim, mas Tu restauras as minhas forças. Não preciso carregar o peso do universo. Entrego tudo a Ti e descanso na Tua provisão e cuidado. Amém. (Salmos 23:2-3)",
  "Pai Amado, obrigado porque não preciso ser forte o tempo todo. Tua graça me basta, e o Teu poder se aperfeiçoa na minha fraqueza. Abraça-me nesta noite e deixa-me sentir o Teu amor curador restaurando cada célula do meu corpo. Amém. (2 Coríntios 12:9)"
];

// Mocked Prayers for Happy
export const HAPPY_PRAYERS = [
  "Senhor, meu coração transborda de alegria hoje! Obrigado por este dia incrível e por cada detalhe da Tua bondade. Que minha felicidade seja um reflexo do Teu amor e contagie todos ao meu redor. Te louvo porque és bom e Tua misericórdia dura para sempre. Amém. (Salmos 118:24)",
  "Pai Amado, te agradeço pelas bênçãos que recebí. Minha alma canta de gratidão! Ajuda-me a não esquecer que toda boa dádiva vem de Ti. Que eu use este momento de alegria para abençoar outros e glorificar o Teu nome. Amém. (Tiago 1:17)",
  "Deus de maravilhas, 'grandes coisas fez o Senhor por nós, por isso estamos alegres'. Celebro a Tua fidelidade e o Teu favor sobre minha vida. Que este sorriso no meu rosto seja um testemunho da Tua graça. Guardo este momento no coração como um tesouro. Amém. (Salmos 126:3)",
  "Senhor Jesus, obrigado porque a alegria do Senhor é a minha força! Mesmo nos dias bons, Tu és a minha maior fonte de prazer. Que eu use este momento com sabedoria e um coração grato, reconhecendo a Tua mão em tudo. Amém. (Neemias 8:10)",
  "Pai, hoje quero apenas dizer: OBRIGADO! Minha boca se enche de riso e minha língua de júbilo. Como é bom pertencer a Ti e viver sob o Teu cuidado. Recebe o meu louvor como oferta de gratidão neste dia feliz. Amém. (Salmos 100:4-5)",
  "Senhor, que a alegria que sinto hoje não seja passageira, mas enraizada na certeza da Tua salvação. 'Alegrai-vos sempre no Senhor'. Que meu espírito permaneça leve e grato, espalhando a luz de Cristo por onde eu passar. Amém. (Filipenses 4:4)"
];

// Static Content for Anxiety Detox Journey
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
  5: {
    verse: "Pois vocês são salvos pela graça, por meio da fé... não vem das obras, para que ninguém se orgulhe. - Efésios 2:8-9",
    thought: "O maior presente você já recebeu e não custou nada a você, mas tudo a Ele.",
    action: "Escreva uma breve carta a Jesus agradecendo pela Cruz.",
    reflection: "Se Deus nunca mais fizesse nada por nós além da cruz, já teríamos motivos para agradecer por toda a eternidade. A salvação é o dom supremo. Gratidão profunda nasce quando entendemos a profundidade da nossa dívida e a magnitude do pagamento feito por Cristo. Hoje, tire os olhos das bênçãos materiais e foque na bênção espiritual eterna: seu nome está escrito no Livro da Vida."
  },
  6: {
    verse: "O meu Deus suprirá todas as necessidades de vocês, de acordo com as suas gloriosas riquezas... - Filipenses 4:19",
    thought: "Não olhe para a falta, olhe para a Fonte.",
    action: "Identifique uma necessidade atual e agradeça antecipadamente pela provisão de Deus.",
    reflection: "A gratidão antecipada é a linguagem da fé. Paulo escreveu isso enquanto estava preso, dependendo de ofertas. Ele não olhava para a escassez da prisão, mas para as 'gloriosas riquezas' de Deus. Agradecer antes de ver a resposta muda nossa postura de 'mendigos desesperados' para 'filhos confiantes'. Deus não é um patrão que paga salário, é um Pai que supre necessidades."
  },
  7: {
    verse: "Meus irmãos, considerem motivo de grande alegria o fato de passarem por diversas provações. - Tiago 1:2",
    thought: "Até nos dias difíceis, a gratidão encontra um propósito.",
    action: "Agradeça por uma dificuldade que te fez crescer ou amadurecer.",
    reflection: "Este é o nível avançado da gratidão: agradecer na dor. Não agradecemos *pelo* mal, mas *no meio* dele e pelo que Deus produz *através* dele. As provações geram perseverança e maturidade que o conforto nunca produziria. Olhar para trás e ver como uma fase ruim te tornou mais forte te ajuda a enfrentar as lutas de hoje com uma perspectiva de esperança e gratidão pelo processo de Deus."
  },
  8: {
    verse: "Deus faz com que o solitário viva em família... - Salmos 68:6",
    thought: "O lar não é apenas um lugar, é onde o amor habita.",
    action: "Faça uma refeição especial com sua família ou ligue para um parente querido apenas para dizer 'eu te amo'.",
    reflection: "A família é a primeira instituição criada por Deus, um laboratório onde aprendemos a amar, perdoar e servir. Mesmo que sua família tenha imperfeições (e todas têm), ela é um instrumento de Deus. A gratidão pelo lar transforma as paredes de uma casa em um santuário. Agradeça hoje por ter um lugar para pertencer, pois Deus cuida da sua solidão através de pessoas."
  },
  9: {
    verse: "Dêem graças em todas as circunstâncias, pois esta é a vontade de Deus para vocês em Cristo Jesus. - 1 Tessalonicenses 5:18",
    thought: "A gratidão não muda o que acontece, muda quem passa pelo acontecimento.",
    action: "Ao se deparar com algo irritante hoje (trânsito, fila), force um pensamento de gratidão e veja a irritação diminuir.",
    reflection: "Paulo nos desafia a agradecer 'em' todas as coisas, não necessariamente 'por' todas as coisas. A gratidão é uma lente. Você pode focar na chuva que atrapalhou o passeio ou na chuva que regou a terra. A vontade de Deus é que tenhamos um espírito grato, pois isso blinda nosso coração contra a amargura. Gratidão é uma escolha de alinhamento com a soberania de Deus."
  },
  10: {
    verse: "Bendize, ó minha alma, ao Senhor, e não te esqueças de nenhum de seus benefícios. - Salmos 103:2",
    thought: "A memória é o combustível da gratidão. Não se esqueça.",
    action: "Reveja fotos antigas ou um diário e agradeça a Deus por onde Ele te trouxe.",
    reflection: "O esquecimento é inimigo da fé. Quando esquecemos o que Deus fez ontem, tememos o amanhã. O salmista prega para sua própria alma, ordenando que ela se lembre. Fazer isso ativamente combate a tendência natural humana de focar no negativo. Olhar para o retrovisor da vida e ver a mão de Deus em cada curva nos dá coragem para continuar acelerando em direção ao futuro."
  },
  11: {
    verse: "Tudo o que fizerem, seja em palavra ou em ação, façam-no em nome do Senhor Jesus, dando por meio dele graças a Deus Pai. - Colossenses 3:17",
    thought: "Seu trabalho e suas tarefas podem ser um ato de adoração.",
    action: "Realize uma tarefa simples (lavar louça, enviar e-mail) agradecendo a Deus pela capacidade de trabalhar.",
    reflection: "Muitas vezes separamos o 'sagrado' (igreja, oração) do 'secular' (trabalho, rotina). A gratidão une esses dois mundos. Quando agradecemos enquanto trabalhamos, transformamos a rotina em liturgia. Agradecer pela oportunidade de ser útil, de criar, de resolver problemas, muda nossa postura de 'obrigação' para 'oportunidade'. Deus é glorificado na excelência feita com gratidão."
  },
  12: {
    verse: "Este é o dia que o Senhor fez; regozijemo-nos e alegremo-nos nele. - Salmos 118:24",
    thought: "Hoje é um presente exclusivo e irrepetível.",
    action: "Ao acordar (ou agora), declare: 'Deus fez este dia para mim, vou me alegrar nele'.",
    reflection: "Cada amanhecer é uma nova criação de Deus, um cenário inédito preparado para sua história. A gratidão nos faz acordar com expectativa em vez de tédio. Não espere pelas 'grandes datas' para celebrar. A vida acontece nas terças-feiras comuns. Decidir se alegrar no 'hoje' é um ato de rebeldia contra a apatia e uma declaração de confiança no Criador do tempo."
  },
  13: {
    verse: "Eu te louvo porque me fizeste de modo assombroso e maravilhoso. - Salmos 139:14",
    thought: "Seu corpo é um templo e uma obra de arte divina.",
    action: "Agradeça por uma parte do seu corpo que funciona bem (olhos, pernas, mãos) e cuide dela hoje.",
    reflection: "Muitas vezes olhamos no espelho com crítica, focando nos defeitos. A gratidão nos faz olhar com admiração. Seu coração bate 100 mil vezes por dia sem você pedir. Seus olhos distinguem milhões de cores. Você é um milagre biológico. Agradecer pelo seu corpo é honrar o Arquiteto que o desenhou. Cuide dele não por vaidade, mas por gratidão."
  },
  14: {
    verse: "O Senhor é a minha força e o meu escudo; nele o meu coração confia, e dele recebo ajuda. Meu coração exulta de alegria... - Salmos 28:7",
    thought: "A alegria verdadeira é fruto da confiança, não das circunstâncias.",
    action: "Identifique um medo atual e troque-o pela declaração: 'Deus é meu escudo'. Agradeça pela proteção.",
    reflection: "A gratidão funciona como um escudo. Quando o inimigo lança setas de dúvida ('será que Deus é bom?'), o escudo da gratidão rebate com memórias da bondade de Deus ('Ele sempre foi bom!'). A alegria que brota dessa confiança é profunda e resiliente. Ela não depende de tudo estar perfeito fora, mas de tudo estar seguro dentro, nas mãos do Pai."
  },
  15: {
    verse: "Mas graças a Deus, que nos dá a vitória por meio de nosso Senhor Jesus Cristo. - 1 Coríntios 15:57",
    thought: "Você luta a partir da vitória, não apenas por ela.",
    action: "Agradeça por uma batalha que você venceu recentemente, reconhecendo que a força veio dEle.",
    reflection: "Em Cristo, o placar final já está decidido. A gratidão antecipada pela vitória muda nossa postura na luta. Não somos vítimas tentando sobreviver, somos vencedores tomando posse do que é nosso. Agradecer a Deus pela vitória antes mesmo de ver o problema totalmente resolvido é uma das formas mais altas de fé. É declarar que o poder da ressurreição está ativo em sua vida."
  },
  16: {
    verse: "Toda boa dádiva e todo dom perfeito vêm do alto... - Tiago 1:17",
    thought: "Os detalhes felizes do seu dia têm a assinatura de Deus.",
    action: "Note 3 pequenos prazeres hoje (um café bom, uma brisa, um sorriso) e sussurre 'Obrigado, Pai'.",
    reflection: "Deus não é apenas o Deus do trovão e dos grandes milagres; Ele é o Deus dos detalhes. O gosto da sua comida favorita, o conforto da sua cama, a risada de um amigo — tudo isso são 'boas dádivas' enviadas pelo Pai das Luzes para alegrar sua alma. A gratidão nos torna caçadores de bondade, atentos aos mimos que Deus espalha em nosso caminho diariamente."
  },
  17: {
    verse: "Entrem por suas portas com ações de graças e em seus pátios com louvor... - Salmos 100:4",
    thought: "A gratidão é a senha de acesso para a presença manifesta de Deus.",
    action: "Comece seu momento de oração hoje apenas agradecendo, sem pedir nada por 5 minutos.",
    reflection: "Na arquitetura do Templo, havia portas e pátios antes de chegar ao Lugar Santíssimo. O salmista nos ensina que a 'chave' para atravessar essas portas é a gratidão. Quando começamos a orar apenas com pedidos e reclamações, ficamos do lado de fora. A gratidão ajusta nosso foco, nos humilha e exalta a Deus, criando o ambiente perfeito para que Sua presença se manifeste e Sua voz seja ouvida."
  },
  18: {
    verse: "O amigo ama em todos os momentos... - Provérbios 17:17",
    thought: "Amigos leais são tesouros raros. Honre-os.",
    action: "Envie um áudio para um amigo antigo agradecendo por sua lealdade ao longo dos anos.",
    reflection: "A amizade é uma forma de Deus nos amar através de outra pessoa. Em um mundo de conexões superficiais, ter alguém que conhece seus defeitos e ainda assim permanece ao seu lado é um milagre. A gratidão fortalece os laços. Não assuma que seus amigos sabem que são importantes; diga a eles. A gratidão expressa nutre relacionamentos e cria raízes profundas."
  },
  19: {
    verse: "As misericórdias do Senhor são a causa de não sermos consumidos, porque as suas misericórdias não têm fim. - Lamentações 3:22",
    thought: "Você acordou hoje porque a misericórdia de Deus foi renovada.",
    action: "Peça perdão por um erro recente e agradeça imediatamente pela misericórdia que te cobre.",
    reflection: "Jeremias escreveu isso no meio de uma catástrofe nacional. Ele olhou para os escombros e viu a misericórdia. O fato de estarmos vivos, de termos uma nova chance hoje, é prova de que Deus não desistiu de nós. A gratidão pela misericórdia nos torna humildes e nos impede de sermos duros com os outros. Se Deus é tão paciente comigo, como não serei grato e paciente com o próximo?"
  },
  20: {
    verse: "Ensina-nos a contar os nossos dias para que o nosso coração alcance sabedoria. - Salmos 90:12",
    thought: "A brevidade da vida torna cada momento precioso.",
    action: "Agradeça pela sua idade e pela sabedoria que os anos trouxeram, sem reclamar de envelhecer.",
    reflection: "Saber que o tempo é limitado nos faz valorizá-lo. A gratidão nos ancora no presente. Quem reclama do passado ou se preocupa excessivamente com o futuro desperdiça o 'agora'. Agradecer pelo privilégio de envelhecer (algo que muitos não tiveram) traz uma perspectiva sábia. Cada ruga ou cabelo branco conta uma história de sobrevivência e graça. A vida é um sopro; seja grato pelo ar."
  },
  21: {
    verse: "Alegrem-se na esperança, sejam pacientes na tribulação, perseverem na oração. - Romanos 12:12",
    thought: "A gratidão alimenta a esperança e a paciência.",
    action: "Escreva um motivo de esperança para o futuro e agradeça a Deus por Ele já estar lá.",
    reflection: "Esperança não é otimismo cego; é a certeza de que Deus é bom e tem um futuro bom. A gratidão olha para o passado e diz 'Deus foi fiel'; a esperança olha para o futuro e diz 'Deus continuará sendo'. Quando agradecemos pelo que Ele já fez, ganhamos combustível para ter paciência na tribulação presente. A gratidão é a ponte entre a história da fidelidade de Deus e a promessa do Seu futuro."
  },
  22: {
    verse: "Deem graças ao Senhor, porque ele é bom. O seu amor dura para sempre. - Salmos 136:1",
    thought: "A bondade de Deus é a base inabalável da sua vida.",
    action: "Repita a frase 'O Teu amor dura para sempre' após agradecer por 3 coisas diferentes.",
    reflection: "Este salmo é uma ladainha repetitiva intencional. Precisamos repetir verdades até que elas penetrem em nosso subconsciente. O amor de Deus não é volátil como o humano; é 'hesed' — amor leal, pactual, eterno. A gratidão deve ser baseada no caráter imutável de Deus, não em nossas emoções flutuantes. Ele é bom, mesmo quando o dia é mau. E por isso, sempre há motivo para gratidão."
  },
  23: {
    verse: "Provai e vede que o Senhor é bom. - Salmos 34:8",
    thought: "A gratidão é uma experiência sensorial da fé.",
    action: "Coma sua comida favorita hoje devagar, agradecendo a Deus pelo paladar e pela provisão.",
    reflection: "Deus nos deu cinco sentidos para experimentarmos Sua criação. 'Provar' é algo íntimo e pessoal; ninguém pode provar por você. A gratidão nos tira do piloto automático. Ao saborear uma refeição, ao sentir um perfume, ao ouvir uma música, estamos provando a bondade do Criador. Não engula a vida sem mastigar. Pare, sinta, prove e agradeça. Isso é viver em adoração."
  },
  24: {
    verse: "Até aqui nos ajudou o Senhor. - 1 Samuel 7:12",
    thought: "Cada passo da sua jornada teve o auxílio divino.",
    action: "Faça um marco memorial (pode ser uma anotação ou pedra) agradecendo por uma grande vitória passada.",
    reflection: "Samuel ergueu uma pedra (Ebenézer) para que o povo não esquecesse. A gratidão precisa de marcos visuais. Olhe para trás: você já sobreviveu a dias que pensou que te matariam. Você já recebeu provisões que pareciam impossíveis. 'Até aqui' implica que há uma jornada contínua, mas o Deus que te sustentou ontem é a garantia de que te sustentará amanhã. Celebre sua sobrevivência e o Sustentador dela."
  },
  25: {
    verse: "Abençoarei o Senhor em todo o tempo; o seu louvor estará sempre nos meus lábios. - Salmos 34:1",
    thought: "A gratidão é uma decisão de linguagem.",
    action: "Faça um jejum de palavras negativas hoje. Tente não reclamar de absolutamente nada por 24h.",
    reflection: "O que sai da nossa boca revela o que enche o coração, mas também retroalimenta o coração. Se falamos apenas problemas, sentimos mais peso. Se falamos louvor, sentimos mais leveza. Decidir ter o louvor 'sempre' nos lábios é um exercício de disciplina espiritual. É treinar a língua para falar a cultura do Céu. A reclamação atrai nuvens; a gratidão abre o céu."
  },
  26: {
    verse: "Tu mudaste o meu choro em dança, a minha veste de lamento em veste de alegria. - Salmos 30:11",
    thought: "Deus é especialista em reviravoltas.",
    action: "Coloque uma música animada e agradeça a Deus dançando ou cantando pela alegria que virá.",
    reflection: "A vida com Deus tem esta dinâmica: o luto não é o fim. A gratidão profética celebra a virada antes que ela aconteça. Talvez você ainda esteja no choro, mas a gratidão te lembra que a 'dança' está na sua agenda divina. Deus não desperdiça nossas lágrimas; Ele as recolhe e as transforma em chuva de bênçãos. Agradeça pela capacidade de Deus de transformar tragédias em triunfo."
  },
  27: {
    verse: "Fui moço e agora sou velho, mas nunca vi o justo desamparado... - Salmos 37:25",
    thought: "A fidelidade de Deus atravessa gerações.",
    action: "Agradeça pela provisão financeira que você tem hoje, por menor que seja, confiando que Ele não desampara.",
    reflection: "A ansiedade financeira é um grande ladrão de gratidão. Davi, ao final da vida, dá este testemunho ocular: Deus cuida dos Seus. 'Nunca vi'. Isso não significa ausência de dificuldade, mas ausência de abandono. A gratidão pela provisão de hoje (o pão nosso de cada dia) combate o medo da escassez de amanhã. Se Ele cuidou de você até agora, Ele não vai parar. Confie e agradeça."
  },
  28: {
    verse: "Pois onde estiver o seu tesouro, aí também estará o seu coração. - Mateus 6:21",
    thought: "A generosidade é a gratidão transbordando.",
    action: "Separe algo para doar hoje (dinheiro, roupa ou tempo). A gratidão gera generosidade.",
    reflection: "Quem é grato sabe que nada é seu, tudo é emprestado por Deus. Isso solta nossas mãos para abençoar outros. A sovinice nasce do medo da falta; a generosidade nasce da gratidão pela abundância de Deus. Quando doamos, declaramos que confiamos na Fonte e não no recurso. A melhor maneira de dizer 'obrigado' a Deus é sendo parecido com Ele, que é o maior Doador de todos."
  },
  29: {
    verse: "Combati o bom combate, terminei a corrida, guardei a fé. - 2 Timóteo 4:7",
    thought: "A gratidão nos dá força para terminar bem.",
    action: "Agradeça por não ter desistido até hoje. Agradeça pela perseverança que Deus te deu.",
    reflection: "Muitos começam, poucos terminam. A gratidão é o combustível da perseverança. Quando Paulo olha para trás, no fim da vida, ele não foca nas prisões ou açoites, mas na fé guardada. Agradecer pela graça de continuar caminhando, apesar dos tropeços, nos fortalece para as últimas milhas da maratona. Você ainda está de pé. Isso é motivo de sobra para agradecer."
  },
  30: {
    verse: "Tudo o que tem fôlego louve ao Senhor. Aleluia! - Salmos 150:6",
    thought: "Seu propósito final é o louvor. Você foi criado para isso.",
    action: "Escreva uma carta de compromisso a Deus: 'Decido viver uma vida de gratidão a partir de hoje'.",
    reflection: "Chegamos ao fim da jornada, mas ao início de um estilo de vida. O livro de Salmos termina com este convite universal: se você respira, você tem um motivo e uma obrigação de louvar. A gratidão não é um evento, é a respiração da alma saudável. Que, a partir de hoje, a gratidão não seja apenas algo que você faz, mas quem você é. Um adorador grato em espírito e em verdade."
  }
};

export const PROVERBS_JOURNEY_DAYS: Record<number, ChallengeDayContent> = {
  1: {
    verse: "O temor do Senhor é o princípio do conhecimento, mas os insensatos desprezam a sabedoria e a disciplina. - Provérbios 1:7",
    thought: "Sabedoria não começa com livros, começa com reverência a Deus.",
    action: "Antes de tomar qualquer decisão hoje, pare e pergunte: 'Senhor, o que Tu pensas sobre isso?'.",
    reflection: "O 'temor do Senhor' não é medo de punição, mas um respeito profundo que reconhece Deus como a autoridade suprema sobre a realidade. É ajustar sua bússola moral pelo Norte verdadeiro. Sem esse ponto de partida, todo conhecimento humano é frágil. O sábio vive com a consciência constante da presença de Deus, o que pauta suas escolhas, palavras e atitudes."
  },
  2: {
    verse: "Confie no Senhor de todo o seu coração e não se apoie em seu próprio entendimento. - Provérbios 3:5",
    thought: "Sua lógica é limitada; a visão de Deus é infinita.",
    action: "Identifique uma área onde você está tentando controlar tudo e entregue-a a Deus em oração.",
    reflection: "Nosso 'próprio entendimento' é viciado por nossas emoções, traumas e visão limitada do futuro. Salomão nos convida a uma troca: soltar nossa necessidade de entender tudo para agarrar a mão dAquele que sabe tudo. Confiar de 'todo o coração' significa não ter plano B. É saltar nos braços de Deus sabendo que, mesmo se o caminho não fizer sentido agora, Ele conhece o destino final."
  },
  3: {
    verse: "Acima de tudo, guarde o seu coração, pois dele depende toda a sua vida. - Provérbios 4:23",
    thought: "O que você deixa entrar na sua mente define quem você se torna.",
    action: "Faça uma faxina digital hoje: deixe de seguir perfis que poluem seu coração com inveja ou impureza.",
    reflection: "O coração, na Bíblia, é o centro de comando da vida — vontade, emoções e intelecto. Se a fonte for contaminada, todo o rio da vida será tóxico. Guardar o coração é uma atitude defensiva ativa, como um sentinela num portão. Precisamos filtrar o que assistimos, ouvimos e as conversas que participamos. Sabedoria é ser seletivo com o que alimenta sua alma."
  },
  4: {
    verse: "A morte e a vida estão no poder da língua; o que bem a utiliza come do seu fruto. - Provérbios 18:21",
    thought: "Suas palavras são sementes. O que você está plantando?",
    action: "Passe o dia sem reclamar. Para cada vontade de reclamar, solte uma palavra de bênção.",
    reflection: "Não existem palavras neutras. Ou estamos construindo ou destruindo; encorajando ou desanimando; gerando vida ou morte. Salomão alerta que colheremos o fruto do que falamos. Se você vive falando em fracasso, cansaço e derrota, está programando sua mente para isso. Use sua língua como uma ferramenta de arquitetura divina para profetizar esperança sobre sua vida e a dos outros."
  },
  5: {
    verse: "Consagre ao Senhor tudo o que você faz, e os seus planos serão bem-sucedidos. - Provérbios 16:3",
    thought: "Não convide Deus para o final do projeto, convide-O para o início.",
    action: "Dedique seu trabalho ou estudos de hoje a Deus como uma oferta de adoração.",
    reflection: "Muitas vezes fazemos nossos planos e depois pedimos para Deus abençoar. A ordem bíblica é inversa: consagramos (entregamos a propriedade) das nossas ações a Ele primeiro. Quando o que fazemos é para a glória dEle e não apenas para nosso ego, nossos planos se alinham com a vontade dEle. O sucesso, na visão de Provérbios, não é apenas ficar rico, mas cumprir o propósito pelo qual fomos criados."
  },
  6: {
    verse: "O orgulho vem antes da destruição; o espírito altivo, antes da queda. - Provérbios 16:18",
    thought: "A humildade é o cinto de segurança da vida.",
    action: "Peça desculpas a alguém que você feriu, sem dar justificativas ('mas eu...'). Apenas peça perdão.",
    reflection: "O orgulho é uma cegueira espiritual que nos faz achar que somos autossuficientes e superiores. É o pecado original. A queda é inevitável para o orgulhoso porque ele para de aprender, para de ouvir conselhos e para de depender de Deus. A sabedoria abraça a humildade, reconhecendo que tudo o que temos é graça. Quem anda baixo (humilde) não tem de onde cair."
  },
  7: {
    verse: "Em todo tempo ama o amigo e para a hora da angústia nasce o irmão. - Provérbios 17:17",
    thought: "Amizade verdadeira é provada no fogo da dificuldade.",
    action: "Ligue para um amigo que está passando por um momento difícil apenas para ouvir e orar.",
    reflection: "O mundo define amizade por conveniência e diversão. A Bíblia define por lealdade e sacrifício. O verdadeiro amigo não é aquele que só está na festa, mas aquele que permanece quando a música acaba. Ser um amigo sábio é estar disponível nos dias maus. A sabedoria também está em escolher amigos que tenham esse caráter, pois 'quem anda com os sábios será sábio' (Pv 13:20)."
  },
  8: {
    verse: "A sabedoria clama nas ruas... 'Até quando vocês, inexperientes, amarão a inexperiência?' - Provérbios 1:20-22",
    thought: "A sabedoria não é escondida, ela é acessível a quem quer ouvir.",
    action: "Tire 10 minutos para ler um capítulo da Bíblia ou ouvir um podcast edificante.",
    reflection: "Salomão personifica a Sabedoria como uma mulher que grita em público. Deus não esconde a verdade de nós; Ele quer ser encontrado. O problema muitas vezes não é a falta de informação, mas a 'inexperiência' voluntária, o desejo de permanecer na ignorância para não ter que mudar de vida. Hoje, decida sair da passividade e busque ativamente a instrução divina que está disponível ao seu redor."
  },
  9: {
    verse: "Não repreenda o zombador, caso contrário ele o odiará; repreenda o sábio, e ele o amará. - Provérbios 9:8",
    thought: "Sua reação à correção revela seu nível de sabedoria.",
    action: "Peça um feedback honesto a alguém de confiança sobre um ponto cego seu e ouça sem se defender.",
    reflection: "O tolo vê a correção como um insulto pessoal; o sábio vê como um tesouro. Ninguém gosta de ser criticado, mas a correção é o único caminho para o crescimento. Se nos cercamos apenas de pessoas que nos elogiam, estagnamos. A maturidade espiritual se manifesta quando conseguimos engolir o orgulho e dizer 'obrigado' a quem nos aponta um erro, sabendo que isso nos torna melhores."
  },
  10: {
    verse: "A bênção do Senhor traz riqueza e não inclui dor alguma. - Provérbios 10:22",
    thought: "O sucesso que vem de Deus traz paz, não apenas lucro.",
    action: "Examine se você está sacrificando sua família ou saúde por dinheiro. Reajuste suas prioridades.",
    reflection: "Existe uma riqueza que vem com 'dor' — aquela conquistada com ganância, injustiça ou sacrifício da alma. E existe a riqueza que é fruto da bênção de Deus sobre o trabalho honesto. Essa última vem acompanhada de paz de espírito e propósito. Deus não é contra a prosperidade, mas Ele é contra a prosperidade que rouba sua vida. Busque a bênção dEle primeiro, e o resto será acrescentado sem o peso da culpa."
  },
  11: {
    verse: "O generoso prosperará; quem dá alívio aos outros, alívio receberá. - Provérbios 11:25",
    thought: "A economia do Reino funciona ao contrário: você ganha quando dá.",
    action: "Faça uma doação financeira ou de tempo hoje para alguém que não pode te retribuir.",
    reflection: "O mundo ensina a acumular para ter segurança. Provérbios ensina a espalhar para crescer. A generosidade quebra o poder do dinheiro sobre nós e nos alinha com o coração de Deus. É uma lei espiritual: a água parada apodrece, mas a água que flui se mantém fresca. Quando nos tornamos canais de bênção para os outros, Deus garante que o suprimento nunca falte na nossa própria fonte."
  },
  12: {
    verse: "Os lábios que dizem a verdade permanecem para sempre, mas a língua mentirosa dura apenas um instante. - Provérbios 12:19",
    thought: "A verdade é o alicerce mais sólido que você pode construir.",
    action: "Seja radicalmente honesto hoje, mesmo nas pequenas coisas onde seria fácil mentir.",
    reflection: "A mentira é um atalho que leva a um beco sem saída. Pode parecer vantajosa no curto prazo para evitar um problema ou ganhar vantagem, mas ela sempre desmorona. A verdade, por outro lado, é eterna. Construir uma reputação de integridade leva tempo, mas é o único legado que permanece. Quem anda na verdade não precisa ter boa memória para lembrar o que disse, pois vive na luz."
  },
  13: {
    verse: "Aquele que anda com os sábios será cada vez mais sábio, mas o companheiro dos tolos acabará mal. - Provérbios 13:20",
    thought: "Você é a média das pessoas com quem mais convive.",
    action: "Avalie seu círculo íntimo. Marque um café com alguém que você admira espiritualmente.",
    reflection: "Sabedoria é contagiosa, mas a tolice também é. Não podemos mudar as pessoas, mas podemos mudar *quais* pessoas têm acesso ao nosso coração e tempo. Se você quer crescer na fé, ande com quem tem mais fé que você. Se quer ter um casamento melhor, ande com quem honra o cônjuge. Suas companhias são profecias do seu futuro. Escolha suas influências com a mesma seriedade que escolheria um remédio."
  },
  14: {
    verse: "O coração em paz dá vida ao corpo, mas a inveja apodrece os ossos. - Provérbios 14:30",
    thought: "Sua saúde física está ligada à sua saúde emocional.",
    action: "Identifique alguém de quem você sente inveja e ore pedindo que Deus abençoe essa pessoa ainda mais.",
    reflection: "A inveja é como um câncer espiritual; ela consome quem a sente, não quem é invejado. Ela nasce da comparação e da ingratidão, cegando-nos para as bênçãos que já temos. Provérbios conecta isso diretamente à saúde física ('apodrece os ossos'). A cura para a inveja é a celebração. Quando aprendemos a celebrar a vitória do outro como se fosse nossa, o veneno da inveja se transforma em remédio de alegria."
  },
  15: {
    verse: "A resposta branda desvia o furor, mas a palavra dura suscita a ira. - Provérbios 15:1",
    thought: "Você tem o poder de ser um extintor de incêndio ou gasolina.",
    action: "Em um momento de tensão hoje, escolha conscientemente baixar o tom de voz.",
    reflection: "Conflitos são inevitáveis, mas o drama é opcional. A maioria das brigas escala não pelo assunto em si, mas pelo tom de voz e palavras ásperas. A 'resposta branda' requer uma força interior imensa; é o Espírito Santo controlando o ego. Responder com mansidão quando se é atacado desarma o oponente e abre espaço para a reconciliação. Seja quem muda a atmosfera do ambiente para a paz."
  },
  16: {
    verse: "O coração do homem planeja o seu caminho, mas o Senhor lhe dirige os passos. - Provérbios 16:9",
    thought: "Faça planos, mas escreva-os a lápis. Deixe a borracha com Deus.",
    action: "Ore sobre seus planos futuros e diga: 'Senhor, seja feita a Tua vontade, não a minha'.",
    reflection: "Planejar é sábio e bíblico, mas confiar cegamente nos nossos planos é arrogância. A soberania de Deus é o fator final. Às vezes, Deus muda nossa rota para nos proteger ou para nos levar a um destino melhor do que imaginávamos. A frustração nasce quando tentamos forçar nossa agenda. A paz nasce quando submetemos nossos planos à direção dEle, confiando que os desvios de Deus são melhores que os nossos atalhos."
  },
  17: {
    verse: "Aquele que cobre uma ofensa promove o amor, mas quem a lança em rosto separa bons amigos. - Provérbios 17:9",
    thought: "O amor não mantém registro de erros.",
    action: "Decida não tocar mais num assunto passado que feriu você. Perdoe e solte.",
    reflection: "Cobrir uma ofensa não significa ignorar abuso, mas escolher não deixar que um erro defina o relacionamento. É a glória do homem 'ignorar a ofensa' (Pv 19:11). Ficar remoendo e relembrando falhas antigas é a maneira mais rápida de destruir amizades e casamentos. O perdão é um ato de esquecimento intencional das dívidas emocionais. Seja um promotor do amor, não um arquivista de mágoas."
  },
  18: {
    verse: "Torre forte é o nome do Senhor; a ela correrá o justo, e estará em alto retiro. - Provérbios 18:10",
    thought: "Sua segurança não está na conta bancária, mas no Nome de Deus.",
    action: "Em momentos de medo hoje, visualize-se entrando numa torre impenetrável chamada Jesus.",
    reflection: "Em tempos antigos, a torre forte era o último refúgio quando os muros da cidade caíam. O 'Nome do Senhor' representa Seu caráter: Fiel, Poderoso, Jeová-Jireh, Pai. Quando tudo desmorona ao nosso redor, corremos para quem Ele é. Lá, estamos 'em alto retiro', acima do alcance do inimigo. A ansiedade diminui quando percebemos a robustez do nosso Abrigo."
  },
  19: {
    verse: "A pessoa pode ter muitos planos em seu coração, mas o que prevalece é o propósito do Senhor. - Provérbios 19:21",
    thought: "O propósito de Deus é imparável. Alinhe-se a ele.",
    action: "Pergunte a Deus: 'Qual o Teu propósito para esta fase da minha vida?' e espere a resposta.",
    reflection: "Isso nos dá um descanso profundo. Podemos nos estressar tentando fazer as coisas acontecerem, mas no final, a vontade soberana de Deus vai prevalecer. Isso não gera passividade, mas confiança. Se o seu plano falhou, talvez ele estivesse desalinhado com o propósito eterno. O sucesso real não é realizar seus sonhos, mas cumprir o desígnio de Deus para sua geração."
  },
  20: {
    verse: "O espírito do homem é a lâmpada do Senhor, a qual esquadrinha todo o mais íntimo do ventre. - Provérbios 20:27",
    thought: "Sua consciência é a luz de Deus dentro de você.",
    action: "Faça um exame de consciência silencioso antes de dormir. O que Deus está iluminando?",
    reflection: "Deus nos deu o espírito e a consciência como um sistema de alarme interno. Ele usa essa 'lâmpada' para iluminar áreas escuras da nossa alma — motivações egoístas, mágoas escondidas, pecados não confessados. Não ignore essa luz suave. Quando sentimos um desconforto espiritual, é o Espírito Santo nos convidando à limpeza. Uma consciência limpa é o travesseiro mais macio que existe."
  },
  21: {
    verse: "Como correntes de águas, assim é o coração do rei na mão do Senhor; ele o inclina para onde quer. - Provérbios 21:1",
    thought: "Nenhuma autoridade humana está acima da autoridade divina.",
    action: "Ore pelas autoridades (chefes, governantes) sabendo que Deus pode mudar o coração deles.",
    reflection: "Às vezes nos sentimos impotentes diante de decisões de chefes, governos ou juízes. Salomão, um rei, reconhece que até o coração mais poderoso da terra é como um riacho nas mãos de Deus. Ele pode desviar o curso da história num instante. Isso nos encoraja a orar em vez de nos desesperar. Deus está no controle dos bastidores da história e da sua vida profissional."
  },
  22: {
    verse: "Mais digno de ser escolhido é o bom nome do que as muitas riquezas. - Provérbios 22:1",
    thought: "Sua reputação e caráter valem mais que dinheiro.",
    action: "Tome uma decisão hoje que custe algo financeiramente, mas preserve sua integridade.",
    reflection: "Dinheiro vai e vem, mas o 'bom nome' (reputação baseada em caráter) é um ativo duradouro. Um bom nome abre portas que o dinheiro não compra: confiança, respeito e influência. Em um mundo que valoriza a aparência e o lucro rápido, escolher a integridade pode parecer prejuízo no curto prazo, mas é o investimento mais lucrativo para a vida e para a eternidade."
  },
  23: {
    verse: "Não tenha inveja dos pecadores; antes, tenha sempre o temor do Senhor. - Provérbios 23:17",
    thought: "O sucesso sem Deus é uma miragem. Não inveje o que não é eterno.",
    action: "Foque na sua própria raia da corrida. Agradeça pelo que Deus te deu.",
    reflection: "Às vezes parece que os desonestos se dão bem e prosperam. O salmista Asafe também sentiu isso (Salmo 73). A cura é o 'temor do Senhor' e a perspectiva eterna. O sucesso do pecador é temporário e frágil; a herança do justo é eterna. Invejar quem não tem Deus é desejar um castelo de areia prestes a ser levado pelo mar. Mantenha seus olhos no prêmio eterno."
  },
  24: {
    verse: "Se te mostrares fraco no dia da angústia, é que a tua força é pequena. - Provérbios 24:10",
    thought: "A crise revela o tamanho da sua força, ela não a cria.",
    action: "Fortaleça-se hoje na Palavra para estar pronto para o dia mau.",
    reflection: "Você não treina para a batalha durante a batalha; você treina antes. A adversidade é o teste de estresse da nossa fé. Se desmoronamos na primeira dificuldade, é sinal de que nossa estrutura espiritual precisa de reforço. Use os dias de paz para construir alicerces profundos de oração e conhecimento de Deus, para que, quando a tempestade vier, sua casa permaneça firme na Rocha."
  },
  25: {
    verse: "Como a cidade derrubada, sem muro, assim é o homem que não pode conter o seu espírito. - Provérbios 25:28",
    thought: "Sem autocontrole, você é vulnerável a qualquer ataque.",
    action: "Identifique um gatilho que te faz perder o controle e planeje uma nova reação.",
    reflection: "Muros na antiguidade eram a principal defesa. Uma cidade sem muros era saqueada facilmente. O autocontrole (fruto do Espírito) é o nosso muro de proteção. Quando perdemos a cabeça, a paciência ou caímos em tentação impulsiva, baixamos nossas defesas e o inimigo entra para roubar, matar e destruir. Dominar a si mesmo é uma vitória maior do que conquistar uma cidade."
  },
  26: {
    verse: "Como o cão que torna ao seu vômito, assim é o tolo que reitera a sua estultícia. - Provérbios 26:11",
    thought: "Insistir no mesmo erro esperando resultados diferentes é tolice.",
    action: "Qual erro você tem repetido? Arrependa-se e mude a direção hoje.",
    reflection: "Esta imagem gráfica serve para nos chocar. O arrependimento verdadeiro envolve mudança de comportamento (metanoia), não apenas remorso. Voltar ao pecado antigo, ao relacionamento tóxico ou ao hábito destrutivo é um ciclo de tolice que nos prende no passado. Deus nos oferece novidade de vida. Deixe o 'vômito' para trás e caminhe para a mesa do banquete que Ele preparou."
  },
  27: {
    verse: "Feridas feitas por um amigo são leais, mas os beijos do inimigo são enganosos. - Provérbios 27:6",
    thought: "Valorize quem te diz a verdade, mesmo que doa.",
    action: "Agradeça a um amigo que já te confrontou ou te corrigiu por amor.",
    reflection: "Preferimos o conforto da lisonja à dor da verdade, mas a lisonja é perigosa. O verdadeiro amigo arrisca a amizade para salvar sua alma. Ele te fere com a verdade para te curar da ilusão. Discernir entre a lealdade dura e a falsidade doce é uma habilidade crucial de sabedoria. Cerque-se de pessoas que amam você o suficiente para não deixar você se destruir."
  },
  28: {
    verse: "O ímpio foge, embora ninguém o persiga, mas os justos são corajosos como o leão. - Provérbios 28:1",
    thought: "Uma consciência limpa produz uma coragem inabalável.",
    action: "Confesse qualquer pecado pendente para restaurar sua ousadia espiritual.",
    reflection: "A culpa nos torna covardes e paranoicos. O 'ímpio foge' porque sua própria sombra o acusa. Mas a justiça — não a nossa, mas a de Cristo imputada a nós e vivida em integridade — nos dá a ousadia de um leão. Quando não temos nada a esconder, não temos nada a temer. Podemos encarar a vida, as pessoas e o futuro de cabeça erguida, sabendo que Deus está ao nosso lado."
  },
  29: {
    verse: "Não havendo profecia (visão), o povo perece; mas o que guarda a lei, esse é bem-aventurado. - Provérbios 29:18",
    thought: "Você precisa de uma visão de Deus para não viver à deriva.",
    action: "Escreva em uma frase qual é a sua visão/missão de vida dada por Deus.",
    reflection: "A palavra 'visão' aqui refere-se à revelação da vontade de Deus. Sem saber para onde estamos indo ou o que Deus quer, vivemos sem freios, desperdiçando energia em coisas irrelevantes. Uma visão clara do Céu nos dá disciplina na terra. Ela organiza nossas prioridades e nos dá motivo para acordar de manhã. Quem tem um 'porquê' divino enfrenta qualquer 'como'."
  },
  30: {
    verse: "Toda palavra de Deus é pura; escudo é para os que nele confiam. - Provérbios 30:5",
    thought: "A Palavra de Deus é a única verdade não contaminada do mundo.",
    action: "Leia a Bíblia hoje buscando pureza e proteção, não apenas informação.",
    reflection: "Vivemos na era das fake news, opiniões relativas e meias-verdades. A Bíblia é descrita como 'pura' — refinada, sem mistura de erro. Ela é a rocha sólida onde podemos apoiar todo o peso da nossa existência. Além disso, ela é um escudo. Conhecer a Palavra nos protege contra as mentiras do inimigo sobre nossa identidade e futuro. Confiar no que Deus diz é a maior segurança que podemos ter."
  },
  31: {
    verse: "Enganosa é a beleza e vã a formosura, mas a mulher que teme ao Senhor, essa sim será louvada. - Provérbios 31:30",
    thought: "O caráter permanece quando a aparência desaparece.",
    action: "Elogie alguém hoje pelo seu caráter e fé, não pela sua aparência.",
    reflection: "O livro de Provérbios termina exaltando o caráter virtuoso. Em uma cultura obcecada pela imagem, Deus nos lembra do que realmente importa. Beleza física é um dom, mas é passageira. O temor do Senhor é a fonte da verdadeira beleza interior que não envelhece, mas amadurece. Seja homem ou mulher, o objetivo da vida sábia é construir um legado de fé e obras que será louvado na eternidade."
  }
};

export const HEALING_JOURNEY_DAYS: Record<number, ChallengeDayContent> = {
  1: {
    verse: "Mas ele foi traspassado pelas nossas transgressões... e pelas suas feridas fomos curados. - Isaías 53:5",
    thought: "A cura não é apenas uma possibilidade, é uma promessa paga na cruz.",
    action: "Tome a Ceia (pão e suco/vinho) em casa hoje, lembrando do corpo de Cristo quebrado pela sua saúde.",
    reflection: "A obra da cruz foi completa. Jesus não levou apenas nossos pecados, mas também nossas dores e enfermidades. A palavra 'salvação' (sozo) no grego implica integridade física, emocional e espiritual. Quando oramos por cura, não estamos tentando convencer Deus a fazer algo novo, mas reivindicando algo que Jesus já conquistou legalmente para nós há 2000 anos. A fé se apoia nesse fato consumado."
  },
  2: {
    verse: "Senhor, não sou digno de que entres em minha casa... mas dize apenas uma palavra, e o meu servo será curado. - Mateus 8:8",
    thought: "A distância não é barreira para a Palavra de Deus.",
    action: "Declare a Palavra de cura sobre sua vida ou de alguém, mesmo à distância.",
    reflection: "O centurião entendeu um segredo espiritual: autoridade. Ele sabia que a doença obedecia a Jesus assim como soldados obedecem a um general. Ele não precisava da presença física de Jesus, apenas da Sua Palavra decretada. A fé na cura não depende de sentir arrepios ou emoções, mas de confiar na autoridade absoluta da Palavra de Deus sobre qualquer diagnóstico. Uma palavra dEle muda tudo."
  },
  3: {
    verse: "Se eu tão somente tocar na orla do seu manto, ficarei sã. - Marcos 5:28",
    thought: "A fé intencional rompe multidões e obstáculos.",
    action: "Faça um ato de fé hoje (uma oração ousada, um jejum, ungir com óleo) buscando a Deus.",
    reflection: "Havia uma multidão apertando Jesus, mas apenas uma mulher 'tocou' nEle de verdade. A diferença foi a fé intencional e desesperada. Ela superou barreiras sociais, físicas e religiosas para chegar até a fonte de poder. A cura muitas vezes exige essa persistência que se recusa a aceitar o 'não' das circunstâncias. O poder de Deus está sempre disponível, mas a fé é o plugue que nos conecta a essa eletricidade."
  },
  4: {
    verse: "Porventura não há bálsamo em Gileade? Ou não há lá médico? - Jeremias 8:22",
    thought: "Deus é o Jeová-Rafa, o Senhor que te sara.",
    action: "Peça a Deus sabedoria sobre tratamentos naturais ou médicos, crendo que Ele usa meios para curar.",
    reflection: "Deus pode curar sobrenaturalmente num instante, e pode curar através de processos, remédios e médicos. O 'Bálsamo de Gileade' era um remédio real da época. A sabedoria divina não descarta a medicina, mas a consagra. Não limite a forma como Deus quer trazer sua restauração. Seja através de um milagre ou de uma mudança de hábitos de saúde, Ele é a fonte final de toda cura e vida."
  },
  5: {
    verse: "Confessai as vossas culpas uns aos outros, e orai uns pelos outros, para que sareis. - Tiago 5:16",
    thought: "Às vezes, a cura física está ligada à cura emocional e ao perdão.",
    action: "Existe alguma mágoa retida? Libere perdão hoje para destravar sua saúde emocional.",
    reflection: "Tiago conecta confissão e oração mútua à cura. O corpo muitas vezes somatiza as dores da alma — culpa não resolvida, amargura, falta de perdão. A cura integral envolve limpar o interior. A oração comunitária ('uns pelos outros') também é poderosa; Deus nos desenhou para dependermos da intercessão do Corpo de Cristo. Não carregue sua dor sozinho; abra seu coração e permita que a graça flua."
  },
  6: {
    verse: "Eis que vos dou poder para pisar serpentes e escorpiões, e sobre toda a força do inimigo... - Lucas 10:19",
    thought: "Você tem autoridade delegada por Jesus contra o mal.",
    action: "Em voz alta, repreenda a enfermidade ou o mal que tenta te afligir, usando o nome de Jesus.",
    reflection: "A doença não é de Deus. Embora Ele possa usá-la para seus propósitos, sua origem é a queda e o mundo quebrado. Jesus nos deu autoridade para resistir às obras do inimigo. Não ore apenas *para* Deus falando sobre a doença; fale *com* a doença sobre o seu Deus. Use a autoridade do Nome de Jesus para ordenar que o mal retroceda. Assuma sua posição de filho(a) com autoridade espiritual."
  },
  7: {
    verse: "Mas eis que lhe trarei a ela saúde e cura, e os sararei, e lhes manifestarei abundância de paz... - Jeremias 33:6",
    thought: "A vontade de Deus é paz e saúde abundantes.",
    action: "Descanse na promessa de restauração. Imagine-se saudável e agradeça a Deus por isso.",
    reflection: "Deus tem prazer em restaurar. A palavra 'Shalom' (paz) inclui saúde, prosperidade e bem-estar completo. A cura de Deus não é apenas remover sintomas, é trazer uma abundância de vida. Mesmo que o processo seja gradual, mantenha seus olhos na promessa final de restauração. Creia que Ele está trabalhando em suas células, em sua mente e em seu espírito para trazer um alinhamento divino."
  },
  8: {
    verse: "Ele cura os de coração quebrantado e cuida das suas feridas. - Salmos 147:3",
    thought: "As feridas da alma doem tanto quanto as do corpo, mas Deus vê ambas.",
    action: "Escreva uma carta a Deus entregando uma dor emocional do passado.",
    reflection: "Muitas vezes oramos por cura física, mas ignoramos o coração partido. Traumas, rejeições e perdas deixam cicatrizes profundas que afetam nossa saúde total. Deus se apresenta aqui como um médico cuidadoso que faz curativos na alma. Ele não despreza sua dor emocional. A cura completa começa de dentro para fora. Permita que Ele toque nas memórias dolorosas hoje."
  },
  9: {
    verse: "Filho de Davi, tem misericórdia de mim! - Marcos 10:47",
    thought: "A persistência na oração chama a atenção de Deus.",
    action: "Não pare de clamar. Repita sua oração por cura hoje com mais intensidade.",
    reflection: "Bartimeu foi mandado calar a boca pela multidão, mas ele gritou ainda mais alto. Sua fé foi barulhenta e persistente. Às vezes, o silêncio de Deus ou o desânimo das circunstâncias testam nossa determinação. Jesus parou por causa do clamor dele. Não aceite a doença passivamente como 'destino'. Clame por misericórdia até que Jesus pare e pergunte: 'O que queres que eu te faça?'"
  },
  10: {
    verse: "Perto da meia-noite, Paulo e Silas oravam e cantavam hinos a Deus... - Atos 16:25",
    thought: "O louvor no meio da dor libera poder libertador.",
    action: "Coloque um louvor alto e adore a Deus, mesmo se estiver sentindo dor ou desânimo.",
    reflection: "Paulo e Silas estavam feridos, sangrando e presos. A reação natural seria reclamar, mas eles escolheram adorar. O louvor mudou a atmosfera da prisão e provocou um terremoto. A adoração tira o foco da dor e o coloca na grandeza de Deus. Quando louvamos na tempestade, confundimos o inimigo e abrimos portas para o sobrenatural intervir em nosso corpo e circunstâncias."
  },
  11: {
    verse: "E se o Espírito daquele que dentre os mortos ressuscitou a Jesus habita em vós, aquele que dentre os mortos ressuscitou a Cristo também vivificará os vossos corpos mortais... - Romanos 8:11",
    thought: "O mesmo poder que venceu a morte vive dentro de você agora.",
    action: "Coloque a mão sobre seu corpo e declare: 'O Espírito de vida vivifica meu corpo agora'.",
    reflection: "Não precisamos pedir que Deus envie o poder lá do céu; Ele já enviou o Espírito Santo para habitar em nós. Esse é o mesmo Espírito que operou a maior cura da história: a ressurreição. A cura é uma manifestação da vida de Deus expulsando a morte. Aproprie-se dessa realidade. Seu corpo é templo do Espírito, e onde Ele habita, a morte e a doença não têm direito legal de permanecer."
  },
  12: {
    verse: "Não é este o jejum que escolhi... para desatar as ligaduras da impiedade... e que rompas todo o jugo? - Isaías 58:6",
    thought: "O jejum quebra resistências espirituais que impedem a cura.",
    action: "Faça um pequeno jejum hoje (de uma refeição ou de algo que goste) com foco na sua cura.",
    reflection: "Existem castas de oposição espiritual que 'não saem senão com oração e jejum'. O jejum não muda Deus, muda você. Ele afina sua sensibilidade espiritual e quebra a força da carne. Isaías diz que o jejum verdadeiro desata ligaduras e rompe jugos. Às vezes, a doença tem uma raiz espiritual ou uma opressão maligna por trás. O jejum é uma arma de guerra para libertar sua saúde."
  },
  13: {
    verse: "Amado, desejo que te vá bem em todas as coisas, e que tenhas saúde, assim como bem vai a tua alma. - 3 João 1:2",
    thought: "A saúde física e a prosperidade da alma andam juntas.",
    action: "Faça algo saudável hoje (beber mais água, caminhar, comer frutas) como ato de honra ao templo.",
    reflection: "A vontade de Deus é o nosso bem-estar integral. João conecta a saúde do corpo à prosperidade da alma. Uma alma amargurada, ansiosa ou cheia de pecado adoece o corpo. Uma alma cheia da paz de Deus traz vigor aos ossos. Buscar a cura envolve alinhar nossa mente e emoções com a Palavra, e também cuidar do corpo com sabedoria. Deus quer que você seja saudável para cumprir seu propósito."
  },
  14: {
    verse: "Vá, a sua fé o curou. - Marcos 10:52",
    thought: "A fé é o agente ativador do poder de Deus.",
    action: "Comece a agir como alguém curado. Planeje o futuro sem a limitação da doença.",
    reflection: "Jesus frequentemente atribuía a cura à fé da pessoa. 'A tua fé te salvou'. A fé não é negar a realidade da doença, mas negar o direito dela de ditar seu futuro. É uma certeza interior de que a Palavra de Deus é mais real que os sintomas. Ao encerrar esta jornada, mantenha a postura de fé. Agradeça pela cura, mesmo que a recuperação seja progressiva. Caminhe na certeza de que o Médico dos Médicos já deu a ordem."
  }
};

export const OPEN_DOORS_JOURNEY_DAYS: Record<number, ChallengeDayContent> = {
  1: {
    verse: "Eis que diante de ti pus uma porta aberta, e ninguém a pode fechar... - Apocalipse 3:8",
    thought: "O que Deus abre, homem nenhum, demônio nenhum pode fechar.",
    action: "Declare três vezes: 'Minha vida está sob o favor de Deus e Ele abre o caminho para mim'.",
    reflection: "A soberania de Deus é a base da nossa confiança por portas abertas. Não dependemos de 'sorte', 'QI' (quem indica) ou manipulação humana. Jesus tem a 'chave de Davi'. Quando Ele decide que é o tempo de uma nova estação em sua vida, as circunstâncias se alinham sobrenaturalmente. Descanse na certeza de que, se a porta for dEle, ela permanecerá aberta, não importa a oposição."
  },
  2: {
    verse: "Pedi, e dar-se-vos-á; buscai, e encontrareis; batei, e abrir-se-vos-á. - Mateus 7:7",
    thought: "A persistência é a chave que gira a fechadura.",
    action: "Seja específico: escreva exatamente qual porta você quer que se abra e ore por ela com detalhes.",
    reflection: "Deus ama a ousadia. Os verbos 'pedir, buscar, bater' estão no contínuo: continue pedindo, continue buscando. Muitas portas não se abrem porque paramos de bater cedo demais ou porque pedimos de forma vaga. A fé ativa se move em direção à oportunidade. Não espere a porta cair no seu colo; vá até ela, prepare-se, bata através da oração e da ação prática."
  },
  3: {
    verse: "Pois tu, Senhor, abençoarás ao justo; circundá-lo-ás da tua benevolência como de um escudo. - Salmos 5:12",
    thought: "O favor de Deus te destaca no meio da multidão.",
    action: "Ore pedindo 'favor imerecido' em suas entrevistas, reuniões ou projetos hoje.",
    reflection: "Favor é quando Deus faz as pessoas gostarem de você, confiarem em você ou quererem te ajudar, muitas vezes sem explicação lógica. É o 'escudo' que atraiu José na prisão e Ester no palácio. O favor distingue o filho de Deus. Não é mérito seu, é a benevolência dEle te cercando. Espere ser tratado de forma diferente, não por quem você é, mas por Quem está com você."
  },
  4: {
    verse: "Seja sobre nós a graça do Senhor... confirma a obra das nossas mãos. - Salmos 90:17",
    thought: "Deus abençoa o movimento, não a estagnação.",
    action: "Faça algo prático hoje para se preparar para a porta que você quer (estude, melhore o currículo, organize-se).",
    reflection: "Moisés orou para que Deus confirmasse a obra das mãos. Deus não abençoa mãos vazias ou preguiçosas. A porta aberta geralmente encontra quem já está trabalhando ou se preparando. A 'sorte' bíblica é quando o preparo encontra a oportunidade divina. Mostre a Deus que você é um bom mordomo do pouco que tem agora, e Ele confiará o muito que virá com a nova porta."
  },
  5: {
    verse: "Eis que faço uma coisa nova... Não a percebeis? - Isaías 43:19",
    thought: "Para entrar no novo, às vezes é preciso soltar o velho.",
    action: "Identifique um hábito ou mentalidade antiga que não cabe na nova fase e decida abandoná-lo.",
    reflection: "Muitas vezes oramos por portas novas, mas estamos apegados a chaves velhas. Deus pergunta: 'Não percebeis?'. Às vezes a porta já está se abrindo, mas estamos tão focados no passado, nos fracassos anteriores ou no 'sempre foi assim' que não vemos o caminho novo que Ele está abrindo no deserto. Esteja disposto a mudar, a aprender coisas novas e a deixar para trás bagagens que não servem para o futuro."
  },
  6: {
    verse: "Porque a promoção não vem do leste, nem do oeste, nem do sul... Mas Deus é o juiz. - Salmos 75:6-7",
    thought: "Sua promoção não vem do chefe, vem do Céu.",
    action: "Trabalhe hoje como se Jesus fosse seu chefe direto, com excelência, sem buscar aplausos humanos.",
    reflection: "É libertador saber que nossa carreira e destino não estão nas mãos de um gerente humano, da economia ou da política. Deus é quem abate um e exalta outro. Isso remove a necessidade de puxar saco ou trapacear para subir. Se Deus quer te levantar, Ele moverá céus e terra para te colocar na posição certa. Mantenha seu coração humilde e íntegro, e deixe que Ele cuide da sua exaltação no tempo certo."
  },
  7: {
    verse: "Prepara a tua obra de fora, e apronta-a no teu campo; e depois edifica a tua casa. - Provérbios 24:27",
    thought: "Planejamento e ordem precedem a expansão.",
    action: "Organize sua vida financeira ou sua agenda. A ordem atrai a bênção.",
    reflection: "Salomão ensina um princípio de prioridades: primeiro prepare a fonte de sustento (o campo), depois construa o conforto (a casa). Deus muitas vezes espera colocarmos ordem no caos antes de abrir a porta da abundância. Se não somos fiéis na organização do pouco, como gerenciaremos o muito? A porta aberta exige estrutura para ser mantida. Organize-se para receber o que você está pedindo."
  }
};

export const RESTORATION_JOURNEY_DAYS: Record<number, ChallengeDayContent> = {
  1: {
    verse: "Suportem-se uns aos outros e perdoem as queixas... Assim como o Senhor os perdoou, perdoem também. - Colossenses 3:13",
    thought: "O perdão não é um sentimento, é uma decisão de cancelar a dívida.",
    action: "Ore abençoando a pessoa que te feriu, decidindo não cobrar mais a ofensa emocionalmente.",
    reflection: "Restauração começa quando paramos de esperar que o outro pague pelo que fez. Jesus pagou nossa dívida impagável na cruz; isso nos tira o direito de sermos cobradores implacáveis dos outros. Perdoar não é esquecer ou concordar com o erro, é soltar o prisioneiro e descobrir que o prisioneiro era você. A decisão de perdoar desobstrui o canal para Deus restaurar o relacionamento ou curar seu coração."
  },
  2: {
    verse: "Acima de tudo, porém, tende amor intenso uns para com os outros, porque o amor cobre uma multidão de pecados. - 1 Pedro 4:8",
    thought: "O amor escolhe focar no futuro, não nos erros do passado.",
    action: "Faça um ato de bondade inesperado para a pessoa com quem você quer restaurar o vínculo.",
    reflection: "O amor 'cobre' pecados não no sentido de encobrir o mal (mentira), mas no sentido de não expor o outro à vergonha desnecessária e de absorver o impacto da ofensa para salvar a relação. É como um tecido forte que remenda o rasgo. Onde há amor intenso, pequenos erros não se tornam grandes guerras. Decida hoje ser um agente de graça, cobrindo falhas com misericórdia em vez de apontá-las com julgamento."
  },
  3: {
    verse: "Sejam todos prontos para ouvir, tardios para falar e tardios para irar-se. - Tiago 1:19",
    thought: "A maioria dos conflitos nasce de ouvir para responder, não para entender.",
    action: "Em sua próxima conversa, tente ouvir o dobro do que fala. Valide o sentimento do outro.",
    reflection: "A restauração exige comunicação humilde. Tiago nos dá a regra de ouro dos relacionamentos: ouvidos abertos, boca controlada. Muitas vezes 'vencemos' a discussão com argumentos lógicos, mas perdemos o coração da pessoa. Ser 'tardio para falar' dá tempo ao Espírito Santo para filtrar nossas palavras. Ouvir com empatia, tentando entender a dor por trás do ataque, é o primeiro passo para derrubar muros de defesa."
  },
  4: {
    verse: "Tira primeiro a trave do teu olho, e então cuidarás em tirar o argueiro do olho do teu irmão. - Mateus 7:5",
    thought: "A mudança no relacionamento começa com a mudança em mim.",
    action: "Pergunte a Deus: 'Onde eu errei? O que eu preciso mudar?' e seja sincero.",
    reflection: "É fácil ser um especialista nos erros dos outros e um advogado de defesa dos nossos próprios erros. Jesus chama isso de hipocrisia. A restauração genuína acontece quando assumimos responsabilidade pela nossa parte no conflito, mesmo que seja apenas 1%. Humildade atrai humildade. Quando baixamos as armas e admitimos nossas falhas ('a trave'), criamos um ambiente seguro para o outro também reconhecer as dele."
  },
  5: {
    verse: "A resposta branda desvia o furor, mas a palavra dura suscita a ira. - Provérbios 15:1",
    thought: "Você tem o poder de baixar a temperatura da briga.",
    action: "Se surgir um conflito hoje, responda com voz baixa e calma, mesmo se tiver razão.",
    reflection: "Fogo não se apaga com fogo, mas com água. Palavras duras são gasolina em relacionamentos em crise. A 'resposta branda' é uma arma espiritual poderosa; ela quebra o ciclo de ação e reação do orgulho. Não é fraqueza, é autodomínio guiado pelo Espírito. Escolher a mansidão quando se tem vontade de gritar é um ato de amor que pode salvar um casamento ou uma amizade da destruição."
  },
  6: {
    verse: "Melhor é serem dois do que um... Se um cair, o amigo pode ajudá-lo a levantar-se. - Eclesiastes 4:9-10",
    thought: "Fomos criados para a conexão. O orgulho isola, o amor une.",
    action: "Convide a pessoa para fazer algo juntos que não envolva discutir a relação (um passeio, um café).",
    reflection: "Restauração também precisa de reconexão positiva. Às vezes focamos tanto em resolver os problemas que esquecemos de ser amigos. Lembre-se do valor da parceria. Deus disse que 'não é bom que o homem esteja só'. O inimigo quer dividir para conquistar. Lute pela unidade. Relembrem por que é melhor estarem juntos. Criar novas memórias boas ajuda a curar as memórias ruins do passado."
  },
  7: {
    verse: "Um cordão de três dobras não se rompe com facilidade. - Eclesiastes 4:12",
    thought: "Convide Jesus para ser o terceiro fio no relacionamento.",
    action: "Se possível, orem juntos hoje. Se não, ore intensamente intercedendo pela pessoa.",
    reflection: "Relacionamentos humanos são frágeis quando baseados apenas em amor humano. Precisamos do 'terceiro fio': Deus. Quando Ele é o centro, a corda ganha uma resistência sobrenatural. Um casal ou amigos que oram juntos ou buscam a Deus, encontram nEle a força para perdoar e amar além dos limites humanos. Entregue o vínculo a Deus hoje; o que Ele une e restaura, fica firme."
  }
};

export const IMPOSSIBLE_CAUSES_JOURNEY_DAYS: Record<number, ChallengeDayContent> = {
  1: {
    verse: "Porque para Deus nada é impossível. - Lucas 1:37",
    thought: "A palavra 'impossível' não existe no dicionário do Céu.",
    action: "Escreva seu problema 'impossível' em um papel e escreva em cima, grande: DEUS É MAIOR.",
    reflection: "O anjo Gabriel disse isso a Maria quando anunciou uma gravidez virginal. O cenário humano era biologicamente impossível, mas a realidade divina se sobrepôs. Sua causa pode parecer morta, enterrada ou sem solução lógica. Mas Deus é especialista em situações sem saída. Ele não precisa de matéria-prima favorável; Ele cria do nada. Comece esta jornada tirando os limites da sua fé."
  },
  2: {
    verse: "Tende fé em Deus... quem disser a este monte: Ergue-te e lança-te no mar... assim lhe será feito. - Marcos 11:22-23",
    thought: "Fale com o monte, não apenas sobre o monte.",
    action: "Declare em voz alta a solução para o seu problema, ordenando que o obstáculo saia.",
    reflection: "Jesus nos ensinou a falar *com* o problema (o monte). Muitas vezes reclamamos do monte ou choramos por causa dele, mas raramente usamos nossa autoridade de fé para mandar ele sair. A fé de Deus em nós libera poder criativo. Não olhe para o tamanho da montanha, olhe para o tamanho do seu Deus e use a sua voz para alinhar a realidade terrena com a vontade celestial."
  },
  3: {
    verse: "Gritou o povo, e tocaram as trombetas... e o muro caiu abaixo. - Josué 6:20",
    thought: "A adoração derruba muralhas que a força humana não move.",
    action: "Tire 15 minutos hoje para louvar a Deus *antes* de ver a vitória, como se ela já tivesse acontecido.",
    reflection: "Jericó era impenetrável. A estratégia de Deus foi ilógica: rodear, tocar trombetas e gritar. Foi um ato de adoração e obediência, não de guerra militar. Quando louvamos a Deus no meio do problema, confundimos o inimigo e liberamos o poder de Deus. O louvor é a arma mais poderosa para causas impossíveis. Ele traz a presença de Deus, e onde Deus está, muralhas não podem ficar de pé."
  },
  4: {
    verse: "Profetiza sobre estes ossos, e dize-lhes: Ossos secos, ouvi a palavra do Senhor. - Ezequiel 37:4",
    thought: "Deus pode trazer vida onde só existe morte e sequidão.",
    action: "Profetize vida sobre a área mais 'seca' da sua vida (finanças, saúde, sonhos).",
    reflection: "O vale de ossos secos representava a total desesperança ('nossa esperança pereceu'). Deus chamou o profeta para ser parceiro no milagre através da palavra profética. Não aceite a morte dos seus sonhos como final. O Espírito de Deus pode entrar nos 'ossos secos' da sua situação e levantar um grande exército. Sua boca é o instrumento que Deus quer usar para soprar vida hoje."
  },
  5: {
    verse: "Tirai a pedra... Não te disse que, se creres, verás a glória de Deus? - João 11:39-40",
    thought: "Remova a incredulidade para que o milagre possa sair.",
    action: "Identifique uma atitude de descrença ('já é tarde demais', 'não tem jeito') e renuncie a ela.",
    reflection: "Lázaro estava morto há quatro dias. Cheirava mal. A lógica dizia 'acabou'. Mas Jesus mandou tirar a pedra. A pedra muitas vezes é nossa própria racionalidade cética ou autoproteção contra a decepção. Jesus desafia: 'Se creres, verás'. A fé vem antes da visão. Remova a pedra da dúvida hoje e prepare-se para ver a glória de Deus se manifestar onde já havia decomposição."
  },
  6: {
    verse: "Sol, detém-te em Gibeom... E o sol se deteve, e a lua parou. - Josué 10:12-13",
    thought: "Deus pode parar o tempo e mudar as leis naturais por você.",
    action: "Peça a Deus uma intervenção sobrenatural que desafie a lógica do tempo ou das regras humanas.",
    reflection: "Josué precisava de mais tempo para vencer a batalha, então ele pediu o impossível astronômico: que o sol parasse. E Deus ouviu a voz de um homem! Isso nos mostra que, quando estamos alinhados com o propósito de Deus, até as leis da física se curvam. Não limite Deus ao tempo cronológico (Chronos); Ele vive no Kairós e pode acelerar, parar ou reverter o tempo ao seu favor."
  },
  7: {
    verse: "Mas em todas estas coisas somos mais do que vencedores, por aquele que nos amou. - Romanos 8:37",
    thought: "A vitória final já foi garantida na ressurreição.",
    action: "Celebre! Agradeça a Deus porque a causa já está ganha nas mãos dEle.",
    reflection: "A maior causa impossível era a nossa salvação e a derrota da morte. Jesus venceu isso na cruz. Se Ele fez o maior, fará o menor. Ser 'mais que vencedor' significa que ganhamos uma batalha que Jesus lutou por nós. Encerre esta jornada não com ansiedade, mas com a paz de quem sabe que o Advogado Fiel está cuidando do seu caso. O impossível para os homens é o palco para o milagre de Deus."
  }
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
