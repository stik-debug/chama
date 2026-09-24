import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { members } from '../data/mockData';

export default function MembersPage() {
  const { t } = useLanguage();

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'chairperson': return { label: t('chairperson'), color: 'bg-amber-100 text-amber-700' };
      case 'treasurer': return { label: t('treasurer'), color: 'bg-blue-100 text-blue-700' };
      case 'secretary': return { label: t('secretary'), color: 'bg-purple-100 text-purple-700' };
      default: return { label: t('member'), color: 'bg-gray-100 text-gray-600' };
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-gray-800">{t('members')}</h3>
          <span className="text-sm text-gray-500">{members.length} {t('members').toLowerCase()}</span>
        </div>
      </div>

      <div className="space-y-2">
        {members.map((member) => {
          const role = getRoleBadge(member.role);
          return (
            <div key={member.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <span className="text-emerald-700 font-bold text-lg">{member.name.charAt(0)}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-gray-800 truncate">{member.name}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${role.color}`}>{role.label}</span>
                  </div>
                  <p className="text-xs text-gray-500">{member.phone}</p>
                  <div className="flex gap-4 mt-1">
                    <span className="text-xs text-gray-500">💰 {t('ksh')} {(member.totalContributed / 1000).toFixed(0)}K</span>
                    {member.loanBalance > 0 && (
                      <span className="text-xs text-orange-600">📊 {t('ksh')} {(member.loanBalance / 1000).toFixed(0)}K loan</span>
                    )}
                    <span className="text-xs text-gray-500">#{member.payoutPosition}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
