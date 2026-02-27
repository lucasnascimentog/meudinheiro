"use client";

import { useMemo } from "react";
import { Transaction } from "@/types";
import { fmt } from "@/lib/utils";

interface Props {
  transactions: Transaction[];
}

export default function BarChart({ transactions }: Props) {
  const byMonth = useMemo(() => {
    const map: Record<string, { income: number; expense: number }> = {};
    transactions.forEach((t) => {
      const m = t.date.slice(0, 7);
      if (!map[m]) map[m] = { income: 0, expense: 0 };
      if (t.type === "income") map[m].income += t.value;
      else map[m].expense += t.value;
    });
    return Object.entries(map)
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(-4);
  }, [transactions]);

  const max = Math.max(
    ...byMonth.flatMap(([, v]) => [v.income, v.expense]),
    1
  );

  return (
    <div className="flex items-end gap-4 h-28 px-1">
      {byMonth.map(([month, { income, expense }]) => {
        const label = new Date(month + "-01").toLocaleDateString("pt-BR", {
          month: "short",
          year: "2-digit",
        });
        return (
          <div
            key={month}
            className="flex-1 flex flex-col items-center gap-1"
          >
            <div className="flex gap-1 items-end h-[90px]">
              <div
                title={`Receitas: ${fmt(income)}`}
                className="w-3.5 rounded-t min-h-[2px] transition-all duration-500"
                style={{
                  height: `${(income / max) * 100}%`,
                  background: "linear-gradient(180deg,#34d399,#10b981)",
                }}
              />
              <div
                title={`Despesas: ${fmt(expense)}`}
                className="w-3.5 rounded-t min-h-[2px] transition-all duration-500"
                style={{
                  height: `${(expense / max) * 100}%`,
                  background: "linear-gradient(180deg,#f87171,#ef4444)",
                }}
              />
            </div>
            <span className="text-[10px] text-slate-500">{label}</span>
          </div>
        );
      })}
    </div>
  );
}
