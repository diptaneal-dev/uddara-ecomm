import { Link } from "react-router-dom";

const BlogsSidebar = () => {
  return (
    <div className="d-flex flex-column bg-dark text-white p-3" style={{ height: "100vh", width: "250px" }}>
      <h4 className="mb-4">Blog Admin</h4>
      <Link to="/admin/blogsmgmt/new" className="btn btn-outline-light mb-2">📝 Create Blog</Link>
      <Link to="/admin/blogsmgmt/list" className="btn btn-outline-light mb-2">📜 Blog List</Link>
    </div>
  );
};

export default BlogsSidebar;
