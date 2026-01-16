import { BibleApiResponse, Mood, SongSuggestion, ChallengeDayContent } from '../types';
import { 
  FALLBACK_VERSES_DATA,
  ANXIOUS_PRAYERS,
  TIRED_PRAYERS,
  HAPPY_PRAYERS,
  SAD_PRAYERS,
  THANKFUL_PRAYERS,
  CONFUSED_PRAYERS,
  ANGRY_PRAYERS
} from '../constants';
import { JOURNEYS_DATA } from '../data/journeysData';
import { GoogleGenAI } from "@google/genai";

const BIBLE_API_BASE = 'https://bible-api.com';

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const fetchWithRetry = async (url: string, retries = 3): Promise<Response> => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url);
      if (response.ok) return response;
      if (response.status === 404) {
         throw new Error(`API Error: 404 Not Found - ${url}`);
      }
      if (response.status < 500 && response.status !== 429) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }
      throw new Error(`Server Error: ${response.status}`);
    } catch (err) {
      const isNetworkError = err instanceof TypeError && err.message === 'Failed to fetch';
      if (err instanceof Error && err.message.includes('404')) throw err;
      
      if (i === retries - 1) throw err;
      const delay = isNetworkError ? 2000 : 1000 * Math.pow(2, i);
      await wait(delay); 
    }
  }
  throw new Error('Failed to fetch after retries');
};

const getTranslationId = (lang: string): string => {
  switch (lang) {
    case 'pt': return 'almeida';
    case 'es': return 'rvr'; 
    case 'en': return 'web'; 
    default: return 'almeida';
  }
};

export const fetchChapter = async (book: string, chapter: number, lang: string = 'pt'): Promise<BibleApiResponse> => {
  try {
    let apiBook = book;
    if (apiBook === 'Song of Solomon') apiBook = 'Song of Songs';
    const reference = `${apiBook} ${chapter}`;
    const formattedRef = encodeURIComponent(reference);
    const translation = getTranslationId(lang);
    const url = `${BIBLE_API_BASE}/${formattedRef}?translation=${translation}`;
    const response = await fetchWithRetry(url);
    return await response.json();
  } catch (error) {
    console.error("Error fetching chapter:", error);
    throw error;
  }
};

export const fetchVerse = async (reference: string, lang: string = 'pt'): Promise<BibleApiResponse> => {
  try {
    const formattedRef = encodeURIComponent(reference.trim());
    const translation = getTranslationId(lang);
    const url = `${BIBLE_API_BASE}/${formattedRef}?translation=${translation}`;
    const response = await fetchWithRetry(url);
    return await response.json();
  } catch (error) {
    console.warn("Verse fetch failed, using fallback data.");
    const fallbackText = FALLBACK_VERSES_DATA[reference];
    if (fallbackText) {
        return {
            reference: reference,
            text: fallbackText,
            verses: [],
            translation_id: 'offline',
            translation_name: 'Offline (Backup)',
            translation_note: 'Modo Offline Ativado'
        };
    }
    const fallbackKeys = Object.keys(FALLBACK_VERSES_DATA);
    const randomKey = fallbackKeys[Math.floor(Math.random() * fallbackKeys.length)];
    return {
        reference: randomKey,
        text: FALLBACK_VERSES_DATA[randomKey],
        verses: [],
        translation_id: 'offline',
        translation_name: 'Offline (Backup)',
        translation_note: 'Modo Offline Ativado'
    };
  }
};

export const generatePrayer = async (mood: Mood): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Escreva uma oração cristã personalizada e curta (máximo 400 caracteres) para uma pessoa que está se sentindo ${mood.toLowerCase()}. A oração deve ser íntima, profunda e respeitosa. Termine citando um versículo bíblico de consolo adequado.`,
      config: {
        systemInstruction: "Você é um guia espiritual cristão acolhedor e sábio. Suas orações são baseadas na Bíblia, usam linguagem natural e trazem paz.",
        temperature: 0.8,
      }
    });
    return response.text || getLocalFallbackPrayer(mood);
  } catch (error) {
    console.error("Gemini API Error, using local database:", error);
    return getLocalFallbackPrayer(mood);
  }
};

const getLocalFallbackPrayer = (mood: Mood): string => {
    let prayers: string[] = [];
    switch (mood) {
        case Mood.Anxious: prayers = ANXIOUS_PRAYERS; break;
        case Mood.Tired: prayers = TIRED_PRAYERS; break;
        case Mood.Happy: prayers = HAPPY_PRAYERS; break;
        case Mood.Sad: prayers = SAD_PRAYERS; break;
        case Mood.Thankful: prayers = THANKFUL_PRAYERS; break;
        case Mood.Confused: prayers = CONFUSED_PRAYERS; break;
        case Mood.Angry: prayers = ANGRY_PRAYERS; break;
        default: prayers = ["Senhor, entrego minha vida em Tuas mãos hoje. Que a Tua vontade se cumpra e que eu sinta a Tua presença em cada passo. Amém."];
    }
    return prayers[Math.floor(Math.random() * prayers.length)];
};

export const generateReflection = async (topic: string): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Escreva uma reflexão bíblica curta e profunda sobre ${topic}.`,
      config: {
        systemInstruction: "Você é um teólogo sábio que explica a Bíblia de forma prática para a vida moderna.",
        temperature: 0.7,
      }
    });
    return response.text || "Reflexão indisponível no momento.";
  } catch (error) {
    return "Reflexão indisponível no momento. Conecte-se para mais conteúdos.";
  }
};

const ALL_SONGS: SongSuggestion[] = [
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

export const suggestSongs = async (query: string): Promise<SongSuggestion[]> => {
  if (!query || query.trim() === '') return ALL_SONGS;
  const lowerQuery = query.toLowerCase();
  return ALL_SONGS.filter(song => 
    song.title.toLowerCase().includes(lowerQuery) || 
    song.artist.toLowerCase().includes(lowerQuery) ||
    song.reason.toLowerCase().includes(lowerQuery)
  );
};

export const generateDailyChallengeContent = async (challengeId: string, day: number): Promise<ChallengeDayContent> => {
  // Carregar do JOURNEYS_DATA centralizado
  const journey = JOURNEYS_DATA[challengeId];
  if (journey && journey[day]) {
      return journey[day];
  }

  // Fallback se não encontrar o dia específico
  return { 
      verse: "Salmos 23:1", 
      thought: "O Senhor é o meu pastor.", 
      action: "Tire 5 minutos para agradecer hoje.", 
      reflection: "A presença de Deus é constante. Mesmo quando não sentimos, Ele está operando nos bastidores da nossa vida." 
  };
}