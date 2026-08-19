import Link from 'next/link';

// Dummy data for MVP. Later replace with real fetch from backend based on domain.
async function getBlogPosts(domain) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
    // We would pass domain to backend to filter by creator, e.g., ?domain=domain
    const res = await fetch(`${apiUrl}/posts`, { cache: 'no-store' });
    if (!res.ok) return [];
    
    const json = await res.json();
    if (json.success && json.data) {
      return Array.isArray(json.data.posts) ? json.data.posts : (Array.isArray(json.data) ? json.data : []);
    }
    return Array.isArray(json) ? json : [];
  } catch (error) {
    console.error("Failed to fetch blog posts:", error);
    return [];
  }
}

export default async function BlogPage({ params }) {
  const { domain } = params;
  const posts = await getBlogPosts(domain);

  return (
    <div className="bg-white min-h-screen py-16">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="mb-16 border-b border-gray-200 pb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">Blog</h1>
          <p className="text-xl text-gray-500">Read the latest thoughts, tutorials, and updates.</p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
            <p className="text-gray-500 text-lg">No posts published yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map(post => (
              <Link key={post.id} href={`/blog/${post.slug || post.id}`} className="group block h-full">
                <article className="border border-gray-200 rounded-xl overflow-hidden hover:border-black transition-colors h-full flex flex-col">
                  {/* Cover Image Placeholder */}
                  <div className="aspect-video bg-gray-100 flex items-center justify-center relative overflow-hidden">
                    {post.coverImage ? (
                      <img src={post.coverImage} alt={post.title} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" />
                    ) : (
                      <div className="w-full h-full bg-gray-100 group-hover:bg-gray-200 transition-colors flex items-center justify-center">
                        <span className="text-gray-400 font-medium">No Image</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-3 text-sm text-gray-500">
                      <span>{new Date(post.createdAt || Date.now()).toLocaleDateString()}</span>
                      {post.category?.name && (
                        <>
                          <span>•</span>
                          <span className="font-medium text-gray-900">{post.category.name}</span>
                        </>
                      )}
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 line-clamp-3 mb-6 flex-1">
                      {post.excerpt || post.content?.substring(0, 150)?.replace(/<[^>]+>/g, '') + '...'}
                    </p>
                    <div className="text-sm font-semibold text-black flex items-center mt-auto">
                      Read article
                      <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
