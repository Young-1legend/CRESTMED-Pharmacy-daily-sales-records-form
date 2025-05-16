import React, { createContext, useContext, useState } from 'react';

interface PDFContextType {
  documentName: string;
  setDocumentName: (name: string) => void;

}

const PDFContext = createContext<PDFContextType>({
  documentName: 'Untitled Document',
  setDocumentName: () => {},
});

export function PDFProvider({ children }: { children: React.ReactNode }) {
  const [documentName, setDocumentName] = useState<string>('Untitled Document');

 
  return (
    <PDFContext.Provider value={{
      documentName,
      setDocumentName,
    }}>
      {children}
    </PDFContext.Provider>
  );
}

export function usePDF() {
  const context = useContext(PDFContext);
  if (context === undefined) {
    throw new Error('usePDF must be used within a PDFProvider');
  }
  return context;
}