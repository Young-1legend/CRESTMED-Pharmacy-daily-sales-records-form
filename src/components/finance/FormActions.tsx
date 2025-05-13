import { Button } from "@/components/ui/button";
import { Redo, Printer } from "lucide-react";
import { useFinance } from "@/context/FinanceContext";
import { motion } from "@/lib/motion";

export default function FormActions() {
  const { resetForm, printForm } = useFinance();

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 print:hidden">
      <div className="flex gap-3 w-full sm:w-auto">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="outline"
            onClick={resetForm}
            className="border-gray-200 text-gray-600 hover:bg-gray-50 rounded-md whitespace-nowrap cursor-pointer w-full sm:w-auto"
          >
            <Redo className="h-4 w-4 mr-2" /> Reset Form
          </Button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="outline"
            onClick={printForm}
            className="border-blue-200 text-blue-600 hover:bg-blue-50 rounded-md whitespace-nowrap cursor-pointer w-full sm:w-auto"
          >
            <Printer className="h-4 w-4 mr-2" /> Print
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
