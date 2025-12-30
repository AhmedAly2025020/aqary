
import React, { useState } from 'react';
import { Card, SectionHeader, LoadingState, SourceList } from '../components/SharedUI';
import { getDeveloperReliability } from '../services/geminiService';
import { DeveloperReliabilityResponse } from '../types';
import { ShieldAlert, Building2, MapPin, Clock, Layout, Hammer, Search, Info, Calendar, Briefcase, Activity, Target } from 'lucide-react';

const DeveloperScore: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [developer, setDeveloper] = useState('');
  const [result, setResult] = useState<DeveloperReliabilityResponse | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!developer) return;
    setLoading(true);
    try {
      const res = await getDeveloperReliability(developer);
      setResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const MetricRow = ({ label, value = 0 }: { label: string; value?: number }) => (
    <div className="space-y-2">
      <div className="flex justify-between text-[11px] font-black uppercase tracking-[0.2em]">
        <span className="text-slate-400">{label}</span>
        <span className="text-slate-900">{value}/100</span>
      </div>
      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden shadow-inner">
        <div 
          className={`h-full transition-all duration-1000 shadow-sm ${
            value >= 80 ? 'bg-slate-900' : value >= 60 ? 'bg-slate-600' : 'bg-slate-400'
          }`} 
          style={{ width: `${value}%` }} 
        />
      </div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto space-y-16 pt-24 animate-in slide-in-from-bottom-4 duration-700">
      <SectionHeader 
        title="Who are you trusting with your capital?" 
        subtitle="We independently audit every major developer in Egypt, looking past billboards into actual delivery records and legal filings." 
      />
      
      <Card className="p-10 luxury-glass border-slate-200 shadow-2xl">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-6">
          <div className="relative flex-1">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 w-6 h-6" />
            <input
              type="text"
              placeholder="Tell us the developer name... (e.g. Sodic, Emaar)"
              className="w-full pl-16 pr-6 py-5 bg-white border border-slate-200 rounded-[2rem] focus:ring-2 focus:ring-slate-900 outline-none transition-all font-medium placeholder:text-slate-300 shadow-sm"
              value={developer}
              onChange={e => setDeveloper(e.target.value)}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-slate-900 text-white px-12 py-5 rounded-[2rem] font-black uppercase tracking-[0.2em] text-[10px] hover:bg-slate-800 transition-all shadow-xl disabled:opacity-50 h-full"
          >
            {loading ? 'Starting the Audit...' : 'Audit Developer'}
          </button>
        </form>
      </Card>

      {loading && <LoadingState message={`Pulling records for ${developer}. This might take a few seconds as we verify recent construction updates...`} />}

      {result && !loading && (
        <div className="space-y-14 animate-in fade-in zoom-in duration-500">
          {/* Main Scoring Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <Card className="lg:col-span-4 p-12 flex flex-col items-center justify-center bg-slate-900 text-white relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 p-10 opacity-[0.03] pointer-events-none">
                 <ShieldAlert className="w-48 h-48" />
              </div>
              <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em] mb-10">Trust Authority Score</p>
              <div className="text-[10rem] font-serif font-bold mb-6 leading-none tracking-tighter">{result.score}</div>
              <p className="text-slate-400 text-base font-light text-center px-4 leading-relaxed italic">
                Overall reliability benchmark based on historical completion and legal integrity.
              </p>
              <div className="mt-10">
                <div className="px-6 py-2.5 rounded-full border border-[#C5A059]/40 bg-[#C5A059]/5 text-[#C5A059] text-[10px] font-black uppercase tracking-[0.3em]">
                  {result.score >= 90 ? 'Tier 1 • Premium' : result.score >= 80 ? 'Tier 2 • Reliable' : 'Tier 3 • Monitor Closely'}
                </div>
              </div>
            </Card>

            <Card className="lg:col-span-8 p-12 flex flex-col justify-between shadow-2xl border-slate-100">
              <div className="space-y-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-3xl font-serif font-bold text-slate-900">
                    Reliability Breakdown
                  </h3>
                  <Target className="w-8 h-8 text-slate-200" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-10">
                  <MetricRow label="Delivery Punctuality" value={result.breakdown?.punctuality} />
                  <MetricRow label="Completion History" value={result.breakdown?.completion} />
                  <MetricRow label="Specification Adherence" value={result.breakdown?.specAdherence} />
                  <MetricRow label="Legal Reputation" value={result.breakdown?.legalStanding} />
                </div>
              </div>
              
              <div className="mt-14 p-8 bg-slate-50 rounded-[2rem] border border-slate-100/60 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-[0.03]">
                  <Info className="w-12 h-12" />
                </div>
                <p className="text-slate-600 text-lg leading-relaxed italic font-light relative z-10">
                  "{result.summary}"
                </p>
              </div>
            </Card>
          </div>

          {/* Project Portfolio */}
          <div className="space-y-10">
            <div className="flex flex-col items-center text-center space-y-4">
               <div className="bg-slate-50 p-4 rounded-2xl shadow-sm border border-slate-100">
                  <Building2 className="w-8 h-8 text-slate-900" />
               </div>
               <h3 className="text-4xl font-serif font-bold text-slate-900">Track Record & Active Projects</h3>
               <p className="text-slate-500 font-light italic">A direct look into the developer's execution across key developments.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {(result.projects || []).map((project, idx) => (
                <Card key={idx} className="p-10 border border-slate-100 hover:border-slate-300 transition-all group bg-white shadow-xl flex flex-col">
                  <div className="flex justify-between items-start mb-10">
                    <div>
                       <h4 className="font-serif text-2xl font-bold text-slate-900 mb-2">{project.name}</h4>
                       <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                          <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                             <MapPin className="w-3.5 h-3.5" /> {project.location}
                          </div>
                          <div className="flex items-center gap-2 text-[10px] font-black text-slate-600 uppercase tracking-widest bg-slate-100/80 px-3 py-1.5 rounded-lg border border-slate-100">
                             <Briefcase className="w-3.5 h-3.5" /> {project.unitType}
                          </div>
                       </div>
                    </div>
                    <div className={`text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-sm ${
                      project.status === 'Delivered' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-slate-900 text-white'
                    }`}>
                      {project.status}
                    </div>
                  </div>

                  <div className="space-y-10 flex-grow">
                    {/* Construction Progress Bar */}
                    <div className="space-y-4 p-6 bg-slate-50/50 rounded-[2rem] border border-slate-100/50 shadow-inner">
                       <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.3em]">
                          <span className="text-slate-400 flex items-center gap-2"><Activity className="w-4 h-4" /> Construction Momentum</span>
                          <span className="text-slate-900">{project.constructionProgress}%</span>
                       </div>
                       <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden shadow-inner border border-white">
                          <div 
                             className="h-full bg-slate-900 transition-all duration-1000 shadow-[0_0_15px_rgba(15,23,42,0.15)]"
                             style={{ width: `${project.constructionProgress}%` }}
                          />
                       </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="p-6 bg-white rounded-[2rem] border border-slate-100 shadow-sm flex flex-col justify-center">
                         <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
                            <Calendar className="w-4 h-4" /> Expected Completion
                         </div>
                         <p className="text-sm font-bold text-slate-900">{project.expectedCompletion}</p>
                      </div>
                      <div className="p-6 bg-white rounded-[2rem] border border-slate-100 shadow-sm flex flex-col justify-center">
                         <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
                            <Clock className="w-4 h-4" /> Reliability Rating
                         </div>
                         <p className="text-sm font-bold text-slate-900">{project.deliveryAccuracy}</p>
                      </div>
                    </div>

                    {/* Challenges Section */}
                    <div className="pt-8 border-t border-slate-100">
                       <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">
                          <Hammer className="w-4 h-4 text-slate-900" /> Recorded Challenges & Alerts
                       </div>
                       <div className={`p-6 rounded-[2rem] text-sm leading-relaxed italic border shadow-sm ${
                          (project.challenges || '').toLowerCase().includes('issue') || (project.challenges || '').toLowerCase().includes('delay') || (project.challenges || '').toLowerCase().includes('challenge')
                          ? 'bg-rose-50/50 text-rose-800 border-rose-100' 
                          : 'bg-emerald-50/50 text-emerald-800 border-emerald-100'
                       }`}>
                          {project.challenges || "No significant challenges reported."}
                       </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Platform Footnote */}
          <Card className="p-12 bg-[#f8fafc] border-slate-200 shadow-2xl relative overflow-hidden">
            <div className="absolute -bottom-10 -right-10 opacity-[0.02] pointer-events-none">
              <ShieldAlert className="w-64 h-64" />
            </div>
            <div className="flex flex-col md:flex-row items-start gap-10 relative z-10">
              <div className="p-5 bg-white rounded-[2rem] shadow-xl border border-slate-100">
                <Info className="w-10 h-10 text-slate-900" />
              </div>
              <div className="flex-1 space-y-6">
                <div>
                  <h4 className="font-black text-slate-900 text-[11px] uppercase tracking-[0.4em] mb-4">How we audit</h4>
                  <p className="text-base text-slate-500 leading-relaxed font-light italic">
                    Our trust scores are computed every 48 hours using a combination of news-web crawlers, official legal gazettes, and community feedback from vetted delivery groups. We monitor labor density at construction sites via public reports to predict completion shifts before they are announced.
                  </p>
                </div>
                <SourceList sources={result.sources} />
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default DeveloperScore;
