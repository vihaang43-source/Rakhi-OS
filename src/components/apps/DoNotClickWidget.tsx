import React, { useState } from 'react';
import { DO_NOT_CLICK_MESSAGES } from '../../data/mockData';
import { playClickSound, playErrorSound, playAlarmSound, playSuccessSound } from '../../utils/sound';
import { AlertOctagon, Award, Flame, Sparkles, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

interface DoNotClickWidgetProps {
  onTriggerShake?: () => void;
  onAddNotification?: (title: string, msg: string) => void;
}

export const DoNotClickWidget: React.FC<DoNotClickWidgetProps> = ({
  onTriggerShake,
  onAddNotification
}) => {
  const [clickCount, setClickCount] = useState<number>(0);
  const [currentMessage, setCurrentMessage] = useState<string>("WARNING: High voltage sibling button.");
  const [isGlitching, setIsGlitching] = useState<boolean>(false);
  const [unlockedAchievement, setUnlockedAchievement] = useState<string | null>(null);

  const handleClick = () => {
    const nextCount = clickCount + 1;
    setClickCount(nextCount);
    
    // Play sounds & effects based on progression
    if (nextCount === 5) {
      playSuccessSound();
      setUnlockedAchievement("Professional Button Clicker 🏆");
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
      onAddNotification?.("Achievement Unlocked!", "🏆 Professional Button Clicker (Persistent Sibling Disobedience)");
    } else if (nextCount >= 8) {
      playAlarmSound();
      setIsGlitching(true);
      onTriggerShake?.();
      setTimeout(() => setIsGlitching(false), 800);
    } else {
      if (nextCount % 2 === 0) {
        playErrorSound();
      } else {
        playClickSound();
      }
    }

    const msgIndex = (nextCount - 1) % DO_NOT_CLICK_MESSAGES.length;
    setCurrentMessage(DO_NOT_CLICK_MESSAGES[msgIndex]);
  };

  const handleReset = () => {
    playClickSound();
    setClickCount(0);
    setCurrentMessage("WARNING: High voltage sibling button.");
    setUnlockedAchievement(null);
  };

  return (
    <div className="flex flex-col h-full bg-[#FAF7F2] text-[#2A221B] select-none text-sm p-4 items-center justify-between space-y-4">
      {/* Top Warning header */}
      <div className="w-full text-center space-y-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FDF0EE] text-[#8C3A27] rounded-full border border-[#F1B8AF] text-xs font-bold font-mono">
          <AlertOctagon className="w-3.5 h-3.5" />
          <span>RESTRICTED BUTTON APPARATUS</span>
        </div>
        <h2 className="text-base font-extrabold text-[#2A221B] font-display">
          Do Not Engage With This Control
        </h2>
        <p className="text-xs text-[#7A6B5D]">
          Clicking may result in catastrophic sister roasts and imaginary fines.
        </p>
      </div>

      {/* Center Giant Button */}
      <div className="flex flex-col items-center justify-center space-y-4 my-auto">
        <button
          onClick={handleClick}
          className={`relative group w-44 h-44 rounded-full bg-gradient-to-b from-[#A8452F] to-[#782D1C] text-white font-extrabold text-base tracking-wider uppercase shadow-2xl border-4 border-[#5E2214] flex flex-col items-center justify-center transition-all duration-150 active:scale-95 active:shadow-inner cursor-pointer ${
            isGlitching ? 'shake-it ring-8 ring-red-400' : 'hover:scale-105'
          }`}
        >
          {/* Paper button inner rim */}
          <div className="absolute inset-2 rounded-full border border-white/20 pointer-events-none" />
          
          <AlertOctagon className="w-8 h-8 mb-1 text-white/90 group-hover:animate-bounce" />
          <span className="font-display tracking-tight text-lg">DO NOT</span>
          <span className="text-xs tracking-widest text-[#FDEBE8]">CLICK</span>

          <span className="text-[10px] font-mono mt-1 opacity-80 bg-black/30 px-2 py-0.5 rounded-full">
            Clicks: {clickCount}
          </span>
        </button>

        {/* Reaction message box */}
        <div className="w-full max-w-sm p-3.5 bg-white border border-[#DDD3C2] rounded-xl text-center shadow-xs space-y-1.5 animate-in zoom-in-95">
          <div className="text-[10px] uppercase font-bold text-[#8C7D6E] font-mono">
            System Reaction ({clickCount} clicks):
          </div>
          <div className="text-sm font-bold text-[#8C3A27] font-mono leading-snug">
            "{currentMessage}"
          </div>
        </div>

        {unlockedAchievement && (
          <div className="p-2.5 bg-[#FFF8E6] border border-[#E8CE7D] rounded-xl text-[#785B12] text-xs font-bold flex items-center gap-2 shadow-xs animate-bounce">
            <Award className="w-4 h-4 text-[#C28B38]" />
            <span>{unlockedAchievement}</span>
          </div>
        )}
      </div>

      {/* Footer Reset */}
      <div className="w-full flex items-center justify-between pt-2 border-t border-[#E4DCCE] text-xs text-[#7A6B5D]">
        <span className="font-mono text-[11px]">Protocol: Disobedience Tracker</span>
        <button
          onClick={handleReset}
          className="text-[#8C3A27] hover:underline font-bold text-xs flex items-center gap-1 cursor-pointer"
        >
          <RefreshCw className="w-3 h-3" />
          <span>Reset Counter</span>
        </button>
      </div>
    </div>
  );
};
