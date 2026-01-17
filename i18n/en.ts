const enHome = {
  greetingMorning: 'Good morning',
  greetingAfternoon: 'Good afternoon',
  greetingEvening: 'Good evening',
  streak: 'Streak',
  days: 'days',
  level: 'Level',
  wordOfDay: 'Word of the Day',
  readChapter: 'Read Chapter',
  share: 'Share',
  moodTitle: 'How are you feeling?',
  dailyGoal: 'Daily Goal',
  goalReached: 'Goal Reached!',
  bibleChallenge: 'Bible Challenge',
  playNow: 'Play Now',
  notes: 'Your Notes',
  viewLess: 'View less',
  viewAll: 'View all',
  askGuide: 'Ask the Guide',
  prayerFor: 'Prayer for',
  saveImage: 'Save Image',
  amen: 'Amen',
  vent: 'Vent'
};

const enMoods = {
  Anxious: 'Anxious',
  Tired: 'Tired',
  Happy: 'Happy',
  Sad: 'Sad',
  Thankful: 'Thankful',
  Confused: 'Confused',
  Angry: 'Angry'
};

const enWorship = {
  title: 'Worship',
  subtitle: 'Songs to connect your heart to heaven.',
  searchPlaceholder: 'Search worship by feeling...',
  playing: 'Playing',
  paused: 'Paused',
  noAudio: 'Audio unavailable',
  libraryTitle: 'Worship Library',
  noResults: 'No worship found.',
  loading: 'Loading worship...'
};

const enSongsList = [
  { id: "1", title: "Path Miracles", artist: "Soraya Moraes", reason: "God opens ways where there are none.", audioUrl: "https://files.catbox.moe/v0y3em.mp3" },
  { id: "2", title: "Help me Jesus", artist: "Rayne Almeida", reason: "A sincere cry for strength and renewal.", audioUrl: "https://files.catbox.moe/kn3ywn.mp3" },
  { id: "3", title: "Silent Prayer", artist: "Worship", reason: "Moment of peace and communion with God.", audioUrl: "https://files.catbox.moe/mh8izw.mp3" },
  { id: "4", title: "Eternal Flame", artist: "Adoration", reason: "May the Spirit's fire never go out.", audioUrl: "https://files.catbox.moe/p5qwhk.mp3" },
  { id: "5", title: "God's Embrace", artist: "Adoration", reason: "Feel the Father's comfort and love surrounding you.", audioUrl: "https://files.catbox.moe/ulohm3.mp3" },
  { id: "6", title: "Angel Tongue", artist: "Adoration", reason: "A celestial atmosphere to edify your spirit.", audioUrl: "https://files.catbox.moe/pzx4kx.mp3" },
  { id: "7", title: "Guiding Star", artist: "Adoration", reason: "Jesus' light illuminates your path.", audioUrl: "https://files.catbox.moe/kaddqg.mp3" },
  { id: "8", title: "Divine Breath", artist: "Adoration", reason: "Feel the Holy Spirit's renewal in your life.", audioUrl: "https://files.catbox.moe/i1kvh4.mp3" },
  { id: "9", title: "Calm from God", artist: "Worship", reason: "Feel the deep peace that only the Spirit can give.", audioUrl: "https://files.catbox.moe/xsydaw.mp3" },
  { id: "10", title: "Rain of Treasures", artist: "Worship", reason: "Promises of abundance and blessings over your life.", audioUrl: "https://files.catbox.moe/ot79va.mp3" },
  { id: "11", title: "Free my heart", artist: "Worship", reason: "A cry for spiritual freedom and inner healing.", audioUrl: "https://files.catbox.moe/zlhcub.mp3" }
];

const enJourney = {
  title: 'Journeys',
  subtitle: 'Reading plans and challenges to strengthen your faith.',
  back: 'Back',
  completedDays: 'days completed',
  yourJourney: 'Your Journey',
  day: 'Day',
  searching: 'Searching for today\'s content...',
  reflectionTitle: 'Reflection',
  challengeTitle: 'Practical Challenge',
  completedButton: 'Day Completed',
  completeButton: 'Complete Day',
  conquest: 'Conquest!',
  awesome: 'Awesome! You completed this journey.',
  xpReceived: 'XP Received',
  claimReward: 'Claim Reward'
};

const enChallengesList = [
  { id: 'anxiety-detox', title: 'Anxiety Detox', description: '7 days to trade fear for God\'s peace through total surrender.', days: 7, theme: 'Anxiety' },
  { id: 'restoration', title: 'Relationship Restoration', description: '30 days of imersão profunda no perdão, amor sacrificial e reconstrução de alianças.', days: 30, theme: 'Love & Marriage' },
  { id: 'gratitude-journey', title: 'Gratitude Journey', description: '30 days to transform your mind and heart through the power of gratitude.', days: 30, theme: 'Gratitude' },
  { id: 'purpose-discovery', title: 'Purpose Discovery', description: '7 days diving into God\'s original plan for your existence.', days: 7, theme: 'Purpose' },
  { id: 'fearless-faith', title: 'Fearless Faith', description: '7 days to overcome fear and insecurity through biblical courage.', days: 7, theme: 'Courage' },
  { id: 'biblical-identity', title: 'Identity in Christ', description: '7 days strengthening who you are in God\'s eyes.', days: 7, theme: 'Self-esteem' },
  { id: 'stewardship-life', title: 'Active Stewardship', description: '7 days of wisdom for career, finance and life management.', days: 7, theme: 'Work' },
  { id: 'proverbs-wisdom', title: 'Proverbs Wisdom', description: '31 days diving into the source of wisdom for decisions and practical life.', days: 31, theme: 'Wisdom' },
  { id: 'healing-miracle', title: 'Healing Miracle', description: '14 days strengthening faith for physical, emotional, and spiritual healing.', days: 14, theme: 'Divine Healing' },
  { id: 'open-doors', title: 'Open Doors', description: '21 days of prayer for provision, employment, and professional direction.', days: 21, theme: 'Provision' },
  { id: 'impossible-causes', title: 'Impossible Causes', description: '7 days of intense crying out for urgent miracles.', days: 7, theme: 'Urgent Miracles' }
];

const enTrails = {
  title: 'Spiritual Goals',
  subtitle: 'Set your pace and focus for this month.',
  focusVirtue: 'Focus Virtue',
  monthIntent: 'Month Intent',
  dailyRhythm: 'Daily Rhythm',
  chapters: 'Chapters / Day',
  minutes: 'Minutes / Day',
  light: 'Light',
  intense: 'Intense',
  quick: 'Quick',
  deep: 'Deep',
  nextTarget: 'Next Target',
  days: 'days',
  saveGoals: 'Save Goals',
  saving: 'Saving...',
  savedSuccess: 'Goals Updated!'
};

const enVirtues = {
  hope: { name: 'Hope', desc: 'Confidence in the future.' },
  charity: { name: 'Charity', desc: 'Love in action.' },
  faith: { name: 'Faith', desc: 'Certainty of the unseen.' },
  patience: { name: 'Patience', desc: 'Peace in waiting.' },
  wisdom: { name: 'Wisdom', desc: 'Divine choices.' },
  courage: { name: 'Courage', desc: 'Strength to act.' }
};

const enChallengesMap = {
  'anxiety-detox': { title: 'Anxiety Detox' },
  'restoration': { title: 'Relationship Restoration' },
  'gratitude-journey': { title: 'Gratitude Journey' },
  'purpose-discovery': { title: 'Purpose Discovery' },
  'fearless-faith': { title: 'Fearless Faith' },
  'biblical-identity': { title: 'Identity in Christ' },
  'stewardship-life': { title: 'Active Stewardship' },
  'proverbs-wisdom': { title: 'Wisdom' },
  'healing-miracle': { title: 'Divine Healing' },
  'open-doors': { title: 'Open Doors' },
  'impossible-causes': { title: 'Impossible Causes' }
};

const enSettings = {
  title: 'Settings',
  subtitle: 'Manage your account and preferences.',
  travelerName: 'Traveler Name',
  imageTooLarge: 'Image must be max 1MB.',
  trophyRoom: 'Trophy Room',
  trophyDesc: 'Your spiritual achievements.',
  xpTotal: 'Total XP',
  badges: 'Badges',
  journeyBadges: 'Journey Badges',
  bibleBadges: 'Completed Books',
  readAllBooks: 'Read all chapters of a book to earn badges.',
  appearance: 'Appearance',
  darkMode: 'Dark Mode',
  language: 'Language',
  languageDesc: 'Change application language',
  accountSystem: 'Account',
  logout: 'Logout',
  reset: 'Reset Progress',
  logoutConfirm: 'Are you sure you want to logout?',
  resetConfirm: 'This will erase all progress. Are you sure?',
  earned: 'Earned'
};

const enKids = {
  menu: {
      hello: 'Hello, Little One!',
      title: 'Kids Zone',
      subtitle: 'Learn while playing!',
      explore: 'Tap to explore',
      coloring: {
          tag: 'Creative',
          title: 'Paint & Create',
          subtitle: 'Use your imagination',
          new: 'New!'
      },
      quiz: { title: 'Bible Quiz' },
      camera: { title: 'Fun Photo' },
      shalomflix: {
          tag: 'Coming Soon',
          title: 'Shalomflix',
          subtitle: 'Available soon for subscribers'
      }
  },
  coloring: {
      title: 'Coloring',
      coloringTitle: 'Coloring Time',
      magicCreator: 'Magic Creator',
      magicDesc: 'Describe a drawing and IA creates it for you to paint!',
      placeholder: 'Ex: Lion of Judah in the forest...',
      readyIdeas: 'Ready Ideas',
      ideas: [
          { id: 'lion', title: 'Lion of Judah', prompt: 'A majestic and friendly cartoon lion for coloring, black lines white background' },
          { id: 'whale', title: 'Jonah and the Whale', prompt: 'A big and happy whale in the sea coloring book style, black outlines' },
          { id: 'ark', title: 'Noah\'s Ark', prompt: 'Noah\'s ark with animals cartoon style for coloring' },
          { id: 'shepherd', title: 'The Good Shepherd', prompt: 'Jesus as shepherd with cute sheep coloring style' },
          { id: 'david', title: 'David and Goliath', prompt: 'Little David with a stone and giant Goliath cartoon for coloring' },
          { id: 'angel', title: 'Guardian Angel', prompt: 'A cute angel flying coloring style' },
          { id: 'creation', title: 'The Creation', prompt: 'World being created, sun, moon, stars and trees coloring style' },
          { id: 'nativity', title: 'Nativity', prompt: 'Christmas nativity with baby jesus coloring style' }
      ],
      aiPrompt: 'Create a kids coloring page (line art, black and white, no fill, thick lines) about: {prompt}. Cute cartoon style.',
      error: 'Error creating image. Try again.',
      save: 'Save Art',
      reset: 'Clear'
  },
  camera: {
      title: 'Kids Photo',
      takePhoto: 'Take Photo',
      save: 'Save Photo',
      retake: 'Take Another',
      noCamera: 'No Camera',
      permission: 'We need camera access.',
      retry: 'Try Again',
      frames: [
          { id: 1, label: 'Hero', text: 'Faith Hero', colors: ["#00c6ff", "#0072ff"], icon: "🦸‍♂️" },
          { id: 2, label: 'Music', text: 'Little Worshiper', colors: ["#FFD700", "#ff9a00"], icon: "🎵" },
          { id: 3, label: 'Crown', text: 'King\'s Child', colors: ["#ff9a9e", "#ff6a88"], icon: "👑" },
          { id: 4, label: 'Nature', text: 'God\'s Creation', colors: ["#56ab2f", "#a8e063"], icon: "🌿" },
          { id: 5, label: 'Bubbles', text: 'Lord\'s Joy', colors: ["#FF8008", "#FFC837"], icon: "😄" },
          { id: 6, label: 'Love', text: 'Jesus Loves Me', colors: ["#DA22FF", "#9733EE"], icon: "❤️" }
      ],
      effects: {
          sparkles: 'Sparkles',
          confetti: 'Party',
          amen: 'Amen',
          angel: 'Angel',
          hearts: 'Love'
      }
  },
  quiz: {
      title: 'Kids Quiz',
      questionsCount: 'Questions',
      question: 'Question',
      congrats: 'Congratulations!',
      correct: 'You got {score} of {total}!',
      playAgain: 'Play Again',
      exit: 'Exit',
      themes: [
          {
              id: 'creation',
              title: 'The Creation',
              questions: [
                  { q: "Who created the world?", options: ["Noah", "God", "Adam"], a: "God" },
                  { q: "What did God create on the first day?", options: ["Animals", "Light", "Plants"], a: "Light" },
                  { q: "Who was the first man?", options: ["Peter", "Adam", "Joseph"], a: "Adam" }
              ]
          },
          {
              id: 'noah',
              title: 'Noah\'s Ark',
              questions: [
                  { q: "What did Noah build?", options: ["A house", "A temple", "An ark"], a: "An ark" },
                  { q: "How many animals of each type entered?", options: ["One", "Two (pair)", "Ten"], a: "Two (pair)" },
                  { q: "What appeared in the sky after the rain?", options: ["Rainbow", "Star", "Moon"], a: "Rainbow" }
              ]
          },
          {
              id: 'david',
              title: 'David and Goliath',
              questions: [
                  { q: "What did David use to fight?", options: ["Sword", "Sling and stone", "Spear"], a: "Sling and stone" },
                  { q: "Who was the giant?", options: ["Goliath", "Saul", "Samson"], a: "Goliath" },
                  { q: "What did David take care of?", options: ["Sheep", "Horses", "Camels"], a: "Sheep" }
              ]
          },
          {
              id: 'jonah',
              title: 'Jonah',
              questions: [
                  { q: "Who swallowed Jonah?", options: ["A lion", "A big fish", "A bear"], a: "A big fish" },
                  { q: "Where was Jonah supposed to go?", options: ["Nineveh", "Tarshish", "Jerusalem"], a: "Nineveh" },
                  { q: "How many days did he stay in the fish?", options: ["1 day", "3 days", "7 days"], a: "3 days" }
              ]
          },
          {
              id: 'moses',
              title: 'Moses',
              questions: [
                  { q: "Where did Moses' mother put him?", options: ["In a crib", "In a basket on the river", "In a cave"], a: "In a basket on the river" },
                  { q: "What did God use to speak to Moses?", options: ["A cloud", "A burning bush", "An angel"], a: "A burning bush" },
                  { q: "What did Moses open?", options: ["The Red Sea", "The Jordan River", "The gate"], a: "The Red Sea" }
              ]
          },
          {
              id: 'daniel',
              title: 'Daniel',
              questions: [
                  { q: "Where was Daniel thrown?", options: ["In a well", "In the lions' den", "In prison"], a: "In the lions' den" },
                  { q: "What did the lions do?", options: ["Roared", "Slept/Didn't eat", "Played"], a: "Slept/Didn't eat" },
                  { q: "How many times did Daniel pray?", options: ["1 time", "2 times", "3 times"], a: "3 times" }
              ]
          },
          {
              id: 'nativity',
              title: 'Christmas',
              questions: [
                  { q: "Where was Jesus born?", options: ["In a hospital", "In a palace", "In a manger"], a: "In a manger" },
                  { q: "Who guided the Wise Men?", options: ["A map", "A star", "An angel"], a: "A star" },
                  { q: "What was Jesus' mother's name?", options: ["Mary", "Martha", "Sarah"], a: "Mary" }
              ]
          },
          {
              id: 'miracles',
              title: 'Miracles',
              questions: [
                  { q: "What did Jesus walk on?", options: ["Water", "Fire", "Air"], a: "Water" },
                  { q: "What did Jesus multiply?", options: ["Gold", "Loaves and fishes", "Stones"], a: "Loaves and fishes" },
                  { q: "Who did Jesus raise from the dead?", options: ["Lazarus", "Peter", "John"], a: "Lazarus" }
              ]
          }
      ]
  }
};

export const en = {
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
    heroTitle: 'Your time with God,',
    heroSubtitle: 'every day',
    heroDesc: 'A spiritual guide on WhatsApp that strengthens your faith, reminds you of the Word and accompanies you in daily battles.',
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
  },
  home: enHome,
  worship: enWorship,
  journey: enJourney,
  trails: enTrails,
  virtues: enVirtues,
  challenges: enChallengesMap,
  songsList: enSongsList,
  challengesList: enChallengesList,
  settings: enSettings,
  moods: enMoods,
  kids: enKids
};
