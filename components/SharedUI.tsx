
import React from 'react';
import { GroundingSource } from '../types';
import { ExternalLink, Sparkles } from 'lucide-react';

export const Card: React.FC<React.HTMLAttributes<HTMLDivElement> & { children: React.ReactNode }> = ({ children, className = "", ...props }) => (
  <div 
    className={`bg-white rounded-[2.5rem] shadow-luxury border border-slate-200/40 overflow-hidden transition-all duration-700 ${className}`}
    {...props}
  >
    {children}
  </div>
);

export const SectionHeader: React.FC<{ title: string; subtitle?: string; light?: boolean }> = ({ title, subtitle, light }) => (
  <div className="mb-20 text-center max-w-4xl mx-auto space-y-6">
    <h2 className={`text-5xl md:text-7xl font-serif font-bold ${light ? 'text-white' : 'text-slate-900'} leading-tight tracking-tight text-balance`}>{title}</h2>
    {subtitle && <p className={`text-xl md:text-2xl ${light ? 'text-slate-400' : 'text-slate-500'} font-light leading-relaxed italic text-balance`}>{subtitle}</p>}
  </div>
);

export const SourceList: React.FC<{ sources: GroundingSource[] }> = ({ sources }) => {
  if (!sources || sources.length === 0) return null;
  return (
    <div className="mt-16 pt-16 border-t border-slate-200/60">
      <div className="flex items-center gap-3 mb-10">
         <Sparkles className="w-4 h-4 text-[#C5A059]" />
         <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.5em]">Independent Verification Data</p>
      </div>
      <div className="flex flex-wrap gap-6">
        {sources.map((source, idx) => (
          <a
            key={idx}
            href={source.uri}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 text-[11px] font-bold text-slate-600 bg-white border border-slate-200/60 hover:border-[#C5A059] hover:text-[#C5A059] hover:shadow-xl px-8 py-4 rounded-full transition-all max-w-[350px] truncate group shadow-sm"
          >
            <ExternalLink className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
            {source.title || source.uri}
          </a>
        ))}
      </div>
    </div>
  );
};

export const LoadingState: React.FC<{ message?: string }> = ({ message = "Just a moment, we're looking into this for you..." }) => (
  <div className="flex flex-col items-center justify-center py-32 space-y-12 animate-in fade-in duration-500">
    <div className="relative">
      <div className="w-32 h-32 border-2 border-slate-100 rounded-full"></div>
      <div className="w-32 h-32 border-2 border-[#C5A059] border-t-transparent rounded-full animate-spin absolute top-0"></div>
      <div className="absolute inset-0 flex items-center justify-center">
         <div className="w-3 h-3 bg-slate-900 rounded-full animate-ping"></div>
      </div>
    </div>
    <div className="space-y-4 text-center">
       <p className="text-slate-900 text-[12px] font-black uppercase tracking-[0.6em] animate-pulse max-w-xs mx-auto leading-relaxed">{message}</p>
       <p className="text-slate-400 text-[10px] font-medium italic">Scanning global news, legal gazettes, and secondary market transfers.</p>
    </div>
  </div>
);
