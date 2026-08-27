import React from 'react';
import { playSuccessSound } from '../utils/sound';
import { RefreshCw, AlertTriangle } from 'lucide-react';

interface KernelPanicProps {
  isOpen: boolean;
  onReboot: () => void;
}

export const KernelPanic: React.FC<KernelPanicProps> = ({ isOpen, onReboot }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#16120F] text-[#F3EEEA] font-mono p-6 md:p-12 flex flex-col justify-between select-none animate-in fade-in">
      <div className="space-y-4 max-w-2xl">
        <div className="flex items-center gap-3 text-red-500">
          <AlertTriangle className="w-8 h-8 animate-pulse" />
          <h1 className="text-xl md:text-2xl font-black tracking-wider">
            KERNEL PANIC: SIBLING_CONFLICT_EXCEPTION (0xD1D1_DEADLOCK)
          </h1>
        </div>

        <div className="p-4 bg-[#231C17] border border-[#3E3128] rounded-xl text-xs space-y-2 leading-relaxed text-[#D8CFBE]">
          <p className="text-red-400 font-bold">
            *** STOP: 0x000000RB (0x0000DRAMA, 0x0000SNACKS, 0x0000REMOTE, 0x0000BROTHER)
          </p>
          <p>
            A fatal exception has occurred in DIDI_CORE.SYS. The system attempted to process brother logic, but found zero compatible drivers.
          </p>
          <p>
            System Diagnostics:
            <br />
            • Faulting Module: Patience.dll (Corrupted since 2012)
            <br />
            • Cause: Brother breathed with excessive confidence.
            <br />
            • Emergency Action: Dumped 2,048 memory pages of childhood memories.
          </p>
        </div>

        <div className="text-xs text-[#A49688] space-y-1">
          <div>Press the button below to reboot DIDI OS into Safe Sarcasm Mode.</div>
          <div>All open grudges have been safely written to non-volatile disk.</div>
        </div>
      </div>

      <div className="pt-6">
        <button
          onClick={() => {
            playSuccessSound();
            onReboot();
          }}
          className="px-6 py-3 bg-[#8C3A27] hover:bg-[#A3432D] text-white font-bold text-xs rounded-xl shadow-lg flex items-center gap-2 transition-transform active:scale-95 cursor-pointer font-mono"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Reboot DIDI OS (v2.0.26)</span>
        </button>
      </div>
    </div>
  );
};
