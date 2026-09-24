import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { chatMessages } from '../data/mockData';

export default function ChatPage() {
  const { t } = useLanguage();
  const [message, setMessage] = useState('');

  return (
    <div className="flex flex-col h-full">
      {/* Chat Messages */}
      <div className="flex-1 p-4 space-y-3 overflow-y-auto">
        {chatMessages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.senderId === 'm1' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
              msg.isAnnouncement ? 'bg-amber-100 border border-amber-200 w-full' :
              msg.senderId === 'm1' ? 'bg-emerald-700 text-white' : 'bg-white border border-gray-200'
            }`}>
              {msg.isAnnouncement && (
                <div className="flex items-center gap-1 mb-1">
                  <span className="text-xs">📢</span>
                  <span className="text-xs font-semibold text-amber-700">{t('announcements')}</span>
                </div>
              )}
              {!msg.isAnnouncement && msg.senderId !== 'm1' && (
                <p className="text-xs font-semibold text-emerald-700 mb-0.5">{msg.senderName}</p>
              )}
              <p className={`text-sm ${msg.isAnnouncement ? 'text-amber-800' : msg.senderId === 'm1' ? 'text-white' : 'text-gray-800'}`}>
                {msg.message}
              </p>
              <p className={`text-xs mt-1 ${
                msg.isAnnouncement ? 'text-amber-600' :
                msg.senderId === 'm1' ? 'text-emerald-200' : 'text-gray-400'
              }`}>
                {msg.timestamp.split(' ')[1]}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="p-3 bg-white border-t border-gray-200">
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={t('typeMessage')}
            className="flex-1 px-4 py-2.5 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button className="w-10 h-10 bg-emerald-700 rounded-full flex items-center justify-center text-white shadow">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
