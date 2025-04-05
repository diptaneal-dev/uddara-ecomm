// UserAdminLayout.js
import Sidebar from "../../../components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh; 
`;

const ContentArea = styled.div`
  flex-grow: 1;
  height: 100vh;
  overflow-y: auto;
  padding: 2rem;
  background-color: ${({ theme }) => theme.colors.backgroundPrimary};
`;


const UserAdminLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const links = [
    { to: "/admin/usermgmt", label: "👥 User Management" }
  ];
  
  return (
    <LayoutContainer>
      <Sidebar
        title="User Admin"
        links={links}
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <ContentArea>
        <Outlet />
      </ContentArea>
    </LayoutContainer>
  );
};

export default UserAdminLayout;
