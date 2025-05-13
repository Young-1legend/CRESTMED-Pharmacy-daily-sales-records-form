import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { LineChart } from 'lucide-react';
import { useFinance } from '@/context/FinanceContext';
import { motion } from '@/lib/motion';

interface ProfitCalculationProps {
  totalSales: number;
  grossProfit: number;
}

export default function ProfitCalculation({ totalSales, grossProfit }: ProfitCalculationProps) {
  const { profitMargin, setProfitMargin } = useFinance();

  return (
    <Card className="border-blue-100 h-full">
      <CardHeader className="bg-blue-50">
        <CardTitle className="text-xl text-blue-700 flex items-center">
          <LineChart className="h-5 w-5 mr-2" />
          Profit Calculation
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <motion.div 
            className="grid grid-cols-2 gap-4 items-center"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Label htmlFor="total-sales" className="text-gray-600">Total Sales:</Label>
            <div className="font-medium text-right">₵{totalSales.toFixed(2)}</div>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-2 gap-4 items-center"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Label htmlFor="profit-margin" className="text-gray-600">Profit Margin (%):</Label>
            <div className="flex items-center">
              <Input
                id="profit-margin"
                type="number"
                value={profitMargin}
                onChange={(e) => setProfitMargin(parseFloat(e.target.value) || 0)}
                className="border-gray-200 rounded-md transition-all focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
              <div className="relative w-full h-2 bg-gray-200 rounded-full mt-2">
                <div 
                  className="absolute top-0 left-0 h-full bg-green-500 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, profitMargin)}%` }}
                ></div>
              </div>
            </div>
          </motion.div>
          
          <Separator />
          
          <motion.div 
            className="grid grid-cols-2 gap-4 items-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Label className="text-gray-600 font-semibold">Gross Profit:</Label>
            <div className="text-lg font-bold text-green-600 text-right">₵{grossProfit.toFixed(2)}</div>
          </motion.div>
          
          <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h4 className="text-sm font-medium text-gray-500 mb-2">Profit Margin Insight</h4>
            <p className="text-sm text-gray-600">
              Your current profit margin of {profitMargin}% yields a gross profit of ₵{grossProfit.toFixed(2)} from total sales of ₵{totalSales.toFixed(2)}.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}