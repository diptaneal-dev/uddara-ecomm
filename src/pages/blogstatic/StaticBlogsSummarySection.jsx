import React from "react";
import { useNavigate } from "react-router-dom";
import { staticBlogs } from "./data/staticBlogs";

import {
  Section,
  Container,
  Header,
  Heading,
  BlogGrid,
  BlogCard,
  BlogImage,
  BlogContent,
} from "../blog/BlogsSummarySection.styles";

import { Button } from "../../components/Button/Button";

const StaticBlogsSummarySection = () => {
  const navigate = useNavigate();
  const latestThreeBlogs = staticBlogs.slice(0, 3);

  return (
    <Section>
      <Container>
        <Header>
          <Heading size="medium" as="h2" $margin="0 0 0.5rem 0">
            In the blogs
          </Heading>
        </Header>

        <BlogGrid>
          {latestThreeBlogs.map((blog) => (
            <BlogCard key={blog.id} onClick={() => navigate(`/sblog/${blog.id}`)}>
              <BlogImage src={blog.coverImageUrl} alt={blog.title} />
              <BlogContent>
                <Heading size="small" as="h5" $margin="0 0 0.5rem 0">
                  {blog.title}
                </Heading>
                <p>{blog.content.substring(0, 100)}...</p>
              </BlogContent>
            </BlogCard>
          ))}
        </BlogGrid>
      </Container>
    </Section>
  );
};

export default StaticBlogsSummarySection;
