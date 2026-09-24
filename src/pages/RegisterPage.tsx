import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';

export default function RegisterPage() {
  const { login, setPage } = useApp();
  const { t, language, setLanguage } = useLanguage();
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [nationalId, setNationalId] = useState('');

  const handleSubmit = () => {
    login();
    setPage('dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-800 to-emerald-900 flex flex-col items-center justify-center px-6 max-w-md mx-auto">
      {/* Language Toggle */}
      <div className="absolute top-4 right-4">
        <button
          onClick={() => setLanguage(language === 'en' ? 'sw' : 'en')}
          className="text-emerald-200 text-sm font-medium bg-emerald-700/50 px-3 py-1.5 rounded-full"
        >
          {language === 'en' ? '🇰🇪 Kiswahili' : '🇰🇪 English'}
        </button>
      </div>

      {/* Logo */}
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-xl">
          <svg className="w-10 h-10 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-white">{t('createAccount')}</h1>
        <p className="text-emerald-200 text-sm mt-1">Step {step} of 3</p>
      </div>

      {/* Progress */}
      <div className="w-full flex gap-2 mb-6">
        {[1, 2, 3].map(s => (
          <div key={s} className={`flex-1 h-1.5 rounded-full ${s <= step ? 'bg-white' : 'bg-emerald-700'}`}></div>
        ))}
      </div>

      {/* Form */}
      <div className="w-full bg-white rounded-2xl p-6 shadow-2xl">
        {step === 1 && (
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-4">{t('phoneNumber')}</h2>
            <div className="mb-4">
              <div className="flex">
                <span className="inline-flex items-center px-3 bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg text-gray-600 text-sm">+254</span>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="712 345 678"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-lg"
                />
              </div>
            </div>
            <button
              onClick={() => setStep(2)}
              className="w-full bg-emerald-700 text-white py-3.5 rounded-xl font-semibold text-lg"
            >
              {t('next')}
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-4">{t('fullName')} & {t('nationalId')}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('fullName')}</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. James Mwangi"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('nationalId')}</label>
                <input
                  type="text"
                  value={nationalId}
                  onChange={(e) => setNationalId(e.target.value)}
                  placeholder="e.g. 12345678"
                  maxLength={8}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
            </div>
            <button
              onClick={() => setStep(3)}
              className="w-full bg-emerald-700 text-white py-3.5 rounded-xl font-semibold text-lg mt-6"
            >
              {t('next')}
            </button>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-2">KYC Verification</h2>
            <p className="text-sm text-gray-500 mb-4">Verify your identity with a selfie (powered by Smile ID)</p>
            
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center mb-4">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <p className="text-sm text-gray-600 font-medium">Take a selfie</p>
              <p className="text-xs text-gray-400 mt-1">Demo: Click to verify</p>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 mb-4">
              <p className="text-xs text-emerald-700">🔒 Your data is encrypted and verified against IPRS (Integrated Population Registration System)</p>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-emerald-700 text-white py-3.5 rounded-xl font-semibold text-lg"
            >
              {t('createAccount')}
            </button>
          </div>
        )}

        <button
          onClick={() => step > 1 ? setStep(step - 1) : setPage('login')}
          className="w-full mt-3 text-emerald-700 font-medium text-sm"
        >
          ← {t('back')}
        </button>
      </div>
    </div>
  );
}
