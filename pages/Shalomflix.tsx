
import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Maximize, ArrowLeft, Star, Info, ChevronRight, Monitor, Tv, Lock, PlayCircle, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Video } from '../types';
import { supabase } from '../services/supabase';

// Custom Minimal Player Component
const CustomYTPlayer: React.FC<{ youtubeId: string; onBack: () => void }> = ({ youtubeId, onBack }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Ensure Script is loaded
    if (!(window as any).YT) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      if (firstScriptTag && firstScriptTag.parentNode) {
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      }
    }

    // 2. Init Function
    const createPlayer = () => {
      // Destruir player anterior se existir para evitar erro de ID duplicado
      if (playerRef.current && playerRef.current.destroy) {
        playerRef.current.destroy();
      }

      playerRef.current = new (window as any).YT.Player('yt-player-frame', {
        height: '100%',
        width: '100%',
        videoId: youtubeId,
        playerVars: {
          controls: 0,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
          iv_load_policy: 3,
          disablekb: 1,
          autoplay: 1,
          enablejsapi: 1,
          // Remover origin fixo se estiver dando 153, ou garantir que seja válido
          origin: window.location.origin
        },
        events: {
          onReady: (event: any) => {
            setIsReady(true);
            // Tenta dar play com tratamento de erro (Uncaught fix)
            try {
              event.target.playVideo();
            } catch (e) {
              console.warn("Autoplay blocked or failed", e);
            }
          },
          onStateChange: (event: any) => {
            setIsPlaying(event.data === (window as any).YT.PlayerState.PLAYING);
          },
          onError: (event: any) => {
            console.error("YT Player Error:", event.data);
            // Erro 153 muitas vezes é resolvido recarregando ou checando a URL
            if (event.data === 153 || event.data === 101 || event.data === 150) {
              setError("Este vídeo possui restrições de exibição ou ocorreu um erro de segurança (153).");
            } else {
              setError("Ocorreu um erro ao carregar o player de vídeo.");
            }
          }
        }
      });
    };

    // 3. Orchestrate Loading
    if ((window as any).YT && (window as any).YT.Player) {
      createPlayer();
    } else {
      // Se a API ainda não carregou, define o callback global
      (window as any).onYouTubeIframeAPIReady = createPlayer;
    }

    return () => {
      if (playerRef.current && playerRef.current.destroy) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [youtubeId]);

  const togglePlay = () => {
    if (!playerRef.current || !isReady) return;
    try {
      if (isPlaying) playerRef.current.pauseVideo();
      else playerRef.current.playVideo();
    } catch (e) {
      console.error("Playback control error", e);
    }
  };

  const handleFullscreen = () => {
    if (containerRef.current) {
      const el = containerRef.current as any;
      if (el.requestFullscreen) el.requestFullscreen();
      else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
      else if (el.msRequestFullscreen) el.msRequestFullscreen();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col overflow-hidden h-[100dvh] w-[100dvw]" ref={containerRef}>
      <div className="absolute top-6 left-6 z-30 flex items-center gap-4">
        <button onClick={onBack} className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-all border border-white/10">
          <ArrowLeft size={24} />
        </button>
      </div>

      {error ? (
        <div className="flex-1 flex flex-col items-center justify-center text-white p-8 text-center bg-stone-900">
          <Lock size={48} className="text-red-500 mb-4" />
          <h3 className="text-xl font-bold mb-2">Ops! Erro no Player.</h3>
          <p className="text-stone-400 max-w-xs mb-6 text-sm">{error}</p>
          <button onClick={onBack} className="px-8 py-3 bg-white text-black rounded-xl font-bold hover:bg-stone-200 transition-colors">Voltar para o Início</button>
        </div>
      ) : (
        <div className="relative flex-1 bg-black">
          {/* Elemento onde o YT vai injetar o IFrame */}
          <div className="w-full h-full flex items-center justify-center">
            <div id="yt-player-frame"></div>
          </div>

          {!isReady && (
            <div className="absolute inset-0 flex items-center justify-center bg-black z-10">
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="text-red-600 animate-spin" size={48} />
                <p className="text-stone-500 text-xs font-bold uppercase tracking-widest">Preparando Cinema...</p>
              </div>
            </div>
          )}

          {/* CUSTOM OVERLAY CONTROLS */}
          <div className={`absolute inset-0 z-20 flex flex-col justify-end transition-all duration-500 ${!isPlaying && isReady ? 'opacity-100 bg-black/60 backdrop-blur-sm' :
            isReady ? 'opacity-0 hover:opacity-100' : 'opacity-0 pointer-events-none'
            }`}>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40 pointer-events-none"></div>

            {/* PAUSED STATE INDICATOR */}
            {!isPlaying && isReady && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="flex flex-col items-center gap-4 animate-in fade-in zoom-in duration-300">
                  <Lock size={48} className="text-white/20" />
                  <h2 className="text-xl text-white/40 font-bold uppercase tracking-widest">Pausado</h2>
                </div>
              </div>
            )}

            <div className="p-10 flex justify-between items-center relative z-10">
              <div className="flex items-center gap-8">
                <button onClick={togglePlay} className="text-white hover:text-red-600 transition-all transform hover:scale-110 active:scale-95">
                  {isPlaying ? <Pause size={72} fill="currentColor" /> : <Play size={72} fill="currentColor" />}
                </button>
              </div>
              <button onClick={handleFullscreen} className="text-white hover:text-red-500 transition-all transform hover:scale-110">
                <Maximize size={40} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Shalomflix: React.FC = () => {
  const navigate = useNavigate();
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);
  const [showEntrance, setShowEntrance] = useState(true);
  const [daysSinceCreation, setDaysSinceCreation] = useState<number | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    const checkUserAge = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user && user.created_at) {
          const created = new Date(user.created_at);
          const now = new Date();
          const diffTime = Math.abs(now.getTime() - created.getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          setDaysSinceCreation(diffDays);
        } else {
          // Fallback if no user found (maybe dev mode or public), unlock all
          setDaysSinceCreation(999);
        }
      } catch (e) {
        console.error("Auth check failed", e);
        setDaysSinceCreation(999);
      } finally {
        setLoadingAuth(false);
      }
    };
    checkUserAge();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowEntrance(false);
    }, 4500); // Increased duration for the new animation
    return () => clearTimeout(timer);
  }, []);

  const isLocked = (index: number) => {
    if (loadingAuth || daysSinceCreation === null) return false;
    // Lock if video index is >= 7 AND user has been active for less than 7 days
    // Logic: 7 days old account sees everything. 1 day old sees only first 7.
    return index >= 7 && daysSinceCreation < 7;
  };

  const getDaysToUnlock = () => {
    if (daysSinceCreation === null) return 0;
    return Math.max(1, 7 - daysSinceCreation);
  };

  const videos: Video[] = [
    {
      id: '1',
      youtubeId: 'w_5KAXu0TWs',
      title: 'A história de Davi e a ovelha perdida',
      description: 'Uma lição emocionante sobre o cuidado do Bom Pastor e a importância de cada ovelha no Reino de Deus.',
      thumbnail: 'https://files.catbox.moe/y1hf4n.png',
      duration: '5min',
      category: 'kids',
      isNew: false
    },
    {
      id: '2',
      youtubeId: '57RLo0GJp6U',
      title: 'Moisés - Parte 1',
      description: 'Conheça a história do libertador de Israel desde o seu nascimento até o chamado de Deus na sarça ardente.',
      thumbnail: 'https://files.catbox.moe/b98izg.png',
      duration: '23min',
      category: 'kids',
      isNew: true
    },
    {
      id: '3',
      youtubeId: 'QNUOsobqqnY',
      title: 'Moisés - Parte 2',
      description: 'Acompanhe a jornada emocionante de Moisés liderando o povo de Deus e os grandes milagres no deserto.',
      thumbnail: 'https://files.catbox.moe/udp1xl.png',
      duration: '22min',
      category: 'kids',
      isNew: true
    },
    {
      id: '4',
      youtubeId: '1DRqlV5Xhcw',
      title: 'O Nascimento de Jesus',
      description: 'Celebre o milagre do Natal e a chegada do Salvador do mundo nesta linda animação.',
      thumbnail: 'https://files.catbox.moe/5vf4vu.png',
      duration: '25min',
      category: 'kids',
      isNew: true
    },
    {
      id: '5',
      youtubeId: 'lG0u0j2l7R4',
      title: 'A História de Rute',
      description: 'Uma bela história bíblica sobre lealdade, amor, amizade e a providência divina.',
      thumbnail: 'https://files.catbox.moe/zuwgi9.png',
      duration: '21min',
      category: 'kids',
      isNew: false
    },
    {
      id: '6',
      youtubeId: 'UNEBJRzvoyU',
      title: 'Rainha Ester - Parte 1',
      description: 'Descubra como uma jovem judia se tornou rainha da Pérsia em um tempo de grande perigo.',
      thumbnail: 'https://files.catbox.moe/vxcyls.png',
      duration: '24min',
      category: 'kids',
      isNew: false
    },
    {
      id: '7',
      youtubeId: 'epJl6U8WjC8',
      title: 'Rainha Ester - Parte 2',
      description: 'Testemunhe a coragem da Rainha Ester ao arriscar sua vida para salvar seu povo da destruição.',
      thumbnail: 'https://files.catbox.moe/a5ao7n.png',
      duration: '22min',
      category: 'kids',
      isNew: false
    },
    {
      id: '8',
      youtubeId: 'ofkqFzlvDVc',
      title: 'O Rei Davi',
      description: 'As aventuras do pastor de ovelhas que derrotou um gigante e se tornou o maior rei de Israel.',
      thumbnail: 'https://files.catbox.moe/lfnw0i.png',
      duration: '26min',
      category: 'kids',
      isNew: false
    },
    {
      id: '9',
      youtubeId: 'F1AgMfFgPQw',
      title: 'Profeta Elias - Parte 1',
      description: 'Veja o poder de Deus através da vida do profeta Elias e seu desafio contra os falsos profetas.',
      thumbnail: 'https://files.catbox.moe/cv6ce3.png',
      duration: '24min',
      category: 'kids',
      isNew: false
    },
    {
      id: '10',
      youtubeId: 's9uaYQ6r0zI',
      title: 'A Mulher Sunamita',
      description: 'Uma lição tocante sobre fé, hospitalidade e como Deus recompensa a bondade.',
      thumbnail: 'https://files.catbox.moe/2g2iqp.png',
      duration: '19min',
      category: 'kids',
      isNew: false
    },
    {
      id: '11',
      youtubeId: 'I5WZ6PyYha8',
      title: 'Elias e Eliseu - Parte 2',
      description: 'A sucessão profética e os milagres continuam quando o manto de Elias cai sobre Eliseu.',
      thumbnail: 'https://img.youtube.com/vi/I5WZ6PyYha8/maxresdefault.jpg',
      duration: '23min',
      category: 'kids',
      isNew: true
    },
    {
      id: '12',
      youtubeId: 'ra_cjLdRWEk',
      title: 'A História da Criação',
      description: 'Como tudo começou: A narrativa bíblica da criação do mundo e da humanidade.',
      thumbnail: 'https://img.youtube.com/vi/ra_cjLdRWEk/maxresdefault.jpg',
      duration: '20min',
      category: 'kids',
      isNew: true
    },
    {
      id: '13',
      youtubeId: 'ZOaTin-loiA',
      title: 'O Azeite da Viúva',
      description: 'Um milagre de provisão divina que nos ensina a confiar em Deus nos momentos difíceis.',
      thumbnail: 'https://files.catbox.moe/qqtvyr.png',
      duration: '18min',
      category: 'kids',
      isNew: true
    },
    {
      id: '14',
      youtubeId: 'XJPDfRVcgGY',
      title: 'A História de Jesus',
      description: 'A vida, os milagres e os ensinamentos do Filho de Deus que mudou a história.',
      thumbnail: 'https://files.catbox.moe/ftn0hj.png',
      duration: '28min',
      category: 'kids',
      isNew: true
    },
    {
      id: '15',
      youtubeId: 'Sa1nn9f2xds',
      title: 'O Filho Pródigo',
      description: 'A parábola que revela o amor incondicional e o perdão do Pai Celestial.',
      thumbnail: 'https://files.catbox.moe/7ix74k.png',
      duration: '15min',
      category: 'kids',
      isNew: true
    },
    {
      id: '16',
      youtubeId: '9HA8jOPc9sQ',
      title: 'A Arca de Noé',
      description: 'A grande aventura de fé e obediência de Noé durante o dilúvio.',
      thumbnail: 'https://files.catbox.moe/vlhr3q.png',
      duration: '22min',
      category: 'kids',
      isNew: true
    },
    {
      id: '17',
      youtubeId: 'bQddI2xG2hI',
      title: 'Adão e Eva',
      description: 'A história do primeiro casal e as lições sobre escolhas e consequências no Jardim do Éden.',
      thumbnail: 'https://files.catbox.moe/pedad6.png',
      duration: '19min',
      category: 'kids',
      isNew: true
    },
    {
      id: '18',
      youtubeId: '0-rs9_tF9DQ',
      title: 'Jonas: O Profeta',
      description: 'A saga do profeta que tentou fugir de Deus e foi engolido por um grande peixe.',
      thumbnail: 'https://files.catbox.moe/4dpz1t.png',
      duration: '24min',
      category: 'kids',
      isNew: true
    },
    {
      id: '19',
      youtubeId: 'dx2TDrM3HUg',
      title: 'A Fé de Jó',
      description: 'Uma história poderosa sobre perseverança, fé e restauração em meio às provações.',
      thumbnail: 'https://files.catbox.moe/iok3vw.png',
      duration: '26min',
      category: 'kids',
      isNew: true
    },
    {
      id: '20',
      youtubeId: '4ddH6nrzVeA',
      title: 'Ana',
      description: 'A oração de uma mãe e a fidelidade de Deus em conceder o desejo do seu coração.',
      thumbnail: 'https://files.catbox.moe/1cy8aa.png',
      duration: '21min',
      category: 'kids',
      isNew: true
    },
    {
      id: '21',
      youtubeId: 'laxbnKdHIdM',
      title: 'O Bom Semeador',
      description: 'Entenda os princípios do Reino de Deus através desta parábola fundamental de Jesus.',
      thumbnail: 'https://files.catbox.moe/gjo2xo.png',
      duration: '17min',
      category: 'kids',
      isNew: true
    }
  ];

  if (activeVideo) {
    return <CustomYTPlayer youtubeId={activeVideo.youtubeId} onBack={() => setActiveVideo(null)} />;
  }

  // Handle auto-fullscreen rotation simulation via CSS class hooks
  // Note: True automatic Fullscreen API trigger on rotation is blocked by browsers for security,
  // but using 100dvh on the player creates the same visual effect.

  return (
    <div className="min-h-screen bg-[#141414] text-white -m-4 md:-m-8 p-4 md:p-8 animate-fade-in font-sans relative">
      <style>{`
        body { background-color: #141414 !important; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>

      {/* INTRO ANIMATION */}
      {showEntrance && (
        <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center animate-out fade-out duration-1000 delay-[3500ms] fill-mode-forwards pointer-events-none">

          {/* Background Effects */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-stone-900 via-black to-black opacity-80 animate-pulse delay-700"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent,rgba(255,0,0,0.1),transparent)] animate-spin duration-[10s] linear opacity-30"></div>
          </div>

          <div className="relative z-10 flex flex-col items-center justify-center overflow-hidden">
            {/* Cinematic Text Reveal */}
            <div className="relative">
              <h1 className="text-transparent bg-clip-text bg-gradient-to-b from-red-500 to-red-800 font-serif font-black text-4xl md:text-7xl tracking-tighter scale-110 animate-in zoom-in-50 duration-[2000ms] ease-out-cubic">
                SHALOMFLIX
              </h1>

              {/* Light Sweep */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent w-full h-full -translate-x-full animate-[shimmer_2s_ease-in-out_0.5s_forwards]"></div>
            </div>

            {/* Subtitle / Tagline */}
            <p className="mt-6 text-stone-500 text-sm md:text-lg font-light tracking-[0.5em] uppercase opacity-0 animate-[fade-in-up_1s_ease-out_1.5s_forwards]">
              Jornada Espiritual
            </p>

            {/* Loading Line */}
            <div className="mt-12 w-32 h-[2px] bg-stone-800 relative overflow-hidden rounded-full">
              <div className="absolute inset-0 bg-red-600 w-full animate-[loading-bar_2s_ease-in-out_forwards] origin-left"></div>
            </div>
          </div>

          {/* Custom Keyframes injection for this component only */}
          <style>{`
                @keyframes shimmer {
                    0% { transform: translateX(-150%) skewX(-15deg); }
                    100% { transform: translateX(150%) skewX(-15deg); }
                }
                @keyframes loading-bar {
                    0% { transform: scaleX(0); }
                    50% { transform: scaleX(0.7); }
                    100% { transform: scaleX(1); }
                }
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
      )}

      {/* Header */}
      <header className="flex justify-between items-center mb-8 sticky top-0 z-50 bg-[#141414]/90 backdrop-blur-md py-4">
        <div className="flex items-center gap-6">
          <button onClick={() => navigate('/app')} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-red-600 font-serif font-black text-2xl md:text-3xl tracking-tighter uppercase">SHALOMFLIX</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="bg-red-600 text-[10px] font-black px-2 py-1 rounded">PREMIUM</span>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[80vh] md:h-[75vh] landscape:h-[100vh] rounded-[2.5rem] overflow-hidden mb-12 shadow-2xl group border border-white/10">
        <img
          src={videos[0].thumbnail}
          className="w-full h-full object-cover opacity-80 transition-transform duration-[20s] group-hover:scale-110"
          alt="Featured"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/40 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-transparent to-transparent"></div>

        <div className="absolute bottom-24 left-6 md:bottom-12 md:left-16 max-w-2xl z-10 text-left">
          <div className="inline-flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full text-xs border border-white/20 mb-4">
            <Star size={12} className="text-yellow-400 fill-yellow-400" />
            <span className="font-bold uppercase tracking-widest">Lançamento Exclusivo</span>
          </div>
          <h2 className="text-3xl md:text-7xl font-serif font-black mb-4 leading-none">{videos[0].title}</h2>
          <p className="text-stone-300 text-sm md:text-lg mb-8 leading-relaxed max-w-lg line-clamp-3 md:line-clamp-none">
            {videos[0].description}
          </p>
          <div className="flex flex-col md:flex-row gap-4 pr-6 md:pr-0">
            <button
              onClick={() => setActiveVideo(videos[0])}
              className="bg-white text-black px-8 py-3 md:px-10 md:py-4 rounded-xl font-black text-base md:text-lg flex items-center justify-center gap-2 hover:bg-red-600 hover:text-white transition-all transform active:scale-95 shadow-xl w-full md:w-auto"
            >
              <Play size={24} fill="currentColor" /> Assistir Agora
            </button>
            <button className="bg-white/10 backdrop-blur-md text-white px-8 py-3 md:px-8 md:py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-white/20 transition-all border border-white/10 w-full md:w-auto">
              <Info size={24} /> Detalhes
            </button>
          </div>
        </div>
      </section>

      {/* Rows */}
      <section className="space-y-12">
        {/* Row 1 */}
        <div>
          <h3 className="text-2xl font-bold mb-6 px-4 flex items-center gap-3">
            <Tv size={24} className="text-red-600" /> Kids Zone
          </h3>
          <div className="flex gap-6 overflow-x-auto px-4 pb-4 no-scrollbar snap-x">
            {videos.slice(0, 8).map((video, index) => {
              const locked = isLocked(index);
              return (
                <div
                  key={video.id}
                  onClick={() => !locked && setActiveVideo(video)}
                  className={`flex-shrink-0 w-72 md:w-96 group cursor-pointer snap-start text-left ${locked ? 'opacity-70' : ''}`}
                >
                  <div className="relative aspect-video rounded-3xl overflow-hidden mb-4 border-2 border-transparent group-hover:border-red-600 transition-all shadow-xl">
                    <img src={video.thumbnail} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt={video.title} />

                    {locked ? (
                      <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center text-center p-4">
                        <Lock size={48} className="text-stone-500 mb-2" />
                        <h4 className="text-stone-400 font-bold uppercase text-xs tracking-widest">Bloqueado</h4>
                        <p className="text-stone-600 text-[10px] mt-1">Disponível em {getDaysToUnlock()} dias</p>
                      </div>
                    ) : (
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <PlayCircle size={64} className="text-white" />
                      </div>
                    )}

                    {!locked && <div className="absolute bottom-3 right-3 bg-black/80 px-3 py-1 rounded-lg text-[10px] font-black uppercase">{video.duration}</div>}
                  </div>
                  <h4 className="font-bold text-xl group-hover:text-red-500 transition-colors">{video.title}</h4>
                  <p className="text-stone-500 text-sm mt-1">{video.description}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Rows 2 - ALL VIDEOS GRID */}
        <div>
          <h3 className="text-2xl font-bold mb-6 px-4 flex items-center gap-3">
            <Monitor size={24} className="text-red-600" /> Todos os Vídeos
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
            {videos.map((video, index) => {
              const locked = isLocked(index);
              return (
                <div
                  key={video.id + '_grid'}
                  onClick={() => !locked && setActiveVideo(video)}
                  className={`group cursor-pointer text-left ${locked ? 'opacity-60' : ''}`}
                >
                  <div className="relative aspect-video rounded-[2rem] overflow-hidden mb-4 border-2 border-transparent hover:border-red-600/50 transition-all bg-stone-900">
                    <img src={video.thumbnail} className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${locked ? 'grayscale' : ''}`} alt={video.title} />

                    {locked ? (
                      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex flex-col items-center justify-center">
                        <Lock size={32} className="text-white/40 mb-2" />
                        <span className="text-[10px] font-bold uppercase text-white/40 border border-white/20 px-2 py-1 rounded-full">
                          Em breve
                        </span>
                      </div>
                    ) : (
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <PlayCircle size={48} className="text-white drop-shadow-lg transform scale-90 group-hover:scale-100 transition-transform" />
                      </div>
                    )}
                  </div>
                  <h4 className="font-bold text-lg leading-tight text-stone-200 group-hover:text-white transition-colors">{video.title}</h4>
                  <span className="text-xs font-bold text-stone-600 uppercase tracking-wider mt-1 block">{video.category} • {video.duration}</span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-24 py-12 border-t border-white/5 text-center text-stone-600">
        <p className="font-serif italic mb-2">"A paz que fala com você."</p>
        <p className="text-xs uppercase tracking-[0.2em]">© 2024 Shalom App Premium</p>
      </footer>
    </div>
  );
};

export default Shalomflix;
