
const ptHome = {
  greetingMorning: 'Bom dia',
  greetingAfternoon: 'Boa tarde',
  greetingEvening: 'Boa noite',
  streak: 'Sequência',
  days: 'dias',
  level: 'Nível',
  wordOfDay: 'Palavra do Dia',
  readChapter: 'Ler Capítulo',
  share: 'Compartilhar',
  moodTitle: 'Como você está se sentindo?',
  dailyGoal: 'Meta Diária',
  goalReached: 'Meta Batida!',
  bibleChallenge: 'Desafio Bíblico',
  playNow: 'Jogar Agora',
  notes: 'Suas Anotações',
  viewLess: 'Ver menos',
  viewAll: 'Ver tudo',
  askGuide: 'Perguntar ao Guia',
  prayerFor: 'Oração para',
  saveImage: 'Salvar Imagem',
  amen: 'Amém',
  vent: 'Desabafar'
};

const ptMoods = {
  Anxious: 'Ansioso',
  Tired: 'Cansado',
  Happy: 'Feliz',
  Sad: 'Triste',
  Thankful: 'Grato',
  Confused: 'Confuso',
  Angry: 'Com Raiva'
};

const ptWorship = {
  title: 'Louvor',
  subtitle: 'Músicas para conectar seu coração ao céu.',
  searchPlaceholder: 'Buscar louvor por sentimento...',
  playing: 'Tocando',
  paused: 'Pausado',
  noAudio: 'Áudio indisponível',
  libraryTitle: 'Biblioteca de Adoração',
  noResults: 'Nenhum louvor encontrado.',
  loading: 'Carregando louvores...'
};

const ptSongsList = [
  { id: "1", title: "Milagres do Caminho", artist: "Soraya Moraes", reason: "Deus abre caminhos onde não há.", audioUrl: "https://files.catbox.moe/v0y3em.mp3" },
  { id: "2", title: "Ajuda-me Jesus", artist: "Rayne Almeida", reason: "Um clamor sincero por força e renovação.", audioUrl: "https://files.catbox.moe/kn3ywn.mp3" },
  { id: "3", title: "Oração Silenciosa", artist: "Louvor", reason: "Momento de paz e comunhão com Deus.", audioUrl: "https://files.catbox.moe/mh8izw.mp3" },
  { id: "4", title: "Chama Eterna", artist: "Adoração", reason: "Que o fogo do Espírito nunca se apague.", audioUrl: "https://files.catbox.moe/p5qwhk.mp3" },
  { id: "5", title: "O Abraço de Deus", artist: "Adoração", reason: "Sinta o conforto e o amor do Pai te envolvendo.", audioUrl: "https://files.catbox.moe/ulohm3.mp3" },
  { id: "6", title: "Língua dos Anjos", artist: "Adoração", reason: "Uma atmosfera celestial para edificar seu espírito.", audioUrl: "https://files.catbox.moe/pzx4kx.mp3" },
  { id: "7", title: "Estrela Guia", artist: "Adoração", reason: "A luz de Jesus ilumina o seu caminho.", audioUrl: "https://files.catbox.moe/kaddqg.mp3" },
  { id: "8", title: "Sopro Divino", artist: "Adoração", reason: "Sinta o renovo do Espírito Santo em sua vida.", audioUrl: "https://files.catbox.moe/i1kvh4.mp3" }
];

const ptJourney = {
  title: 'Jornadas',
  subtitle: 'Planos de leitura e desafios para fortalecer sua fé.',
  back: 'Voltar',
  completedDays: 'dias concluídos',
  yourJourney: 'Sua Jornada',
  day: 'Dia',
  searching: 'Buscando conteúdo do dia...',
  reflectionTitle: 'Reflexão',
  challengeTitle: 'Desafio Prático',
  completedButton: 'Dia Concluído',
  completeButton: 'Concluir Dia',
  conquest: 'Conquista!',
  awesome: 'Incrível! Você completou esta jornada.',
  xpReceived: 'XP Recebido',
  claimReward: 'Resgatar Recompensa'
};

const ptChallengesList = [
  { id: 'anxiety-detox', title: 'Detox de Ansiedade', description: '7 dias para trocar o medo pela paz de Deus através da entrega total.', days: 7, theme: 'Ansiedade' },
  { id: 'gratitude-journey', title: 'Jornada da Gratidão', description: '30 dias para transformar sua mente e coração através do poder da gratidão.', days: 30, theme: 'Gratidão' },
  { id: 'proverbs-wisdom', title: 'Sabedoria de Provérbios', description: '31 dias mergulhando na fonte de sabedoria para decisões e vida prática.', days: 31, theme: 'Sabedoria' },
  { id: 'healing-miracle', title: 'Milagre da Cura', description: '14 dias fortalecendo a fé para cura física, emocional e espiritual.', days: 14, theme: 'Cura Divina' },
  { id: 'open-doors', title: 'Portas Abertas', description: '21 dias de oração por provisão, emprego e direção profissional.', days: 21, theme: 'Provisão Financeira e Emprego' },
  { id: 'restoration', title: 'Restauração de Vínculos', description: '10 dias focados em perdão, amor e cura nos relacionamentos e casamento.', days: 10, theme: 'Amor, Perdão e Casamento' },
  { id: 'impossible-causes', title: 'Causas Impossíveis', description: '7 dias de clamor intenso por milagres urgentes.', days: 7, theme: 'Fé para Milagres Urgentes' }
];

const ptTrails = {
  title: 'Metas Espirituais',
  subtitle: 'Defina seu ritmo e foco para este mês.',
  focusVirtue: 'Virtude em Foco',
  monthIntent: 'Intenção do Mês',
  dailyRhythm: 'Ritmo Diário',
  chapters: 'Capítulos / Dia',
  minutes: 'Minutos / Dia',
  light: 'Leve',
  intense: 'Intenso',
  quick: 'Rápido',
  deep: 'Profundo',
  nextTarget: 'Próximo Alvo',
  days: 'dias',
  saveGoals: 'Salvar Metas',
  saving: 'Salvando...',
  savedSuccess: 'Metas Atualizadas!'
};

const ptVirtues = {
  hope: { name: 'Esperança', desc: 'Confiança no futuro.' },
  charity: { name: 'Caridade', desc: 'Amor em ação.' },
  faith: { name: 'Fé', desc: 'Certeza do invisível.' },
  patience: { name: 'Paciência', desc: 'Paz na espera.' },
  wisdom: { name: 'Sabedoria', desc: 'Escolhas divinas.' },
  courage: { name: 'Coragem', desc: 'Força para agir.' }
};

const ptChallengesMap = {
  'anxiety-detox': { title: 'Detox de Ansiedade' },
  'gratitude-journey': { title: 'Jornada da Gratidão' },
  'proverbs-wisdom': { title: 'Sabedoria' },
  'healing-miracle': { title: 'Cura Divina' },
  'open-doors': { title: 'Portas Abertas' },
  'restoration': { title: 'Restauração' },
  'impossible-causes': { title: 'Causas Impossíveis' }
};

const ptSettings = {
  title: 'Configurações',
  subtitle: 'Gerencie sua conta e preferências.',
  travelerName: 'Nome do Viajante',
  imageTooLarge: 'A imagem deve ter no máximo 1MB.',
  trophyRoom: 'Sala de Troféus',
  trophyDesc: 'Suas conquistas espirituais.',
  xpTotal: 'XP Total',
  badges: 'Emblemas',
  journeyBadges: 'Emblemas de Jornada',
  bibleBadges: 'Livros Concluídos',
  readAllBooks: 'Leia todos os capítulos de um livro para ganhar emblemas.',
  appearance: 'Aparência',
  darkMode: 'Modo Escuro',
  language: 'Idioma',
  languageDesc: 'Altere o idioma do aplicativo',
  accountSystem: 'Conta',
  logout: 'Sair da Conta',
  reset: 'Resetar Progresso',
  logoutConfirm: 'Tem certeza que deseja sair?',
  resetConfirm: 'Isso apagará todo seu progresso. Tem certeza?',
  earned: 'Conquistado'
};

const ptKids = {
  menu: {
      hello: 'Olá, Pequeno(a)!',
      title: 'Kids Zone',
      subtitle: 'Aprenda brincando!',
      explore: 'Toque para explorar',
      coloring: {
          tag: 'Criativo',
          title: 'Pintar & Criar',
          subtitle: 'Use sua imaginação',
          new: 'Novo!'
      },
      quiz: { title: 'Quiz Bíblico' },
      camera: { title: 'Foto Divertida' },
      shalomflix: {
          tag: 'Em Breve',
          title: 'Shalomflix',
          subtitle: 'Disponível em breve para assinantes'
      }
  },
  coloring: {
      title: 'Colorir',
      coloringTitle: 'Hora de Colorir',
      magicCreator: 'Criador Mágico',
      magicDesc: 'Descreva um desenho e a IA cria para você pintar!',
      placeholder: 'Ex: Leão de Judá na floresta...',
      readyIdeas: 'Ideias Prontas',
      ideas: [
          { id: 'lion', title: 'Leão de Judá', prompt: 'Um leão majestoso e amigável estilo desenho animado para colorir, traços pretos fundo branco' },
          { id: 'whale', title: 'Jonas e a Baleia', prompt: 'Uma baleia grande e feliz no mar estilo desenho para colorir, traços pretos fundo branco' },
          { id: 'ark', title: 'Arca de Noé', prompt: 'Arca de Noé com animais estilo cartoon para colorir, outline black white background' },
          { id: 'shepherd', title: 'O Bom Pastor', prompt: 'Jesus como pastor com ovelhas fofas estilo desenho para colorir, traços simples' },
          { id: 'david', title: 'Davi e Golias', prompt: 'Pequeno Davi com uma pedra e gigante Golias cartoon para colorir' },
          { id: 'angel', title: 'Anjo da Guarda', prompt: 'Um anjo fofo voando estilo desenho para colorir' },
          { id: 'creation', title: 'A Criação', prompt: 'Mundo sendo criado, sol, lua, estrelas e arvores estilo desenho para colorir' },
          { id: 'nativity', title: 'Nascimento', prompt: 'Presepio de natal com menino jesus estilo desenho para colorir' }
      ],
      aiPrompt: 'Crie um desenho para colorir infantil (line art, preto e branco, sem preenchimento, traços grossos) sobre: {prompt}. Estilo cartoon fofo.',
      error: 'Erro ao criar imagem. Tente novamente.',
      save: 'Salvar Arte',
      reset: 'Limpar'
  },
  camera: {
      title: 'Foto Kids',
      takePhoto: 'Tirar Foto',
      save: 'Salvar Foto',
      retake: 'Tirar Outra',
      noCamera: 'Sem Câmera',
      permission: 'Precisamos de acesso à câmera.',
      retry: 'Tentar Novamente',
      frames: [
          { id: 1, label: 'Herói', text: 'Herói da Fé', colors: ["#00c6ff", "#0072ff"], icon: "🦸‍♂️" },
          { id: 2, label: 'Música', text: 'Pequeno Adorador', colors: ["#FFD700", "#ff9a00"], icon: "🎵" },
          { id: 3, label: 'Coroa', text: 'Filho do Rei', colors: ["#ff9a9e", "#ff6a88"], icon: "👑" },
          { id: 4, label: 'Natureza', text: 'Criação de Deus', colors: ["#56ab2f", "#a8e063"], icon: "🌿" },
          { id: 5, label: 'Bolhas', text: 'Alegria do Senhor', colors: ["#FF8008", "#FFC837"], icon: "😄" },
          { id: 6, label: 'Amor', text: 'Jesus me Ama', colors: ["#DA22FF", "#9733EE"], icon: "❤️" }
      ],
      effects: {
          sparkles: 'Brilhos',
          confetti: 'Festa',
          amen: 'Amém',
          angel: 'Anjo',
          hearts: 'Amor'
      }
  },
  quiz: {
      title: 'Quiz Kids',
      questionsCount: 'Perguntas',
      question: 'Pergunta',
      congrats: 'Parabéns!',
      correct: 'Você acertou {score} de {total}!',
      playAgain: 'Jogar de Novo',
      exit: 'Sair',
      themes: [
          {
              id: 'creation',
              title: 'A Criação',
              questions: [
                  { q: "Quem criou o mundo?", options: ["Noé", "Deus", "Adão"], a: "Deus" },
                  { q: "O que Deus criou no primeiro dia?", options: ["Animais", "Luz", "Plantas"], a: "Luz" },
                  { q: "Quem foi o primeiro homem?", options: ["Pedro", "Adão", "José"], a: "Adão" }
              ]
          },
          {
              id: 'noah',
              title: 'Arca de Noé',
              questions: [
                  { q: "O que Noé construiu?", options: ["Uma casa", "Um templo", "Uma arca"], a: "Uma arca" },
                  { q: "Quantos animais de cada tipo entraram?", options: ["Um", "Dois (casal)", "Dez"], a: "Dois (casal)" },
                  { q: "O que apareceu no céu depois da chuva?", options: ["Arco-íris", "Estrela", "Lua"], a: "Arco-íris" }
              ]
          },
          {
              id: 'david',
              title: 'Davi e Golias',
              questions: [
                  { q: "O que Davi usou para lutar?", options: ["Espada", "Funda e pedra", "Lança"], a: "Funda e pedra" },
                  { q: "Quem era o gigante?", options: ["Golias", "Saul", "Sansão"], a: "Golias" },
                  { q: "Davi cuidava de quê?", options: ["Ovelhas", "Cavalos", "Camelos"], a: "Ovelhas" }
              ]
          },
          {
              id: 'jonah',
              title: 'Jonas',
              questions: [
                  { q: "Quem engoliu Jonas?", options: ["Um leão", "Um grande peixe", "Um urso"], a: "Um grande peixe" },
                  { q: "Para onde Jonas devia ir?", options: ["Nínive", "Tarsis", "Jerusalém"], a: "Nínive" },
                  { q: "Quantos dias ele ficou no peixe?", options: ["1 dia", "3 dias", "7 dias"], a: "3 dias" }
              ]
          },
          {
              id: 'moses',
              title: 'Moisés',
              questions: [
                  { q: "Onde a mãe de Moisés o colocou?", options: ["Num berço", "Num cesto no rio", "Numa caverna"], a: "Num cesto no rio" },
                  { q: "O que Deus usou para falar com Moisés?", options: ["Uma nuvem", "Um arbusto em fogo", "Um anjo"], a: "Um arbusto em fogo" },
                  { q: "O que Moisés abriu?", options: ["O Mar Vermelho", "O Rio Jordão", "O portão"], a: "O Mar Vermelho" }
              ]
          },
          {
              id: 'daniel',
              title: 'Daniel',
              questions: [
                  { q: "Onde Daniel foi jogado?", options: ["Num poço", "Na cova dos leões", "Na prisão"], a: "Na cova dos leões" },
                  { q: "O que os leões fizeram?", options: ["Rugiram", "Dormiram/Não comeram", "Brincaram"], a: "Dormiram/Não comeram" },
                  { q: "Quantas vezes Daniel orava?", options: ["1 vez", "2 vezes", "3 vezes"], a: "3 vezes" }
              ]
          },
          {
              id: 'nativity',
              title: 'Natal',
              questions: [
                  { q: "Onde Jesus nasceu?", options: ["Num hospital", "Num palácio", "Numa manjedoura"], a: "Numa manjedoura" },
                  { q: "Quem guiou os Reis Magos?", options: ["Um mapa", "Uma estrela", "Um anjo"], a: "Uma estrela" },
                  { q: "Qual o nome da mãe de Jesus?", options: ["Maria", "Marta", "Sara"], a: "Maria" }
              ]
          },
          {
              id: 'miracles',
              title: 'Milagres',
              questions: [
                  { q: "Jesus andou sobre o quê?", options: ["A água", "O fogo", "O ar"], a: "A água" },
                  { q: "O que Jesus multiplicou?", options: ["Ouro", "Pães e peixes", "Pedras"], a: "Pães e peixes" },
                  { q: "Quem Jesus ressuscitou?", options: ["Lázaro", "Pedro", "João"], a: "Lázaro" }
              ]
          }
      ]
  }
};

const pt = {
  common: {
    appName: 'Shalom',
    back: 'Voltar',
    loading: 'Carregando...',
    save: 'Salvar',
    saved: 'Salvo',
    error: 'Erro',
    success: 'Sucesso',
    confirm: 'Confirmar',
    cancel: 'Cancelar',
    close: 'Fechar',
    online: 'Online agora',
    today: 'Hoje',
  },
  nav: {
    home: 'Início',
    bible: 'Bíblia',
    goals: 'Metas',
    worship: 'Louvor',
    journey: 'Jornada',
    kids: 'Kids',
    settings: 'Configurações',
  },
  landing: {
    // Hero
    heroTitle: 'Seu tempo com Deus,',
    heroSubtitle: 'todos os dias',
    heroDesc: 'Um guia espiritual no WhatsApp que fortalece sua fé, te lembra da Palavra e te acompanha nas batalhas diárias.',
    ctaStart: 'Começar Agora',
    ctaPlans: 'Planos',
    login: 'Entrar',
    slogan1: 'Você nunca mais vai caminhar sozinho.',
    sloganFloat: '"Deus presente todos os dias na palma da sua mão"',
    
    // Section: God Feels / Alert
    alertSoul: 'Um alerta para sua alma',
    godFeelsTitle: 'Você já parou para pensar em como Deus se sente?',
    godFeelsText: [
      'O dia amanhece. Você pega o celular.',
      'Vê notícias, responde mensagens, trabalha, ri de memes, vê séries.',
      'O dia termina. O cansaço bate. Você dorme.',
      'E Ele ficou lá... esperando.',
      'Imagine um amor tão grande que deu a própria vida… e ainda assim espera pacientemente por você todos os dias. Ele continua te chamando com amor, mesmo no silêncio.',
      'Ele vê sua ansiedade crescendo porque você tenta carregar o mundo sozinho, enquanto Ele está a uma oração de distância querendo carregar o fardo por você.'
    ],
    godFeelsVerse: '"A Bíblia diz que Ele está à porta e bate. Não para acusar, mas para entrar e ceiar com você."',
    godFeelsRef: 'Apocalipse 3:20',
    sloganFaith: '"A fé que te acompanha"',

    // Section: Open Letter
    letterTitle: 'Caros irmãos e irmãs…',
    letterP1: 'O mundo está ficando pesado demais.',
    letterP2: 'A pressão no trabalho aumenta, mas o salário não.',
    letterP3: 'Seus filhos estão expostos a coisas que você nunca imaginou. O casamento, que deveria ser abrigo, virou tensão.',
    letterP4: 'Você sorri na igreja… mas chora escondido no banheiro.',
    letterWorstFeeling: 'E a pior sensação de todas:',
    letterAlone: 'Mesmo acreditando em Deus, às vezes você se sente sozinho.',
    letterPain: 'A ansiedade aperta. A oração não sai. E a paz… simplesmente não vem.',
    letterNotWeakness: 'Isso não é fraqueza. Isso é a vida real de quem ainda está lutando.',
    letterFear: 'Você não está apenas cansado. Você está com medo.',
    letterFearList: 'Medo do futuro. Medo de falhar. Medo de não ser suficiente.',
    letterWhatIf: '“E se o próximo for eu?”',
    letterSolitude: 'A solidão bate à porta do quarto, mesmo com a casa cheia de gente.',
    letterTiredness: 'Você tenta orar, mas o cansaço é tanto que as palavras travam na garganta.',
    letterCarryAlone: 'Não porque você deixou de crer. Mas porque você está tentando carregar tudo sozinho.',
    letterDistance: 'A verdade é que, com tanta correria, a distância entre você e Deus não acontece de uma vez… Ela cresce aos poucos.',
    letterLacks: [
      'Você quer orar, mas falta tempo.',
      'Quer ler a Bíblia, mas falta constancia.',
      'Quer ouvir Deus, mas falta silêncio.'
    ],
    letterWorldScreams: 'O mundo grita. A fé sussurra.',
    letterSurvival: 'E você vai apenas sobrevivendo… quando o plano de Deus sempre foi ver você vivendo em paz.',
    letterButIf: 'Mas e se…',
    letterWhatIfList: [
      'Deus pudesse te lembrar todos os dias que Ele está ali?',
      'E se, no momento em que o medo batesse, uma palavra de consolo chegasse até você?',
      'E se, quando a dúvida surgisse, a Palavra certa te mostrasse o caminho?'
    ],
    letterReason: 'Foi por isso que nasceu Shalom.',
    letterNotSubstitute: 'Não como um substituto da fé. Mas como um guia diário para te ajudar a caminhar com Deus, mesmo nos dias difíceis.',
    letterWhere: '…No seu WhatsApp. …No seu ritmo. ...Na sua vida real.',
    letterIncludes: 'Shalom te acompanha todos os dias com:',
    letterFeatures: [
      '✨ Uma oração pela manhã, para começar firme',
      '⚡ Uma mensagem no meio do dia, para renovar as forças',
      '🌙 E uma oração à noite, para devolver a paz ao coração'
    ],
    letterBonus: 'Além disso:',
    letterBonusDesc: 'Palavra diária explicada de forma simples, desafios espirituais para fortalecer sua fé, louvores que acalmam a alma e uma resposta carinhosa sempre que você precisar falar.',
    letterBibleOnly: 'Tudo baseado exclusivamente na Bíblia. Nada inventado. Nada além da Palavra de Deus.',
    letterJesus: 'Shalom não substitui Jesus. Shalom te aproxima de Jesus.',
    letterResults: [
      'Vai orar mais',
      'Vai entender mais a Bíblia',
      'Vai ter direção para as batalhas',
      'Vai sentir paz onde antes havia medo'
    ],
    letterAutoExit: 'Sua vida espiritual vai sair do automático.',
    letterCall: 'Se você está sentindo, agora mesmo, que Deus está te chamando para mais perto… não ignore isso.',
    letterAction: [
      '👉 Ative o Shalom no seu WhatsApp hoje',
      '👉 Receba a primeira oração ainda hoje',
      '👉 Comece a caminhar acompanhado, todos os dias'
    ],
    letterSpecial: 'Neste início, estamos liberando um plano especial para quem sente que esse chamado é agora.',
    letterTruth: 'Porque a verdade é simples:',
    letterGodHere: 'Deus não te abandonou. Ele está aqui. Ele está contigo.',
    letterFinal: 'Shalom. A paz que fala com você.',

    // Problem / Solution Sections
    problemTitle: 'A fé não morre de uma vez. Ela esfria aos poucos.',
    problemAlert: 'O Perigo do Esfriamento',
    problemDesc: [
      'Começa com um dia sem orar.',
      'Depois, a Bíblia fica fechada...',
      'Logo, os problemas parecem gigantes e Deus parece distante.',
      'Nós criamos o Shalom para salvar a sua fé dessa rotina devoradora.'
    ],
    rekindle: 'Reacenda a Chama',
    solutionTitle: 'A Bíblia deixa de ser um livro fechado.',
    solutionTag: 'A Palavra Viva',
    solutionDesc: [
      'Muitos tentam ler e param no terceiro dia.',
      'O texto parece difícil. O sono vem.',
      'No Shalom, é diferente.',
      'Ensinamos cada passagem da Bíblia de forma simples.',
      'Com citações da Bíblia que tocam sua vida hoje.',
      'Não é sobre ler muito. É sobre ler e ser transformado.'
    ],

    // Marriage & Family
    marriageTitle: 'Seu casamento precisa de um terceiro elo.',
    marriageTag: 'Aliança Blindada',
    marriageDesc: [
      'As lutas diárias desgastam o amor.',
      'Pequenas brigas viram grandes silences.',
      'O segredo para reverter isso não é apenas diálogo, é oração conjunta.',
      'O Shalom envia devocionais para casais que quebram o orgulho e unem os corações diante de Deus.'
    ],
    marriageQuote: '"O cordão de três dobras não se rompe facilmente."',
    sloganPrayer: '"Oração que te alcança onde você estiver"',
    familyTitle: 'Seus filhos veem você orando?',
    familyTag: 'Proteção do Lar',
    familyDesc: [
      'O mundo lá fora não tem misericordia da sua família.',
      'Seus filhos são bombardeados por valores invertidos na escola e nas telas.',
      'Se você não ensinar a verdade em casa, o mundo ensinará a mentira lá fora.',
      'O Shalom ajuda você a levantar um altar na sua sala.'
    ],
    familyCall: 'Salve a fé da próxima geração. Comece hoje.',

    // Worship
    worshipTitle: 'A música certa quebra cadeias invisíveis.',
    worshipTag: 'Atmosfera de Adoração',
    worshipSlogan: '"A paz que fala com você"',
    worshipDesc: 'Shalom cria 3 novos louvores todos os dias.',
    worshipSub: 'Selecionamos aqueles que seu coração mais precisa para te conectar ao Céu em segundos.',

    // Routine
    routineTitle: 'Um Dia na Presença',
    routineMorning: '07:00 | O Maná Escondido',
    routineMorningDesc: 'Antes que o caos do mundo comece, você recebe um versículo profético e uma direção clara. Sua mente é blindada antes de sair de casa.',
    routineAfternoon: '14:00 | O Escudo da Fé',
    routineAfternoonDesc: 'No auge do estresse do trabalho, quando a ansiedade bater, o Shalom te envia um louvor ou oração que acalma sua alma em 3 minutos.',
    routineNight: '22:00 | O Descanso da Alma',
    routineNightDesc: 'Ao deitar, nada de notícias ruins. Uma reflexão de paz te ajuda a entregar os problemas a Deus e dormir o sono dos justos.',

    // Journeys Gallery
    journeysTitle: 'Escolha sua Jornada',
    journeysDesc: 'Não importa qual batalha você esteja enfrentando, o Shalom tem um plano de 7 a 30 dias para guiar seus passos de volta à paz.',
    journeyAnxiety: 'Detox de Ansiedade',
    journeyAnxietyDesc: '7 dias para trocar o medo pela paz absoluta de Deus através da entrega total.',
    journeyWisdom: 'Sabedoria de Provérbios',
    journeyWisdomDesc: '31 dias mergulhando na fonte de sabedoria para decisões difíceis.',
    journeyGratitude: 'Jornada da Gratidão',
    journeyGratitudeDesc: 'Transforme sua mente e coração descobrindo a alegria nas pequenas coisas.',

    // Differential & Investment
    differentialTitle: 'Diferencial Único',
    differentialDesc: 'É o único companheiro espiritual disponível 24h, pronto para orar, ensinar e manter a presença de Deus no seu dia.',
    investmentTitle: 'Um Investimento Eterno',
    investmentDesc: [
      'Muitos de nós gastamos sem pensar com streamings, lanches e coisas que perecem.',
      'Mas hesitamos em investir no fortalecimento do nosso espírito.',
      'Shalom custa menos que uma pizza por ano.',
      'Mas o valor de ter sua mente blindada pela Palavra...',
      'Isso não tem preço.'
    ],

    // Social Proof
    testimonialQuote: '"Eu estava à beira de um burnout. O Guia Espiritual no WhatsApp foi a voz de Deus nas minhas madrugadas de insônia. Não sei o que seria de mim sem essa ferramenta."',
    testimonialAuthor: 'Juliana M.',
    testimonialInfo: 'Membro há 3 meses • São Paulo',

    // Devices
    devicesTitle: 'Sua jornada de fé, em qualquer lugar.',
    devicesTag: 'Presença constante em sua vida',
    devicesDesc: 'Acompanhe seu progresso bíblico no PC, ouça louvores no Tablet e receba sua oração diária no celular. Tudo conectado.',

    // Pricing
    pricingHeadline: 'Quanto vale a paz da sua alma e a proteção da sua família?',
    pricingSub: 'Provavelmente não tem preço. Mas hoje, nós tornamos isso acessível para todos.',
    offerTag: 'Oferta Exclusiva de Lançamento',
    packageTitle: 'Pacote Completo "Vida Cristã"',
    features: [
      { label: "Guia Espiritual 24h" },
      { label: "Louvores Exclusivos" },
      { label: "Kit Kids e Histórias" },
      { label: "Reflexões Diárias" }
    ],
    selectPlan: 'Selecione seu plano:',
    monthly: 'Mensal',
    monthlyPrice: 'R$ 9,90',
    monthlySub: '/mês',
    monthlyFlex: 'Flexibilidade total',
    yearly: 'Anual',
    yearlyPrice: '49,90',
    yearlyOriginal: 'De R$ 118,80',
    yearlyOnly: 'por apenas:',
    yearlyPayment: 'Pagamento Único',
    yearlySave: '92% Escolhem',
    pizza: 'Menos que uma pizza por ano...',
    
    warningTitle: 'Por que tão barato?',
    warningText: '"Nossa missão é espalhar o Evangelho através da tecnologia. Porém, devido aos altos custos de IA, não conseguiremos manter este preço por muito tempo. Se você fechar esta página, amanhã o valor pode ter voltado para R$ 97,00."',
    ctaAccess: 'QUERO MEU ACESSO',
    ctaAccessSub: 'Acesso imediato ao App e ao WhatsApp',

    // Guarantee & FAQ
    guaranteeTitle: 'Garantia Incondicional de 7 Dias',
    guaranteeDesc: 'Entre, use o app, converse com o Guia. Se não sentir paz no seu coração, nós devolvemos 100% do seu dinheiro. Sem perguntas.',
    faqTitle: 'Dúvidas?',
    faqList: [
      { q: 'O que é o Shalom?', a: 'O Shalom é o seu companheiro espiritual diário. Ele une a sabedoria milenar da Bíblia com a conveniência do WhatsApp e de um app moderno, enviando orações personalizadas, reflexões profundas e louvores selecionados para manter sua fé ativa todos os dias.' },
      { q: 'Preciso pagar algo a mais pelas conversas?', a: 'Não! O plano anual cobre o acesso ilimitado ao Guia Espiritual e todas as funcionalidades do app.' },
      { q: 'Funciona no iPhone e Android?', a: 'Sim, o Shalom é um Web App compatível com todos os celulares modernos, tablets e computadores.' },
      { q: 'Como cancelo se não gostar?', a: 'Direto pelo app ou enviando um e-mail para nosso suporte. É simples, rápido e sem burocracia.' }
    ],
    copyright: '© 2024 Shalom App. Feito com fé.',
    secretQuiz: 'Acessar Quiz Secreto',
    
    // Login Modal
    loginTitle: 'Acesse sua conta',
    loginDesc: 'Para entrar, insira o e-mail utilizado na compra.',
    emailPlaceholder: 'Seu e-mail de acesso',
    secureEnvironment: 'Ambiente Seguro',
    errorEmail: 'Por favor, insira um e-mail válido.',
    errorNoSub: 'Assinatura não encontrada para este e-mail. Por favor, escolha um plano para começar.',
    errorConnection: 'Erro de conexão. Tente novamente.',
  },
  home: ptHome,
  worship: ptWorship,
  journey: ptJourney,
  trails: ptTrails,
  virtues: ptVirtues,
  challenges: ptChallengesMap,
  songsList: ptSongsList,
  challengesList: ptChallengesList,
  settings: ptSettings,
  moods: ptMoods,
  kids: ptKids
};

const en = {
  ...pt, // Fallback to pt structure
  common: {
    appName: 'Shalom',
    back: 'Back',
    loading: 'Loading...',
    save: 'Save',
    saved: 'Saved',
    error: 'Error',
    success: 'Success',
    confirm: 'Confirm',
    cancel: 'Cancel',
    close: 'Close',
    online: 'Online now',
    today: 'Today',
  },
  nav: {
    home: 'Home',
    bible: 'Bible',
    goals: 'Goals',
    worship: 'Worship',
    journey: 'Journey',
    kids: 'Kids',
    settings: 'Settings',
  },
  landing: {
    // Hero
    heroTitle: 'Seu tempo com Deus,',
    heroSubtitle: 'todos os dias',
    heroDesc: 'Um guia espiritual no WhatsApp que fortalece sua fé, te lembra da Palavra e te acompanha nas batalhas diárias.',
    ctaStart: 'Start Now',
    ctaPlans: 'Plans',
    login: 'Login',
    slogan1: 'You will never walk alone again.',
    sloganFloat: '"God present every day in the palm of your hand"',
    
    alertSoul: 'An alert for your soul',
    godFeelsTitle: 'Have you ever stopped to think about how God feels?',
    godFeelsText: [
      'The day dawns. You grab your phone.',
      'Check news, reply to messages, work, laugh at memes, watch shows.',
      'The day ends. Exhaustion hits. You sleep.',
      'And He remained there... waiting.',
      'Imagine a love so great that gave its own life… and yet patiently waits for you every day. He continues to call you with love, even in silence.',
      'He sees your anxiety growing because you try to carry the world alone, while He is one prayer away wanting to carry the burden for you.'
    ],
    godFeelsVerse: '"The Bible says He stands at the door and knocks. Not to accuse, but to enter and dine with you."',
    godFeelsRef: 'Revelation 3:20',
    sloganFaith: '"The faith that accompanies you"',

    letterTitle: 'Dear brothers and sisters…',
    letterP1: 'The world is getting too heavy.',
    letterP2: 'Work pressure increases, but wages don\'t.',
    letterP3: 'Your children are exposed to things you never imagined. Marriage, which should be a shelter, has become tension.',
    letterP4: 'You smile at church… but cry hiding in the bathroom.',
    letterWorstFeeling: 'And the worst feeling of all:',
    letterAlone: 'Even believing in God, sometimes you feel alone.',
    letterPain: 'Anxiety tightens. Prayer doesn\'t come out. And peace… simply doesn\'t come.',
    letterNotWeakness: 'This is not weakness. This is the real life of those who are still fighting.',
    letterFear: 'You are not just tired. You are afraid.',
    letterFearList: 'Fear of the future. Fear of failing. Fear of not being enough.',
    letterWhatIf: '“What if I am next?”',
    letterSolitude: 'Loneliness knocks at the bedroom door, even with a house full of people.',
    letterTiredness: 'You try to pray, but you are so tired that words get stuck in your throat.',
    letterCarryAlone: 'Not because you stopped believing. But because you are trying to carry everything alone.',
    letterDistance: 'The truth is, with so much rush, the distance between you and God doesn\'t happen at once… It grows little by little.',
    letterLacks: [
      'You want to pray, but lack time.',
      'Want to read the Bible, but lack consistency.',
      'Want to hear God, but lack silence.'
    ],
    letterWorldScreams: 'The world screams. Faith whispers.',
    letterSurvival: 'And you just survive… when God\'s plan was always to see you living in peace.',
    letterButIf: 'But what if…',
    letterWhatIfList: [
      'God could remind you every day that He is there?',
      'What if, the moment fear struck, a word of comfort reached you?',
      'What if, when doubt arose, the right Word showed you the way?'
    ],
    letterReason: 'That is why Shalom was born.',
    letterNotSubstitute: 'Not as a substitute for faith. But as a daily guide to help you walk with God, even on hard days.',
    letterWhere: '…On your WhatsApp. …At your pace. ...In your real life.',
    letterIncludes: 'Shalom accompanies you every day with:',
    letterFeatures: [
      '✨ A prayer in the morning, to start strong',
      '⚡ A message in the middle of the day, to renew strength',
      '🌙 And a prayer at night, to return peace to the heart'
    ],
    letterBonus: 'Furthermore:',
    letterBonusDesc: 'Daily word explained simply, spiritual challenges to strengthen your faith, worship songs that calm the soul, and a loving response whenever you need to talk.',
    letterBibleOnly: 'All based exclusively on the Bible. Nothing invented. Nothing but the Word of God.',
    letterJesus: 'Shalom does not replace Jesus. Shalom brings you closer to Jesus.',
    letterResults: [
      'You will pray more',
      'You will understand the Bible more',
      'You will have direction for battles',
      'You will feel peace where there was fear'
    ],
    letterAutoExit: 'Your spiritual life will get off autopilot.',
    letterCall: 'If you are feeling, right now, that God is calling you closer… do not ignore this.',
    letterAction: [
      '👉 Activate Shalom on your WhatsApp today',
      '👉 Receive the first prayer today',
      '👉 Start walking accompanied, every day'
    ],
    letterSpecial: 'In this beginning, we are releasing a special plan for those who feel this call is now.',
    letterTruth: 'Because the truth is simple:',
    letterGodHere: 'God has not abandoned you. He is here. He is with you.',
    letterFinal: 'Shalom. The peace that speaks to you.',

    problemTitle: 'Faith doesn\'t die at once. It cools down slowly.',
    problemAlert: 'The Danger of Cooling Down',
    problemDesc: [
      'It starts with a day without praying.',
      'Then, the Bible stays closed...',
      'Soon, problems seem giant and God seems distant.',
      'We created Shalom to save your faith from this devouring routine.'
    ],
    rekindle: 'Rekindle the Flame',
    solutionTitle: 'The Bible stops being a closed book.',
    solutionTag: 'The Living Word',
    solutionDesc: [
      'Many try to read and stop on the third day.',
      'The text seems difficult. Sleep comes.',
      'In Shalom, it\'s different.',
      'We teach every passage of the Bible simply.',
      'With Bible quotes that touch your life today.',
      'It\'s not about reading a lot. It\'s about reading and being transformed.'
    ],

    marriageTitle: 'Your marriage needs a third cord.',
    marriageTag: 'Armored Alliance',
    marriageDesc: [
      'Daily struggles wear down love.',
      'Small fights turn into big silences.',
      'The secret to reversing this isn\'t just dialogue, it\'s joint prayer.',
      'Shalom sends devotionals for couples that break pride and unite hearts before God.'
    ],
    marriageQuote: '"A cord of three strands is not quickly broken."',
    sloganPrayer: '"Prayer that reaches you wherever you are"',
    familyTitle: 'Do your children see you praying?',
    familyTag: 'Home Protection',
    familyDesc: [
      'The world outside has no mercy on your family.',
      'Your children are bombarded by inverted values at school and on screens.',
      'If you don\'t teach the truth at home, the world will teach the lie outside.',
      'Shalom helps you raise an altar in your living room.'
    ],
    familyCall: 'Save the faith of the next generation. Start today.',

    worshipTitle: 'The right music breaks invisible chains.',
    worshipTag: 'Worship Atmosphere',
    worshipSlogan: '"The peace that speaks to you"',
    worshipDesc: 'Shalom creates 3 new worship songs every day.',
    worshipSub: 'We select those your heart needs most to connect you to Heaven in seconds.',

    routineTitle: 'A Day in the Presence',
    routineMorning: '07:00 | The Hidden Manna',
    routineMorningDesc: 'Before the world\'s chaos begins, you receive a prophetic verse and clear direction. Your mind is shielded before leaving home.',
    routineAfternoon: '14:00 | The Shield of Faith',
    routineAfternoonDesc: 'At the height of work stress, when anxiety hits, Shalom sends you a worship song or prayer that calms your soul in 3 minutes.',
    routineNight: '22:00 | The Soul\'s Rest',
    routineNightDesc: 'Upon lying down, no bad news. A reflection of peace helps you surrender problems to God and sleep the sleep of the just.',

    journeysTitle: 'Choose Your Journey',
    journeysDesc: 'No matter what battle you are facing, Shalom has a 7 to 30 day plan to guide your steps back to peace.',
    journeyAnxiety: 'Anxiety Detox',
    journeyAnxietyDesc: '7 days to trade fear for God\'s absolute peace through total surrender.',
    journeyWisdom: 'Proverbs Wisdom',
    journeyWisdomDesc: '31 days diving into the source of wisdom for difficult decisions.',
    journeyGratitude: 'Gratitude Journey',
    journeyGratitudeDesc: 'Transform your mind and heart by discovering joy in small things.',

    differentialTitle: 'Unique Differential',
    differentialDesc: 'It is the only spiritual companion available 24h, ready to pray, teach, and keep God\'s presence in your day.',
    investmentTitle: 'An Eternal Investment',
    investmentDesc: [
      'Many of us spend without thinking on streaming, snacks, and perishable things.',
      'But we hesitate to invest in strengthening our spirit.',
      'Shalom costs less than a pizza per year.',
      'But the value of having your mind shielded by the Word...',
      'That is priceless.'
    ],

    testimonialQuote: '"I was on the verge of burnout. The Spiritual Guide on WhatsApp was the voice of God in my sleepless nights. I don\'t know what would become of me without this tool."',
    testimonialAuthor: 'Juliana M.',
    testimonialInfo: 'Member for 3 months • São Paulo',

    devicesTitle: 'Your faith journey, anywhere.',
    devicesTag: 'Constant presence in your life',
    devicesDesc: 'Track your Bible progress on PC, listen to worship on Tablet, and receive your daily prayer on mobile. Everything connected.',

    pricingHeadline: 'How much is your soul\'s peace and your family\'s protection worth?',
    pricingSub: 'Probably priceless. But today, we make it accessible to everyone.',
    offerTag: 'Exclusive Launch Offer',
    packageTitle: '"Christian Life" Complete Package',
    features: [
      { label: "24h Spiritual Guide" },
      { label: "Exclusive Worship" },
      { label: "Kids Kit & Stories" },
      { label: "Daily Reflections" }
    ],
    selectPlan: 'Select your plan:',
    monthly: 'Monthly',
    monthlyPrice: '$ 1.99',
    monthlySub: '/mo',
    monthlyFlex: 'Total flexibility',
    yearly: 'Yearly',
    yearlyPrice: '8.99',
    yearlyOriginal: 'From $ 29.90',
    yearlyOnly: 'for only:',
    yearlyPayment: 'One-time Payment',
    yearlySave: '92% Choose this',
    pizza: 'Less than a pizza per year...',
    
    warningTitle: 'Why so cheap?',
    warningText: '"Our mission is to spread the Gospel through technology. However, due to high AI costs, we cannot maintain this price for long. If you close this page, tomorrow the value might be back to normal."',
    ctaAccess: 'GET MY ACCESS',
    ctaAccessSub: 'Instant access to App and WhatsApp',

    guaranteeTitle: '7-Day Unconditional Guarantee',
    guaranteeDesc: 'Enter, use the app, talk to the Guide. If you don\'t feel peace in your heart, we refund 100% of your money. No questions asked.',
    faqTitle: 'Questions?',
    faqList: [
      { q: 'What is Shalom?', a: 'Shalom is your daily spiritual companion. It unites ancient biblical wisdom with the convenience of WhatsApp and a modern app, sending personalized prayers, deep reflections, and selected worship songs to keep your faith active every day.' },
      { q: 'Is there an extra cost for WhatsApp?', a: 'No! The annual plan covers unlimited access to the Spiritual Guide and all app features.' },
      { q: 'Does it work on iPhone and Android?', a: 'Yes, Shalom is a Web App compatible with all modern mobile phones, tablets, and computers.' },
      { q: 'How do I cancel if I don\'t like it?', a: 'Directly through the app or by sending an email to our support. It\'s simple, fast, and hassle-free.' }
    ],
    copyright: '© 2024 Shalom App. Made with faith.',
    secretQuiz: 'Access Secret Quiz',
    
    loginTitle: 'Access your account',
    loginDesc: 'To enter, insert the email used for purchase.',
    emailPlaceholder: 'Your access email',
    secureEnvironment: 'Secure Environment',
    errorEmail: 'Please enter a valid email.',
    errorNoSub: 'Subscription not found for this email. Please choose a plan to start.',
    errorConnection: 'Connection error. Please try again.',
  }
};

const es = {
  ...pt,
  common: {
    appName: 'Shalom',
    back: 'Volver',
    loading: 'Cargando...',
    save: 'Guardar',
    saved: 'Guardado',
    error: 'Error',
    success: 'Éxito',
    confirm: 'Confirmar',
    cancel: 'Cancelar',
    close: 'Cerrar',
    online: 'En línea',
    today: 'Hoy',
  },
  nav: {
    home: 'Inicio',
    bible: 'Biblia',
    goals: 'Metas',
    worship: 'Adoración',
    journey: 'Jornada',
    kids: 'Niños',
    settings: 'Configuración',
  },
  landing: {
    // Hero
    heroTitle: 'Tu tiempo con Dios,',
    heroSubtitle: 'todos los días',
    heroDesc: 'Un guía espiritual en WhatsApp que fortalece tu fe, te recuerda la Palabra y te acompaña en las batallas diarias.',
    ctaStart: 'Empezar Ahora',
    ctaPlans: 'Planes',
    login: 'Entrar',
    slogan1: 'Nunca más caminarás solo.',
    sloganFloat: '"Dios presente todos los días en la palma de tu mano"',
    
    alertSoul: 'Una alerta para tu alma',
    godFeelsTitle: '¿Alguna vez te has detenido a pensar cómo se siente Dios?',
    godFeelsText: [
      'Amanece. Tomas el teléfono.',
      'Ves noticias, respondes mensajes, trabajas, ríes de memes, ves series.',
      'El día termina. El cansancio golpea. Duermes.',
      'Y Él se quedó allí... esperando.',
      'Imagina un amor tan grande que dio su propia vida... y aún así espera pacientemente por ti todos los días. Él sigue llamándote con amor, incluso en el silencio.',
      'Él ve tu ansiedad creciendo porque intentas cargar el mundo solo, mientras Él está a una oración de distancia querendo llevar la carga por ti.'
    ],
    godFeelsVerse: '"La Biblia dice que Él está a la puerta y llama. No para acusar, sino para entrar y cenar contigo."',
    godFeelsRef: 'Apocalipsis 3:20',
    sloganFaith: '"La fe que te acompaña"',

    letterTitle: 'Queridos hermanos y hermanas...',
    letterP1: 'El mundo se está volviendo demasiado pesado.',
    letterP2: 'La presión en el trabajo aumenta, pero el salario no.',
    letterP3: 'Tus hijos están expuestos a cosas que nunca imaginaste. El matrimonio, que debería ser refugio, se volvió tensión.',
    letterP4: 'Sonríes en la iglesia... pero lloras a escondidas en el baño.',
    letterWorstFeeling: 'Y la peor sensación de todas:',
    letterAlone: 'Incluso creyendo en Dios, a veces te sientes solo.',
    letterPain: 'La ansiedad aprieta. La oración no sale. Y la paz... simplemente no llega.',
    letterNotWeakness: 'Esto no es debilidad. Esta es la vida real de quien todavía está luchando.',
    letterFear: 'No estás solo cansado. Tienes miedo.',
    letterFearList: 'Miedo al futuro. Miedo a fallar. Miedo a no ser suficiente.',
    letterWhatIf: '“¿Y si soy el siguiente?”',
    letterSolitude: 'La soledad golpea a la puerta de la habitación, incluso con la casa llena de gente.',
    letterTiredness: 'Intentas orar, pero el cansancio es tanto que las palabras se traban en la garganta.',
    letterCarryAlone: 'No porque dejaste de creer. Sino porque estás intentando cargar todo solo.',
    letterDistance: 'La verdad es que, con tanta prisa, la distancia entre tú y Dios no ocurre de una vez... Crece poco a poco.',
    letterLacks: [
      'Quieres orar, pero falta tiempo.',
      'Quieres leer la Biblia, pero falta constancia.',
      'Quieres oír a Dios, pero falta silencio.'
    ],
    letterWorldScreams: 'El mundo grita. La fe susurra.',
    letterSurvival: 'Y tú vas solo sobreviviendo... cuando el plan de Dios siempre fue verte viviendo en paz.',
    letterButIf: 'Pero y si...',
    letterWhatIfList: [
      '¿Dios pudiera recordarte todos los días que Él está allí?',
      '¿Y si, en el momento en que el miedo golpeara, una palabra de consuelo llegara a ti?',
      '¿Y si, cuando la duda surgiera, la Palabra correcta te mostrara el camino?'
    ],
    letterReason: 'Por eso nació Shalom.',
    letterNotSubstitute: 'No como un sustituto de la fe. Sino como una guía diaria para ayudarte a caminar con Dios, incluso en los días difíciles.',
    letterWhere: '...En tu WhatsApp. ...A tu ritmo. ...En tu vida real.',
    letterIncludes: 'Shalom te acompaña todos los días con:',
    letterFeatures: [
      '✨ Una oración por la mañana, para empezar firme',
      '⚡ Un mensaje al mediodía, para renovar las fuerzas',
      '🌙 Y una oración por la noche, para devolver la paz al corazón'
    ],
    letterBonus: 'Además:',
    letterBonusDesc: 'Palabra diaria explicada de forma simple, desafíos espirituales para fortalecer tu fe, alabanzas que calman el alma y una respuesta cariñosa siempre que necesites hablar.',
    letterBibleOnly: 'Todo basado exclusivamente en la Biblia. Nada inventado. Nada más que la Palabra de Dios.',
    letterJesus: 'Shalom no sustituye a Jesús. Shalom te acerca a Jesús.',
    letterResults: [
      'Vas a orar más',
      'Vas a entender más la Biblia',
      'Vas a tener dirección para las batallas',
      'Vas a sentir paz donde antes había miedo'
    ],
    letterAutoExit: 'Tu vida espiritual saldrá del piloto automático.',
    letterCall: 'Si estás sintiendo, ahora mismo, que Dios te está llamando más cerca... no ignores esto.',
    letterAction: [
      '👉 Activa Shalom en tu WhatsApp hoy',
      '👉 Recibe la primera oración hoy mismo',
      '👉 Comienza a caminar acompañado, todos los días'
    ],
    letterSpecial: 'En este inicio, estamos liberando un plan especial para quien siente que este llamado es ahora.',
    letterTruth: 'Porque la verdad es simple:',
    letterGodHere: 'Dios no te abandonó. Él está aquí. Él está contigo.',
    letterFinal: 'Shalom. La paz que habla contigo.',

    problemTitle: 'La fe no muere de una vez. Se enfría poco a poco.',
    problemAlert: 'El Peligro del Enfriamiento',
    problemDesc: [
      'Comienza con un día sin orar.',
      'Después, la Biblia queda cerrada...',
      'Luego, los problemas parecen gigantes y Dios parece distante.',
      'Creamos Shalom para salvar tu fe de esta rutina devoradora.'
    ],
    rekindle: 'Reaviva la Llama',
    solutionTitle: 'La Biblia deja de ser un libro cerrado.',
    solutionTag: 'La Palabra Viva',
    solutionDesc: [
      'Muchos intentan leer y paran al tercer día.',
      'El texto parece difícil. El sueño viene.',
      'En Shalom, es diferente.',
      'Enseñamos cada pasaje de la Biblia de forma simple.',
      'Con citas de la Biblia que tocan tu vida hoy.',
      'No se trata de leer mucho. Se trata de leer y ser transformado.'
    ],

    marriageTitle: 'Tu matrimonio necesita un tercer hilo.',
    marriageTag: 'Alianza Blindada',
    marriageDesc: [
      'Las luchas diarias desgastan el amor.',
      'Pequeñas peleas se convierten en grandes silencios.',
      'El secreto para revertir esto no es solo diálogo, es oración conjunta.',
      'Shalom envía devocionales para parejas que rompen el orgullo y unen los corazones ante Dios.'
    ],
    marriageQuote: '"Cordón de tres dobleces no se rompe pronto."',
    sloganPrayer: '"Oración que te alcanza onde estés"',
    familyTitle: '¿Tus hijos te ven orando?',
    familyTag: 'Protección del Hogar',
    familyDesc: [
      'El mundo allá afuera no tiene misericordia de tu familia.',
      'Tus hijos son bombardeados por valores invertidos en la escuela y en las pantallas.',
      'Si no enseñas la verdad en casa, el mundo enseñará la mentira afuera.',
      'Shalom te ayuda a levantar un altar en tu sala.'
    ],
    familyCall: 'Salva la fe de la próxima generación. Empieza hoy.',

    worshipTitle: 'La música correcta rompe cadenas invisibles.',
    worshipTag: 'Atmósfera de Adoración',
    worshipSlogan: '"La paz que habla contigo"',
    worshipDesc: 'Shalom crea 3 nuevas alabanzas todos los días.',
    worshipSub: 'Seleccionamos aquellos que tu corazón más necesita para conectarte al Cielo en segundos.',

    routineTitle: 'Un Día en la Presencia',
    routineMorning: '07:00 | El Maná Escondido',
    routineMorningDesc: 'Antes de que comience el caos del mundo, recibes un versículo profético e una dirección clara. Tu mente está blindada antes de salir de casa.',
    routineAfternoon: '14:00 | El Escudo de la Fe',
    routineAfternoonDesc: 'En el apogeo del estrés laboral, cuando la ansiedad golpea, Shalom te envía una alabanza u oración que calma tu alma en 3 minutos.',
    routineNight: '22:00 | El Descanso del Alma',
    routineNightDesc: 'Al acostarte, nada de malas noticias. Una reflexión de paz te ayuda a entregar los problemas a Dios y dormir el sueño de los justos.',

    journeysTitle: 'Elige tu Jornada',
    journeysDesc: 'No importa qué batalla estés enfrentando, Shalom tiene un plan de 7 a 30 días para guiar tus pasos de vuelta a la paz.',
    journeyAnxiety: 'Detox de Ansiedad',
    journeyAnxietyDesc: '7 días para cambiar el miedo por la paz absoluta de Dios a través de la entrega total.',
    journeyWisdom: 'Sabiduría de Proverbios',
    journeyWisdomDesc: '31 días sumergiéndote en la fuente de sabiduría para decisiones difíciles.',
    journeyGratitude: 'Jornada de Gratitud',
    journeyGratitudeDesc: 'Transforma tu mente y corazón descubriendo la alegría en las pequeñas cosas.',

    differentialTitle: 'Diferencial Único',
    differentialDesc: 'Es el único compañero espiritual disponible 24h, listo para orar, enseñar y mantener la presencia de Dios en tu día.',
    investmentTitle: 'Una Inversión Eterna',
    investmentDesc: [
      'Muchos de nosotros gastamos sin pensar en streaming, bocadillos y cosas que perecen.',
      'Pero dudamos en invertir en el fortalecimiento de nuestro espíritu.',
      'Shalom cuesta menos que una pizza al año.',
      'Pero el valor de tener tu mente blindada por la Palabra...',
      'Eso no tiene precio.'
    ],

    testimonialQuote: '"Estaba al borde del burnout. El Guía Espiritual en WhatsApp fue la voz de Dios en mis madrugadas de insomnio. No sé qué sería de mí sin esta herramienta."',
    testimonialAuthor: 'Juliana M.',
    testimonialInfo: 'Miembro hace 3 meses • São Paulo',

    devicesTitle: 'Tu jornada de fe, en cualquier lugar.',
    devicesTag: 'Presencia constante en tu vida',
    devicesDesc: 'Sigue tu progreso bíblico en PC, escucha alabanzas en Tablet y recibe tu oración diaria en el móvil. Todo conectado.',

    pricingHeadline: '¿Cuánto vale la paz de tu alma y la protección de tu familia?',
    pricingSub: 'Probablemente no tiene precio. Pero hoy, lo hacemos accesible para todos.',
    offerTag: 'Oferta Exclusiva de Lanzamiento',
    packageTitle: 'Paquete Completo "Vida Cristiana"',
    features: [
      { label: "Guía Espiritual 24h" },
      { label: "Alabanzas Exclusivas" },
      { label: "Kit Kids e Historias" },
      { label: "Reflexiones Diarias" }
    ],
    selectPlan: 'Selecciona tu plan:',
    monthly: 'Mensual',
    monthlyPrice: '$ 1.99',
    monthlySub: '/mes',
    monthlyFlex: 'Flexibilidad total',
    yearly: 'Anual',
    yearlyPrice: '8.99',
    yearlyOriginal: 'De $ 29.90',
    yearlyOnly: 'por solo:',
    yearlyPayment: 'Pago Único',
    yearlySave: '92% Eligen este',
    pizza: 'Menos que una pizza al año...',
    
    warningTitle: '¿Por qué tan barato?',
    warningText: '"Nuestra misión es difundir el Evangelio a través de la tecnología. Sin embargo, debido a los altos costos de IA, no podremos mantener este precio por mucho tiempo. Si cierras esta página, mañana el valor puede haber vuelto a la normalidad."',
    ctaAccess: 'QUIERO MI ACCESO',
    ctaAccessSub: 'Acceso inmediato a la App y WhatsApp',

    guaranteeTitle: 'Garantía Incondicional de 7 Días',
    guaranteeDesc: 'Entra, usa la app, habla con el Guía. Si no sientes paz en tu corazón, te devolvemos el 100% de tu dinero. Sin preguntas.',
    faqTitle: '¿Dudas?',
    faqList: [
      { q: '¿Qué es Shalom?', a: 'Shalom es tu compañero espiritual diario. Une la sabiduría milenaria de la Biblia con la conveniência de WhatsApp y una app moderna, enviando oraciones personalizadas, reflexiones profundas y alabanzas seleccionadas para mantener tu fe activa todos os días.' },
      { q: '¿Debo pagar algo extra por el chat?', a: '¡No! El plan anual cubre acceso ilimitado al Guía Espiritual y todas las funcionalidades de la app.' },
      { q: '¿Funciona en iPhone e Android?', a: 'Sí, Shalom es una Web App compatible con todos los celulares modernos, tablets y computadoras.' },
      { q: '¿Cómo cancelo si no me gusta?', a: 'Directamente por la app o enviando un correo a nuestro soporte. Es simple, rápido y sin burocracia.' }
    ],
    copyright: '© 2024 Shalom App. Hecho con fe.',
    secretQuiz: 'Acceder Quiz Secreto',
    
    loginTitle: 'Accede a tu cuenta',
    loginDesc: 'Para entrar, ingresa el correo utilizado en la compra.',
    emailPlaceholder: 'Tu correo de acceso',
    secureEnvironment: 'Ambiente Seguro',
    errorEmail: 'Por favor, ingresa un correo válido.',
    errorNoSub: 'Suscripción no encontrada para este correo. Por favor, elige un plan para comenzar.',
    errorConnection: 'Error de conexión. Inténtalo de nuevo.',
  }
};

export const translations = { pt, en, es };
