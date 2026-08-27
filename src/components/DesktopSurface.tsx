import React from 'react';
import { AppId, AppMetadata } from '../types';
import { playClickSound, playOpenSound } from '../utils/sound';
import { AlertOctagon, Sparkles, Shield, Flame } from 'lucide-react';

interface DesktopSurfaceProps {
  apps: AppMetadata[];
  onOpenApp: (id: AppId) => void;
  onOpenDoNotClick: () => void;
}

export const DesktopSurface: React.FC<DesktopSurfaceProps> = ({
  apps,
  onOpenApp,
  onOpenDoNotClick
}) => {
  return (
    <div className="relative w-full h-full p-4 pt-12 pb-24 overflow-hidden flex flex-col justify-between select-none">
      {/* Background Handmade Paper Branding & Watermark */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-[0.06] select-none">
        <div className="text-8xl md:text-9xl font-black font-display tracking-widest text-[#2A221B]">
          DIDI OS
        </div>
        <div className="text-xl md:text-2xl font-mono font-bold tracking-widest text-[#2A221B] mt-2">
          VERSION 2.0.26
        </div>
        <div className="text-sm font-mono tracking-widest text-[#8C3A27] mt-1 uppercase">
          Raksha Bandhan Sibling OS • Zero Sentimentality
        </div>
      </div>

      {/* Top Banner / Card Subtitle */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="space-y-0.5">
          <div className="text-xs font-mono font-bold text-[#8C3A27] flex items-center gap-1.5 uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#8C3A27] animate-ping" />
            <span>Raksha Bandhan Edition 2026</span>
          </div>
          <div className="text-[11px] text-[#7A6B5D] font-mono">
            Designed for: Sibling Sarcasm & Mandatory Shagun Recovery
          </div>
        </div>

        {/* Quick Card Badge */}
        <div className="hidden sm:flex items-center gap-2 bg-[#FAF7F2]/80 border border-[#DDD3C2] px-3 py-1.5 rounded-xl shadow-2xs backdrop-blur-xs font-mono text-xs">
          <Shield className="w-3.5 h-3.5 text-emerald-700" />
          <span className="font-bold text-[#2A221B]">Brother Protection:</span>
          <span className="text-emerald-700 font-bold">ACTIVE</span>
        </div>
      </div>

      {/* Desktop App Icons Grid */}
      <div className="relative z-10 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 sm:gap-4 my-auto max-w-5xl">
        {apps.map((app) => (
          <button
            key={app.id}
            onClick={() => {
              playOpenSound();
              onOpenApp(app.id);
            }}
            className="group flex flex-col items-center p-2.5 rounded-2xl hover:bg-[#FAF6EE]/90 transition-all duration-150 active:scale-95 cursor-pointer text-center"
          >
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white group-hover:bg-[#FAF5ED] border border-[#DDD3C2] group-hover:border-[#8C3A27] shadow-xs flex items-center justify-center text-3xl sm:text-4xl mb-1.5 transition-transform group-hover:scale-105">
              <span>{app.icon}</span>
            </div>
            <span className="font-bold text-xs text-[#2A221B] group-hover:text-[#8C3A27] transition-colors leading-tight font-sans">
              {app.shortTitle}
            </span>
            <span className="text-[10px] text-[#8C7D6E] font-mono leading-none mt-0.5 line-clamp-1">
              {app.tagline}
            </span>
          </button>
        ))}

        {/* Easter Egg Icon on Desktop */}
        <button
          onClick={() => {
            playClickSound();
            onOpenDoNotClick();
          }}
          className="group flex flex-col items-center p-2.5 rounded-2xl hover:bg-[#FDF0EE]/90 transition-all duration-150 active:scale-95 cursor-pointer text-center"
        >
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#FDF0EE] group-hover:bg-[#FCE2DC] border-2 border-[#F1B8AF] shadow-xs flex items-center justify-center text-3xl sm:text-4xl mb-1.5 transition-transform group-hover:scale-105 animate-pulse">
            <AlertOctagon className="w-8 h-8 text-[#8C3A27]" />
          </div>
          <span className="font-extrabold text-xs text-[#8C3A27] leading-tight font-mono">
            DO NOT CLICK
          </span>
          <span className="text-[10px] text-[#B85D48] font-mono leading-none mt-0.5">
            Restricted
          </span>
        </button>
      </div>

      {/* Bottom Subtle Sibling Creed */}
      <div className="relative z-10 flex flex-wrap items-center justify-between text-[11px] text-[#7A6B5D] font-mono border-t border-[#D8CFBE]/60 pt-2">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#C28B38]" />
          <span>DIDI OS v2.0.26: "Patience 2% • Drama 100%"</span>
        </div>
        <div className="hidden sm:block">
          Tap any app to launch • Double click headers to maximize
        </div>
      </div>
    </div>
  );
};
