import React, { useState } from 'react';
import { CALCULATOR_PRESETS } from '../../data/mockData';
import { playClickSound, playErrorSound, playSuccessSound } from '../../utils/sound';
import { Calculator as CalcIcon, History, Trash2, Sparkles, HelpCircle } from 'lucide-react';

export const MemeCalculator: React.FC = () => {
  const [display, setDisplay] = useState<string>('0');
  const [formula, setFormula] = useState<string>('');
  const [history, setHistory] = useState<Array<{ eq: string; res: string; note: string }>>([
    { eq: "Didi + Attitude", res: "∞ (Limit does not exist)", note: "Universal Axiom" },
    { eq: "1 Brother × 2 Didis", res: "RIP 💀", note: "Survival rate: 0%" }
  ]);
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [funnyNote, setFunnyNote] = useState<string>("Ready for non-Euclidean sibling mathematics.");

  const handlePreset = (preset: typeof CALCULATOR_PRESETS[0]) => {
    playSuccessSound();
    setDisplay(preset.result);
    setFormula(preset.equation);
    setFunnyNote(preset.note);
    setHistory(prev => [{ eq: preset.equation, res: preset.result, note: preset.note }, ...prev.slice(0, 8)]);
  };

  const handleNumber = (num: string) => {
    playClickSound();
    if (display === '0' || display.includes('∞') || display.includes('RIP') || display.includes('DIV/0')) {
      setDisplay(num);
    } else {
      setDisplay(prev => prev + num);
    }
  };

  const handleOp = (op: string) => {
    playClickSound();
    setFormula(display + ' ' + op + ' ');
    setDisplay('0');
  };

  const handleClear = () => {
    playClickSound();
    setDisplay('0');
    setFormula('');
    setFunnyNote("Calculator purged. Didi is still right though.");
  };

  const handleEvaluate = () => {
    playClickSound();
    const fullExp = formula + display;
    
    // Funny custom evaluation
    let result = '';
    let note = '';

    if (fullExp.toLowerCase().includes('0') && fullExp.includes('/')) {
      playErrorSound();
      result = 'DIV/0 (Brother is at fault)';
      note = 'Physics broke before Didi admitted being wrong.';
    } else {
      // Meme math evaluation
      const funnyOutcomes = [
        { res: "₹5,000 + Tax", note: "Standard Rakhi Shagun Fee" },
        { res: "99.9% Sarcasm", note: "High concentration detected" },
        { res: "404: Logic Not Found", note: "Sibling arguments do not use math" },
        { res: "Brother Lost", note: "Outcome pre-determined since birth" },
        { res: "2 hrs 45 mins", note: "Actual meaning of 'I am 5 mins away'" }
      ];
      const randomPick = funnyOutcomes[Math.floor(Math.random() * funnyOutcomes.length)];
      result = randomPick.res;
      note = randomPick.note;
      playSuccessSound();
    }

    setDisplay(result);
    setFunnyNote(note);
    setHistory(prev => [{ eq: fullExp || 'Random Equation', res: result, note }, ...prev.slice(0, 8)]);
  };

  return (
    <div className="flex flex-col h-full bg-[#FAF7F2] text-[#2A221B] select-none text-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#D8CFBE] px-4 py-2.5 bg-[#F0EAE1]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#3E2C20] text-[#FAF7F2] flex items-center justify-center font-bold text-sm shadow-xs">
            <CalcIcon className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-xs tracking-wide uppercase text-[#2A221B]">
              DIDI MEME CALCULATOR
            </div>
            <div className="text-[11px] text-[#7A6B5D] font-mono">100% Inaccurate • 100% True</div>
          </div>
        </div>

        <button
          onClick={() => { playClickSound(); setShowHistory(!showHistory); }}
          className={`px-2.5 py-1 text-xs font-semibold rounded-lg border border-[#D5CABB] transition-all flex items-center gap-1.5 ${
            showHistory ? 'bg-[#3E2C20] text-white' : 'bg-[#FAF7F2] text-[#2A221B] hover:bg-[#F4ECE0]'
          }`}
        >
          <History className="w-3.5 h-3.5" />
          <span>History</span>
        </button>
      </div>

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Main Calculator Pad */}
        <div className="flex-1 p-4 flex flex-col justify-between overflow-y-auto space-y-3">
          {/* Display screen styled like retro paper LCD */}
          <div className="bg-[#EFE9DF] border-2 border-[#D8CFBE] rounded-xl p-3.5 text-right font-mono paper-inner-shadow">
            <div className="text-xs text-[#7A6B5D] h-4 overflow-hidden truncate">
              {formula || 'Ready for calculation...'}
            </div>
            <div className="text-xl md:text-2xl font-black text-[#2A221B] tracking-tight break-all mt-1">
              {display}
            </div>
            <div className="text-[11px] text-[#8C3A27] font-semibold mt-1 flex items-center justify-end gap-1">
              <Sparkles className="w-3 h-3 text-[#C28B38]" />
              <span>{funnyNote}</span>
            </div>
          </div>

          {/* Quick Meme Formula Shortcuts */}
          <div>
            <div className="text-[11px] font-bold uppercase text-[#7A6B5D] mb-1.5 flex items-center gap-1">
              <span>Meme Equation Shortcuts:</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {CALCULATOR_PRESETS.slice(0, 4).map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePreset(item)}
                  className="text-left px-2.5 py-1.5 bg-[#FAF5EE] hover:bg-[#F3EAD9] border border-[#DDD3C2] rounded-lg text-xs font-medium text-[#3E2C20] transition-colors active:scale-98 shadow-2xs"
                >
                  <span className="font-bold text-[#8C3A27]">⚡ {item.equation}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Standard Keypad with Meme Buttons */}
          <div className="grid grid-cols-4 gap-2">
            <button onClick={handleClear} className="col-span-2 p-2.5 bg-[#F8DED9] hover:bg-[#F3CBC3] text-[#8C3A27] font-bold rounded-xl border border-[#E9BFB6] transition-transform active:scale-95 shadow-xs">
              AC (Apologize)
            </button>
            <button onClick={() => handlePreset(CALCULATOR_PRESETS[4])} className="p-2.5 bg-[#FAF5EE] hover:bg-[#F0E6D5] text-[#3E2C20] font-bold rounded-xl border border-[#D8CFBE] text-xs transition-transform active:scale-95 shadow-xs">
              ₹ Shagun
            </button>
            <button onClick={() => handleOp('÷')} className="p-2.5 bg-[#E4DCCE] hover:bg-[#D8CFBE] text-[#2A221B] font-bold rounded-xl border border-[#CFC5B4] transition-transform active:scale-95 shadow-xs">
              ÷
            </button>

            {['7', '8', '9'].map(n => (
              <button key={n} onClick={() => handleNumber(n)} className="p-2.5 bg-white hover:bg-[#FAF7F2] text-[#2A221B] font-bold rounded-xl border border-[#DDD3C2] transition-transform active:scale-95 shadow-xs">
                {n}
              </button>
            ))}
            <button onClick={() => handleOp('×')} className="p-2.5 bg-[#E4DCCE] hover:bg-[#D8CFBE] text-[#2A221B] font-bold rounded-xl border border-[#CFC5B4] transition-transform active:scale-95 shadow-xs">
              ×
            </button>

            {['4', '5', '6'].map(n => (
              <button key={n} onClick={() => handleNumber(n)} className="p-2.5 bg-white hover:bg-[#FAF7F2] text-[#2A221B] font-bold rounded-xl border border-[#DDD3C2] transition-transform active:scale-95 shadow-xs">
                {n}
              </button>
            ))}
            <button onClick={() => handleOp('-')} className="p-2.5 bg-[#E4DCCE] hover:bg-[#D8CFBE] text-[#2A221B] font-bold rounded-xl border border-[#CFC5B4] transition-transform active:scale-95 shadow-xs">
              −
            </button>

            {['1', '2', '3'].map(n => (
              <button key={n} onClick={() => handleNumber(n)} className="p-2.5 bg-white hover:bg-[#FAF7F2] text-[#2A221B] font-bold rounded-xl border border-[#DDD3C2] transition-transform active:scale-95 shadow-xs">
                {n}
              </button>
            ))}
            <button onClick={() => handleOp('+')} className="p-2.5 bg-[#E4DCCE] hover:bg-[#D8CFBE] text-[#2A221B] font-bold rounded-xl border border-[#CFC5B4] transition-transform active:scale-95 shadow-xs">
              +
            </button>

            <button onClick={() => handleNumber('0')} className="p-2.5 bg-white hover:bg-[#FAF7F2] text-[#2A221B] font-bold rounded-xl border border-[#DDD3C2] transition-transform active:scale-95 shadow-xs">
              0
            </button>
            <button onClick={() => handlePreset(CALCULATOR_PRESETS[0])} className="p-2.5 bg-[#FAF5EE] hover:bg-[#F0E6D5] text-[#8C3A27] font-bold rounded-xl border border-[#D8CFBE] text-xs transition-transform active:scale-95 shadow-xs">
              ∞ Didi
            </button>
            <button onClick={handleEvaluate} className="col-span-2 p-2.5 bg-[#8C3A27] hover:bg-[#78301F] text-white font-extrabold rounded-xl shadow-xs transition-transform active:scale-95 flex items-center justify-center gap-1">
              <span>= (Didi is Right)</span>
            </button>
          </div>
        </div>

        {/* History drawer */}
        {showHistory && (
          <div className="w-full md:w-64 border-t md:border-t-0 md:border-l border-[#D8CFBE] bg-[#F4EFE6] p-3 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-[#DDD3C2] mb-2">
                <span className="font-bold text-xs uppercase text-[#544537] flex items-center gap-1">
                  <History className="w-3.5 h-3.5" />
                  <span>Meme Math Log</span>
                </span>
                <button
                  onClick={() => { playClickSound(); setHistory([]); }}
                  className="text-[11px] text-[#8C3A27] hover:underline flex items-center gap-0.5"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Clear</span>
                </button>
              </div>

              <div className="space-y-2">
                {history.map((h, i) => (
                  <div key={i} className="p-2 bg-white rounded-lg border border-[#E3D9CC] text-xs shadow-2xs font-mono">
                    <div className="text-[#7A6B5D] text-[11px]">{h.eq}</div>
                    <div className="font-bold text-[#8C3A27]">{h.res}</div>
                    <div className="text-[10px] text-[#A49688] italic">{h.note}</div>
                  </div>
                ))}
                {history.length === 0 && (
                  <div className="text-center py-6 text-xs text-[#8C7D6E] italic">
                    No calculations recorded.
                  </div>
                )}
              </div>
            </div>

            <div className="mt-3 p-2 bg-[#EADDC9] rounded-lg text-[11px] text-[#4E3F32] flex items-start gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
              <span>Note: Mathematical axioms defined by Sibling Treaty of 2014. All results final.</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
