export function Footer() {
    return (
      <footer className="bg-gray-950 py-12 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} DATA.AUC. All rights reserved.
            </p>
            <div className="flex gap-6 mt-4">
              <a href="#" className="text-gray-400 hover:text-cyan-500 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-500 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-500 transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    )
  }
  
  