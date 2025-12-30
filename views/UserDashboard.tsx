
import React from 'react';
import { AppView, UserLead, Language } from '../types';
import { translations } from '../translations';
import { Card } from '../components/SharedUI';
import { TrendingUp, ShieldCheck, Calculator, ArrowRight, ShieldAlert, Scale, Sparkles, MapPin, Target, Landmark, Coins, Search, Compass, Shield } from 'lucide-react';

interface UserDashboardProps {
  user: UserLead;
  onSelectTool: (view: AppView) => void;
  lang: Language;
}

const UserDashboard: React.FC<UserDashboardProps> = ({ user, onSelectTool, lang }) => {
  const t = translations[lang];
  const isAr = lang === 'ar';

  return (
    <div className="space-y-24 pt-40 animate-in fade-in duration-1000 pb-40">
      {/* Premium Welcome Hero */}
      <div className="relative overflow-hidden bg-slate-900 rounded-[5rem] p-16 md:p-32 text-white shadow-luxury">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <img src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-900/40 to-transparent"></div>
        </div>
        
        <div className="absolute -top-32 -right-32 p-16 opacity-[0.03] pointer-events-none animate-[spin_60s_linear_infinite]">
          <ShieldAlert className="w-[800px] h-[800px]" />
        </div>
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-12">
            <div className="inline-flex items-center gap-4 bg-white/10 px-8 py-3 rounded-full backdrop-blur-3xl border border-white/20 shadow-2xl">
               <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse"></span>
               <span className="text-[12px] font-black uppercase tracking-[0.5em] text-emerald-400">
                 {isAr ? "دخول موثق نشط" : "Verified Access Active"}
               </span>
            </div>
            
            <div className="space-y-6">
              <h1 className="text-7xl md:text-9xl font-serif font-bold leading-[0.85] tracking-tight">
                {isAr ? `أهلاً بك، ${user.fullName.split(' ')[0]}` : `Welcome, ${user.fullName.split(' ')[0]}`}
              </h1>
              <div className="w-24 h-1.5 bg-[#C5A059] rounded-full shadow-lg"></div>
            </div>
            
            <p className="text-slate-400 text-2xl md:text-3xl font-light leading-relaxed max-w-2xl opacity-90 font-serif italic">
              {isAr ? "نافذة الـ ٢٤ ساعة مفتوحة لتدقيق قرارك العقاري بأقصى درجات السيادة." : "Your 24-hour authority window is currently active. Utilize the full suite of elite tools to audit your capital moves."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:justify-end">
             <Card className="bg-white/5 border border-white/10 p-12 rounded-[3.5rem] backdrop-blur-3xl shadow-2xl group hover:bg-white/10 transition-colors">
                <Target className="w-10 h-10 text-[#C5A059] mb-8 group-hover:scale-110 transition-transform" />
                <p className="text-[12px] text-slate-500 uppercase font-black tracking-[0.4em] mb-4">{isAr ? "ملف القرار" : "DECISION PROFILE"}</p>
                <h4 className="font-serif text-4xl font-bold mb-2">{user.propertyType}</h4>
                <div className="flex items-center gap-3 text-slate-400 text-lg font-light italic">
                  <MapPin className="w-4 h-4 text-[#C5A059]" /> {user.city}
                </div>
             </Card>
             <Card className="bg-white/5 border border-white/10 p-12 rounded-[3.5rem] backdrop-blur-3xl shadow-2xl group hover:bg-white/10 transition-colors">
                <Landmark className="w-10 h-10 text-[#C5A059] mb-8 group-hover:scale-110 transition-transform" />
                <p className="text-[12px] text-slate-500 uppercase font-black tracking-[0.4em] mb-4">{isAr ? "نطاق رأس المال" : "CAPITAL TARGET"}</p>
                <h4 className="font-serif text-4xl font-bold mb-2">{user.budgetRange}</h4>
                <p className="text-slate-400 text-lg font-light italic">{isAr ? "فئة تمويلية معتمدة" : "Authorized bracket"}</p>
             </Card>
          </div>
        </div>
      </div>

      {/* Enhanced Multi-Layer Tool Grid */}
      <div className="space-y-12">
        <div className="flex items-center gap-4 text-slate-400">
           <Compass className="w-6 h-6 text-[#C5A059]" />
           <h3 className="text-[13px] font-black uppercase tracking-[0.8em]">{isAr ? 'حقيبة أدوات السلطة' : 'VERIFIED AUDIT SUITE'}</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {[
            { 
              id: 'PRICE_ENGINE' as AppView, 
              label: t.tools.price.title, 
              icon: Coins, 
              desc: t.tools.price.desc,
              cta: t.tools.price.cta,
              img: "https://images.unsplash.com/photo-1554224155-1696413565d3?q=80&w=2070&auto=format&fit=crop",
              tag: "Market Intelligence"
            },
            { 
              id: 'DEVELOPER_SCORE' as AppView, 
              label: t.tools.dev.title, 
              icon: ShieldCheck, 
              desc: t.tools.dev.desc,
              cta: t.tools.dev.cta,
              img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
              tag: "Entity Audit"
            },
            { 
              id: 'UNIT_ANALYZER' as AppView, 
              label: t.tools.unit.title, 
              icon: Sparkles, 
              desc: t.tools.unit.desc,
              cta: t.tools.unit.cta,
              img: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop",
              tag: "Specification Audit"
            },
            { 
              id: 'SIMULATOR' as AppView, 
              label: t.tools.sim.title, 
              icon: Calculator, 
              desc: t.tools.sim.desc,
              cta: t.tools.sim.cta,
              img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
              tag: "Investment Model"
            },
            { 
              id: 'CONTRACT_AUDITOR' as AppView, 
              label: t.tools.legal.title, 
              icon: Scale, 
              desc: t.tools.legal.desc,
              cta: t.tools.legal.cta,
              img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop",
              tag: "Legal Review"
            }
          ].map((tool) => (
            <Card 
              key={tool.id} 
              className="group h-[550px] relative overflow-hidden flex flex-col p-14 border-slate-100 hover:border-[#C5A059] transition-all duration-1000 cursor-pointer shadow-sm hover:shadow-luxury bg-white" 
              onClick={() => onSelectTool(tool.id)}
            >
              {/* Tool Background Image (Subtle) */}
              <div className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-[0.04] transition-all duration-1000 group-hover:scale-110">
                 <img src={tool.img} className="w-full h-full object-cover" />
              </div>

              <div className="flex justify-between items-start mb-12">
                <div className="w-24 h-24 bg-slate-50 rounded-[2rem] flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-all duration-700 shadow-sm group-hover:rotate-6">
                  <tool.icon className="w-12 h-12" />
                </div>
                <div className="px-5 py-2 rounded-full border border-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:bg-[#C5A059]/10 group-hover:text-[#C5A059] transition-colors">
                  {tool.tag}
                </div>
              </div>
              
              <h3 className="text-4xl font-serif font-bold text-slate-900 mb-8 group-hover:text-[#C5A059] transition-colors leading-[0.9]">{tool.label}</h3>
              <p className="text-slate-500 text-2xl font-light mb-12 leading-relaxed flex-grow opacity-80 font-serif italic">{tool.desc}</p>
              
              <div className="mt-auto flex items-center justify-between border-t border-slate-50 pt-12">
                 <span className="text-[13px] font-black uppercase tracking-[0.5em] text-slate-900">{tool.cta}</span>
                 <div className={`p-5 rounded-full bg-slate-50 group-hover:bg-slate-900 group-hover:text-white transition-all duration-700 shadow-md ${isAr ? 'group-hover:-translate-x-6' : 'group-hover:translate-x-6'}`}>
                    <ArrowRight className={`w-7 h-7 ${isAr ? 'rotate-180' : ''}`} />
                 </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Professional Disclosure - Editorial Style */}
      <div className="bg-slate-900 rounded-[5rem] p-24 md:p-32 border border-slate-100/10 flex flex-col md:flex-row items-center gap-20 shadow-luxury relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none grayscale brightness-150">
           <img src="https://images.unsplash.com/photo-1541888946425-d81bb19480c5?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover" />
        </div>
        <div className="absolute top-0 left-0 w-3 h-full bg-[#C5A059] shadow-[0_0_20px_rgba(197,160,89,0.5)]"></div>
        
        <div className="bg-white/10 p-8 rounded-[2.5rem] shadow-2xl border border-white/20 backdrop-blur-3xl relative z-10">
          <Shield className="w-16 h-16 text-[#C5A059]" />
        </div>
        
        <div className="flex-1 space-y-10 relative z-10 text-center md:text-left">
          <div className="space-y-4">
            <h4 className="font-black text-[#C5A059] text-[13px] uppercase tracking-[0.8em]">
              {isAr ? "ميثاق النزاهة العقارية" : "CHARTER OF REAL ESTATE INTEGRITY"}
            </h4>
            <div className="w-20 h-[1px] bg-white/20 mx-auto md:mx-0"></div>
          </div>
          <p className={`text-slate-300 text-3xl md:text-4xl leading-relaxed font-light font-serif italic opacity-90 ${isAr ? 'md:text-right' : 'md:text-left'}`}>
            {isAr 
              ? "بيانات أقاري ترست مستمدة من خوارزميات الذكاء الاصطناعي التي تحلل سجلات الشهر العقاري، والمؤشرات الاقتصادية. نضمن حيادنا المطلق من خلال رفض أي عمولات أو رعاية من أي مطور عقاري."
              : "AqaryTrust data is objectively derived from proprietary AI models analyzing land registry records and macro-economic volatility. We guarantee absolute neutrality by refusing all commissions or developer sponsorships."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
