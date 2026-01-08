
import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import Home from './Home';
import Landing from './Landing';
import Bible from './Bible';
import Worship from './Worship';
import Challenges from './Challenges';
import { KidsZone } from './Illustrations';
import Settings from './Settings';
import Trails from './Trails';
import Quiz from './Quiz';
import AdminDashboard from './AdminDashboard';
import BibleTriviaPage from './BibleTriviaPage';
import { UserProgress } from '../types';
import { AudioProvider } from '../contexts/AudioContext';
import { LanguageProvider } from '../contexts/LanguageContext';

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

    // --- UTM CAPTURE LOGIC ---
    const params = new URLSearchParams(window.location.search);
    const utmSource = params.get('utm_source');
    const utmMedium = params.get('utm_medium');
    const utmCampaign = params.get('utm_campaign');

    if (utmSource || utmMedium || utmCampaign) {
      const utmData = {
        source: utmSource || 'direct',
        medium: utmMedium || 'none',
        campaign: utmCampaign || 'none',
        date: new Date().toISOString()
      };
      localStorage.setItem('lumina_utms', JSON.stringify(utmData));
      // In a real app, you would send this to your analytics backend here
      console.log('Traffic Source Captured:', utmData);
    }
  }, []);

  return (
    <LanguageProvider>
      <AudioProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/app" element={<Home />} />
              <Route path="/bible" element={<Bible />} />
              <Route path="/worship" element={<Worship />} />
              <Route path="/challenges" element={<Challenges />} />
              <Route path="/kids" element={<KidsZone />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/trails" element={<Trails />} />
              <Route path="/trivia" element={<BibleTriviaPage />} />
            </Routes>
          </Layout>
        </Router>
      </AudioProvider>
    </LanguageProvider>
  );
};

export default App;
