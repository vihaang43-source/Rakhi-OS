import React, { useState } from 'react';
import { playClickSound, playSuccessSound } from '../../utils/sound';
import { Receipt, Check, Copy, Sparkles, CreditCard, Pizza, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

export const GiftInvoiceApp: React.FC = () => {
  const [copied, setCopied] = useState<boolean>(false);
  const [paidStatus, setPaidStatus] = useState<string | null>(null);

  const invoiceItems = [
    { desc: "Brother Protection against Ghosts & Monsters", cost: 5000, note: "24/7 Security SLA" },
    { desc: "Not snitching to Mom about the broken vase (2019)", cost: 10000, note: "Statute of limitations waived" },
    { desc: "Pretending to laugh at your jokes in front of guests", cost: 2500, note: "Emotional labor surcharge" },
    { desc: "Allowing you to exist in the same living room", cost: 3500, note: "Oxygen royalty fee" },
    { desc: "Raksha Bandhan Inflation Adjustment (2026)", cost: 4000, note: "Reserve Bank of Didi Index" },
    { desc: "Sibling Goodwill & Lifetime Roast Immunity (1 Year)", cost: 25000, note: "Premium tier" }
  ];

  const subtotal = invoiceItems.reduce((acc, curr) => acc + curr.cost, 0);
  const gst = Math.round(subtotal * 0.18);
  const total = subtotal + gst;

  const handleCopyInvoice = () => {
    playSuccessSound();
    const text = `🧾 *DIDI OS OFFICIAL RAKHI SHAGUN INVOICE (2026)* 🧾\n\n` +
      invoiceItems.map(i => `• ${i.desc}: ₹${i.cost.toLocaleString()}`).join('\n') +
      `\n\nSubtotal: ₹${subtotal.toLocaleString()}\nSibling GST (18%): ₹${gst.toLocaleString()}\n*GRAND TOTAL DUE: ₹${total.toLocaleString()}*\n\n_Payment acceptable via: Cash, UPI, Swiggy, or Surrendering TV Remote._`;
    
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handlePay = (method: string) => {
    playSuccessSound();
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 }
    });
    setPaidStatus(`Payment registered via ${method}! Didi will spare you for 48 hours.`);
  };

  return (
    <div className="flex flex-col h-full bg-[#FAF7F2] text-[#2A221B] select-none text-sm font-sans">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-[#D8CFBE] px-4 py-2.5 bg-[#F0EAE1]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#8C3A27] text-white flex items-center justify-center font-bold text-sm shadow-xs">
            <Receipt className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-xs tracking-wide uppercase text-[#2A221B] flex items-center gap-1.5">
              <span>OFFICIAL RAKHI SHAGUN INVOICE</span>
            </div>
            <div className="text-[11px] text-[#7A6B5D] font-mono">Invoice #RB-2026-991 • Terms: IMMEDIATE</div>
          </div>
        </div>

        <button
          onClick={handleCopyInvoice}
          className="px-3 py-1.5 bg-[#3E2C20] hover:bg-[#2A1D15] text-white font-bold text-xs rounded-lg shadow-xs flex items-center gap-1.5 transition-transform active:scale-95 cursor-pointer"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied to Clipboard!' : 'Copy Invoice'}</span>
        </button>
      </div>

      {/* Main Invoice Bill */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {paidStatus && (
          <div className="p-3 bg-[#EEF8F1] border border-[#B3E3C0] rounded-xl text-[#1E6B38] text-xs font-mono flex items-center gap-2 shadow-xs animate-in fade-in">
            <Sparkles className="w-4 h-4" />
            <span>{paidStatus}</span>
          </div>
        )}

        <div className="bg-white border-2 border-[#D8CFBE] rounded-2xl p-5 shadow-sm space-y-4 max-w-lg mx-auto">
          {/* Card Header */}
          <div className="border-b border-[#E3D9CC] pb-3 flex items-start justify-between">
            <div>
              <h2 className="font-bold text-base text-[#8C3A27] font-display">
                DIDI OS SHAGUN BILLING DEPT.
              </h2>
              <div className="text-[11px] text-[#7A6B5D]">Billed To: The Designated Brother</div>
              <div className="text-[11px] text-[#7A6B5D]">Service Period: 2026 - Eternity</div>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-bold uppercase bg-red-100 text-red-800 px-2 py-0.5 rounded font-mono">
                OVERDUE
              </span>
              <div className="text-xs font-mono font-bold text-[#2A221B] mt-1">Aug 27, 2026</div>
            </div>
          </div>

          {/* Line items */}
          <div className="space-y-2 text-xs">
            {invoiceItems.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between py-1.5 border-b border-[#F4EFE6]">
                <div className="pr-2">
                  <div className="font-semibold text-[#2A221B]">{item.desc}</div>
                  <div className="text-[10px] text-[#A49688] font-mono">{item.note}</div>
                </div>
                <div className="font-mono font-bold text-[#8C3A27] shrink-0">
                  ₹{item.cost.toLocaleString()}
                </div>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="pt-2 space-y-1.5 text-xs font-mono border-t border-[#D8CFBE]">
            <div className="flex justify-between text-[#7A6B5D]">
              <span>Subtotal:</span>
              <span>₹{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-[#7A6B5D]">
              <span>Sibling GST (18% Drama Tax):</span>
              <span>₹{gst.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-base font-extrabold text-[#8C3A27] pt-1.5 border-t border-[#E3D9CC]">
              <span>TOTAL DUE:</span>
              <span>₹{total.toLocaleString()}</span>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="pt-3 border-t border-[#E3D9CC] space-y-2">
            <div className="text-[11px] font-bold uppercase text-[#7A6B5D]">
              Choose Settlement Method:
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => handlePay('UPI & Cold Hard Cash')}
                className="p-2 bg-[#FAF5EE] hover:bg-[#F3EAD9] border border-[#DDD3C2] rounded-xl text-xs font-bold text-[#3E2C20] flex flex-col items-center gap-1 transition-transform active:scale-95 cursor-pointer"
              >
                <CreditCard className="w-4 h-4 text-[#8C3A27]" />
                <span className="text-[11px]">UPI / Cash</span>
              </button>

              <button
                onClick={() => handlePay('Swiggy Cheese Pizza Delivery')}
                className="p-2 bg-[#FAF5EE] hover:bg-[#F3EAD9] border border-[#DDD3C2] rounded-xl text-xs font-bold text-[#3E2C20] flex flex-col items-center gap-1 transition-transform active:scale-95 cursor-pointer"
              >
                <Pizza className="w-4 h-4 text-orange-600" />
                <span className="text-[11px]">Order Pizza</span>
              </button>

              <button
                onClick={() => handlePay('Unconditional Sibling Obedience')}
                className="p-2 bg-[#FAF5EE] hover:bg-[#F3EAD9] border border-[#DDD3C2] rounded-xl text-xs font-bold text-[#3E2C20] flex flex-col items-center gap-1 transition-transform active:scale-95 cursor-pointer"
              >
                <Heart className="w-4 h-4 text-rose-600" />
                <span className="text-[11px]">Butler Duty</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-[#D8CFBE] px-4 py-2 bg-[#F0EAE1] flex items-center justify-between text-[11px] text-[#7A6B5D] font-mono">
        <span>Failure to pay results in 365 days of continuous roasting.</span>
        <span>Raksha Bandhan 2026</span>
      </div>
    </div>
  );
};
