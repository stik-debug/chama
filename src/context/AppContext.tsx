import React, { createContext, useContext, useState, ReactNode } from 'react';
import { currentUser, groupInfo, Member } from '../data/mockData';

type Page = 'login' | 'register' | 'dashboard' | 'contributions' | 'loans' | 'meetings' | 'members' | 'rotation' | 'chat' | 'reports' | 'settings' | 'more' | 'fines' | 'voting' | 'contribute' | 'apply-loan' | 'meeting-detail';

interface AppContextType {
  isAuthenticated: boolean;
  user: Member | null;
  currentPage: Page;
  setPage: (page: Page) => void;
  login: () => void;
  logout: () => void;
  selectedMeetingId: string | null;
  setSelectedMeetingId: (id: string | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user] = useState<Member | null>(currentUser);
  const [currentPage, setCurrentPage] = useState<Page>('login');
  const [selectedMeetingId, setSelectedMeetingId] = useState<string | null>(null);

  const login = () => setIsAuthenticated(true);
  const logout = () => { setIsAuthenticated(false); setCurrentPage('login'); };
  const setPage = (page: Page) => setCurrentPage(page);

  return (
    <AppContext.Provider value={{ isAuthenticated, user, currentPage, setPage, login, logout, selectedMeetingId, setSelectedMeetingId }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
