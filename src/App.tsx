import { ThemeProvider } from '@/components/theme-provider';
import { FinanceProvider } from '@/context/FinanceContext';
import Layout from '@/components/layout/Layout';
import FinanceDashboard from '@/components/finance/FinanceDashboard';
import { Toaster } from '@/components/ui/toaster';

function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <FinanceProvider>
        <Layout>
          <FinanceDashboard />
        </Layout>
        <Toaster />
      </FinanceProvider>
    </ThemeProvider>
  );
}

export default App;