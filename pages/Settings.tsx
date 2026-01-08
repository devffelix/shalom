
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Moon, Sun, Trash2, Save, Camera, ChevronRight, LogOut, Info, Award, Brain, Heart, Scroll, Cross, Key, Users, Mountain, BookOpen, Crown, Zap, Lock, Star, Loader2, Globe } from 'lucide-react';
import { getAllDisplayBadges, getUserXp, calculateLevel } from '../services/gamification';
import { updateUserName } from '../services/supabase';
import { Badge } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

// Icon Map
const IconMap: Record<string, any> = {
  Brain, Heart, Scroll, Cross, Key, Users, Mountain, BookOpen
};

const BadgeCard: React.FC<{ item: { badge: Badge, earned: boolean } }> = ({ item }) => {
  const { t } = useLanguage();
  const IconComponent = IconMap[item.badge.icon] || Award;
  return (
    <div className={`
        relative rounded-3xl p-4 flex flex-col items-center text-center gap-3 transition-all duration-500 group overflow-hidden border
        ${item.earned 
          ? 'bg-gradient-to-br from-white to-orange-50 dark:from-stone-800 dark:to-stone-900 border-gold/40 shadow-card hover:shadow-xl hover:-translate-y-1' 
          : 'bg-stone-50 dark:bg-stone-900 border-stone-100 dark:border-stone-800 opacity-80'}
    `}>
       {/* Background Glow for Earned */}
       {item.earned && (
          <div className="absolute top-0 right-0 w-20 h-20 bg-gold/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
       )}

       {/* Icon Container */}
       <div className={`
           relative w-16 h-16 rounded-full flex items-center justify-center shadow-inner mb-1 transition-all duration-500
           ${item.earned 
             ? 'bg-gradient-to-br from-gold to-orange text-white shadow-orange/30 group-hover:scale-110 rotate-0' 
             : 'bg-stone-200 dark:bg-stone-800 text-stone-400 grayscale'}
       `}>
          <IconComponent size={28} strokeWidth={item.earned ? 2 : 1.5} />
          
          {/* Lock Overlay if not earned */}
          {!item.earned && (
             <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-stone-300 dark:bg-stone-700 rounded-full flex items-center justify-center border-2 border-white dark:border-stone-900">
                <Lock size={10} className="text-stone-500 dark:text-stone-300" />
             </div>
          )}
          
          {/* Star badge if earned */}
          {item.earned && (
             <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white dark:bg-stone-900 rounded-full flex items-center justify-center border border-gold shadow-sm">
                <Star size={10} className="text-gold fill-gold" />
             </div>
          )}
       </div>

       <div className="z-10 w-full">
          <h4 className={`font-bold text-sm leading-tight mb-1 truncate px-1 ${item.earned ? 'text-ink dark:text-white' : 'text-stone-500'}`}>
            {item.badge.title}
          </h4>
          <p className="text-[10px] text-subtle leading-tight line-clamp-2 min-h-[2.5em]">
            {item.badge.description}
          </p>
       </div>
       
       {item.earned && (
          <div className="mt-1 px-2 py-0.5 bg-gold/10 text-gold-dark dark:text-gold rounded-full text-[9px] font-bold uppercase tracking-wider">
             {t.settings.earned}
          </div>
       )}
    </div>
  );
};

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const { t, language, setLanguage } = useLanguage();
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState<string | null>(null);
  const [isDark, setIsDark] = useState(false);
  const [showSaveMsg, setShowSaveMsg] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [badges, setBadges] = useState<{ badge: Badge, earned: boolean }[]>([]);
  const [stats, setStats] = useState({ xp: 0, level: 1, title: '' });

  useEffect(() => {
    // Load saved settings
    const savedName = localStorage.getItem('lumina_username');
    if (savedName) setName(savedName);

    const savedAvatar = localStorage.getItem('lumina_avatar');
    if (savedAvatar) setAvatar(savedAvatar);

    const savedTheme = localStorage.getItem('lumina_theme');
    setIsDark(savedTheme === 'dark');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    }

    // Load Gamification Data
    const savedProgress = localStorage.getItem('lumina_progress');
    const earnedIds = savedProgress ? JSON.parse(savedProgress).earnedBadges || [] : [];
    
    setBadges(getAllDisplayBadges(earnedIds));
    
    const xp = getUserXp();
    const levelData = calculateLevel(xp);
    setStats({ xp, level: levelData.currentLevel, title: levelData.currentTitle });

  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    
    // Sync with Supabase
    const userEmail = localStorage.getItem('lumina_email');
    if (userEmail && name.trim()) {
      await updateUserName(userEmail, name.trim());
    }

    // Save locally
    localStorage.setItem('lumina_username', name);
    
    setIsSaving(false);
    setShowSaveMsg(true);
    setTimeout(() => setShowSaveMsg(false), 2000);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 1024 * 1024) { // 1MB limit
        alert(t.settings.imageTooLarge);
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setAvatar(base64String);
        localStorage.setItem('lumina_avatar', base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleTheme = () => {
    const newMode = !isDark;
    setIsDark(newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('lumina_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('lumina_theme', 'light');
    }
  };

  const clearData = () => {
    if (window.confirm(t.settings.resetConfirm)) {
      localStorage.clear();
      window.location.reload();
    }
  };

  const handleLogout = () => {
    if (window.confirm(t.settings.logoutConfirm)) {
      localStorage.removeItem('lumina_email');
      navigate('/');
    }
  };

  // Filter badges by type
  const journeyBadges = badges.filter(b => b.badge.type === 'journey');
  const bibleBadges = badges.filter(b => b.badge.type === 'bible');

  return (
    <div className="animate-fade-in space-y-8 pb-10">
      <div className="px-2">
        <h2 className="text-3xl font-serif font-bold text-ink dark:text-white mb-2">{t.settings.title}</h2>
        <p className="text-subtle text-sm">{t.settings.subtitle}</p>
      </div>

      {/* Profile Section */}
      <div className="bg-surface dark:bg-stone-900 rounded-[2.5rem] p-8 shadow-card border border-stone-100 dark:border-stone-800 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
           <div className="relative group">
              <div className="w-28 h-28 rounded-full overflow-hidden bg-stone-100 dark:bg-stone-800 border-4 border-white dark:border-stone-700 shadow-xl">
                 {avatar ? (
                   <img src={avatar} alt="Profile" className="w-full h-full object-cover" />
                 ) : (
                   <div className="w-full h-full flex items-center justify-center text-stone-300">
                     <User size={40} />
                   </div>
                 )}
              </div>
              <label 
                htmlFor="avatar-upload" 
                className="absolute bottom-0 right-0 p-2 bg-gold text-ink rounded-full shadow-lg cursor-pointer hover:bg-orange hover:text-white transition-colors border-2 border-white dark:border-stone-900"
              >
                <Camera size={16} />
                <input 
                  id="avatar-upload" 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleAvatarChange}
                />
              </label>
           </div>
           
           <div className="flex-1 w-full text-center md:text-left">
              <div className="mb-4">
                  <label className="block text-xs font-bold text-subtle uppercase tracking-wider mb-1 ml-1">{t.settings.travelerName}</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Seu nome"
                      disabled={isSaving}
                      className="w-full p-3 pl-4 bg-paper dark:bg-stone-800 rounded-xl border border-stone-200 dark:border-stone-700 focus:border-gold outline-none text-ink dark:text-white font-bold transition-colors disabled:opacity-50"
                    />
                    <button 
                        onClick={handleSave}
                        disabled={isSaving}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-gold text-ink rounded-lg shadow-md hover:bg-orange hover:text-white transition-colors disabled:opacity-50"
                    >
                        {isSaving ? <Loader2 size={14} className="animate-spin" /> : showSaveMsg ? <Star size={14} fill="currentColor"/> : <Save size={14} />}
                    </button>
                  </div>
              </div>
           </div>
        </div>
      </div>

      {/* ACHIEVEMENTS DASHBOARD */}
      <div className="space-y-6">
         <div className="px-2 flex items-end justify-between">
             <div>
                <h3 className="text-xl font-serif font-bold text-ink dark:text-white flex items-center gap-2">
                    <Award className="text-gold" size={24} /> {t.settings.trophyRoom}
                </h3>
                <p className="text-xs text-subtle mt-1">{t.settings.trophyDesc}</p>
             </div>
         </div>

         {/* Stats Row */}
         <div className="grid grid-cols-3 gap-4">
             <div className="bg-gradient-to-br from-gold to-orange p-6 rounded-[2.5rem] text-white shadow-lg relative overflow-hidden">
                <div className="absolute -right-4 -bottom-4 opacity-20"><Crown size={120} /></div>
                <span className="text-xs font-black uppercase opacity-80 tracking-widest">{t.home.level}</span>
                <div className="text-8xl font-black tracking-tighter my-2 leading-none">{stats.level}</div>
                <div className="text-sm font-bold truncate opacity-90">{stats.title}</div>
             </div>
             
             <div className="bg-surface dark:bg-stone-900 p-6 rounded-[2.5rem] border border-stone-100 dark:border-stone-800 shadow-sm relative overflow-hidden">
                <div className="absolute -right-4 -bottom-4 text-stone-100 dark:text-stone-800"><Zap size={100} /></div>
                <span className="text-xs font-black text-subtle uppercase tracking-widest">{t.settings.xpTotal}</span>
                <div className="text-6xl font-black text-ink dark:text-white my-2 tracking-tighter leading-none">{stats.xp}</div>
             </div>

             <div className="bg-surface dark:bg-stone-900 p-6 rounded-[2.5rem] border border-stone-100 dark:border-stone-800 shadow-sm relative overflow-hidden">
                <div className="absolute -right-4 -bottom-4 text-stone-100 dark:text-stone-800"><Award size={100} /></div>
                <span className="text-xs font-black text-subtle uppercase tracking-widest">{t.settings.badges}</span>
                <div className="text-6xl font-black text-ink dark:text-white my-2 tracking-tighter leading-none">{badges.filter(b => b.earned).length}<span className="text-2xl text-stone-400 font-bold">/{badges.length}</span></div>
             </div>
         </div>

         {/* Journey Badges Section */}
         <div>
             <h4 className="text-sm font-bold text-subtle uppercase tracking-widest mb-4 px-2">{t.settings.journeyBadges}</h4>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {journeyBadges.map((item) => (
                   <BadgeCard key={item.badge.id} item={item} />
                ))}
             </div>
         </div>

         {/* Bible Badges Section (Dynamic) */}
         {bibleBadges.length > 0 && (
             <div>
                 <h4 className="text-sm font-bold text-subtle uppercase tracking-widest mb-4 px-2 mt-4">{t.settings.bibleBadges}</h4>
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {bibleBadges.map((item) => (
                       <BadgeCard key={item.badge.id} item={item} />
                    ))}
                 </div>
             </div>
         )}
         
         {bibleBadges.length === 0 && (
            <div className="bg-stone-100 dark:bg-stone-800/50 rounded-3xl p-6 text-center border border-dashed border-stone-300 dark:border-stone-700">
                <BookOpen className="mx-auto text-stone-400 mb-2" size={24} />
                <p className="text-sm text-stone-500 font-medium">{t.settings.readAllBooks}</p>
            </div>
         )}
      </div>

      {/* Appearance & System */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-stone-200 dark:border-stone-800">
          {/* Appearance Section */}
          <div className="bg-surface dark:bg-stone-900 rounded-[2.5rem] p-6 shadow-card border border-stone-100 dark:border-stone-800 space-y-4">
             <h3 className="text-lg font-bold font-serif mb-4 flex items-center gap-2 text-ink dark:text-white">
                <Sun className="text-gold" size={20} /> {t.settings.appearance}
             </h3>
             
             {/* Dark Mode */}
             <div className="flex items-center justify-between p-4 bg-paper dark:bg-stone-800 rounded-2xl">
                <div className="flex items-center gap-3">
                   <div className={`p-2 rounded-full ${isDark ? 'bg-stone-700 text-stone-300' : 'bg-orange-light text-orange'}`}>
                      {isDark ? <Moon size={18} /> : <Sun size={18} />}
                   </div>
                   <div className="text-sm">
                      <h4 className="font-bold text-ink dark:text-white">{t.settings.darkMode}</h4>
                   </div>
                </div>
                
                <button 
                  onClick={toggleTheme}
                  className={`w-12 h-7 rounded-full p-1 transition-colors duration-300 ${isDark ? 'bg-gold' : 'bg-stone-200'}`}
                >
                   <div className={`w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform duration-300 ${isDark ? 'translate-x-5' : 'translate-x-0'}`}></div>
                </button>
             </div>

             {/* Language Selector */}
             <div className="flex items-center justify-between p-4 bg-paper dark:bg-stone-800 rounded-2xl">
                <div className="flex items-center gap-3">
                   <div className="p-2 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                      <Globe size={18} />
                   </div>
                   <div className="text-sm">
                      <h4 className="font-bold text-ink dark:text-white">{t.settings.language}</h4>
                      <p className="text-[10px] text-subtle">{t.settings.languageDesc}</p>
                   </div>
                </div>
                
                <div className="flex gap-2">
                    <button 
                        onClick={() => setLanguage('pt')} 
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${language === 'pt' ? 'bg-ink text-white dark:bg-white dark:text-ink' : 'bg-stone-200 dark:bg-stone-700 text-stone-500'}`}
                    >
                        PT
                    </button>
                    <button 
                        onClick={() => setLanguage('en')} 
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${language === 'en' ? 'bg-ink text-white dark:bg-white dark:text-ink' : 'bg-stone-200 dark:bg-stone-700 text-stone-500'}`}
                    >
                        EN
                    </button>
                    <button 
                        onClick={() => setLanguage('es')} 
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${language === 'es' ? 'bg-ink text-white dark:bg-white dark:text-ink' : 'bg-stone-200 dark:bg-stone-700 text-stone-500'}`}
                    >
                        ES
                    </button>
                </div>
             </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-surface dark:bg-stone-900 rounded-[2.5rem] p-6 shadow-card border border-stone-100 dark:border-stone-800 space-y-4">
             <h3 className="text-lg font-bold font-serif mb-4 flex items-center gap-2 text-stone-600 dark:text-stone-300">
                <Info size={20} /> {t.settings.accountSystem}
             </h3>

             <button 
               onClick={handleLogout}
               className="w-full flex items-center justify-between p-4 bg-stone-50 dark:bg-stone-800 rounded-2xl border border-stone-100 dark:border-stone-700 group hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors"
             >
                <div className="flex items-center gap-3">
                   <div className="p-2 bg-white dark:bg-stone-900 rounded-full text-stone-500">
                      <LogOut size={18} />
                   </div>
                   <div className="text-left">
                      <h4 className="font-bold text-ink dark:text-white text-sm">{t.settings.logout}</h4>
                   </div>
                </div>
                <ChevronRight className="text-stone-300" size={18} />
             </button>

             <button 
               onClick={clearData}
               className="w-full flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/10 rounded-2xl border border-red-100 dark:border-red-900/30 group hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
             >
                <div className="flex items-center gap-3">
                   <div className="p-2 bg-white dark:bg-red-900/20 rounded-full text-red-500">
                      <Trash2 size={18} />
                   </div>
                   <div className="text-left">
                      <h4 className="font-bold text-red-600 dark:text-red-400 text-sm">{t.settings.reset}</h4>
                   </div>
                </div>
                <ChevronRight className="text-red-300" size={18} />
             </button>
          </div>
      </div>

      <div className="text-center text-stone-400 text-xs py-4">
         Shalom App v1.4 • {language.toUpperCase()}
      </div>
    </div>
  );
};

export default Settings;
