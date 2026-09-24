import React, { useState, useEffect } from 'react';
import { db, initDatabase } from './data/db';
import { Member, Contribution, Loan, Meeting, ChatMessage } from './data/types';
import { translations, Language } from './data/translations';
import { 
  Home, Wallet, Users, Calendar, MessageCircle, BarChart3, Settings, 
  Menu, Bell, ArrowLeft, Check, ChevronRight, Send, Download,
  CreditCard, TrendingUp, Shield, Globe, LogOut, Phone, Lock,
  FileText, AlertCircle, CheckCircle2, Clock, DollarSign, UserCheck,
  Vote, MapPin, Star, Award, Target, Zap, X, Plus
} from 'lucide-react';
import { AreaChart, Area, XAxis, ResponsiveContainer } from 'recharts';

// Initialize database on load
initDatabase();

// ==================== CONTEXT ====================
type Page = 'login' | 'dashboard' | 'contributions' | 'loans' | 'meetings' | 'members' | 'rotation' | 'chat' | 'reports' | 'settings' | 'more' | 'fines' | 'contribute' | 'apply-loan' | 'audit' | 'notifications' | 'schedule-meeting';

interface AppContextType {
  user: Member | null;
  currentPage: Page;
  setPage: (page: Page) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  toast: string | null;
  showToast: (msg: string) => void;
  refreshData: () => void;
}

const AppContext = React.createContext<AppContextType | undefined>(undefined);

function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Member | null>(db.getCurrentUser());
  const [currentPage, setCurrentPage] = useState<Page>('login');
  const [language, setLanguage] = useState<Language>('en');
  const [toast, setToast] = useState<string | null>(null);
  const [, setRefresh] = useState(0);

  const t = (key: string): string => (translations[language] as Record<string, string>)[key] || key;
  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 3000); };
  const refreshData = () => setRefresh(r => r + 1);

  return (
    <AppContext.Provider value={{ user, currentPage, setPage: setCurrentPage, language, setLanguage, t, toast, showToast, refreshData }}>
      {children}
    </AppContext.Provider>
  );
}

function useApp() {
  const context = React.useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}

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
function LoginPage() {
  const { setPage, t, showToast } = useApp();
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');

  const handleLogin = () => {
    const members = db.getMembers();
    const user = members[0]; // Use first member as demo user
    db.setCurrentUser(user);
    db.setAuth(true);
    showToast(t('welcome') + ', ' + user.name.split(' ')[0] + '!');
    setPage('dashboard');
  };

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

                <button onClick={handleLogin} className="w-full btn btn-primary text-lg py-4 mb-3">
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
  const contributions = db.getContributions().filter(c => c.memberId === user?.id);
  const rotation = db.getRotation();
  const myPayout = rotation.find(p => p.memberId === user?.id);
  const group = db.getGroup();
  
  const chartData = [
    { month: 'Sep', amount: 100000 },
    { month: 'Oct', amount: 125000 },
    { month: 'Nov', amount: 130000 },
    { month: 'Dec', amount: 135000 },
    { month: 'Jan', amount: 140000 },
    { month: 'Feb', amount: user?.totalContributed || 145000 },
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
              <p className="text-4xl font-black">{t('ksh')} {(user?.totalContributed || 0).toLocaleString()}</p>
              <p className="text-emerald-200 text-sm mt-2">{group.name}</p>
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
            <p className="text-xs text-emerald-600 font-semibold mt-1">#{user?.payoutPosition || 4} {t('position')}</p>
          </div>
          
          <div className="card p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-orange-700" />
              </div>
            </div>
            <p className="text-xs text-gray-500 font-medium">{t('loanBalance')}</p>
            <p className="text-xl font-bold text-gray-900 mt-1">{t('ksh')} {(user?.loanBalance || 0).toLocaleString()}</p>
            <p className="text-xs text-orange-600 font-semibold mt-1">1 active</p>
          </div>
        </div>

        {/* Group Health */}
        <div className="card p-5">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-gray-900">{t('groupHealth')}</h3>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-600" />
              <span className="text-2xl font-black text-emerald-600">{group.healthScore}%</span>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
            <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-3 rounded-full transition-all" style={{ width: `${group.healthScore}%` }}></div>
          </div>
          <div className="flex justify-between text-xs text-gray-600">
            <span>{t('totalAssets')}: {t('ksh')} 2.25M</span>
            <span>{t('defaultRate')}: {group.defaultRate}%</span>
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
                <Area type="monotone" dataKey="amount" stroke="#059669" strokeWidth={2} fillOpacity={1} fill="url(#colorAmount)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-900">{t('recentActivity')}</h3>
            <button onClick={() => setPage('contributions')} className="text-emerald-700 text-sm font-semibold">{t('seeAll')}</button>
          </div>
          <div className="space-y-3">
            {contributions.slice(0, 3).map((c) => (
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
      </div>
    </div>
  );
}

// Continue with Contributions, Loans, Meetings, etc...
// Due to length, I'll create a condensed version with all key pages

function ContributionsPage() {
  const { setPage, t, user, showToast, refreshData } = useApp();
  const [filter, setFilter] = useState<'all' | 'paid' | 'pending' | 'late'>('all');
  const allContributions = db.getContributions();
  const contributions = filter === 'all' ? allContributions : allContributions.filter(c => c.status === filter);

  return (
    <div className="pb-20">
      <TopBar title={t('contributions')} showBack />
      <div className="p-4 space-y-4">
        <div className="card p-4">
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: t('paid'), count: allContributions.filter(c => c.status === 'paid').length, color: 'bg-emerald-50 text-emerald-700' },
              { label: t('pending'), count: allContributions.filter(c => c.status === 'pending').length, color: 'bg-yellow-50 text-yellow-700' },
              { label: t('late'), count: allContributions.filter(c => c.status === 'late').length, color: 'bg-red-50 text-red-700' },
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
          {contributions.map((c) => (
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
          💰 {t('contribute')} — {t('ksh')} 5,000
        </button>
      </div>
    </div>
  );
}

function ContributePage() {
  const { setPage, t, user, showToast, refreshData } = useApp();
  const [amount, setAmount] = useState('5000');
  const [step, setStep] = useState<'amount' | 'processing' | 'success'>('amount');

  const handleContribute = () => {
    setStep('processing');
    setTimeout(() => {
      // Add contribution to database
      db.addContribution({
        id: 'c' + Date.now(),
        memberId: user!.id,
        memberName: user!.name,
        amount: parseInt(amount),
        date: new Date().toISOString().slice(0, 10),
        status: 'paid',
        method: 'M-Pesa',
        reference: 'SD' + Math.random().toString(36).substring(7).toUpperCase(),
      });
      refreshData();
      setStep('success');
    }, 2500);
  };

  if (step === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center animate-scale-in">
          <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-14 h-14 text-emerald-600" />
          </div>
          <h2 className="text-3xl font-black text-gray-900 mb-2">{t('contributionReceived')}</h2>
          <p className="text-gray-600 mb-2">{t('ksh')} {parseInt(amount).toLocaleString()} via M-Pesa</p>
          <button onClick={() => setPage('dashboard')} className="btn btn-primary px-8 mt-4">{t('done')}</button>
        </div>
      </div>
    );
  }

  if (step === 'processing') {
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
          onClick={handleContribute}
          className="w-full btn btn-primary text-lg py-4 shadow-lg"
        >
          💰 {t('payViaMpesa')}
        </button>
      </div>
    </div>
  );
}

// Add more pages... (Loans, Meetings, Members, Rotation, Chat, Reports, Settings, More, Fines, Audit)
// For brevity, I'll create simplified versions that are still functional

function LoansPage() {
  const { t, setPage } = useApp();
  const loans = db.getLoans();
  
  return (
    <div className="pb-20">
      <TopBar title={t('loans')} showBack />
      <div className="p-4 space-y-4">
        <button onClick={() => setPage('apply-loan')} className="w-full btn btn-primary text-lg py-4 shadow-lg">
          + {t('applyLoan')}
        </button>
        
        <div className="space-y-3">
          {loans.map((loan) => (
            <div key={loan.id} className="card p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-bold text-gray-900">{loan.memberName}</p>
                  <p className="text-sm text-gray-500">{loan.purpose}</p>
                </div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                  loan.status === 'repaying' ? 'bg-orange-100 text-orange-700' :
                  loan.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-emerald-100 text-emerald-700'
                }`}>
                  {t(loan.status)}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-3 text-center">
                <div>
                  <p className="text-xs text-gray-500">{t('amount')}</p>
                  <p className="font-bold">{t('ksh')} {(loan.amount / 1000).toFixed(0)}K</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">{t('interest')}</p>
                  <p className="font-bold">{loan.interestRate}%</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">{t('period')}</p>
                  <p className="font-bold">{loan.repaymentPeriod}mo</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ApplyLoanPage() {
  const { t, setPage, user, showToast, refreshData } = useApp();
  const [amount, setAmount] = useState('50000');
  const [purpose, setPurpose] = useState('School Fees');
  const [period, setPeriod] = useState('6');

  const handleApply = () => {
    db.addLoan({
      id: 'l' + Date.now(),
      memberId: user!.id,
      memberName: user!.name,
      amount: parseInt(amount),
      purpose,
      interestRate: 10,
      status: 'pending',
      applicationDate: new Date().toISOString().slice(0, 10),
      repaymentPeriod: parseInt(period),
      monthlyPayment: Math.round((parseInt(amount) * 1.1) / parseInt(period)),
      guarantors: ['Mary Wanjiku'],
      balance: parseInt(amount),
    });
    refreshData();
    showToast(t('applicationSubmitted'));
    setPage('loans');
  };

  return (
    <div className="pb-20">
      <TopBar title={t('applyLoan')} showBack />
      <div className="p-4 space-y-4">
        <div className="card p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">{t('loanAmount')}</label>
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-xl font-bold" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">{t('purpose')}</label>
            <select value={purpose} onChange={(e) => setPurpose(e.target.value)} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl">
              <option>School Fees</option>
              <option>Business Capital</option>
              <option>Medical</option>
              <option>Emergency</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">{t('period')}</label>
            <div className="grid grid-cols-4 gap-2">
              {['3', '6', '9', '12'].map(m => (
                <button key={m} onClick={() => setPeriod(m)} className={`py-3 rounded-xl font-bold ${period === m ? 'bg-emerald-700 text-white' : 'bg-gray-100'}`}>
                  {m}mo
                </button>
              ))}
            </div>
          </div>
        </div>

        <button onClick={handleApply} className="w-full btn btn-primary text-lg py-4">
          {t('submitApplication')}
        </button>
      </div>
    </div>
  );
}

// Simplified remaining pages
function MeetingsPage() {
  const { t, setPage } = useApp();
  const meetings = db.getMeetings();
  
  return (
    <div className="pb-20">
      <TopBar title={t('meetings')} showBack />
      <div className="p-4 space-y-4">
        <button onClick={() => setPage('schedule-meeting')} className="w-full btn btn-primary">+ {t('scheduleMeeting')}</button>
        {meetings.map(m => (
          <div key={m.id} className="card p-4">
            <h3 className="font-bold text-gray-900">{m.title}</h3>
            <p className="text-sm text-gray-500 mt-1">📅 {m.date} • 🕐 {m.time}</p>
            <p className="text-sm text-gray-500">📍 {m.location}</p>
            <p className="text-sm text-gray-600 mt-2">{m.notes}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ScheduleMeetingPage() {
  const { t, setPage, showToast, refreshData } = useApp();
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');

  const handleSchedule = () => {
    db.addMeeting({
      id: 'mt' + Date.now(),
      title,
      date,
      time,
      location,
      notes,
      attendees: 0,
    });
    refreshData();
    showToast('Meeting scheduled!');
    setPage('meetings');
  };

  return (
    <div className="pb-20">
      <TopBar title={t('scheduleMeeting')} showBack />
      <div className="p-4 space-y-4">
        <div className="card p-6 space-y-4">
          <input placeholder="Meeting Title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl" />
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl" />
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl" />
          <input placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl" />
          <textarea placeholder="Notes/Agenda" value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl" rows={4} />
        </div>
        <button onClick={handleSchedule} className="w-full btn btn-primary">{t('save')}</button>
      </div>
    </div>
  );
}

function MembersPage() {
  const { t } = useApp();
  const members = db.getMembers();
  
  return (
    <div className="pb-20">
      <TopBar title={t('members')} showBack />
      <div className="p-4 space-y-2">
        {members.map(m => (
          <div key={m.id} className="card p-4 flex items-center gap-3">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center font-bold text-emerald-700">
              {m.avatar}
            </div>
            <div className="flex-1">
              <p className="font-bold text-gray-900">{m.name}</p>
              <p className="text-xs text-gray-500 capitalize">{m.role}</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-sm">{t('ksh')} {(m.totalContributed / 1000).toFixed(0)}K</p>
              <p className="text-xs text-gray-500">#{m.payoutPosition}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RotationPage() {
  const { t } = useApp();
  const rotation = db.getRotation();
  
  return (
    <div className="pb-20">
      <TopBar title={t('mgo')} showBack />
      <div className="p-4 space-y-2">
        {rotation.map(r => (
          <div key={r.position} className={`card p-4 border-2 ${r.status === 'current' ? 'border-amber-400 bg-amber-50' : ''}`}>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                r.status === 'current' ? 'bg-amber-500 text-white' :
                r.status === 'completed' ? 'bg-emerald-500 text-white' : 'bg-gray-200'
              }`}>
                {r.status === 'completed' ? '✓' : r.position}
              </div>
              <div className="flex-1">
                <p className="font-bold">{r.memberName}</p>
                <p className="text-xs text-gray-500">{r.scheduledDate}</p>
              </div>
              <p className="font-bold">{t('ksh')} {r.amount.toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChatPage() {
  const { t, user, showToast, refreshData } = useApp();
  const [message, setMessage] = useState('');
  const messages = db.getMessages();

  const handleSend = () => {
    if (!message.trim()) return;
    db.addMessage({
      id: 'ch' + Date.now(),
      senderId: user!.id,
      senderName: user!.name,
      message,
      timestamp: new Date().toISOString().slice(0, 16).replace('T', ' '),
      isAnnouncement: false,
    });
    refreshData();
    setMessage('');
  };

  return (
    <div className="pb-20 flex flex-col h-screen">
      <TopBar title={t('chat')} showBack />
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.senderId === user?.id ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
              msg.isAnnouncement ? 'bg-amber-100 border border-amber-200 w-full' :
              msg.senderId === user?.id ? 'bg-emerald-700 text-white' : 'bg-white border border-gray-200'
            }`}>
              {msg.isAnnouncement && <p className="text-xs font-bold text-amber-700 mb-1">📢 {t('announcements')}</p>}
              {!msg.isAnnouncement && msg.senderId !== user?.id && <p className="text-xs font-bold text-emerald-700 mb-0.5">{msg.senderName}</p>}
              <p className="text-sm">{msg.message}</p>
              <p className="text-xs mt-1 opacity-70">{msg.timestamp.split(' ')[1]}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="p-3 bg-white border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder={t('typeMessage')}
            className="flex-1 px-4 py-2.5 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button onClick={handleSend} className="w-10 h-10 bg-emerald-700 rounded-full flex items-center justify-center text-white">
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

function MorePage() {
  const { setPage, t } = useApp();
  const group = db.getGroup();
  const members = db.getMembers();
  
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
          <p className="text-emerald-200 text-sm">{group.name}</p>
          <p className="text-3xl font-black mt-1">{members.length} {t('members')}</p>
          <p className="text-emerald-200 text-sm mt-1">{t('ksh')} 2.25M {t('totalAssets')}</p>
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
      </div>
    </div>
  );
}

// Placeholder pages for remaining sections
function ReportsPage() { return <div className="pb-20"><TopBar title="Reports" showBack /><div className="p-4"><div className="card p-8 text-center"><p>Reports coming soon...</p></div></div></div>; }
function SettingsPage() { return <div className="pb-20"><TopBar title="Settings" showBack /><div className="p-4"><div className="card p-8 text-center"><p>Settings coming soon...</p></div></div></div>; }
function FinesPage() { return <div className="pb-20"><TopBar title="Fines" showBack /><div className="p-4"><div className="card p-8 text-center"><p>Fines coming soon...</p></div></div></div>; }
function AuditPage() { return <div className="pb-20"><TopBar title="Audit Trail" showBack /><div className="p-4"><div className="card p-8 text-center"><p>Audit trail coming soon...</p></div></div></div>; }
function NotificationsPage() { return <div className="pb-20"><TopBar title="Notifications" showBack /><div className="p-4"><div className="card p-8 text-center"><p>No notifications</p></div></div></div>; }

// ==================== MAIN APP ====================
function AppContent() {
  const { currentPage } = useApp();
  const isAuthenticated = db.isAuthenticated();

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <DashboardPage />;
      case 'contributions': return <ContributionsPage />;
      case 'contribute': return <ContributePage />;
      case 'loans': return <LoansPage />;
      case 'apply-loan': return <ApplyLoanPage />;
      case 'meetings': return <MeetingsPage />;
      case 'schedule-meeting': return <ScheduleMeetingPage />;
      case 'members': return <MembersPage />;
      case 'rotation': return <RotationPage />;
      case 'chat': return <ChatPage />;
      case 'more': return <MorePage />;
      case 'reports': return <ReportsPage />;
      case 'settings': return <SettingsPage />;
      case 'fines': return <FinesPage />;
      case 'audit': return <AuditPage />;
      case 'notifications': return <NotificationsPage />;
      default: return <DashboardPage />;
    }
  };

  const showNav = !['login', 'contribute', 'apply-loan', 'schedule-meeting'].includes(currentPage);

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
