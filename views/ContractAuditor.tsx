
import React, { useState } from 'react';
import { Card, SectionHeader, LoadingState } from '../components/SharedUI';
import { analyzeContractDocument } from '../services/geminiService';
import { LegalAuditResponse } from '../types';
// Added ArrowRight to imports
import { FileText, ShieldAlert, AlertTriangle, CheckCircle, Info, Upload, Trash2, Scale, ArrowRight } from 'lucide-react';

const ContractAuditor: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<LegalAuditResponse | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64 = (reader.result as string).split(',')[1];
      setPreview(reader.result as string);
      try {
        const res = await analyzeContractDocument(base64, file.type);
        setResult(res);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const reset = () => {
    setPreview(null);
    setResult(null);
  };

  const SeverityBadge = ({ severity }: { severity: string }) => {
    const colors = {
      High: 'bg-rose-100 text-rose-700 border-rose-200',
      Medium: 'bg-amber-100 text-amber-700 border-amber-200',
      Low: 'bg-emerald-100 text-emerald-700 border-emerald-200'
    };
    const colorClass = colors[severity as keyof typeof colors] || colors.Low;
    return (
      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider ${colorClass}`}>
        {severity} Risk
      </span>
    );
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <SectionHeader 
        title="AI Legal Auditor" 
        subtitle="Upload your reservation form or sales contract for an immediate advisory audit of clauses and risks." 
      />

      {!preview ? (
        <Card className="p-12 border-dashed border-2 flex flex-col items-center justify-center text-center hover:bg-slate-50 transition-colors cursor-pointer relative">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
          <div className="bg-slate-100 p-6 rounded-full mb-6">
            <Upload className="w-10 h-10 text-slate-400" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">Upload Document Image</h3>
          <p className="text-slate-500 max-w-sm">
            Please provide a clear photo of your contract page. We analyze specific clauses according to Egyptian Property Law.
          </p>
          <div className="mt-8 flex gap-4">
             <span className="text-xs text-slate-400 flex items-center gap-1"><Info className="w-3 h-3" /> Privacy protected</span>
             <span className="text-xs text-slate-400 flex items-center gap-1"><Info className="w-3 h-3" /> PNG/JPG supported</span>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-4">
            <Card className="p-2 sticky top-24">
              <img src={preview} alt="Contract Preview" className="w-full rounded-lg shadow-sm" />
              <button 
                onClick={reset}
                className="w-full mt-4 flex items-center justify-center gap-2 text-rose-600 font-bold py-2 hover:bg-rose-50 rounded-lg transition-all"
              >
                <Trash2 className="w-4 h-4" /> Clear & Rescan
              </button>
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-6">
            {loading ? (
              <LoadingState message="Auditing clauses and detecting legal risks..." />
            ) : result ? (
              <div className="space-y-6 animate-in fade-in duration-500">
                <Card className="p-6 bg-slate-900 text-white">
                  <div className="flex items-center gap-2 mb-4 font-bold text-lg">
                    <FileText className="w-5 h-5 text-amber-400" /> Executive Summary
                  </div>
                  <p className="text-slate-300 leading-relaxed italic">
                    "{result.summary}"
                  </p>
                </Card>

                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <ShieldAlert className="w-5 h-5 text-rose-500" /> Identified Risk Points
                  </h3>
                  {result.riskPoints.map((risk, idx) => (
                    <Card key={idx} className="p-6 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-bold text-slate-900">{risk.title}</h4>
                        <SeverityBadge severity={risk.severity} />
                      </div>
                      <p className="text-sm text-slate-600 mb-4 leading-relaxed">{risk.description}</p>
                      <div className="bg-slate-50 p-3 rounded-lg flex items-start gap-3 border border-slate-100">
                        <ArrowRight className="w-4 h-4 text-slate-400 mt-1" />
                        <div>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Recommended Action</p>
                          <p className="text-sm text-slate-900 font-medium">{risk.suggestedAction}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                <Card className="p-6">
                   <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2 mb-4">
                    <Scale className="w-5 h-5 text-blue-500" /> Clarity Notes
                  </h3>
                  <div className="prose prose-sm text-slate-600 leading-relaxed whitespace-pre-wrap">
                    {result.clarityNotes}
                  </div>
                </Card>

                <div className="p-4 bg-amber-50 rounded-xl border border-amber-100 flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
                  <p className="text-[11px] text-amber-800 leading-relaxed font-medium">
                    {result.disclaimer}
                  </p>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContractAuditor;
