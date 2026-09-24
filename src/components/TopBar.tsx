import React from 'react';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';

export default function TopBar() {
  const { currentPage, setPage, user } = useApp();
  const { t } = useLanguage();

  const getTitle = () => {
    switch (currentPage) {
      case 'dashboard': return t('appName');
      case 'contributions': return t('contributions');
      case 'loans': return t('loans');
      case 'meetings': return t('meetings');
      case 'members': return t('members');
      case 'rotation': return t('merryGoRound');
      case 'chat': return t('chat');
      case 'reports': return t('reports');
      case 'settings': return t('settings');
      case 'more': return t('more');
      case 'fines': return t('fines');
      case 'contribute': return t('contribute');
      case 'apply-loan': return t('applyLoan');
      default: return t('appName');
    }
  };

  const showBack = ['contribute', 'apply-loan', 'fines', 'rotation', 'reports', 'settings', 'more', 'chat'].includes(currentPage);

  return (
    <header className="bg-emerald-800 text-white px-4 py-3 flex items-center justify-between sticky top-0 z-50 shadow-lg">
      <div className="flex items-center gap-3">
        {showBack && (
          <button onClick={() => setPage('dashboard')} className="p-1 -ml-1">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}
        <div>
          <h1 className="text-lg font-bold">{getTitle()}</h1>
          {currentPage === 'dashboard' && user && (
            <p className="text-emerald-200 text-xs">{t('welcome')}, {user.name.split(' ')[0]}</p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        {currentPage === 'dashboard' && (
          <button className="relative p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        )}
      </div>
    </header>
  );
}
