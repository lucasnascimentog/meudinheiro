"use client";

import { User } from "@/types";

type Page = "dashboard" | "transactions" | "profile";

interface Props {
  page: Page;
  user: User;
  onNavigate: (p: Page) => void;
  onNewTransaction: () => void;
  onLogout: () => void;
}

const NAV_ITEMS: { id: Page; icon: string; label: string }[] = [
  { id: "dashboard", icon: "⬡", label: "Dashboard" },
  { id: "transactions", icon: "↕", label: "Transações" },
];

export default function Sidebar({
  page,
  user,
  onNavigate,
  onNewTransaction,
  onLogout,
}: Props) {
  return (
    <div className="flex flex-col items-center h-full pt-8 pb-5">
      {/* Logo */}
      <div className="mb-9 text-center px-4">
        <div className="w-11 h-11 rounded-[14px] bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-xl mx-auto mb-2.5 shadow-lg shadow-indigo-500/30">
          💰
        </div>
        <span className="text-[15px] font-extrabold tracking-tight">
          Meu Dinheiro
        </span>
      </div>

      {/* Add button */}
      <button
        onClick={onNewTransaction}
        className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 border-[3px] border-slate-950 text-white text-2xl flex items-center justify-center mb-7 cursor-pointer shadow-[0_0_20px_rgba(99,102,241,0.5)] hover:scale-110 hover:shadow-[0_0_30px_rgba(99,102,241,0.7)] transition-all duration-200"
        title="Nova transação"
      >
        +
      </button>

      {/* Nav */}
      <nav className="flex flex-col gap-1 w-full px-3.5 flex-1">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl border-none text-sm cursor-pointer text-left w-full transition-all duration-150 ${
              page === item.id
                ? "bg-indigo-500/15 text-indigo-300 font-semibold border-l-2 border-indigo-500"
                : "bg-transparent text-slate-500 font-normal border-l-2 border-transparent hover:bg-white/[0.04] hover:text-slate-400"
            }`}
          >
            <span className="text-base">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      {/*profile + logout */}
      <div className="w-full px-3.5 pt-3.5 border-t border-slate-700 mt-2.5">
        <div className="flex gap-1.5 items-center">
          <button
            onClick={() => onNavigate("profile")}
            className={`flex-1 flex items-center gap-2.5 px-2.5 py-2 rounded-xl border-none text-sm cursor-pointer text-left transition-all duration-150 ${
              page === "profile"
                ? "bg-indigo-500/15 text-indigo-300"
                : "bg-transparent text-slate-400 hover:bg-white/[0.05]"
            }`}
          >
            <div className="w-[30px] h-[30px] rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 shrink-0 overflow-hidden flex items-center justify-center text-sm">
              {user.photo ? (
                <img src={user.photo} alt="" className="w-full h-full object-cover" />
              ) : (
                "👤"
              )}
            </div>
            <div className="overflow-hidden flex-1 min-w-0">
              <p className="text-xs font-semibold text-slate-200 truncate">
                {user.name}
              </p>
              <p className="text-[10px] text-slate-500">Meu Perfil</p>
            </div>
          </button>

          <button
            onClick={onLogout}
            title="Sair"
            className="w-[34px] h-[34px] rounded-[9px] border border-slate-700 bg-transparent text-slate-500 hover:border-red-500 hover:text-red-400 flex items-center justify-center text-base cursor-pointer transition-all duration-150 shrink-0"
          >
            ⏻
          </button>
        </div>
      </div>
    </div>
  );
}
