"use client";

import { useState } from "react";
import { Category, Transaction, TransactionType } from "@/types";
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES, PAYMENT_METHODS } from "@/lib/constants";

interface Props {
  onClose: () => void;
  onSave: (tx: Omit<Transaction, "id">) => void;
  customIncCats: Category[];
  customExpCats: Category[];
  onAddCategory: (type: TransactionType, cat: Category) => void;
  editData?: Transaction | null;
}

type Step = "choose" | TransactionType;

export default function TransactionModal({
  onClose,
  onSave,
  customIncCats,
  customExpCats,
  onAddCategory,
  editData,
}: Props) {
  const isEdit = !!editData;
  const [step, setStep] = useState<Step>(isEdit ? editData!.type : "choose");
  const [newCatMode, setNewCatMode] = useState(false);
  const [newCatName, setNewCatName] = useState("");
  const [form, setForm] = useState({
    value: isEdit ? String(editData!.value) : "",
    description: isEdit ? editData!.description : "",
    category: isEdit ? editData!.category : "",
    date: isEdit ? editData!.date : new Date().toISOString().slice(0, 10),
    payment: isEdit ? editData!.payment : "Pix",
    paid: isEdit ? editData!.paid : true,
  });

  const type = step as TransactionType;
  const cats = [
    ...(type === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES),
    ...(type === "income" ? customIncCats : customExpCats),
  ];

  const handleSave = () => {
    if (!form.value || !form.category || !form.description) return;
    onSave({ ...form, type, value: parseFloat(form.value) });
    onClose();
  };

  const handleAddCat = () => {
    if (!newCatName.trim()) return;
    onAddCategory(type, {
      id: `custom_${Date.now()}`,
      label: newCatName.trim(),
      icon: "🏷️",
    });
    setNewCatMode(false);
    setNewCatName("");
  };

  const inputCls =
    "w-full bg-slate-950 border border-slate-700 rounded-lg text-slate-100 px-3 py-2.5 text-sm outline-none focus:border-indigo-500 transition-colors";

  const labelCls = "block text-[11px] text-slate-500 uppercase tracking-wide mb-1.5";

  return (
    <div
      className="fixed inset-0 bg-black/65 backdrop-blur-sm flex items-center justify-center z-[999] p-4"
      onClick={onClose}
    >
      <div
        className="bg-slate-800 rounded-2xl p-7 w-full max-w-md max-h-[90vh] overflow-y-auto border border-slate-700 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {step === "choose" ? (
          <>
            <h2 className="text-lg font-bold text-slate-100 mb-2">Nova Transação</h2>
            <p className="text-sm text-slate-400 mb-6">Qual tipo deseja adicionar?</p>
            <div className="flex gap-3">
              <button
                onClick={() => setStep("income")}
                className="flex-1 py-3.5 rounded-xl border-2 border-emerald-500 text-emerald-400 text-sm font-bold bg-transparent hover:bg-emerald-500 hover:text-white transition-all"
              >
                💚 Receita
              </button>
              <button
                onClick={() => setStep("expense")}
                className="flex-1 py-3.5 rounded-xl border-2 border-red-500 text-red-400 text-sm font-bold bg-transparent hover:bg-red-500 hover:text-white transition-all"
              >
                🔴 Despesa
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center gap-2.5 mb-5">
              {!isEdit && (
                <button
                  onClick={() => setStep("choose")}
                  className="text-slate-400 hover:text-slate-200 text-xl bg-transparent border-none cursor-pointer transition-colors"
                >
                  ←
                </button>
              )}
              <h2
                className={`text-lg font-bold ${
                  type === "income" ? "text-emerald-400" : "text-red-400"
                }`}
              >
                {isEdit
                  ? "✏️ Editar Transação"
                  : type === "income"
                  ? "💚 Receita"
                  : "🔴 Despesa"}
              </h2>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <label className={labelCls}>Valor</label>
                <input
                  type="number"
                  className={inputCls}
                  placeholder="0.00"
                  value={form.value}
                  onChange={(e) => setForm({ ...form, value: e.target.value })}
                />
              </div>

              <div>
                <label className={labelCls}>Descrição</label>
                <input
                  type="text"
                  className={inputCls}
                  placeholder="Ex: Salário, Mercado..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className={labelCls.replace("mb-1.5", "")}>Categoria</label>
                  <button
                    onClick={() => setNewCatMode(!newCatMode)}
                    className="text-[11px] text-indigo-400 hover:text-indigo-300 bg-transparent border-none cursor-pointer transition-colors"
                  >
                    + Nova categoria
                  </button>
                </div>
                {newCatMode && (
                  <div className="flex gap-2 mb-2">
                    <input
                      className={`${inputCls} flex-1`}
                      placeholder="Nome da categoria"
                      value={newCatName}
                      onChange={(e) => setNewCatName(e.target.value)}
                    />
                    <button
                      onClick={handleAddCat}
                      className="px-4 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium cursor-pointer transition-colors border-none"
                    >
                      OK
                    </button>
                  </div>
                )}
                <select
                  className={inputCls}
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                >
                  <option value="">Selecionar...</option>
                  {cats.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.icon} {c.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelCls}>Data</label>
                <input
                  type="date"
                  className={inputCls}
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                />
              </div>

              <div>
                <label className={labelCls}>Forma de Pagamento</label>
                <select
                  className={inputCls}
                  value={form.payment}
                  onChange={(e) => setForm({ ...form, payment: e.target.value })}
                >
                  {PAYMENT_METHODS.map((m) => (
                    <option key={m}>{m}</option>
                  ))}
                </select>
              </div>

              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.paid}
                  onChange={(e) => setForm({ ...form, paid: e.target.checked })}
                  className="w-4 h-4 accent-indigo-500"
                />
                <span className="text-sm text-slate-300">
                  {type === "income" ? "Já recebi" : "Já paguei"}
                </span>
              </label>

              <div className="flex gap-2.5 mt-1">
                <button
                  onClick={onClose}
                  className="flex-1 py-3 rounded-xl border border-slate-700 bg-transparent text-slate-400 hover:text-slate-200 hover:border-slate-500 text-sm cursor-pointer transition-all"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 py-3 rounded-xl border-none bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-sm font-bold cursor-pointer transition-all"
                >
                  Salvar
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
