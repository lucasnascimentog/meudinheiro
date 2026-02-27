"use client";

import { useState } from "react";
import { Transaction, TransactionType } from "@/types";
import { fmt } from "@/lib/utils";
import BarChart from "./BarChart";
import DonutChart from "./DonutChart";

interface Props {
  transactions: Transaction[];
}

export default function DashboardPage({ transactions }: Props) {
  const [donutFilter, setDonutFilter] = useState<TransactionType>("expense");

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((a, t) => a + t.value, 0);
  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((a, t) => a + t.value, 0);
  const balance = totalIncome - totalExpense;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-3 flex-wrap">
        <div className="flex-1 min-w-[130px] bg-slate-800 rounded-[14px] px-5 py-[18px] border border-slate-700">
          <p className="text-[11px] text-slate-500 uppercase tracking-widest mb-1.5">
            Saldo
          </p>
          <p
            className={`text-xl font-extrabold font-numeral tracking-tight ${
              balance >= 0 ? "text-blue-400" : "text-red-400"
            }`}
          >
            {fmt(balance)}
          </p>
        </div>
        <div className="flex-1 min-w-[130px] bg-slate-800 rounded-[14px] px-5 py-[18px] border border-slate-700">
          <p className="text-[11px] text-slate-500 uppercase tracking-widest mb-1.5">
            Receitas
          </p>
          <p className="text-xl font-extrabold font-numeral tracking-tight text-emerald-400">
            {fmt(totalIncome)}
          </p>
        </div>
        <div className="flex-1 min-w-[130px] bg-slate-800 rounded-[14px] px-5 py-[18px] border border-slate-700">
          <p className="text-[11px] text-slate-500 uppercase tracking-widest mb-1.5">
            Despesas
          </p>
          <p className="text-xl font-extrabold font-numeral tracking-tight text-red-400">
            {fmt(totalExpense)}
          </p>
        </div>
      </div>

      <div className="flex gap-4 flex-wrap">

        <div className="flex-1 min-w-[240px] bg-slate-800 rounded-[14px] p-6 border border-slate-700">
          <p className="text-sm font-semibold text-slate-400 mb-3">
            Evolução por mês
          </p>
          <div className="flex gap-3 mb-3.5">
            {[
              ["#10b981", "Receitas"],
              ["#ef4444", "Despesas"],
            ].map(([color, label]) => (
              <span
                key={label}
                className="flex items-center gap-1.5 text-[11px] text-slate-400"
              >
                <span
                  className="w-2.5 h-2.5 rounded-sm inline-block"
                  style={{ background: color }}
                />
                {label}
              </span>
            ))}
          </div>
          <BarChart transactions={transactions} />
        </div>

        <div className="flex-1 min-w-[240px] bg-slate-800 rounded-[14px] p-6 border border-slate-700">
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm font-semibold text-slate-400">% por categoria</p>
            <div className="flex bg-slate-950 rounded-lg overflow-hidden border border-slate-700">
              {(["expense", "income"] as TransactionType[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setDonutFilter(t)}
                  className={`px-3 py-1 text-[11px] border-none cursor-pointer transition-colors ${
                    donutFilter === t
                      ? t === "income"
                        ? "bg-emerald-500 text-white font-bold"
                        : "bg-red-500 text-white font-bold"
                      : "bg-transparent text-slate-400"
                  }`}
                >
                  {t === "income" ? "Receitas" : "Despesas"}
                </button>
              ))}
            </div>
          </div>
          <DonutChart transactions={transactions} filterType={donutFilter} />
        </div>
      </div>
    </div>
  );
}
