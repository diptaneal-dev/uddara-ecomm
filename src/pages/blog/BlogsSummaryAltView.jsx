import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import blogService from "../../services/BlogService";

const BlogsSummaryAltView = () => {
    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await blogService.getAllBlogs(1);
                if (response?.content?.length) {
                    setBlogs(response.content);
                }
            } catch (error) {
                console.error("Error fetching blogs:", error);
            }
        };
        fetchBlogs();
    }, []);

    if (!blogs.length) return <p>Loading blogs...</p>;

    const latestBlog = blogs[0];

    return (
        <div className="container-fluid d-flex" style={{ margin: 0, padding: 0, height: "600px" }}>
            {/* Left Side - Large Blog Image */}
            <div
                className="blog-highlight position-relative"
                style={{ width: "75%", height: "600px", overflow: "hidden", cursor: "pointer" }}
                onClick={() => navigate(`/blog/${latestBlog.id}`)}
            >
                <img
                    src={latestBlog.coverImageUrl}
                    alt={latestBlog.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div className="overlay position-absolute bottom-0 start-0 text-white p-3 bg-dark bg-opacity-75 w-100">
                    <h2>{latestBlog.title}</h2>
                    <p className="m-0">{new DOMParser().parseFromString(latestBlog.content, "text/html").body.textContent.substring(0, 150)}...</p>
                </div>
            </div>

            {/* Right Side - Blog List */}
            <div className="blog-list" style={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: "5px", margin: 0, padding: 0, backgroundColor: "#EADDC8" }}>
                {blogs.slice(1, 6).map((blog) => (
                    <div
                        key={blog.id}
                        className="blog-card d-flex align-items-center p-2"
                        style={{ position: "relative", backgroundColor: "#EADDC8", color: "#2E4F35", height: "119px", cursor: "pointer" }}
                        onClick={() => navigate(`/blog/${blog.id}`)}
                    >
                        <img
                            src={blog.coverImageUrl}
                            alt={blog.title}
                            style={{ width: "100px", height: "100px", objectFit: "cover", marginRight: "10px" }}
                        />

                        <div>
                            <h6 className="mb-1">{blog.title}</h6>
                            <p className="text-truncate mb-0" style={{ maxWidth: "320px" }}>
                                {new DOMParser().parseFromString(blog.content, "text/html").body.textContent.substring(0, 100)}...
                            </p>
                        </div>

                        <div
                            style={{
                                position: "absolute",
                                bottom: 0,
                                left: "25%",
                                width: "50%",
                                borderBottom: "1px solid #2E4F35",
                            }}
                        ></div>
                    </div>
                ))}
            </div>

        </div>

    );
};

export default BlogsSummaryAltView;
