
import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Landing from './pages/Landing';
import Bible from './pages/Bible';
import Worship from './pages/Worship';
import Challenges from './pages/Challenges';
import Illustrations from './pages/Illustrations';
import Settings from './pages/Settings';
import Trails from './pages/Trails';
import { UserProgress } from './types';
import { AudioProvider } from './contexts/AudioContext';

const INITIAL_PROGRESS: UserProgress = {
  readChapters: [],
  lastRead: null,
  streak: 0,
  lastLoginDate: null,
  xp: 0,
  dailyReadCount: 0,
  todayStudyMinutes: 0,
  earnedBadges: []
};

const App: React.FC = () => {
  // Initialize progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('lumina_progress');
    if (!saved) {
      localStorage.setItem('lumina_progress', JSON.stringify(INITIAL_PROGRESS));
    } else {
      const parsed = JSON.parse(saved);
      const today = new Date().toISOString().split('T')[0];
      
      // Migration & Daily Reset Logic
      let updated = { ...parsed };
      let changed = false;

      // Reset Daily Counts if it's a new day
      if (parsed.lastLoginDate !== today) {
        updated.lastLoginDate = today;
        updated.dailyReadCount = 0; // Reset daily goal
        updated.todayStudyMinutes = 0; // Reset study time
        changed = true;
      }
      
      // Ensure XP field exists
      if (typeof parsed.xp === 'undefined') {
        updated.xp = 0;
        changed = true;
      }

      // Ensure Daily Count field exists
      if (typeof parsed.dailyReadCount === 'undefined') {
        updated.dailyReadCount = 0;
        changed = true;
      }
      
      // Ensure Study Minutes field exists
      if (typeof parsed.todayStudyMinutes === 'undefined') {
        updated.todayStudyMinutes = 0;
        changed = true;
      }

      // Ensure Earned Badges field exists (New Migration)
      if (typeof parsed.earnedBadges === 'undefined') {
        updated.earnedBadges = [];
        changed = true;
      }

      if (changed) {
        localStorage.setItem('lumina_progress', JSON.stringify(updated));
      }
    }
    
    // Check Theme preference
    const savedTheme = localStorage.getItem('lumina_theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <AudioProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/app" element={<Home />} />
            <Route path="/bible" element={<Bible />} />
            <Route path="/worship" element={<Worship />} />
            <Route path="/challenges" element={<Challenges />} />
            <Route path="/illustrations" element={<Illustrations />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/trails" element={<Trails />} />
          </Routes>
        </Layout>
      </Router>
    </AudioProvider>
  );
};

export default App;