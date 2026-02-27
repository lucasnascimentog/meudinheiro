import { Category, TransactionType } from "@/types";
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from "./constants";

export const fmt = (v: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v);

export const fmtDate = (d: string) =>
  new Date(d + "T00:00:00").toLocaleDateString("pt-BR");

export function getCategoryLabel(
  type: TransactionType,
  id: string,
  customCats: Category[] = []
): string {
  const list = type === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
  return [...list, ...customCats].find((c) => c.id === id)?.label ?? id;
}

export function getCategoryIcon(
  type: TransactionType,
  id: string,
  customCats: Category[] = []
): string {
  const list = type === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
  return [...list, ...customCats].find((c) => c.id === id)?.icon ?? "•";
}

export function getCurrentMonthPeriod() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const days = new Date(y, now.getMonth() + 1, 0).getDate();
  return { start: `${y}-${m}-01`, end: `${y}-${m}-${days}` };
}
