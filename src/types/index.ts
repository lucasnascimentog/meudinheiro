export type TransactionType = "income" | "expense";

export interface Category {
  id: string;
  label: string;
  icon: string;
}

export interface Transaction {
  id: number;
  date: string;
  type: TransactionType;
  description: string;
  category: string;
  value: number;
  paid: boolean;
  payment: string;
}

export interface Period {
  start: string;
  end: string;
}

export interface User {
  name: string;
  email: string;
  photo: string | null;
}
