
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
<<<<<<< HEAD
import { Home, BookOpen, Music, Zap, Settings, Target, MessageCircle, Baby, Bell, Tv } from 'lucide-react';
=======
import { Home, BookOpen, Music, Zap, Settings, Target, MessageCircle, Baby, Bell } from 'lucide-react';
>>>>>>> a1c76c45b8057bdb889cea829282a0d7039dfa9e
import MiniPlayer from './MiniPlayer';
import UpdatesModal from './UpdatesModal';
import { useLanguage } from '../contexts/LanguageContext';
import { useAudio } from '../contexts/AudioContext';

interface LayoutProps {
  children: React.ReactNode;
}

export const ShalomLogo: React.FC<{ size?: string; className?: string }> = ({ size = "w-8 h-8", className = "" }) => (
  <div className={`${size} bg-gradient-to-br from-gold to-orange rounded-lg flex items-center justify-center shadow-lg ${className}`}>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white w-[60%] h-[60%]">
<<<<<<< HEAD
      <path d="M12 2C12 2 14 5 16 6C18 7 21 6 21 6L20 12C20 12 21 15 18 17C15 19 10 19 10 19L6 22L8 17C8 17 5 15 5 12C5 9 8 7 8 7L12 2Z" fill="currentColor" fillOpacity="0.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 2C12 2 14 5 16 6C18 7 21 6 21 6L20 12C20 12 21 15 18 17C15 19 10 19 10 19L6 22L8 17C8 17 5 15 5 12C5 9 8 7 8 7L12 2Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
=======
      <path d="M12 2C12 2 14 5 16 6C18 7 21 6 21 6L20 12C20 12 21 15 18 17C15 19 10 19 10 19L6 22L8 17C8 17 5 15 5 12C5 9 8 7 8 7L12 2Z" fill="currentColor" fillOpacity="0.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 2C12 2 14 5 16 6C18 7 21 6 21 6L20 12C20 12 21 15 18 17C15 19 10 19 10 19L6 22L8 17C8 17 5 15 5 12C5 9 8 7 8 7L12 2Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
>>>>>>> a1c76c45b8057bdb889cea829282a0d7039dfa9e
    </svg>
  </div>
);

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [isUpdatesOpen, setIsUpdatesOpen] = useState(false);

<<<<<<< HEAD
  const isSimpleLayout = location.pathname === '/' || location.pathname === '/quiz' || location.pathname === '/admin' || location.pathname === '/shalomflix' || location.pathname === '/reflections' || location.pathname === '/psalms-explained' || location.pathname === '/reconnection-guide';

  useEffect(() => {
    const publicRoutes = ['/', '/quiz'];
    if (!publicRoutes.includes(location.pathname)) {
      const userEmail = localStorage.getItem('lumina_email');
      if (!userEmail) {
        navigate('/');
      }
=======
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
>>>>>>> a1c76c45b8057bdb889cea829282a0d7039dfa9e
    }
  }, [location.pathname, navigate]);

  const navItems = [
    { path: '/app', icon: Home, label: t.nav.home },
    { path: '/bible', icon: BookOpen, label: t.nav.bible },
    { path: '/trails', icon: Target, label: t.nav.goals },
    { path: '/worship', icon: Music, label: t.nav.worship },
    { path: '/challenges', icon: Zap, label: t.nav.journey },
<<<<<<< HEAD
    { path: '/kids', icon: Baby, label: t.nav.kids },
    { path: '/shalomflix', icon: Tv, label: 'Shalomflix', isPremium: true },
=======
    { path: '/kids', icon: Baby, label: t.nav.kids, isKids: true, isNew: true },
>>>>>>> a1c76c45b8057bdb889cea829282a0d7039dfa9e
  ];

  const isActive = (path: string) => location.pathname === path;

<<<<<<< HEAD
  if (isSimpleLayout) {
    return <div className="bg-paper dark:bg-black w-full h-screen overflow-y-auto overflow-x-hidden scroll-smooth">{children}</div>;
=======
  const handleWhatsApp = () => {
    const text = encodeURIComponent("Olá, Shalom! Gostaria de conversar com o Guia Espiritual.");
    window.open(`https://wa.me/551151989852?text=${text}`, '_blank');
  };

  const handleNavClick = () => {
    // Navigation logic if needed
  };

  if (isSimpleLayout) {
    return (
      <div className="bg-paper dark:bg-black w-full h-screen overflow-y-auto overflow-x-hidden scroll-smooth">
        {children}
      </div>
    );
>>>>>>> a1c76c45b8057bdb889cea829282a0d7039dfa9e
  }

  return (
    <div className="h-screen w-full bg-paper flex flex-col md:flex-row text-ink transition-colors duration-300">
<<<<<<< HEAD
      <MiniPlayer />
      {isUpdatesOpen && <UpdatesModal onClose={() => setIsUpdatesOpen(false)} />}

=======
      
      <MiniPlayer />
      
      {isUpdatesOpen && <UpdatesModal onClose={() => setIsUpdatesOpen(false)} />}

      {/* WhatsApp Floating Button */}
      <button 
        onClick={handleWhatsApp}
        className="fixed bottom-24 right-6 md:bottom-10 md:right-10 z-50 w-14 h-14 bg-green-500 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all animate-bounce-slow ring-4 ring-green-500/20"
        title="Conversar com Guia"
      >
        <MessageCircle size={28} fill="currentColor" className="opacity-20 absolute" />
        <MessageCircle size={28} className="relative z-10" />
      </button>

>>>>>>> a1c76c45b8057bdb889cea829282a0d7039dfa9e
      <aside className="hidden md:flex flex-col w-72 bg-surface dark:bg-stone-900 border-r border-stone-100 dark:border-stone-800 h-full p-6 shadow-soft z-20">
        <div className="mb-10 flex items-center gap-3 px-2">
          <ShalomLogo />
          <h1 className="text-2xl font-serif font-bold text-ink dark:text-white tracking-tight">{t.common.appName}</h1>
        </div>
<<<<<<< HEAD
=======
        
>>>>>>> a1c76c45b8057bdb889cea829282a0d7039dfa9e
        <nav className="space-y-2 flex-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
<<<<<<< HEAD
              className={`
                flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group
                ${isActive(item.path)
                  ? 'bg-ink dark:bg-white text-white dark:text-stone-900 shadow-md'
                  : 'text-subtle dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-ink dark:hover:text-white'}
                ${item.isPremium ? 'border border-red-500/20 hover:bg-red-500/10' : ''}
              `}
            >
              <item.icon size={22} className={item.isPremium ? "text-red-600" : ""} />
              <span className={`font-medium ${item.isPremium ? "text-red-600 font-bold" : ""}`}>{item.label}</span>
            </Link>
          ))}
        </nav>
        <Link to="/settings" className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 mt-auto ${isActive('/settings') ? 'bg-ink dark:bg-white text-white dark:text-stone-900 shadow-md' : 'text-subtle dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 hover:text-ink dark:hover:text-white'}`}><Settings size={22} /><span className="font-medium">{t.nav.settings}</span></Link>
      </aside>

      {/* Mobile Nav Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-[70px] bg-white/90 dark:bg-stone-950/90 backdrop-blur-xl z-20 flex items-center justify-between px-5 border-b border-stone-100 dark:border-stone-800 transition-all shadow-sm">
        <div className="flex items-center gap-2.5"><ShalomLogo size="w-8 h-8" /><h1 className="text-xl font-serif font-black text-ink dark:text-white tracking-tight">{t.common.appName}</h1></div>
      </div>

      <main className="flex-1 h-full overflow-y-auto overflow-x-hidden md:p-8 pt-[86px] pb-28 md:pb-8 px-4 w-full max-w-5xl mx-auto scroll-smooth no-scrollbar relative">
=======
              onClick={handleNavClick}
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
              {(item as any).isNew && (
                <span className="ml-auto text-[9px] font-black bg-red-500 text-white px-2 py-0.5 rounded-full animate-pulse">NOVO</span>
              )}
            </Link>
          ))}
        </nav>

        <Link 
          to="/settings"
          onClick={handleNavClick}
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

      {/* MOBILE HEADER - REDESIGNED */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-[70px] bg-white/90 dark:bg-stone-950/90 backdrop-blur-xl z-20 flex items-center justify-between px-5 border-b border-stone-100 dark:border-stone-800 transition-all shadow-sm">
        <div className="flex items-center gap-2.5">
          <ShalomLogo size="w-8 h-8" />
          <h1 className="text-xl font-serif font-black text-ink dark:text-white tracking-tight">{t.common.appName}</h1>
        </div>
        
        <div className="flex items-center gap-3">
            {/* Botão de Novidades (Pill Shape) */}
            <button 
                onClick={() => { setIsUpdatesOpen(true); }}
                className="group relative flex items-center gap-2 px-3 py-1.5 bg-[#FF4500] rounded-full text-white shadow-lg shadow-red-500/40 active:scale-95 transition-all overflow-hidden border border-white/20 animate-[pulse_3s_infinite]"
            >
                {/* Efeito de brilho passando */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></div>
                
                <Bell size={14} fill="currentColor" className="animate-[swing_3s_infinite]" />
                <span className="text-[10px] font-black uppercase tracking-widest leading-none">Novidades</span>
                
                {/* Bolinha pulsante integrada */}
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-white rounded-full animate-ping"></span>
            </button>

            <Link to="/settings" onClick={handleNavClick} className="relative group">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all border border-transparent ${isActive('/settings') ? 'bg-stone-100 text-ink dark:bg-stone-800 dark:text-white' : 'text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-900 active:bg-stone-100'}`}>
                    <Settings size={20} />
                </div>
            </Link>
        </div>
      </div>

      <main className="flex-1 h-full overflow-y-auto overflow-x-hidden md:p-8 pt-[86px] pb-28 md:pb-8 px-4 w-full max-w-5xl mx-auto scroll-smooth no-scrollbar relative">
        {/* DESKTOP HEADER ACTION BAR */}
        <div className="hidden md:flex absolute top-4 right-8 z-30 gap-4">
             <button 
                onClick={() => { setIsUpdatesOpen(true); }}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#FF4500] rounded-full shadow-lg shadow-red-500/30 hover:shadow-xl hover:scale-105 transition-all text-sm font-bold text-white border border-white/10 animate-[pulse_3s_infinite]"
            >
                <Bell size={18} fill="currentColor" />
                <span>Novidades</span>
            </button>
        </div>
>>>>>>> a1c76c45b8057bdb889cea829282a0d7039dfa9e
        {children}
      </main>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface dark:bg-stone-900 border-t border-stone-100 dark:border-stone-800 px-2 py-4 flex justify-around items-center z-30 shadow-[0_-4px_20px_-2px_rgba(0,0,0,0.05)] pb-safe">
        {navItems.map((item) => {
          const active = isActive(item.path);
<<<<<<< HEAD
          return (
            <Link key={item.path} to={item.path} className="flex flex-col items-center gap-1 w-14 relative">
              <div className={`p-2 rounded-2xl transition-all duration-300 relative ${active ? (item.isPremium ? 'bg-red-600 text-white transform -translate-y-2 shadow-lg shadow-red-500/30' : 'bg-ink dark:bg-gold text-gold dark:text-stone-900 transform -translate-y-2 shadow-lg') : 'text-stone-400'}`}>
                <item.icon size={22} fill={active ? "currentColor" : "none"} />
              </div>
              <span className={`text-[9px] font-medium transition-colors ${active ? 'text-ink dark:text-white font-bold' : 'text-stone-400'}`}>{item.label}</span>
=======
          const isKids = (item as any).isKids;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={handleNavClick}
              className="flex flex-col items-center gap-1 w-14 relative"
            >
              <div className={`
                p-2 rounded-2xl transition-all duration-300 relative
                ${active 
                    ? (isKids ? 'bg-gradient-to-tr from-pink-500 to-blue-500 text-white transform -translate-y-2 shadow-lg shadow-pink-500/30' : 'bg-ink dark:bg-gold text-gold dark:text-stone-900 transform -translate-y-2 shadow-lg') 
                    : 'text-stone-400'}
              `}>
                <item.icon size={22} strokeWidth={active ? 2.5 : 2} fill={active ? "currentColor" : "none"} />
                {(item as any).isNew && (
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 border-2 border-white dark:border-stone-900"></span>
                    </span>
                )}
              </div>
              <span className={`text-[9px] font-medium transition-colors ${active ? 'text-ink dark:text-white font-bold' : 'text-stone-400'}`}>
                {item.label}
              </span>
>>>>>>> a1c76c45b8057bdb889cea829282a0d7039dfa9e
            </Link>
          );
        })}
      </nav>
<<<<<<< HEAD
=======

>>>>>>> a1c76c45b8057bdb889cea829282a0d7039dfa9e
    </div>
  );
};

export default Layout;
