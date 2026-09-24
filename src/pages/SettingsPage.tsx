import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { currentUser, groupInfo } from '../data/mockData';

export default function SettingsPage() {
  const { t, language, setLanguage } = useLanguage();
  const { logout } = useApp();

  return (
    <div className="p-4 space-y-4">
      {/* Profile */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center">
            <span className="text-emerald-700 font-bold text-xl">{currentUser.name.charAt(0)}</span>
          </div>
          <div>
            <p className="font-bold text-gray-800">{currentUser.name}</p>
            <p className="text-sm text-gray-500">{currentUser.phone}</p>
            <p className="text-xs text-gray-400">ID: {currentUser.id} • Joined {currentUser.joinDate}</p>
          </div>
        </div>
      </div>

      {/* Language */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <h3 className="font-semibold text-gray-800 mb-3">{t('language')}</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setLanguage('en')}
            className={`flex-1 py-3 rounded-xl font-medium text-sm ${
              language === 'en' ? 'bg-emerald-700 text-white' : 'bg-gray-100 text-gray-600'
            }`}
          >
            🇬🇧 {t('english')}
          </button>
          <button
            onClick={() => setLanguage('sw')}
            className={`flex-1 py-3 rounded-xl font-medium text-sm ${
              language === 'sw' ? 'bg-emerald-700 text-white' : 'bg-gray-100 text-gray-600'
            }`}
          >
            🇰🇪 {t('kiswahili')}
          </button>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <h3 className="font-semibold text-gray-800 mb-3">{t('notifications')}</h3>
        <div className="space-y-3">
          {['Contribution Reminders', 'Loan Updates', 'Meeting Alerts', 'Payout Notifications', 'SMS Fallback'].map((item) => (
            <div key={item} className="flex justify-between items-center">
              <span className="text-sm text-gray-700">{item}</span>
              <div className="w-11 h-6 bg-emerald-600 rounded-full relative cursor-pointer">
                <div className="absolute right-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Security */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <h3 className="font-semibold text-gray-800 mb-3">{t('security')}</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-700">{t('biometricLock')}</span>
            <div className="w-11 h-6 bg-gray-300 rounded-full relative cursor-pointer">
              <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow"></div>
            </div>
          </div>
          <button className="w-full text-left text-sm text-gray-700 py-2">{t('changePin')} →</button>
          <button className="w-full text-left text-sm text-gray-700 py-2">KYC Verification ✓ Verified</button>
        </div>
      </div>

      {/* Group Info */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <h3 className="font-semibold text-gray-800 mb-3">Group Information</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-gray-500">{t('groupName')}</span><span className="font-medium">{groupInfo.name}</span></div>
          <div className="flex justify-between"><span className="text-gray-500">{t('groupType')}</span><span className="font-medium">{t('merryGoRoundType')}</span></div>
          <div className="flex justify-between"><span className="text-gray-500">Paybill</span><span className="font-medium">{groupInfo.paybill}</span></div>
          <div className="flex justify-between"><span className="text-gray-500">Account</span><span className="font-medium">{groupInfo.account}</span></div>
        </div>
      </div>

      {/* Logout */}
      <button
        onClick={logout}
        className="w-full bg-red-50 text-red-700 py-3 rounded-xl font-semibold border border-red-200"
      >
        {t('logout')}
      </button>
    </div>
  );
}
