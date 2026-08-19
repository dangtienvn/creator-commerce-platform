import Link from "next/link";
import { ChevronLeft, Calendar, Clock } from "lucide-react";
import { notFound } from "next/navigation";

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

function calcReadTime(content = "") {
  const words = content.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

async function getPost(id) {
  try {
    const res = await fetch(`${API}/posts/${id}`, { cache: "no-store" });
    if (!res.ok) return null;
    const data = await res.json();
    return data.data || null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const post = await getPost(id);
  if (!post) return { title: "Post Not Found" };
  return {
    title: `${post.title} – Blog`,
    description: post.content?.substring(0, 150),
  };
}

export default async function PostDetailPage({ params }) {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) notFound();

  const readTime = calcReadTime(post.content);
  const date = new Date(post.createdAt || Date.now()).toLocaleDateString("en-US", {
    day: "numeric", month: "long", year: "numeric",
  });

  return (
    <div className="bg-white min-h-screen">
      {/* Minimalist Top Bar */}
      <div className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-6 h-14 flex items-center">
          <Link href="/blog" className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-black transition-colors">
            <ChevronLeft size={16} strokeWidth={2.5} />
            Back to Blog
          </Link>
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        {/* Header */}
        <header className="mb-12 text-center md:text-left">
          {post.category && (
            <div className="mb-6">
              <span className="inline-block border border-black px-3 py-1 text-xs font-bold uppercase tracking-widest text-black rounded-full">
                {post.category.name}
              </span>
            </div>
          )}
          
          <h1 className="text-4xl md:text-6xl font-extrabold text-black leading-[1.1] tracking-tight mb-8">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm font-medium text-gray-500">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {readTime} min read
            </span>
          </div>
        </header>

        {/* Cover Image */}
        {post.coverImage && (
          <div className="mb-16 border-2 border-black rounded-xl overflow-hidden bg-gray-100 aspect-video">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Content */}
        <div className="prose prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-blue-600 prose-img:border prose-img:border-gray-200 prose-img:rounded-xl">
          {post.content?.split("\n").map((para, i) =>
            para.trim() ? <p key={i}>{para}</p> : <br key={i} />
          )}
        </div>
      </article>
    </div>
  );
}
