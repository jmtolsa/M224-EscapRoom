import { useState } from 'react';
import { motion } from 'motion/react';
import { Shield, ShieldAlert, CheckCircle2, ChevronRight, Lock, Unlock, Zap, ShieldCheck } from 'lucide-react';
import { GAME_DATA } from '../../data/gameData';

interface LevelProps {
  onComplete: (points: number) => void;
  addLog: (msg: string) => void;
}

export default function Level5({ onComplete, addLog }: LevelProps) {
  const data = GAME_DATA[4];
  const rules = data.task as any[];
  
  const [userActions, setUserActions] = useState<Record<number, 'allow' | 'block'>>(
     rules.reduce((acc, _, i) => ({ ...acc, [i]: 'allow' }), {})
  );
  const [showExplanation, setShowExplanation] = useState(false);
  const [error, setError] = useState(false);

  const toggleAction = (idx: number) => {
    setUserActions(prev => ({
      ...prev,
      [idx]: prev[idx] === 'allow' ? 'block' : 'allow'
    }));
    setError(false);
  };

  const validate = () => {
    const isCorrect = rules.every((rule, idx) => userActions[idx] === rule.action);

    if (isCorrect) {
      addLog('POLÍTICA DE SEGURETAT APLICADA. El sistema està totalment protegit.');
      setShowExplanation(true);
    } else {
      setError(true);
      addLog('ALERTA: Escletxa de seguretat detectada. Algun port vulnerable resta obert o necessari tancat.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8 shadow-lg">
        <h3 className="text-xl font-bold text-cyan-400 flex items-center gap-3 mb-6">
          <div className="p-2 bg-cyan-500/10 rounded-lg"><ShieldCheck className="w-5 h-5" /></div>
          {data.title}
        </h3>

        <div className="mb-8 p-4 bg-black/40 border border-neutral-800 rounded-xl flex items-center gap-4">
           <Zap className="w-8 h-8 text-yellow-500 shrink-0" />
           <p className="text-xs text-neutral-400 italic">
             {data.description} recorda que <span className="text-white font-bold underline">Telnet</span> és un protocol insegur que viatja en text pla, mentre que <span className="text-white font-bold underline">SMTP</span> s'usa per rebre e-mails corporatius.
           </p>
        </div>

        <div className="space-y-4 mb-10">
           {rules.map((rule, i) => (
             <div 
               key={i} 
               className={`p-6 rounded-xl border transition-all flex items-center justify-between ${userActions[i] === 'allow' ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-red-500/5 border-red-500/20'}`}
             >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg ${userActions[i] === 'allow' ? 'bg-emerald-500/10' : 'bg-red-500/10'}`}>
                    {userActions[i] === 'allow' ? <Unlock className="w-5 h-5 text-emerald-500" /> : <Lock className="w-5 h-5 text-red-500" />}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-neutral-100">{rule.service}</h4>
                    <p className="text-[10px] text-neutral-500 font-mono uppercase tracking-widest">Port Destí: {rule.port}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                   <button 
                      onClick={() => toggleAction(i)}
                      className={`
                        px-6 py-2 rounded-lg text-xs font-black uppercase transition-all tracking-tighter
                        ${userActions[i] === 'allow' ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'}
                      `}
                   >
                     {userActions[i] === 'allow' ? 'PERMETRE' : 'BLOQUEJAR'}
                   </button>
                </div>
             </div>
           ))}
        </div>

        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-3 text-red-500 text-xs font-bold mb-6">
            <ShieldAlert className="w-4 h-4" />
            SEGURETAT COMPROMESA: Revisa la configuració del tallafocs.
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
                onClick={() => onComplete(500)}
                className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)]"
              >
                FINALITZAR ESCAPE ROOM
              </button>
          </motion.div>
        ) : (
          <button 
             onClick={validate}
             className="w-full py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 group"
          >
            ACTUALITZAR POLÍTIQUES FIREWALL
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        )}
      </div>
    </div>
  );
}
