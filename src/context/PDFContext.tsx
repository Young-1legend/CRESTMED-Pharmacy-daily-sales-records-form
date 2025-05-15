import React, { createContext, useContext, useState } from 'react';

// Define the context type
interface PDFContextType {
  documentName: string;
  setDocumentName: (name: string) => void;
  saveDocument: () => void;
}

// Create the context with default values
const PDFContext = createContext<PDFContextType>({
  documentName: 'Untitled Document',
  setDocumentName: () => {},
  saveDocument: () => {},
});

// Provider component
export function PDFProvider({ children }: { children: React.ReactNode }) {
  const [documentName, setDocumentName] = useState<string>('Untitled Document');

  const saveDocument = () => {
    // Implement your save functionality here
    console.log('Saving document:', documentName);
    // You could add actual saving logic here
  };

  return (
    <PDFContext.Provider value={{
      documentName,
      setDocumentName,
      saveDocument,
    }}>
      {children}
    </PDFContext.Provider>
  );
}

// Custom hook to use the PDF context
export function usePDF() {
  const context = useContext(PDFContext);
  if (context === undefined) {
    throw new Error('usePDF must be used within a PDFProvider');
  }
  return context;
}