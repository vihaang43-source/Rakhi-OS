import React from 'react';
import { SystemNotification } from '../types';
import { playClickSound } from '../utils/sound';
import { Bell, X, Trash2, AlertTriangle, Sparkles, Shield, Info } from 'lucide-react';

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: SystemNotification[];
  onClearAll: () => void;
  onDismiss: (id: string) => void;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({
  isOpen,
  onClose,
  notifications,
  onClearAll,
  onDismiss
}) => {
  if (!isOpen) return null;

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/20 backdrop-blur-xs select-none animate-in fade-in"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="fixed top-9 right-3 w-80 max-w-[90vw] bg-[#FAF7F2] border-2 border-[#D8CFBE] rounded-2xl paper-shadow-lg p-4 space-y-3 z-50 animate-in slide-in-from-right-5"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-[#EAE2D5]">
          <div className="flex items-center gap-1.5 font-bold text-xs text-[#2A221B] font-mono">
            <Bell className="w-3.5 h-3.5 text-[#8C3A27]" />
            <span>SIBLING NOTIFICATION LOG</span>
          </div>

          <div className="flex items-center gap-2">
            {notifications.length > 0 && (
              <button
                onClick={() => { playClickSound(); onClearAll(); }}
                className="text-[11px] text-[#8C3A27] hover:underline font-semibold flex items-center gap-0.5 cursor-pointer font-mono"
              >
                <Trash2 className="w-3 h-3" />
                <span>Clear</span>
              </button>
            )}
            <button
              onClick={() => { playClickSound(); onClose(); }}
              className="p-1 hover:bg-[#EFE9DF] rounded-md text-[#544638] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-2 max-h-[70vh] overflow-y-auto pr-1">
          {notifications.map((notif) => (
            <div 
              key={notif.id}
              className="p-3 bg-white border border-[#E3D9CC] rounded-xl shadow-2xs space-y-1 relative group hover:border-[#8C3A27]/40 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-[#2A221B] flex items-center gap-1.5">
                  <span className="text-sm">{notif.icon || "📢"}</span>
                  <span>{notif.title}</span>
                </span>
                <span className="text-[10px] text-[#A49688] font-mono">{notif.timestamp}</span>
              </div>

              <p className="text-xs text-[#5A4839] leading-snug font-mono">
                {notif.message}
              </p>

              <button
                onClick={() => onDismiss(notif.id)}
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-0.5 text-[#A49688] hover:text-[#8C3A27] transition-opacity cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}

          {notifications.length === 0 && (
            <div className="py-8 text-center text-xs text-[#8C7D6E] italic font-mono">
              No active sibling alerts. (Didi is plotting quietly).
            </div>
          )}
        </div>

        <div className="pt-2 border-t border-[#EAE2D5] text-[10px] text-[#7A6B5D] text-center font-mono">
          Dismissing alerts does not exempt you from sibling duties.
        </div>
      </div>
    </div>
  );
};
