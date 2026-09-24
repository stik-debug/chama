import React, { useState } from 'react';
import { AppProvider, useApp } from './context';
import { 
  currentUser, groupInfo, members, contributions, loans, meetings, 
  payoutRotation, chatMessages, fines, auditTrail 
} from './data/mockData';
import { 
  Home, Wallet, Users, Calendar, MessageCircle, BarChart3, Settings, 
  Menu, Bell, ArrowLeft, Check, X, ChevronRight, Send, Download,
  CreditCard, TrendingUp, Shield, Globe, LogOut, Phone, Lock,
  FileText, AlertCircle, CheckCircle2, Clock, DollarSign, UserCheck,
  Vote, MapPin, Star, Award, Target, Zap
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, AreaChart, Area } from 'recharts';

// ==================== SHARED COMPONENTS ====================
function Toast() {
  const { toast } = useApp();
  if (!toast) return null;
  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-slide-down">
      <div className="bg-emerald-900 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2">
        <CheckCircle2 className="w-5 h-5" />
        <span className="font-medium">{toast}</span>
      </div>
    </div>
  );
}

function TopBar({ title, showBack = false }: { title: string; showBack?: boolean }) {
  const { setPage, user, currentPage } = useApp();
  
  return (
    <header className="bg-emerald-900 text-white px-4 py-4 sticky top-0 z-40 shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {showBack && (
            <button onClick={() => setPage('dashboard')} className="p-1 -ml-1">
              <ArrowLeft className="w-6 h-6" />
            </button>
          )}
          <div>
            <h1 className="text-xl font-bold">{title}</h1>
            {currentPage === 'dashboard' && user && (
              <p className="text-emerald-200 text-xs mt-0.5">{user.name}</p>
            )}
          </div>
        </div>
        {currentPage === 'dashboard' && (
          <button onClick={() => setPage('notifications')} className="relative p-2">
            <Bell className="w-6 h-6" />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-emerald-900"></span>
          </button>
        )}
      </div>
    </header>
  );
}

function BottomNav() {
  const { currentPage, setPage, t } = useApp();
  
  const items = [
    { id: 'dashboard', icon: Home, label: t('home') },
    { id: 'contributions', icon: Wallet, label: t('contributions') },
    { id: 'loans', icon: CreditCard, label: t('loans') },
    { id: 'meetings', icon: Calendar, label: t('meetings') },
    { id: 'more', icon: Menu, label: t('more') },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 safe-bottom">
      <div className="max-w-md mx-auto flex justify-around items-center py-2">
        {items.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => setPage(id as any)}
            className={`flex flex-col items-center gap-1 px-3 py-2 min-w-0 ${
              currentPage === id ? 'text-emerald-700' : 'text-gray-500'
            }`}
          >
            <Icon className="w-6 h-6" />
            <span className="text-xs font-medium truncate">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}

// ==================== PAGES ====================
function SplashPage() {
  const { setPage } = useApp();
  
  setTimeout(() => setPage('onboarding'), 2000);
  
  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center">
      <div className="text-center animate-scale-in">
        <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
          <Users className="w-14 h-14 text-emerald-700" />
        </div>
        <h1 className="text-4xl font-black text-white mb-2">ChamaConnect</h1>
        <p className="text-emerald-200 text-lg font-medium">Pamoja Tunaweza</p>
      </div>
    </div>
  );
}

function OnboardingPage() {
  const { setPage, t } = useApp();
  const [step, setStep] = useState(0);
  
  const slides = [
    { icon: Users, title: t('onboarding1Title'), desc: t('onboarding1Desc'), color: 'bg-emerald-100 text-emerald-700' },
    { icon: CreditCard, title: t('onboarding2Title'), desc: t('onboarding2Desc'), color: 'bg-green-100 text-green-700' },
    { icon: DollarSign, title: t('onboarding3Title'), desc: t('onboarding3Desc'), color: 'bg-amber-100 text-amber-700' },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center max-w-sm animate-fade-in" key={step}>
          <div className={`w-32 h-32 ${slides[step].color} rounded-full flex items-center justify-center mx-auto mb-8`}>
            {React.createElement(slides[step].icon, { className: 'w-16 h-16' })}
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{slides[step].title}</h2>
          <p className="text-gray-600 text-lg">{slides[step].desc}</p>
        </div>
      </div>
      
      <div className="p-6 pb-8">
        <div className="flex gap-2 justify-center mb-6">
          {slides.map((_, i) => (
            <div key={i} className={`h-2 rounded-full transition-all ${i === step ? 'w-8 bg-emerald-700' : 'w-2 bg-gray-300'}`} />
          ))}
        </div>
        
        {step < slides.length - 1 ? (
          <div className="flex gap-3">
            <button onClick={() => setPage('login')} className="flex-1 py-4 text-gray-600 font-semibold">{t('skip')}</button>
            <button onClick={() => setStep(step + 1)} className="flex-1 btn btn-primary">{t('next')}</button>
          </div>
        ) : (
          <button onClick={() => setPage('login')} className="w-full btn btn-primary text-lg py-4">{t('getStarted')}</button>
        )}
      </div>
    </div>
  );
}

function LoginPage() {
  const { login, setPage, t } = useApp();
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');

  return (
    <div className="min-h-screen gradient-hero flex flex-col">
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8 animate-fade-in">
            <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl">
              <Users className="w-12 h-12 text-emerald-700" />
            </div>
            <h1 className="text-3xl font-black text-white mb-2">ChamaConnect</h1>
            <p className="text-emerald-200">{t('welcomeBack')}</p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-2xl animate-slide-up">
            {step === 'phone' ? (
              <>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('login')}</h2>
                <p className="text-gray-600 mb-6">{t('enterPhone')}</p>
                
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">{t('phone')}</label>
                  <div className="flex">
                    <span className="inline-flex items-center px-4 bg-gray-100 border border-r-0 border-gray-300 rounded-l-xl text-gray-600 font-medium">+254</span>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="712 345 678"
                      className="flex-1 px-4 py-4 border border-gray-300 rounded-r-xl text-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>
                </div>

                <button onClick={() => setStep('otp')} className="w-full btn btn-primary text-lg py-4 mb-4">
                  {t('continue')}
                </button>

                <p className="text-center text-sm text-gray-600">
                  {t('noAccount')}{' '}
                  <button onClick={() => setPage('register')} className="text-emerald-700 font-semibold">{t('register')}</button>
                </p>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('verifyOtp')}</h2>
                <p className="text-gray-600 mb-6">{t('enterOtp')} +254{phone}</p>
                
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="• • • •"
                  maxLength={4}
                  className="w-full px-4 py-5 border-2 border-gray-300 rounded-xl text-center text-3xl tracking-widest font-bold focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 mb-2"
                />
                <p className="text-xs text-gray-400 text-center mb-6">{t('demoNote')}</p>

                <button onClick={() => { login(); setPage('dashboard'); }} className="w-full btn btn-primary text-lg py-4 mb-3">
                  {t('login')}
                </button>

                <button onClick={() => setStep('phone')} className="w-full text-emerald-700 font-semibold text-sm">
                  ← {t('back')}
                </button>
              </>
            )}
          </div>

          <div className="mt-6 flex items-center justify-center gap-4 text-emerald-200 text-xs">
            <span className="flex items-center gap-1"><Shield className="w-4 h-4" /> SASRA</span>
            <span className="flex items-center gap-1"><Lock className="w-4 h-4" /> Encrypted</span>
            <span className="flex items-center gap-1"><Star className="w-4 h-4" /> M-Pesa</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardPage() {
  const { setPage, t, user } = useApp();
  
  const myPayout = payoutRotation.find(p => p.memberId === currentUser.id);
  const recentContribs = contributions.filter(c => c.memberId === currentUser.id).slice(0, 3);
  
  const chartData = [
    { month: 'Sep', amount: 100000 },
    { month: 'Oct', amount: 125000 },
    { month: 'Nov', amount: 130000 },
    { month: 'Dec', amount: 135000 },
    { month: 'Jan', amount: 140000 },
    { month: 'Feb', amount: 145000 },
  ];

  return (
    <div className="pb-20">
      <TopBar title="ChamaConnect" />
      
      <div className="p-4 space-y-4">
        {/* Hero Card */}
        <div className="gradient-primary rounded-3xl p-6 text-white shadow-xl animate-slide-up">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-emerald-200 text-sm font-medium mb-1">{t('totalSaved')}</p>
              <p className="text-4xl font-black">{t('ksh')} {currentUser.totalContributed.toLocaleString()}</p>
              <p className="text-emerald-200 text-sm mt-2">{groupInfo.name}</p>
            </div>
            <div className="bg-white/20 rounded-2xl p-3">
              <TrendingUp className="w-8 h-8" />
            </div>
          </div>
          
          <div className="flex gap-3">
            <button onClick={() => setPage('contribute')} className="flex-1 bg-white text-emerald-800 py-3 rounded-xl font-bold shadow-lg">
              💰 {t('contribute')}
            </button>
            <button onClick={() => setPage('rotation')} className="flex-1 bg-emerald-800 text-white py-3 rounded-xl font-bold border-2 border-emerald-600">
              🔄 {t('mgo')}
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="card p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                <Calendar className="w-5 h-5 text-emerald-700" />
              </div>
            </div>
            <p className="text-xs text-gray-500 font-medium">{t('nextPayout')}</p>
            <p className="text-xl font-bold text-gray-900 mt-1">{myPayout?.scheduledDate || 'Mar 15'}</p>
            <p className="text-xs text-emerald-600 font-semibold mt-1">#{currentUser.payoutPosition} {t('position')}</p>
          </div>
          
          <div className="card p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-orange-700" />
              </div>
            </div>
            <p className="text-xs text-gray-500 font-medium">{t('loanBalance')}</p>
            <p className="text-xl font-bold text-gray-900 mt-1">{t('ksh')} {currentUser.loanBalance.toLocaleString()}</p>
            <p className="text-xs text-orange-600 font-semibold mt-1">{loans.filter(l => l.memberId === currentUser.id && l.status === 'repaying').length} active</p>
          </div>
        </div>

        {/* Group Health */}
        <div className="card p-5">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-gray-900">{t('groupHealth')}</h3>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-600" />
              <span className="text-2xl font-black text-emerald-600">{groupInfo.healthScore}%</span>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
            <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-3 rounded-full transition-all" style={{ width: `${groupInfo.healthScore}%` }}></div>
          </div>
          <div className="flex justify-between text-xs text-gray-600">
            <span>{t('totalAssets')}: {t('ksh')} {(groupInfo.totalAssets / 1000000).toFixed(1)}M</span>
            <span>{t('defaultRate')}: {groupInfo.defaultRate}%</span>
          </div>
        </div>

        {/* Savings Chart */}
        <div className="card p-5">
          <h3 className="font-bold text-gray-900 mb-4">{t('totalSaved')} - {t('thisMonth')}</h3>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#059669" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#059669" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                <YAxis hide />
                <Area type="monotone" dataKey="amount" stroke="#059669" strokeWidth={2} fillOpacity={1} fill="url(#colorAmount)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Current Rotation */}
        {payoutRotation.find(p => p.status === 'current') && (
          <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-5 h-5 text-amber-600" />
              <h3 className="font-bold text-amber-900">{t('rotation')}</h3>
            </div>
            <p className="text-sm text-amber-800">
              <span className="font-bold">{payoutRotation.find(p => p.status === 'current')?.memberName}</span>
            </p>
            <p className="text-xs text-amber-700 mt-1">
              {t('ksh')} {payoutRotation.find(p => p.status === 'current')?.amount.toLocaleString()} • {payoutRotation.find(p => p.status === 'current')?.scheduledDate}
            </p>
          </div>
        )}

        {/* Recent Activity */}
        <div className="card p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-900">{t('recentActivity')}</h3>
            <button onClick={() => setPage('contributions')} className="text-emerald-700 text-sm font-semibold">{t('seeAll')}</button>
          </div>
          <div className="space-y-3">
            {recentContribs.map((c) => (
              <div key={c.id} className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    c.status === 'paid' ? 'bg-emerald-100' : c.status === 'pending' ? 'bg-yellow-100' : 'bg-red-100'
                  }`}>
                    {c.status === 'paid' ? <Check className="w-5 h-5 text-emerald-700" /> : 
                     c.status === 'pending' ? <Clock className="w-5 h-5 text-yellow-700" /> :
                     <AlertCircle className="w-5 h-5 text-red-700" />}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{t('ksh')} {c.amount.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">{c.date}</p>
                  </div>
                </div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
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
          {[
            { icon: CreditCard, label: t('loans'), page: 'loans', color: 'bg-purple-100 text-purple-700' },
            { icon: Calendar, label: t('meetings'), page: 'meetings', color: 'bg-blue-100 text-blue-700' },
            { icon: MessageCircle, label: t('chat'), page: 'chat', color: 'bg-pink-100 text-pink-700' },
          ].map(({ icon: Icon, label, page, color }) => (
            <button key={page} onClick={() => setPage(page as any)} className="card p-4 flex flex-col items-center gap-2">
              <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center`}>
                <Icon className="w-6 h-6" />
              </div>
              <span className="text-xs font-semibold text-gray-700">{label}</span>
            </button>
          ))}
        </div>

        {/* M-Pesa Info */}
        <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-black text-lg">M</span>
            </div>
            <div className="flex-1">
              <p className="font-bold text-green-900">M-Pesa Paybill</p>
              <p className="text-sm text-green-700">{groupInfo.paybill} / {groupInfo.account}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Continue with more pages...
function ContributionsPage() {
  const { setPage, t, showToast } = useApp();
  const [filter, setFilter] = useState<'all' | 'paid' | 'pending' | 'late'>('all');
  
  const filtered = filter === 'all' ? contributions : contributions.filter(c => c.status === filter);

  return (
    <div className="pb-20">
      <TopBar title={t('contributions')} showBack />
      <div className="p-4 space-y-4">
        <div className="card p-4">
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: t('paid'), count: contributions.filter(c => c.status === 'paid').length, color: 'bg-emerald-50 text-emerald-700' },
              { label: t('pending'), count: contributions.filter(c => c.status === 'pending').length, color: 'bg-yellow-50 text-yellow-700' },
              { label: t('late'), count: contributions.filter(c => c.status === 'late').length, color: 'bg-red-50 text-red-700' },
            ].map(({ label, count, color }) => (
              <div key={label} className={`text-center p-3 ${color} rounded-xl`}>
                <p className="text-2xl font-black">{count}</p>
                <p className="text-xs font-semibold">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {(['all', 'paid', 'pending', 'late'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap ${
                filter === f ? 'bg-emerald-700 text-white' : 'bg-white text-gray-600 border-2 border-gray-200'
              }`}
            >
              {f === 'all' ? 'All' : t(f)}
            </button>
          ))}
        </div>

        <div className="space-y-2">
          {filtered.map((c) => (
            <div key={c.id} className="card p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  c.status === 'paid' ? 'bg-emerald-100' : c.status === 'pending' ? 'bg-yellow-100' : 'bg-red-100'
                }`}>
                  {c.status === 'paid' ? <Check className="w-6 h-6 text-emerald-700" /> : 
                   c.status === 'pending' ? <Clock className="w-6 h-6 text-yellow-700" /> :
                   <AlertCircle className="w-6 h-6 text-red-700" />}
                </div>
                <div>
                  <p className="font-bold text-gray-900">{c.memberName}</p>
                  <p className="text-xs text-gray-500">{c.date} • {c.method || '—'}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-black text-gray-900">{t('ksh')} {c.amount.toLocaleString()}</p>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
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

        <button
          onClick={() => setPage('contribute')}
          className="w-full btn btn-primary text-lg py-4 shadow-lg"
        >
          💰 {t('contribute')} — {t('ksh')} {groupInfo.contributionAmount.toLocaleString()}
        </button>
      </div>
    </div>
  );
}

// Simplified remaining pages for brevity
function ContributePage() {
  const { setPage, t, showToast } = useApp();
  const [amount, setAmount] = useState(groupInfo.contributionAmount.toString());
  const [step, setStep] = useState<'amount' | 'processing' | 'success'>('amount');

  if (step === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center animate-scale-in">
          <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-14 h-14 text-emerald-600" />
          </div>
          <h2 className="text-3xl font-black text-gray-900 mb-2">{t('contributionReceived')}</h2>
          <p className="text-gray-600 mb-2">{t('ksh')} {parseInt(amount).toLocaleString()} via M-Pesa</p>
          <p className="text-sm text-gray-400 mb-6">Ref: SDG8X2K4L5</p>
          <button onClick={() => setPage('dashboard')} className="btn btn-primary px-8">{t('done')}</button>
        </div>
      </div>
    );
  }

  if (step === 'processing') {
    setTimeout(() => setStep('success'), 2500);
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-700 rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">{t('stkPushSent')}</h2>
          <p className="text-gray-600">{t('enterMpesaPin')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-20">
      <TopBar title={t('contribute')} showBack />
      <div className="p-4 space-y-4">
        <div className="card p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('amount')}</h2>
          <div className="relative mb-4">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-lg">{t('ksh')}</span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full pl-16 pr-4 py-5 border-2 border-gray-200 rounded-2xl text-3xl font-black focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
          <div className="grid grid-cols-3 gap-2 mb-6">
            {[5000, 10000, 15000].map((amt) => (
              <button
                key={amt}
                onClick={() => setAmount(amt.toString())}
                className={`py-3 rounded-xl font-bold ${
                  amount === amt.toString() ? 'bg-emerald-700 text-white' : 'bg-gray-100 text-gray-700'
                }`}
              >
                {t('ksh')} {amt.toLocaleString()}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => setStep('processing')}
          className="w-full btn btn-primary text-lg py-4 shadow-lg"
        >
          💰 {t('payViaMpesa')}
        </button>
      </div>
    </div>
  );
}

function MorePage() {
  const { setPage, t } = useApp();
  
  const menuItems = [
    { icon: Users, label: t('members'), page: 'members', color: 'bg-blue-100 text-blue-700' },
    { icon: TrendingUp, label: t('mgo'), page: 'rotation', color: 'bg-purple-100 text-purple-700' },
    { icon: MessageCircle, label: t('chat'), page: 'chat', color: 'bg-pink-100 text-pink-700' },
    { icon: BarChart3, label: t('reports'), page: 'reports', color: 'bg-indigo-100 text-indigo-700' },
    { icon: AlertCircle, label: t('fines'), page: 'fines', color: 'bg-red-100 text-red-700' },
    { icon: FileText, label: t('auditTrail'), page: 'audit', color: 'bg-gray-100 text-gray-700' },
    { icon: Settings, label: t('settings'), page: 'settings', color: 'bg-gray-100 text-gray-700' },
  ];

  return (
    <div className="pb-20">
      <TopBar title={t('more')} />
      <div className="p-4 space-y-4">
        <div className="gradient-primary rounded-3xl p-6 text-white">
          <p className="text-emerald-200 text-sm">{groupInfo.name}</p>
          <p className="text-3xl font-black mt-1">{members.length} {t('members')}</p>
          <p className="text-emerald-200 text-sm mt-1">{t('ksh')} {(groupInfo.totalAssets / 1000000).toFixed(2)}M {t('totalAssets')}</p>
        </div>

        <div className="card overflow-hidden">
          {menuItems.map(({ icon: Icon, label, page, color }, i) => (
            <button
              key={page}
              onClick={() => setPage(page as any)}
              className={`w-full flex items-center gap-4 p-4 text-left hover:bg-gray-50 ${
                i < menuItems.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center`}>
                <Icon className="w-6 h-6" />
              </div>
              <span className="flex-1 font-semibold text-gray-900">{label}</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          ))}
        </div>

        <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Phone className="w-5 h-5 text-blue-700" />
            <h3 className="font-bold text-blue-900">USSD Access</h3>
          </div>
          <p className="text-sm text-blue-800">Dial <span className="font-bold">*384*22#</span> for feature phones</p>
        </div>
      </div>
    </div>
  );
}

// Placeholder pages
function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="pb-20">
      <TopBar title={title} showBack />
      <div className="p-4">
        <div className="card p-8 text-center">
          <p className="text-gray-500">Coming soon...</p>
        </div>
      </div>
    </div>
  );
}

// ==================== MAIN APP ====================
function AppContent() {
  const { isAuthenticated, currentPage } = useApp();

  if (!isAuthenticated) {
    if (currentPage === 'splash') return <SplashPage />;
    if (currentPage === 'onboarding') return <OnboardingPage />;
    if (currentPage === 'register') return <PlaceholderPage title="Register" />;
    return <LoginPage />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <DashboardPage />;
      case 'contributions': return <ContributionsPage />;
      case 'contribute': return <ContributePage />;
      case 'more': return <MorePage />;
      case 'loans': return <PlaceholderPage title="Loans" />;
      case 'meetings': return <PlaceholderPage title="Meetings" />;
      case 'members': return <PlaceholderPage title="Members" />;
      case 'rotation': return <PlaceholderPage title="Rotation" />;
      case 'chat': return <PlaceholderPage title="Chat" />;
      case 'reports': return <PlaceholderPage title="Reports" />;
      case 'settings': return <PlaceholderPage title="Settings" />;
      case 'fines': return <PlaceholderPage title="Fines" />;
      case 'audit': return <PlaceholderPage title="Audit Trail" />;
      case 'notifications': return <PlaceholderPage title="Notifications" />;
      default: return <DashboardPage />;
    }
  };

  const showNav = !['splash', 'onboarding', 'login', 'register', 'contribute'].includes(currentPage);

  return (
    <div className="min-h-screen bg-gray-50 max-w-md mx-auto relative">
      <Toast />
      {renderPage()}
      {showNav && <BottomNav />}
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
