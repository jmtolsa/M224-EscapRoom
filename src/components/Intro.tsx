import { motion } from 'motion/react';
import { Power, Terminal, Shield, AlertTriangle } from 'lucide-react';

interface IntroProps {
  onStart: () => void;
}

export default function Intro({ onStart }: IntroProps) {
  return (
    <div className="bg-neutral-900/60 backdrop-blur-xl border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl">
      <div className="p-8 md:p-12">
        <div className="flex flex-col md:flex-row gap-12">
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider">
              <AlertTriangle className="w-3 h-3" />
              Sстема Crítica
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
              Escape Room:<br />
              <span className="text-cyan-500">Administrador de Xarxes</span>
            </h2>

            <div className="space-y-4 text-neutral-400 leading-relaxed">
              <p>
                Benvingut, administrador. L'empresa <span className="text-neutral-200 font-bold">TECH-SMX Local</span> ha patit un atac de denegació de servei i tota la infraestructura ha caigut.
              </p>
              <p>
                La teva missió és restaurar els serveis crítics: des de la configuració IP bàsica fins a la seguretat del tallafocs. Tens poc temps abans que el negoci s'aturi completament.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="p-4 bg-black/40 rounded-xl border border-neutral-800">
                <Shield className="w-6 h-6 text-emerald-500 mb-2" />
                <h4 className="text-sm font-bold text-neutral-200">Seguretat</h4>
                <p className="text-[10px] text-neutral-500">Protegeix el perímetre</p>
              </div>
              <div className="p-4 bg-black/40 rounded-xl border border-neutral-800">
                <Terminal className="w-6 h-6 text-cyan-500 mb-2" />
                <h4 className="text-sm font-bold text-neutral-200">Protocol</h4>
                <p className="text-[10px] text-neutral-500">Configura serveis IP</p>
              </div>
            </div>

            <button
              onClick={onStart}
              className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl transition-all active:scale-95 overflow-hidden w-full md:w-auto"
            >
              <span className="relative z-10">COMENÇAR RECUPERACIÓ</span>
              <Power className="w-5 h-5 relative z-10 group-hover:rotate-12 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
            </button>
          </div>

          <div className="hidden lg:flex w-72 flex-col gap-4">
             <div className="flex-1 bg-black/60 rounded-xl border border-neutral-800 p-6 flex flex-col justify-between">
                <div className="space-y-4">
                   <div className="h-2 w-1/2 bg-neutral-800 rounded"></div>
                   <div className="h-2 w-full bg-neutral-800 rounded opacity-60"></div>
                   <div className="h-2 w-3/4 bg-neutral-800 rounded opacity-40"></div>
                </div>
                <div className="space-y-1">
                   <span className="text-[10px] text-neutral-500 uppercase">Estat del Sistema</span>
                   <div className="w-full h-8 bg-red-500/20 rounded-lg flex items-center justify-center border border-red-500/40">
                      <span className="text-red-500 text-[10px] font-bold animate-pulse">OFFLINE</span>
                   </div>
                </div>
             </div>
             <div className="h-32 bg-cyan-900/20 rounded-xl border border-cyan-500/30 p-6 flex items-center justify-center">
                <span className="text-xs text-cyan-500/80 italic text-center font-bold font-sans">
                   "L'única xarxa segura és la que configures tu."
                </span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
