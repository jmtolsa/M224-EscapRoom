import { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, ChevronRight, Network, Server, User } from 'lucide-react';
import { GAME_DATA } from '../../data/gameData';

interface LevelProps {
  onComplete: (points: number) => void;
  addLog: (msg: string) => void;
}

export default function Level1({ onComplete, addLog }: LevelProps) {
  const data = GAME_DATA[0];
  const [ip, setIp] = useState('192.168.1.');
  const [mask, setMask] = useState('');
  const [gateway, setGateway] = useState('');
  const [error, setError] = useState('');
  const [showExplanation, setShowExplanation] = useState(false);

  const handleSubmit = () => {
    // Simple validation for Level 1
    const ipLastPart = parseInt(ip.split('.')[3]);
    const isValidIp = ip.startsWith('192.168.1.') && ipLastPart > 1 && ipLastPart < 255;
    const isValidMask = mask === '255.255.255.0';
    const isValidGateway = gateway === '192.168.1.1';

    if (isValidIp && isValidMask && isValidGateway) {
      addLog('Configuració IP vàlida. Connectant al router...');
      setShowExplanation(true);
    } else {
      let msg = 'Configuració incorrecta: ';
      if (!isValidIp) msg += 'IP invàlida o ocupada. ';
      if (!isValidMask) msg += 'Màscara incorrecta. ';
      if (!isValidGateway) msg += 'Porta d\'enllaç mal definida. ';
      setError(msg);
      addLog('ERR: Error de paràmetres de xarxa.');
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 space-y-6">
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-cyan-400 mb-2 flex items-center gap-3">
            <div className="p-2 bg-cyan-500/10 rounded-lg"><Network className="w-5 h-5" /></div>
            {data.title}
          </h3>
          <p className="text-neutral-400 text-sm mb-6 leading-relaxed italic border-l-2 border-neutral-700 pl-4">
            {data.description}
          </p>

          <div className="space-y-4 max-w-md">
            <div className="space-y-1">
              <label className="text-[10px] uppercase text-neutral-500 font-bold">Adreça IP de l'Equip</label>
              <input 
                type="text" 
                value={ip} 
                onChange={(e) => setIp(e.target.value)}
                placeholder="192.168.1.100"
                className="w-full bg-black border border-neutral-800 p-3 rounded-lg text-emerald-400 font-mono focus:ring-1 focus:ring-cyan-500 outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] uppercase text-neutral-500 font-bold">Màscara de Subxarxa</label>
              <input 
                type="text" 
                value={mask} 
                onChange={(e) => setMask(e.target.value)}
                placeholder="255.255.255.0"
                className="w-full bg-black border border-neutral-800 p-3 rounded-lg text-emerald-400 font-mono focus:ring-1 focus:ring-cyan-500 outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] uppercase text-neutral-500 font-bold">Porta d'Enllaç (Gateway)</label>
              <input 
                type="text" 
                value={gateway} 
                onChange={(e) => setGateway(e.target.value)}
                placeholder="192.168.1.1"
                className="w-full bg-black border border-neutral-800 p-3 rounded-lg text-emerald-400 font-mono focus:ring-1 focus:ring-cyan-500 outline-none"
              />
            </div>

            {error && (
              <p className="text-red-500 text-xs font-bold animate-pulse">{error}</p>
            )}

            {!showExplanation ? (
              <button 
                onClick={handleSubmit}
                className="mt-4 px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg transition-all flex items-center gap-2 group"
              >
                APLICAR CANVIS
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            ) : (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl space-y-4"
              >
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-1" />
                  <div>
                    <h4 className="text-emerald-400 font-bold text-sm">Configuració Acceptada</h4>
                    <p className="text-xs text-neutral-400 mt-2 italic">{data.explanation}</p>
                  </div>
                </div>
                <button 
                  onClick={() => onComplete(100)}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg transition-all"
                >
                  SEGUENT NIVELL
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
           <h4 className="text-xs font-bold text-neutral-400 uppercase mb-4 tracking-widest flex items-center gap-2">
             <Server className="w-3 h-3" /> Esquema de Xarxa
           </h4>
           <div className="flex flex-col items-center gap-4 py-4">
              <div className="w-full flex justify-center flex-col items-center gap-2">
                <div className="p-3 bg-neutral-800 rounded-lg border border-neutral-700">
                  <Server className="w-6 h-6 text-cyan-500" />
                </div>
                <span className="text-[10px] text-neutral-500">ROUTER GESTIÓ</span>
                <span className="text-[10px] text-cyan-500 font-bold">192.168.1.1</span>
              </div>
              <div className="h-8 w-px bg-neutral-800"></div>
              <div className="w-full flex justify-center flex-col items-center gap-2">
                <div className={`p-3 rounded-lg border transition-colors ${showExplanation ? 'bg-emerald-500/20 border-emerald-500' : 'bg-neutral-800 border-neutral-700'}`}>
                  <User className={`w-6 h-6 ${showExplanation ? 'text-emerald-500' : 'text-neutral-500'}`} />
                </div>
                <span className="text-[10px] text-neutral-500">TEU EQUIP</span>
                <span className="text-[10px] text-emerald-500 font-bold">{showExplanation ? ip : 'SENSE CONFIG'}</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
