import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { groupInfo, members, contributions } from '../data/mockData';

export default function ReportsPage() {
  const { t } = useLanguage();

  const totalContributions = contributions.filter(c => c.status === 'paid').reduce((sum, c) => sum + c.amount, 0);
  const totalMembers = members.length;

  return (
    <div className="p-4 space-y-4">
      {/* Report Header */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <h3 className="font-bold text-gray-800 text-lg">{t('financialStatement')}</h3>
        <p className="text-sm text-gray-500">{groupInfo.name} • 2024-2025</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">{t('totalAssets')}</p>
          <p className="text-xl font-bold text-gray-800 mt-1">{t('ksh')} {(groupInfo.totalAssets / 1000000).toFixed(2)}M</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">Total Contributions</p>
          <p className="text-xl font-bold text-gray-800 mt-1">{t('ksh')} {totalContributions.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">{t('members')}</p>
          <p className="text-xl font-bold text-gray-800 mt-1">{totalMembers}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500">{t('defaultRate')}</p>
          <p className="text-xl font-bold text-red-600 mt-1">{groupInfo.defaultRate}%</p>
        </div>
      </div>

      {/* Monthly Summary */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <h3 className="font-semibold text-gray-800 mb-3">Monthly Summary</h3>
        <div className="space-y-2">
          {['January', 'December', 'November', 'October'].map((month, i) => (
            <div key={month} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
              <span className="text-sm text-gray-600">{month} 2025</span>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-emerald-600">{t('ksh')} {(75000 - i * 5000).toLocaleString()}</span>
                <span className="text-xs text-gray-400">{15 - i} paid</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Member Statements */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <h3 className="font-semibold text-gray-800 mb-3">Member Statements</h3>
        <div className="space-y-2">
          {members.slice(0, 5).map((member) => (
            <div key={member.id} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
              <div>
                <p className="text-sm font-medium text-gray-800">{member.name}</p>
                <p className="text-xs text-gray-500">{member.role}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-gray-800">{t('ksh')} {(member.totalContributed / 1000).toFixed(0)}K</p>
                {member.loanBalance > 0 && (
                  <p className="text-xs text-orange-600">Loan: {t('ksh')} {(member.loanBalance / 1000).toFixed(0)}K</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Export Options */}
      <div className="space-y-2">
        <button className="w-full bg-emerald-700 text-white py-3 rounded-xl font-semibold shadow flex items-center justify-center gap-2">
          📄 {t('downloadPDF')}
        </button>
        <button className="w-full bg-white text-emerald-700 py-3 rounded-xl font-semibold border-2 border-emerald-200 flex items-center justify-center gap-2">
          📊 {t('exportData')} (CSV/Excel)
        </button>
        <button className="w-full bg-white text-gray-700 py-3 rounded-xl font-semibold border border-gray-200 flex items-center justify-center gap-2">
          📋 {t('annualReport')}
        </button>
      </div>
    </div>
  );
}
