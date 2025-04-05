// modules/reference/layouts/ReferenceAdminLayout.jsx
import { useState } from "react";
import styled from "styled-components";
import { Outlet } from "react-router-dom";
import Sidebar from "../../../components/Sidebar/Sidebar";

// Import icons
import {
    List,
    Tags,
    Package,
    LucideWeight,
    Landmark,
    BadgePercent
} from "lucide-react";

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

const ReferenceAdminLayout = () => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    const links = [
        {
            to: "/admin/reference/categories",
            icon: <List size={24} />,
            label: "Categories"
        },
        {
            to: "/admin/reference/categories/bulk-upload",
            icon: <List size={24} />,
            label: "Bulk Upload Categories"
        },
        {
            to: "/admin/reference/hsncodes",
            icon: <Landmark size={24} />,
            label: "HSN Codes"
        },
        {
            to: "/admin/reference/units",
            icon: <LucideWeight size={24} />,
            label: "Units of Measurement"
        },
        {
            to: "/admin/reference/allergens",
            icon: <Tags size={24} />,
            label: "Allergens"
        },
        {
            to: "/admin/reference/diet-types",
            icon: <BadgePercent size={24} />,
            label: "Diet Types"
        },
        {
            to: "/admin/reference/package-types",
            icon: <Package size={24} />,
            label: "Package Types"
        }
    ];

    return (
        <LayoutContainer>
            <Sidebar
                title="Reference Admin"
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

export default ReferenceAdminLayout;
