
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, BookOpen, Music, Zap, Settings, Target, MessageCircle, Baby, Bell, Tv } from 'lucide-react';
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
      <path d="M12 2C12 2 14 5 16 6C18 7 21 6 21 6L20 12C20 12 21 15 18 17C15 19 10 19 10 19L6 22L8 17C8 17 5 15 5 12C5 9 8 7 8 7L12 2Z" fill="currentColor" fillOpacity="0.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 2C12 2 14 5 16 6C18 7 21 6 21 6L20 12C20 12 21 15 18 17C15 19 10 19 10 19L6 22L8 17C8 17 5 15 5 12C5 9 8 7 8 7L12 2Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
);

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [isUpdatesOpen, setIsUpdatesOpen] = useState(false);

  const isSimpleLayout = location.pathname === '/' || location.pathname === '/quiz' || location.pathname === '/admin' || location.pathname === '/shalomflix' || location.pathname === '/reflections' || location.pathname === '/psalms-explained' || location.pathname === '/reconnection-guide' || location.pathname === '/parafamilias';

  useEffect(() => {
    const publicRoutes = ['/', '/quiz', '/parafamilias'];
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
    { path: '/kids', icon: Baby, label: t.nav.kids },
    { path: '/shalomflix', icon: Tv, label: 'Shalomflix', isPremium: true },
  ];

  const isActive = (path: string) => location.pathname === path;

  if (isSimpleLayout) {
    return <div className="bg-paper dark:bg-black w-full h-screen overflow-y-auto overflow-x-hidden scroll-smooth">{children}</div>;
  }

  return (
    <div className="h-screen w-full bg-paper flex flex-col md:flex-row text-ink transition-colors duration-300">
      <MiniPlayer />
      {isUpdatesOpen && <UpdatesModal onClose={() => setIsUpdatesOpen(false)} />}

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
        {children}
      </main>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface dark:bg-stone-900 border-t border-stone-100 dark:border-stone-800 px-2 py-4 flex justify-around items-center z-30 shadow-[0_-4px_20px_-2px_rgba(0,0,0,0.05)] pb-safe">
        {navItems.map((item) => {
          const active = isActive(item.path);
          return (
            <Link key={item.path} to={item.path} className="flex flex-col items-center gap-1 w-14 relative">
              <div className={`p-2 rounded-2xl transition-all duration-300 relative ${active ? (item.isPremium ? 'bg-red-600 text-white transform -translate-y-2 shadow-lg shadow-red-500/30' : 'bg-ink dark:bg-gold text-gold dark:text-stone-900 transform -translate-y-2 shadow-lg') : 'text-stone-400'}`}>
                <item.icon size={22} fill={active ? "currentColor" : "none"} />
              </div>
              <span className={`text-[9px] font-medium transition-colors ${active ? 'text-ink dark:text-white font-bold' : 'text-stone-400'}`}>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Layout;
