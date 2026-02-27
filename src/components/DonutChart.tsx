"use client";

import { useMemo } from "react";
import { Transaction, TransactionType } from "@/types";
import { CHART_COLORS } from "@/lib/constants";
import { fmt, getCategoryLabel } from "@/lib/utils";

interface Props {
  transactions: Transaction[];
  filterType: TransactionType;
}

export default function DonutChart({ transactions, filterType }: Props) {
  const data = useMemo(() => {
    const filtered = transactions.filter((t) => t.type === filterType);
    const map: Record<string, number> = {};
    filtered.forEach((t) => {
      map[t.category] = (map[t.category] || 0) + t.value;
    });
    const total = Object.values(map).reduce((a, b) => a + b, 0);
    return Object.entries(map).map(([cat, val]) => ({
      cat,
      val,
      pct: total ? (val / total) * 100 : 0,
    }));
  }, [transactions, filterType]);

  const total = data.reduce((a, b) => a + b.val, 0);
  const SIZE = 120;
  const RADIUS = 45;
  const STROKE = 18;
  const CX = SIZE / 2;
  const CY = SIZE / 2;
  const circ = 2 * Math.PI * RADIUS;

  let offset = 0;
  const arcs = data.map((d, i) => {
    const dash = (d.pct / 100) * circ;
    const arc = {
      ...d,
      dash,
      gap: circ - dash,
      offset,
      color: CHART_COLORS[i % CHART_COLORS.length],
    };
    offset += dash;
    return arc;
  });

  return (
    <div className="flex gap-5 items-center">
      <svg width={SIZE} height={SIZE} className="shrink-0">
        <circle cx={CX} cy={CY} r={RADIUS} fill="none" stroke="#0f172a" strokeWidth={STROKE} />
        {arcs.map((arc, i) => (
          <circle
            key={i}
            cx={CX} cy={CY} r={RADIUS}
            fill="none"
            stroke={arc.color}
            strokeWidth={STROKE}
            strokeDasharray={`${arc.dash} ${arc.gap}`}
            strokeDashoffset={-arc.offset}
            style={{
              transform: `rotate(-90deg)`,
              transformOrigin: `${CX}px ${CY}px`,
            }}
          >
            <title>{arc.cat}: {arc.pct.toFixed(1)}%</title>
          </circle>
        ))}
        <text x={CX} y={CY - 6} textAnchor="middle" fill="#f1f5f9" fontSize={11} fontWeight="600">
          {fmt(total)}
        </text>
        <text x={CX} y={CY + 10} textAnchor="middle" fill="#94a3b8" fontSize={9}>
          total
        </text>
      </svg>

      <div className="flex flex-col gap-1.5 overflow-auto max-h-36">
        {arcs.map((arc, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <div
              className="w-2 h-2 rounded-full shrink-0"
              style={{ background: arc.color }}
            />
            <span className="text-[11px] text-slate-300">
              {getCategoryLabel(filterType, arc.cat)} —{" "}
              <strong className="text-slate-100">{arc.pct.toFixed(0)}%</strong>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
