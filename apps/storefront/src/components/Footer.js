import Link from 'next/link';

export default function Footer({ isMainPlatform = false, creatorName = "Kernel" }) {
  return (
    <footer className="bg-white text-gray-600 py-12 border-t border-gray-200">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {isMainPlatform ? "Kernel" : creatorName}
            </h3>
            <p className="text-gray-500 max-w-sm mb-6 leading-relaxed">
              {isMainPlatform 
                ? "The all-in-one platform to launch your digital empire. Monetize your expertise and keep the profit."
                : "Your one-stop destination for premium digital products, courses, ebooks, and software assets. High quality guaranteed."}
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {isMainPlatform ? (
                <>
                  <li><Link href="/" className="hover:text-black transition-colors">Home</Link></li>
                  <li><Link href="/register" className="hover:text-black transition-colors">Start selling</Link></li>
                  <li><a href="http://localhost:3001/login" className="hover:text-black transition-colors">Creator Login</a></li>
                </>
              ) : (
                <>
                  <li><Link href="/" className="hover:text-black transition-colors">Home</Link></li>
                  <li><Link href="/products" className="hover:text-black transition-colors">All Products</Link></li>
                  <li><Link href="/cart" className="hover:text-black transition-colors">Shopping Cart</Link></li>
                  <li><Link href="/profile" className="hover:text-black transition-colors">My Profile</Link></li>
                </>
              )}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Support</h4>
            <ul className="space-y-3">
              <li><Link href="/faq" className="hover:text-black transition-colors">FAQ</Link></li>
              <li><Link href="/contact" className="hover:text-black transition-colors">Contact Us</Link></li>
              <li><Link href="/terms" className="hover:text-black transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-black transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-100 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} {isMainPlatform ? "Kernel Platform" : creatorName}. All rights reserved.</p>
          {!isMainPlatform && (
            <p className="mt-4 md:mt-0">
              Powered by <Link href="http://localhost:3000" className="text-gray-500 hover:text-black font-medium">Kernel</Link>
            </p>
          )}
        </div>
      </div>
    </footer>
  );
}
