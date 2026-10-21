import { getPostBySlug } from '@/lib/blog';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function BlogPost({ params }: { params: { slug: string } }) {
  let post;
  try { post = await getPostBySlug(params.slug); }
  catch { notFound(); }

  return (
    <main className="blog-reader active" style={{ position: 'relative', overflow: 'visible' }}>
      <div className="blog-reader-topbar">
        <Link className="blog-reader-back" href="/blog">← All posts</Link>
        <div className="blog-reader-meta">{post.meta.tag} · {post.meta.read} min</div>
      </div>
      <div className="blog-reader-container">
        <div className="blog-reader-hero">
          <span className="blog-reader-tag">{post.meta.tag}</span>
          <h1 className="blog-reader-title">{post.meta.title}</h1>
          <div className="blog-reader-info">
            <span>📅 {post.meta.date}</span>
            <span>⏱️ {post.meta.read} min</span>
            <span>✍️ Md. Nayim Howlader</span>
          </div>
        </div>
        <div className="blog-reader-content" style={{ whiteSpace: 'pre-wrap' }}>{post.content}</div>
      </div>
    </main>
  );
}
