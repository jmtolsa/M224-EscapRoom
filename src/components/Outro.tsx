import { motion } from 'motion/react';
import { Trophy, Clock, CheckCircle2, RefreshCcw, Star, Award } from 'lucide-react';

interface OutroProps {
  score: number;
  time: string;
  onRestart: () => void;
}

export default function Outro({ score, time, onRestart }: OutroProps) {
  return (
    <div className="bg-neutral-900/60 backdrop-blur-xl border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl p-8 md:p-12 text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', damping: 10, stiffness: 100 }}
        className="w-24 h-24 bg-cyan-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_50px_rgba(6,182,212,0.5)]"
      >
        <Trophy className="w-12 h-12 text-white" />
      </motion.div>

      <h2 className="text-4xl font-black text-white mb-2 uppercase tracking-tighter">Missió Completada!</h2>
      <p className="text-cyan-500 font-bold mb-10 text-sm tracking-widest uppercase">Has salvat la xarxa corporativa</p>

      <div className="grid grid-cols-2 gap-4 mb-12">
        <div className="bg-black/40 border border-neutral-800 p-6 rounded-2xl">
          <Clock className="w-6 h-6 text-neutral-500 mx-auto mb-2" />
          <p className="text-[10px] text-neutral-500 font-bold uppercase mb-1">Temps Final</p>
          <p className="text-2xl font-black text-white">{time}</p>
        </div>
        <div className="bg-black/40 border border-neutral-800 p-6 rounded-2xl">
          <Star className="w-6 h-6 text-emerald-500 mx-auto mb-2" />
          <p className="text-[10px] text-neutral-500 font-bold uppercase mb-1">Puntuació</p>
          <p className="text-2xl font-black text-white">{score} XP</p>
        </div>
      </div>

      <div className="bg-cyan-500/10 border border-cyan-500/20 p-6 rounded-2xl mb-12 text-left space-y-4">
        <h4 className="text-cyan-400 font-bold flex items-center gap-2">
          <Award className="w-4 h-4" /> Resum de Competències (SMX)
        </h4>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
           {[
             'Configuració de protocols IP',
             'Ús d\'eines de diagnòstic (CLI)',
             'Gestió de serveis DNS ràpida',
             'Administració de rangs DHCP',
             'Polítiques de seguretat (FW)'
           ].map((skill, i) => (
             <li key={i} className="flex items-center gap-2 text-xs text-neutral-400">
                <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                {skill}
             </li>
           ))}
        </ul>
      </div>

      <button
        onClick={onRestart}
        className="group inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-black font-black rounded-xl transition-all active:scale-95 hover:bg-cyan-400 hover:shadow-[0_0_30px_rgba(34,211,238,0.4)]"
      >
        TORNAR A COMENÇAR
        <RefreshCcw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
      </button>

      <div className="mt-12 pt-8 border-t border-neutral-800">
         <p className="text-[10px] text-neutral-600 uppercase tracking-[0.2em]">Felicitats Admin. La corporació està segura... per ara.</p>
      </div>
    </div>
  );
}
