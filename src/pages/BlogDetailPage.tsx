import { useParams } from "react-router";
import { blogData } from "@/lib/blog-database";
import { Calendar, User, ArrowLeft } from "lucide-react";
import { Link } from "react-router";
import Head from "@/layout/Head";

export default function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const blog = blogData.find(b => b.slug === slug);

  if (!blog) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Blog post not found</h1>
        <Link to="/blogs" className="text-[var(--color-purple)] hover:underline">
          ← Back to all blogs
        </Link>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <>
      <Head title={`${blog.title} | Naughty Jars Blog`} />
      
      <article className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Back button */}
        <Link 
          to="/blogs" 
          className="inline-flex items-center text-[var(--color-purple)] hover:underline mb-8"
        >
          <ArrowLeft size={18} className="mr-2" />
          Back to all blogs
        </Link>

        {/* Hero Image */}
        <div className="mb-8">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-[400px] object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Blog Header */}
        <header className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {blog.tags.map((tag, index) => (
              <span 
                key={index} 
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {blog.title}
          </h1>
          
          <div className="flex items-center gap-6 text-gray-600 border-b pb-6">
            <div className="flex items-center gap-2">
              <User size={18} />
              <span className="font-medium">{blog.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={18} />
              <span>{formatDate(blog.date)}</span>
            </div>
          </div>
        </header>

        {/* Blog Content */}
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-700 mb-8 font-medium">
            {blog.excerpt}
          </p>
          
          <div className="text-gray-700 leading-relaxed space-y-6">
            <p>
              {blog.content}
            </p>
            
            <p>
              At Naughty Jars, we believe that great desserts tell a story. Each of our tiramisu creations 
              is carefully crafted with attention to detail, from selecting the finest ingredients to perfecting 
              the balance of flavors.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              Why This Matters
            </h2>
            
            <p>
              Our commitment to quality extends beyond just taste. We're passionate about creating 
              memorable experiences through our desserts, whether it's through innovative flavor 
              combinations or sharing the stories behind our creations.
            </p>
            
            <blockquote className="border-l-4 border-[var(--color-purple)] pl-4 italic text-gray-700 my-8">
              "Every jar of Naughty Jars tiramisu is made with the same passion and precision that 
              goes into a work of art. We don't just make desserts; we create moments of joy."
            </blockquote>
          </div>
        </div>

        {/* Related Blogs Section */}
        <section className="mt-16 pt-8 border-t">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            You might also like
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogData
              .filter(b => b.id !== blog.id)
              .slice(0, 3)
              .map(relatedBlog => (
                <Link 
                  key={relatedBlog.id} 
                  to={`/blog/${relatedBlog.slug}`}
                  className="block p-4 border rounded-lg hover:shadow-md transition-shadow"
                >
                  <h4 className="font-semibold text-gray-900 mb-2 hover:text-[var(--color-purple)]">
                    {relatedBlog.title}
                  </h4>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {relatedBlog.excerpt}
                  </p>
                </Link>
              ))}
          </div>
        </section>
      </article>
    </>
  );
}