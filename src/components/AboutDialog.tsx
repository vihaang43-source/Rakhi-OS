import React from 'react';
import { playClickSound } from '../utils/sound';
import { Sparkles, X, Heart, Shield, Award, Terminal } from 'lucide-react';

interface AboutDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutDialog: React.FC<AboutDialogProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 select-none animate-in fade-in"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-[#FAF7F2] border-2 border-[#D8CFBE] rounded-3xl p-6 paper-shadow-lg text-[#2A221B] space-y-4 animate-in zoom-in-95 text-center"
      >
        {/* Emblem */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-b from-[#8C3A27] to-[#682416] text-[#FAF7F2] flex items-center justify-center mx-auto shadow-md text-3xl font-black font-display">
          D
        </div>

        <div>
          <h2 className="text-xl font-extrabold text-[#2A221B] font-display">
            DIDI OS
          </h2>
          <div className="text-xs font-mono font-bold text-[#8C3A27] mt-0.5">
            Version 2.0.26 (Build 2026.08.27-RAKHI)
          </div>
          <div className="text-[11px] text-[#7A6B5D] font-mono mt-0.5">
            Official Raksha Bandhan Meme Edition
          </div>
        </div>

        <div className="p-3 bg-white border border-[#DDD3C2] rounded-xl text-xs text-[#524436] text-left space-y-2 font-mono leading-relaxed shadow-xs">
          <div className="flex items-center gap-1.5 font-bold text-[#8C3A27]">
            <Shield className="w-3.5 h-3.5" />
            <span>SYSTEM SPECIFICATIONS:</span>
          </div>
          <div>• 0% Sentimentality & Fluff</div>
          <div>• 100% Roasting & Drama Acceleration</div>
          <div>• 24/7 Brother Protection Protocols</div>
          <div>• Mandatory Snack Sharing Monopoly</div>
        </div>

        <p className="text-xs text-[#7A6B5D] italic">
          "A completely unnecessary operating system built with obsessive craftsmanship for Raksha Bandhan."
        </p>

        <button
          onClick={() => { playClickSound(); onClose(); }}
          className="w-full py-2 bg-[#8C3A27] hover:bg-[#742B1A] text-white font-bold text-xs rounded-xl shadow-xs transition-transform active:scale-95 cursor-pointer font-mono"
        >
          Close System Profile
        </button>
      </div>
    </div>
  );
};
