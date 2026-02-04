
import React, { useState } from 'react';
import { 
  Sparkles, 
  FlaskConical, 
  ChevronDown, 
  Play, 
  AlertCircle,
  CheckCircle2,
  Clock,
  RefreshCw,
  // Added missing icon imports
  BrainCircuit,
  Target
} from 'lucide-react';
import { ExperimentRun, AiSuggestion } from '../types';
import { getAiOptimizationSuggestion } from '../services/geminiService';

const Experiments: React.FC<{ runs: ExperimentRun[]; onAddRun: (run: ExperimentRun) => void }> = ({ runs, onAddRun }) => {
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [suggestion, setSuggestion] = useState<AiSuggestion | null>(null);

  const handleGenerateSuggestion = async () => {
    setIsSuggesting(true);
    try {
      const result = await getAiOptimizationSuggestion(runs, "Maximize yield and titer while maintaining >95% viability");
      setSuggestion(result);
    } catch (err) {
      console.error("AI Generation failed", err);
    } finally {
      setIsSuggesting(false);
    }
  };

  const acceptSuggestion = (suggestedRun: any) => {
    const newRun: ExperimentRun = {
      id: `run-${Date.now()}`,
      round: (runs[runs.length - 1]?.round || 0) + 1,
      parameters: suggestedRun.parameters,
      status: 'planned',
      timestamp: new Date().toISOString()
    };
    onAddRun(newRun);
    setSuggestion(null);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Experiments</h2>
          <p className="text-slate-500 mt-1">Adaptive feedback loop for process development</p>
        </div>
        <button 
          onClick={handleGenerateSuggestion}
          disabled={isSuggesting}
          className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white rounded-xl font-bold shadow-lg shadow-indigo-200 transition-all hover:-translate-y-0.5"
        >
          {isSuggesting ? <RefreshCw className="animate-spin" size={20} /> : <Sparkles size={20} />}
          {isSuggesting ? 'Thinking...' : 'AI Design Next Round'}
        </button>
      </div>

      {suggestion && (
        <div className="bg-indigo-900 text-white p-8 rounded-2xl shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Sparkles size={120} />
          </div>
          <div className="relative z-10">
            <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
              <BrainCircuit className="text-indigo-300" />
              AI Adaptive Recommendation
            </h3>
            <p className="text-indigo-100 max-w-2xl mb-6 leading-relaxed">
              {suggestion.reasoning}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {suggestion.suggestedRuns.map((run, idx) => (
                <div key={idx} className="bg-white bg-opacity-10 border border-white border-opacity-10 rounded-xl p-5">
                  <h4 className="font-bold text-indigo-200 mb-3">Proposed Variant {idx + 1}</h4>
                  <ul className="text-sm space-y-2 text-indigo-50">
                    <li className="flex justify-between"><span>Media:</span> <span className="font-semibold">{run.parameters?.mediaType}</span></li>
                    <li className="flex justify-between"><span>Temp:</span> <span className="font-semibold">{run.parameters?.temperature}°C</span></li>
                    <li className="flex justify-between"><span>pH:</span> <span className="font-semibold">{run.parameters?.ph}</span></li>
                    <li className="flex justify-between"><span>DO:</span> <span className="font-semibold">{run.parameters?.dissolvedOxygen}%</span></li>
                  </ul>
                  <button 
                    onClick={() => acceptSuggestion(run)}
                    className="mt-4 w-full py-2 bg-indigo-500 hover:bg-indigo-400 text-white rounded-lg text-xs font-bold transition-colors"
                  >
                    Add to Pipeline
                  </button>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4 text-sm font-medium">
              <span className="flex items-center gap-2 text-indigo-300">
                <Target size={16} />
                Expected Gain: {suggestion.predictions.expectedYieldGain}
              </span>
              <span className="flex items-center gap-2 text-indigo-300">
                <CheckCircle2 size={16} />
                Confidence: {(suggestion.predictions.confidenceScore * 100).toFixed(0)}%
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Round</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Parameters</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Results (Yield/Purity)</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {[...runs].reverse().map((run) => (
              <tr key={run.id} className="hover:bg-slate-50 transition-colors group">
                <td className="px-6 py-5">
                  <span className="flex items-center gap-2 font-bold text-slate-900">
                    <FlaskConical size={14} className="text-slate-400" />
                    Round {run.round}
                  </span>
                </td>
                <td className="px-6 py-5">
                  <div className="text-xs text-slate-500 space-y-0.5">
                    <p><span className="font-medium text-slate-700">Media:</span> {run.parameters.mediaType}</p>
                    <p><span className="font-medium text-slate-700">Temp:</span> {run.parameters.temperature}°C / pH: {run.parameters.ph}</p>
                  </div>
                </td>
                <td className="px-6 py-5">
                  {run.results ? (
                    <div className="flex items-center gap-3">
                      <div className="text-sm">
                        <span className="font-bold text-indigo-600">{run.results.yield}g/L</span>
                        <span className="mx-2 text-slate-300">|</span>
                        <span className="text-slate-600 font-medium">{run.results.purity}%</span>
                      </div>
                    </div>
                  ) : (
                    <span className="text-slate-400 italic text-xs">Waiting for data...</span>
                  )}
                </td>
                <td className="px-6 py-5">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    run.status === 'completed' 
                      ? 'bg-emerald-100 text-emerald-700' 
                      : run.status === 'in-progress' 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'bg-slate-100 text-slate-600'
                  }`}>
                    {run.status === 'completed' && <CheckCircle2 size={12} />}
                    {run.status === 'in-progress' && <Clock size={12} />}
                    {run.status === 'planned' && <AlertCircle size={12} />}
                    {run.status}
                  </span>
                </td>
                <td className="px-6 py-5 text-sm text-slate-500">
                  {new Date(run.timestamp).toLocaleDateString()}
                </td>
                <td className="px-6 py-5 text-right">
                  <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all opacity-0 group-hover:opacity-100">
                    <ChevronDown size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Experiments;
