
import React from 'react';
import { 
  TrendingUp, 
  Clock, 
  DollarSign, 
  Zap,
  Target,
  ArrowUpRight,
  // Added missing icon imports
  Database,
  FlaskConical
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { ExperimentRun } from '../types';

const DashboardCard: React.FC<{ title: string; value: string; icon: React.ReactNode; trend: string; color: string }> = ({ title, value, icon, trend, color }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-2 rounded-xl bg-opacity-10 ${color}`}>
        {icon}
      </div>
      <span className="flex items-center text-emerald-600 text-sm font-medium">
        {trend} <ArrowUpRight size={14} className="ml-1" />
      </span>
    </div>
    <h3 className="text-slate-500 text-sm font-medium mb-1">{title}</h3>
    <p className="text-2xl font-bold text-slate-900">{value}</p>
  </div>
);

const Dashboard: React.FC<{ runs: ExperimentRun[] }> = ({ runs }) => {
  const chartData = runs.map((r, i) => ({
    name: `Run ${i + 1}`,
    yield: r.results?.yield || 0,
    purity: r.results?.purity || 0,
  }));

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Optimization Overview</h2>
          <p className="text-slate-500 mt-1">Real-time performance metrics for Plasmid Rescue Alpha</p>
        </div>
        <div className="flex gap-2">
            <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">Adaptive Mode Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard 
          title="Yield Improvement" 
          value="6.2x" 
          icon={<TrendingUp className="text-indigo-600" />} 
          trend="+12%" 
          color="bg-indigo-600" 
        />
        <DashboardCard 
          title="Time to Optimize" 
          value="3.5 Weeks" 
          icon={<Clock className="text-blue-600" />} 
          trend="-70%" 
          color="bg-blue-600" 
        />
        <DashboardCard 
          title="Cost Reduction" 
          value="$142,000" 
          icon={<DollarSign className="text-emerald-600" />} 
          trend="+22%" 
          color="bg-emerald-600" 
        />
        <DashboardCard 
          title="Exp. Efficiency" 
          value="82%" 
          icon={<Zap className="text-amber-600" />} 
          trend="+5%" 
          color="bg-amber-600" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-900">Yield Convergence Trend</h3>
            <div className="flex gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-indigo-500 rounded-full"></span>
                <span>Active Optimization</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-slate-200 rounded-full"></span>
                <span>Baseline</span>
              </div>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorYield" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Area type="monotone" dataKey="yield" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorYield)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Process Milestones</h3>
          <div className="space-y-6 flex-1">
            {[
              { label: 'Media Screening', status: 'Completed', date: 'Mar 10', icon: <Database size={16}/> },
              { label: 'Fed-batch Optimization', status: 'In Progress', date: 'Estimated Mar 25', icon: <FlaskConical size={16}/> },
              { label: 'Scale-up Validation', status: 'Upcoming', date: 'Apr 02', icon: <Target size={16}/> }
            ].map((milestone, idx) => (
              <div key={idx} className="flex gap-4">
                <div className={`mt-1 p-2 rounded-full ${milestone.status === 'Completed' ? 'bg-emerald-100 text-emerald-600' : milestone.status === 'In Progress' ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-400'}`}>
                  {milestone.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 text-sm leading-tight">{milestone.label}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${milestone.status === 'Completed' ? 'text-emerald-500' : milestone.status === 'In Progress' ? 'text-indigo-500' : 'text-slate-400'}`}>
                      {milestone.status}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="text-[10px] text-slate-400 font-medium">{milestone.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-8 w-full py-3 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl font-medium text-sm transition-colors border border-slate-200">
            View Full Timeline
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
