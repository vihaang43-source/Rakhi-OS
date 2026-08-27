import React, { useState, useEffect } from 'react';
import { AppId, AppMetadata, WindowInstance, SystemNotification, OSTheme } from './types';
import { SYSTEM_TOASTS } from './data/mockData';
import { playOpenSound, playClickSound, toggleMute, getMuteState } from './utils/sound';

import { TopBar } from './components/TopBar';
import { Dock } from './components/Dock';
import { DesktopSurface } from './components/DesktopSurface';
import { WindowFrame } from './components/WindowFrame';
import { AppDrawer } from './components/AppDrawer';
import { NotificationCenter } from './components/NotificationCenter';
import { AboutDialog } from './components/AboutDialog';
import { KernelPanic } from './components/KernelPanic';

import { DidiExe } from './components/apps/DidiExe';
import { MemeCalculator } from './components/apps/MemeCalculator';
import { SisterSimulator } from './components/apps/SisterSimulator';
import { DidiScanner } from './components/apps/DidiScanner';
import { ComplaintsExe } from './components/apps/ComplaintsExe';
import { SettingsApp } from './components/apps/SettingsApp';
import { TrashApp } from './components/apps/TrashApp';
import { GiftInvoiceApp } from './components/apps/GiftInvoiceApp';
import { TerminalApp } from './components/apps/TerminalApp';
import { DoNotClickWidget } from './components/apps/DoNotClickWidget';

const APPS: AppMetadata[] = [
  {
    id: 'didi_exe',
    title: 'Didi.exe — System Statistics',
    shortTitle: 'Didi.exe',
    icon: '💅',
    tagline: '100% Drama • 2% Patience',
    defaultWidth: 620,
    defaultHeight: 530,
    isExecutable: true
  },
  {
    id: 'calculator',
    title: 'Meme Calculator',
    shortTitle: 'Calculator',
    icon: '🧮',
    tagline: 'Didi + Attitude = ∞',
    defaultWidth: 580,
    defaultHeight: 520
  },
  {
    id: 'sister_simulator',
    title: 'Sister Simulator 2026',
    shortTitle: 'Simulator',
    icon: '🎮',
    tagline: 'Brother Survival Scenario Game',
    defaultWidth: 600,
    defaultHeight: 540
  },
  {
    id: 'didi_scanner',
    title: 'Didi Radar & Scanner',
    shortTitle: 'Scanner',
    icon: '🚨',
    tagline: 'There is no escape',
    defaultWidth: 540,
    defaultHeight: 530
  },
  {
    id: 'complaints',
    title: 'Complaints.exe — Sibling Docket',
    shortTitle: 'Complaints',
    icon: '📝',
    tagline: 'Why did you breathe so loudly?',
    defaultWidth: 640,
    defaultHeight: 520,
    isExecutable: true
  },
  {
    id: 'settings',
    title: 'Didi OS Settings',
    shortTitle: 'Settings',
    icon: '⚙️',
    tagline: 'Peace Mode: NOT FOUND',
    defaultWidth: 580,
    defaultHeight: 500
  },
  {
    id: 'trash',
    title: 'Trash Bin',
    shortTitle: 'Trash',
    icon: '🗑️',
    tagline: 'brother_opinions.txt (0 KB)',
    defaultWidth: 580,
    defaultHeight: 460
  },
  {
    id: 'gift_invoice',
    title: 'Rakhi Shagun Billing Invoice',
    shortTitle: 'Shagun Bill',
    icon: '🧾',
    tagline: 'Overdue Brother Tax',
    defaultWidth: 560,
    defaultHeight: 540
  },
  {
    id: 'terminal',
    title: 'Terminal (Didi Shell)',
    shortTitle: 'Terminal',
    icon: '💻',
    tagline: 'sudo get-remote (Denied)',
    defaultWidth: 540,
    defaultHeight: 420
  }
];

export default function App() {
  const [theme, setTheme] = useState<OSTheme['id']>('craft_card');
  const [isMuted, setIsMuted] = useState<boolean>(getMuteState());
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isNotifCenterOpen, setIsNotifCenterOpen] = useState<boolean>(false);
  const [isAboutOpen, setIsAboutOpen] = useState<boolean>(false);
  const [isBSODOpen, setIsBSODOpen] = useState<boolean>(false);
  const [isDoNotClickOpen, setIsDoNotClickOpen] = useState<boolean>(false);
  const [screenShake, setScreenShake] = useState<boolean>(false);

  // Active floating toast notifications
  const [notifications, setNotifications] = useState<SystemNotification[]>([
    {
      id: '1',
      title: 'Didi OS Booted',
      message: 'System loaded: Drama set to 100%, Patience set to 2%.',
      timestamp: 'Just now',
      icon: '💅'
    },
    {
      id: '2',
      title: 'Raksha Bandhan 2026',
      message: 'Notice: Shagun invoice has been generated for brother.',
      timestamp: '1m ago',
      icon: '🧾'
    }
  ]);

  const [toastQueue, setToastQueue] = useState<SystemNotification[]>([]);

  // Window instances dictionary
  const [windows, setWindows] = useState<Record<AppId, WindowInstance>>(() => {
    const initial: Partial<Record<AppId, WindowInstance>> = {};
    APPS.forEach((app, idx) => {
      // Cascade positions slightly for desktop feel
      const offsetX = 40 + (idx % 4) * 28;
      const offsetY = 50 + (idx % 4) * 24;

      initial[app.id] = {
        id: app.id,
        title: app.title,
        icon: app.icon,
        isOpen: app.id === 'didi_exe', // Open Didi.exe on launch as hero app!
        isMinimized: false,
        isMaximized: false,
        zIndex: app.id === 'didi_exe' ? 10 : 1,
        position: { x: offsetX, y: offsetY },
        size: { width: app.defaultWidth, height: app.defaultHeight }
      };
    });
    return initial as Record<AppId, WindowInstance>;
  });

  const [activeAppId, setActiveAppId] = useState<AppId | null>('didi_exe');
  const [topZ, setTopZ] = useState<number>(15);

  // Periodic random funny notifications
  useEffect(() => {
    const interval = setInterval(() => {
      const randomMsg = SYSTEM_TOASTS[Math.floor(Math.random() * SYSTEM_TOASTS.length)];
      const newNotif: SystemNotification = {
        id: Date.now().toString(),
        title: 'Sibling System Alert',
        message: randomMsg,
        timestamp: 'Just now',
        icon: '🔔'
      };

      setNotifications(prev => [newNotif, ...prev.slice(0, 15)]);
      setToastQueue(prev => [newNotif, ...prev.slice(0, 2)]);
    }, 45000);

    return () => clearInterval(interval);
  }, []);

  // Auto-dismiss floating toast notifications after 5s
  useEffect(() => {
    if (toastQueue.length > 0) {
      const timer = setTimeout(() => {
        setToastQueue(prev => prev.slice(1));
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [toastQueue]);

  const handleOpenApp = (id: AppId) => {
    setWindows(prev => {
      const current = prev[id];
      if (!current) return prev;
      const nextZ = topZ + 1;
      setTopZ(nextZ);
      setActiveAppId(id);

      return {
        ...prev,
        [id]: {
          ...current,
          isOpen: true,
          isMinimized: false,
          zIndex: nextZ
        }
      };
    });
  };

  const handleCloseWindow = (id: AppId) => {
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], isOpen: false }
    }));
    if (activeAppId === id) {
      setActiveAppId(null);
    }
  };

  const handleMinimizeWindow = (id: AppId) => {
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], isMinimized: true }
    }));
    if (activeAppId === id) {
      setActiveAppId(null);
    }
  };

  const handleToggleMaximize = (id: AppId) => {
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], isMaximized: !prev[id].isMaximized }
    }));
  };

  const handleFocusWindow = (id: AppId) => {
    const nextZ = topZ + 1;
    setTopZ(nextZ);
    setActiveAppId(id);
    setWindows(prev => ({
      ...prev,
      [id]: { ...prev[id], zIndex: nextZ }
    }));
  };

  const handleAddNotification = (title: string, message: string) => {
    const newNotif: SystemNotification = {
      id: Date.now().toString(),
      title,
      message,
      timestamp: 'Just now',
      icon: '🏆'
    };
    setNotifications(prev => [newNotif, ...prev]);
    setToastQueue(prev => [newNotif, ...prev]);
  };

  const handleTriggerShake = () => {
    setScreenShake(true);
    setTimeout(() => setScreenShake(false), 500);
  };

  const activeAppMeta = APPS.find(a => a.id === activeAppId);

  // Dynamic Theme Backgrounds
  const themeBgClasses = {
    craft_card: 'bg-[#F5F1E8]',
    aged_parchment: 'bg-[#EFE5D3]',
    royal_terracotta: 'bg-[#FDF0EE]',
    dark_walnut: 'bg-[#29221C] text-white'
  }[theme];

  return (
    <div className={`relative w-screen h-screen overflow-hidden ${themeBgClasses} ${screenShake ? 'shake-it' : ''}`}>
      {/* Top OS Menu Bar */}
      <TopBar
        activeAppName={activeAppMeta?.shortTitle || "DIDI OS"}
        isMuted={isMuted}
        onToggleMute={() => setIsMuted(toggleMute())}
        notificationCount={notifications.length}
        onToggleNotificationCenter={() => setIsNotifCenterOpen(!isNotifCenterOpen)}
        onOpenAbout={() => setIsAboutOpen(true)}
        onTriggerBSOD={() => setIsBSODOpen(true)}
      />

      {/* Main Desktop Surface */}
      <DesktopSurface
        apps={APPS}
        onOpenApp={handleOpenApp}
        onOpenDoNotClick={() => setIsDoNotClickOpen(true)}
      />

      {/* Floating System Windows */}
      {APPS.map((app) => {
        const win = windows[app.id];
        if (!win || !win.isOpen) return null;

        return (
          <WindowFrame
            key={app.id}
            window={win}
            isActive={activeAppId === app.id}
            onFocus={() => handleFocusWindow(app.id)}
            onClose={() => handleCloseWindow(app.id)}
            onMinimize={() => handleMinimizeWindow(app.id)}
            onToggleMaximize={() => handleToggleMaximize(app.id)}
          >
            {app.id === 'didi_exe' && <DidiExe />}
            {app.id === 'calculator' && <MemeCalculator />}
            {app.id === 'sister_simulator' && <SisterSimulator />}
            {app.id === 'didi_scanner' && <DidiScanner />}
            {app.id === 'complaints' && <ComplaintsExe />}
            {app.id === 'settings' && (
              <SettingsApp
                currentTheme={theme}
                onThemeChange={setTheme}
                isMuted={isMuted}
                onToggleMute={() => setIsMuted(toggleMute())}
              />
            )}
            {app.id === 'trash' && <TrashApp />}
            {app.id === 'gift_invoice' && <GiftInvoiceApp />}
            {app.id === 'terminal' && <TerminalApp />}
          </WindowFrame>
        );
      })}

      {/* DO NOT CLICK Standalone Modal Window */}
      {isDoNotClickOpen && (
        <div 
          onClick={() => setIsDoNotClickOpen(false)}
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 select-none animate-in fade-in"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-[#FAF7F2] border-2 border-[#D8CFBE] rounded-3xl paper-shadow-lg overflow-hidden h-[480px] animate-in zoom-in-95"
          >
            <div className="flex items-center justify-between px-4 py-2 bg-[#F0EAE1] border-b border-[#D8CFBE]">
              <div className="font-bold text-xs text-[#8C3A27] font-mono">⚠️ DO NOT CLICK PROTOCOL</div>
              <button 
                onClick={() => { playClickSound(); setIsDoNotClickOpen(false); }}
                className="w-4 h-4 rounded-full bg-[#E06A53] hover:bg-[#C94E37] flex items-center justify-center text-[10px] text-white font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>
            <DoNotClickWidget
              onTriggerShake={handleTriggerShake}
              onAddNotification={handleAddNotification}
            />
          </div>
        </div>
      )}

      {/* Floating Toast Notification Popups (Top-Right) */}
      <div className="fixed top-11 right-3 z-50 space-y-2 pointer-events-none max-w-sm">
        {toastQueue.map((toast) => (
          <div
            key={toast.id}
            className="p-3 bg-[#FAF7F2] border-2 border-[#D8CFBE] rounded-xl paper-shadow-lg text-xs space-y-1 animate-in slide-in-from-top-4 pointer-events-auto flex items-start gap-2.5 font-mono shadow-xl"
          >
            <span className="text-base shrink-0">{toast.icon || "📢"}</span>
            <div className="flex-1">
              <div className="font-bold text-[#2A221B] flex items-center justify-between">
                <span>{toast.title}</span>
                <span className="text-[10px] text-[#A49688] font-normal">{toast.timestamp}</span>
              </div>
              <p className="text-[#5A4839] text-[11px] leading-snug mt-0.5">{toast.message}</p>
            </div>
          </div>
        ))}
      </div>

      {/* App Drawer Fullscreen Modal */}
      <AppDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        apps={APPS}
        onLaunchApp={handleOpenApp}
      />

      {/* Notification Center Drawer */}
      <NotificationCenter
        isOpen={isNotifCenterOpen}
        onClose={() => setIsNotifCenterOpen(false)}
        notifications={notifications}
        onClearAll={() => setNotifications([])}
        onDismiss={(id) => setNotifications(prev => prev.filter(n => n.id !== id))}
      />

      {/* About Didi OS Modal */}
      <AboutDialog
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />

      {/* Fake Kernel Panic / BSOD */}
      <KernelPanic
        isOpen={isBSODOpen}
        onReboot={() => setIsBSODOpen(false)}
      />

      {/* Bottom Floating Dock */}
      <Dock
        apps={APPS}
        windows={windows}
        onOpenApp={handleOpenApp}
        onOpenDrawer={() => setIsDrawerOpen(true)}
        onOpenDoNotClick={() => setIsDoNotClickOpen(true)}
      />
    </div>
  );
}
