import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { fines } from '../data/mockData';

export default function FinesPage() {
  const { t } = useLanguage();

  return (
    <div className="p-4 space-y-4">
      {/* Fines Summary */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-4">
        <h3 className="font-semibold text-red-800">{t('fines')}</h3>
        <div className="grid grid-cols-2 gap-3 mt-3">
          <div className="bg-white rounded-lg p-3">
            <p className="text-xs text-gray-500">Unpaid Fines</p>
            <p className="text-lg font-bold text-red-700">{t('ksh')} 500</p>
          </div>
          <div className="bg-white rounded-lg p-3">
            <p className="text-xs text-gray-500">Total Paid</p>
            <p className="text-lg font-bold text-emerald-700">{t('ksh')} 800</p>
          </div>
        </div>
      </div>

      {/* Fine Rules */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <h3 className="font-semibold text-gray-800 mb-3">Fine Schedule</h3>
        <div className="space-y-2">
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-sm text-gray-700">{t('lateFee')}</span>
            <span className="text-sm font-bold text-red-600">{t('ksh')} 500</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-sm text-gray-700">{t('absenceFee')}</span>
            <span className="text-sm font-bold text-red-600">{t('ksh')} 300</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-sm text-gray-700">Late to meeting (&gt;15min)</span>
            <span className="text-sm font-bold text-red-600">{t('ksh')} 100</span>
          </div>
        </div>
      </div>

      {/* Fine History */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <h3 className="font-semibold text-gray-800 mb-3">Fine History</h3>
        <div className="space-y-3">
          {fines.map((fine) => (
            <div key={fine.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
              <div>
                <p className="text-sm font-medium text-gray-800">{fine.memberName}</p>
                <p className="text-xs text-gray-500">{fine.reason}</p>
                <p className="text-xs text-gray-400">{fine.date}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-800">{t('ksh')} {fine.amount}</p>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                  fine.status === 'paid' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                }`}>
                  {t(fine.status)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
