
import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProgress } from '../types';

interface ProgressContextType {
    progress: UserProgress;
    markReflectionAsRead: (id: number) => void;
    markPsalmAsRead: (id: number) => void;
    markManualAsCompleted: () => void;
    isReflectionRead: (id: number) => boolean;
    isPsalmRead: (id: number) => boolean;
}

const INITIAL_PROGRESS: UserProgress = {
    readChapters: [],
    lastRead: null,
    streak: 0,
    lastLoginDate: null,
    xp: 0,
    dailyReadCount: 0,
    todayStudyMinutes: 0,
    earnedBadges: [],
    readReflections: [],
    readPsalms: [],
    completedManual: false
};

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [progress, setProgress] = useState<UserProgress>(() => {
        const saved = localStorage.getItem('lumina_progress');
        if (saved) {
            const parsed = JSON.parse(saved);
            return {
                ...INITIAL_PROGRESS,
                ...parsed
            };
        }
        return INITIAL_PROGRESS;
    });

    useEffect(() => {
        localStorage.setItem('lumina_progress', JSON.stringify(progress));
    }, [progress]);

    const markReflectionAsRead = (id: number) => {
        setProgress(prev => {
            if (prev.readReflections.includes(id)) return prev;
            return {
                ...prev,
                readReflections: [...prev.readReflections, id],
                xp: (prev.xp || 0) + 10 // Award XP for reading
            };
        });
    };

    const markPsalmAsRead = (id: number) => {
        setProgress(prev => {
            if (prev.readPsalms.includes(id)) return prev;
            return {
                ...prev,
                readPsalms: [...prev.readPsalms, id],
                xp: (prev.xp || 0) + 15 // Award XP for studying psalm
            };
        });
    };

    const markManualAsCompleted = () => {
        setProgress(prev => ({
            ...prev,
            completedManual: true,
            xp: (prev.xp || 0) + 50 // Big award for manual completion
        }));
    };

    const isReflectionRead = (id: number) => progress.readReflections.includes(id);
    const isPsalmRead = (id: number) => progress.readPsalms.includes(id);

    return (
        <ProgressContext.Provider value={{
            progress,
            markReflectionAsRead,
            markPsalmAsRead,
            markManualAsCompleted,
            isReflectionRead,
            isPsalmRead
        }}>
            {children}
        </ProgressContext.Provider>
    );
};

export const useProgress = () => {
    const context = useContext(ProgressContext);
    if (!context) throw new Error('useProgress must be used within ProgressProvider');
    return context;
};
