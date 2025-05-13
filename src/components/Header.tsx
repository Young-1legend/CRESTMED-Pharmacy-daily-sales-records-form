import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Menu, 
  Sun, 
  Moon, 
  Save, 
  Download, 
  Share2, 
  Settings 
} from 'lucide-react';
import { useTheme } from '@/components/theme-provider';
import { usePDF } from '@/context/PDFContext';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

interface HeaderProps {
  toggleSidebar: () => void;
}

export default function Header({ toggleSidebar }: HeaderProps) {
  const { theme, setTheme } = useTheme();
  const { documentName, setDocumentName, saveDocument } = usePDF();
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
      
      <div className="flex items-center space-x-2">
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-muted-foreground" 
          onClick={saveDocument}
        >
          <Save className="h-4 w-4 mr-1" />
          <span className="hidden sm:inline">Save</span>
        </Button>
        
        <Button variant="ghost" size="sm" className="text-muted-foreground">
          <Download className="h-4 w-4 mr-1" />
          <span className="hidden sm:inline">Export</span>
        </Button>
        
        <Button variant="ghost" size="sm" className="text-muted-foreground">
          <Share2 className="h-4 w-4 mr-1" />
          <span className="hidden sm:inline">Share</span>
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              <Sun className="h-4 w-4 mr-2" />
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              <Moon className="h-4 w-4 mr-2" />
              Dark
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}