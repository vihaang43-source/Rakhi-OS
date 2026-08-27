export type AppId = 
  | 'didi_exe'
  | 'calculator'
  | 'sister_simulator'
  | 'didi_scanner'
  | 'complaints'
  | 'settings'
  | 'trash'
  | 'terminal'
  | 'gift_invoice'
  | 'secret_folder';

export interface AppMetadata {
  id: AppId;
  title: string;
  shortTitle: string;
  icon: string; // Emoji or Lucide icon key
  badge?: string;
  tagline: string;
  defaultWidth: number;
  defaultHeight: number;
  isExecutable?: boolean;
}

export interface WindowInstance {
  id: AppId;
  title: string;
  icon: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

export interface SystemNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  icon?: string;
  type?: 'info' | 'warning' | 'error' | 'shagun';
}

export interface SimulatorScenario {
  id: number;
  title: string;
  situation: string;
  context: string;
  options: {
    text: string;
    reaction: string;
    survivalChange: number; // e.g. -20 or +10
    dramaChange: number;
    badgeAwarded?: string;
  }[];
}

export interface ComplaintRecord {
  id: string;
  timestamp: string;
  grievance: string;
  severity: 'Catastrophic' | 'Critical' | 'Unforgivable' | 'Petty Felony';
  resolutionStatus: 'Ignored' | 'Permanent Grudge' | 'Brother at Fault' | 'Shredded';
  fineAmount?: string;
}

export interface OSTheme {
  id: 'craft_card' | 'aged_parchment' | 'dark_walnut' | 'royal_terracotta';
  name: string;
  bg: string;
  cardBg: string;
  border: string;
  accent: string;
  text: string;
}
