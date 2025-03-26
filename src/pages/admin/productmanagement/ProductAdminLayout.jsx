import ProductSidebar from "./ProductSidebar";
import { Outlet } from "react-router-dom";

const ProductAdminLayout = () => {
  return (
    <div className="d-flex" style={{ height: "100vh" }}>
      {/* Sidebar (Product Management Navigation) */}
      <ProductSidebar />

      {/* Product Management Content Area */}
      <div className="flex-grow-1 p-4" style={{ overflowY: "auto", width: "calc(100% - 250px)" }}>
        <Outlet /> {/* Renders the child page */}
      </div>
    </div>
  );
};

export default ProductAdminLayout;
