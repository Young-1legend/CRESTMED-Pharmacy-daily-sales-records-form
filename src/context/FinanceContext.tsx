import React, { createContext, useContext, useState, useEffect } from 'react';

export interface SalesItem {
  id: number;
  name: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface ExpenseItem {
  id: number;
  category: string;
  amount: number;
}

export interface DailySale {
  date: string;
  amount: number;
}

interface FinanceContextType {
  currentDate: string;
  setCurrentDate: (date: string) => void;
  formReference: string;
  dailySales: DailySale[];
  setDailySales: React.Dispatch<React.SetStateAction<DailySale[]>>;
  handleSaleChange: (date: string, amount: number) => void;
  profitMargin: number;
  setProfitMargin: (margin: number) => void;
  expenses: ExpenseItem[];
  setExpenses: React.Dispatch<React.SetStateAction<ExpenseItem[]>>; // Added this line
  handleExpenseChange: (id: number, amount: number) => void;
  totalSales: number;
  grossProfit: number;
  totalExpenses: number;
  netProfit: number;
  resetForm: () => void;
  printForm: () => void;
}


const STORAGE_KEYS = {
  DAILY_SALES: 'finance_dailySales',
  PROFIT_MARGIN: 'finance_profitMargin',
  EXPENSES: 'finance_expenses',
  FORM_REFERENCE: 'finance_formReference'
};

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export function FinanceProvider({ children }: { children: React.ReactNode }) {
  const [currentDate, setCurrentDate] = useState<string>('');
  const [formReference, setFormReference] = useState<string>('');
  
  const [dailySales, setDailySales] = useState<DailySale[]>(() => {
    const savedSales = localStorage.getItem(STORAGE_KEYS.DAILY_SALES);
    if (savedSales) {
      return JSON.parse(savedSales);
    }
    
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    return Array.from({ length: daysInMonth }, (_, index) => ({
      date: new Date(year, month, index + 1).toISOString().split('T')[0],
      amount: 0
    }));
  });
  
  const [profitMargin, setProfitMargin] = useState<number>(() => {
    const savedMargin = localStorage.getItem(STORAGE_KEYS.PROFIT_MARGIN);
    return savedMargin ? parseFloat(savedMargin) : 30;
  });
  
  const [expenses, setExpenses] = useState<ExpenseItem[]>(() => {
    const savedExpenses = localStorage.getItem(STORAGE_KEYS.EXPENSES);
    if (savedExpenses) {
      return JSON.parse(savedExpenses);
    }
    
    return [
      { id: 1, category: 'Rent', amount: 0 },
      { id: 2, category: 'Utilities', amount: 0 },
      { id: 3, category: 'Salaries', amount: 0 },
      { id: 4, category: 'Supplies', amount: 0 }
    ];
  });
  
  useEffect(() => {
    const today = new Date();
    setCurrentDate(today.toISOString().split('T')[0]);
    
    const savedReference = localStorage.getItem(STORAGE_KEYS.FORM_REFERENCE);
    if (savedReference) {
      setFormReference(savedReference);
    } else {
      const refNumber = `CM-${today.getFullYear()}${(today.getMonth() + 1).toString().padStart(2, '0')}${today.getDate().toString().padStart(2, '0')}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
      setFormReference(refNumber);
      localStorage.setItem(STORAGE_KEYS.FORM_REFERENCE, refNumber);
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.DAILY_SALES, JSON.stringify(dailySales));
  }, [dailySales]);
  
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PROFIT_MARGIN, profitMargin.toString());
  }, [profitMargin]);
  
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.EXPENSES, JSON.stringify(expenses));
  }, [expenses]);
  
  const handleSaleChange = (date: string, amount: number) => {
    setDailySales(prevSales =>
      prevSales.map(sale =>
        sale.date === date ? { ...sale, amount } : sale
      )
    );
  };
  
const handleExpenseChange = (id: number, amount: number) => {
  setExpenses(prevExpenses => 
    prevExpenses.map(expense => 
      expense.id === id ? { ...expense, amount } : expense
    )
  );
};
  
  const totalSales = dailySales.reduce((sum, sale) => sum + sale.amount, 0);
  const grossProfit = (totalSales * profitMargin) / 100;
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const netProfit = grossProfit - totalExpenses;
  
  const resetForm = () => {
    setDailySales(prevSales =>
      prevSales.map(sale => ({ ...sale, amount: 0 }))
    );
    setProfitMargin(30);
    setExpenses(expenses.map(expense => ({ ...expense, amount: 0 })));
    
    localStorage.removeItem(STORAGE_KEYS.DAILY_SALES);
    localStorage.removeItem(STORAGE_KEYS.PROFIT_MARGIN);
    localStorage.removeItem(STORAGE_KEYS.EXPENSES);
    
    const today = new Date();
    const refNumber = `CM-${today.getFullYear()}${(today.getMonth() + 1).toString().padStart(2, '0')}${today.getDate().toString().padStart(2, '0')}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
    setFormReference(refNumber);
    localStorage.setItem(STORAGE_KEYS.FORM_REFERENCE, refNumber);
  };
  
  const printForm =() => {
    window.print();
  };
  
  return (
    <FinanceContext.Provider value={{
      currentDate,
      setCurrentDate,
      formReference,
      dailySales,
      setDailySales,
      handleSaleChange,
      profitMargin,
      setProfitMargin,
      expenses,
      setExpenses, 
      handleExpenseChange,
      totalSales,
      grossProfit,
      totalExpenses,
      netProfit,
      resetForm,
      printForm,
    }}>
      {children}
    </FinanceContext.Provider>
  );
}

export function useFinance() {
  const context = useContext(FinanceContext);
  if (context === undefined) {
    throw new Error('useFinance must be used within a FinanceProvider');
  }
  return context;
}