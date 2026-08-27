import React, { useState, useRef, useEffect } from 'react';
import { playClickSound, playErrorSound, playSuccessSound } from '../../utils/sound';
import { Terminal as TerminalIcon, Sparkles } from 'lucide-react';

interface LogEntry {
  command?: string;
  output: string | React.ReactNode;
  type?: 'input' | 'output' | 'error' | 'success';
}

export const TerminalApp: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [logs, setLogs] = useState<LogEntry[]>([
    { output: "DIDI OS Sibling Shell (v2.0.26-release)", type: 'output' },
    { output: "Type 'help' to see available sibling commands.", type: 'output' }
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim();
    if (!cmd) return;

    playClickSound();
    const lower = cmd.toLowerCase();
    const newLogs: LogEntry[] = [...logs, { command: cmd, output: '', type: 'input' }];

    if (lower === 'help') {
      newLogs.push({
        output: (
          <div className="space-y-1 text-xs text-[#EFEBE4]">
            <div className="text-amber-400 font-bold">AVAILABLE COMMANDS:</div>
            <div>• <span className="text-emerald-400">help</span> - Display this cheat sheet</div>
            <div>• <span className="text-emerald-400">sudo [action]</span> - Attempt administrative privilege</div>
            <div>• <span className="text-emerald-400">snack</span> - Check snack radar</div>
            <div>• <span className="text-emerald-400">roast</span> - Generate instant elder sister roast</div>
            <div>• <span className="text-emerald-400">apologize</span> - Submit formal brother apology</div>
            <div>• <span className="text-emerald-400">rakhi</span> - Display Raksha Bandhan thread</div>
            <div>• <span className="text-emerald-400">clear</span> - Purge terminal logs</div>
            <div>• <span className="text-emerald-400">matrix</span> - Enter brother reality matrix</div>
          </div>
        ),
        type: 'output'
      });
    } else if (lower.startsWith('sudo')) {
      playErrorSound();
      newLogs.push({
        output: "brother is not in the sudoers file. This incident will be reported to Didi.",
        type: 'error'
      });
    } else if (lower === 'snack') {
      newLogs.push({
        output: "RADAR: 3x Bourbon biscuits detected in pantry top shelf. Didi is already moving to intercept.",
        type: 'output'
      });
    } else if (lower === 'roast') {
      playSuccessSound();
      const roasts = [
        "Why do you look like you need subtitles when people are speaking to you?",
        "I was an only child for 3 years and they were the best 3 years of my life.",
        "Your WiFi connection is stronger than your arguments.",
        "If laughing at your jokes was a crime, you would be the most innocent person on Earth."
      ];
      newLogs.push({
        output: `[ROAST ENGINE] "${roasts[Math.floor(Math.random() * roasts.length)]}"`,
        type: 'success'
      });
    } else if (lower === 'apologize') {
      newLogs.push({
        output: "Apology received -> Converted to JSON -> Uploaded to /dev/null (Disregarded).",
        type: 'output'
      });
    } else if (lower === 'rakhi') {
      playSuccessSound();
      newLogs.push({
        output: (
          <pre className="text-amber-400 text-[10px] leading-tight font-mono">
{`   ★═══════════════════════════════════★
      ───==[ ❁ DIDI OS RAKHI ❁ ]==───
   ★═══════════════════════════════════★
          Zero Sentimentality
          100% Protection from Ghosts
          ₹50,000 Shagun Due Now`}
          </pre>
        ),
        type: 'output'
      });
    } else if (lower === 'matrix') {
      newLogs.push({
        output: "Wake up, Brother... The Matrix has you. Didi took your charger.",
        type: 'success'
      });
    } else if (lower === 'clear') {
      setLogs([]);
      setInput('');
      return;
    } else {
      playErrorSound();
      newLogs.push({
        output: `bash: command not found: ${cmd}. Type 'help' for valid commands.`,
        type: 'error'
      });
    }

    setLogs(newLogs);
    setInput('');
  };

  return (
    <div className="flex flex-col h-full bg-[#181310] text-[#EFEBE4] select-none text-xs font-mono">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-[#382B21] px-4 py-2 bg-[#241D17]">
        <div className="flex items-center gap-2">
          <TerminalIcon className="w-4 h-4 text-emerald-400" />
          <span className="font-bold tracking-wide uppercase text-white">brother@didi-os:~$</span>
        </div>
        <span className="text-[10px] text-[#A49688]">sh (bash)</span>
      </div>

      {/* Terminal Output */}
      <div className="flex-1 p-4 overflow-y-auto space-y-2 font-mono">
        {logs.map((log, i) => (
          <div key={i} className="space-y-1">
            {log.command && (
              <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                <span>brother@didi-os:~$</span>
                <span className="text-white">{log.command}</span>
              </div>
            )}
            {log.output && (
              <div className={
                log.type === 'error' ? 'text-red-400' :
                log.type === 'success' ? 'text-emerald-400' :
                'text-[#D8CFBE]'
              }>
                {log.output}
              </div>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Terminal Input */}
      <form onSubmit={handleCommand} className="p-3 border-t border-[#382B21] bg-[#241D17] flex items-center gap-2">
        <span className="text-emerald-400 font-bold shrink-0">brother@didi-os:~$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type 'help' or command..."
          className="flex-1 bg-transparent border-none text-white focus:outline-none text-xs font-mono"
          autoFocus
        />
      </form>
    </div>
  );
};
