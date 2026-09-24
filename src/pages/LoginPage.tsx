import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';

export default function LoginPage() {
  const { login, setPage } = useApp();
  const { t, language, setLanguage } = useLanguage();
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length >= 10) setStep('otp');
  };

  const handleOTPSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length === 4) {
      login();
      setPage('dashboard');
    }
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
      <div className="text-center mb-10">
        <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl">
          <svg className="w-12 h-12 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-white">{t('appName')}</h1>
        <p className="text-emerald-200 mt-2">{t('appTagline')}</p>
      </div>

      {/* Form */}
      <div className="w-full bg-white rounded-2xl p-6 shadow-2xl">
        {step === 'phone' ? (
          <form onSubmit={handlePhoneSubmit}>
            <h2 className="text-xl font-bold text-gray-800 mb-2">{t('login')}</h2>
            <p className="text-gray-500 text-sm mb-6">{t('enterPhone')}</p>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('phoneNumber')}</label>
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
              type="submit"
              className="w-full bg-emerald-700 text-white py-3.5 rounded-xl font-semibold text-lg hover:bg-emerald-800 transition-colors shadow-lg"
            >
              {t('next')}
            </button>

            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => setPage('register')}
                className="text-emerald-700 font-medium text-sm"
              >
                {t('dontHaveAccount')} {t('register')}
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleOTPSubmit}>
            <h2 className="text-xl font-bold text-gray-800 mb-2">{t('verifyOTP')}</h2>
            <p className="text-gray-500 text-sm mb-6">{t('enterOTP')} (+254{phone})</p>
            
            <div className="mb-4">
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="• • • •"
                maxLength={4}
                className="w-full px-4 py-4 border border-gray-300 rounded-xl text-center text-2xl tracking-widest focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
              <p className="text-xs text-gray-400 mt-2 text-center">Demo: Enter any 4 digits</p>
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-700 text-white py-3.5 rounded-xl font-semibold text-lg hover:bg-emerald-800 transition-colors shadow-lg"
            >
              {t('login')}
            </button>

            <button
              type="button"
              onClick={() => setStep('phone')}
              className="w-full mt-3 text-emerald-700 font-medium text-sm"
            >
              ← {t('back')}
            </button>
          </form>
        )}
      </div>

      {/* Trust badges */}
      <div className="mt-8 flex items-center gap-4 text-emerald-200 text-xs">
        <span className="flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
          SASRA Aligned
        </span>
        <span className="flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
          Encrypted
        </span>
        <span className="flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
          M-Pesa Ready
        </span>
      </div>
    </div>
  );
}
