import BlogCard from "@/components/card/BlogCard";
import { blogData } from "@/lib/blog-database";
import Head from "@/layout/Head";
import MaxContainer from "@/layout/MaxContainer";

export default function Blog() {
  return (
    <>
      <Head title="Blog | Naughty Jars - Desserts Stories & Tips" />
      
      <div className="bg-[#f1dab0] py-12">
        <MaxContainer className="px-5">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Naughty Jars Blog
          </h1>
          <p className="text-lg text-gray-700 max-w-3xl">
            Discover stories behind our flavors, dessert-making tips, and insights into Dubai's dessert scene.
          </p>
        </MaxContainer>
      </div>
      
      <MaxContainer className="px-5 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogData.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </MaxContainer>
    </>
  );
}