"use client";

import { useState } from "react";
import { Category, Transaction } from "@/types";
import { fmtDate, fmt, getCategoryIcon, getCategoryLabel } from "@/lib/utils";

interface Props {
  transactions: Transaction[];
  customIncCats: Category[];
  customExpCats: Category[];
  onEdit: (tx: Transaction) => void;
  onDelete: (id: number) => void;
}

type Filter = "all" | "income" | "expense";

export default function TransactionsPage({
  transactions,
  customIncCats,
  customExpCats,
  onEdit,
  onDelete,
}: Props) {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = transactions
    .filter((t) => (filter === "all" ? true : t.type === filter))
    .sort((a, b) => b.date.localeCompare(a.date));

  const typeColor = (t: Transaction["type"]) =>
    t === "income" ? "text-emerald-400" : "text-red-400";
  const typeBg = (t: Transaction["type"]) =>
    t === "income" ? "bg-emerald-400/10 text-emerald-400" : "bg-red-400/10 text-red-400";
  const typeLabel = (t: Transaction["type"]) =>
    t === "income" ? "Receita" : "Despesa";

  const customCats = (type: Transaction["type"]) =>
    type === "income" ? customIncCats : customExpCats;

  return (
    <div>
      {/* Filter tabs */}
      <div className="flex gap-2 mb-5 flex-wrap">
        {(
          [
            { v: "all", l: "Todas" },
            { v: "income", l: "Receitas" },
            { v: "expense", l: "Despesas" },
          ] as { v: Filter; l: string }[]
        ).map((opt) => (
          <button
            key={opt.v}
            onClick={() => setFilter(opt.v)}
            className={`px-4 py-2 rounded-xl text-sm cursor-pointer border transition-all ${
              filter === opt.v
                ? "border-indigo-500 bg-indigo-500/15 text-indigo-300 font-semibold"
                : "border-slate-700 bg-transparent text-slate-500 hover:text-slate-300"
            }`}
          >
            {opt.l}
          </button>
        ))}
      </div>

      <div className="bg-slate-800 rounded-[14px] border border-slate-700 overflow-hidden">
        {/* Desktop header */}
        <div className="hidden md:grid grid-cols-[100px_80px_1fr_140px_120px_80px] px-5 py-3 border-b border-slate-900 gap-2">
          {["Data", "Tipo", "Descrição", "Categoria", "Valor", "Ações"].map(
            (h) => (
              <span
                key={h}
                className="text-[11px] text-slate-600 font-bold uppercase tracking-wide"
              >
                {h}
              </span>
            )
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="py-10 text-center text-slate-600">
            Nenhuma transação encontrada.
          </div>
        ) : (
          filtered.map((t, i) => (
            <div
              key={t.id}
              className={`hover:bg-slate-900/60 transition-colors ${
                i < filtered.length - 1 ? "border-b border-slate-900" : ""
              }`}
            >
              {/* Desktop row */}
              <div className="hidden md:grid grid-cols-[100px_80px_1fr_140px_120px_80px] px-5 py-3.5 gap-2 items-center">
                <span className="text-xs text-slate-500">{fmtDate(t.date)}</span>
                <span className={`text-[11px] font-semibold px-2 py-1 rounded-md w-fit ${typeBg(t.type)}`}>
                  {typeLabel(t.type)}
                </span>
                <div>
                  <p className="text-sm text-slate-200">{t.description}</p>
                  {!t.paid && (
                    <span className="text-[10px] text-amber-400">⏳ Pendente</span>
                  )}
                </div>
                <span className="text-xs text-slate-400">
                  {getCategoryIcon(t.type, t.category, customCats(t.type))}{" "}
                  {getCategoryLabel(t.type, t.category, customCats(t.type))}
                </span>
                <span className={`text-sm font-extrabold font-numeral ${typeColor(t.type)}`}>
                  {t.type === "expense" ? "−" : "+"}
                  {fmt(t.value)}
                </span>
                <div className="flex gap-1.5">
                  <button
                    onClick={() => onEdit(t)}
                    className="w-[30px] h-[30px] rounded-lg border border-slate-700 bg-transparent text-slate-500 hover:border-indigo-500 hover:text-indigo-400 flex items-center justify-center text-sm cursor-pointer transition-all"
                    title="Editar"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => onDelete(t.id)}
                    className="w-[30px] h-[30px] rounded-lg border border-slate-700 bg-transparent text-slate-500 hover:border-red-500 hover:text-red-400 flex items-center justify-center text-sm cursor-pointer transition-all"
                    title="Excluir"
                  >
                    🗑️
                  </button>
                </div>
              </div>

              {/* Mobile row */}
              <div className="md:hidden px-4 py-3.5 flex flex-col gap-2">
                <div className="flex justify-between items-start gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-200 font-medium">
                      {t.description}
                    </p>
                    <span className="text-[11px] text-slate-500">
                      {fmtDate(t.date)} ·{" "}
                      {getCategoryIcon(t.type, t.category, customCats(t.type))}{" "}
                      {getCategoryLabel(t.type, t.category, customCats(t.type))}
                    </span>
                  </div>
                  <span
                    className={`text-[15px] font-extrabold font-numeral whitespace-nowrap ${typeColor(t.type)}`}
                  >
                    {t.type === "expense" ? "−" : "+"}
                    {fmt(t.value)}
                  </span>
                </div>
                <div className="flex gap-2 items-center">
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${typeBg(t.type)}`}>
                    {typeLabel(t.type)}
                  </span>
                  {!t.paid && (
                    <span className="text-[10px] text-amber-400">⏳ Pendente</span>
                  )}
                  <div className="ml-auto flex gap-1.5">
                    <button
                      onClick={() => onEdit(t)}
                      className="px-2.5 py-1 rounded-lg border border-slate-700 bg-transparent text-slate-400 hover:border-indigo-500 hover:text-indigo-400 text-xs cursor-pointer transition-all"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => onDelete(t.id)}
                      className="px-2.5 py-1 rounded-lg border border-slate-700 bg-transparent text-slate-400 hover:border-red-500 hover:text-red-400 text-xs cursor-pointer transition-all"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
