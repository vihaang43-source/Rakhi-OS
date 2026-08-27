import React, { useState } from 'react';
import { DIDI_STATS } from '../../data/mockData';
import { playClickSound, playErrorSound, playAlarmSound, playSuccessSound } from '../../utils/sound';
import { Shield, Flame, Activity, Zap, AlertTriangle, RefreshCw, Coffee, HeartHandshake } from 'lucide-react';
import confetti from 'canvas-confetti';

export const DidiExe: React.FC = () => {
  const [recalibrating, setRecalibrating] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [dispensedSnack, setDispensedSnack] = useState(false);
  const [activeTab, setActiveTab] = useState<'specs' | 'telemetry' | 'diagnostics'>('specs');

  const handleRecalibratePatience = () => {
    playClickSound();
    setRecalibrating(true);
    setErrorMessage(null);
    setTimeout(() => {
      playErrorSound();
      setRecalibrating(false);
      setErrorMessage("FATAL ERROR 0x000D1D1: Hardware 'Patience.dll' not found in system architecture. Factory setting locked at 2%.");
    }, 1200);
  };

  const handleDispenseSnack = () => {
    playSuccessSound();
    setDispensedSnack(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });
    setTimeout(() => setDispensedSnack(false), 3500);
  };

  const handleTriggerRoast = () => {
    playAlarmSound();
    setErrorMessage("ROAST PROTOCOL INITIATED: 'Why are you inspecting my stats? Did you finish cleaning your room yet?'");
  };

  return (
    <div className="flex flex-col h-full bg-[#FAF7F2] text-[#2A221B] text-sm select-none">
      {/* Header bar with tabs */}
      <div className="flex items-center justify-between border-b border-[#D8CFBE] px-4 py-2.5 bg-[#F0EAE1]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#8C3A27] text-[#FAF7F2] flex items-center justify-center font-bold text-sm shadow-xs">
            D
          </div>
          <div>
            <div className="font-bold text-xs tracking-wide uppercase text-[#2A221B] flex items-center gap-1.5">
              <span>DIDI.EXE — System Diagnostics</span>
              <span className="bg-[#E4DCCE] text-[#6A5A4D] text-[10px] px-1.5 py-0.5 rounded font-mono">v{DIDI_STATS.version}</span>
            </div>
            <div className="text-[11px] text-[#7A6B5D] font-mono">Status: OVERCLOCKED & JUDGING YOU</div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-[#E4DCCE] p-0.5 rounded-lg border border-[#D5CABB]">
          <button
            onClick={() => { playClickSound(); setActiveTab('specs'); }}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
              activeTab === 'specs' ? 'bg-[#FAF7F2] text-[#2A221B] shadow-xs' : 'text-[#7A6B5D] hover:text-[#2A221B]'
            }`}
          >
            Core Stats
          </button>
          <button
            onClick={() => { playClickSound(); setActiveTab('telemetry'); }}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
              activeTab === 'telemetry' ? 'bg-[#FAF7F2] text-[#2A221B] shadow-xs' : 'text-[#7A6B5D] hover:text-[#2A221B]'
            }`}
          >
            Telemetry
          </button>
          <button
            onClick={() => { playClickSound(); setActiveTab('diagnostics'); }}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
              activeTab === 'diagnostics' ? 'bg-[#FAF7F2] text-[#2A221B] shadow-xs' : 'text-[#7A6B5D] hover:text-[#2A221B]'
            }`}
          >
            Live Logs
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {errorMessage && (
          <div className="p-3 bg-[#FDF2F0] border border-[#F1B8AF] rounded-xl text-[#8C3A27] text-xs flex items-start gap-2 animate-bounce shadow-xs">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
            <div className="flex-1 font-mono leading-relaxed">{errorMessage}</div>
            <button 
              onClick={() => setErrorMessage(null)} 
              className="text-[#8C3A27] hover:underline font-bold text-[11px]"
            >
              Dismiss
            </button>
          </div>
        )}

        {dispensedSnack && (
          <div className="p-3 bg-[#EEF8F1] border border-[#B3E3C0] rounded-xl text-[#1E6B38] text-xs flex items-center gap-2 shadow-xs">
            <Coffee className="w-4 h-4 text-[#1E6B38]" />
            <span className="font-semibold font-mono">🍫 Emergency Cadbury Silk & Kurkure successfully deployed to Didi! Patience temporarily buffed +0.01%.</span>
          </div>
        )}

        {activeTab === 'specs' && (
          <div className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {DIDI_STATS.specs.map((stat, idx) => (
                <div 
                  key={idx} 
                  className="bg-[#FFFFFF] border border-[#E3DBD0] rounded-xl p-3.5 shadow-xs hover:border-[#8C3A27]/40 transition-colors"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-xs text-[#2A221B] flex items-center gap-1.5">
                      {stat.label === "Drama Level" && <Flame className="w-3.5 h-3.5 text-red-600" />}
                      {stat.label === "Patience Level" && <Activity className="w-3.5 h-3.5 text-amber-600" />}
                      {stat.label === "Roasting Efficiency" && <Zap className="w-3.5 h-3.5 text-orange-600" />}
                      {stat.label === "Brother Protection" && <Shield className="w-3.5 h-3.5 text-emerald-600" />}
                      {stat.label}
                    </span>
                    <span className="font-mono text-xs font-extrabold text-[#8C3A27] bg-[#FAF5EE] px-2 py-0.5 rounded border border-[#E8DFC8]">
                      {stat.value}
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full h-2 bg-[#EFE9DF] rounded-full overflow-hidden mb-2">
                    <div 
                      className={`h-full ${stat.color} transition-all duration-700`}
                      style={{ width: `${Math.max(4, stat.level)}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-[#7A6B5D]">
                    <span>{stat.desc}</span>
                    <span className="font-mono font-medium text-[10px] uppercase">{stat.status}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Special Callout: Brother Protection Protocol */}
            <div className="bg-[#FAF5ED] border border-[#DFD5C4] rounded-xl p-3.5 flex items-start gap-3 shadow-xs">
              <div className="p-2 bg-[#EADCC8] text-[#8C3A27] rounded-lg">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="font-bold text-xs text-[#2A221B] uppercase tracking-wide">
                  Article 1: The Sibling Bullying Monopoly
                </div>
                <p className="text-xs text-[#625345] mt-0.5 leading-relaxed">
                  "Only Didi possesses the certified municipal license to roast, ridicule, and borrow clothes from the brother. If any external party attempts to roast him, Didi's defense protocol accelerates to 1000% lethal retaliatory capability."
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'telemetry' && (
          <div className="space-y-3">
            <div className="bg-[#FFFFFF] border border-[#E3DBD0] rounded-xl divide-y divide-[#EFE9DF] shadow-xs">
              {DIDI_STATS.telemetry.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 text-xs">
                  <span className="text-[#625345] font-medium">{item.metric}</span>
                  <span className="font-mono font-bold text-[#8C3A27] bg-[#FAF5ED] px-2.5 py-1 rounded border border-[#EADCC8]">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="p-3 bg-[#F4EFE6] border border-[#DCD3C4] rounded-xl text-xs text-[#625345] font-mono leading-relaxed">
              ⚡ Sibling Satellite Uplink: Synchronized with Mom's radar. Warning: Any complaint against Didi will be automatically routed to /dev/null.
            </div>
          </div>
        )}

        {activeTab === 'diagnostics' && (
          <div className="bg-[#241D17] text-[#EFEBE4] p-3.5 rounded-xl font-mono text-xs space-y-2 border border-[#3E332A] shadow-inner">
            <div className="text-emerald-400 font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>[KERNEL] DIDI OS v2.0.26 BOOT SUCCESSFUL</span>
            </div>
            <div className="text-[#A49688]">[0.002] Initializing Sarcasm Cores 1 through 8... [OK]</div>
            <div className="text-[#A49688]">[0.014] Loading Grudges Database from 2012 to 2026... [3,842 records indexed]</div>
            <div className="text-[#F1A28A]">[0.035] WARNING: Brother detected in kitchen. Guarding last slice of pizza.</div>
            <div className="text-[#A49688]">[0.052] Remote control ownership locked permanently to Didi.</div>
            <div className="text-amber-400">[0.089] Patience buffer underrun: 2% remaining. Do not ask silly questions.</div>
            <div className="text-[#EFEBE4]">[0.120] Brother Protection Firewall: ACTIVE & LETHAL.</div>
          </div>
        )}
      </div>

      {/* Footer Controls */}
      <div className="border-t border-[#D8CFBE] p-3 bg-[#F0EAE1] flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <button
            onClick={handleRecalibratePatience}
            disabled={recalibrating}
            className="px-3 py-1.5 bg-[#FFFFFF] hover:bg-[#FAF6EE] text-[#2A221B] font-semibold text-xs rounded-lg border border-[#D5CABB] shadow-xs flex items-center gap-1.5 transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${recalibrating ? 'animate-spin' : ''}`} />
            <span>{recalibrating ? 'Attempting Fix...' : 'Recalibrate Patience'}</span>
          </button>

          <button
            onClick={handleDispenseSnack}
            className="px-3 py-1.5 bg-[#C28B38] hover:bg-[#AF7B2E] text-white font-semibold text-xs rounded-lg shadow-xs flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
          >
            <Coffee className="w-3.5 h-3.5" />
            <span>Dispense Emergency Chocolate</span>
          </button>
        </div>

        <button
          onClick={handleTriggerRoast}
          className="px-3 py-1.5 bg-[#8C3A27] hover:bg-[#78301F] text-white font-semibold text-xs rounded-lg shadow-xs flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
        >
          <Flame className="w-3.5 h-3.5" />
          <span>Force Roast Brother</span>
        </button>
      </div>
    </div>
  );
};
