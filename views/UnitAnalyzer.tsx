
import React, { useState } from 'react';
import { Card, SectionHeader, LoadingState } from '../components/SharedUI';
import { analyzeUnitDescription } from '../services/geminiService';
import { UnitAnalysisResponse, Language } from '../types';
import { FileText, Sparkles, AlertCircle, CheckCircle2, ShieldAlert, BarChart3, Info } from 'lucide-react';

const UnitAnalyzer: React.FC<{ lang: Language }> = ({ lang }) => {
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState('');
  const [result, setResult] = useState<UnitAnalysisResponse | null>(null);

  const handleAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (description.length < 50) return;
    setLoading(true);
    try {
      const res = await analyzeUnitDescription(description);
      setResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const isAr = lang === 'ar';

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <SectionHeader 
        title={isAr ? "محلل مواصفات الوحدة" : "Unit Insight Auditor"} 
        subtitle={isAr ? "قم بلصق وصف الوحدة (من بروشور أو إعلان) لكشف الحقائق الفنية." : "Paste a unit description to reveal hidden technical facts and marketing hype."} 
      />

      <Card className="p-6">
        <form onSubmit={handleAudit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 block">
              {isAr ? "وصف الوحدة" : "Unit Description"}
            </label>
            <textarea
              required
              className="w-full h-48 px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 outline-none transition-all resize-none text-sm leading-relaxed"
              placeholder={isAr ? "مثال: شقة ١٥٠م، التجمع الخامس، فيو لاندسكيب، بحري صريح، استلام فوري..." : "Example: 150m apartment, New Cairo, pool view, North orientation, immediate delivery..."}
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
            <p className="text-[10px] text-slate-400">
              {isAr ? "أدخل ٥٠ حرفاً على الأقل لتحليل دقيق." : "Enter at least 50 characters for an accurate audit."}
            </p>
          </div>

          <button
            type="submit"
            disabled={loading || description.length < 50}
            className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? <LoadingState message={isAr ? "جاري التدقيق الفني..." : "Auditing specs..."} /> : <><Sparkles className="w-5 h-5" /> {isAr ? "بدأ التحليل الاحترافي" : "Start Professional Audit"}</>}
          </button>
        </form>
      </Card>

      {result && !loading && (
        <div className="space-y-6 animate-in fade-in zoom-in duration-500">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-8 bg-slate-900 text-white flex flex-col items-center justify-center text-center">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                {isAr ? "جودة الاستثمار" : "Investment Quality"}
              </p>
              <div className="text-6xl font-black mb-2">{result.score}%</div>
              <p className="text-slate-400 text-sm">
                {isAr ? "بناءً على المعايير الهندسية والسوقية" : "Based on engineering & market standards"}
              </p>
            </Card>

            <Card className="p-8 flex flex-col justify-center">
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm font-bold text-slate-500 uppercase">
                  {isAr ? "مؤشر المصداقية" : "Honesty Score"}
                </p>
                <span className="font-bold text-slate-900">{result.honestyScore}%</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-1000 ${result.honestyScore > 70 ? 'bg-emerald-500' : 'bg-amber-500'}`}
                  style={{ width: `${result.honestyScore}%` }}
                />
              </div>
              <p className="text-xs text-slate-400 mt-4 leading-relaxed">
                {isAr ? "نسبة الحقائق الملموسة مقابل العبارات التسويقية الإنشائية." : "Ratio of tangible facts vs. generic marketing fluff."}
              </p>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             {[
               { label: isAr ? 'المواصفات' : 'Specs', val: result.breakdown.specs },
               { label: isAr ? 'الموقع' : 'Location', val: result.breakdown.location },
               { label: isAr ? 'القيمة مقابل السعر' : 'Value/Price', val: result.breakdown.valueForMoney },
             ].map((m, i) => (
               <Card key={i} className="p-4 text-center">
                 <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">{m.label}</p>
                 <p className="text-xl font-bold text-slate-900">{m.val}/100</p>
               </Card>
             ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 border-l-4 border-l-emerald-500">
               <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-4">
                 <CheckCircle2 className="w-5 h-5 text-emerald-500" /> {isAr ? "نقاط القوة" : "Strengths"}
               </h3>
               <ul className="space-y-3">
                 {result.pros.map((p, i) => (
                   <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
                     <span className="text-emerald-500 mt-1">•</span> {p}
                   </li>
                 ))}
               </ul>
            </Card>

            <Card className="p-6 border-l-4 border-l-rose-500">
               <h3 className="font-bold text-slate-900 flex items-center gap-2 mb-4">
                 <ShieldAlert className="w-5 h-5 text-rose-500" /> {isAr ? "مخاوف وتنبيهات" : "Risks & Alerts"}
               </h3>
               <ul className="space-y-3">
                 {result.redFlags.map((p, i) => (
                   <li key={i} className="text-sm text-rose-700 font-medium flex items-start gap-2">
                     <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" /> {p}
                   </li>
                 ))}
                 {result.cons.map((p, i) => (
                   <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
                     <span className="text-rose-400 mt-1">•</span> {p}
                   </li>
                 ))}
               </ul>
            </Card>
          </div>

          <Card className="p-6 bg-blue-50 border-blue-100">
             <div className="flex items-start gap-4">
                <Info className="w-6 h-6 text-blue-600 mt-1" />
                <div>
                   <h4 className="font-bold text-blue-900 mb-2">{isAr ? "الخلاصة التنفيذية" : "Executive Summary"}</h4>
                   <p className="text-sm text-blue-800 leading-relaxed italic">"{result.summary}"</p>
                </div>
             </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default UnitAnalyzer;
