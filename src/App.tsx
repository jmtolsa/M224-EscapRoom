/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  Terminal, 
  Clock, 
  Cpu, 
  Network, 
  Settings, 
  AlertCircle, 
  CheckCircle2,
  Lock,
  ChevronRight,
  RefreshCcw,
  Wifi,
  Server,
  Globe
} from 'lucide-react';
import { GAME_DATA } from './data/gameData';
import { GameState } from './types';

// Components
import Intro from './components/Intro';
import Level1 from './components/levels/Level1';
import Level2 from './components/levels/Level2';
import Level3 from './components/levels/Level3';
import Level4 from './components/levels/Level4';
import Level5 from './components/levels/Level5';
import Outro from './components/Outro';

export default function App() {
  const [state, setState] = useState<GameState>({
    currentLevel: 0,
    score: 0,
    startTime: null,
    endTime: null,
    status: 'intro',
    history: ['Sistemes inicialitzats...', 'Esperant administrador...']
  });

  const [time, setTime] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (state.status === 'playing' && !state.endTime) {
      timerRef.current = setInterval(() => {
        setTime(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [state.status, state.endTime]);

  const addLog = (msg: string) => {
    setState(prev => ({
      ...prev,
      history: [...prev.history, `[${new Date().toLocaleTimeString()}] ${msg}`].slice(-8)
    }));
  };

  const startGame = () => {
    setState(prev => ({
      ...prev,
      status: 'playing',
      currentLevel: 1,
      startTime: Date.now(),
      history: [...prev.history, 'Missió iniciada: Recupera la xarxa corporativa.']
    }));
  };

  const nextLevel = (points: number) => {
    if (state.currentLevel === GAME_DATA.length) {
      setState(prev => ({
        ...prev,
        score: prev.score + points,
        endTime: Date.now(),
        status: 'ended',
        history: [...prev.history, 'Totes les proves superades. Sistema segur.']
      }));
    } else {
      setState(prev => ({
        ...prev,
        currentLevel: prev.currentLevel + 1,
        score: prev.score + points,
        history: [...prev.history, `Nivell ${prev.currentLevel} completat. Avançant...`]
      }));
    }
  };

  const restart = () => {
    setState({
      currentLevel: 0,
      score: 0,
      startTime: null,
      endTime: null,
      status: 'intro',
      history: ['Sistemes reiniciats...', 'Esperant administrador...']
    });
    setTime(0);
  };

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-mono selection:bg-cyan-500/30 overflow-hidden flex flex-col">
      {/* Header / HUD */}
      <header className="border-b border-neutral-800 p-4 bg-neutral-900/50 backdrop-blur-sm flex items-center justify-between z-20">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
             <Shield className="w-5 h-5 text-cyan-500 animate-pulse" />
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-widest uppercase text-cyan-500">Escape Room: Admin Xarxes</h1>
            <p className="text-[10px] text-neutral-500 uppercase">Sistemes Operatius en Xarxa (SMX)</p>
          </div>
        </div>

        {state.status === 'playing' && (
          <div className="flex items-center gap-8">
            <div className="flex flex-col items-end">
              <span className="text-[10px] text-neutral-500 uppercase tracking-tighter">Temps de Missió</span>
              <div className="flex items-center gap-2 text-cyan-400 font-bold">
                <Clock className="w-4 h-4" />
                <span>{formatTime(time)}</span>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[10px] text-neutral-500 uppercase tracking-tighter">Puntuació total</span>
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>{state.score} XP</span>
              </div>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1 relative overflow-auto flex flex-col items-center justify-center p-4 md:p-8">
        {/* Background Grids */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
          <div className="absolute inset-0 bg-radial-at-c from-cyan-500/5 via-transparent to-transparent"></div>
        </div>

        <AnimatePresence mode="wait">
          {state.status === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="z-10 w-full max-w-4xl"
            >
              <Intro onStart={startGame} />
            </motion.div>
          )}

          {state.status === 'playing' && (
            <motion.div
              key="playing"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              className="z-10 w-full max-w-5xl"
            >
               {state.currentLevel === 1 && <Level1 onComplete={nextLevel} addLog={addLog} />}
               {state.currentLevel === 2 && <Level2 onComplete={nextLevel} addLog={addLog} />}
               {state.currentLevel === 3 && <Level3 onComplete={nextLevel} addLog={addLog} />}
               {state.currentLevel === 4 && <Level4 onComplete={nextLevel} addLog={addLog} />}
               {state.currentLevel === 5 && <Level5 onComplete={nextLevel} addLog={addLog} />}
            </motion.div>
          )}

          {state.status === 'ended' && (
            <motion.div
              key="ended"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              className="z-10 w-full max-w-2xl"
            >
              <Outro 
                score={state.score} 
                time={formatTime(time)} 
                onRestart={restart} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer / Terminal Console */}
      <footer className="border-t border-neutral-800 bg-neutral-900 overflow-hidden flex flex-col md:flex-row h-24 md:h-16 shrink-0 z-20">
        <div className="p-3 bg-neutral-950 border-r border-neutral-800 flex items-center gap-3 shrink-0">
          <Terminal className="w-5 h-5 text-cyan-500" />
          <span className="text-xs font-bold uppercase text-neutral-400">Consola de depuració</span>
        </div>
        <div className="flex-1 overflow-y-auto bg-black/50 p-2 font-mono scrollbar-hide">
          {state.history.map((log, i) => (
            <div key={i} className="text-[10px] md:text-xs mb-1">
              <span className="text-cyan-500/50 mr-2 opacity-50">&gt;</span>
              <span className={i === state.history.length - 1 ? "text-cyan-400 font-bold" : "text-neutral-500"}>
                {log}
              </span>
            </div>
          ))}
        </div>
      </footer>
    </div>
  );
}
