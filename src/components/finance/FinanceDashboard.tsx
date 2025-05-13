import { Separator } from '@/components/ui/separator';
import SalesRecord from './SalesRecord';
import ProfitCalculation from './ProfitCalculation';
import Expenditures from './Expenditures';
import FinalCalculation from './FinalCalculation';
import FormActions from './FormActions';
import { useFinance } from '@/context/FinanceContext';

export default function FinanceDashboard() {
  const { totalSales, grossProfit, totalExpenses, netProfit } = useFinance();
  
  return (
    <div className="py-8 px-4">
      <div className="max-w-[1440px] mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 pb-10">
          <SalesRecord />
          
          <Separator className="my-8" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <ProfitCalculation 
              totalSales={totalSales} 
              grossProfit={grossProfit} 
            />
            
            <Expenditures 
              totalExpenses={totalExpenses} 
            />
          </div>
          
          <FinalCalculation 
            grossProfit={grossProfit} 
            totalExpenses={totalExpenses} 
            netProfit={netProfit} 
          />
          
          <FormActions />
        </div>
      </div>
    </div>
  );
}