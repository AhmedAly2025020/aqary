
import React, { useState } from 'react';
import { Card } from '../components/SharedUI';
// Import Language type
import { Language } from '../types';
import { ShieldCheck, ArrowRight, Loader2 } from 'lucide-react';

interface LoginProps {
  onLogin: (email: string) => void;
  error?: string | null;
  // Add lang prop to interface to match usage in App.tsx
  lang: Language;
}

const Login: React.FC<LoginProps> = ({ onLogin, error, lang }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const isAr = lang === 'ar';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate network delay
    setTimeout(() => {
      onLogin(email);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="max-w-md mx-auto py-20 animate-in slide-in-from-bottom-4 duration-500">
      <Card className="p-8 shadow-2xl">
        <div className="text-center mb-8">
          <div className="bg-slate-900 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="text-white w-6 h-6" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-slate-900">{isAr ? "الدخول إلى نافذة السلطة" : "Access Authority Window"}</h2>
          <p className="text-slate-500 text-sm mt-2">{isAr ? "أدخل البريد الإلكتروني الذي استخدمته لتقديم طلب التحقق." : "Enter the email used for your verification submission."}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">{isAr ? "البريد الإلكتروني" : "Email Address"}</label>
            <input
              required
              type="email"
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 outline-none transition-all"
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          {error && (
            <div className="p-3 bg-rose-50 border border-rose-100 text-rose-600 text-xs rounded-lg font-medium">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg flex items-center justify-center gap-2 group disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>{isAr ? "دخول للوحة التحكم" : "Enter Dashboard"} <ArrowRight className={`w-4 h-4 group-hover:translate-x-1 transition-transform ${isAr ? 'rotate-180 group-hover:-translate-x-1' : ''}`} /></>}
          </button>
        </form>

        <p className="mt-8 text-center text-xs text-slate-400">
          {isAr ? "لم يتم التحقق منك بعد؟" : "Not verified yet?"} <button className="text-slate-900 font-bold hover:underline">{isAr ? "ابدأ من هنا" : "Start here"}</button>
        </p>
      </Card>
    </div>
  );
};

export default Login;
