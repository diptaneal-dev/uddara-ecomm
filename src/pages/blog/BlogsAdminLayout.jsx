import BlogsSidebar from "./BlogsSidebar";
import { Outlet } from "react-router-dom";

const BlogsAdminLayout = () => {
  return (
    <div className="d-flex" style={{ height: "100vh" }}>
      {/* Sidebar (Blog Management Navigation) */}
      <BlogsSidebar />

      {/* Blog Management Content Area */}
      <div className="flex-grow-1 p-4" style={{ overflowY: "auto", width: "calc(100% - 250px)" }}>
        <Outlet /> {/* Renders child pages like Create Blog & Blog List */}
      </div>
    </div>
  );
};

export default BlogsAdminLayout;
