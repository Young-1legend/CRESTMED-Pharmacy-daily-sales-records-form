import { useTheme } from '@/components/theme-provider';
import { Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Footer() {
  const { theme, setTheme } = useTheme();
  
  return (
    <footer className="bg-gray-50 py-6 px-6 border-t border-gray-200 print:hidden">
      <div className="container mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center mb-4 sm:mb-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="text-gray-500 hover:text-gray-700"
            >
              {theme === 'light' ? (
                <Moon className="h-4 w-4 mr-2" />
              ) : (
                <Sun className="h-4 w-4 mr-2" />
              )}
              {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
            </Button>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-gray-500">© 2025 CRESTMED Pharmacy. All rights reserved.</p>
          </div>
          
          <div className="hidden sm:block">
            <p className="text-xs text-gray-400">Version 1.0.0</p>
          </div>
        </div>
      </div>
    </footer>
  );
}