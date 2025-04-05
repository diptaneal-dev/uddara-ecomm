import Sidebar from "../../../components/Sidebar/Sidebar"; // Assuming the Sidebar component is located here
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";

// Import necessary icons from lucide-react
import { Box, DollarSign, PlusCircle } from "lucide-react"; // Icons

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

const ContentArea = styled.div`
  flex-grow: 1;
  padding: 2rem;
  overflow-y: auto;
  width: calc(100% - 250px);
  background-color: ${({ theme }) => theme.colors.backgroundPrimary};
`;

const ProductAdminLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const links = [
    { to: "/admin/products/new", icon: <PlusCircle size={24} />, label: "Create Product" },
    { to: "/admin/products/list", icon: <Box size={24} />, label: "Product List" },
    { to: "/admin/pricing", icon: <DollarSign size={24} />, label: "Pricing & Discounts" }
  ];

  return (
    <LayoutContainer>
      {/* Sidebar (Product Management Navigation) */}
      <Sidebar 
        title="PIM System"
        links={links} 
        collapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />

      {/* Product Management Content Area */}
      <ContentArea>
        <Outlet /> {/* Renders the child page */}
      </ContentArea>
    </LayoutContainer>
  );
};

export default ProductAdminLayout;
