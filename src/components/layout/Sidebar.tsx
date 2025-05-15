import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <aside
      className={cn(
        'fixed top-0 left-0 h-full w-64 bg-white shadow-md z-50 transition-transform duration-300',
        isOpen ? 'translate-x-0' : '-translate-x-full'
      )}
    >
      <div className="p-4 flex justify-between items-center border-b">
        <h2 className="text-lg font-semibold">Sidebar</h2>
        <button onClick={onClose} className="text-sm text-red-500">
          Close
        </button>
      </div>
    </aside>
  );
}
