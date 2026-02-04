
import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend,
  ScatterChart,
  Scatter,
  ZAxis
} from 'recharts';
import { ExperimentRun } from '../types';

const Analysis: React.FC<{ runs: ExperimentRun[] }> = ({ runs }) => {
  const yieldData = runs.filter(r => r.results).map((r, i) => ({
    name: `Run ${i + 1}`,
    yield: r.results?.yield,
    purity: r.results?.purity,
    round: r.round
  }));

  const scatterData = runs.filter(r => r.results).map((r) => ({
    x: r.parameters.ph,
    y: r.results?.yield,
    z: r.results?.purity,
    name: r.id
  }));

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-3xl font-bold text-slate-900">Analytics Deep Dive</h2>
        <p className="text-slate-500 mt-1">Multi-objective correlation and performance analysis</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Fold Improvement by Round</h3>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={yieldData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                   cursor={{fill: '#f8fafc'}}
                   contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Legend iconType="circle" />
                <Bar dataKey="yield" fill="#6366f1" radius={[4, 4, 0, 0]} name="Yield (g/L)" barSize={32} />
                <Bar dataKey="purity" fill="#94a3b8" radius={[4, 4, 0, 0]} name="Purity (%)" barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Yield vs pH Distribution</h3>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis type="number" dataKey="x" name="pH" domain={[6.5, 8]} unit="" axisLine={false} tickLine={false} label={{ value: 'pH Level', position: 'bottom', offset: 0 }} />
                <YAxis type="number" dataKey="y" name="Yield" unit="g/L" axisLine={false} tickLine={false} label={{ value: 'Yield (g/L)', angle: -90, position: 'insideLeft' }} />
                <ZAxis type="number" dataKey="z" range={[60, 400]} name="Purity" unit="%" />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter name="Runs" data={scatterData} fill="#6366f1" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-6">AccelBio vs Traditional DOE</h3>
        <div className="overflow-hidden rounded-xl border border-slate-100">
           <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50">
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Metric</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Traditional DOE</th>
                  <th className="px-6 py-4 text-xs font-bold text-indigo-600 uppercase">AccelBio AI</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="px-6 py-4 font-semibold text-slate-900">Experiments Needed</td>
                  <td className="px-6 py-4 text-slate-500">80 - 120 runs</td>
                  <td className="px-6 py-4 text-indigo-700 font-bold bg-indigo-50 bg-opacity-30">15 - 24 runs</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-semibold text-slate-900">Time to Completion</td>
                  <td className="px-6 py-4 text-slate-500">6 - 9 Months</td>
                  <td className="px-6 py-4 text-indigo-700 font-bold bg-indigo-50 bg-opacity-30">4 - 6 Weeks</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-semibold text-slate-900">Resource Utilization</td>
                  <td className="px-6 py-4 text-slate-500">400+ Manual Hours</td>
                  <td className="px-6 py-4 text-indigo-700 font-bold bg-indigo-50 bg-opacity-30">&lt;60 AI-Assisted Hours</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-semibold text-slate-900">Yield Optimization</td>
                  <td className="px-6 py-4 text-slate-500">~1.2x Improvement</td>
                  <td className="px-6 py-4 text-indigo-700 font-bold bg-indigo-50 bg-opacity-30">5x - 10x Improvement</td>
                </tr>
              </tbody>
           </table>
        </div>
      </div>
    </div>
  );
};

export default Analysis;
