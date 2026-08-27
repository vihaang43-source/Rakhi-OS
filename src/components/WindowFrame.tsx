import React, { useState, useRef, useEffect } from 'react';
import { WindowInstance } from '../types';
import { playClickSound } from '../utils/sound';
import { X, Minus, Maximize2, Minimize2 } from 'lucide-react';

interface WindowFrameProps {
  window: WindowInstance;
  isActive: boolean;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  onToggleMaximize: () => void;
  children: React.ReactNode;
}

export const WindowFrame: React.FC<WindowFrameProps> = ({
  window: win,
  isActive,
  onFocus,
  onClose,
  onMinimize,
  onToggleMaximize,
  children
}) => {
  const [position, setPosition] = useState(win.position);
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<{ startX: number; startY: number; posX: number; posY: number }>({
    startX: 0,
    startY: 0,
    posX: win.position.x,
    posY: win.position.y
  });

  // Mobile detection for auto-maximizing
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (win.isMaximized || isMobile) return;
    onFocus();
    setIsDragging(true);
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      posX: position.x,
      posY: position.y
    };
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || win.isMaximized || isMobile) return;
    const deltaX = e.clientX - dragRef.current.startX;
    const deltaY = e.clientY - dragRef.current.startY;
    
    // Bounds checking
    const newX = Math.max(10, Math.min(window.innerWidth - 100, dragRef.current.posX + deltaX));
    const newY = Math.max(35, Math.min(window.innerHeight - 100, dragRef.current.posY + deltaY));
    
    setPosition({ x: newX, y: newY });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (isDragging) {
      setIsDragging(false);
      (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
    }
  };

  if (!win.isOpen || win.isMinimized) return null;

  const isFull = win.isMaximized || isMobile;

  return (
    <div
      onMouseDown={onFocus}
      onTouchStart={onFocus}
      style={{
        zIndex: win.zIndex,
        left: isFull ? 0 : `${position.x}px`,
        top: isFull ? '32px' : `${position.y}px`,
        width: isFull ? '100vw' : `${win.size.width}px`,
        height: isFull ? 'calc(100vh - 96px)' : `${win.size.height}px`,
      }}
      className={`fixed rounded-2xl overflow-hidden flex flex-col transition-all duration-150 ${
        isFull ? 'rounded-none top-8 bottom-16' : 'paper-shadow-lg border border-[#D8CFBE]'
      } ${
        isActive ? 'ring-1 ring-[#8C3A27]/40 shadow-2xl' : 'opacity-95'
      }`}
    >
      {/* Window Title Bar */}
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onDoubleClick={onToggleMaximize}
        className={`h-9 px-3.5 flex items-center justify-between select-none cursor-grab active:cursor-grabbing border-b transition-colors ${
          isActive 
            ? 'bg-[#EAE2D5] border-[#D5CABB] text-[#2A221B]' 
            : 'bg-[#F2ECE2] border-[#DDD3C2] text-[#7A6B5D]'
        }`}
      >
        {/* macOS / Paper Style Traffic Lights */}
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => { e.stopPropagation(); playClickSound(); onClose(); }}
            title="Close App"
            className="w-3.5 h-3.5 rounded-full bg-[#E06A53] hover:bg-[#C94E37] border border-[#B8402A] flex items-center justify-center group shadow-2xs cursor-pointer"
          >
            <X className="w-2.5 h-2.5 text-[#5A1C11] opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
          
          <button
            onClick={(e) => { e.stopPropagation(); playClickSound(); onMinimize(); }}
            title="Minimize App"
            className="w-3.5 h-3.5 rounded-full bg-[#E5B54F] hover:bg-[#CD9930] border border-[#B37F1B] flex items-center justify-center group shadow-2xs cursor-pointer"
          >
            <Minus className="w-2.5 h-2.5 text-[#5C3F08] opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); playClickSound(); onToggleMaximize(); }}
            title="Maximize App"
            className="w-3.5 h-3.5 rounded-full bg-[#5FB875] hover:bg-[#439E5A] border border-[#328546] flex items-center justify-center group shadow-2xs cursor-pointer"
          >
            {isFull ? (
              <Minimize2 className="w-2 h-2 text-[#164822] opacity-0 group-hover:opacity-100 transition-opacity" />
            ) : (
              <Maximize2 className="w-2 h-2 text-[#164822] opacity-0 group-hover:opacity-100 transition-opacity" />
            )}
          </button>
        </div>

        {/* Window Title */}
        <div className="font-bold text-xs tracking-wide text-[#2A221B] flex items-center gap-1.5 truncate max-w-[200px] md:max-w-xs font-mono">
          <span>{win.icon}</span>
          <span className="truncate">{win.title}</span>
        </div>

        {/* Right Status text */}
        <div className="text-[10px] text-[#7A6B5D] font-mono hidden sm:block">
          DIDI_OS_v2.0.26
        </div>
      </div>

      {/* Window Body */}
      <div className="flex-1 bg-[#FAF7F2] overflow-hidden flex flex-col">
        {children}
      </div>
    </div>
  );
};
