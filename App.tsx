
import React, { useState, useEffect, useCallback } from 'react';
import Navigation from './components/Navigation';
import Landing from './views/Landing';
import LeadForm from './views/LeadForm';
import AdminPanel from './views/AdminPanel';
import UserDashboard from './views/UserDashboard';
import PriceEngine from './views/PriceEngine';
import DeveloperScore from './views/DeveloperScore';
import Simulator from './views/Simulator';
import ContractAuditor from './views/ContractAuditor';
import UnitAnalyzer from './views/UnitAnalyzer';
import Login from './views/Login';
import { AppView, UserLead, UserStatus, Language } from './types';
import { translations } from './translations';
import { ShieldAlert, Lock, ArrowLeft } from 'lucide-react';

const GRACE_PERIOD_MS = 5 * 60 * 1000; // 5 minute grace period for expiration

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>('LANDING');
  const [currentUser, setCurrentUser] = useState<UserLead | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [language, setLanguage] = useState<Language>('ar');

  const [leads, setLeads] = useState<UserLead[]>(() => {
    const savedLeads = localStorage.getItem('aqary_leads');
    if (savedLeads) {
      try {
        const parsed = JSON.parse(savedLeads);
        // Registry Janitor: Purge records older than 7 days to save storage
        const purgeThreshold = Date.now() - (7 * 24 * 60 * 60 * 1000);
        return parsed.filter((l: UserLead) => l.createdAt > purgeThreshold).map((l: UserLead) => {
          // Check for session expiry with Grace Period
          if (l.status === UserStatus.PAID && l.activatedAt && (Date.now() - l.activatedAt > (24 * 60 * 60 * 1000) + GRACE_PERIOD_MS)) {
            return { ...l, status: UserStatus.EXPIRED };
          }
          return l;
        });
      } catch (e) { return []; }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('aqary_leads', JSON.stringify(leads));
  }, [leads]);

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const handleLeadSubmit = useCallback((leadData: Omit<UserLead, 'id' | 'status' | 'createdAt'>) => {
    const newLead: UserLead = {
      ...leadData,
      id: Math.random().toString(36).substr(2, 9),
      status: UserStatus.PENDING,
      createdAt: Date.now()
    };
    setLeads(prev => {
      const filtered = prev.filter(l => l.email.toLowerCase() !== leadData.email.toLowerCase());
      return [...filtered, newLead];
    });
  }, []);

  const handleLogin = (email: string) => {
    const normalizedEmail = email.toLowerCase().trim();
    setLoginError(null);

    // Secure Admin Gateway
    if (normalizedEmail === 'admin@aqarytrust.com') {
      setCurrentUser({
        id: 'admin', fullName: 'System Authority', email: 'admin@aqarytrust.com',
        phone: '000', city: 'Registry HQ', status: UserStatus.PAID,
        createdAt: Date.now(), activatedAt: Date.now(),
        propertyType: 'Investment', budgetRange: 'N/A', purpose: 'Investment', contactMethod: 'Phone'
      });
      setCurrentView('ADMIN');
      return;
    }

    const user = leads.find(l => l.email.toLowerCase().trim() === normalizedEmail);
    if (!user) {
      setLoginError(language === 'ar' ? "البريد غير مسجل." : "Email not registered.");
      return;
    }
    
    if (user.status === UserStatus.PENDING) {
      setLoginError(language === 'ar' ? "طلبك قيد المراجعة." : "Request pending. Contact admin for activation.");
      return;
    }

    // Checking expiry with Grace Period in Login
    if (user.status === UserStatus.EXPIRED || (user.activatedAt && Date.now() - user.activatedAt > (24 * 60 * 60 * 1000) + GRACE_PERIOD_MS)) {
      setLoginError(language === 'ar' ? "انتهت صلاحية الـ ٢٤ ساعة." : "Your 24-hour window has expired.");
      return;
    }

    setCurrentUser(user);
    setCurrentView('USER_DASHBOARD');
  };

  const renderView = () => {
    const isPremium = ['USER_DASHBOARD', 'PRICE_ENGINE', 'DEVELOPER_SCORE', 'SIMULATOR', 'CONTRACT_AUDITOR', 'UNIT_ANALYZER'].includes(currentView);
    const hasAccess = currentUser?.status === UserStatus.PAID;

    if (isPremium && !hasAccess) {
      return (
        <div className="max-w-xl mx-auto py-40 text-center space-y-12 animate-in fade-in duration-700">
          <div className="bg-slate-900 w-24 h-24 rounded-[2rem] flex items-center justify-center mx-auto shadow-2xl">
             <Lock className="text-[#C5A059] w-10 h-10" />
          </div>
          <h2 className="text-4xl font-serif font-bold text-slate-900">Access Restricted</h2>
          <button onClick={() => setCurrentView('LOGIN')} className="bg-slate-900 text-white px-10 py-4 rounded-full font-black uppercase tracking-widest text-[10px] shadow-xl">
             Authenticate Session
          </button>
        </div>
      );
    }

    switch (currentView) {
      case 'LANDING': return <Landing lang={language} onStart={() => setCurrentView('FORM')} />;
      case 'FORM': return <LeadForm lang={language} onSubmit={handleLeadSubmit} />;
      case 'LOGIN': return <Login lang={language} onLogin={handleLogin} error={loginError} />;
      case 'ADMIN': return <AdminPanel leads={leads} onUpdateStatus={(id, s) => setLeads(l => l.map(x => x.id === id ? {...x, status: s} : x))} onDeleteLead={id => setLeads(l => l.filter(x => x.id !== id))} onActivate={id => setLeads(l => l.map(x => x.id === id ? {...x, status: UserStatus.PAID, activatedAt: Date.now()} : x))} onImportLeads={lds => setLeads(lds)} />;
      case 'USER_DASHBOARD': return currentUser && <UserDashboard lang={language} user={currentUser} onSelectTool={setCurrentView} />;
      case 'PRICE_ENGINE': return <PriceEngine />;
      case 'DEVELOPER_SCORE': return <DeveloperScore />;
      case 'SIMULATOR': return <Simulator />;
      case 'CONTRACT_AUDITOR': return <ContractAuditor />;
      case 'UNIT_ANALYZER': return <UnitAnalyzer lang={language} />;
      default: return <Landing lang={language} onStart={() => setCurrentView('FORM')} />;
    }
  };

  return (
    <div className={`min-h-screen flex flex-col bg-[#fcfbf7] ${language === 'ar' ? 'font-arabic' : 'font-sans'}`}>
      <Navigation lang={language} onLangToggle={() => setLanguage(l => l === 'ar' ? 'en' : 'ar')} currentView={currentView} onViewChange={setCurrentView} currentUser={currentUser} onLogout={() => { setCurrentUser(null); setCurrentView('LANDING'); }} isAdmin={currentUser?.email === 'admin@aqarytrust.com'} />
      <main className="flex-1 w-full">{renderView()}</main>
    </div>
  );
};

export default App;
