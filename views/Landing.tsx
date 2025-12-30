
import React, { useEffect, useState, useRef } from 'react';
import { Card } from '../components/SharedUI';
import { Language } from '../types';
import { translations } from '../translations';
import { ShieldCheck, ArrowRight, ChevronDown, Landmark, Sparkles, Building, Coins, Compass, Diamond, Zap, Globe, FileText, Scale, BarChart3 } from 'lucide-react';

const Landing: React.FC<{ onStart: () => void; lang: Language }> = ({ onStart, lang }) => {
  const t = translations[lang];
  const isAr = lang === 'ar';
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative space-y-64 pb-64 overflow-hidden">
      {/* Dynamic Light Leaks */}
      <div className="light-leak" style={{ top: '10%', left: '5%' }}></div>
      <div className="light-leak" style={{ bottom: '20%', right: '10%', animationDelay: '-5s' }}></div>

      {/* Cinematic Hero Section */}
      <section className="relative min-h-[120vh] flex items-center justify-center pt-32 px-6">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-[#fcfbf7]/0 via-[#fcfbf7]/40 to-[#fcfbf7] z-20"></div>
          <div className="absolute inset-0 bg-slate-900/5 z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop" 
            alt="Cinematic Architecture" 
            className="w-full h-full object-cover opacity-[0.22] scale-110 animate-[pulse_15s_infinite]"
            style={{ transform: `translateY(${scrollY * 0.1}px) scale(1.1)` }}
          />
        </div>
        
        <div className="max-w-[1400px] mx-auto flex flex-col items-center text-center space-y-24 reveal-up">
          <div className="inline-flex items-center gap-6 bg-white/70 px-10 py-4 rounded-full shadow-luxury border border-white/90 backdrop-blur-3xl float-slow">
             <div className="bg-slate-900 p-2.5 rounded-2xl shadow-xl">
                <ShieldCheck className="text-[#C5A059] w-6 h-6" />
             </div>
             <span className="text-slate-900 text-[13px] font-black uppercase tracking-[0.7em]">{t.verification_badge}</span>
          </div>

          <div className="space-y-14 relative">
            <h1 className="text-[9rem] md:text-[16rem] font-serif font-bold text-slate-900 leading-[0.7] tracking-tighter">
              {isAr ? "دقة البيانات،" : "Precise Data."} <br/>
              <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#C5A059] via-slate-900 to-[#C5A059] drop-shadow-sm">
                {isAr ? "سيادة القرار." : "Absolute Authority."}
              </span>
            </h1>
            <p className="text-3xl md:text-5xl text-slate-500 max-w-6xl mx-auto font-light leading-relaxed text-balance opacity-90 font-serif italic">
              {t.hero_desc}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-16 pt-16">
            <button 
              onClick={onStart}
              className="group relative overflow-hidden bg-slate-900 text-white px-28 py-10 rounded-full text-xs font-black uppercase tracking-[0.5em] hover:bg-slate-800 transition-all shadow-[0_60px_120px_-30px_rgba(15,23,42,0.5)] flex items-center gap-10"
            >
              <span className="relative z-10">{t.start_btn}</span>
              <ArrowRight className={`w-8 h-8 group-hover:translate-x-5 transition-transform relative z-10 ${isAr ? 'rotate-180 group-hover:-translate-x-5' : ''}`} />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </button>
            
            <div className="flex items-center gap-12 px-14 py-7 border border-slate-200/40 rounded-full bg-white/30 backdrop-blur-3xl shadow-sm hover:shadow-luxury transition-all">
               <div className="flex -space-x-8 overflow-hidden">
                  {[50,51,52,53,54].map(i => (
                    <img key={i} className="inline-block h-16 w-16 rounded-full ring-4 ring-white object-cover transform hover:scale-125 hover:z-50 transition-all cursor-pointer shadow-lg" src={`https://i.pravatar.cc/150?img=${i}`} alt="" />
                  ))}
               </div>
               <div className="h-12 w-[1px] bg-slate-300/40"></div>
               <div className="text-left">
                  <p className="text-[14px] font-black text-slate-900 uppercase tracking-widest leading-none mb-1.5">{isAr ? '+٥.٢ ألف مستثمر' : '+5.2k Private Clients'}</p>
                  <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">{isAr ? 'بيانات معتمدة من الشهر العقاري' : 'Authorized Capital Authority'}</p>
               </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 animate-bounce opacity-25 hover:opacity-100 transition-opacity cursor-pointer">
          <ChevronDown className="w-20 h-20 text-[#C5A059]" />
        </div>
      </section>

      {/* Editorial Grid Gallery */}
      <section className="max-w-[1800px] mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-start">
           <div className="md:col-span-5 reveal-up delay-100 perspective-frame">
             <div className="rounded-[5rem] overflow-hidden aspect-[4/5.5] relative group shadow-luxury border-4 border-white">
                <img src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]" />
                <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/40 transition-colors duration-1000"></div>
                <div className="absolute top-16 left-16 flex gap-6">
                   <div className="px-8 py-3 rounded-full luxury-glass border-white/30 text-[11px] font-black uppercase tracking-widest text-slate-900 shadow-lg">New Giza Registry</div>
                </div>
             </div>
           </div>
           
           <div className="md:col-span-3 reveal-up delay-300 md:mt-48 space-y-16">
             <div className="rounded-[4rem] overflow-hidden aspect-square relative group shadow-luxury border-4 border-white perspective-frame">
                <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]" />
                <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/40 transition-colors duration-1000"></div>
             </div>
             <div className="p-12 luxury-glass rounded-[4rem] border-white/40 shadow-xl space-y-8">
                <Landmark className="text-[#C5A059] w-12 h-12" />
                <p className="text-2xl font-serif italic text-slate-600 leading-relaxed">"True luxury is knowing the resale index before you sign the reservation."</p>
                <div className="w-16 h-[1px] bg-slate-200"></div>
                <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">Authority Note 2025</p>
             </div>
           </div>

           <div className="md:col-span-4 reveal-up delay-500 perspective-frame">
             <div className="rounded-[5rem] overflow-hidden aspect-[4/6.5] relative group shadow-luxury border-4 border-white">
                <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]" />
                <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/40 transition-colors duration-1000"></div>
                <div className="absolute bottom-16 left-12 right-12 p-12 luxury-glass rounded-[3.5rem] border-white/40 backdrop-blur-3xl shadow-2xl">
                   <h3 className="text-4xl font-serif font-bold text-slate-900 mb-6 leading-tight">Neutral Audit Dominance</h3>
                   <p className="text-slate-500 text-xl font-light font-serif italic mb-8 opacity-80 leading-relaxed">Providing absolute clarity on Egypt's top 50 high-end developments.</p>
                   <button onClick={onStart} className="flex items-center gap-4 text-[12px] font-black uppercase tracking-widest text-slate-900 group/btn">
                     View Registry <ArrowRight className={`w-5 h-5 group-hover/btn:translate-x-3 transition-transform ${isAr ? 'rotate-180' : ''}`} />
                   </button>
                </div>
             </div>
           </div>
        </div>
      </section>

      {/* Marquee Trust Strip */}
      <section className="bg-white border-y border-slate-100 py-24 overflow-hidden relative">
        <div className="absolute inset-y-0 left-0 w-64 bg-gradient-to-r from-white to-transparent z-10"></div>
        <div className="absolute inset-y-0 right-0 w-64 bg-gradient-to-l from-white to-transparent z-10"></div>
        <div className="flex gap-24 items-center whitespace-nowrap animate-marquee">
           {[1,2,3].map(set => (
             <div key={set} className="flex gap-24 items-center grayscale opacity-25 hover:grayscale-0 hover:opacity-80 transition-all duration-1000">
               <span className="text-5xl font-serif font-black tracking-tighter italic">SODIC</span>
               <div className="w-2 h-2 rounded-full bg-[#C5A059]"></div>
               <span className="text-5xl font-serif font-black tracking-tighter">EMAAR</span>
               <div className="w-2 h-2 rounded-full bg-[#C5A059]"></div>
               <span className="text-5xl font-serif font-black tracking-tighter">ORA</span>
               <div className="w-2 h-2 rounded-full bg-[#C5A059]"></div>
               <span className="text-5xl font-serif font-black tracking-tighter italic underline decoration-4 decoration-[#C5A059] underline-offset-8">PALM HILLS</span>
               <div className="w-2 h-2 rounded-full bg-[#C5A059]"></div>
               <span className="text-5xl font-serif font-black tracking-tighter">MOUNTAIN VIEW</span>
               <div className="w-2 h-2 rounded-full bg-[#C5A059]"></div>
               <span className="text-5xl font-serif font-black tracking-tighter italic">TATWEER MISR</span>
             </div>
           ))}
        </div>
      </section>

      {/* Deep Narrative Section */}
      <section className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-48 items-center">
           <div className="space-y-20 reveal-up">
              <div className="space-y-12">
                 <div className="inline-flex items-center gap-6 text-[#C5A059]">
                    <div className="w-16 h-[2px] bg-[#C5A059]"></div>
                    <p className="text-[14px] font-black uppercase tracking-[0.8em]">{isAr ? 'معيار السيادة' : 'SOVEREIGN STANDARD'}</p>
                 </div>
                 <h2 className="text-8xl md:text-[11rem] font-serif font-bold text-slate-900 leading-[0.9] tracking-tighter">
                   {isAr ? 'سيادة المعلومات العقارية.' : 'The authority on elite assets.'}
                 </h2>
              </div>
              <p className="text-4xl text-slate-500 font-light leading-relaxed font-serif italic text-balance opacity-80">
                In a high-volatility market where transparency is the ultimate luxury, we provide the definitive benchmark. Every data point is independently audited.
              </p>
              
              <div className="grid grid-cols-2 gap-24 pt-20 border-t border-slate-100">
                 <div className="space-y-6 group">
                    <div className="flex items-center gap-4 text-slate-400 group-hover:text-slate-900 transition-colors">
                       <Diamond className="w-6 h-6 text-[#C5A059]" />
                       <p className="text-[13px] font-black uppercase tracking-widest">{isAr ? 'حياد مطلق' : 'Absolute Neutrality'}</p>
                    </div>
                    <p className="text-7xl font-serif font-bold text-slate-900 group-hover:text-[#C5A059] transition-all">100%</p>
                 </div>
                 <div className="space-y-6 group">
                    <div className="flex items-center gap-4 text-slate-400 group-hover:text-slate-900 transition-colors">
                       <Building className="w-6 h-6 text-[#C5A059]" />
                       <p className="text-[13px] font-black uppercase tracking-widest">{isAr ? 'أصول مراقبة' : 'Monitored Capital'}</p>
                    </div>
                    <p className="text-7xl font-serif font-bold text-slate-900 group-hover:text-[#C5A059] transition-all">EGP 40B+</p>
                 </div>
              </div>
           </div>

           <div className="relative reveal-scale flex justify-center lg:justify-end perspective-frame">
              <div className="w-[90%] aspect-[3/4.2] rounded-[6rem] overflow-hidden shadow-[0_80px_180px_-40px_rgba(15,23,42,0.4)] relative group border-4 border-white">
                 <img 
                   src="https://images.unsplash.com/photo-1577495508048-b635879837f1?q=80&w=2070&auto=format&fit=crop" 
                   alt="Interior Mastery" 
                   className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[3s]"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
                 <div className="absolute bottom-16 left-12 right-12 text-white p-14 luxury-glass rounded-[4rem] border-white/20 backdrop-blur-3xl shadow-2xl">
                    <Sparkles className="text-[#C5A059] w-12 h-12 mb-10 animate-pulse" />
                    <p className="text-4xl font-serif italic mb-10 leading-relaxed">"Certainty is the only asset that holds its value in any economy."</p>
                    <div className="w-16 h-[1px] bg-[#C5A059] mb-6"></div>
                    <p className="text-[12px] font-black uppercase tracking-[0.4em] text-[#C5A059] opacity-80">{isAr ? 'المجلس الاستشاري للأصول، مصر' : 'The Asset Advisory Board, Egypt'}</p>
                 </div>
              </div>
              
              {/* Rotating Seal */}
              <div className="absolute -top-16 -right-16 w-72 h-72 bg-white rounded-full shadow-luxury flex items-center justify-center p-14 border border-slate-100 animate-[spin_40s_linear_infinite] group-hover:pause transition-all cursor-crosshair">
                 <Compass className="w-24 h-24 text-[#C5A059] absolute animate-[spin_15s_linear_infinite_reverse]" />
                 <svg className="w-full h-full text-slate-300 fill-current" viewBox="0 0 100 100">
                   <path id="sealPath" d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" fill="none"/>
                   <text className="text-[8.5px] font-black uppercase tracking-[0.35em] fill-slate-500">
                     <textPath xlinkHref="#sealPath">ESTABLISHED FOR EGYPT'S ELITE • SECURING THE FUTURE •</textPath>
                   </text>
                 </svg>
              </div>
           </div>
        </div>
      </section>

      {/* Refined Tools Bento Grid */}
      <section className="max-w-7xl mx-auto px-8 space-y-40">
        <div className="text-center space-y-12">
          <div className="inline-flex items-center gap-6 text-slate-400 justify-center">
            <Zap className="w-6 h-6 text-[#C5A059]" />
            <p className="text-[14px] font-black uppercase tracking-[1em]">{isAr ? 'حقيبة أدوات السلطة' : 'EXECUTIVE AUDIT SUITE'}</p>
          </div>
          <h2 className="text-9xl md:text-[12rem] font-serif font-bold text-slate-900 tracking-tighter leading-none">{isAr ? 'سيادة المعلومات.' : 'Decision Dominance.'}</h2>
          <p className="text-slate-500 font-light max-w-4xl mx-auto text-4xl font-serif italic leading-relaxed opacity-60">Professional intelligence curated for the ultra-high-net-worth individual.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
          <Card className="md:col-span-8 p-24 h-[750px] flex flex-col justify-between group hover-lift border-slate-100/50 relative overflow-hidden cursor-pointer bg-white" onClick={onStart}>
             <div className="absolute -bottom-32 -right-32 p-12 opacity-[0.02] group-hover:opacity-[0.06] group-hover:scale-110 transition-all duration-1000 pointer-events-none">
                <BarChart3 className="w-[1100px] h-[1100px]" />
             </div>
             <div className="space-y-20 relative z-10">
               <div className="bg-slate-900 w-28 h-28 rounded-[2.5rem] flex items-center justify-center text-white shadow-luxury group-hover:bg-[#C5A059] group-hover:scale-110 transition-all duration-1000 transform group-hover:rotate-6">
                  <Coins className="w-14 h-14" />
               </div>
               <div className="space-y-10">
                <h3 className="text-8xl font-serif font-bold text-slate-900 leading-[0.85]">{t.tools.price.title}</h3>
                <p className="text-slate-500 font-light max-w-3xl text-4xl leading-relaxed font-serif opacity-80">{t.tools.price.desc}</p>
               </div>
             </div>
             <div className="flex items-center gap-10 text-[14px] font-black uppercase tracking-[0.6em] text-slate-900 group-hover:gap-20 transition-all duration-1000 border-t border-slate-100 pt-16 relative z-10">
                {t.tools.price.cta} <ArrowRight className={`w-10 h-10 ${isAr ? 'rotate-180' : ''}`} />
             </div>
          </Card>

          <Card className="md:col-span-4 p-20 h-[750px] flex flex-col justify-between bg-slate-900 text-white hover-lift relative overflow-hidden cursor-pointer group" onClick={onStart}>
             <div className="absolute inset-0 -z-10">
                <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover opacity-10 group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-slate-900/70"></div>
             </div>
             <div className="relative z-10 space-y-16">
               <div className="bg-white/10 w-28 h-28 rounded-[2.5rem] flex items-center justify-center backdrop-blur-3xl border border-white/20 group-hover:bg-[#C5A059] transition-all duration-700">
                  <ShieldCheck className="w-14 h-14 text-[#C5A059] group-hover:text-white" />
               </div>
               <div className="space-y-8">
                 <h3 className="text-7xl font-serif font-bold leading-[0.85]">{t.tools.dev.title}</h3>
                 <p className="text-slate-400 font-light text-2xl leading-relaxed font-serif italic opacity-80">{t.tools.dev.desc}</p>
               </div>
             </div>
             <div className="relative z-10 text-[14px] font-black uppercase tracking-[0.6em] text-white flex items-center gap-10 group-hover:gap-20 transition-all duration-1000 border-t border-white/10 pt-16">
                {t.tools.dev.cta} <ArrowRight className={`w-10 h-10 ${isAr ? 'rotate-180' : ''}`} />
             </div>
          </Card>

          {/* Secondary Cards with refined styling */}
          {[
            { t: t.tools.unit, i: Globe, img: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop" },
            { t: t.tools.legal, i: FileText, img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop" },
            { t: t.tools.sim, i: Scale, img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop" }
          ].map((item, idx) => (
            <Card key={idx} className="md:col-span-4 p-16 h-[550px] flex flex-col justify-between hover:bg-white transition-all group cursor-pointer border-transparent hover:border-slate-100 shadow-sm hover:shadow-luxury relative overflow-hidden" onClick={onStart}>
               <div className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-[0.04] transition-all duration-1000">
                  <img src={item.img} className="w-full h-full object-cover" />
               </div>
               <div className="flex flex-col space-y-14">
                 <div className="w-24 h-24 bg-slate-50 rounded-[2rem] flex items-center justify-center text-slate-900 group-hover:bg-slate-900 group-hover:text-white transition-all duration-1000 shadow-sm">
                    <item.i className="w-12 h-12" />
                 </div>
                 <div className="space-y-8">
                  <h4 className="text-5xl font-serif font-bold text-slate-900 group-hover:text-[#C5A059] transition-colors leading-[0.85]">{item.t.title}</h4>
                  <p className="text-slate-500 text-3xl font-light leading-relaxed font-serif italic opacity-60">{item.t.desc}</p>
                 </div>
               </div>
               <div className="text-[14px] font-black uppercase tracking-[0.6em] text-slate-400 group-hover:text-slate-900 transition-colors border-t border-slate-50 pt-12 flex items-center justify-between">
                  {item.t.cta} <ArrowRight className={`w-7 h-7 opacity-0 group-hover:opacity-100 group-hover:translate-x-6 transition-all duration-500 ${isAr ? 'rotate-180 group-hover:-translate-x-6' : ''}`} />
               </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Narrative Finale */}
      <section className="max-w-[1800px] mx-auto px-8 reveal-up">
          <div className="bg-slate-900 rounded-[8rem] p-40 md:p-72 text-center text-white relative overflow-hidden flex flex-col items-center shadow-luxury">
             <div className="absolute inset-0 opacity-20 pointer-events-none">
                <img src="https://images.unsplash.com/photo-1541888946425-d81bb19480c5?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover grayscale" />
                <div className="absolute inset-0 bg-slate-900/80"></div>
             </div>
             
             <div className="w-64 h-[2px] bg-[#C5A059] mb-32 relative z-10"></div>
             
             <h2 className="text-[10rem] md:text-[15rem] font-serif font-bold mb-24 leading-[0.8] max-w-[1500px] relative z-10 tracking-tighter">
                {isAr ? "نحن لا نبيع العقارات. نحن نبيع اليقين." : "We don't sell real estate. We sell certainty."}
             </h2>
             
             <p className="text-slate-400 max-w-6xl mb-40 font-light text-5xl md:text-6xl leading-relaxed relative z-10 font-serif italic opacity-90 text-balance">
                {isAr ? "منصة استشارية مستقلة تماماً. تملّك الحقيقة قبل تملك الأصول." : "A strictly independent advisory authority. Vetting the capital architecture of Egypt's future."}
             </p>
             
             <button onClick={onStart} className="group relative z-10 px-40 py-14 bg-white text-slate-900 rounded-full font-black uppercase tracking-[0.6em] text-xs hover:scale-110 hover:shadow-[0_50px_150px_rgba(255,255,255,0.3)] transition-all duration-1000 flex items-center gap-14">
                {t.start_btn}
                <ArrowRight className={`w-10 h-10 group-hover:translate-x-6 transition-transform duration-500 ${isAr ? 'rotate-180 group-hover:-translate-x-6' : ''}`} />
             </button>
          </div>
      </section>
      
      {/* Luxury Footer */}
      <footer className="max-w-[1400px] mx-auto px-10 pt-32 border-t border-slate-100/50 flex flex-col md:flex-row justify-between items-center gap-16 opacity-50 pb-20">
         <div className="flex items-center gap-6">
            <ShieldCheck className="w-7 h-7 text-[#C5A059]" />
            <p className="text-[14px] font-black uppercase tracking-[0.5em] text-slate-900">{t.brand} Egypt 2025</p>
         </div>
         <p className="text-[13px] font-bold uppercase tracking-[0.3em] text-slate-400">{t.footer.rights}</p>
         <div className="flex gap-16">
            <span className="text-[13px] font-black uppercase tracking-[0.4em] hover:text-[#C5A059] cursor-pointer transition-all duration-500">Legal Disclosure</span>
            <span className="text-[13px] font-black uppercase tracking-[0.4em] hover:text-[#C5A059] cursor-pointer transition-all duration-500">Capital Privacy</span>
         </div>
      </footer>
    </div>
  );
};

export default Landing;
