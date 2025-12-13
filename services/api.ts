import { BibleApiResponse, Mood, SongSuggestion, ChallengeDayContent } from '../types';
import { ANXIETY_DETOX_DAYS, GRATITUDE_JOURNEY_DAYS, PROVERBS_JOURNEY_DAYS, HEALING_JOURNEY_DAYS, OPEN_DOORS_JOURNEY_DAYS, RESTORATION_JOURNEY_DAYS, IMPOSSIBLE_CAUSES_JOURNEY_DAYS, ANXIOUS_PRAYERS, TIRED_PRAYERS, HAPPY_PRAYERS } from '../constants';

// Bible API Service
// Using Almeida translation where available or fallback to available Portuguese/English
const BIBLE_API_BASE = 'https://bible-api.com';

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const fetchWithRetry = async (url: string, retries = 3): Promise<Response> => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url);
      if (response.ok) return response;
      // If 4xx (e.g. 404), do not retry as it's likely a bad reference, unless it's 429 (Too Many Requests)
      if (response.status < 500 && response.status !== 429) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }
      throw new Error(`Server Error: ${response.status}`);
    } catch (err) {
      const isNetworkError = err instanceof TypeError && err.message === 'Failed to fetch';
      if (i === retries - 1) throw err;
      
      // Wait longer if it's a network error or server error
      const delay = isNetworkError ? 2000 : 1000 * Math.pow(2, i);
      await wait(delay); 
    }
  }
  throw new Error('Failed to fetch after retries');
};

export const fetchChapter = async (book: string, chapter: number): Promise<BibleApiResponse> => {
  try {
    // Construct URL: book+chapter (e.g. Genesis+1 or 1+Samuel+1)
    // Replace spaces with + manually as bible-api handles this better than %20 in some cases
    const formattedBook = book.trim().replace(/\s+/g, '+');
    const url = `${BIBLE_API_BASE}/${formattedBook}+${chapter}?translation=almeida`;
    const response = await fetchWithRetry(url);
    return await response.json();
  } catch (error) {
    console.error("Error fetching chapter:", error);
    throw error;
  }
};

export const fetchVerse = async (reference: string): Promise<BibleApiResponse> => {
  try {
    // Ensure reference uses + for spaces (e.g. "Psalms+23:1")
    const formattedRef = reference.trim().replace(/\s+/g, '+');
    const url = `${BIBLE_API_BASE}/${formattedRef}?translation=almeida`;
    const response = await fetchWithRetry(url);
    return await response.json();
  } catch (error) {
    console.warn("Verse fetch failed, using fallback data.");
    throw error;
  }
};

export const generatePrayer = async (mood: Mood): Promise<string> => {
  // Check for mocked prayers for Anxious mood
  if (mood === Mood.Anxious) {
    await wait(800); // Small delay for UX consistency
    const randomIndex = Math.floor(Math.random() * ANXIOUS_PRAYERS.length);
    return ANXIOUS_PRAYERS[randomIndex];
  }

  // Check for mocked prayers for Tired mood
  if (mood === Mood.Tired) {
    await wait(800);
    const randomIndex = Math.floor(Math.random() * TIRED_PRAYERS.length);
    return TIRED_PRAYERS[randomIndex];
  }

  // Check for mocked prayers for Happy mood
  if (mood === Mood.Happy) {
    await wait(800);
    const randomIndex = Math.floor(Math.random() * HAPPY_PRAYERS.length);
    return HAPPY_PRAYERS[randomIndex];
  }

  // Fallback for other moods without AI
  await wait(800);
  return `Senhor, neste momento de ${mood.toLowerCase()}, peço a Tua paz que excede todo o entendimento. Guarda o meu coração e os meus pensamentos em Cristo Jesus. Amém. (Filipenses 4:7)`;
};

export const generateReflection = async (topic: string): Promise<string> => {
  await wait(500);
  return "Reflexão indisponível no momento. Conecte-se para mais conteúdos.";
};

// LISTA ÚNICA DE LOUVORES (MP3)
// Adicione suas músicas aqui
const ALL_SONGS: SongSuggestion[] = [
  { 
    id: "1",
    title: "Milagres do Caminho", 
    artist: "Soraya Moraes", 
    reason: "Deus abre caminhos onde não há.", 
    audioUrl: "https://files.catbox.moe/v0y3em.mp3" 
  },
  { 
    id: "2",
    title: "Ajuda-me Jesus", 
    artist: "Rayne Almeida", 
    reason: "Um clamor sincero por força e renovação.", 
    audioUrl: "https://files.catbox.moe/kn3ywn.mp3" 
  },
  { 
    id: "3",
    title: "Oração Silenciosa", 
    artist: "Louvor", 
    reason: "Momento de paz e comunhão com Deus.", 
    audioUrl: "https://files.catbox.moe/mh8izw.mp3" 
  },
  { 
    id: "4",
    title: "Chama Eterna", 
    artist: "Adoração", 
    reason: "Que o fogo do Espírito nunca se apague.", 
    audioUrl: "https://files.catbox.moe/p5qwhk.mp3" 
  },
  { 
    id: "5",
    title: "O Abraço de Deus", 
    artist: "Adoração", 
    reason: "Sinta o conforto e o amor do Pai te envolvendo.", 
    audioUrl: "https://files.catbox.moe/ulohm3.mp3" 
  },
  { 
    id: "6",
    title: "Língua dos Anjos", 
    artist: "Adoração", 
    reason: "Uma atmosfera celestial para edificar seu espírito.", 
    audioUrl: "https://files.catbox.moe/pzx4kx.mp3" 
  },
  { 
    id: "7",
    title: "Estrela Guia", 
    artist: "Adoração", 
    reason: "A luz de Jesus ilumina o seu caminho.", 
    audioUrl: "https://files.catbox.moe/kaddqg.mp3" 
  },
  { 
    id: "8",
    title: "Sopro Divino", 
    artist: "Adoração", 
    reason: "Sinta o renovo do Espírito Santo em sua vida.", 
    audioUrl: "https://files.catbox.moe/i1kvh4.mp3" 
  }
];

export const suggestSongs = async (query: string): Promise<SongSuggestion[]> => {
  // If no query, return all songs
  if (!query || query.trim() === '') {
    return ALL_SONGS;
  }

  const lowerQuery = query.toLowerCase();
  
  // Simple filter by title, artist or reason
  return ALL_SONGS.filter(song => 
    song.title.toLowerCase().includes(lowerQuery) || 
    song.artist.toLowerCase().includes(lowerQuery) ||
    song.reason.toLowerCase().includes(lowerQuery)
  );
};

export const generateDailyChallengeContent = async (theme: string, day: number): Promise<ChallengeDayContent> => {
  // CHECK FOR STATIC CONTENT FIRST
  
  if (theme === 'Ansiedade' || theme === 'Detox de Ansiedade') {
    if (ANXIETY_DETOX_DAYS[day]) return ANXIETY_DETOX_DAYS[day];
  }
  if (theme === 'Gratidão' || theme === 'Gratidão Profunda') {
    if (GRATITUDE_JOURNEY_DAYS[day]) return GRATITUDE_JOURNEY_DAYS[day];
  }
  if (theme === 'Sabedoria' || theme === 'Sabedoria de Provérbios') {
    if (PROVERBS_JOURNEY_DAYS[day]) return PROVERBS_JOURNEY_DAYS[day];
  }
  if (theme === 'Cura Divina' || theme === 'Milagre da Cura') {
    if (HEALING_JOURNEY_DAYS[day]) return HEALING_JOURNEY_DAYS[day];
  }
  if (theme === 'Provisão Financeira e Emprego' || theme === 'Portas Abertas') {
    if (OPEN_DOORS_JOURNEY_DAYS[day]) return OPEN_DOORS_JOURNEY_DAYS[day];
  }
  if (theme === 'Amor, Perdão e Casamento' || theme === 'Restauração de Vínculos') {
    if (RESTORATION_JOURNEY_DAYS[day]) return RESTORATION_JOURNEY_DAYS[day];
  }
  if (theme === 'Fé para Milagres Urgentes' || theme === 'Causas Impossíveis') {
    if (IMPOSSIBLE_CAUSES_JOURNEY_DAYS[day]) return IMPOSSIBLE_CAUSES_JOURNEY_DAYS[day];
  }

  // Fallback without AI
  return {
    verse: "Salmos 23:1",
    thought: "O Senhor é o meu pastor.",
    action: "Tire 5 minutos para agradecer.",
    reflection: "Conteúdo completo indisponível."
  };
}