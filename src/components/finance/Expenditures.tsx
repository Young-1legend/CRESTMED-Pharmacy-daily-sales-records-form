import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Receipt } from 'lucide-react';
import { useFinance } from '@/context/FinanceContext';
import { motion } from '@/lib/motion';
import { useEffect, useState } from 'react';

interface ExpendituresProps {
  totalExpenses: number;
}

export default function Expenditures({ totalExpenses }: ExpendituresProps) {
  const { expenses, handleExpenseChange, setExpenses } = useFinance();
  const [isInitialized, setIsInitialized] = useState(false);
  
  useEffect(() => {
    if (isInitialized) return;
    
    const savedExpenses = localStorage.getItem('finance_expenses');
    if (savedExpenses) {
      try {
        const parsedExpenses = JSON.parse(savedExpenses);
        if (setExpenses && Array.isArray(parsedExpenses)) {
          setExpenses(parsedExpenses);
        }
      } catch (error) {
        console.error("Error parsing saved expenses:", error);
      }
    }
    setIsInitialized(true);
  }, [isInitialized, setExpenses]);

  useEffect(() => {
    if (!isInitialized) return;
    localStorage.setItem('finance_expenses', JSON.stringify(expenses));
  }, [expenses, isInitialized]);

  return (
    <Card className="border-blue-100 h-full">
      <CardHeader className="bg-blue-50">
        <CardTitle className="text-xl text-blue-700 flex items-center">
          <Receipt className="h-5 w-5 mr-2" />
          Expenditures
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          {expenses.map((expense, index) => (
            <motion.div
              key={expense.id}
              className="grid grid-cols-2 gap-4 items-center"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Label htmlFor={`expense-${expense.id}`} className="text-gray-600">{expense.category}:</Label>
              <Input
                id={`expense-${expense.id}`}
                type="number"
                value={expense.amount || ''}
                onChange={(e) => {
                  const newAmount = parseFloat(e.target.value) || 0;
                  handleExpenseChange(expense.id, newAmount);
                }}
                placeholder="0.00"
                className="border-gray-200 rounded-md transition-all focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </motion.div>
          ))}
          
          <Separator />
          
          <motion.div
            className="grid grid-cols-2 gap-4 items-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <Label className="text-gray-600 font-semibold">Total Expenditures:</Label>
            <div className="text-lg font-bold text-red-600 text-right">₵{totalExpenses.toFixed(2)}</div>
          </motion.div>
          
          <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h4 className="text-sm font-medium text-gray-500 mb-2">Expense Breakdown</h4>
            <div className="space-y-2">
              {expenses.map((expense) => {
                const percentage = totalExpenses ? (expense.amount / totalExpenses) * 100 : 0;
                return (
                  <div key={expense.id} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>{expense.category}</span>
                      <span>{percentage.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className="bg-blue-600 h-1.5 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}