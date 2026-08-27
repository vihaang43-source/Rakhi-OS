import React, { useState, useEffect } from 'react';
import { playClickSound, playScanSound, playAlarmSound, playSuccessSound } from '../../utils/sound';
import { Radar, ShieldAlert, Target, RefreshCw, Eye, AlertOctagon, Sparkles } from 'lucide-react';

export const DidiScanner: React.FC = () => {
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanStep, setScanStep] = useState<number>(0);
  const [detected, setDetected] = useState<boolean>(false);
  const [scanTarget, setScanTarget] = useState<'didi' | 'brother'>('didi');

  const scanLogs = [
    "Initializing High-Frequency Sarcasm Radar...",
    "Sweeping room for passive-aggressive vibrations...",
    "Triangulating eye-roll acoustic signatures...",
    "Detecting sudden atmospheric drop in patience...",
    "TARGET ACQUIRED: Didi in close proximity."
  ];

  const startScan = (target: 'didi' | 'brother' = 'didi') => {
    playClickSound();
    setScanTarget(target);
    setIsScanning(true);
    setScanStep(0);
    setDetected(false);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isScanning && scanStep < scanLogs.length) {
      playScanSound();
      timer = setTimeout(() => {
        setScanStep(prev => prev + 1);
      }, 900);
    } else if (isScanning && scanStep >= scanLogs.length) {
      setIsScanning(false);
      setDetected(true);
      if (scanTarget === 'didi') {
        playAlarmSound();
      } else {
        playSuccessSound();
      }
    }
    return () => clearTimeout(timer);
  }, [isScanning, scanStep, scanTarget]);

  return (
    <div className="flex flex-col h-full bg-[#1F1914] text-[#EFEBE4] select-none text-sm font-mono">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-[#3D3126] px-4 py-2.5 bg-[#29211B]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#8C3A27] text-white flex items-center justify-center font-bold text-sm shadow-xs">
            <Radar className="w-4 h-4 animate-spin" />
          </div>
          <div>
            <div className="font-bold text-xs tracking-wide uppercase text-white flex items-center gap-1.5">
              <span>DIDI RADAR & PROXIMITY SCANNER</span>
            </div>
            <div className="text-[11px] text-[#A49688]">Threat Detection Subsystem v2.0.26</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
          <span className="text-xs font-bold text-red-400">DEFCON 1</span>
        </div>
      </div>

      {/* Main Radar Screen */}
      <div className="flex-1 p-4 flex flex-col items-center justify-between overflow-y-auto space-y-4">
        {/* Radar Circular Visualizer */}
        <div className="relative w-56 h-56 md:w-64 md:h-64 rounded-full border-2 border-[#524133] bg-[#140F0C] flex items-center justify-center overflow-hidden shadow-2xl">
          {/* Concentric radar rings */}
          <div className="absolute inset-4 rounded-full border border-[#3E3126]" />
          <div className="absolute inset-12 rounded-full border border-[#3E3126]" />
          <div className="absolute inset-20 rounded-full border border-[#3E3126]" />
          
          {/* Crosshairs */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-px bg-[#3E3126]" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-full w-px bg-[#3E3126]" />
          </div>

          {/* Radar Sweep Line */}
          {isScanning && (
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#8C3A27]/20 to-[#8C3A27]/60 animate-spin origin-center" style={{ animationDuration: '2s' }} />
          )}

          {/* Detected Blip */}
          {detected && scanTarget === 'didi' && (
            <div className="absolute top-16 right-16 flex flex-col items-center animate-bounce">
              <span className="w-4 h-4 rounded-full bg-red-500 shadow-[0_0_15px_#EF4444] animate-ping" />
              <span className="text-[10px] font-bold text-red-400 bg-[#291A16] px-1.5 py-0.5 rounded border border-red-500/50 mt-1">
                DIDI [2.1m]
              </span>
            </div>
          )}

          {/* Idle / Scanning Status Icon */}
          <div className="z-10 flex flex-col items-center text-center p-3">
            {isScanning ? (
              <>
                <Target className="w-8 h-8 text-[#C28B38] animate-pulse mb-1" />
                <span className="text-xs text-[#C28B38] font-bold">SWEEPING AIRSPACE...</span>
              </>
            ) : detected ? (
              scanTarget === 'didi' ? (
                <>
                  <AlertOctagon className="w-10 h-10 text-red-500 animate-pulse mb-1" />
                  <span className="text-xs font-black text-red-400">LOCK CONFIRMED</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-8 h-8 text-amber-400 mb-1" />
                  <span className="text-xs font-bold text-amber-300">SCAN COMPLETED</span>
                </>
              )
            ) : (
              <>
                <Eye className="w-8 h-8 text-[#7A6B5D] mb-1" />
                <span className="text-xs text-[#A49688]">RADAR STANDBY</span>
              </>
            )}
          </div>
        </div>

        {/* Scan Log / Detected Banner */}
        <div className="w-full max-w-md bg-[#29211B] border border-[#3E3126] rounded-xl p-3 text-xs space-y-2">
          {isScanning && (
            <div className="space-y-1">
              <div className="text-amber-400 font-bold flex items-center gap-1.5">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>{scanLogs[scanStep] || "Processing telemetry..."}</span>
              </div>
              <div className="w-full h-1.5 bg-[#1A1410] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-amber-500 transition-all duration-300"
                  style={{ width: `${((scanStep + 1) / scanLogs.length) * 100}%` }}
                />
              </div>
            </div>
          )}

          {detected && scanTarget === 'didi' && (
            <div className="p-3 bg-[#3B1C17] border-2 border-red-500 rounded-lg text-center space-y-1.5 shadow-lg">
              <div className="text-sm font-black text-red-400 flex items-center justify-center gap-1.5 tracking-wider uppercase">
                <ShieldAlert className="w-4 h-4 text-red-400" />
                <span>Didi detected. There is no escape.</span>
              </div>
              <p className="text-[11px] text-[#E8C4BF] font-sans">
                Location: Kitchen / Couch Perimeter. Estimated mood: 99% Sarcastic. Sibling defense status: Hopeless.
              </p>
            </div>
          )}

          {detected && scanTarget === 'brother' && (
            <div className="p-3 bg-[#242E1C] border-2 border-emerald-500 rounded-lg text-center space-y-1.5">
              <div className="text-xs font-bold text-emerald-400">
                BROTHER DIAGNOSTIC REPORT:
              </div>
              <p className="text-[11px] text-[#C4E8C8] font-sans">
                IQ: Potato Level. Snack Stash: 0% Protected. Ability to win an argument against Didi: 0.000%.
              </p>
            </div>
          )}

          {!isScanning && !detected && (
            <div className="text-[#8C7D6E] text-center text-xs">
              Press 'Sweep Room for Didi' to scan for nearby elder sister presence.
            </div>
          )}
        </div>

        {/* Scan Actions */}
        <div className="flex flex-wrap gap-2 justify-center w-full max-w-md">
          <button
            onClick={() => startScan('didi')}
            disabled={isScanning}
            className="flex-1 min-w-[160px] py-2.5 px-4 bg-[#8C3A27] hover:bg-[#A3432D] text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 transition-transform active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            <Radar className="w-4 h-4" />
            <span>Sweep Room for Didi</span>
          </button>

          <button
            onClick={() => startScan('brother')}
            disabled={isScanning}
            className="py-2.5 px-4 bg-[#3E3126] hover:bg-[#4E3F32] text-[#EFEBE4] font-semibold text-xs rounded-xl border border-[#524133] shadow-xs flex items-center justify-center gap-1.5 transition-transform active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            <span>Scan Brother IQ</span>
          </button>
        </div>
      </div>
    </div>
  );
};
