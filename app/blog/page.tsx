import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';

export default function BlogPage() {
  const posts = getAllPosts();
  return (
    <main style={{ padding: '80px 0', minHeight: '80vh' }}>
      <div className="container">
        <div className="section-heading">
          <div className="section-label">Notes & Writing</div>
          <h2>Thoughts on data, statistics, and learning.</h2>
        </div>
        <div className="blog-grid">
          {posts.map(p => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="blog-card">
              <span className="blog-tag">{p.tag}</span>
              <h3>{p.title}</h3>
              <p>{p.summary}</p>
              <div className="blog-meta">
                <span>{p.read} min read</span>
                <span className="read-more">Read →</span>
              </div>
            </Link>
          ))}
        </div>
        <div style={{ marginTop: 40 }}><Link href="/" className="button button-outline">← Back to Home</Link></div>
      </div>
    </main>
  );
}
