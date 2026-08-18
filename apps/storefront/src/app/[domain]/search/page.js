import ProductCard from '@/components/ProductCard';

export const dynamic = 'force-dynamic';

async function getProducts(searchQuery) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
    const url = new URL(`${apiUrl}/products`);
    if (searchQuery) {
      url.searchParams.append('search', searchQuery);
    }
    
    const res = await fetch(url.toString(), { cache: 'no-store' });
    if (!res.ok) return [];
    
    const json = await res.json();
    if (json.success && json.data) {
      return Array.isArray(json.data.products) ? json.data.products : (Array.isArray(json.data) ? json.data : []);
    }
    return Array.isArray(json) ? json : [];
  } catch (error) {
    console.error("Failed to fetch search results:", error);
    return [];
  }
}

export default async function SearchPage({ searchParams }) {
  const searchQuery = searchParams?.search || '';
  const products = await getProducts(searchQuery);

  return (
    <div className="container mx-auto px-6 py-12 min-h-[60vh]">
      <div className="mb-8 border-b border-gray-100 pb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          Search Results
        </h1>
        <p className="text-gray-500 mt-2 text-lg">
          {searchQuery 
            ? `Found ${products.length} product${products.length !== 1 ? 's' : ''} for "${searchQuery}"`
            : "All products"}
        </p>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
          <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
