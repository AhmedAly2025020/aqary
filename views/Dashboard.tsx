
import React from 'react';
import { Card, SectionHeader } from '../components/SharedUI';
import { ShieldCheck, BarChart3, TrendingDown, HelpCircle, MapPin, Building2, UserCheck } from 'lucide-react';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <section className="relative h-[300px] rounded-2xl overflow-hidden mb-12 flex items-center px-8 sm:px-12 bg-slate-900">
        <div className="absolute inset-0 opacity-20">
          <img src="https://picsum.photos/seed/egypt-estate/1600/600" alt="Cairo Sky" className="w-full h-full object-cover grayscale" />
        </div>
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white mb-4">Invest with Confidence.</h1>
          <p className="text-slate-300 text-lg sm:text-xl leading-relaxed">
            The first neutral, data-driven authority for Egyptian real estate. We strip away the marketing hype to give you the cold, hard truth.
          </p>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-amber-50 border-amber-100">
          <div className="bg-amber-100 w-10 h-10 rounded-lg flex items-center justify-center mb-4">
            <TrendingDown className="text-amber-700 w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg text-amber-900 mb-2">Avoid Overpaying</h3>
          <p className="text-amber-800/80 text-sm">Egyptian buyers overpay by 20-40% on average due to lack of transparent pricing. Our engine benchmarks 10,000+ data points.</p>
        </Card>
        
        <Card className="p-6 bg-blue-50 border-blue-100">
          <div className="bg-blue-100 w-10 h-10 rounded-lg flex items-center justify-center mb-4">
            <UserCheck className="text-blue-700 w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg text-blue-900 mb-2">Verify Developers</h3>
          <p className="text-blue-800/80 text-sm">Don't risk your savings on unproven names. We score the top 50 developers based on delivery history and spec adherence.</p>
        </Card>

        <Card className="p-6 bg-emerald-50 border-emerald-100">
          <div className="bg-emerald-100 w-10 h-10 rounded-lg flex items-center justify-center mb-4">
            <BarChart3 className="text-emerald-700 w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg text-emerald-900 mb-2">Predict Resale</h3>
          <p className="text-emerald-800/80 text-sm">Understand your exit strategy before you enter. Our simulator predicts capital appreciation and rental yield trends.</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
        <div>
          <SectionHeader title="Hot Districts Analysis" subtitle="Current market sentiment across Egypt's prime locations." />
          <div className="space-y-4">
            {[
              { name: "New Administrative Capital", status: "Neutral", trend: "Up", price: "24k - 38k EGP/m²" },
              { name: "New Cairo (Golden Square)", status: "Overheated", trend: "High", price: "45k - 70k EGP/m²" },
              { name: "Sheikh Zayed (October)", status: "Fair Value", trend: "Steady", price: "28k - 55k EGP/m²" },
              { name: "Mostakbal City", status: "Undervalued", trend: "Medium", price: "18k - 26k EGP/m²" }
            ].map((d) => (
              <div key={d.name} className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-xl hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3">
                  <MapPin className="text-slate-400 w-5 h-5" />
                  <div>
                    <p className="font-semibold text-slate-900">{d.name}</p>
                    <p className="text-xs text-slate-500">{d.price}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                    d.status === 'Undervalued' ? 'bg-emerald-100 text-emerald-700' : 
                    d.status === 'Overheated' ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {d.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <SectionHeader title="Top Verified Developers" subtitle="Highest trust ratings based on historical performance." />
          <div className="space-y-4">
            {[
              { name: "Sodic", score: 94, projects: 12 },
              { name: "Emaar Misr", score: 92, projects: 8 },
              { name: "Mountain View", score: 88, projects: 15 },
              { name: "Palm Hills", score: 85, projects: 22 }
            ].map((dev) => (
              <div key={dev.name} className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-xl">
                <div className="flex items-center gap-3">
                  <Building2 className="text-slate-400 w-5 h-5" />
                  <div>
                    <p className="font-semibold text-slate-900">{dev.name}</p>
                    <p className="text-xs text-slate-500">{dev.projects} Delivered Projects</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-slate-900">{dev.score}</span>
                  <div className="w-12 h-1 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-slate-900" style={{ width: `${dev.score}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
