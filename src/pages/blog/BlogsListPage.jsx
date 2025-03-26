import { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import blogService from "../../services/BlogService";
import {
    PageContainer,
    Header,
    BlogGrid,
    BlogGridWrapper,
    GridWrapper,
    BlogCard,
    BlogImage,
    BlogContent,
    CreateButton,
    SectionHeading
} from "./BlogsListPage.styles";

const BlogsListPage = () => {
    const [blogs, setBlogs] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const observer = useRef();
    const navigate = useNavigate();

    const fetchBlogs = async (pageNumber) => {
        if (!hasMore || loading) return;
        setLoading(true);
        try {
            const response = await blogService.getAllBlogs(pageNumber);
            if (!response.content || !Array.isArray(response.content)) {
                console.error("❌ Invalid response format");
                setLoading(false);
                return;
            }

            setBlogs((prev) => {
                const updatedBlogs = response.content;
                const blogMap = new Map(updatedBlogs.map((blog) => [blog.id, blog]));
                prev.forEach((blog) => {
                    if (!blogMap.has(blog.id)) {
                        console.log(`🗑️ Removing deleted blog: ${blog.id}`);
                    } else {
                        blogMap.set(blog.id, blog);
                    }
                });
                const uniqueBlogs = Array.from(blogMap.values());
                if (uniqueBlogs.length === prev.length) {
                    setHasMore(false);
                }
                return uniqueBlogs;
            });

            setHasMore(response.content.length > 0);
        } catch (error) {
            console.error("❌ Error fetching blogs:", error);
        } finally {
            setLoading(false);
        }
    };

    const lastBlogRef = useCallback(
        (node) => {
            if (loading || !hasMore) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore && !loading) {
                    setTimeout(() => setPage((prevPage) => prevPage + 1), 300);
                }
            });
            if (node) observer.current.observe(node);
        },
        [loading, hasMore]
    );

    const stripHtml = (html) => {
        const doc = new DOMParser().parseFromString(html, "text/html");
        return doc.body.textContent || "";
    };

    useEffect(() => {
        let isCancelled = false;
        const loadBlogs = async () => {
            if (!isCancelled) {
                await fetchBlogs(page);
            }
        };
        loadBlogs();
        return () => {
            isCancelled = true;
        };
    }, [page]);

    return (
        <PageContainer>
            <GridWrapper>
                <Header>
                    <SectionHeading>All Blogs</SectionHeading>
                    <CreateButton onClick={() => navigate("/admin/blogsmgmt/new")}>+ Create New Blog</CreateButton>
                </Header>
            </GridWrapper>


            <BlogGridWrapper>

                <BlogGrid>
                    {blogs.map((blog, index) => (
                        <BlogCard
                            key={blog.id ?? `blog-${index}`}
                            onClick={() => navigate(`/blog/${blog.id}`)}
                            ref={index === blogs.length - 1 ? lastBlogRef : null}
                        >
                            {blog.coverImageUrl && (
                                <BlogImage src={blog.coverImageUrl} alt="Cover" />
                            )}
                            <BlogContent>
                                <h5>{blog.title}</h5>
                                <p>{stripHtml(blog.content).substring(0, 200) + "..."}</p>
                                <small>{new Date(blog.timestamp).toLocaleString()}</small>
                            </BlogContent>
                        </BlogCard>
                    ))}
                </BlogGrid>
            </BlogGridWrapper>


            {loading && <p className="text-center">Loading more blogs...</p>}
            {!hasMore && <p className="text-center" style={{ color: 'transparent' }}>No more blogs to show.</p>}
        </PageContainer>
    );
};

export default BlogsListPage;
