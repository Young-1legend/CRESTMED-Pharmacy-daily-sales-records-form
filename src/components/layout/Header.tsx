import { useFinance } from '@/context/FinanceContext';
import { CalendarIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import logo from '../images/logo.png'
export default function Header() {
  const { formReference, currentDate, setCurrentDate } = useFinance();

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-blue-50 to-blue-100 py-8 sm:py-10">
      <div className="absolute top-0 right-0 w-1/2 h-full">
        <img
          src="https://images.pexels.com/photos/3683056/pexels-photo-3683056.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Pharmacy Background"
          className="object-cover object-center w-full h-full opacity-20 transition-opacity duration-700"
        />
      </div>
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col items-center mb-6">
          <div className="flex flex-col sm:flex-row items-center gap-3 mb-4">
            <div className="flex items-center gap-3">
              <div className=" shadow-md transform transition-transform hover:scale-105">
                <img src={logo} alt="CRESTMED Pharmacy Logo" className="h-12 w-12"/>
              </div>
              <h1 className="text-3xl font-bold text-blue-800 uppercase text-center sm:text-left">CRESTMED PHARMACY</h1>
            </div>
          </div>
          <h2 className="text-xl text-blue-600 font-semibold uppercase tracking-wide mb-2 text-center">DAILY SALES REPORT</h2>
          <div className="h-1 w-24 bg-blue-600 rounded mb-4 transform transition-all duration-500 hover:w-32"></div>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
          <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm">
            <Label htmlFor="form-reference" className="text-sm text-gray-500">Form Reference:</Label>
            <span id="form-reference" className="text-sm font-medium">{formReference}</span>
          </div>
          
          <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm">
            <Label htmlFor="date" className="text-sm font-medium flex items-center">
              <CalendarIcon className="h-4 w-4 mr-1 text-blue-600" />
              Date:
            </Label>
            <Input
              type="date"
              id="date"
              value={currentDate}
              onChange={(e) => setCurrentDate(e.target.value)}
              className="w-40 border-blue-200 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}