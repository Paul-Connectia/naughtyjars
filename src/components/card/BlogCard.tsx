import { Link } from "react-router";
import { Calendar, User } from "lucide-react";

interface BlogCardProps {
  blog: {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    author: string;
    date: string;
    image: string;
    tags: string[];
  };
}

export default function BlogCard({ blog }: BlogCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <Link 
      to={`/blog/${blog.slug}`} 
      className="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      {/* Blog Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <span className="px-2 py-1 bg-white/90 backdrop-blur-sm rounded text-xs font-medium">
            Blog
          </span>
        </div>
      </div>
      
      {/* Blog Content */}
      <div className="p-5">
        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {blog.tags.slice(0, 3).map((tag, index) => (
            <span 
              key={index} 
              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
            >
              {tag}
            </span>
          ))}
        </div>
        
        {/* Title */}
        <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-[var(--color-purple)] transition-colors">
          {blog.title}
        </h3>
        
        {/* Excerpt */}
        <p className="text-gray-600 mb-4 line-clamp-2">
          {blog.excerpt}
        </p>
        
        {/* Meta Info */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <User size={14} />
              <span>{blog.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar size={14} />
              <span>{formatDate(blog.date)}</span>
            </div>
          </div>
          <span className="text-[var(--color-purple)] font-medium group-hover:underline">
            Read more →
          </span>
        </div>
      </div>
    </Link>
  );
}