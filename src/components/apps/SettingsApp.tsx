import React, { useState } from 'react';
import { playClickSound, playErrorSound, playSuccessSound } from '../../utils/sound';
import { Settings as SettingsIcon, Shield, Flame, Bell, Volume2, Sparkles, AlertTriangle, Lock, Check } from 'lucide-react';
import { OSTheme } from '../../types';

interface SettingsAppProps {
  currentTheme: string;
  onThemeChange: (themeId: OSTheme['id']) => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const SettingsApp: React.FC<SettingsAppProps> = ({
  currentTheme,
  onThemeChange,
  isMuted,
  onToggleMute
}) => {
  const [dramaMode, setDramaMode] = useState<boolean>(true);
  const [roastingMode, setRoastingMode] = useState<string>('MAX');
  const [brotherProtection, setBrotherProtection] = useState<boolean>(true);
  const [snackSharing, setSnackSharing] = useState<boolean>(false);
  const [peaceAlert, setPeaceAlert] = useState<boolean>(false);
  const [lockedNotice, setLockedNotice] = useState<string | null>(null);

  const handleToggleDrama = () => {
    playErrorSound();
    setLockedNotice("PERMISSION DENIED: Drama Mode is a core kernel dependency and cannot be toggled off.");
    setTimeout(() => setLockedNotice(null), 3000);
  };

  const handleToggleBrotherProtection = () => {
    playErrorSound();
    setLockedNotice("CANNOT DISABLE: Brother Protection is hard-coded in the sibling treaty (2014-forever).");
    setTimeout(() => setLockedNotice(null), 3000);
  };

  const handleTogglePeace = () => {
    playErrorSound();
    setPeaceAlert(true);
  };

  return (
    <div className="flex flex-col h-full bg-[#FAF7F2] text-[#2A221B] select-none text-sm">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-[#D8CFBE] px-4 py-2.5 bg-[#F0EAE1]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#5A4839] text-white flex items-center justify-center font-bold text-sm shadow-xs">
            <SettingsIcon className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-xs tracking-wide uppercase text-[#2A221B] flex items-center gap-1.5">
              <span>DIDI OS CONTROL PANEL & PREFERENCES</span>
            </div>
            <div className="text-[11px] text-[#7A6B5D] font-mono">User Privileges: RESTRICTED SIBLING</div>
          </div>
        </div>
      </div>

      {/* Main Settings Body */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {lockedNotice && (
          <div className="p-3 bg-[#FDF0EE] border border-[#F1B8AF] rounded-xl text-[#8C3A27] text-xs flex items-center gap-2 font-mono shadow-xs animate-in fade-in">
            <Lock className="w-4 h-4 shrink-0" />
            <span>{lockedNotice}</span>
          </div>
        )}

        {peaceAlert && (
          <div className="p-3.5 bg-[#FFF8E6] border-2 border-[#E5C158] rounded-xl text-[#785B12] text-xs space-y-2 shadow-xs animate-in zoom-in-95">
            <div className="font-bold flex items-center gap-1.5 text-sm">
              <AlertTriangle className="w-4 h-4 text-[#C28B38]" />
              <span>404 NOT FOUND: Sibling Peace Module</span>
            </div>
            <p className="leading-relaxed font-mono text-[11px]">
              Error 0x882_NO_PEACE: The requested feature "Peace Mode" was not found in the sibling database. Sibling conflict is a mandatory operating protocol.
            </p>
            <button
              onClick={() => setPeaceAlert(false)}
              className="px-3 py-1 bg-[#C28B38] text-white font-bold text-xs rounded-lg shadow-xs cursor-pointer"
            >
              Acknowledge Inevitable Chaos
            </button>
          </div>
        )}

        {/* Essential Sibling Toggles */}
        <div className="bg-white border border-[#E3D9CC] rounded-xl divide-y divide-[#EFE9DF] shadow-xs">
          {/* Drama Mode */}
          <div className="p-3.5 flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="font-bold text-xs text-[#2A221B] flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-red-600" />
                <span>Drama Mode</span>
                <span className="text-[10px] bg-red-100 text-red-700 px-1.5 py-0.2 rounded font-mono font-bold">LOCKED ON</span>
              </div>
              <div className="text-[11px] text-[#7A6B5D]">Maintains optimum theatrical levels at all times.</div>
            </div>

            <button
              onClick={handleToggleDrama}
              className="w-12 h-6 bg-[#8C3A27] rounded-full p-0.5 flex items-center justify-end shadow-inner cursor-pointer"
            >
              <div className="w-5 h-5 bg-white rounded-full shadow-md flex items-center justify-center text-[10px] text-[#8C3A27] font-bold">
                <Lock className="w-3 h-3" />
              </div>
            </button>
          </div>

          {/* Roasting Mode */}
          <div className="p-3.5 flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="font-bold text-xs text-[#2A221B] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-orange-600" />
                <span>Roasting Mode</span>
              </div>
              <div className="text-[11px] text-[#7A6B5D]">Calibrate elder sister roast velocity and sarcasm index.</div>
            </div>

            <select
              value={roastingMode}
              onChange={(e) => { playClickSound(); setRoastingMode(e.target.value); }}
              className="px-3 py-1 bg-[#FAF5EE] border border-[#DDD3C2] rounded-lg text-xs font-bold text-[#8C3A27] font-mono focus:outline-none cursor-pointer"
            >
              <option value="MAX">MAX (Unforgiving)</option>
              <option value="BRUTAL">BRUTAL (100% Sarcasm)</option>
              <option value="EXTRA_SPICY">EXTRA SPICY (Includes childhood memories)</option>
            </select>
          </div>

          {/* Brother Protection */}
          <div className="p-3.5 flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="font-bold text-xs text-[#2A221B] flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-emerald-600" />
                <span>Brother Protection Protocol</span>
                <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.2 rounded font-mono font-bold">ACTIVE</span>
              </div>
              <div className="text-[11px] text-[#7A6B5D]">Only Didi is legally permitted to bully this brother.</div>
            </div>

            <button
              onClick={handleToggleBrotherProtection}
              className="w-12 h-6 bg-emerald-600 rounded-full p-0.5 flex items-center justify-end shadow-inner cursor-pointer"
            >
              <div className="w-5 h-5 bg-white rounded-full shadow-md flex items-center justify-center text-[10px] text-emerald-600 font-bold">
                <Check className="w-3 h-3" />
              </div>
            </button>
          </div>

          {/* Peace Mode (Useless Toggle) */}
          <div className="p-3.5 flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="font-bold text-xs text-[#2A221B] flex items-center gap-1.5">
                <Bell className="w-3.5 h-3.5 text-blue-600" />
                <span>Peace Mode</span>
                <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded font-mono font-bold">NOT FOUND</span>
              </div>
              <div className="text-[11px] text-[#7A6B5D]">Attempt to establish quiet household harmony.</div>
            </div>

            <button
              onClick={handleTogglePeace}
              className="w-12 h-6 bg-[#D8CFBE] rounded-full p-0.5 flex items-center justify-start shadow-inner cursor-pointer"
            >
              <div className="w-5 h-5 bg-white rounded-full shadow-md" />
            </button>
          </div>

          {/* Audio Sound FX */}
          <div className="p-3.5 flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="font-bold text-xs text-[#2A221B] flex items-center gap-1.5">
                <Volume2 className="w-3.5 h-3.5 text-[#5A4839]" />
                <span>Synthesized OS Sound Effects</span>
              </div>
              <div className="text-[11px] text-[#7A6B5D]">Audio clicks, scanner radar pings, and error buzzers.</div>
            </div>

            <button
              onClick={() => { playClickSound(); onToggleMute(); }}
              className={`w-12 h-6 rounded-full p-0.5 flex items-center transition-colors shadow-inner cursor-pointer ${
                !isMuted ? 'bg-[#3E2C20] justify-end' : 'bg-[#D8CFBE] justify-start'
              }`}
            >
              <div className="w-5 h-5 bg-white rounded-full shadow-md" />
            </button>
          </div>
        </div>

        {/* Paper Texture & Card Theme Selector */}
        <div className="bg-white border border-[#E3D9CC] rounded-xl p-3.5 shadow-xs space-y-2.5">
          <div className="font-bold text-xs text-[#2A221B] flex items-center justify-between">
            <span>Handmade Card Paper Theme</span>
            <span className="text-[11px] text-[#7A6B5D] font-mono">Custom Rakhi Card Texture</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {[
              { id: 'craft_card', name: 'Handmade Card (Warm Cream)', color: 'bg-[#F5F1E8]', border: 'border-[#D8CFBE]' },
              { id: 'aged_parchment', name: 'Aged Parchment (Vintage)', color: 'bg-[#EFE5D3]', border: 'border-[#D1C2A5]' },
              { id: 'royal_terracotta', name: 'Royal Terracotta (Card Red)', color: 'bg-[#FDF0EE]', border: 'border-[#F1B8AF]' },
              { id: 'dark_walnut', name: 'Dark Walnut (Night Sibling)', color: 'bg-[#29221C]', border: 'border-[#4A3C32]' },
            ].map((th) => (
              <button
                key={th.id}
                onClick={() => { playSuccessSound(); onThemeChange(th.id as OSTheme['id']); }}
                className={`p-2.5 rounded-xl border text-left flex flex-col justify-between h-18 transition-all active:scale-95 cursor-pointer ${
                  th.color
                } ${
                  currentTheme === th.id ? 'ring-2 ring-[#8C3A27] shadow-sm font-bold' : th.border
                }`}
              >
                <span className={`text-[11px] font-semibold leading-tight ${th.id === 'dark_walnut' ? 'text-white' : 'text-[#2A221B]'}`}>
                  {th.name}
                </span>
                {currentTheme === th.id && (
                  <span className="text-[10px] font-bold text-[#8C3A27] bg-white/90 px-1.5 py-0.5 rounded self-start font-mono">
                    Active
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-[#D8CFBE] px-4 py-2 bg-[#F0EAE1] flex items-center justify-between text-[11px] text-[#7A6B5D] font-mono">
        <span>Settings cannot override older sister authority.</span>
        <span>Version 2.0.26 (Build 2026.08.27)</span>
      </div>
    </div>
  );
};
