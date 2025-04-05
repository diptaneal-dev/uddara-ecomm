// AdminLayout.jsx
import Sidebar from "../../components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
import {
    Store,
    BarChart,
    User,
    Package,
    AlertTriangle,
    Calendar,
    Box,
    FileText,
    Users
  } from "lucide-react";


const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  overflow: hidden;
`;

const ContentArea = styled.div`
  flex-grow: 1;
  padding: 2rem;
  min-height: 100vh;
  overflow-y: auto;
  background-color: ${({ theme }) => theme.colors.backgroundPrimary};
`;

const AdminLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

const links = [
  { to: "/admin/stores", icon: <Store />, label: "Store Management" },
  { to: "/admin/payments", icon: <BarChart />, label: "Payments" },
  { to: "/admin/usermgmt", icon: <User />, label: "User Management" },
  { to: "/admin/orders", icon: <Package />, label: "Orders" },
  { to: "/admin/logs", icon: <AlertTriangle />, label: "Logs" },
  { to: "/admin/availability", icon: <Calendar />, label: "Availability" },
  { to: "/admin/products", icon: <Box />, label: "Products" },
  { to: "/admin/blogs", icon: <FileText />, label: "Blogs" },
  { to: "/admin/clients", icon: <Users />, label: "Clients" }
];
  
  return (
    <LayoutContainer>
      <Sidebar
        title="Admin Links"
        links={links}
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <ContentArea>
        <Outlet />
      </ContentArea>
    </LayoutContainer>
  );
};

export default AdminLayout;