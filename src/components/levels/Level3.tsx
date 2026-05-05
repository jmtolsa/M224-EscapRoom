import { useState } from 'react';
import { motion } from 'motion/react';
import { Globe, Link2, CheckCircle2, ChevronRight, Server, Search, AlertCircle } from 'lucide-react';
import { GAME_DATA } from '../../data/gameData';

interface LevelProps {
  onComplete: (points: number) => void;
  addLog: (msg: string) => void;
}

export default function Level3({ onComplete, addLog }: LevelProps) {
  const data = GAME_DATA[2];
  const mappings = data.task.mappings as { name: string, ip: string }[];
  
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [error, setError] = useState(false);

  const handleSelection = (name: string, ip: string) => {
    setSelections(prev => ({ ...prev, [name]: ip }));
    setError(false);
  };

  const validate = () => {
    const isComplete = mappings.every(m => selections[m.name] === m.ip);
    const allAnswered = Object.keys(selections).length === mappings.length;

    if (isComplete && allAnswered) {
      addLog('Resolució DNS configurada. El trànsit comença a fluir.');
      setShowExplanation(true);
    } else {
      setError(true);
      addLog('ERR: Error de mappig DNS. El nom no coincideix amb la IP.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8 shadow-lg">
        <h3 className="text-xl font-bold text-cyan-400 flex items-center gap-3 mb-6">
          <div className="p-2 bg-cyan-500/10 rounded-lg"><Globe className="w-5 h-5" /></div>
          {data.title}
        </h3>
        
        <p className="text-neutral-400 text-sm mb-10 leading-relaxed italic border-l-2 border-neutral-700 pl-4 bg-black/20 p-4 rounded-r-lg">
          {data.description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative mb-12">
           <div className="space-y-6">
              <h4 className="text-[10px] font-black uppercase text-neutral-500 tracking-widest flex items-center gap-2">
                <Search className="w-3 h-3" /> Noms de Domini (Hostnames)
              </h4>
              {mappings.map((m, i) => (
                <div key={i} className="flex flex-col gap-2">
                   <div className={`p-4 bg-black rounded-lg border flex items-center justify-between ${selections[m.name] ? 'border-cyan-500/50' : 'border-neutral-800'}`}>
                      <span className="text-neutral-300 font-bold text-sm tracking-tight">{m.name}</span>
                      {selections[m.name] && <Link2 className="w-4 h-4 text-cyan-500" />}
                   </div>
                   <div className="flex gap-2">
                      {mappings.map((ipMap) => (
                        <button
                          key={ipMap.ip}
                          onClick={() => handleSelection(m.name, ipMap.ip)}
                          className={`
                            flex-1 py-1 px-2 rounded-md text-[9px] font-bold uppercase transition-all
                            ${selections[m.name] === ipMap.ip ? 'bg-cyan-600 text-white' : 'bg-neutral-800 text-neutral-500 hover:bg-neutral-700'}
                          `}
                        >
                          IP: {ipMap.ip.split('.').slice(-1)}
                        </button>
                      ))}
                   </div>
                </div>
              ))}
           </div>

           <div className="space-y-6">
             <h4 className="text-[10px] font-black uppercase text-neutral-500 tracking-widest flex items-center gap-2">
                <Server className="w-3 h-3" /> Servidors (Nodes)
              </h4>
              <div className="flex flex-col gap-6 p-6 bg-black/40 border border-neutral-800 rounded-2xl h-full justify-around">
                 {mappings.map((m, i) => (
                    <div key={i} className="flex items-center gap-4 group">
                       <div className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center border border-neutral-700 group-hover:border-cyan-500/50 transition-colors">
                          <Server className="w-5 h-5 text-neutral-500 group-hover:text-cyan-500 transition-colors" />
                       </div>
                       <div>
                          <p className="text-[10px] text-neutral-500 font-bold uppercase">Node Adreça</p>
                          <p className="text-emerald-400 font-mono text-sm">{m.ip}</p>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </div>

        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-3 text-red-500 text-xs font-bold mb-6 animate-shake">
            <AlertCircle className="w-4 h-4" />
            Configuració incorrecta. Revisa els mapatges (IP vs Noms).
          </div>
        )}

        {showExplanation ? (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-emerald-500/10 border border-emerald-500/30 rounded-xl space-y-6"
          >
             <div className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
                <p className="text-xs text-neutral-400 leading-relaxed italic">{data.explanation}</p>
             </div>
             <button 
                onClick={() => onComplete(200)}
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all"
              >
                PROVA 4: CONFIGURACIÓ DINÀMICA
              </button>
          </motion.div>
        ) : (
          <button 
             onClick={validate}
             className="w-full py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 group"
          >
            VALIDAR SERVIDOR DNS
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        )}
      </div>
    </div>
  );
}
