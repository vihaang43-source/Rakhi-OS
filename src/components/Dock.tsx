import React from 'react';
import { AppId, AppMetadata, WindowInstance } from '../types';
import { playClickSound, playOpenSound } from '../utils/sound';
import { LayoutGrid, AlertOctagon } from 'lucide-react';

interface DockProps {
  apps: AppMetadata[];
  windows: Record<AppId, WindowInstance>;
  onOpenApp: (id: AppId) => void;
  onOpenDrawer: () => void;
  onOpenDoNotClick: () => void;
}

export const Dock: React.FC<DockProps> = ({
  apps,
  windows,
  onOpenApp,
  onOpenDrawer,
  onOpenDoNotClick
}) => {
  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 max-w-[95vw]">
      <div className="bg-[#FAF6EE]/90 backdrop-blur-md border border-[#D8CFBE] p-2 rounded-2xl paper-shadow flex items-center gap-1.5 md:gap-2">
        {/* App Drawer Launcher */}
        <button
          onClick={() => { playClickSound(); onOpenDrawer(); }}
          title="Open App Drawer"
          className="relative group p-2 md:p-2.5 rounded-xl bg-[#EBE3D5] hover:bg-[#DDD3C2] text-[#3E2C20] transition-all duration-200 hover:-translate-y-1.5 active:scale-95 cursor-pointer shadow-xs flex flex-col items-center"
        >
          <LayoutGrid className="w-5 h-5 md:w-6 md:h-6" />
          <span className="sr-only">App Drawer</span>

          {/* Tooltip */}
          <div className="absolute -top-9 bg-[#2A221B] text-white text-[10px] font-bold py-1 px-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap font-mono shadow-md">
            App Drawer
          </div>
        </button>

        <div className="h-6 w-px bg-[#D8CFBE] mx-0.5" />

        {/* Dock App Icons */}
        {apps.map((app) => {
          const win = windows[app.id];
          const isOpen = win?.isOpen;
          const isMinimized = win?.isMinimized;

          return (
            <button
              key={app.id}
              onClick={() => {
                if (isOpen && isMinimized) {
                  playOpenSound();
                } else {
                  playClickSound();
                }
                onOpenApp(app.id);
              }}
              title={app.title}
              className="relative group p-1.5 md:p-2 rounded-xl hover:bg-[#F2ECE1] transition-all duration-200 hover:-translate-y-2 active:scale-95 cursor-pointer flex flex-col items-center"
            >
              {/* App Icon Visual */}
              <div className="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-white border border-[#DDD3C2] shadow-xs flex items-center justify-center text-xl md:text-2xl group-hover:scale-105 transition-transform">
                <span>{app.icon}</span>
              </div>

              {/* Running Dot Indicator */}
              {isOpen && (
                <div className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-[#8C3A27]" />
              )}

              {/* Hover Tooltip */}
              <div className="absolute -top-9 bg-[#2A221B] text-white text-[10px] font-bold py-1 px-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap font-mono shadow-md z-50">
                {app.shortTitle}
              </div>
            </button>
          );
        })}

        <div className="h-6 w-px bg-[#D8CFBE] mx-0.5" />

        {/* Easter Egg Button Launcher */}
        <button
          onClick={() => { playClickSound(); onOpenDoNotClick(); }}
          title="DO NOT CLICK"
          className="relative group p-1.5 md:p-2 rounded-xl bg-[#FDF0EE] hover:bg-[#FCE0DA] border border-[#F1B8AF] text-[#8C3A27] transition-all duration-200 hover:-translate-y-2 active:scale-95 cursor-pointer shadow-xs flex items-center gap-1.5 px-2.5"
        >
          <AlertOctagon className="w-4 h-4 md:w-5 md:h-5 text-[#8C3A27] animate-pulse" />
          <span className="font-extrabold text-[11px] uppercase tracking-wider hidden sm:inline text-[#8C3A27]">
            DO NOT CLICK
          </span>

          {/* Tooltip */}
          <div className="absolute -top-9 bg-[#8C3A27] text-white text-[10px] font-bold py-1 px-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap font-mono shadow-md">
            ⚠️ Restricted Zone
          </div>
        </button>
      </div>
    </div>
  );
};
