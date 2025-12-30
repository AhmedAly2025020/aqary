
import React from 'react';
import { AppView, UserLead, UserStatus, Language } from '../types';
import { translations } from '../translations';
import { ShieldCheck, User, Settings, LogOut, Clock, Globe } from 'lucide-react';

interface NavigationProps {
  lang: Language;
  onLangToggle: () => void;
  currentView: AppView;
  onViewChange: (view: AppView) => void;
  currentUser: UserLead | null;
  onLogout: () => void;
  isAdmin: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ lang, onLangToggle, currentView, onViewChange, currentUser, onLogout, isAdmin }) => {
  const t = translations[lang];
  const isPaidUser = currentUser?.status === UserStatus.PAID;
  const isAr = lang === 'ar';
  
  const getRemainingTime = () => {
    if (!currentUser?.activatedAt) return null;
    const expiry = currentUser.activatedAt + (24 * 60 * 60 * 1000);
    const diff = expiry - Date.now();
    if (diff <= 0) return 'Expired';
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${mins}m ${t.remaining}`;
  };

  const remaining = getRemainingTime();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 pt-4 sm:px-6 lg:px-8 pointer-events-none">
      <div className="max-w-7xl mx-auto luxury-glass rounded-2xl pointer-events-auto shadow-luxury border-slate-100 transition-all">
        <div className="flex justify-between h-16 items-center px-6">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => onViewChange('LANDING')}>
            <div className="bg-slate-900 p-1.5 rounded-lg group-hover:scale-105 transition-transform duration-300">
              <ShieldCheck className="text-white w-5 h-5" />
            </div>
            <span className="font-serif text-xl font-bold text-slate-900 tracking-tight">{t.brand}</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-6">
            <button 
              onClick={onLangToggle}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-slate-50 text-slate-500 text-[11px] font-bold uppercase tracking-widest transition-colors"
            >
              <Globe className="w-3.5 h-3.5" />
              {lang === 'ar' ? 'English' : 'العربية'}
            </button>

            {isAdmin && (
              <button 
                onClick={() => onViewChange('ADMIN')}
                className={`text-[11px] uppercase tracking-widest font-bold flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all ${currentView === 'ADMIN' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:bg-slate-50'}`}
              >
                <Settings className="w-3.5 h-3.5" /> {t.nav_admin}
              </button>
            )}

            {isPaidUser && (
              <div className={`flex items-center gap-2 sm:gap-4 border-slate-100 ${isAr ? 'border-r pr-4' : 'border-l pl-4'}`}>
                <span className="text-[10px] font-bold text-slate-900 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-full flex items-center gap-1.5 uppercase tracking-tighter">
                  <Clock className="w-3 h-3" /> {remaining}
                </span>
                <button 
                  onClick={() => onViewChange('USER_DASHBOARD')}
                  className={`text-[11px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-full transition-all ${currentView === 'USER_DASHBOARD' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:bg-slate-50'}`}
                >
                  {t.nav_tools}
                </button>
              </div>
            )}

            {currentUser ? (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[11px] font-bold text-slate-600 border border-slate-200">
                  {currentUser.fullName.charAt(0)}
                </div>
                <button onClick={onLogout} className="p-2 text-slate-400 hover:text-rose-500 transition-colors">
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => onViewChange('LOGIN')}
                  className="text-slate-500 text-[11px] uppercase tracking-widest font-bold hover:text-slate-900 px-3 py-1.5 transition-colors"
                >
                  {t.nav_login}
                </button>
                <button 
                  onClick={() => onViewChange('FORM')}
                  className="bg-slate-900 text-white px-5 py-2.5 rounded-full text-[11px] uppercase tracking-widest font-bold hover:bg-slate-800 transition-all shadow-lg hover:shadow-slate-200"
                >
                  {t.nav_start}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
