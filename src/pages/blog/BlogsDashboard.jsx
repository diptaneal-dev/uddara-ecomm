import { useEffect, useState } from "react";
import blogService from "../../services/BlogService";

const BlogDashboard = () => {
  const [stats, setStats] = useState({
    totalBlogs: 0,
    publishedBlogs: 0,
    draftBlogs: 0,
    averageWordCount: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    blogService.getBlogStats()
      .then((data) => {
        setStats(data || {
          totalBlogs: 0,
          publishedBlogs: 0,
          draftBlogs: 0,
          averageWordCount: 0,
        });
        setLoading(false);
      })
      .catch(error => {
        console.error("❌ Error fetching blog stats:", error);
        setError("Failed to load statistics");
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-4">Loading...</p>;
  if (error) return <p className="text-center mt-4 text-danger">{error}</p>;

  return (
    <div className="container mt-4">
      <h2>Blog Dashboard</h2>
      <div className="row">
        <div className="col-md-3">
          <div className="card p-3">
            <h5>Total Blogs</h5>
            <p className="h4">{stats.totalBlogs}</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card p-3">
            <h5>Published Blogs</h5>
            <p className="h4">{stats.publishedBlogs}</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card p-3">
            <h5>Draft Blogs</h5>
            <p className="h4">{stats.draftBlogs}</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card p-3">
            <h5>Average Word Count</h5>
            <p className="h4">{Number(stats.averageWordCount || 0).toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDashboard;
