import React from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { AppProvider, useApp } from './context/AppContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ContributionsPage from './pages/ContributionsPage';
import LoansPage from './pages/LoansPage';
import MeetingsPage from './pages/MeetingsPage';
import MembersPage from './pages/MembersPage';
import RotationPage from './pages/RotationPage';
import ChatPage from './pages/ChatPage';
import ReportsPage from './pages/ReportsPage';
import SettingsPage from './pages/SettingsPage';
import MorePage from './pages/MorePage';
import FinesPage from './pages/FinesPage';
import ContributePage from './pages/ContributePage';
import ApplyLoanPage from './pages/ApplyLoanPage';
import BottomNav from './components/BottomNav';
import TopBar from './components/TopBar';

function AppContent() {
  const { isAuthenticated, currentPage } = useApp();

  if (!isAuthenticated) {
    if (currentPage === 'register') return <RegisterPage />;
    return <LoginPage />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <DashboardPage />;
      case 'contributions': return <ContributionsPage />;
      case 'loans': return <LoansPage />;
      case 'meetings': return <MeetingsPage />;
      case 'members': return <MembersPage />;
      case 'rotation': return <RotationPage />;
      case 'chat': return <ChatPage />;
      case 'reports': return <ReportsPage />;
      case 'settings': return <SettingsPage />;
      case 'more': return <MorePage />;
      case 'fines': return <FinesPage />;
      case 'contribute': return <ContributePage />;
      case 'apply-loan': return <ApplyLoanPage />;
      default: return <DashboardPage />;
    }
  };

  const showNav = !['login', 'register', 'contribute', 'apply-loan'].includes(currentPage);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col max-w-md mx-auto relative">
      <TopBar />
      <main className="flex-1 overflow-y-auto pb-20">
        {renderPage()}
      </main>
      {showNav && <BottomNav />}
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </LanguageProvider>
  );
}
