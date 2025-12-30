
import React, { useRef, useState, useEffect } from 'react';
import { Card, SectionHeader } from '../components/SharedUI';
import { UserLead, UserStatus } from '../types';
import { Users, CheckCircle, Clock, Trash2, Download, Upload, Zap, AlertTriangle, Activity, ShieldCheck, Mail, Phone } from 'lucide-react';

interface AdminPanelProps {
  leads: UserLead[];
  onUpdateStatus: (id: string, status: UserStatus) => void;
  onDeleteLead: (id: string) => void;
  onActivate: (id: string) => void;
  onImportLeads: (leads: UserLead[]) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ leads, onDeleteLead, onActivate, onImportLeads }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [quickImportData, setQuickImportData] = useState('');
  const [importError, setImportError] = useState(false);

  const handleQuickImport = () => {
    try {
      const trimmed = quickImportData.trim();
      if (!trimmed) return;
      
      const decodedStr = decodeURIComponent(escape(atob(trimmed)));
      const decoded = JSON.parse(decodedStr);
      
      if (decoded && (decoded.email || decoded.phone)) {
        const exists = leads.some(l => l.email.toLowerCase() === decoded.email.toLowerCase());
        if (exists) {
          alert("Entity already in registry. Proceeding to update/re-import.");
          onImportLeads([...leads.filter(l => l.email.toLowerCase() !== decoded.email.toLowerCase()), decoded]);
        } else {
          onImportLeads([...leads, decoded]);
        }
        setQuickImportData('');
        setImportError(false);
      } else { throw new Error(); }
    } catch (e) {
      setImportError(true);
      setTimeout(() => setImportError(false), 3000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-24 space-y-12 animate-in fade-in duration-700">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
        <SectionHeader title="System Authority" subtitle="Manage high-value registries and approve 24-hour access windows." />
        <div className="flex gap-4">
           <button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-2 bg-white border border-slate-200 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all">
             <Upload className="w-4 h-4" /> Import DB
           </button>
           <button onClick={() => {
              const data = JSON.stringify(leads, null, 2);
              const blob = new Blob([data], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const link = document.createElement('a');
              link.href = url;
              link.download = `registry_${new Date().toISOString().split('T')[0]}.json`;
              link.click();
           }} className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all">
             <Download className="w-4 h-4" /> Export DB
           </button>
           <input type="file" ref={fileInputRef} className="hidden" onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              const reader = new FileReader();
              reader.onload = (ev) => {
                try { onImportLeads(JSON.parse(ev.target?.result as string)); } catch (err) { alert("Invalid File"); }
              };
              reader.readAsText(file);
           }} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-8 bg-slate-900 text-white flex flex-col justify-between h-40">
           <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Total Registry</p>
           <p className="text-5xl font-serif font-bold">{leads.length}</p>
        </Card>
        <Card className="p-8 bg-white border-slate-100 flex flex-col justify-between h-40">
           <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Pending Audits</p>
           <p className="text-5xl font-serif font-bold text-amber-600">{leads.filter(l => l.status === UserStatus.PENDING).length}</p>
        </Card>
        <Card className="p-8 bg-emerald-50 border-emerald-100 flex flex-col justify-between h-40">
           <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Active Windows</p>
           <p className="text-5xl font-serif font-bold text-emerald-700">{leads.filter(l => l.status === UserStatus.PAID).length}</p>
        </Card>
      </div>

      <Card className="p-10 bg-slate-50 border-slate-200">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-4">
             <h3 className="text-xl font-serif font-bold text-slate-900 mb-2">Cross-Device Sync</h3>
             <p className="text-sm text-slate-500 font-light">Paste the client's verification payload to import their record instantly.</p>
          </div>
          <div className="lg:col-span-8 flex flex-col sm:flex-row gap-4">
             <input 
               type="text" 
               className={`flex-1 bg-white border ${importError ? 'border-rose-500 animate-shake' : 'border-slate-200'} rounded-2xl px-6 py-4 text-xs font-mono outline-none focus:ring-2 focus:ring-slate-900`}
               placeholder="Paste payload here..."
               value={quickImportData}
               onChange={(e) => setQuickImportData(e.target.value)}
             />
             <button onClick={handleQuickImport} className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-800 transition-all">
                Import Client
             </button>
          </div>
        </div>
      </Card>

      <Card className="overflow-hidden border-slate-100 shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Client Info</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Profile</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {leads.sort((a,b) => b.createdAt - a.createdAt).map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-6">
                    <p className="font-bold text-slate-900">{lead.fullName}</p>
                    <div className="flex flex-col text-[11px] text-slate-500 mt-1">
                       <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {lead.email}</span>
                       <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {lead.phone}</span>
                    </div>
                  </td>
                  <td className="p-6">
                    <p className="text-sm font-medium text-slate-700">{lead.propertyType} in {lead.city}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{lead.budgetRange}</p>
                  </td>
                  <td className="p-6">
                    <span className={`text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest border ${
                      lead.status === UserStatus.PAID ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                      lead.status === UserStatus.PENDING ? 'bg-amber-50 text-amber-700 border-amber-100' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {lead.status}
                    </span>
                    {lead.status === UserStatus.PAID && lead.activatedAt && (
                       <p className="text-[9px] text-slate-400 mt-1 font-bold">Expires: {new Date(lead.activatedAt + 86400000).toLocaleTimeString()}</p>
                    )}
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-3">
                      {lead.status !== UserStatus.PAID && (
                        <button onClick={() => onActivate(lead.id)} className="bg-emerald-600 text-white p-2.5 rounded-xl hover:bg-emerald-700 shadow-md">
                          <ShieldCheck className="w-5 h-5" />
                        </button>
                      )}
                      <button onClick={() => { if(window.confirm("Purge record?")) onDeleteLead(lead.id); }} className="bg-slate-100 text-slate-400 p-2.5 rounded-xl hover:bg-rose-50 hover:text-rose-600 transition-all">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default AdminPanel;
