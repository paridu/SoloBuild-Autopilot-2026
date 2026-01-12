
import React, { useState, useEffect } from 'react';
import { 
  Rocket, 
  BrainCircuit, 
  LayoutDashboard, 
  Terminal, 
  CheckCircle2, 
  Zap,
  Target,
  DollarSign,
  Send,
  Loader2,
  TrendingUp,
  ShieldCheck,
  Code2,
  FileText,
  MessageSquare
} from 'lucide-react';
import { Phase, ProjectState } from './types';
import { geminiService } from './services/geminiService';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'autopilot'>('dashboard');
  const [project, setProject] = useState<ProjectState>({
    id: '1',
    name: 'Stealth Project',
    targetAudience: 'Early-stage SaaS founders',
    painPoint: 'High churn due to complex onboarding',
    solution10x: 'AI-driven personalized onboarding agent',
    paymentReadiness: 7,
    currentPhase: Phase.PHASE1_BUSINESS,
    stack: ['Next.js', 'Supabase', 'Stripe', 'Tailwind'],
    notes: ''
  });

  const [autopilotLog, setAutopilotLog] = useState<{role: 'user' | 'assistant', content: string}[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleRunAutopilot = async () => {
    if (!userInput.trim()) return;
    setIsProcessing(true);
    const query = userInput;
    setUserInput('');
    
    setAutopilotLog(prev => [...prev, { role: 'user', content: query }]);
    
    const result = await geminiService.runAutopilot(project, query);
    setAutopilotLog(prev => [...prev, { role: 'assistant', content: result }]);
    setIsProcessing(false);
  };

  const renderDashboard = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-xl border-l-4 border-blue-500">
          <div className="flex items-center gap-2 text-blue-400 mb-2">
            <Target size={18} />
            <h3 className="text-xs font-bold uppercase tracking-wider">Pain Score</h3>
          </div>
          <p className="text-2xl font-bold">9.2/10</p>
          <p className="text-[10px] text-gray-500 mt-1">Critical Market Gap Detected</p>
        </div>
        <div className="glass-panel p-5 rounded-xl border-l-4 border-green-500">
          <div className="flex items-center gap-2 text-green-400 mb-2">
            <DollarSign size={18} />
            <h3 className="text-xs font-bold uppercase tracking-wider">Pay Readiness</h3>
          </div>
          <p className="text-2xl font-bold">{project.paymentReadiness}/10</p>
          <p className="text-[10px] text-gray-500 mt-1">Willingness to pay confirmed</p>
        </div>
        <div className="glass-panel p-5 rounded-xl border-l-4 border-purple-500">
          <div className="flex items-center gap-2 text-purple-400 mb-2">
            <TrendingUp size={18} />
            <h3 className="text-xs font-bold uppercase tracking-wider">10x Potential</h3>
          </div>
          <p className="text-2xl font-bold text-white">Verified</p>
          <p className="text-[10px] text-gray-500 mt-1">Significant advantage vs rivals</p>
        </div>
        <div className="glass-panel p-5 rounded-xl border-l-4 border-orange-500">
          <div className="flex items-center gap-2 text-orange-400 mb-2">
            <Zap size={18} />
            <h3 className="text-xs font-bold uppercase tracking-wider">V1 Status</h3>
          </div>
          <p className="text-2xl font-bold">In Design</p>
          <p className="text-[10px] text-gray-500 mt-1">Core feature lock needed</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-panel p-6 rounded-2xl">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <Rocket size={20} className="text-blue-500" />
            2026 Solo Builder Roadmap
          </h3>
          <div className="space-y-4">
            {Object.values(Phase).map((p, idx) => (
              <div 
                key={p} 
                className={`flex items-center gap-4 p-3 rounded-xl transition-all ${project.currentPhase === p ? 'bg-blue-600/10 border border-blue-500/30' : 'opacity-40'}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${project.currentPhase === p ? 'bg-blue-600 text-white shadow-lg shadow-blue-900' : 'bg-gray-800 text-gray-500'}`}>
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-sm">{p}</span>
                    {project.currentPhase === p && <span className="text-[10px] bg-blue-500 text-white px-2 py-0.5 rounded-full uppercase">Active</span>}
                  </div>
                </div>
                {idx < Object.values(Phase).indexOf(project.currentPhase) ? (
                  <CheckCircle2 size={18} className="text-green-500" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-gray-700"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-2xl">
            <h3 className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-widest">Project Identity</h3>
            <div className="space-y-4">
              <div>
                <label className="text-[10px] text-gray-500 block mb-1 uppercase">App Name</label>
                <input 
                  className="w-full bg-black/40 border border-gray-800 rounded-lg p-2 text-sm focus:border-blue-500 outline-none"
                  value={project.name}
                  onChange={(e) => setProject({...project, name: e.target.value})}
                />
              </div>
              <div>
                <label className="text-[10px] text-gray-500 block mb-1 uppercase">Target Audience</label>
                <textarea 
                  className="w-full bg-black/40 border border-gray-800 rounded-lg p-2 text-sm focus:border-blue-500 outline-none h-20 resize-none"
                  value={project.targetAudience}
                  onChange={(e) => setProject({...project, targetAudience: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl bg-gradient-to-br from-gray-900 to-black">
            <h3 className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-widest">Recommended 2026 Stack</h3>
            <div className="flex flex-wrap gap-2">
              {['Next.js', 'Edge Functions', 'Supabase', 'Stripe', 'Vercel'].map(item => (
                <span key={item} className="px-3 py-1 bg-gray-800 rounded-lg text-[10px] font-mono border border-gray-700 text-gray-300">
                  {item}
                </span>
              ))}
            </div>
            <p className="text-[10px] text-gray-500 mt-4 italic">"Changing stack = losing momentum. Stick to the speed-optimized defaults."</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAutopilot = () => (
    <div className="flex flex-col h-[calc(100vh-14rem)] glass-panel rounded-2xl overflow-hidden border border-gray-800 animate-in slide-in-from-bottom-4 duration-500">
      {/* Terminal Header */}
      <div className="bg-black/60 p-4 border-b border-gray-800 flex justify-between items-center">
        <div className="flex items-center gap-6">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 bg-red-500/20 border border-red-500/50 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500/20 border border-yellow-500/50 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500/20 border border-green-500/50 rounded-full"></div>
          </div>
          <div className="flex gap-4">
             <div className="flex items-center gap-1.5 text-[10px] font-bold text-blue-400">
              <BrainCircuit size={14} /> ARCHITECT
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-green-400">
              <Zap size={14} /> BUILDER
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-orange-400">
              <ShieldCheck size={14} /> JANITOR
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-purple-400">
              <FileText size={14} /> DOCS
            </div>
          </div>
        </div>
        <span className="text-[10px] font-mono text-gray-600">KERNEL_V2.0.26_STABLE</span>
      </div>
      
      {/* Log Feed */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 font-mono text-sm bg-black/40">
        {autopilotLog.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-gray-600 space-y-4">
            <div className="p-4 bg-gray-900 rounded-full">
              <MessageSquare size={48} className="opacity-20" />
            </div>
            <p className="text-center max-w-sm">
              Ready for instructions. Ask about system design, code implementation, or business strategy evaluation.
            </p>
          </div>
        )}
        {autopilotLog.map((log, i) => (
          <div key={i} className={`flex gap-4 ${log.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[90%] p-4 rounded-2xl ${
              log.role === 'user' 
                ? 'bg-blue-600/10 border border-blue-500/30 text-blue-100 rounded-tr-none' 
                : 'bg-gray-800/40 border border-gray-700 text-gray-200 rounded-tl-none prose prose-invert prose-sm'
            }`}>
              {log.role === 'assistant' ? (
                <div dangerouslySetInnerHTML={{ __html: log.content.replace(/\n/g, '<br/>') }} />
              ) : (
                log.content
              )}
            </div>
          </div>
        ))}
        {isProcessing && (
          <div className="flex items-center gap-3 text-blue-400 animate-pulse font-bold text-xs">
            <Loader2 className="animate-spin" size={16} />
            AGENTS COLLABORATING IN MULTI-MODAL WORKSPACE...
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-black/60 border-t border-gray-800">
        <div className="flex gap-2 max-w-4xl mx-auto">
          <input 
            className="flex-1 bg-gray-950 border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500 text-sm font-mono placeholder:text-gray-700"
            placeholder="[root@autopilot ~]# command agents..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleRunAutopilot()}
          />
          <button 
            disabled={isProcessing}
            onClick={handleRunAutopilot}
            className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white px-6 py-3 rounded-xl transition-all flex items-center gap-2 font-bold"
          >
            {isProcessing ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
            EXEC
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#030712] text-gray-200 flex flex-col font-sans selection:bg-blue-500/30">
      <header className="border-b border-gray-900 bg-[#030712]/80 backdrop-blur-xl sticky top-0 z-[100]">
        <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-xl shadow-lg shadow-blue-900/20">
              <Rocket size={22} className="text-white" />
            </div>
            <div>
              <span className="font-black text-xl tracking-tighter uppercase italic">SoloBuild <span className="text-blue-500">2026</span></span>
              <div className="flex items-center gap-1 text-[8px] font-bold text-gray-600 tracking-widest uppercase mt-0.5">
                <span className="w-1 h-1 bg-green-500 rounded-full"></span> Autopilot Active
              </div>
            </div>
          </div>
          
          <nav className="flex items-center gap-1">
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${activeTab === 'dashboard' ? 'bg-white text-black shadow-lg' : 'text-gray-500 hover:text-white'}`}
            >
              <LayoutDashboard size={16} /> DASHBOARD
            </button>
            <button 
              onClick={() => setActiveTab('autopilot')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${activeTab === 'autopilot' ? 'bg-white text-black shadow-lg' : 'text-gray-500 hover:text-white'}`}
            >
              <Terminal size={16} /> AUTOPILOT
            </button>
          </nav>

          <div className="hidden lg:flex items-center gap-6">
            <div className="text-right">
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">Current Session</p>
              <p className="text-xs font-mono text-blue-400">04:22:15</p>
            </div>
            <div className="w-px h-8 bg-gray-800"></div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-xs font-bold border border-gray-700">JS</div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-10">
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black tracking-tighter mb-2 italic">
              {activeTab === 'dashboard' ? 'SYSTEM_OVERVIEW' : 'AGENT_CONSOLE'}
            </h1>
            <p className="text-gray-500 text-sm max-w-2xl font-medium">
              {activeTab === 'dashboard' 
                ? 'Strategic tracking of product lifecycle based on the 2026 Solo Builder Playbook.' 
                : 'Direct access to the autonomous architect-builder cluster for accelerated V1 development.'}
            </p>
          </div>
          {activeTab === 'dashboard' && (
            <div className="flex gap-2">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-blue-500 transition-all flex items-center gap-2">
                <Zap size={14} /> OPTIMIZE PROJECT
              </button>
            </div>
          )}
        </div>

        {activeTab === 'dashboard' ? renderDashboard() : renderAutopilot()}
      </main>

      <footer className="border-t border-gray-900 bg-black/40 p-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Protocol 2026.4.1</span>
            <div className="flex gap-4">
              <a href="#" className="text-[10px] text-gray-400 hover:text-white transition-colors">Documentation</a>
              <a href="#" className="text-[10px] text-gray-400 hover:text-white transition-colors">Architectural Specs</a>
              <a href="#" className="text-[10px] text-gray-400 hover:text-white transition-colors">API Status</a>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-900/50 rounded-lg border border-gray-800">
             <Code2 size={12} className="text-blue-500" />
             <span className="text-[10px] font-mono text-gray-500">SYSTEM: ONLINE_READY_FOR_DEPLOY</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
