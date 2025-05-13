import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calculator } from 'lucide-react';
import { motion } from '@/lib/motion';

interface FinalCalculationProps {
  grossProfit: number;
  totalExpenses: number;
  netProfit: number;
}

export default function FinalCalculation({ grossProfit, totalExpenses, netProfit }: FinalCalculationProps) {
  const isProfit = netProfit >= 0;

  return (
    <Card className="mb-8 border-blue-100">
      <CardHeader className="bg-blue-50">
        <CardTitle className="text-xl text-blue-700 flex items-center">
          <Calculator className="h-5 w-5 mr-2" />
          Final Calculation
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="space-y-4 mb-6 md:mb-0">
            <motion.div 
              className="flex gap-4 items-center"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-gray-600 w-32">Gross Profit:</span>
              <span className="font-medium text-green-600">₵{grossProfit.toFixed(2)}</span>
            </motion.div>
            
            <motion.div 
              className="flex gap-4 items-center"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <span className="text-gray-600 w-32">Total Expenditures:</span>
              <span className="font-medium text-red-600">₵{totalExpenses.toFixed(2)}</span>
            </motion.div>
          </div>
          
          <motion.div 
            className="flex flex-col items-center p-6 md:p-8 bg-gray-50 rounded-lg border border-gray-200 min-w-48"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
          >
            <span className="text-sm text-gray-500 mb-1">Net Profit/Loss</span>
            <span className={`text-2xl md:text-3xl font-bold ${isProfit ? 'text-green-600' : 'text-red-600'}`}>
              ₵{Math.abs(netProfit).toFixed(2)}
            </span>
            <Badge className={`mt-2 ${isProfit ? 'bg-green-100 text-green-800 hover:bg-green-200' : 'bg-red-100 text-red-800 hover:bg-red-200'}`}>
              {isProfit ? 'PROFIT' : 'LOSS'}
            </Badge>
            
            <div className="mt-4 w-full h-1 bg-gray-200 rounded-full overflow-hidden">
              <motion.div 
                className={`h-full ${isProfit ? 'bg-green-500' : 'bg-red-500'}`}
                initial={{ width: "0%" }}
                animate={{ width: `${Math.min(Math.abs(netProfit) / (grossProfit * 1.5) * 100, 100)}%` }}
                transition={{ duration: 1, delay: 0.3 }}
              ></motion.div>
            </div>
            
            <p className="mt-3 text-xs text-gray-500 text-center">
              {isProfit 
                ? `${((netProfit / grossProfit) * 100).toFixed(1)}% of gross profit retained` 
                : `${((Math.abs(netProfit) / grossProfit) * 100).toFixed(1)}% loss on gross profit`}
            </p>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  );
}