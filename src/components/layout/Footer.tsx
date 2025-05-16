

export default function Footer() {
  
  return (
    <footer className="bg-gray-50 py-6 px-6 border-t border-gray-200 print:hidden">
      <div className="container mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center">
         
          
          <div className="text-center">
            <p className="text-sm text-gray-500">© 2025 CRESTMED Pharmacy. All rights reserved.</p>
          </div>
          
          <div className="hidden sm:block">
            <p className="text-xs text-gray-400">Version 1.0.1</p>
          </div>
        </div>
      </div>
    </footer>
  );
}