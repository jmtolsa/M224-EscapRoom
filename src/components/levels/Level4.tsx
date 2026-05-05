import { useState } from 'react';
import { motion } from 'motion/react';
import { Cpu, AlertTriangle, CheckCircle2, ChevronRight, Server, Search, Info, ListFilter } from 'lucide-react';
import { GAME_DATA } from '../../data/gameData';

interface LevelProps {
  onComplete: (points: number) => void;
  addLog: (msg: string) => void;
}

export default function Level4({ onComplete, addLog }: LevelProps) {
  const data = GAME_DATA[3];
  const { staticIps, pools } = data.task;
  
  const [selectedPool, setSelectedPool] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [error, setError] = useState(false);

  const validate = () => {
    if (selectedPool === null) return;
    
    const pool = pools[selectedPool];
    if (pool.valid) {
      addLog('Pool DHCP seleccionat correctament. S\'ha evitat el conflicte d\'IPs.');
      setShowExplanation(true);
    } else {
      setError(true);
      addLog('CRITICAL: Conflicte d\'IP. El rang escollit trepitja IPs estàtiques de servidors.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8 shadow-lg">
        <h3 className="text-xl font-bold text-cyan-400 flex items-center gap-3 mb-6">
          <div className="p-2 bg-cyan-500/10 rounded-lg"><Cpu className="w-5 h-5" /></div>
          {data.title}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
           <div className="bg-black/40 border border-neutral-800 rounded-xl p-6">
              <h4 className="text-[10px] font-black uppercase text-neutral-500 tracking-widest flex items-center gap-2 mb-6">
                <Server className="w-3 h-3" /> IPS ESTÀTIQUES (RESERVADES)
              </h4>
              <div className="grid grid-cols-1 gap-2">
                 {staticIps.map((ip: string, i: number) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-neutral-800/20 border border-neutral-800 rounded-lg">
                       <span className="text-neutral-400 text-xs font-mono">{ip}</span>
                       <span className="text-[9px] bg-red-500/10 text-red-500 px-2 py-0.5 rounded border border-red-500/20 font-black uppercase">Ocupat</span>
                    </div>
                 ))}
              </div>
              <p className="mt-4 text-[10px] text-neutral-500 italic">
                Aquestes adreces estan assignades a servidors crítics i al router. El DHCP no les pot tocar.
              </p>
           </div>

           <div className="space-y-6">
              <h4 className="text-[10px] font-black uppercase text-neutral-500 tracking-widest flex items-center gap-2 mb-6">
                <ListFilter className="w-3 h-3" /> SELECCIONA EL RANG (POOL) SEGUR
              </h4>
              <div className="space-y-3">
                 {pools.map((p: any, i: number) => (
                    <button
                      key={i}
                      disabled={showExplanation}
                      onClick={() => { setSelectedPool(i); setError(false); }}
                      className={`
                        w-full p-6 text-left rounded-xl border transition-all relative overflow-hidden group
                        ${selectedPool === i ? 'bg-cyan-500/10 border-cyan-500' : 'bg-black/20 border-neutral-800 hover:border-neutral-600'}
                      `}
                    >
                       <div className="relative z-10">
                          <p className={`text-xs font-bold uppercase mb-1 ${selectedPool === i ? 'text-cyan-400' : 'text-neutral-500'}`}>Rang Opció {i + 1}</p>
                          <p className="text-lg font-mono text-neutral-100">{p.range}</p>
                       </div>
                       {selectedPool === i && (
                         <div className="absolute right-4 top-1/2 -translate-y-1/2">
                           <div className="w-2 h-2 bg-cyan-500 rounded-full animate-ping"></div>
                         </div>
                       )}
                    </button>
                 ))}
              </div>
           </div>
        </div>

        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-3 text-red-500 text-xs font-bold mb-6">
            <AlertTriangle className="w-4 h-4" />
            ERROR: Aquest rang provoca col·lisió d'adreces. Revisa les IPs reservades!
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
                onClick={() => onComplete(250)}
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all"
              >
                PROVA FINAL: TALLAFOCS
              </button>
          </motion.div>
        ) : (
          <button 
             disabled={selectedPool === null}
             onClick={validate}
             className={`
               w-full py-4 font-bold rounded-xl transition-all flex items-center justify-center gap-2 group
               ${selectedPool !== null ? 'bg-cyan-600 hover:bg-cyan-500 text-white' : 'bg-neutral-800 text-neutral-600 cursor-not-allowed'}
             `}
          >
            ACTIVAR SERVEI DHCP
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        )}
      </div>
    </div>
  );
}
