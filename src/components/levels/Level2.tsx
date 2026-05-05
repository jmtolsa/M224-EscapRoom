import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, ChevronRight, Terminal, Search, Info } from 'lucide-react';
import { GAME_DATA } from '../../data/gameData';

interface LevelProps {
  onComplete: (points: number) => void;
  addLog: (msg: string) => void;
}

export default function Level2({ onComplete, addLog }: LevelProps) {
  const data = GAME_DATA[1];
  const questions = data.task as any[];
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [finished, setFinished] = useState(false);

  const handleAnswer = (idx: number) => {
    if (showFeedback) return;
    setSelected(idx);
    setShowFeedback(true);
    const correct = questions[currentIdx].correct === idx;
    setIsCorrect(correct);
    
    if (correct) {
      addLog(`CORRECTE: Comanda identifiada.`);
    } else {
      addLog(`ERROR: Comanda no vàlida per aquest diagnòstic.`);
    }
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setSelected(null);
      setShowFeedback(false);
    } else {
      setFinished(true);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-cyan-400 flex items-center gap-3">
            <div className="p-2 bg-cyan-500/10 rounded-lg"><Terminal className="w-5 h-5" /></div>
            {data.title}
          </h3>
          <div className="text-[10px] text-neutral-500 font-bold bg-black px-2 py-1 rounded border border-neutral-800 uppercase">
            Pregunta {currentIdx + 1} de {questions.length}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {!finished ? (
            <motion.div 
              key={currentIdx}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="p-6 bg-black rounded-xl border border-neutral-800 shadow-inner">
                <p className="text-lg text-neutral-200">
                  <span className="text-cyan-500 font-bold mr-2">$</span>
                  {questions[currentIdx].question}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {questions[currentIdx].options.map((opt: string, i: number) => (
                  <button
                    key={i}
                    onClick={() => handleAnswer(i)}
                    disabled={showFeedback}
                    className={`
                      w-full p-4 rounded-xl border text-left transition-all flex items-center justify-between group
                      ${showFeedback && i === questions[currentIdx].correct ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' : ''}
                      ${showFeedback && selected === i && i !== questions[currentIdx].correct ? 'bg-red-500/20 border-red-500 text-red-400' : ''}
                      ${!showFeedback ? 'bg-neutral-800/50 border-neutral-700 hover:border-cyan-500 hover:bg-neutral-800' : 'opacity-60'}
                      ${selected === i && !showFeedback ? 'ring-2 ring-cyan-500' : ''}
                    `}
                  >
                    <span className="font-mono text-sm capitalize">{opt}</span>
                    {showFeedback && i === questions[currentIdx].correct && <CheckCircle2 className="w-4 h-4" />}
                  </button>
                ))}
              </div>

              {showFeedback && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                   <div className={`p-4 rounded-lg flex items-start gap-4 ${isCorrect ? 'bg-emerald-500/10 border border-emerald-500/30' : 'bg-red-500/10 border border-red-500/30'}`}>
                      <Info className={`w-5 h-5 shrink-0 ${isCorrect ? 'text-emerald-500' : 'text-red-500'}`} />
                      <p className="text-xs text-neutral-400 leading-relaxed italic">
                        {isCorrect ? 'Molt bé! Aquesta eina és fonamental pel diagnòstic de xarxes.' : 'No és correcte. Revisa els conceptes bàsics de les eines de consola.'}
                      </p>
                   </div>
                   <button 
                     onClick={handleNext}
                     className="w-full py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl transition-all"
                   >
                     SEGUENT {currentIdx === questions.length - 1 ? 'RESULTAT' : 'PREGUNTA'}
                   </button>
                </motion.div>
              )}
            </motion.div>
          ) : (
             <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} 
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-6 py-8"
             >
                <div className="w-16 h-16 bg-emerald-500/20 rounded-full border border-emerald-500 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                </div>
                <h4 className="text-2xl font-bold text-white">Mòdul de Diagnòstic Superat</h4>
                <p className="text-neutral-400 text-sm max-w-md mx-auto italic">
                  {data.explanation}
                </p>
                <button 
                  onClick={() => onComplete(150)}
                  className="px-12 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all"
                >
                  AVANÇAR AL PAS 3
                </button>
             </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
