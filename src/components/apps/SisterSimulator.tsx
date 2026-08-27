import React, { useState } from 'react';
import { SIMULATOR_SCENARIOS } from '../../data/mockData';
import { playClickSound, playErrorSound, playSuccessSound, playAlarmSound } from '../../utils/sound';
import { Gamepad2, Award, RefreshCw, Heart, Flame, ShieldAlert, Sparkles, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export const SisterSimulator: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [survivalRate, setSurvivalRate] = useState<number>(100);
  const [dramaIndex, setDramaIndex] = useState<number>(10);
  const [selectedReaction, setSelectedReaction] = useState<string | null>(null);
  const [selectedBadge, setSelectedBadge] = useState<string | null>(null);
  const [collectedBadges, setCollectedBadges] = useState<string[]>([]);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isVictorious, setIsVictorious] = useState<boolean>(false);

  const scenario = SIMULATOR_SCENARIOS[currentIdx];

  const handleChoice = (option: typeof SIMULATOR_SCENARIOS[0]['options'][0]) => {
    playClickSound();
    
    const newSurvival = Math.max(0, Math.min(100, survivalRate + option.survivalChange));
    const newDrama = Math.max(0, Math.min(100, dramaIndex + option.dramaChange));
    
    setSurvivalRate(newSurvival);
    setDramaIndex(newDrama);
    setSelectedReaction(option.reaction);

    if (option.badgeAwarded && !collectedBadges.includes(option.badgeAwarded)) {
      setSelectedBadge(option.badgeAwarded);
      setCollectedBadges(prev => [...prev, option.badgeAwarded!]);
    } else {
      setSelectedBadge(null);
    }

    if (newSurvival <= 0 || newDrama >= 100) {
      playAlarmSound();
      setIsGameOver(true);
    } else if (currentIdx === SIMULATOR_SCENARIOS.length - 1) {
      playSuccessSound();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
      setIsVictorious(true);
    } else {
      if (option.survivalChange > 0) {
        playSuccessSound();
      } else {
        playErrorSound();
      }
    }
  };

  const handleNext = () => {
    playClickSound();
    setSelectedReaction(null);
    setSelectedBadge(null);
    if (currentIdx < SIMULATOR_SCENARIOS.length - 1) {
      setCurrentIdx(prev => prev + 1);
    }
  };

  const handleRestart = () => {
    playClickSound();
    setCurrentIdx(0);
    setSurvivalRate(100);
    setDramaIndex(10);
    setSelectedReaction(null);
    setSelectedBadge(null);
    setIsGameOver(false);
    setIsVictorious(false);
  };

  return (
    <div className="flex flex-col h-full bg-[#FAF7F2] text-[#2A221B] select-none text-sm">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-[#D8CFBE] px-4 py-2.5 bg-[#F0EAE1]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#C28B38] text-white flex items-center justify-center font-bold text-sm shadow-xs">
            <Gamepad2 className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-xs tracking-wide uppercase text-[#2A221B] flex items-center gap-1.5">
              <span>SISTER SIMULATOR 2026</span>
              <span className="bg-[#EADDC9] text-[#5A4839] text-[10px] px-1.5 py-0.2 rounded font-mono">v1.4</span>
            </div>
            <div className="text-[11px] text-[#7A6B5D] font-mono">Brother Survival Protocol</div>
          </div>
        </div>

        {/* Meters */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-lg border border-[#DDD3C2] shadow-2xs">
            <Heart className={`w-3.5 h-3.5 ${survivalRate < 30 ? 'text-red-600 animate-pulse' : 'text-emerald-600'}`} />
            <span className="text-xs font-bold font-mono">{survivalRate}%</span>
          </div>
          <div className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-lg border border-[#DDD3C2] shadow-2xs">
            <Flame className="w-3.5 h-3.5 text-orange-600" />
            <span className="text-xs font-bold font-mono">{dramaIndex}%</span>
          </div>
        </div>
      </div>

      {/* Main Game Screen */}
      <div className="flex-1 p-4 overflow-y-auto flex flex-col justify-between space-y-4">
        {isGameOver ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6 bg-[#FDF0EE] border-2 border-[#F1B8AF] rounded-2xl space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#8C3A27] text-white flex items-center justify-center text-2xl shadow-lg">
              💀
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-[#8C3A27] font-display">
                SURVIVAL RATE REACHED 0%
              </h2>
              <p className="text-xs text-[#6E4237] mt-1 max-w-md mx-auto">
                You made too many questionable sibling decisions. Didi has revoked your breathing license and confiscated your snacks for the next 7 lunar cycles.
              </p>
            </div>

            {collectedBadges.length > 0 && (
              <div className="flex flex-wrap gap-1.5 justify-center max-w-sm">
                {collectedBadges.map((b, i) => (
                  <span key={i} className="text-[11px] font-bold bg-white text-[#8C3A27] px-2 py-0.5 rounded-full border border-[#E9C3BC]">
                    🎖️ {b}
                  </span>
                ))}
              </div>
            )}

            <button
              onClick={handleRestart}
              className="px-5 py-2 bg-[#8C3A27] hover:bg-[#742B1A] text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-2 transition-transform active:scale-95 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Respawn as Sibling</span>
            </button>
          </div>
        ) : isVictorious ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6 bg-[#F4F9F2] border-2 border-[#BEE3C8] rounded-2xl space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#2D7344] text-white flex items-center justify-center text-2xl shadow-lg">
              👑
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-[#2D7344] font-display">
                RAKSHA BANDHAN SURVIVOR!
              </h2>
              <p className="text-xs text-[#3E6B4F] mt-1 max-w-md mx-auto">
                Incredible! You successfully navigated Didi's moods, paid the snack tax, and avoided catastrophic family courtrooms. You are certified sibling royalty.
              </p>
            </div>

            <div className="bg-white p-3 rounded-xl border border-[#C5E4CE] shadow-xs max-w-sm w-full">
              <div className="text-[11px] font-bold uppercase text-[#2D7344] mb-2 flex items-center justify-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Unlocked Achievements</span>
              </div>
              <div className="flex flex-wrap gap-1.5 justify-center">
                {collectedBadges.map((b, i) => (
                  <span key={i} className="text-xs font-bold bg-[#EBF7EE] text-[#1F6236] px-2.5 py-1 rounded-lg border border-[#BDE3C6]">
                    🏆 {b}
                  </span>
                ))}
                {collectedBadges.length === 0 && (
                  <span className="text-xs text-[#52775E] italic">Certified Silent Sibling</span>
                )}
              </div>
            </div>

            <button
              onClick={handleRestart}
              className="px-5 py-2 bg-[#2D7344] hover:bg-[#235C35] text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-2 transition-transform active:scale-95 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Play Another Round</span>
            </button>
          </div>
        ) : (
          <>
            {/* Scenario Card */}
            <div className="bg-white border border-[#DDD3C2] rounded-xl p-4 shadow-xs space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#8C3A27] bg-[#FAF3EA] px-2 py-0.5 rounded border border-[#ECDCC9]">
                  Scenario {scenario.id} of {SIMULATOR_SCENARIOS.length}
                </span>
                <span className="font-semibold text-[#7A6B5D] flex items-center gap-1">
                  <ShieldAlert className="w-3.5 h-3.5 text-[#C28B38]" />
                  <span>Threat Level: HIGH</span>
                </span>
              </div>

              <div>
                <h3 className="font-extrabold text-base text-[#2A221B] font-display">
                  {scenario.title}
                </h3>
                <p className="text-xs text-[#544638] mt-1 leading-relaxed">
                  {scenario.situation}
                </p>
                <div className="mt-2 text-xs font-semibold text-[#8C3A27] bg-[#FAF5EE] p-2 rounded-lg border border-[#E9DFCE] italic">
                  "{scenario.context}"
                </div>
              </div>
            </div>

            {/* Reaction Feedback */}
            {selectedReaction && (
              <div className="p-3.5 bg-[#FAF5ED] border border-[#DDD0BC] rounded-xl text-xs space-y-2 animate-in fade-in zoom-in-95">
                <div className="font-bold text-[#2A221B] flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#8C3A27]" />
                  <span>Didi's Reaction:</span>
                </div>
                <p className="text-xs text-[#524436] font-mono leading-relaxed bg-white p-2.5 rounded-lg border border-[#E8DEC9]">
                  {selectedReaction}
                </p>
                {selectedBadge && (
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#F9EAD2] text-[#865917] rounded-lg text-xs font-bold border border-[#E6D1AF]">
                    <Award className="w-3.5 h-3.5" />
                    <span>Achievement Unlocked: {selectedBadge}</span>
                  </div>
                )}

                <div className="pt-1 flex justify-end">
                  <button
                    onClick={handleNext}
                    className="px-4 py-1.5 bg-[#8C3A27] hover:bg-[#742B1A] text-white font-bold text-xs rounded-lg shadow-xs transition-transform active:scale-95 cursor-pointer"
                  >
                    Continue to Next Crisis →
                  </button>
                </div>
              </div>
            )}

            {/* Choices list */}
            {!selectedReaction && (
              <div className="space-y-2">
                <div className="text-[11px] font-bold uppercase text-[#7A6B5D] px-1">
                  Choose your survival action:
                </div>
                {scenario.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleChoice(opt)}
                    className="w-full text-left p-3 bg-white hover:bg-[#FAF6EE] border border-[#DDD3C2] hover:border-[#8C3A27] rounded-xl text-xs text-[#2A221B] font-medium transition-all shadow-2xs active:scale-99 flex items-start gap-2.5 group cursor-pointer"
                  >
                    <span className="w-5 h-5 rounded-md bg-[#F2EBE0] group-hover:bg-[#8C3A27] group-hover:text-white flex items-center justify-center font-mono font-bold text-[11px] shrink-0 transition-colors">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="flex-1 leading-snug">{opt.text}</span>
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Footer info */}
      <div className="border-t border-[#D8CFBE] px-4 py-2 bg-[#F0EAE1] flex items-center justify-between text-[11px] text-[#7A6B5D] font-mono">
        <span>Sister AI Simulation Engine v2.0</span>
        <span>Accuracy: 100% Based on Real Trauma</span>
      </div>
    </div>
  );
};
