import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { loans } from '../data/mockData';

export default function LoansPage() {
  const { setPage } = useApp();
  const { t } = useLanguage();
  const [tab, setTab] = useState<'my' | 'all'>('my');

  const myLoans = loans.filter(l => l.memberId === 'm1');
  const allLoans = tab === 'my' ? myLoans : loans;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'approved': case 'disbursed': return 'bg-blue-100 text-blue-700';
      case 'repaying': return 'bg-orange-100 text-orange-700';
      case 'completed': return 'bg-emerald-100 text-emerald-700';
      case 'rejected': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="p-4 space-y-4">
      {/* Loan Summary */}
      <div className="bg-gradient-to-r from-purple-700 to-indigo-700 rounded-2xl p-5 text-white shadow-lg">
        <p className="text-purple-200 text-xs font-medium uppercase">{t('loanBalance')}</p>
        <p className="text-3xl font-bold mt-1">{t('ksh')} 25,000</p>
        <p className="text-purple-200 text-sm mt-1">{t('monthlyRepayment')}: {t('ksh')} 9,167/mo</p>
        <button
          onClick={() => setPage('apply-loan')}
          className="mt-4 bg-white text-purple-800 px-6 py-2.5 rounded-xl font-semibold text-sm shadow"
        >
          + {t('applyLoan')}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setTab('my')}
          className={`flex-1 py-2.5 rounded-xl text-sm font-medium ${tab === 'my' ? 'bg-emerald-700 text-white' : 'bg-white text-gray-600 border border-gray-200'}`}
        >
          My Loans
        </button>
        <button
          onClick={() => setTab('all')}
          className={`flex-1 py-2.5 rounded-xl text-sm font-medium ${tab === 'all' ? 'bg-emerald-700 text-white' : 'bg-white text-gray-600 border border-gray-200'}`}
        >
          All Loans
        </button>
      </div>

      {/* Loan List */}
      <div className="space-y-3">
        {allLoans.map((loan) => (
          <div key={loan.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="font-semibold text-gray-800">{loan.memberName}</p>
                <p className="text-xs text-gray-500">{loan.purpose}</p>
              </div>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(loan.status)}`}>
                {t(loan.status)}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-3">
              <div className="text-center">
                <p className="text-xs text-gray-500">{t('amount')}</p>
                <p className="font-bold text-sm">{t('ksh')} {(loan.amount / 1000).toFixed(0)}K</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500">{t('interestRate')}</p>
                <p className="font-bold text-sm">{loan.interestRate}%</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500">{t('repaymentPeriod')}</p>
                <p className="font-bold text-sm">{loan.repaymentPeriod}mo</p>
              </div>
            </div>
            {loan.status === 'repaying' && (
              <div className="mt-3">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Repaid: {t('ksh')} {(loan.amount - loan.balance).toLocaleString()}</span>
                  <span>{Math.round(((loan.amount - loan.balance) / loan.amount) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${((loan.amount - loan.balance) / loan.amount) * 100}%` }}></div>
                </div>
              </div>
            )}
            {loan.guarantors.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1">
                {loan.guarantors.map((g, i) => (
                  <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">👤 {g}</span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Pending Approval */}
      {loans.filter(l => l.status === 'pending').length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <h3 className="font-semibold text-yellow-800 text-sm mb-2">⏳ {t('pendingRequests')}</h3>
          {loans.filter(l => l.status === 'pending').map(loan => (
            <div key={loan.id} className="flex justify-between items-center py-2 border-t border-yellow-200">
              <div>
                <p className="text-sm font-medium">{loan.memberName}</p>
                <p className="text-xs text-yellow-700">{t('ksh')} {loan.amount.toLocaleString()} • {loan.purpose}</p>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-emerald-600 text-white text-xs rounded-lg font-medium">✓</button>
                <button className="px-3 py-1 bg-red-600 text-white text-xs rounded-lg font-medium">✗</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
