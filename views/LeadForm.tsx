
import React, { useState } from 'react';
import { Card, SectionHeader } from '../components/SharedUI';
import { UserLead, UserStatus, Language } from '../types';
import { CheckCircle2, Copy, Share2, ArrowRight, ShieldCheck, Zap, Lock } from 'lucide-react';

interface LeadFormProps {
  onSubmit: (lead: Omit<UserLead, 'id' | 'status' | 'createdAt'>) => void;
  lang: Language;
}

const LeadForm: React.FC<LeadFormProps> = ({ onSubmit, lang }) => {
  const [submitted, setSubmitted] = useState<UserLead | null>(null);
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    city: '',
    propertyType: 'Apartment' as any,
    budgetRange: '3M - 5M EGP',
    purpose: 'Investment' as any,
    contactMethod: 'WhatsApp' as any
  });

  const isAr = lang === 'ar';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newLead: UserLead = {
      ...form,
      id: Math.random().toString(36).substr(2, 9),
      status: UserStatus.PENDING,
      createdAt: Date.now()
    };
    onSubmit(newLead);
    setSubmitted(newLead);
  };

  const getEncodedPayload = () => {
    if (!submitted) return '';
    return btoa(unescape(encodeURIComponent(JSON.stringify(submitted))));
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto py-24 px-4 text-center animate-in zoom-in duration-700">
        <div className="w-24 h-24 bg-emerald-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-12 shadow-inner border border-emerald-100">
          <CheckCircle2 className="text-emerald-600 w-12 h-12" />
        </div>
        
        <h2 className="text-5xl font-serif font-bold text-slate-900 mb-6">
          {isAr ? "طلبك قيد المراجعة الفورية" : "Priority Audit Initiated"}
        </h2>
        <p className="text-slate-500 mb-16 leading-relaxed text-xl font-light max-w-lg mx-auto">
          {isAr 
            ? "لقد تم تسجيل بياناتك في نظام أقاري ترست. لتفعيل وصولك الفوري لمدة ٢٤ ساعة، يرجى إرسال رمز التحقق التالي للمسؤول."
            : "Data secured in our registry. To activate your 24-hour authority window, share the verification payload with the administrator."}
        </p>
        
        <Card className="p-10 bg-slate-50 border-slate-200 shadow-2xl mb-16 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-4 opacity-10">
              <Lock className="w-12 h-12 text-slate-900" />
           </div>
           <div className="flex flex-col gap-6">
              <div className="bg-white border border-slate-200 rounded-3xl p-8 text-[12px] font-mono break-all h-40 overflow-y-auto shadow-inner text-left leading-relaxed">
                {getEncodedPayload()}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(getEncodedPayload());
                    setCopied(true);
                    setTimeout(() => setCopied(false), 3000);
                  }}
                  className={`flex items-center justify-center gap-4 py-6 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-xl ${
                    copied ? 'bg-emerald-600 text-white' : 'bg-slate-900 text-white hover:bg-slate-800'
                  }`}
                >
                  {copied ? <CheckCircle2 className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  {copied ? (isAr ? "تم النسخ" : "Copied") : (isAr ? "نسخ رمز التفعيل" : "Copy Payload")}
                </button>

                <button 
                  onClick={() => {
                    const msg = encodeURIComponent(`AqaryTrust Verification:\nCode: ${getEncodedPayload()}`);
                    window.open(`https://wa.me/201000000000?text=${msg}`, '_blank'); // استبدل بالرقم الحقيقي
                  }}
                  className="flex items-center justify-center gap-4 py-6 rounded-2xl font-black uppercase tracking-widest text-xs bg-[#25D366] text-white hover:bg-[#128C7E] transition-all shadow-xl"
                >
                  <Share2 className="w-5 h-5" /> {isAr ? "تفعيل عبر واتساب" : "Activate via WhatsApp"}
                </button>
              </div>
           </div>
        </Card>

        <div className="grid grid-cols-3 gap-8 items-center max-w-md mx-auto opacity-50">
           <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full border border-slate-900 flex items-center justify-center text-xs font-black">1</div>
              <p className="text-[10px] font-black uppercase tracking-widest">{isAr ? "تسجيل" : "Register"}</p>
           </div>
           <div className="h-[1px] bg-slate-900"></div>
           <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-black">2</div>
              <p className="text-[10px] font-black uppercase tracking-widest">{isAr ? "تفعيل" : "Verify"}</p>
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-20 animate-in slide-in-from-bottom-8 duration-1000 pb-40 pt-20 px-6">
      <div className="text-center space-y-8">
        <div className="inline-flex items-center gap-3 bg-slate-900 text-white px-6 py-2 rounded-full shadow-xl">
           <Zap className="w-4 h-4 text-[#C5A059]" />
           <span className="text-[10px] font-black uppercase tracking-[0.4em]">{isAr ? "وصول النخبة" : "ELITE ACCESS"}</span>
        </div>
        <h2 className="text-6xl md:text-8xl font-serif font-bold text-slate-900 tracking-tighter">
          {isAr ? "سجل اهتمامك الآن." : "Apply for Authority."}
        </h2>
        <p className="text-2xl text-slate-500 font-light max-w-2xl mx-auto font-serif italic">
          {isAr ? "انضم لصفوة المستثمرين العقاريين في مصر واحصل على الحقائق المجردة." : "Join the top tier of Egyptian real estate investors and secure the unfiltered truth."}
        </p>
      </div>

      <Card className="p-16 shadow-[0_50px_100px_-20px_rgba(15,23,42,0.15)] border-white/50 bg-white/80 backdrop-blur-xl rounded-[4rem]">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-4">
            <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">{isAr ? "الاسم الكامل" : "Full Name"}</label>
            <input required type="text" className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-3xl focus:ring-2 focus:ring-slate-900 outline-none transition-all text-base font-medium shadow-inner" placeholder={isAr ? "الاسم كما في الهوية" : "Legal Name"} value={form.fullName} onChange={e => setForm({...form, fullName: e.target.value})} />
          </div>

          <div className="space-y-4">
            <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">{isAr ? "رقم الهاتف" : "Phone"}</label>
            <input required type="tel" className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-3xl focus:ring-2 focus:ring-slate-900 outline-none transition-all text-base font-medium shadow-inner" placeholder="01xxxxxxxxx" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
          </div>

          <div className="space-y-4 md:col-span-2">
            <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">{isAr ? "البريد الإلكتروني" : "Email"}</label>
            <input required type="email" className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-3xl focus:ring-2 focus:ring-slate-900 outline-none transition-all text-base font-medium shadow-inner" placeholder="name@example.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
          </div>

          <div className="space-y-4">
            <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">{isAr ? "الموقع المستهدف" : "Target Location"}</label>
            <input required type="text" className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-3xl focus:ring-2 focus:ring-slate-900 outline-none transition-all text-base font-medium shadow-inner" placeholder={isAr ? "التجمع، الشيخ زايد..." : "New Cairo, Zayed..."} value={form.city} onChange={e => setForm({...form, city: e.target.value})} />
          </div>

          <div className="space-y-4">
            <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">{isAr ? "نوع الاستثمار" : "Investment Strategy"}</label>
            <select className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-3xl focus:ring-2 focus:ring-slate-900 outline-none transition-all text-base font-medium shadow-inner cursor-pointer" value={form.propertyType} onChange={e => setForm({...form, propertyType: e.target.value as any})}>
              <option value="Apartment">{isAr ? "سكني - شقة" : "Residential - Apartment"}</option>
              <option value="Villa">{isAr ? "سكني - فيلا" : "Residential - Villa"}</option>
              <option value="Investment">{isAr ? "تجاري / إداري" : "Commercial / Office"}</option>
            </select>
          </div>

          <button
            type="submit"
            className="md:col-span-2 mt-8 bg-slate-900 text-white py-8 rounded-[2rem] font-black uppercase tracking-[0.5em] text-xs hover:bg-slate-800 transition-all shadow-[0_30px_60px_-15px_rgba(15,23,42,0.4)] flex items-center justify-center gap-6 group"
          >
            {isAr ? "توليد كود التفعيل" : "Generate Verification Code"} 
            <ArrowRight className={`w-6 h-6 group-hover:translate-x-3 transition-transform ${isAr ? 'rotate-180 group-hover:-translate-x-3' : ''}`} />
          </button>
        </form>
      </Card>
      
      <div className="flex items-center gap-6 justify-center opacity-40">
         <ShieldCheck className="w-6 h-6" />
         <p className="text-[11px] font-black uppercase tracking-[0.4em]">{isAr ? "بياناتك محمية بموجب ميثاق النزاهة" : "Data protected by our integrity charter"}</p>
      </div>
    </div>
  );
};

export default LeadForm;
