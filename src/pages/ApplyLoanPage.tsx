import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { members, currentUser } from '../data/mockData';

export default function ApplyLoanPage() {
  const { setPage } = useApp();
  const { t } = useLanguage();
  const [amount, setAmount] = useState('');
  const [purpose, setPurpose] = useState('');
  const [period, setPeriod] = useState('6');
  const [guarantors, setGuarantors] = useState<string[]>([]);
  const [step, setStep] = useState<'form' | 'review' | 'success'>('form');

  const maxLoan = currentUser.totalContributed * 3;
  const interestRate = 10;
  const monthlyPayment = amount ? (parseInt(amount) * (1 + interestRate / 100)) / parseInt(period) : 0;

  const toggleGuarantor = (name: string) => {
    setGuarantors(prev => prev.includes(name) ? prev.filter(g => g !== name) : [...prev, name]);
  };

  if (step === 'success') {
    return (
      <div className="p-6 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-4">
          <span className="text-4xl">📋</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Loan Application Submitted!</h2>
        <p className="text-gray-500 text-center mt-2">
          Your loan request of {t('ksh')} {parseInt(amount).toLocaleString()} has been sent for group approval.
        </p>
        <p className="text-sm text-gray-400 mt-1">You'll be notified once the group votes on your request.</p>
        <button
          onClick={() => setPage('loans')}
          className="mt-6 bg-emerald-700 text-white px-8 py-3 rounded-xl font-semibold"
        >
          {t('back')} to {t('loans')}
        </button>
      </div>
    );
  }

  if (step === 'review') {
    return (
      <div className="p-4 space-y-4">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Review Application</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-500">{t('loanAmount')}</span>
              <span className="font-bold text-emerald-700">{t('ksh')} {parseInt(amount).toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-500">{t('loanPurpose')}</span>
              <span className="font-medium">{purpose}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-500">{t('interestRate')}</span>
              <span className="font-medium">{interestRate}% flat</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-500">{t('repaymentPeriod')}</span>
              <span className="font-medium">{period} months</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-500">{t('monthlyRepayment')}</span>
              <span className="font-bold">{t('ksh')} {Math.round(monthlyPayment).toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-500">Total Repayment</span>
              <span className="font-bold">{t('ksh')} {Math.round(monthlyPayment * parseInt(period)).toLocaleString()}</span>
            </div>
            <div className="py-2">
              <span className="text-gray-500 block mb-2">{t('guarantors')}</span>
              <div className="flex flex-wrap gap-1">
                {guarantors.map(g => (
                  <span key={g} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">👤 {g}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => setStep('success')}
          className="w-full bg-emerald-700 text-white py-4 rounded-xl font-semibold text-lg shadow-lg"
        >
          ✅ {t('submit')} Application
        </button>
        <button
          onClick={() => setStep('form')}
          className="w-full text-gray-500 py-2 text-sm"
        >
          ← {t('back')} to edit
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      {/* Loan Calculator */}
      <div className="bg-gradient-to-r from-purple-700 to-indigo-700 rounded-2xl p-5 text-white shadow-lg">
        <h3 className="font-bold">{t('applyLoan')}</h3>
        <p className="text-purple-200 text-sm mt-1">Max: {t('multiplier')} 3x = {t('ksh')} {maxLoan.toLocaleString()}</p>
        {amount && parseInt(amount) > 0 && (
          <div className="mt-3 bg-white/10 rounded-xl p-3">
            <p className="text-xs text-purple-200">{t('monthlyRepayment')}</p>
            <p className="text-xl font-bold">{t('ksh')} {Math.round(monthlyPayment).toLocaleString()}/mo</p>
          </div>
        )}
      </div>

      {/* Form */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t('loanAmount')} ({t('ksh')})</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="e.g. 50000"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-lg font-bold focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
          <div className="flex gap-2 mt-2">
            {[30000, 50000, 100000].map(amt => (
              <button
                key={amt}
                onClick={() => setAmount(amt.toString())}
                className="flex-1 py-1.5 bg-gray-100 rounded-lg text-xs font-medium text-gray-700"
              >
                {t('ksh')} {(amt / 1000).toFixed(0)}K
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t('loanPurpose')}</label>
          <select
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          >
            <option value="">Select purpose...</option>
            <option value="School Fees">School Fees</option>
            <option value="Business Capital">Business Capital</option>
            <option value="Medical Bills">Medical Bills</option>
            <option value="Home Renovation">Home Renovation</option>
            <option value="Agriculture">Agriculture</option>
            <option value="Emergency">Emergency</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t('repaymentPeriod')}</label>
          <div className="grid grid-cols-4 gap-2">
            {['3', '6', '9', '12'].map(m => (
              <button
                key={m}
                onClick={() => setPeriod(m)}
                className={`py-2.5 rounded-xl text-sm font-medium ${
                  period === m ? 'bg-emerald-700 text-white' : 'bg-gray-100 text-gray-700'
                }`}
              >
                {m} mo
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">{t('guarantors')} (min 1)</label>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {members.filter(m => m.id !== 'm1').slice(0, 6).map(member => (
              <button
                key={member.id}
                onClick={() => toggleGuarantor(member.name)}
                className={`w-full flex items-center gap-3 p-2.5 rounded-xl text-left ${
                  guarantors.includes(member.name) ? 'bg-emerald-50 border-2 border-emerald-500' : 'bg-gray-50 border border-gray-200'
                }`}
              >
                <div className={`w-5 h-5 rounded flex items-center justify-center ${
                  guarantors.includes(member.name) ? 'bg-emerald-600' : 'bg-gray-300'
                }`}>
                  {guarantors.includes(member.name) && <span className="text-white text-xs">✓</span>}
                </div>
                <span className="text-sm font-medium">{member.name}</span>
                <span className="text-xs text-gray-400 ml-auto">{t('ksh')} {(member.totalContributed / 1000).toFixed(0)}K saved</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={() => setStep('review')}
        disabled={!amount || !purpose || guarantors.length === 0}
        className="w-full bg-emerald-700 text-white py-4 rounded-xl font-semibold text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {t('next')} — Review Application
      </button>
    </div>
  );
}
