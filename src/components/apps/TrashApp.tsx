import React, { useState } from 'react';
import { playClickSound, playErrorSound, playSuccessSound } from '../../utils/sound';
import { Trash2, FileCode, FileText, Music, Image as ImageIcon, Shirt, RefreshCw, AlertOctagon, HelpCircle } from 'lucide-react';

interface TrashFile {
  id: string;
  name: string;
  size: string;
  type: string;
  dateDeleted: string;
  reason: string;
  icon: React.ReactNode;
}

export const TrashApp: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<TrashFile | null>(null);
  const [actionAlert, setActionAlert] = useState<string | null>(null);

  const trashFiles: TrashFile[] = [
    {
      id: "f1",
      name: "brother_opinions.txt",
      size: "0 KB",
      type: "Plain Text Document",
      dateDeleted: "Aug 27, 2026",
      reason: "Deemed irrelevant by Sibling Supreme Court.",
      icon: <FileText className="w-5 h-5 text-[#8C7D6E]" />
    },
    {
      id: "f2",
      name: "my_turn_on_ps5.exe",
      size: "404 KB (Corrupted)",
      type: "Executable",
      dateDeleted: "Aug 26, 2026",
      reason: "Overwritten by Didi's Netflix binge session.",
      icon: <FileCode className="w-5 h-5 text-red-500" />
    },
    {
      id: "f3",
      name: "peace_and_quiet.mp3",
      size: "0 MB (Silent)",
      type: "Audio File",
      dateDeleted: "Aug 24, 2026",
      reason: "Didi started singing Bollywood songs at top volume.",
      icon: <Music className="w-5 h-5 text-amber-600" />
    },
    {
      id: "f4",
      name: "snacks_i_saved_for_later.jpg",
      size: "Eaten",
      type: "JPEG Image",
      dateDeleted: "2 hours ago",
      reason: "Spotted in fridge and consumed under 'Finders Keepers' doctrine.",
      icon: <ImageIcon className="w-5 h-5 text-purple-600" />
    },
    {
      id: "f5",
      name: "my_oversized_hoodie.cloth",
      size: "Size XL",
      type: "Wardrobe Asset",
      dateDeleted: "Last Winter",
      reason: "Permanently annexed into Didi's closet. Never to return.",
      icon: <Shirt className="w-5 h-5 text-emerald-600" />
    }
  ];

  const handleEmptyTrash = () => {
    playErrorSound();
    setActionAlert("PERMISSION DENIED: Sudo access required. Only Didi has administrative authority to empty the trash bin.");
    setTimeout(() => setActionAlert(null), 3500);
  };

  const handleRestore = () => {
    playErrorSound();
    setActionAlert("RESTORE FAILED: The file looked at your permissions, laughed loudly, and deleted itself again.");
    setTimeout(() => setActionAlert(null), 3500);
  };

  return (
    <div className="flex flex-col h-full bg-[#FAF7F2] text-[#2A221B] select-none text-sm">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-[#D8CFBE] px-4 py-2.5 bg-[#F0EAE1]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#544638] text-white flex items-center justify-center font-bold text-sm shadow-xs">
            <Trash2 className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-xs tracking-wide uppercase text-[#2A221B] flex items-center gap-1.5">
              <span>TRASH BIN — DIDI'S DIGITAL RECYCLING FACILITY</span>
            </div>
            <div className="text-[11px] text-[#7A6B5D] font-mono">5 items discarded • 0% hope of recovery</div>
          </div>
        </div>

        <button
          onClick={handleEmptyTrash}
          className="px-3 py-1.5 bg-[#FDF0EE] hover:bg-[#FCE2DC] text-[#8C3A27] font-bold text-xs rounded-lg border border-[#F1B8AF] shadow-xs flex items-center gap-1.5 transition-transform active:scale-95 cursor-pointer"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Empty Bin</span>
        </button>
      </div>

      {/* Action Alert */}
      {actionAlert && (
        <div className="p-3 bg-[#FDF0EE] border-b border-[#F1B8AF] text-[#8C3A27] text-xs font-mono flex items-center gap-2 animate-in fade-in">
          <AlertOctagon className="w-4 h-4 shrink-0" />
          <span>{actionAlert}</span>
        </div>
      )}

      {/* Main Files Table */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        <div className="flex-1 p-3 overflow-y-auto space-y-2">
          <div className="bg-white border border-[#E3D9CC] rounded-xl overflow-hidden shadow-xs">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF5EE] border-b border-[#E3D9CC] text-[#7A6B5D] font-bold uppercase text-[10px]">
                <tr>
                  <th className="p-3">File Name</th>
                  <th className="p-3">Size</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Date Deleted</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EFE9DF]">
                {trashFiles.map((file) => (
                  <tr
                    key={file.id}
                    onClick={() => { playClickSound(); setSelectedFile(file); }}
                    className={`hover:bg-[#FAF5ED] transition-colors cursor-pointer ${
                      selectedFile?.id === file.id ? 'bg-[#F4ECE0] font-semibold' : ''
                    }`}
                  >
                    <td className="p-3 flex items-center gap-2 text-[#2A221B]">
                      {file.icon}
                      <span className="font-mono">{file.name}</span>
                    </td>
                    <td className="p-3 font-mono text-[#7A6B5D]">{file.size}</td>
                    <td className="p-3 text-[#7A6B5D]">{file.type}</td>
                    <td className="p-3 font-mono text-[#7A6B5D]">{file.dateDeleted}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected File Details Drawer */}
        {selectedFile && (
          <div className="w-full md:w-64 border-t md:border-t-0 md:border-l border-[#D8CFBE] bg-[#FAF5EE] p-4 flex flex-col justify-between space-y-3">
            <div className="space-y-2 text-xs">
              <div className="w-12 h-12 rounded-xl bg-white border border-[#DDD3C2] flex items-center justify-center shadow-xs">
                {selectedFile.icon}
              </div>

              <div>
                <h4 className="font-bold text-sm text-[#2A221B] font-mono break-all">
                  {selectedFile.name}
                </h4>
                <div className="text-[11px] text-[#7A6B5D]">{selectedFile.type}</div>
              </div>

              <div className="p-2.5 bg-white rounded-lg border border-[#E3D9CC] space-y-1.5">
                <div className="text-[10px] uppercase font-bold text-[#8C7D6E]">Reason for Deletion:</div>
                <div className="text-xs text-[#8C3A27] italic leading-relaxed">
                  "{selectedFile.reason}"
                </div>
              </div>
            </div>

            <button
              onClick={handleRestore}
              className="w-full py-2 bg-[#8C3A27] hover:bg-[#742B1A] text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-1.5 transition-transform active:scale-95 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Attempt Restore</span>
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-[#D8CFBE] px-4 py-2 bg-[#F0EAE1] flex items-center justify-between text-[11px] text-[#7A6B5D] font-mono">
        <span>Files in trash cannot be used in sibling arguments.</span>
        <span>Storage consumed: 0 MB of Brother Dignity</span>
      </div>
    </div>
  );
};
