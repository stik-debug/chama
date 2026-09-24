import React, { createContext, useContext, useState, ReactNode } from 'react';
import { translations, Language } from './data/translations';
import { currentUser, Member } from './data/mockData';

// ==================== CONTEXTS ====================
type Page = 'splash' | 'onboarding' | 'login' | 'register' | 'dashboard' | 'contributions' | 'loans' | 'meetings' | 'members' | 'rotation' | 'chat' | 'reports' | 'settings' | 'more' | 'fines' | 'contribute' | 'apply-loan' | 'audit' | 'notifications' | 'profile';

interface AppContextType {
  isAuthenticated: boolean;
  user: Member | null;
  currentPage: Page;
  setPage: (page: Page) => void;
  login: () => void;
  logout: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  toast: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user] = useState<Member | null>(currentUser);
  const [currentPage, setCurrentPage] = useState<Page>('splash');
  const [language, setLanguage] = useState<Language>('en');
  const [toast, setToast] = useState<string | null>(null);

  const t = (key: string): string => (translations[language] as Record<string, string>)[key] || key;
  const login = () => setIsAuthenticated(true);
  const logout = () => { setIsAuthenticated(false); setCurrentPage('login'); };
  const setPage = (page: Page) => setCurrentPage(page);
  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  return (
    <AppContext.Provider value={{ isAuthenticated, user, currentPage, setPage, login, logout, language, setLanguage, t, toast, showToast }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
