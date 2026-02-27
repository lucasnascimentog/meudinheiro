"use client";

import { Period } from "@/types";

interface Props {
  period: Period;
  onChange: (p: Period) => void;
}

export default function PeriodPicker({ period, onChange }: Props) {
  const setThisMonth = () => {
    const n = new Date();
    const y = n.getFullYear();
    const m = String(n.getMonth() + 1).padStart(2, "0");
    const d = new Date(y, n.getMonth() + 1, 0).getDate();
    onChange({ start: `${y}-${m}-01`, end: `${y}-${m}-${d}` });
  };

  const setThisYear = () => {
    const y = new Date().getFullYear();
    onChange({ start: `${y}-01-01`, end: `${y}-12-31` });
  };

  const inputCls =
    "bg-slate-800 border border-slate-700 rounded-lg text-slate-100 px-3 py-1.5 text-xs outline-none cursor-pointer focus:border-indigo-500 transition-colors";

  const shortcutCls =
    "px-3 py-1.5 rounded-lg border border-slate-700 bg-transparent text-slate-400 text-xs cursor-pointer hover:border-indigo-500 hover:text-indigo-400 transition-colors";

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-xs text-slate-500">Período:</span>
      <input
        type="date"
        className={inputCls}
        value={period.start}
        onChange={(e) => onChange({ ...period, start: e.target.value })}
      />
      <span className="text-xs text-slate-600">até</span>
      <input
        type="date"
        className={inputCls}
        value={period.end}
        onChange={(e) => onChange({ ...period, end: e.target.value })}
      />
      <button className={shortcutCls} onClick={setThisMonth}>
        Mês
      </button>
      <button className={shortcutCls} onClick={setThisYear}>
        Ano
      </button>
    </div>
  );
}
