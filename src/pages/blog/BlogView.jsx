import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import blogService from "../../services/BlogService";

const BlogView = () => {
    const { id: blogId } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await blogService.getBlogById(blogId);
                if (response) {
                    setBlog(response);

                    // ✅ Load images from the blog directory if they exist
                    if (response.imageDirectory) {
                        const imageUrls = await blogService.getImagesFromDirectory(response.imageDirectory);
                        setImages(imageUrls);
                    }
                } else {
                    setError("Blog not found");
                }
            } catch (err) {
                console.error("❌ Error fetching blog:", err);
                setError("Failed to load blog");
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [blogId]);

    const sanitizeContent = (htmlContent) => {
        // ✅ Remove alignment button divs
        return htmlContent.replace(/<div class="image-options">.*?<\/div>/gs, "");
    };
    
    if (loading) return <p className="text-center">Loading blog...</p>;
    if (error) return <p className="text-center text-danger">{error}</p>;

    return (
        <div className="container mt-4">
            <h1>{blog?.title || "Untitled Blog"}</h1>
            <p className="text-muted">Published on {new Date(blog?.timestamp).toLocaleString()}</p>

            <hr />

            {/* ✅ Render Blog Content */}
            <div dangerouslySetInnerHTML={{ __html: blog?.content || "<p>No content available.</p>" }} />

            {/* ✅ Render Images from Directory (If Not in Content) */}
            {images.length > 0 && (
                <div className="blog-image-gallery mt-4">
                    <h4>Additional Images</h4>
                    <div className="row">
                        {images.map((imgUrl, index) => (
                            <div key={index} className="col-md-4 mb-3">
                                <img src={imgUrl} alt={`Blog Image ${index}`} className="img-fluid rounded shadow-sm" />
                            </div>
                            
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default BlogView;
