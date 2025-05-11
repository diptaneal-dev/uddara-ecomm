import React from "react";
import { useParams } from "react-router-dom";
import { staticBlogs } from "../data/staticBlogs";
import blogComponentsMap from "../components/blogComponents";

const StaticBlogDetails = () => {
  const { id } = useParams();
  const blog = staticBlogs.find((b) => b.id === id);

  if (!blog) return <p>Blog not found</p>;

  const BlogComponent = blogComponentsMap[id];

  return (
    <div>
      {BlogComponent ? (
        <BlogComponent />
      ) : (
        <div className="container my-5">
          <h1 className="mb-4">{blog.title}</h1>
          <img
            src={blog.coverImageUrl}
            alt={blog.title}
            className="img-fluid mb-4"
          />
          <p>{blog.content}</p>
        </div>
      )}
    </div>
  );
};

export default StaticBlogDetails;
