import React, { useState } from 'react';
import { AppId, AppMetadata } from '../types';
import { playClickSound, playOpenSound } from '../utils/sound';
import { Search, X, Sparkles } from 'lucide-react';

interface AppDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  apps: AppMetadata[];
  onLaunchApp: (id: AppId) => void;
}

export const AppDrawer: React.FC<AppDrawerProps> = ({
  isOpen,
  onClose,
  apps,
  onLaunchApp
}) => {
  const [search, setSearch] = useState<string>('');

  if (!isOpen) return null;

  const filteredApps = apps.filter(app => 
    app.title.toLowerCase().includes(search.toLowerCase()) ||
    app.tagline.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 bg-[#2A221B]/40 backdrop-blur-md flex items-center justify-center p-4 select-none animate-in fade-in"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl bg-[#FAF7F2] border-2 border-[#D8CFBE] rounded-3xl p-6 paper-shadow-lg space-y-5 animate-in zoom-in-95"
      >
        {/* Search header */}
        <div className="flex items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C7D6E]" />
            <input
              type="text"
              placeholder="Search apps, grievances, sarcasm tools..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#D5CABB] rounded-2xl text-xs md:text-sm text-[#2A221B] placeholder-[#A49688] focus:outline-none focus:border-[#8C3A27] shadow-inner font-mono"
            />
          </div>

          <button
            onClick={() => { playClickSound(); onClose(); }}
            className="p-2 rounded-full hover:bg-[#EFE9DF] text-[#544638] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category banner */}
        <div className="flex items-center justify-between text-xs text-[#7A6B5D] px-1 font-mono">
          <span className="font-bold uppercase tracking-wider">Installed Sibling Applications</span>
          <span>Version 2.0.26</span>
        </div>

        {/* Apps Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 max-h-[60vh] overflow-y-auto p-1">
          {filteredApps.map((app) => (
            <button
              key={app.id}
              onClick={() => {
                playOpenSound();
                onLaunchApp(app.id);
                onClose();
              }}
              className="p-3 bg-white hover:bg-[#FAF5ED] border border-[#DDD3C2] hover:border-[#8C3A27] rounded-2xl flex flex-col items-center text-center transition-all duration-150 hover:-translate-y-1 active:scale-95 shadow-2xs group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-[#FAF5EE] group-hover:bg-white border border-[#E3D9CC] flex items-center justify-center text-2xl mb-2 shadow-xs transition-colors">
                {app.icon}
              </div>
              <div className="font-bold text-xs text-[#2A221B] line-clamp-1">
                {app.shortTitle}
              </div>
              <div className="text-[10px] text-[#7A6B5D] line-clamp-1 mt-0.5 font-mono">
                {app.tagline}
              </div>
            </button>
          ))}

          {filteredApps.length === 0 && (
            <div className="col-span-full py-8 text-center text-xs text-[#8C7D6E] italic font-mono">
              No matching apps found in Didi OS.
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="pt-2 border-t border-[#EAE2D5] flex items-center justify-between text-[11px] text-[#7A6B5D] font-mono">
          <span className="flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-[#C28B38]" />
            <span>Raksha Bandhan 2026 Special Edition</span>
          </span>
          <span>Press ESC or click outside to dismiss</span>
        </div>
      </div>
    </div>
  );
};
