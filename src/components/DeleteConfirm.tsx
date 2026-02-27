"use client";

interface Props {
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteConfirm({ onConfirm, onCancel }: Props) {
  return (
    <div
      className="fixed inset-0 bg-black/65 backdrop-blur-sm flex items-center justify-center z-[999] p-4"
      onClick={onCancel}
    >
      <div
        className="bg-slate-800 rounded-2xl p-7 w-full max-w-sm border border-slate-700 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-4xl text-center mb-3">🗑️</div>
        <h3 className="text-lg font-bold text-slate-100 text-center mb-2">
          Excluir transação?
        </h3>
        <p className="text-sm text-slate-400 text-center mb-6">
          Esta ação não pode ser desfeita.
        </p>
        <div className="flex gap-2.5">
          <button
            onClick={onCancel}
            className="flex-1 py-3 rounded-xl border border-slate-700 bg-transparent text-slate-400 hover:text-slate-200 text-sm cursor-pointer transition-all"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-3 rounded-xl border-none bg-red-500 hover:bg-red-400 text-white text-sm font-bold cursor-pointer transition-all"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}
