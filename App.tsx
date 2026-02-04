
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  FlaskConical, 
  BarChart3, 
  Settings, 
  Plus, 
  ChevronRight,
  Zap,
  Clock,
  DollarSign,
  TrendingUp,
  BrainCircuit,
  Database
} from 'lucide-react';
import Dashboard from './components/Dashboard';
import Experiments from './components/Experiments';
import Analysis from './components/Analysis';
import { ExperimentRun } from './types';

const INITIAL_RUNS: ExperimentRun[] = [
  {
    id: 'run-1',
    round: 1,
    parameters: { mediaType: 'Standard A', temperature: 37, ph: 7.2, dissolvedOxygen: 40, glucoseFeedRate: 1.5 },
    results: { yield: 1.2, purity: 85, titer: 0.8, viability: 92 },
    status: 'completed',
    timestamp: '2024-03-01T10:00:00Z'
  },
  {
    id: 'run-2',
    round: 1,
    parameters: { mediaType: 'Standard B', temperature: 37, ph: 7.4, dissolvedOxygen: 45, glucoseFeedRate: 1.2 },
    results: { yield: 1.5, purity: 88, titer: 1.1, viability: 94 },
    status: 'completed',
    timestamp: '2024-03-02T10:00:00Z'
  },
  {
    id: 'run-3',
    round: 2,
    parameters: { mediaType: 'Optimized V1', temperature: 36.5, ph: 7.1, dissolvedOxygen: 50, glucoseFeedRate: 2.0 },
    results: { yield: 3.8, purity: 92, titer: 2.8, viability: 96 },
    status: 'completed',
    timestamp: '2024-03-10T10:00:00Z'
  }
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'experiments' | 'analysis'>('dashboard');
  const [runs, setRuns] = useState<ExperimentRun[]>(INITIAL_RUNS);

  const addRun = (newRun: ExperimentRun) => {
    setRuns(prev => [...prev, newRun]);
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <div className="bg-indigo-600 p-2 rounded-lg text-white">
              <BrainCircuit size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-indigo-900 leading-none">AccelBio</h1>
              <span className="text-[10px] uppercase tracking-widest text-indigo-500 font-semibold">Adaptive AI Engine</span>
            </div>
          </div>

          <nav className="space-y-1">
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'dashboard' ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              <LayoutDashboard size={20} />
              Dashboard
            </button>
            <button 
              onClick={() => setActiveTab('experiments')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'experiments' ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              <FlaskConical size={20} />
              Experiments
            </button>
            <button 
              onClick={() => setActiveTab('analysis')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'analysis' ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-slate-500 hover:bg-slate-50'}`}
            >
              <BarChart3 size={20} />
              Analytics
            </button>
          </nav>
        </div>

        <div className="mt-auto p-6 border-t border-slate-200">
          <div className="bg-slate-50 rounded-xl p-4 mb-4">
            <p className="text-xs text-slate-500 mb-2">Usage Credits</p>
            <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full w-2/3 bg-indigo-500"></div>
            </div>
            <p className="text-[10px] mt-1 text-slate-400">840 / 1200 used</p>
          </div>
          <button className="flex items-center gap-3 text-slate-500 hover:text-slate-700 w-full px-4">
            <Settings size={20} />
            Settings
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <span>Project</span>
            <ChevronRight size={14} />
            <span className="text-slate-900 font-medium">Plasmid Rescue Alpha</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex -space-x-2">
              {[1, 2, 3].map(i => (
                <img key={i} className="w-8 h-8 rounded-full border-2 border-white" src={`https://picsum.photos/seed/${i + 10}/32/32`} alt="user" />
              ))}
            </div>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all">
              <Plus size={18} />
              New Experiment
            </button>
          </div>
        </header>

        <div className="p-8">
          {activeTab === 'dashboard' && <Dashboard runs={runs} />}
          {activeTab === 'experiments' && <Experiments runs={runs} onAddRun={addRun} />}
          {activeTab === 'analysis' && <Analysis runs={runs} />}
        </div>
      </main>
    </div>
  );
};

export default App;
