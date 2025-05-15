import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { CalendarDays } from 'lucide-react';
import { useFinance } from '@/context/FinanceContext';
import { motion } from '@/lib/motion';

export default function SalesRecord() {
  const { dailySales, handleSaleChange, totalSales } = useFinance();
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const [dailyExpenditures, setDailyExpenditures] = useState<{date: string, amount: number}[]>(() => {
    const savedExpenditures = localStorage.getItem('daily_expenditures');
    if (savedExpenditures) {
      return JSON.parse(savedExpenditures);
    }
    
    return dailySales.map(sale => ({
      date: sale.date,
      amount: 0
    }));
  });
  
  const handleExpenditureChange = (date: string, amount: number) => {
    const updatedExpenditures = dailyExpenditures.map(exp => 
      exp.date === date ? { ...exp, amount } : exp
    );
    setDailyExpenditures(updatedExpenditures);
    localStorage.setItem('daily_expenditures', JSON.stringify(updatedExpenditures));
  };
  
  const totalDailyExpenditure = dailyExpenditures.reduce((sum, item) => sum + item.amount, 0);
  
  return (
    <Card className="mb-8 border-blue-100 overflow-hidden">
      <CardHeader className="bg-blue-50">
        <CardTitle className="text-xl text-blue-700 flex items-center">
          <CalendarDays className="h-5 w-5 mr-2" />
          Monthly Sales Record
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-blue-50">
              <TableHead className="font-semibold">Date</TableHead>
              <TableHead className="font-semibold">Daily Sales</TableHead>
              <TableHead className="font-semibold">Expenditure</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dailySales.map((sale) => {
              const expenditure = dailyExpenditures.find(exp => exp.date === sale.date) || { date: sale.date, amount: 0 };
              
              return (
                <TableRow 
                  key={sale.date}
                  onMouseEnter={() => setHoveredRow(sale.date)}
                  onMouseLeave={() => setHoveredRow(null)}
                  className={`transition-colors duration-200 ${hoveredRow === sale.date ? 'bg-blue-50/50' : ''}`}
                >
                  <TableCell className="font-medium">
                    {String(new Date(sale.date).getDate()).padStart(2, '0')}
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={sale.amount || ''}
                      onChange={(e) => handleSaleChange(sale.date, parseFloat(e.target.value) || 0)}
                      placeholder="0.00"
                      className="border-gray-200 rounded-md w-full transition-all focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={expenditure.amount || ''}
                      onChange={(e) => handleExpenditureChange(sale.date, parseFloat(e.target.value) || 0)}
                      placeholder="0.00"
                      className="border-gray-200 rounded-md w-full transition-all focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        
        <Separator className="my-6" />
        
        <div className="flex flex-col space-y-4">
          <motion.div 
            className="flex justify-between items-center p-4 bg-blue-50 rounded-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <span className="font-medium text-gray-700">Total Monthly Sales:</span>
            <span className="text-lg font-bold text-blue-700">₵{totalSales.toFixed(2)}</span>
          </motion.div>
          
          <motion.div 
            className="flex justify-between items-center p-4 bg-red-50 rounded-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <span className="font-medium text-gray-700">Total Daily Expenditures:</span>
            <span className="text-lg font-bold text-red-700">₵{totalDailyExpenditure.toFixed(2)}</span>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  );
}