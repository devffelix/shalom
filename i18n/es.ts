const esHome = {
  greetingMorning: 'Buen día',
  greetingAfternoon: 'Buenas tardes',
  greetingEvening: 'Buenas noites',
  streak: 'Secuencia',
  days: 'días',
  level: 'Nivel',
  wordOfDay: 'Palabra del Día',
  readChapter: 'Leer Capítulo',
  share: 'Compartir',
  moodTitle: '¿Cómo te sientes?',
  dailyGoal: 'Meta Diaria',
  goalReached: '¡Meta Alcanzada!',
  bibleChallenge: 'Desafío Bíblico',
  playNow: 'Jugar Ahora',
  notes: 'Tus Notas',
  viewLess: 'Ver menos',
  viewAll: 'Ver todo',
  askGuide: 'Preguntar al Guía',
  prayerFor: 'Oración para',
  saveImage: 'Guardar Imagen',
  amen: 'Amém',
  vent: 'Desahogarse'
};

const esMoods = {
  Anxious: 'Ansioso',
  Tired: 'Cansado',
  Happy: 'Feliz',
  Sad: 'Triste',
  Thankful: 'Agradecido',
  Confused: 'Confundido',
  Angry: 'Enojado'
};

const esWorship = {
  title: 'Alabanza',
  subtitle: 'Música para conectar tu corazón con el cielo.',
  searchPlaceholder: 'Buscar alabanza por sentimiento...',
  playing: 'Tocando',
  paused: 'Pausado',
  noAudio: 'Audio no disponible',
  libraryTitle: 'Biblioteca de Adoración',
  noResults: 'No se encontró alabanza.',
  loading: 'Cargando alabanzas...',
  dailyUpdate: '3 nuevas alabanzas todos los días',
  dailyPlaylist: 'Alabanzas de Hoy',
  dailyPlaylistDesc: 'Sugerencias especiales para tu momento.',
  categories: 'Navegar por temas',
  all: 'Todos',
  topicPaz: 'Paz y Quietud',
  topicFe: 'Fe y Milagros',
  topicEspirito: 'Espíritu Santo',
  topicFamilia: 'Familia y Hogar',
  topicClamor: 'Clamor y Liberación',
  topicAdoracao: 'Adoración y Gloria'
};

const esSongsList = [
  { id: "1", title: "Milagros del Camino", artist: "Soraya Moraes", reason: "Dios abre caminos donde no los hay.", audioUrl: "https://files.catbox.moe/v0y3em.mp3" },
  { id: "2", title: "Ayúdame Jesús", artist: "Rayne Almeida", reason: "Un clamor sincero por fuerza y renovación.", audioUrl: "https://files.catbox.moe/kn3ywn.mp3" },
  { id: "3", title: "Oración Silenciosa", artist: "Alabanza", reason: "Momento de paz y comunión con Dios.", audioUrl: "https://files.catbox.moe/mh8izw.mp3" },
  { id: "4", title: "Llama Eterna", artist: "Adoración", reason: "Que el fuego del Espíritu nunca se apague.", audioUrl: "https://files.catbox.moe/p5qwhk.mp3" },
  { id: "5", title: "El Abrazo de Dios", artist: "Adoración", reason: "Siente el consuelo y el amor del Padre rodeándote.", audioUrl: "https://files.catbox.moe/ulohm3.mp3" },
  { id: "6", title: "Lengua de Ángeles", artist: "Adoración", reason: "Una atmósfera celestial para edificar tu espíritu.", audioUrl: "https://files.catbox.moe/pzx4kx.mp3" },
  { id: "7", title: "Estrella Guía", artist: "Adoración", reason: "La luz de Jesús ilumina tu camino.", audioUrl: "https://files.catbox.moe/kaddqg.mp3" },
  { id: "8", title: "Aliento Divino", artist: "Adoración", reason: "Siente la renovación del Espíritu Santo en tu vida.", audioUrl: "https://files.catbox.moe/i1kvh4.mp3" },
  { id: "9", title: "Calma que viene de Dios", artist: "Adoración", reason: "Siente la paz profunda que solo el Espíritu pode dar.", audioUrl: "https://files.catbox.moe/xsydaw.mp3" },
  { id: "10", title: "Lluvia de Tesoros", artist: "Adoración", reason: "Promessas de abundancia y bendiciones sobre su vida.", audioUrl: "https://files.catbox.moe/ot79va.mp3" },
  { id: "11", title: "Liberta mi corazón", artist: "Adoración", reason: "Un clamor por libertad espiritual y sanidad interior.", audioUrl: "https://files.catbox.moe/zlhcub.mp3" }
];

const esJourney = {
  title: 'Jornadas',
  subtitle: 'Planes de lectura y desafíos para fortalecer tu fe.',
  back: 'Volver',
  completedDays: 'días completados',
  yourJourney: 'Tu Jornada',
  day: 'Día',
  searching: 'Buscando conteúdo do dia...',
  reflectionTitle: 'Reflexión',
  challengeTitle: 'Desafío Práctico',
  completedButton: 'Día Completado',
  completeButton: 'Completar Día',
  conquest: '¡Conquista!',
  awesome: '¡Increíble! Has completado esta jornada.',
  xpReceived: 'XP Recebido',
  claimReward: 'Reclamar Recompensa'
};

const esChallengesList = [
  { id: 'anxiety-detox', title: 'Detox de Ansiedad', description: '7 dias para cambiar el miedo por la paz de Dios mediante la entrega total.', days: 7, theme: 'Ansiedad' },
  { id: 'restoration', title: 'Restauración de Vínculos', description: '30 días de imersão profunda no perdão, amor sacrificial e reconstrução de alianças.', days: 30, theme: 'Amor y Matrimonio' },
  { id: 'gratitude-journey', title: 'Jornada de Gratitud', description: '30 dias para transformar tu mente y corazón a través del poder de la gratitud.', days: 30, theme: 'Gratitud' },
  { id: 'purpose-discovery', title: 'Descubrimiento de Propósito', description: '7 dias sumergiéndote en el plan original de Dios para tu existencia.', days: 7, theme: 'Propósito' },
  { id: 'fearless-faith', title: 'Fe Inquebrantable', description: '7 dias para vencer el miedo y la inseguridad a través del coraje bíblico.', days: 7, theme: 'Coraje' },
  { id: 'biblical-identity', title: 'Identidad en Cristo', description: '7 dias fortalecendo quién eres a los ojos de Dios.', days: 7, theme: 'Autoestima' },
  { id: 'stewardship-life', title: 'Mayordomía Activa', description: '7 dias de sabiduría para la carrera, las finanzas y la gestión de la vida.', days: 7, theme: 'Trabajo' },
  { id: 'proverbs-wisdom', title: 'Sabiduría de Proverbios', description: '31 dias sumergiéndose en la fuente de la sabiduría para decisiones y vida práctica.', days: 31, theme: 'Sabiduría' },
  { id: 'healing-miracle', title: 'Milagro de Sanidad', description: '14 dias fortaleciendo la fe para la sanidad física, emocional y espiritual.', days: 14, theme: 'Sanidad Divina' },
  { id: 'open-doors', title: 'Puertas Abiertas', description: '21 dias de oración por provisión, empleo y dirección profesional.', days: 21, theme: 'Provisión' },
  { id: 'impossible-causes', title: 'Causas Impossíveis', description: '7 dias de clamor intenso por milagres urgentes.', days: 7, theme: 'Milagros Urgentes' },
  { id: 'spiritual-warfare', title: 'Guerra Espiritual', description: '14 días aprendiendo a protegerse y vencer batallas invisibles.', days: 14, theme: 'Batalla Espiritual' },
  { id: 'financial-freedom', title: 'Libertad Financiera', description: '21 días de principios bíblicos para salir de deudas y prosperar con sabiduría.', days: 21, theme: 'Finanzas' },
  { id: 'faith-foundations', title: 'Cimientos de la Fe', description: '10 días construyendo una base sólida en los fundamentos cristianos.', days: 10, theme: 'Crecimiento Espiritual' },
  { id: 'holy-relationships', title: 'Relaciones Santas', description: '14 días transformando amistades, noviazgo y vínculos con pureza.', days: 14, theme: 'Relaciones' },
  { id: 'prayer-power', title: 'Poder de la Oración', description: '21 días descubriendo cómo orar de forma eficaz y ver respuestas.', days: 21, theme: 'Vida de Oración' },
  { id: 'spiritual-renewal', title: 'Renovación Espiritual', description: '7 días de ayuno, oración y reconexión profunda con Dios.', days: 7, theme: 'Avivamiento' }
];

const esTrails = {
  title: 'Metas Espirituales',
  subtitle: 'Define tu ritmo y enfoque para este mes.',
  focusVirtue: 'Virtud en Enfoque',
  monthIntent: 'Intención del Mes',
  dailyRhythm: 'Ritmo Diario',
  chapters: 'Capítulos / Día',
  minutes: 'Minutos / Día',
  light: 'Ligero',
  intense: 'Intenso',
  quick: 'Rápido',
  deep: 'Profundo',
  nextTarget: 'Próximo Objetivo',
  days: 'días',
  saveGoals: 'Guardar Metas',
  saving: 'Guardando...',
  savedSuccess: '¡Metas Actualizadas!'
};

const esVirtues = {
  hope: { name: 'Esperanza', desc: 'Confianza en el futuro.' },
  charity: { name: 'Caridad', desc: 'Amor en acción.' },
  faith: { name: 'Fe', desc: 'Certeza de lo invisible.' },
  patience: { name: 'Paciencia', desc: 'Paz en la espera.' },
  wisdom: { name: 'Sabiduría', desc: 'Elecciones divinas.' },
  courage: { name: 'Coraje', desc: 'Fuerza para actuar.' }
};

const esChallengesMap = {
  'anxiety-detox': { title: 'Detox de Ansiedad' },
  'restoration': { title: 'Restauración de Vínculos' },
  'gratitude-journey': { title: 'Jornada de Gratitud' },
  'purpose-discovery': { title: 'Descubrimiento de Propósito' },
  'fearless-faith': { title: 'Fe Inquebrantable' },
  'biblical-identity': { title: 'Identidad en Cristo' },
  'stewardship-life': { title: 'Mayordomía Activa' },
  'proverbs-wisdom': { title: 'Sabiduría' },
  'healing-miracle': { title: 'Sanidad Divina' },
  'open-doors': { title: 'Puertas Abiertas' },
  'impossible-causes': { title: 'Causas Impossíveis' },
  'spiritual-warfare': { title: 'Guerra Espiritual' },
  'financial-freedom': { title: 'Libertad Financiera' },
  'faith-foundations': { title: 'Crecimiento Espiritual' },
  'holy-relationships': { title: 'Relaciones Santas' },
  'prayer-power': { title: 'Poder de la Oración' },
  'spiritual-renewal': { title: 'Renovación Espiritual' }
};

const esSettings = {
  title: 'Configuración',
  subtitle: 'Gestiona tu cuenta y preferencias.',
  travelerName: 'Nombre del Viajero',
  imageTooLarge: 'La imagen debe ser de máximo 1MB.',
  trophyRoom: 'Sala de Trofeos',
  trophyDesc: 'Tus logros espirituales.',
  xpTotal: 'XP Total',
  badges: 'Insignias',
  journeyBadges: 'Insignias de Jornada',
  bibleBadges: 'Libros Completados',
  readAllBooks: 'Lee todos los capítulos de un libro para ganar insignias.',
  appearance: 'Apariencia',
  darkMode: 'Modo Oscuro',
  language: 'Idioma',
  languageDesc: 'Cambiar idioma de la aplicación',
  accountSystem: 'Cuenta',
  logout: 'Cerrar Sesión',
  reset: 'Reiniciar Progreso',
  logoutConfirm: '¿Estás seguro de que quieres cerrar sesión?',
  resetConfirm: 'Esto borrará todo tu progreso. ¿Estás seguro?',
  earned: 'Conquistado'
};

const esKids = {
  menu: {
    hello: '¡Hola, Pequeño(a)!',
    title: 'Kids Zone',
    subtitle: '¡Aprende jugando!',
    explore: 'Toca para explorar',
    coloring: {
      tag: 'Creativo',
      title: 'Pintar y Crear',
      subtitle: 'Usa tu imaginación',
      new: '¡Nuevo!'
    },
    quiz: { title: 'Quiz Bíblico' },
    camera: { title: 'Foto Divertida' },
    shalomflix: {
      tag: 'Próximamente',
      title: 'Shalomflix',
      subtitle: 'Disponible pronto para suscriptores'
    }
  },
  coloring: {
    title: 'Colorear',
    coloringTitle: 'Hora de Colorear',
    magicCreator: 'Creador Mágico',
    magicDesc: '¡Describe un dibujo y la IA lo crea para que lo pintes!',
    placeholder: 'Ej: León de Judá en la selva...',
    readyIdeas: 'Ideas Listas',
    ideas: [
      { id: 'lion', title: 'León de Judá', prompt: 'Un león majestuoso y amigable estilo dibujo animado para colorear, trazos negros fondo blanco' },
      { id: 'whale', title: 'Jonás y la Ballena', prompt: 'Una ballena grande e feliz en el mar estilo dibujo para colorear, trazos negros' },
      { id: 'ark', title: 'Arca de Noé', prompt: 'Arca de Noé com animales estilo cartoon para colorear' },
      { id: 'shepherd', title: 'El Buen Pastor', prompt: 'Jesús como pastor con ovejas lindas estilo dibujo para colorear' },
      { id: 'david', title: 'David y Goliat', prompt: 'Pequeño David con una piedra y gigante Golias cartoon para colorear' },
      { id: 'angel', title: 'Ángel de la Guarda', prompt: 'Un ángel lindo volando estilo dibujo para colorear' },
      { id: 'creation', title: 'La Creación', prompt: 'Mundo siendo creado, sol, moon, estrellas y árboles estilo dibujo para colorear' },
      { id: 'nativity', title: 'Nascimento', prompt: 'Pesebre de navidad con niño jesús estilo dibujo para colorear' }
    ],
    aiPrompt: 'Crea un dibujo para colorear infantil (line art, blanco y negro, sin relleno, trazos gruesos) sobre: {prompt}. Estilo cartoon lindo.',
    error: 'Error al crear la imagen. Inténtalo de nuevo.',
    save: 'Guardar Arte',
    reset: 'Limpiar'
  },
  camera: {
    title: 'Foto Kids',
    takePhoto: 'Tomar Foto',
    save: 'Guardar Foto',
    retake: 'Tomar Otra',
    noCamera: 'Sin Cámara',
    permission: 'Necesitamos acceso a la cámara.',
    retry: 'Intentar de Nuevo',
    frames: [
      { id: 1, label: 'Héroe', text: 'Héroe de la Fe', colors: ["#00c6ff", "#0072ff"], icon: "🦸‍♂️" },
      { id: 2, label: 'Música', text: 'Pequeño Adorador', colors: ["#FFD700", "#ff9a00"], icon: "🎵" },
      { id: 3, label: 'Corona', text: 'Hijo del Rey', colors: ["#ff9a9e", "#ff6a88"], icon: "👑" },
      { id: 4, label: 'Natureza', text: 'Creación de Dios', colors: ["#56ab2f", "#a8e063"], icon: "🌿" },
      { id: 5, label: 'Burbujas', text: 'Alegría do Senhor', colors: ["#FF8008", "#FFC837"], icon: "😄" },
      { id: 6, label: 'Amor', text: 'Jesús me Ama', colors: ["#DA22FF", "#9733EE"], icon: "❤️" }
    ],
    effects: {
      sparkles: 'Brillos',
      confetti: 'Fiesta',
      amen: 'Amén',
      angel: 'Ángel',
      hearts: 'Amor'
    }
  },
  quiz: {
    title: 'Quiz Kids',
    questionsCount: 'Preguntas',
    question: 'Pregunta',
    congrats: '¡Felicidades!',
    correct: '¡Acertaste {score} de {total}!',
    playAgain: 'Jugar de Nuevo',
    exit: 'Salir',
    themes: [
      {
        id: 'creation',
        title: 'La Creación',
        questions: [
          { q: "¿Quién creó el mundo?", options: ["Noé", "Dios", "Adán"], a: "Dios" },
          { q: "¿Qué creó Dios el primer día?", options: ["Animales", "Luz", "Plantas"], a: "Luz" },
          { q: "¿Quién fue el primer hombre?", options: ["Pedro", "Adán", "José"], a: "Adão" }
        ]
      },
      {
        id: 'noah',
        title: 'Arca de Noé',
        questions: [
          { q: "¿Qué construyó Noé?", options: ["Una casa", "Um templo", "Una arca"], a: "Una arca" },
          { q: "¿Cuántos animales de cada tipo entraron?", options: ["Uno", "Dos (pareja)", "Diez"], a: "Dos (pareja)" },
          { q: "¿Qué apareció en el cielo después de la lluvia?", options: ["Arco iris", "Estrella", "Luna"], a: "Arco iris" }
        ]
      },
      {
        id: 'david',
        title: 'David y Goliat',
        questions: [
          { q: "¿Qué usó David para luchar?", options: ["Espada", "Honda y piedra", "Lanza"], a: "Honda y piedra" },
          { q: "¿Quién era el gigante?", options: ["Goliat", "Saúl", "Sansón"], a: "Goliat" },
          { q: "¿Qué cuidaba David?", options: ["Ovejas", "Caballos", "Camellos"], a: "Ovejas" }
        ]
      },
      {
        id: 'jonah',
        title: 'Jonás',
        questions: [
          { q: "¿Quién se tragó a Jonás?", options: ["Un león", "Un gran pez", "Un oso"], a: "Un gran pez" },
          { q: "¿A dónde debía ir Jonás?", options: ["Nínive", "Tarsis", "Jerusalén"], a: "Nínive" },
          { q: "¿Cuántos dás se quedó en el pez?", options: ["1 día", "3 días", "7 dás"], a: "3 dás" }
        ]
      },
      {
        id: 'moses',
        title: 'Moisés',
        questions: [
          { q: "¿Dónde lo puso la madre de Moisés?", options: ["En una cuna", "En una cesta en el río", "En una cueva"], a: "En una cesta en el río" },
          { q: "¿Qué usó Dios para hablar con Moisés?", options: ["Una nube", "Una zarza ardiente", "Un ángel"], a: "Una zarza ardiente" },
          { q: "¿Qué abrió Moisés?", options: ["El Mar Rojo", "El Río Jordán", "El portón"], a: "El Mar Rojo" }
        ]
      },
      {
        id: 'daniel',
        title: 'Daniel',
        questions: [
          { q: "¿Dónde fue arrojado Daniel?", options: ["En un pozo", "En el foso de los leones", "En la prisión"], a: "En el foso de los leones" },
          { q: "¿Qué hicieron los leones?", options: ["Rugieron", "Durmieron/No comieron", "Jugaron"], a: "Durmieron/No comieron" },
          { q: "¿Cuántas veces oraba Daniel?", options: ["1 vez", "2 vezes", "3 vezes"], a: "3 vezes" }
        ]
      },
      {
        id: 'nativity',
        title: 'Navidad',
        questions: [
          { q: "¿Dónde nació Jesús?", options: ["En un hospital", "En un palacio", "En un pesebre"], a: "En un pesebre" },
          { q: "¿Quién guió a los Reyes Magos?", options: ["Un mapa", "Uma estrela", "Um anjo"], a: "Uma estrela" },
          { q: "¿Cuál es el nome de la madre de Jesús?", options: ["María", "Marta", "Sara"], a: "Maria" }
        ]
      },
      {
        id: 'miracles',
        title: 'Milagros',
        questions: [
          { q: "¿Sobre qué caminó Jesús?", options: ["El agua", "El fuego", "El aire"], a: "El agua" },
          { q: "¿Qué multiplicó Jesús?", options: ["Oro", "Panes y peces", "Piedras"], a: "Panes y peces" },
          { q: "¿A quién resucitó Jesús?", options: ["Lázaro", "Pedro", "Juan"], a: "Lázaro" }
        ]
      }
    ]
  }
};

export const es = {
  common: {
    appName: 'Shalom',
    back: 'Voltar',
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
    heroTitle: 'Tu tiempo con Dios,',
    heroSubtitle: 'todos los días',
    heroDesc: 'Un guía espiritual en WhatsApp que fortalece tu fe, te recuerda la Palabra y te acompaña en las batallas diarias.',
    ctaStart: 'Empezar Ahora',
    ctaPlans: 'Planes',
    login: 'Entrar',
    slogan1: 'Nunca más caminarás solo.',
    sloganFloat: '"Dios presente todos os dás en la palma de tu mano"',
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
    letterTiredness: 'Intentas orar, mas el cansancio es tanto que las palabras se traban en la garganta.',
    letterCarryAlone: 'No porque dejaste de creer. Sino porque estás intentando cargar todo solo.',
    letterDistance: 'La verdad es que, con tanta prisa, la distancia entre tú y Dios no ocurre de una vez... Crece poco a poco.',
    letterLacks: [
      'Quieres orar, pero falta tiempo.',
      'Quieres leer la Biblia, mas falta constancia.',
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
      '🌙 E una oración por la noche, para devolver la paz al corazón'
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
      '👉 Receba a primeira oração hoje mesmo',
      '👉 Comienza a caminar acompañado, todos os días'
    ],
    letterSpecial: 'En este inicio, estamos liberando un plan especial para quien siente que este llamado es ahora.',
    letterTruth: 'Porque la verdad es simple:',
    letterGodHere: 'Dios no te abandonó. Él está aquí. El está contigo.',
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
      'Shalom envía devocionales para parejas que rompen el orgullo y unen los corações ante Dios.'
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
    journeyAnxiety: 'Detox de Ansiedade',
    journeyAnxietyDesc: '7 días para cambiar el miedo por la paz absoluta de Dios a través de la entrega total.',
    journeyWisdom: 'Sabiduría de Provérbios',
    journeyWisdomDesc: '31 días sumergiéndote en la fuente de sabiduría para decisiones difíciles.',
    journeyGratitude: 'Jornada de Gratidão',
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
    premiumTitle: 'El Arsenal que Blindará tu Casa',
    premiumSubtitle: 'Más que una app, un ambiente seguro donde el mundo no entra.',
    flixTitle: 'Shalom Flix: El fin de la Guerra por las Pantallas',
    flixDesc: 'Mientras el mundo intenta robar la mente de tus hijos con valores invertidos, Shalom Flix entrega animaciones bíblicas exclusivas. Déjalos sumergirse en las historias de David, Noé y Jesús con artes que encantan y enseñan la verdad que libera.',
    psalmsTitle: 'Salmos Explicados: Donde el Miedo no tiene Voz',
    psalmsDesc: '¿La ansiedad te aprieta el pecho? Sumérgete en análisis profundos de Salmos como el 23 y el 91. No solo lectura, sino una explicación detallada sobre como aplicar esta protección real en tu vida ahora.',
    whatJesusTitle: '“Jesús quería que supieras...”',
    whatJesusDesc: 'Para esos días en los que te sientes indigno o olvidado. Recibe mensajes que hablan directamente a lo que estás viviendo. Es como si Él estuviera sentado a tu lado, dándote la dirección que falta.',
    reconnectionTitle: 'Manual de Reacercamiento',
    reconnectionDesc: '¿Se apagó la llama? ¿Sientes que tu oración golpea el techo? Nuestro manual paso a paso te guía de regreso al primer amor. Sin religiosidad, solo el camino real de regreso a los brazos del Padre.',
    valueCall: 'Entregamos en tus manos las herramientas para una vida de paz inquebrantable.',
    pricingHeadline: '¿Cuánto vale la paz de tu alma y la protección de tu familia?',
    pricingSub: 'Probablemente no tiene precio. Pero hoy, lo hacemos accesible para todos.',
    offerTag: 'Oferta Exclusiva de Lançamiento',
    packageTitle: 'Paquete Completo "Vida Cristiana"',
    features: [
      { label: "Guia Espiritual 24h" },
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
    warningText: '"Nuestra misión es difundir el Evangelio a través de la tecnología. Sin embargo, debido a los altos costos de IA, no podremos mantener este precio por mucho tempo. Si cierras esta página, mañana el valor puede haber vuelto a la normalidad."',
    ctaAccess: 'QUIERO MI ACCESO',
    ctaAccessSub: 'Acceso inmediato a la App y WhatsApp',
    guaranteeTitle: 'Garantia Incondicional de 7 Dias',
    guaranteeDesc: 'Entra, usa la app, habla con el Guía. Si no sientes paz en tu corazón, te devolvemos el 100% de tu dinero. Sin preguntas.',
    faqTitle: '¿Dudas?',
    faqList: [
      { q: '¿Qué es Shalom?', a: 'Shalom es tu compañero espiritual diario. Une la sabiduría milenaria de la Biblia con la conveniencia de WhatsApp y una app moderna, enviando oraciones personalizadas, reflexiones profundas y alabanzas seleccionadas para mantener tu fe activa todos os dás.' },
      { q: '¿Debo pagar algo extra por el chat?', a: '¡No! El plan anual cubre acceso ilimitado ao Guía Espiritual e todas as funcionalidades do app.' },
      { q: '¿Funciona en iPhone e Android?', a: 'Sí, Shalom es una Web App compatible con todos los celulares modernos, tablets y computadores.' },
      { q: 'Como cancelo si no me gusta?', a: 'Directamente por la app o enviando un correo a nuestro soporte. Es simple, rápido y sin burocracia.' }
    ],
    copyright: '© 2024 Shalom App. Hecho con fe.',
    secretQuiz: 'Acceder Quiz Secreto',
    loginTitle: 'Accede a tu cuenta',
    loginDesc: 'Para entrar, ingresa el correo utilizado en la compra.',
    emailPlaceholder: 'Tu correo de acceso',
    secureEnvironment: 'Ambiente Seguro',
    errorEmail: 'Por favor, ingresa un correo válido.',
    errorNoSub: 'Suscripción no encontrada para este correo. Por favor, elige un plano para comenzar.',
    errorConnection: 'Error de conexión. Inténtalo de nuevo.',
  },
  home: esHome,
  worship: esWorship,
  journey: esJourney,
  trails: esTrails,
  virtues: esVirtues,
  challenges: esChallengesMap,
  songsList: esSongsList,
  challengesList: esChallengesList,
  settings: esSettings,
  moods: esMoods,
  kids: esKids
};
