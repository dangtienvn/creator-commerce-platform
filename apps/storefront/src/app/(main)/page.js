import Link from 'next/link';

export default function PlatformLandingPage() {
  return (
    <div className="bg-white text-gray-900 selection:bg-black selection:text-white pb-24">
      {/* Hero Section */}
      <div className="relative border-b border-gray-200">
        <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
        <div className="relative z-10 container mx-auto px-6 py-24 md:py-40 flex flex-col items-center text-center">
          <h1 className="text-6xl md:text-8xl lg:text-[7.5rem] font-medium tracking-tight leading-[0.9] mb-8">
            Turn your passion <br className="hidden md:block"/> 
            into an empire
          </h1>
          <p className="text-xl md:text-3xl text-gray-600 max-w-3xl leading-relaxed mb-12 font-medium">
            The easiest way for creators to monetize their expertise. Launch your custom storefront instantly and keep the profit.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link href="/register" className="w-full sm:w-auto bg-black text-white px-12 py-5 text-xl font-bold rounded-none border-2 border-black hover:bg-white hover:text-black transition-colors shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px]">
              Start selling
            </Link>
          </div>
        </div>
      </div>

      {/* Features Grid (Gumroad Style Use Cases) */}
      <div className="container mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="border-2 border-black p-10 md:p-16 relative bg-white h-full flex flex-col justify-between group">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Sell anything</h2>
              <p className="text-xl text-gray-600 leading-relaxed max-w-md">
                E-books, templates, video lessons, software. We are built to help you experiment with all kinds of digital formats.
              </p>
            </div>
            <div className="mt-12 text-right">
              <span className="inline-block p-4 bg-gray-100 rounded-full border border-gray-200 group-hover:scale-110 transition-transform">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
              </span>
            </div>
          </div>
          
          <div className="border-2 border-black p-10 md:p-16 relative bg-gray-50 h-full flex flex-col justify-between group">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Make your own road</h2>
              <p className="text-xl text-gray-600 leading-relaxed max-w-md">
                No complex storefront setups. Get a beautiful page on a custom subdomain instantly. Zero coding required.
              </p>
            </div>
            <div className="mt-12 text-right">
              <span className="inline-block p-4 bg-white rounded-full border border-gray-200 group-hover:scale-110 transition-transform">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M16.2 7.8l-2 6.3-6.4 2.1 2-6.3z"></path></svg>
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="border-2 border-black p-10 relative bg-white h-full col-span-1 md:col-span-2">
            <h2 className="text-4xl font-bold mb-6 tracking-tight">Sell anywhere</h2>
            <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
              Create your storefront with our all-in-one platform or embed our checkout on your personal site. Manage everything from a professional CRM dashboard included for free.
            </p>
          </div>
          <div className="border-2 border-black p-10 relative bg-black text-white h-full flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Included CRM</h2>
              <p className="text-gray-400">Track sales, manage products, understand customers.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Social Proof CTA */}
      <div className="container mx-auto px-6 py-20 text-center">
        <h2 className="text-5xl md:text-7xl font-bold mb-10 tracking-tight">
          Ready to share your work with the world?
        </h2>
        <p className="text-2xl text-gray-600 max-w-3xl mx-auto mb-12">
          Stop worrying about complex tech stacks and storefront designs. Focus on what you do best—creating amazing content—and let Kernel handle the rest.
        </p>
        <Link href="/register" className="inline-block bg-white text-black px-12 py-5 text-xl font-bold rounded-none border-2 border-black hover:bg-black hover:text-white transition-colors shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px]">
          Start selling
        </Link>
      </div>

    </div>
  );
}
