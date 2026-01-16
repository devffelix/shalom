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
  { id: "8", title: "Sopro Divino", artist: "Adoração", reason: "Sinta o renovo do Espírito Santo em sua vida.", audioUrl: "https://files.catbox.moe/i1kvh4.mp3" },
  { id: "9", title: "Calma que vem de Deus", artist: "Adoração", reason: "Sinta a paz profunda que só o Espírito pode dar.", audioUrl: "https://files.catbox.moe/xsydaw.mp3" },
  { id: "10", title: "Chuva de Tesouros", artist: "Adoração", reason: "Promessas de abundância e bênçãos sobre sua vida.", audioUrl: "https://files.catbox.moe/ot79va.mp3" },
  { id: "11", title: "Liberta o meu coração", artist: "Adoração", reason: "Um clamor por liberdade espiritual e cura interior.", audioUrl: "https://files.catbox.moe/zlhcub.mp3" }
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
  { id: 'restoration', title: 'Restauração de Vínculos', description: '30 dias de imersão profunda no perdão, amor sacrificial e reconstrução de alianças.', days: 30, theme: 'Amor, Perdão e Casamento' },
  { id: 'gratitude-journey', title: 'Jornada da Gratidão', description: '30 dias para transformar sua mente e coração através do poder da gratidão.', days: 30, theme: 'Gratidão' },
  { id: 'purpose-discovery', title: 'Descoberta de Propósito', description: '7 dias mergulhando no plano original de Deus para sua existência.', days: 7, theme: 'Propósito' },
  { id: 'fearless-faith', title: 'Fé Inabalável', description: '7 dias para vencer o medo e a insegurança através da coragem bíblica.', days: 7, theme: 'Coragem' },
  { id: 'biblical-identity', title: 'Identidade em Cristo', description: '7 dias fortalecendo quem você é aos olhos de Deus.', days: 7, theme: 'Autoestima' },
  { id: 'stewardship-life', title: 'Mordomia Ativa', description: '7 dias de sabedoria para carreira, finanças e gestão da vida.', days: 7, theme: 'Trabalho' },
  { id: 'proverbs-wisdom', title: 'Sabedoria de Provérbios', description: '31 dias mergulhando na fonte de sabedoria para decisões e vida prática.', days: 31, theme: 'Sabedoria' },
  { id: 'healing-miracle', title: 'Milagre da Cura', description: '14 dias fortalecendo a fé para cura física, emocional e espiritual.', days: 14, theme: 'Cura Divina' },
  { id: 'open-doors', title: 'Portas Abertas', description: '21 dias de oração por provisão, emprego e direção profissional.', days: 21, theme: 'Provisão Financeira e Emprego' },
  { id: 'impossible-causes', title: 'Causas Impossíveis', description: '7 dias de clamor intenso por milagres urgentes.', days: 7, theme: 'Fé para Milagres Urgentes' }
];

const ptTrails = {
  title: 'Metas Espirituales',
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
  'restoration': { title: 'Restauração de Vínculos' },
  'gratitude-journey': { title: 'Jornada da Gratidão' },
  'purpose-discovery': { title: 'Descoberta de Propósito' },
  'fearless-faith': { title: 'Fé Inabalável' },
  'biblical-identity': { title: 'Identidade em Cristo' },
  'stewardship-life': { title: 'Mordomia Ativa' },
  'proverbs-wisdom': { title: 'Sabedoria' },
  'healing-miracle': { title: 'Cura Divina' },
  'open-doors': { title: 'Portas Abertas' },
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
          { id: 'creation', title: 'A Criação', prompt: 'Mundo sendo criado, sol, moon, estrelas e arvores estilo desenho para colorir' },
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
          { id: 2, label: 'Music', text: 'Pequeno Adorador', colors: ["#FFD700", "#ff9a00"], icon: "🎵" },
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

export const pt = {
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
    heroTitle: 'Seu tempo com Deus,',
    heroSubtitle: 'todos os dias',
    heroDesc: 'Um guia espiritual no WhatsApp que fortalece sua fé, te lembra da Palavra e te acompanha nas batalhas diárias.',
    ctaStart: 'Começar Agora',
    ctaPlans: 'Planos',
    login: 'Entrar',
    slogan1: 'Você nunca mais vai caminhar sozinho.',
    sloganFloat: '"Deus presente todos os dias na palma da sua mão"',
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
    letterTitle: 'Caros irmãos e irmãs…',
    letterP1: 'O mundo está ficando pesado demais.',
    letterP2: 'A pressão no trabalho aumenta, mas o salário não.',
    letterP3: 'Seus filhos estão expostos a coisas que você nunca imaginou. O casamento, que deveria ser abrigo, virou tensão.',
    letterP4: 'Você sorri na igreja… mas chora escondido no banheiro.',
    letterWorstFeeling: 'And the worst feeling of all:',
    letterAlone: 'Even believing in God, sometimes you feel alone.',
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
    letterBibleOnly: 'All based exclusivamente na Bíblia. Nada inventado. Nada além da Palavra de Deus.',
    letterJesus: 'Shalom não substitui Jesus. Shalom te aproxima de Jesus.',
    letterResults: [
      'Vai orar mais',
      'Vai entender mais a Bíblia',
      'Vai ter direção para as batalhas',
      'Vai sentir paz onde antes havia medo'
    ],
    letterAutoExit: 'Sua vida espiritual vai sair do automático.',
    letterCall: 'If you are feeling, right now, that God is calling you closer… do not ignore this.',
    letterAction: [
      '👉 Ative o Shalom no seu WhatsApp hoje',
      '👉 Receba a primeira oração ainda hoje',
      '👉 Comece a caminhar acompanhado, todos os dias'
    ],
    letterSpecial: 'Neste início, estamos liberando um plano especial para quem sente que esse chamado é agora.',
    letterTruth: 'Porque a verdade é simples:',
    letterGodHere: 'Deus não te abandonou. Ele está aqui. Ele está contigo.',
    letterFinal: 'Shalom. A paz que fala com você.',
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
    worshipTitle: 'A música certa quebra cadeias invisíveis.',
    worshipTag: 'Atmosfera de Adoração',
    worshipSlogan: '"A paz que fala com você"',
    worshipDesc: 'Shalom cria 3 novos louvores todos os dias.',
    worshipSub: 'Selecionamos aqueles que seu coração mais precisa para te conectar ao Céu em segundos.',
    routineTitle: 'Um Dia na Presença',
    routineMorning: '07:00 | O Maná Escondido',
    routineMorningDesc: 'Antes que o caos do mundo comece, você recebe um versículo profético e uma direção clara. Sua mente é blindada antes de sair de casa.',
    routineAfternoon: '14:00 | O Escudo da Fé',
    routineAfternoonDesc: 'No auge do estresse do trabalho, quando a ansiedade bater, o Shalom te envia um louvor ou oração que acalma sua alma em 3 minutos.',
    routineNight: '22:00 | O Descanso da Alma',
    routineNightDesc: 'Ao deitar, nada de notícias ruins. Uma reflexão de paz te ajuda a entregar os problemas a Deus e dormir o sono dos justos.',
    journeysTitle: 'Escolha sua Jornada',
    journeysDesc: 'Não importa qual batalha você esteja enfrentando, o Shalom tem um plano de 7 a 30 dias para guiar seus passos de volta à paz.',
    journeyAnxiety: 'Detox de Ansiedade',
    journeyAnxietyDesc: '7 dias para trocar o medo pela paz absoluta de Deus através da entrega total.',
    journeyWisdom: 'Sabedoria de Provérbios',
    journeyWisdomDesc: '31 dias mergulhando na fonte de sabedoria para decisões difíceis.',
    journeyGratitude: 'Jornada da Gratidão',
    journeyGratitudeDesc: 'Transforme sua mente e coração descobrindo a alegria nas pequenas coisas.',
    differentialTitle: 'Diferencial Único',
    differentialDesc: 'É o único companheiro espiritual disponível 24h, pronto para orar, ensinar e manter a presença de Deus no seu dia.',
    investmentTitle: 'Um Investimento Eterno',
    investmentDesc: [
      'Muitos de nós gastamos sem pensar com streamings, lanches e coisas que perecem.',
      'But we hesitate to invest in strengthening our spirit.',
      'Shalom custa menos que uma pizza por ano.',
      'Mas o valor de ter sua mente blindada pela Palavra...',
      'Isso não tem preço.'
    ],
    testimonialQuote: '"Eu estava à beira de um burnout. O Guia Espiritual no WhatsApp foi a voz de Deus nas minhas madrugadas de insônia. No sei o que seria de mim sem essa ferramenta."',
    testimonialAuthor: 'Juliana M.',
    testimonialInfo: 'Membro há 3 meses • São Paulo',
    devicesTitle: 'Sua jornada de fé, em qualquer lugar.',
    devicesTag: 'Presença constante em sua vida',
    devicesDesc: 'Acompanhe seu progresso bíblico no PC, ouça louvores no Tablet e receba sua oração diária no celular. Tudo conectado.',
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
    monthly: 'Mensual',
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
