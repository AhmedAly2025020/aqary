
import React, { useState } from 'react';
import { Card, SectionHeader, LoadingState } from '../components/SharedUI';
import { getDecisionSimulation } from '../services/geminiService';
import { DecisionSimulationResponse, RiskLevel } from '../types';
import { Calculator, AlertTriangle, TrendingUp, Lock, Wallet, ArrowRight } from 'lucide-react';

const Simulator: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DecisionSimulationResponse | null>(null);
  const [form, setForm] = useState({
    scenario: 'Cash vs Installment',
    budget: 5000000,
    duration: '5 Years'
  });

  const handleSimulate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await getDecisionSimulation(form);
      setResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <SectionHeader title="Decision Simulator" subtitle="Stress-test your investment scenarios and risk exposure." />
      
      <Card className="p-6">
        <form onSubmit={handleSimulate} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Scenario Type</label>
            <select
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-900 outline-none transition-all"
              value={form.scenario}
              onChange={e => setForm({...form, scenario: e.target.value})}
            >
              <option>Cash vs Installment</option>
              <option>Buy Now vs Wait 1 Year</option>
              <option>Primary Residence vs Investment</option>
              <option>Resale vs Primary Market</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Budget (EGP)</label>
            <input
              type="number"
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-900 outline-none transition-all"
              value={form.budget}
              onChange={e => setForm({...form, budget: Number(e.target.value)})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Time Horizon</label>
            <select
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-900 outline-none transition-all"
              value={form.duration}
              onChange={e => setForm({...form, duration: e.target.value})}
            >
              <option>3 Years</option>
              <option>5 Years</option>
              <option>8 Years</option>
              <option>10+ Years</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="md:col-span-3 bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? 'Running Simulation...' : <><Calculator className="w-5 h-5" /> Simulate Scenario</>}
          </button>
        </form>
      </Card>

      {result && !loading && (
        <div className="space-y-6 animate-in fade-in zoom-in duration-500">
           <div className={`p-6 rounded-2xl border flex items-center justify-between ${
             result.riskLevel === RiskLevel.LOW ? 'bg-emerald-50 border-emerald-100' :
             result.riskLevel === RiskLevel.MEDIUM ? 'bg-amber-50 border-amber-100' : 'bg-rose-50 border-rose-100'
           }`}>
             <div className="flex items-center gap-4">
               <div className={`p-3 rounded-xl ${
                 result.riskLevel === RiskLevel.LOW ? 'bg-emerald-100 text-emerald-700' :
                 result.riskLevel === RiskLevel.MEDIUM ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'
               }`}>
                 <AlertTriangle className="w-6 h-6" />
               </div>
               <div>
                 <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Projected Risk Profile</p>
                 <h3 className="text-2xl font-bold text-slate-900">{result.riskLevel} Risk</h3>
               </div>
             </div>
             <div className="hidden sm:block text-right">
                <span className="text-xs text-slate-500">Recommended Stance:</span>
                <p className="font-bold text-slate-900">{result.riskLevel === RiskLevel.LOW ? 'Proceed' : 'Cautious'}</p>
             </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <Card className="p-6">
               <div className="flex items-center gap-2 mb-4 text-slate-900 font-bold">
                 <Lock className="w-5 h-5" /> Capital Lock-in
               </div>
               <p className="text-slate-600 text-sm mb-4">Duration until you can break even or exit profitably:</p>
               <p className="text-2xl font-bold text-slate-900">{result.lockInPeriod}</p>
             </Card>

             <Card className="p-6">
               <div className="flex items-center gap-2 mb-4 text-slate-900 font-bold">
                 <TrendingUp className="w-5 h-5" /> Upside Potential
               </div>
               <p className="text-slate-600 text-sm mb-4">Estimated capital appreciation over {form.duration}:</p>
               <p className="text-2xl font-bold text-emerald-600">{result.upsidePotential}</p>
             </Card>

             <Card className="p-6 bg-rose-50 border-rose-100">
               <div className="flex items-center gap-2 mb-4 text-rose-900 font-bold">
                 <AlertTriangle className="w-5 h-5" /> Worst-Case Scenario
               </div>
               <p className="text-rose-800 text-sm leading-relaxed">{result.worstCaseScenario}</p>
             </Card>

             <Card className="p-6 bg-slate-900 text-white">
               <div className="flex items-center gap-2 mb-4 font-bold">
                 <Wallet className="w-5 h-5" /> Verdict & Recommendation
               </div>
               <p className="text-slate-300 text-sm leading-relaxed">{result.recommendation}</p>
             </Card>
           </div>
        </div>
      )}
    </div>
  );
};

export default Simulator;
