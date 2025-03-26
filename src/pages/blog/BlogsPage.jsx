import { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import blogService from "../../services/BlogService";

export default function BlogsPage() {
    const [blogs, setBlogs] = useState([]); // ✅ Store blog data
    const [page, setPage] = useState(1); // ✅ Track current page
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true); // ✅ Track if there are more blogs to load
    const observer = useRef();
    const navigate = useNavigate(); // ✅ For navigation

    // ✅ Fetch blogs function
    const fetchBlogs = async (pageNumber) => {
        setLoading(true);
        try {
            const response = await blogService.getBlogs(pageNumber);
            setBlogs((prevBlogs) => [...prevBlogs, ...response.blogs]); // Append new blogs
            setHasMore(response.blogs.length > 0); // Stop if no more blogs
        } catch (error) {
            console.error("❌ Error fetching blogs:", error);
        }
        setLoading(false);
    };

    // ✅ Load more blogs when scrolling near bottom
    const lastBlogRef = useCallback((node) => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        
        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasMore) {
                setPage((prevPage) => prevPage + 1);
            }
        });
        
        if (node) observer.current.observe(node);
    }, [loading, hasMore]);

    // ✅ Fetch blogs when page number changes
    useEffect(() => {
        fetchBlogs(page);
    }, [page]);

    return (
        <div className="container mt-5">
            <h1 className="mb-4">All Blogs</h1>

            <div className="row">
                {blogs.map((blog, index) => (
                    <div key={blog.id} className="col-md-4 mb-4">
                        <div
                            className="card shadow-sm"
                            onClick={() => navigate(`/blog/${blog.id}`)}
                            style={{ cursor: "pointer" }}
                            ref={index === blogs.length - 1 ? lastBlogRef : null} // ✅ Infinite Scroll Trigger
                        >
                            <div className="card-body">
                                <h5 className="card-title">{blog.title}</h5>
                                <p className="card-text text-truncate">{blog.content}</p>
                                <small className="text-muted">{new Date(blog.timestamp).toLocaleString()}</small>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {loading && <p className="text-center">Loading more blogs...</p>}
            {!hasMore && <p className="text-center text-muted">No more blogs to show.</p>}
        </div>
    );
}
