import React from 'react';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { currentUser, groupInfo, contributions, payoutRotation, loans } from '../data/mockData';

export default function DashboardPage() {
  const { setPage } = useApp();
  const { t } = useLanguage();

  const nextPayout = payoutRotation.find(p => p.status === 'current');
  const myPayout = payoutRotation.find(p => p.memberId === currentUser.id);
  const recentContributions = contributions.filter(c => c.memberId === currentUser.id).slice(0, 3);

  return (
    <div className="p-4 space-y-4">
      {/* Group Info Card */}
      <div className="bg-emerald-700 rounded-2xl p-5 text-white shadow-lg">
        <div className="flex justify-between items-start mb-3">
          <div>
            <p className="text-emerald-200 text-xs font-medium uppercase tracking-wide">{groupInfo.name}</p>
            <p className="text-2xl font-bold mt-1">{t('ksh')} {currentUser.totalContributed.toLocaleString()}</p>
            <p className="text-emerald-200 text-sm">{t('totalContributed')}</p>
          </div>
          <div className="bg-emerald-600 rounded-xl p-2">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setPage('contribute')}
            className="flex-1 bg-white text-emerald-800 py-2.5 rounded-xl font-semibold text-sm shadow"
          >
            💰 {t('contribute')}
          </button>
          <button
            onClick={() => setPage('rotation')}
            className="flex-1 bg-emerald-600 text-white py-2.5 rounded-xl font-semibold text-sm border border-emerald-500"
          >
            🔄 {t('merryGoRound')}
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500 font-medium">{t('nextPayout')}</p>
          <p className="text-lg font-bold text-gray-800 mt-1">{myPayout?.scheduledDate || 'Mar 15'}</p>
          <p className="text-xs text-emerald-600 font-medium">{t('payoutPosition')}: #{currentUser.payoutPosition}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-500 font-medium">{t('loanBalance')}</p>
          <p className="text-lg font-bold text-gray-800 mt-1">{t('ksh')} {currentUser.loanBalance.toLocaleString()}</p>
          <p className="text-xs text-orange-600 font-medium">{loans.filter(l => l.memberId === currentUser.id && l.status === 'repaying').length} active</p>
        </div>
      </div>

      {/* Group Health */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold text-gray-800">{t('groupHealth')}</h3>
          <span className="text-2xl font-bold text-emerald-600">{groupInfo.healthScore}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div className="bg-emerald-500 h-2.5 rounded-full" style={{ width: `${groupInfo.healthScore}%` }}></div>
        </div>
        <div className="flex justify-between mt-3 text-xs text-gray-500">
          <span>{t('totalAssets')}: {t('ksh')} {(groupInfo.totalAssets / 1000000).toFixed(1)}M</span>
          <span>{t('defaultRate')}: {groupInfo.defaultRate}%</span>
        </div>
      </div>

      {/* Current Rotation */}
      {nextPayout && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">🔄</span>
            <h3 className="font-semibold text-amber-800 text-sm">{t('rotationSchedule')}</h3>
          </div>
          <p className="text-sm text-amber-700">
            <span className="font-medium">{nextPayout.memberName}</span> — {t('yourTurn') === 'Your Turn' ? 'Current payout' : 'Zamu ya sasa'}
          </p>
          <p className="text-xs text-amber-600 mt-1">{t('ksh')} {nextPayout.amount.toLocaleString()} • {nextPayout.scheduledDate}</p>
        </div>
      )}

      {/* Recent Activity */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold text-gray-800">{t('contributionHistory')}</h3>
          <button onClick={() => setPage('contributions')} className="text-emerald-600 text-sm font-medium">{t('viewAll')}</button>
        </div>
        <div className="space-y-3">
          {recentContributions.map((c) => (
            <div key={c.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                  c.status === 'paid' ? 'bg-emerald-100 text-emerald-700' :
                  c.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {c.status === 'paid' ? '✓' : c.status === 'pending' ? '⏳' : '!'}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">{t('ksh')} {c.amount.toLocaleString()}</p>
                  <p className="text-xs text-gray-400">{c.date} • {c.method || t('pending')}</p>
                </div>
              </div>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                c.status === 'paid' ? 'bg-emerald-100 text-emerald-700' :
                c.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {t(c.status)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-3">
        <button onClick={() => setPage('loans')} className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 flex flex-col items-center gap-1">
          <span className="text-2xl">💳</span>
          <span className="text-xs text-gray-600 font-medium">{t('loans')}</span>
        </button>
        <button onClick={() => setPage('meetings')} className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 flex flex-col items-center gap-1">
          <span className="text-2xl">📅</span>
          <span className="text-xs text-gray-600 font-medium">{t('meetings')}</span>
        </button>
        <button onClick={() => setPage('chat')} className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 flex flex-col items-center gap-1">
          <span className="text-2xl">💬</span>
          <span className="text-xs text-gray-600 font-medium">{t('chat')}</span>
        </button>
      </div>

      {/* M-Pesa Info */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xs">M</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-green-800">M-Pesa Paybill</p>
            <p className="text-xs text-green-600">{groupInfo.paybill} / Acc: {groupInfo.account}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
