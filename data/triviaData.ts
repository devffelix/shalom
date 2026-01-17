import { TriviaCategory } from '../types';

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
        options: ["Atua e Sal", "Azeite e Vinho", "Mel e Ervas", "Apenas orou"],
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
  },
  {
    id: 'revelation',
    title: 'Apocalipse',
    description: 'Revelações sobre o fim dos tempos e a vitória final.',
    icon: 'Sun',
    gradient: 'from-slate-900 to-slate-700',
    questions: [
      {
        id: 801,
        question: "Quem escreveu o livro de Apocalipse?",
        options: ["Pedro", "Paulo", "João", "Tiago"],
        correctAnswer: "João",
        reference: "Apocalipse 1:1",
        explanation: "João recebeu a revelação de Jesus Cristo enquanto estava exilado na ilha de Patmos."
      },
      {
        id: 802,
        question: "Onde João estava quando recebeu as visões?",
        options: ["Em Jerusalém", "Na Ilha de Patmos", "Em Roma", "No Deserto"],
        correctAnswer: "Na Ilha de Patmos",
        reference: "Apocalipse 1:9",
        explanation: "Ele estava na ilha chamada Patmos, por causa da palavra de Deus e do testemunho de Jesus."
      },
      {
        id: 803,
        question: "Para quantas igrejas na Ásia foram enviadas cartas?",
        options: ["3", "7", "12", "5"],
        correctAnswer: "7",
        reference: "Apocalipse 1:11",
        explanation: "Éfeso, Esmirna, Pérgamo, Tiatira, Sardes, Filadélfia e Laodiceia."
      },
      {
        id: 804,
        question: "Como Jesus se autodenomina no final do livro?",
        options: ["O Leão e o Cordeiro", "O Alfa e o Ômega", "O Rei dos Reis", "O Bom Pastor"],
        correctAnswer: "O Alfa e o Ômega",
        reference: "Apocalipse 22:13",
        explanation: "Eu sou o Alfa e o Ômega, o princípio e o fim, o primeiro e o derradeiro."
      },
      {
        id: 805,
        question: "Qual animal representa Jesus como o vencedor digno de abrir o livro?",
        options: ["A Águia", "O Leão", "O Touro", "O Cavalo Branco"],
        correctAnswer: "O Leão",
        reference: "Apocalipse 5:5",
        explanation: "Eis que o Leão da tribo de Judá, a raiz de Davi, venceu para abrir o livro."
      }
    ]
  },
  {
    id: 'kings',
    title: 'Reis de Israel',
    description: 'Ascensão, queda e glória da monarquia bíblica.',
    icon: 'Crown',
    gradient: 'from-yellow-600 to-yellow-800',
    questions: [
      {
        id: 901,
        question: "Quem foi o primeiro rei de Israel?",
        options: ["Davi", "Saul", "Salomão", "Samuel"],
        correctAnswer: "Saul",
        reference: "1 Samuel 10",
        explanation: "Saul foi ungido por Samuel como o primeiro rei, atendendo ao pedido do povo."
      },
      {
        id: 902,
        question: "Quem era conhecido como o homem segundo o coração de Deus?",
        options: ["Salomão", "Davi", "Josias", "Ezequias"],
        correctAnswer: "Davi",
        reference: "Atos 13:22",
        explanation: "Deus testificou de Davi: 'Achei a Davi... homem segundo o meu coração'."
      },
      {
        id: 903,
        question: "Qual rei construiu o primeiro Templo em Jerusalém?",
        options: ["Davi", "Salomão", "Roboão", "Herodes"],
        correctAnswer: "Salomão",
        reference: "1 Reis 6",
        explanation: "Davi preparou os materiais, mas foi seu filho Salomão quem edificou o templo."
      },
      {
        id: 904,
        question: "Qual rainha má perseguiu o profeta Elias?",
        options: ["Vasti", "Jezabel", "Atalia", "Dalila"],
        correctAnswer: "Jezabel",
        reference: "1 Reis 19",
        explanation: "Jezabel, esposa do rei Acabe, ameaçou matar Elias após o desafio no Monte Carmelo."
      },
      {
        id: 905,
        question: "Qual rei teve a vida prolongada em 15 anos após orar?",
        options: ["Josafá", "Ezequias", "Manassés", "Uzias"],
        correctAnswer: "Ezequias",
        reference: "2 Reis 20:6",
        explanation: "Deus ouviu a oração de Ezequias, viu suas lágrimas e acrescentou dias à sua vida."
      }
    ]
  },
  {
    id: 'exodus',
    title: 'O Êxodo',
    description: 'A libertação do Egito e a jornada no deserto.',
    icon: 'Mountain',
    gradient: 'from-amber-600 to-orange-700',
    questions: [
      {
        id: 1001,
        question: "Quantas pragas Deus enviou ao Egito?",
        options: ["7", "10", "12", "3"],
        correctAnswer: "10",
        reference: "Êxodo 7-12",
        explanation: "Foram dez pragas, culminando na morte dos primogênitos, que levaram à libertação."
      },
      {
        id: 1002,
        question: "O que Deus usou para guiar o povo durante o dia?",
        options: ["Uma coluna de fogo", "Uma estrela", "Uma coluna de nuvem", "Um anjo visível"],
        correctAnswer: "Uma coluna de nuvem",
        reference: "Êxodo 13:21",
        explanation: "O Senhor ia adiante deles, de dia numa coluna de nuvem para os guiar."
      },
      {
        id: 1003,
        question: "Qual alimento Deus enviou do céu no deserto?",
        options: ["Pão ázimo", "Maná", "Figos", "Trigo"],
        correctAnswer: "Maná",
        reference: "Êxodo 16",
        explanation: "Eles chamaram o pão de 'maná'. Era branco como semente de coentro e tinha gosto de bolo de mel."
      },
      {
        id: 1004,
        question: "Quem foi escolhido para falar por Moisés ao Faraó?",
        options: ["Josué", "Calebe", "Arão", "Hur"],
        correctAnswer: "Arão",
        reference: "Êxodo 4:14-16",
        explanation: "Arão, irmão de Moisés, foi designado como seu porta-voz (profeta)."
      },
      {
        id: 1005,
        question: "Em qual monte Moisés recebeu os Dez Mandamentos?",
        options: ["Monte das Oliveiras", "Monte Sinai", "Monte Carmelo", "Monte Moriá"],
        correctAnswer: "Monte Sinai",
        reference: "Êxodo 19-20",
        explanation: "Também conhecido como Horebe, foi onde Deus entregou as tábuas da lei."
      }
    ]
  }
];
