import { Category, Transaction } from "@/types";

export const INCOME_CATEGORIES: Category[] = [
  { id: "salary", label: "Salário", icon: "💼" },
  { id: "cashback", label: "Cashback", icon: "🔄" },
  { id: "gift", label: "Presente", icon: "🎁" },
  { id: "sale", label: "Venda", icon: "🛍️" },
  { id: "investment", label: "Investimento", icon: "📈" },
  { id: "prize", label: "Prêmio", icon: "🏆" },
  { id: "others_in", label: "Outros", icon: "➕" },
];

export const EXPENSE_CATEGORIES: Category[] = [
  { id: "leisure", label: "Lazer", icon: "🎮" },
  { id: "transport", label: "Transporte", icon: "🚗" },
  { id: "food", label: "Alimentação", icon: "🍔" },
  { id: "donation", label: "Doação", icon: "❤️" },
  { id: "tax", label: "Imposto", icon: "🏛️" },
  { id: "services", label: "Serviços", icon: "🔧" },
  { id: "market", label: "Supermercado", icon: "🛒" },
  { id: "clothing", label: "Vestuário", icon: "👕" },
  { id: "health", label: "Saúde", icon: "🏥" },
  { id: "education", label: "Educação", icon: "📚" },
  { id: "others_ex", label: "Outros", icon: "➖" },
];

export const PAYMENT_METHODS = ["Dinheiro", "Pix", "Transferência", "Cartão"] as const;

export const SEED_TRANSACTIONS: Transaction[] = [
  { id: 1, date: "2024-11-05", type: "income", description: "Salário mensal", category: "salary", value: 5500, paid: true, payment: "Transferência" },
  { id: 2, date: "2024-11-08", type: "expense", description: "Supermercado", category: "market", value: 340.5, paid: true, payment: "Cartão" },
  { id: 3, date: "2024-11-10", type: "expense", description: "Academia", category: "health", value: 89.9, paid: true, payment: "Cartão" },
  { id: 4, date: "2024-11-12", type: "income", description: "Freela design", category: "sale", value: 1200, paid: true, payment: "Pix" },
  { id: 5, date: "2024-11-15", type: "expense", description: "Spotify + Netflix", category: "leisure", value: 65, paid: true, payment: "Cartão" },
  { id: 6, date: "2024-11-18", type: "expense", description: "Gasolina", category: "transport", value: 180, paid: true, payment: "Dinheiro" },
  { id: 7, date: "2024-11-20", type: "expense", description: "Restaurante", category: "food", value: 95.5, paid: true, payment: "Pix" },
  { id: 8, date: "2024-11-22", type: "income", description: "Cashback cartão", category: "cashback", value: 87.3, paid: true, payment: "Cartão" },
  { id: 9, date: "2024-11-25", type: "expense", description: "Curso online", category: "education", value: 199, paid: false, payment: "Cartão" },
  { id: 10, date: "2024-11-28", type: "expense", description: "Roupa nova", category: "clothing", value: 260, paid: true, payment: "Cartão" },
];

export const CHART_COLORS = [
  "#6366f1", "#f59e0b", "#10b981", "#f87171", "#60a5fa",
  "#a78bfa", "#34d399", "#fb923c", "#e879f9", "#38bdf8",
];
