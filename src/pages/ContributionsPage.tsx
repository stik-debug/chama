import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { contributions, groupInfo } from '../data/mockData';

export default function ContributionsPage() {
  const { setPage } = useApp();
  const { t } = useLanguage();
  const [filter, setFilter] = useState<'all' | 'paid' | 'pending' | 'late'>('all');

  const filtered = filter === 'all' ? contributions : contributions.filter(c => c.status === filter);

  const stats = {
    paid: contributions.filter(c => c.status === 'paid').length,
    pending: contributions.filter(c => c.status === 'pending').length,
    late: contributions.filter(c => c.status === 'late').length,
  };

  return (
    <div className="p-4 space-y-4">
      {/* Summary */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <h3 className="font-semibold text-gray-800 mb-3">{t('contributionHistory')}</h3>
        <div className="grid grid-cols-3 gap-2">
          <div className="text-center p-2 bg-emerald-50 rounded-lg">
            <p className="text-lg font-bold text-emerald-700">{stats.paid}</p>
            <p className="text-xs text-emerald-600">{t('paid')}</p>
          </div>
          <div className="text-center p-2 bg-yellow-50 rounded-lg">
            <p className="text-lg font-bold text-yellow-700">{stats.pending}</p>
            <p className="text-xs text-yellow-600">{t('pending')}</p>
          </div>
          <div className="text-center p-2 bg-red-50 rounded-lg">
            <p className="text-lg font-bold text-red-700">{stats.late}</p>
            <p className="text-xs text-red-600">{t('late')}</p>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {(['all', 'paid', 'pending', 'late'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
              filter === f ? 'bg-emerald-700 text-white' : 'bg-white text-gray-600 border border-gray-200'
            }`}
          >
            {f === 'all' ? 'All' : t(f)}
          </button>
        ))}
      </div>

      {/* Contribution List */}
      <div className="space-y-2">
        {filtered.map((c) => (
          <div key={c.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                c.status === 'paid' ? 'bg-emerald-100' :
                c.status === 'pending' ? 'bg-yellow-100' :
                'bg-red-100'
              }`}>
                <span className="text-lg">
                  {c.status === 'paid' ? '✅' : c.status === 'pending' ? '⏳' : '⚠️'}
                </span>
              </div>
              <div>
                <p className="font-medium text-gray-800">{c.memberName}</p>
                <p className="text-xs text-gray-500">{c.date} • {c.method || '—'}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-gray-800">{t('ksh')} {c.amount.toLocaleString()}</p>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                c.status === 'paid' ? 'bg-emerald-100 text-emerald-700' :
                c.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {t(c.status)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Contribute Button */}
      <button
        onClick={() => setPage('contribute')}
        className="w-full bg-emerald-700 text-white py-4 rounded-xl font-semibold text-lg shadow-lg flex items-center justify-center gap-2"
      >
        <span>💰</span> {t('contribute')} — {t('ksh')} {groupInfo.contributionAmount.toLocaleString()}
      </button>
    </div>
  );
}


