import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { payoutRotation } from '../data/mockData';

export default function RotationPage() {
  const { t } = useLanguage();

  return (
    <div className="p-4 space-y-4">
      {/* Rotation Info */}
      <div className="bg-gradient-to-r from-indigo-700 to-purple-700 rounded-2xl p-5 text-white shadow-lg">
        <h3 className="text-lg font-bold">{t('merryGoRound')}</h3>
        <p className="text-indigo-200 text-sm mt-1">{t('rotationSchedule')}</p>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="bg-white/10 rounded-xl p-3">
            <p className="text-xs text-indigo-200">Payout Amount</p>
            <p className="text-xl font-bold">{t('ksh')} 75,000</p>
          </div>
          <div className="bg-white/10 rounded-xl p-3">
            <p className="text-xs text-indigo-200">Next Payout</p>
            <p className="text-xl font-bold">Feb 15</p>
          </div>
        </div>
      </div>

      {/* Rotation Order */}
      <div className="space-y-2">
        {payoutRotation.map((item) => (
          <div
            key={item.position}
            className={`rounded-xl p-4 border-2 ${
              item.status === 'current' ? 'border-amber-400 bg-amber-50' :
              item.status === 'completed' ? 'border-emerald-200 bg-emerald-50' :
              'border-gray-200 bg-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                item.status === 'current' ? 'bg-amber-500 text-white' :
                item.status === 'completed' ? 'bg-emerald-500 text-white' :
                'bg-gray-200 text-gray-600'
              }`}>
                {item.status === 'completed' ? '✓' : item.position}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-800">{item.memberName}</p>
                <p className="text-xs text-gray-500">{item.scheduledDate}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-800">{t('ksh')} {item.amount.toLocaleString()}</p>
                <span className={`text-xs font-medium ${
                  item.status === 'current' ? 'text-amber-600' :
                  item.status === 'completed' ? 'text-emerald-600' :
                  'text-gray-500'
                }`}>
                  {item.status === 'current' ? '🔥 ' + t('yourTurn') :
                   item.status === 'completed' ? '✅ ' + t('completed') :
                   '⏳ ' + t('pending')}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Rotation Method */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <h3 className="font-semibold text-gray-800 mb-3">Rotation Method</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-3 p-2 bg-emerald-50 rounded-lg border border-emerald-200">
            <div className="w-4 h-4 bg-emerald-600 rounded-full"></div>
            <span className="text-sm font-medium text-emerald-800">{t('agreedOrder')}</span>
            <span className="ml-auto text-xs text-emerald-600">Active</span>
          </div>
          <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
            <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
            <span className="text-sm text-gray-600">{t('randomDraw')}</span>
          </div>
          <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
            <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
            <span className="text-sm text-gray-600">{t('bidding')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
