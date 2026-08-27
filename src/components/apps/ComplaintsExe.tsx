import React, { useState } from 'react';
import { ABSURD_COMPLAINTS } from '../../data/mockData';
import { ComplaintRecord } from '../../types';
import { playClickSound, playErrorSound, playSuccessSound } from '../../utils/sound';
import { AlertCircle, FileText, PlusCircle, Search, Filter, ShieldX, CheckCircle, Ban } from 'lucide-react';

export const ComplaintsExe: React.FC = () => {
  const [complaints, setComplaints] = useState<ComplaintRecord[]>(ABSURD_COMPLAINTS);
  const [search, setSearch] = useState<string>('');
  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const [showCounterForm, setShowCounterForm] = useState<boolean>(false);
  const [counterText, setCounterText] = useState<string>('');
  const [counterFeedback, setCounterFeedback] = useState<string | null>(null);

  const filtered = complaints.filter(c => {
    const matchesSearch = c.grievance.toLowerCase().includes(search.toLowerCase()) || c.id.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filterSeverity === 'all' || c.severity === filterSeverity;
    return matchesSearch && matchesFilter;
  });

  const handleFileCounterComplaint = (e: React.FormEvent) => {
    e.preventDefault();
    if (!counterText.trim()) return;

    playErrorSound();
    setCounterFeedback(
      `⛔ APPEAL REJECTED (Rule 404): Your complaint regarding "${counterText.slice(0, 30)}..." has been automatically shredded. Reason: Sibling Constitution states the Brother is mathematically and metaphysically at fault.`
    );
    setCounterText('');
  };

  return (
    <div className="flex flex-col h-full bg-[#FAF7F2] text-[#2A221B] select-none text-sm">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-[#D8CFBE] px-4 py-2.5 bg-[#F0EAE1]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#8C3A27] text-white flex items-center justify-center font-bold text-sm shadow-xs">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-xs tracking-wide uppercase text-[#2A221B] flex items-center gap-1.5">
              <span>COMPLAINTS.EXE — OFFICIAL SISTER GRIEVANCES</span>
            </div>
            <div className="text-[11px] text-[#7A6B5D] font-mono">Pending Fines: ₹99,999.00 • Resolution Rate: 0%</div>
          </div>
        </div>

        <button
          onClick={() => { playClickSound(); setShowCounterForm(!showCounterForm); setCounterFeedback(null); }}
          className="px-3 py-1.5 bg-[#3E2C20] hover:bg-[#2A1D15] text-white font-bold text-xs rounded-lg shadow-xs flex items-center gap-1.5 transition-transform active:scale-95 cursor-pointer"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span>{showCounterForm ? 'View Docket' : 'File Appeal'}</span>
        </button>
      </div>

      {/* Search & Filter bar */}
      {!showCounterForm && (
        <div className="p-3 border-b border-[#E4DCCE] bg-[#FAF5EE] flex flex-wrap items-center justify-between gap-2">
          <div className="relative flex-1 min-w-[180px]">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#8C7D6E]" />
            <input
              type="text"
              placeholder="Search absurd grievances..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-white border border-[#D5CABB] rounded-lg text-xs text-[#2A221B] placeholder-[#A49688] focus:outline-none focus:border-[#8C3A27]"
            />
          </div>

          <div className="flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-[#7A6B5D]" />
            <select
              value={filterSeverity}
              onChange={(e) => { playClickSound(); setFilterSeverity(e.target.value); }}
              className="px-2 py-1.5 bg-white border border-[#D5CABB] rounded-lg text-xs font-semibold text-[#2A221B] focus:outline-none focus:border-[#8C3A27] cursor-pointer"
            >
              <option value="all">All Severities</option>
              <option value="Catastrophic">Catastrophic</option>
              <option value="Critical">Critical</option>
              <option value="Unforgivable">Unforgivable</option>
              <option value="Petty Felony">Petty Felony</option>
            </select>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3">
        {showCounterForm ? (
          <div className="max-w-lg mx-auto bg-white border border-[#DDD3C2] rounded-xl p-4 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-[#8C3A27]">
              <Ban className="w-5 h-5" />
              <h3 className="font-bold text-sm uppercase font-display">Brother's Counter-Complaint Submission Portal</h3>
            </div>
            <p className="text-xs text-[#6A5A4D]">
              Note: Under Sibling Legal Code Article 2026, brothers may technically submit appeals, but they are routed directly into the furnace.
            </p>

            <form onSubmit={handleFileCounterComplaint} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-[#2A221B] mb-1">
                  Describe Your Grievance:
                </label>
                <textarea
                  rows={3}
                  value={counterText}
                  onChange={(e) => setCounterText(e.target.value)}
                  placeholder="e.g., 'Didi stole my charger and claimed it was her heirloom'..."
                  className="w-full p-2.5 bg-[#FAF7F2] border border-[#D5CABB] rounded-lg text-xs text-[#2A221B] placeholder-[#A49688] focus:outline-none focus:border-[#8C3A27]"
                  required
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCounterForm(false)}
                  className="px-3 py-1.5 bg-[#FAF5EE] text-[#544638] font-bold text-xs rounded-lg border border-[#DDD3C2]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#8C3A27] hover:bg-[#742B1A] text-white font-bold text-xs rounded-lg shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <ShieldX className="w-3.5 h-3.5" />
                  <span>Submit to Shredder</span>
                </button>
              </div>
            </form>

            {counterFeedback && (
              <div className="p-3 bg-[#FDF0EE] border border-[#F1B8AF] rounded-lg text-[#8C3A27] text-xs font-mono leading-relaxed space-y-1 animate-in fade-in">
                <div className="font-bold flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  <span>VERDICT: IMMEDIATE REJECTION</span>
                </div>
                <div>{counterFeedback}</div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-2.5">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="p-3.5 bg-white border border-[#E3D9CC] rounded-xl shadow-2xs hover:border-[#8C3A27]/50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-3"
              >
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-[11px] text-[#8C3A27] bg-[#FAF3EA] px-2 py-0.5 rounded border border-[#ECDCC9]">
                      {item.id}
                    </span>
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                      item.severity === 'Catastrophic' ? 'bg-red-100 text-red-700' :
                      item.severity === 'Critical' ? 'bg-orange-100 text-orange-800' :
                      item.severity === 'Unforgivable' ? 'bg-rose-100 text-rose-800' :
                      'bg-amber-100 text-amber-800'
                    }`}>
                      {item.severity}
                    </span>
                    <span className="text-[11px] text-[#A49688] font-mono">{item.timestamp}</span>
                  </div>

                  <div className="font-medium text-xs text-[#2A221B] leading-relaxed pt-0.5">
                    "{item.grievance}"
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 self-end md:self-center border-t md:border-t-0 pt-2 md:pt-0 border-[#EFE9DF]">
                  <div className="text-right">
                    <div className="text-[10px] uppercase font-bold text-[#8C7D6E]">Damages / Fine</div>
                    <div className="text-xs font-mono font-bold text-[#8C3A27]">{item.fineAmount}</div>
                  </div>

                  <div className="px-2.5 py-1 bg-[#FAF5EE] border border-[#DDD3C2] rounded-lg text-[11px] font-bold text-[#544638] flex items-center gap-1 font-mono">
                    <AlertCircle className="w-3 h-3 text-[#C28B38]" />
                    <span>{item.resolutionStatus}</span>
                  </div>
                </div>
              </div>
            ))}

            {filtered.length === 0 && (
              <div className="text-center py-10 text-xs text-[#8C7D6E] italic">
                No matching sister grievances found. (Don't worry, she is inventing new ones right now).
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-[#D8CFBE] px-4 py-2 bg-[#F0EAE1] flex items-center justify-between text-[11px] text-[#7A6B5D] font-mono">
        <span>Court of Older Sisters • Sibling Jurisdiction</span>
        <span>Guilt Presumed by Default</span>
      </div>
    </div>
  );
};
