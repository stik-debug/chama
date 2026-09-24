import React from 'react';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';

export default function MorePage() {
  const { setPage } = useApp();
  const { t } = useLanguage();

  const menuItems = [
    { id: 'members', icon: '👥', label: t('members'), desc: 'View all group members' },
    { id: 'rotation', icon: '🔄', label: t('merryGoRound'), desc: 'Payout rotation schedule' },
    { id: 'chat', icon: '💬', label: t('chat'), desc: 'Group messages & announcements' },
    { id: 'reports', icon: '📊', label: t('reports'), desc: 'Financial statements & exports' },
    { id: 'fines', icon: '⚠️', label: t('fines'), desc: 'Penalties & late fees' },
    { id: 'settings', icon: '⚙️', label: t('settings'), desc: 'Language, security & profile' },
  ];

  return (
    <div className="p-4 space-y-4">
      {/* Quick Stats */}
      <div className="bg-emerald-700 rounded-2xl p-5 text-white">
        <p className="text-emerald-200 text-sm">Umoja Welfare Group</p>
        <p className="text-2xl font-bold mt-1">15 {t('members')}</p>
        <p className="text-emerald-200 text-sm mt-1">{t('ksh')} 2.25M {t('totalAssets')}</p>
      </div>

      {/* Menu Items */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {menuItems.map((item, i) => (
          <button
            key={item.id}
            onClick={() => setPage(item.id as any)}
            className={`w-full flex items-center gap-4 p-4 text-left hover:bg-gray-50 ${
              i < menuItems.length - 1 ? 'border-b border-gray-100' : ''
            }`}
          >
            <span className="text-2xl">{item.icon}</span>
            <div className="flex-1">
              <p className="font-semibold text-gray-800">{item.label}</p>
              <p className="text-xs text-gray-500">{item.desc}</p>
            </div>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        ))}
      </div>

      {/* USSD Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">📱</span>
          <h3 className="font-semibold text-blue-800 text-sm">USSD Access (Feature Phones)</h3>
        </div>
        <p className="text-sm text-blue-700">Dial <span className="font-bold">*384*22#</span> to check balance, contribute, or view statements without a smartphone.</p>
      </div>

      {/* Version */}
      <p className="text-center text-xs text-gray-400">ChamaConnect v1.0.0 • Made in Kenya 🇰🇪</p>
    </div>
  );
}
