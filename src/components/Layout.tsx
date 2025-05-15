import { useEffect, useState } from 'react';
import  Sidebar  from './layout/Sidebar';
import Toolbar  from './layout/Layout';
import Header from '../components/Header';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      }
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={isSidebarOpen}onClose={() => isMobile && setIsSidebarOpen(false)} />
        <main className={cn(
          "flex-1 transition-all duration-300 ease-in-out flex flex-col overflow-hidden",
          isSidebarOpen && !isMobile ? "ml-64" : "ml-0"
        )}>
          <Toolbar children={undefined} />
          <div className="flex-1 overflow-auto p-4">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}