import React, { useState, useEffect } from 'react';
import { playClickSound, playErrorSound, playSuccessSound } from '../utils/sound';
import { Wifi, BatteryMedium, Volume2, VolumeX, Bell, AlertTriangle, Power, Sparkles, HelpCircle, Shield, Info } from 'lucide-react';

interface TopBarProps {
  activeAppName?: string;
  isMuted: boolean;
  onToggleMute: () => void;
  notificationCount: number;
  onToggleNotificationCenter: () => void;
  onOpenAbout: () => void;
  onTriggerBSOD: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  activeAppName = "Desktop",
  isMuted,
  onToggleMute,
  notificationCount,
  onToggleNotificationCenter,
  onOpenAbout,
  onTriggerBSOD
}) => {
  const [time, setTime] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [showDidiMenu, setShowDidiMenu] = useState<boolean>(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      setDate(now.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleMenuClick = (menu: string) => {
    playClickSound();
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  return (
    <div className="h-8 bg-[#EFE9DE]/95 backdrop-blur-md border-b border-[#D8CFBE] px-3 flex items-center justify-between text-xs text-[#2A221B] select-none z-50 fixed top-0 left-0 right-0 shadow-2xs font-mono">
      {/* Left Menu Cluster */}
      <div className="flex items-center gap-1">
        {/* Didi OS Apple-style logo button */}
        <div className="relative">
          <button
            onClick={() => { playClickSound(); setShowDidiMenu(!showDidiMenu); }}
            className={`px-2 py-0.5 rounded font-black text-xs flex items-center gap-1 transition-colors cursor-pointer ${
              showDidiMenu ? 'bg-[#3E2C20] text-white' : 'hover:bg-[#E2D8C7] text-[#8C3A27]'
            }`}
          >
            <span className="font-extrabold tracking-tight">DIDI OS</span>
          </button>

          {/* Didi OS System Menu Dropdown */}
          {showDidiMenu && (
            <div 
              onMouseLeave={() => setShowDidiMenu(false)}
              className="absolute left-0 top-7 w-56 bg-[#FAF7F2] border border-[#D8CFBE] rounded-xl shadow-xl py-1.5 z-50 text-xs font-sans animate-in fade-in zoom-in-95"
            >
              <div className="px-3 py-1 text-[11px] font-bold text-[#8C3A27] border-b border-[#EAE2D5] flex items-center justify-between">
                <span>DIDI OS v2.0.26</span>
                <span className="bg-[#FAF3EA] px-1.5 py-0.5 rounded text-[10px] border border-[#E8DFC8]">Official</span>
              </div>

              <button
                onClick={() => { setShowDidiMenu(false); onOpenAbout(); }}
                className="w-full text-left px-3 py-1.5 hover:bg-[#F0E8DC] flex items-center gap-2 text-[#2A221B] cursor-pointer"
              >
                <Info className="w-3.5 h-3.5 text-[#8C3A27]" />
                <span>About Didi OS 2.0</span>
              </button>

              <button
                onClick={() => {
                  setShowDidiMenu(false);
                  playErrorSound();
                  alert("FORCE QUIT FAILED: Brother does not have permission to terminate Sibling OS processes.");
                }}
                className="w-full text-left px-3 py-1.5 hover:bg-[#F0E8DC] flex items-center gap-2 text-[#2A221B] cursor-pointer"
              >
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                <span>Force Quit Brother...</span>
              </button>

              <button
                onClick={() => {
                  setShowDidiMenu(false);
                  playSuccessSound();
                  alert("RESTART IN SARCASM MODE: All system dialogs now 300% more sarcastic.");
                }}
                className="w-full text-left px-3 py-1.5 hover:bg-[#F0E8DC] flex items-center gap-2 text-[#2A221B] cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#C28B38]" />
                <span>Restart in Sarcasm Mode</span>
              </button>

              <div className="my-1 border-t border-[#EAE2D5]" />

              <button
                onClick={() => { setShowDidiMenu(false); onTriggerBSOD(); }}
                className="w-full text-left px-3 py-1.5 hover:bg-[#FDF0EE] flex items-center gap-2 text-[#8C3A27] font-bold cursor-pointer"
              >
                <Power className="w-3.5 h-3.5" />
                <span>Shut Down (Kernel Panic)</span>
              </button>
            </div>
          )}
        </div>

        {/* Current Active App Name */}
        <div className="font-bold text-xs px-2 py-0.5 rounded text-[#2A221B] hidden sm:block">
          {activeAppName}
        </div>

        {/* Fake Desktop Menus */}
        <div className="hidden md:flex items-center gap-0.5 text-xs text-[#6A5A4D]">
          <button 
            onClick={() => { playClickSound(); alert("FILE MENU: All brother files are subject to search and seizure."); }}
            className="px-2 py-0.5 rounded hover:bg-[#E2D8C7] transition-colors cursor-pointer"
          >
            File
          </button>
          <button 
            onClick={() => { playClickSound(); alert("DRAMA MENU: Drama is permanently locked at 100%."); }}
            className="px-2 py-0.5 rounded hover:bg-[#E2D8C7] transition-colors cursor-pointer"
          >
            Drama
          </button>
          <button 
            onClick={() => { playClickSound(); alert("SARCASM MENU: Bandwidth unlimited."); }}
            className="px-2 py-0.5 rounded hover:bg-[#E2D8C7] transition-colors cursor-pointer"
          >
            Sarcasm
          </button>
        </div>
      </div>

      {/* Right Status Cluster */}
      <div className="flex items-center gap-2 md:gap-3 text-xs text-[#544638]">
        {/* Sound FX Toggle */}
        <button
          onClick={onToggleMute}
          title={isMuted ? "Sound Effects Muted" : "Sound Effects Enabled"}
          className="p-1 hover:bg-[#E2D8C7] rounded transition-colors cursor-pointer"
        >
          {isMuted ? (
            <VolumeX className="w-3.5 h-3.5 text-[#8C7D6E]" />
          ) : (
            <Volume2 className="w-3.5 h-3.5 text-[#8C3A27]" />
          )}
        </button>

        {/* WiFi Indicator */}
        <div 
          title="WiFi: Connected to 5G_NO_CHIPS_LEFT"
          className="flex items-center gap-1 cursor-help hover:text-[#8C3A27]"
        >
          <Wifi className="w-3.5 h-3.5 text-emerald-700" />
          <span className="text-[11px] hidden lg:inline font-mono">5G_NO_CHIPS</span>
        </div>

        {/* Battery Indicator */}
        <div 
          title="Battery: 1% (Requires Iced Chai Refill)"
          className="flex items-center gap-1 cursor-help hover:text-[#8C3A27]"
        >
          <BatteryMedium className="w-3.5 h-3.5 text-amber-700" />
          <span className="text-[11px] hidden sm:inline font-mono">1% Chai</span>
        </div>

        {/* Clock & Date */}
        <div className="font-semibold text-xs text-[#2A221B] px-1 font-mono">
          <span className="hidden sm:inline mr-1">{date}</span>
          <span>{time}</span>
        </div>

        {/* Notification Bell */}
        <button
          onClick={() => { playClickSound(); onToggleNotificationCenter(); }}
          title="Open Notification Center"
          className="relative p-1 hover:bg-[#E2D8C7] rounded transition-colors cursor-pointer"
        >
          <Bell className="w-3.5 h-3.5 text-[#2A221B]" />
          {notificationCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#8C3A27] text-white text-[9px] font-bold rounded-full flex items-center justify-center font-mono">
              {notificationCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
};
