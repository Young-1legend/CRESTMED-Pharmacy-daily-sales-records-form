import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Menu, 
} from 'lucide-react';
import { usePDF } from '../context/PDFContext';


interface HeaderProps {
  toggleSidebar: () => void;
}

export default function Header({ toggleSidebar }: HeaderProps) {
  const { documentName, setDocumentName } = usePDF();
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameValue, setNameValue] = useState(documentName);

  const handleNameEdit = () => {
    setIsEditingName(true);
  };

  const handleNameSave = () => {
    setDocumentName(nameValue);
    setIsEditingName(false);
  };

  const handleNameKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleNameSave();
    }
  };

  return (
    <header className="h-16 border-b bg-background/95 backdrop-blur-sm flex items-center px-4 justify-between sticky top-0 z-10">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" onClick={toggleSidebar} aria-label="Toggle sidebar">
          <Menu className="h-5 w-5" />
        </Button>
        
        <div className="ml-4">
          {isEditingName ? (
            <Input
              value={nameValue}
              onChange={(e) => setNameValue(e.target.value)}
              onBlur={handleNameSave}
              onKeyDown={handleNameKeyDown}
              className="w-48 h-8 px-2 text-lg font-medium"
              autoFocus
            />
          ) : (
            <button
              onClick={handleNameEdit}
              className="text-lg font-medium hover:text-primary/90 transition-colors"
            >
              {documentName || "Untitled Document"}
            </button>
          )}
        </div>
      </div>
      
     
    </header>
  );
}