import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { groupInfo } from '../data/mockData';

export default function ContributePage() {
  const { setPage } = useApp();
  const { t } = useLanguage();
  const [amount, setAmount] = useState(groupInfo.contributionAmount.toString());
  const [step, setStep] = useState<'amount' | 'confirm' | 'processing' | 'success'>('amount');

  const handleContribute = () => {
    setStep('confirm');
  };

  const handleConfirm = () => {
    setStep('processing');
    setTimeout(() => setStep('success'), 2500);
  };

  if (step === 'success') {
    return (
      <div className="p-6 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
          <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800">{t('success')}</h2>
        <p className="text-gray-500 text-center mt-2">
          {t('ksh')} {parseInt(amount).toLocaleString()} contribution received via M-Pesa
        </p>
        <p className="text-sm text-gray-400 mt-1">Confirmation: SDG8X2K4L5</p>
        <button
          onClick={() => setPage('dashboard')}
          className="mt-6 bg-emerald-700 text-white px-8 py-3 rounded-xl font-semibold"
        >
          {t('back')} to {t('dashboard')}
        </button>
      </div>
    );
  }

  if (step === 'processing') {
    return (
      <div className="p-6 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-700 rounded-full animate-spin mb-4"></div>
        <h2 className="text-xl font-bold text-gray-800">Processing M-Pesa STK Push...</h2>
        <p className="text-gray-500 text-center mt-2">Please check your phone and enter your M-Pesa PIN</p>
        <div className="mt-4 bg-green-50 border border-green-200 rounded-xl p-3 text-center">
          <p className="text-sm text-green-800">📱 M-Pesa prompt sent to +254712***678</p>
        </div>
      </div>
    );
  }

  if (step === 'confirm') {
    return (
      <div className="p-4 space-y-4">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-3xl font-bold text-green-700">M</span>
          </div>
          <h2 className="text-xl font-bold text-gray-800">{t('payViaMpesa')}</h2>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-500">Paybill</span>
              <span className="font-medium">{groupInfo.paybill}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-500">Account</span>
              <span className="font-medium">{groupInfo.account}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-500">{t('amount')}</span>
              <span className="font-bold text-emerald-700">{t('ksh')} {parseInt(amount).toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-500">Phone</span>
              <span className="font-medium">+254712***678</span>
            </div>
          </div>
        </div>

        <button
          onClick={handleConfirm}
          className="w-full bg-green-600 text-white py-4 rounded-xl font-semibold text-lg shadow-lg"
        >
          ✅ {t('confirm')} & Pay
        </button>
        <button
          onClick={() => setStep('amount')}
          className="w-full text-gray-500 py-2 text-sm"
        >
          ← {t('back')}
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 mb-4">{t('contribute')}</h2>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">{t('contributionAmount')}</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">{t('ksh')}</span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full pl-14 pr-4 py-4 border-2 border-gray-200 rounded-xl text-2xl font-bold focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Quick amounts */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          {[5000, 10000, 15000].map((amt) => (
            <button
              key={amt}
              onClick={() => setAmount(amt.toString())}
              className={`py-2.5 rounded-xl text-sm font-medium ${
                amount === amt.toString() ? 'bg-emerald-700 text-white' : 'bg-gray-100 text-gray-700'
              }`}
            >
              {t('ksh')} {amt.toLocaleString()}
            </button>
          ))}
        </div>

        {/* Payment Method */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
          <div className="space-y-2">
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl border-2 border-green-500">
              <div className="w-4 h-4 bg-green-600 rounded-full"></div>
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs">M</span>
              </div>
              <span className="font-medium text-green-800">M-Pesa STK Push</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200">
              <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
              <span className="font-medium text-gray-600">Bank Transfer</span>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={handleContribute}
        className="w-full bg-emerald-700 text-white py-4 rounded-xl font-semibold text-lg shadow-lg"
      >
        💰 {t('payViaMpesa')} — {t('ksh')} {parseInt(amount).toLocaleString()}
      </button>
    </div>
  );
}
