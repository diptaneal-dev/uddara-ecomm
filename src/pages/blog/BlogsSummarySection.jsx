import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import blogService from "../../services/BlogService";

import {
    Section,
    Container,
    Header,
    Heading,
    BlogGrid,
    BlogCard,
    BlogImage,
    BlogContent,
} from "./BlogsSummarySection.styles";

import { Button } from "../../components/Button/Button";

const BlogsSummarySection = () => {
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

    if (!blogs.length) return <p style={{ padding: '2rem' }}>Loading blogs...</p>;

    const latestThreeBlogs = blogs.slice(0, 3);

    const extractText = (html) => {
        const parsed = new DOMParser().parseFromString(html, "text/html");
        return parsed.body.textContent || "";
    };

    return (
        <Section>
            <Container>
                <Header>
                    <Heading size="medium" as="h2" $margin="0 0 0.5rem 0">
                        In the blogs
                    </Heading>

                    <Button $variant="primary" $outline onClick={() => navigate("/blogs")}>
                        View All
                    </Button>
                </Header>

                <BlogGrid>
                    {latestThreeBlogs.map((blog) => (
                        <BlogCard key={blog.id} onClick={() => navigate(`/blog/${blog.id}`)}>
                            <BlogImage src={blog.coverImageUrl} alt={blog.title} />
                            <BlogContent>
                                <Heading size="small" as="h5" $margin="0 0 0.5rem 0">
                                    {blog.title}
                                </Heading>
                                <p>{extractText(blog.content).substring(0, 100)}...</p>
                            </BlogContent>
                        </BlogCard>
                    ))}
                </BlogGrid>
            </Container>
        </Section>
    );
};

export default BlogsSummarySection;
