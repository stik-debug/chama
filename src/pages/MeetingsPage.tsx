import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { meetings } from '../data/mockData';

export default function MeetingsPage() {
  const { t } = useLanguage();

  return (
    <div className="p-4 space-y-4">
      <button className="w-full bg-emerald-700 text-white py-3 rounded-xl font-semibold shadow-lg flex items-center justify-center gap-2">
        <span>📅</span> {t('scheduleMeeting')}
      </button>

      <div className="space-y-3">
        {meetings.map((meeting) => (
          <div key={meeting.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-gray-800">{meeting.title}</h3>
                <p className="text-sm text-gray-500 mt-1">📅 {meeting.date} • 🕐 {meeting.time}</p>
                <p className="text-sm text-gray-500">📍 {meeting.location}</p>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                meeting.attendees > 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'
              }`}>
                {meeting.attendees}/{15}
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-3 bg-gray-50 p-2 rounded-lg">{meeting.notes}</p>
            
            {meeting.votes && meeting.votes.length > 0 && (
              <div className="mt-3 border-t pt-3">
                <p className="text-xs font-medium text-gray-500 mb-2">{t('voting')}</p>
                {meeting.votes.map((vote) => (
                  <div key={vote.id} className="bg-gray-50 rounded-lg p-3">
                    <p className="text-sm font-medium text-gray-700 mb-2">{vote.question}</p>
                    <div className="flex gap-2 mb-2">
                      <div className="flex-1 text-center bg-emerald-100 rounded-lg py-1">
                        <span className="text-sm font-bold text-emerald-700">{vote.yes}</span>
                        <span className="text-xs text-emerald-600 ml-1">{t('yes')}</span>
                      </div>
                      <div className="flex-1 text-center bg-red-100 rounded-lg py-1">
                        <span className="text-sm font-bold text-red-700">{vote.no}</span>
                        <span className="text-xs text-red-600 ml-1">{t('no')}</span>
                      </div>
                      <div className="flex-1 text-center bg-gray-200 rounded-lg py-1">
                        <span className="text-sm font-bold text-gray-700">{vote.abstain}</span>
                        <span className="text-xs text-gray-600 ml-1">—</span>
                      </div>
                    </div>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      vote.status === 'passed' ? 'bg-emerald-100 text-emerald-700' :
                      vote.status === 'failed' ? 'bg-red-100 text-red-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {t(vote.status)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
