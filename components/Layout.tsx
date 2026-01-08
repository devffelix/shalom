
import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, BookOpen, Music, Zap, Settings, Target, MessageCircle, Baby } from 'lucide-react';
import MiniPlayer from './MiniPlayer';
import { useLanguage } from '../contexts/LanguageContext';

interface LayoutProps {
  children: React.ReactNode;
}

export const ShalomLogo: React.FC<{ size?: string }> = ({ size = "w-8 h-8" }) => (
  <div className={`${size} bg-gradient-to-br from-gold to-orange rounded-lg flex items-center justify-center shadow-lg`}>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white w-[60%] h-[60%]">
      <path d="M12 2C12 2 14 5 16 6C18 7 21 6 21 6L20 12C20 12 21 15 18 17C15 19 10 19 10 19L6 22L8 17C8 17 5 15 5 12C5 9 8 7 8 7L12 2Z" fill="currentColor" fillOpacity="0.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 2C12 2 14 5 16 6C18 7 21 6 21 6L20 12C20 12 21 15 18 17C15 19 10 19 10 19L6 22L8 17C8 17 5 15 5 12C5 9 8 7 8 7L12 2Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </div>
);

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();

  // Admin route added to simple layout
  const isSimpleLayout = location.pathname === '/' || location.pathname === '/quiz' || location.pathname === '/admin';

  // Auth Guard: Redireciona para home se não houver usuário logado em rotas protegidas
  useEffect(() => {
    const publicRoutes = ['/', '/quiz'];
    // Se não estiver em uma rota pública e não tiver email salvo, manda pra home
    if (!publicRoutes.includes(location.pathname)) {
        const userEmail = localStorage.getItem('lumina_email');
        if (!userEmail) {
            navigate('/');
        }
    }
  }, [location.pathname, navigate]);

  const navItems = [
    { path: '/app', icon: Home, label: t.nav.home },
    { path: '/bible', icon: BookOpen, label: t.nav.bible },
    { path: '/trails', icon: Target, label: t.nav.goals },
    { path: '/worship', icon: Music, label: t.nav.worship },
    { path: '/challenges', icon: Zap, label: t.nav.journey },
    { path: '/kids', icon: Baby, label: t.nav.kids, isKids: true },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleWhatsApp = () => {
    const text = encodeURIComponent("Olá, Shalom! Gostaria de conversar com o Guia Espiritual.");
    window.open(`https://wa.me/551151989852?text=${text}`, '_blank');
  };

  if (isSimpleLayout) {
    return (
      <div className="bg-paper dark:bg-black w-full h-screen overflow-y-auto overflow-x-hidden scroll-smooth">
        {children}
      </div>
    );
  }

  return (
    <div className="h-screen w-full bg-paper flex flex-col md:flex-row text-ink transition-colors duration-300">
      
      <MiniPlayer />

      {/* WhatsApp Floating Button */}
      <button 
        onClick={handleWhatsApp}
        className="fixed bottom-24 right-6 md:bottom-10 md:right-10 z-50 w-14 h-14 bg-green-500 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all animate-bounce-slow ring-4 ring-green-500/20"
        title="Conversar com Guia"
      >
        <MessageCircle size={28} fill="currentColor" className="opacity-20 absolute" />
        <MessageCircle size={28} className="relative z-10" />
      </button>

      <aside className="hidden md:flex flex-col w-72 bg-surface dark:bg-stone-900 border-r border-stone-100 dark:border-stone-800 h-full p-6 shadow-soft z-20">
        <div className="mb-10 flex items-center gap-3 px-2">
          <ShalomLogo />
          <h1 className="text-2xl font-serif font-bold text-ink dark:text-white tracking-tight">{t.common.appName}</h1>
        </div>
        
        <nav className="space-y-2 flex-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group
                ${isActive(item.path) 
                  ? 'bg-ink dark:bg-white text-white dark:text-stone-900 shadow-md' 
                  : 'text-subtle dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-ink dark:hover:text-white'}
                ${(item as any).isKids ? 'hover:bg-gradient-to-r hover:from-pink-100 hover:to-blue-100 dark:hover:from-pink-900/20 dark:hover:to-blue-900/20' : ''}
              `}
            >
              <item.icon 
                size={22} 
                strokeWidth={isActive(item.path) ? 2.5 : 2} 
                className={(item as any).isKids ? "text-pink-500" : ""}
              />
              <span className={`font-medium ${(item as any).isKids ? "text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500 font-bold" : ""}`}>
                {item.label}
              </span>
            </Link>
          ))}
        </nav>

        <Link 
          to="/settings"
          className={`
            flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 mt-auto
            ${isActive('/settings') 
              ? 'bg-ink dark:bg-white text-white dark:text-stone-900 shadow-md' 
              : 'text-subtle dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-ink dark:hover:text-white'}
          `}
        >
           <Settings size={22} />
           <span className="font-medium">{t.nav.settings}</span>
        </Link>
      </aside>

      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-paper/80 dark:bg-stone-950/80 backdrop-blur-md z-20 flex items-center justify-between px-6 border-b border-stone-100/50 dark:border-stone-800/50">
        <div className="flex items-center gap-2">
          <ShalomLogo size="w-7 h-7" />
          <h1 className="text-xl font-serif font-bold text-ink dark:text-white">{t.common.appName}</h1>
        </div>
        <Link to="/settings">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isActive('/settings') ? 'bg-orange text-white' : 'bg-orange-light text-orange'}`}>
              <Settings size={18} />
          </div>
        </Link>
      </div>

      <main className="flex-1 h-full overflow-y-auto overflow-x-hidden md:p-8 pt-20 pb-28 md:pb-8 px-4 w-full max-w-5xl mx-auto scroll-smooth no-scrollbar">
        {children}
      </main>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface dark:bg-stone-900 border-t border-stone-100 dark:border-stone-800 px-2 py-4 flex justify-around items-center z-30 shadow-[0_-4px_20px_-2px_rgba(0,0,0,0.05)] pb-safe">
        {navItems.map((item) => {
          const active = isActive(item.path);
          const isKids = (item as any).isKids;
          return (
            <Link
              key={item.path}
              to={item.path}
              className="flex flex-col items-center gap-1 w-14"
            >
              <div className={`
                p-2 rounded-2xl transition-all duration-300
                ${active 
                    ? (isKids ? 'bg-gradient-to-tr from-pink-500 to-blue-500 text-white transform -translate-y-2 shadow-lg shadow-pink-500/30' : 'bg-ink dark:bg-gold text-gold dark:text-stone-900 transform -translate-y-2 shadow-lg') 
                    : 'text-stone-400'}
              `}>
                <item.icon size={22} strokeWidth={active ? 2.5 : 2} fill={active ? "currentColor" : "none"} />
              </div>
              <span className={`text-[9px] font-medium transition-colors ${active ? 'text-ink dark:text-white font-bold' : 'text-stone-400'}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

    </div>
  );
};

export default Layout;
