"use client";

import { useMemo, useState } from "react";
import { Category, Period, Transaction, TransactionType, User } from "@/types";
import { SEED_TRANSACTIONS } from "@/lib/constants";
import { getCurrentMonthPeriod } from "@/lib/utils";
import Sidebar from "@/components/Sidebar";
import PeriodPicker from "@/components/PeriodPicker";
import DashboardPage from "@/components/DashboardPage";
import TransactionsPage from "@/components/TransactionsPage";
import ProfilePage from "@/components/ProfilePage";
import TransactionModal from "@/components/TransactionModal";
import DeleteConfirm from "@/components/DeleteConfirm";

type Page = "dashboard" | "transactions" | "profile";

const PAGE_LABELS: Record<Page, string> = {
  dashboard: "Dashboard",
  transactions: "Transações",
  profile: "Meu Perfil",
};

export default function AppClient() {
  const [period, setPeriod] = useState<Period>(getCurrentMonthPeriod());
  const [page, setPage] = useState<Page>("dashboard");
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState<Transaction | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>(SEED_TRANSACTIONS);
  const [customIncCats, setCustomIncCats] = useState<Category[]>([]);
  const [customExpCats, setCustomExpCats] = useState<Category[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<User>({
    name: "Lucas",
    email: "lucas@gmail.com",
    photo: null,
  });

  const filtered = useMemo(
    () =>
      transactions.filter(
        (t) => t.date >= period.start && t.date <= period.end
      ),
    [transactions, period]
  );

  const openNewTransaction = () => {
    setEditData(null);
    setModalOpen(true);
    setSidebarOpen(false);
  };

  const handleSave = (tx: Omit<Transaction, "id">) => {
    if (editData) {
      setTransactions((prev) =>
        prev.map((t) => (t.id === editData.id ? { ...tx, id: t.id } : t))
      );
    } else {
      setTransactions((prev) => [...prev, { ...tx, id: Date.now() }]);
    }
    setEditData(null);
  };

  const handleEdit = (tx: Transaction) => {
    setEditData(tx);
    setModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    setTransactions((prev) => prev.filter((t) => t.id !== deleteId));
    setDeleteId(null);
  };

  const handleAddCategory = (type: TransactionType, cat: Category) => {
    if (type === "income") setCustomIncCats((p) => [...p, cat]);
    else setCustomExpCats((p) => [...p, cat]);
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-[220px] bg-slate-800 border-r border-slate-700 flex-col shrink-0 sticky top-0 h-screen">
        <Sidebar
          page={page}
          user={user}
          onNavigate={setPage}
          onNewTransaction={openNewTransaction}
          onLogout={() => alert("Logout!")}
        />
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/60 z-[300] flex"
          onClick={() => setSidebarOpen(false)}
        >
          <div
            className="w-60 h-full bg-slate-800 border-r border-slate-700 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <Sidebar
              page={page}
              user={user}
              onNavigate={(p) => { setPage(p); setSidebarOpen(false); }}
              onNewTransaction={openNewTransaction}
              onLogout={() => alert("Logout!")}
            />
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-x-hidden min-w-0">
        {/* Mobile top bar */}
        <div className="md:hidden flex items-center justify-between px-4 py-3 bg-slate-800 border-b border-slate-700 sticky top-0 z-[100]">
          <button
            onClick={() => setSidebarOpen(true)}
            className="w-9 h-9 border border-slate-700 rounded-xl bg-transparent text-slate-400 hover:text-slate-200 flex items-center justify-center text-lg cursor-pointer transition-colors"
          >
            ☰
          </button>
          <span className="text-[15px] font-extrabold">💰 Meu Dinheiro</span>
          <button
            onClick={openNewTransaction}
            className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 border-none text-white text-2xl flex items-center justify-center cursor-pointer"
          >
            +
          </button>
        </div>

        {/* Desktop header */}
        <header className="hidden md:flex items-center justify-between px-8 py-4 border-b border-slate-800 bg-slate-950 sticky top-0 z-10 gap-4 flex-wrap">
          <h1 className="text-lg font-bold text-slate-100">{PAGE_LABELS[page]}</h1>
          {page !== "profile" && (
            <PeriodPicker period={period} onChange={setPeriod} />
          )}
        </header>

        {/* Mobile period bar */}
        {page !== "profile" && (
          <div className="md:hidden px-4 py-2.5 bg-slate-950 border-b border-slate-800 flex flex-wrap gap-2">
            <PeriodPicker period={period} onChange={setPeriod} />
          </div>
        )}

        {/* Page content */}
        <div className="p-4 md:p-8 flex-1">
          {page === "dashboard" && <DashboardPage transactions={filtered} />}
          {page === "transactions" && (
            <TransactionsPage
              transactions={filtered}
              customIncCats={customIncCats}
              customExpCats={customExpCats}
              onEdit={handleEdit}
              onDelete={setDeleteId}
            />
          )}
          {page === "profile" && (
            <ProfilePage user={user} onSave={setUser} />
          )}
        </div>
      </main>

      {/* Modals */}
      {modalOpen && (
        <TransactionModal
          onClose={() => { setModalOpen(false); setEditData(null); }}
          onSave={handleSave}
          customIncCats={customIncCats}
          customExpCats={customExpCats}
          onAddCategory={handleAddCategory}
          editData={editData}
        />
      )}

      {deleteId !== null && (
        <DeleteConfirm
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </div>
  );
}
