import { useNavigate, useLocation } from "react-router-dom";
import styled, { css } from "styled-components";
import { IconButton } from "../Button/IconButton";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTheme } from 'styled-components';

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.navy};
  color: ${({ theme }) => theme.colors.white};
  padding: 1rem;
  height: 100vh; /* Full height of the viewport */
  width: ${({ $collapsed }) => ($collapsed ? "80px" : "270px")};
  transition: width 0.3s ease;
  overflow-y: hidden; /* No scrollbar */
`;

const SidebarHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${({ $collapsed }) => ($collapsed ? "center" : "space-between")}; /* Center when collapsed */
  width: 100%;
  background-color: ${({ $collapsed, theme }) => ($collapsed ? "transparent" : theme.colors.grey)}; /* Transparent when collapsed */
  padding: 0.5rem 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
`;

const SidebarHeader = styled.h4`
  margin: 0;
  font-family: ${({ theme }) => theme.typography.fontPrimary};
  font-size: ${({ theme }) => theme.typography.headingXSmall.fontSize};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${({ theme }) => theme.colors.white}; /* Ensure the text is visible */
  flex-grow: 1; /* Ensures the title takes up remaining space */
  display: flex;
  justify-content: center; /* Center the title */
  align-items: center; /* Vertically center the title */
  ${({ $collapsed }) =>
    $collapsed &&
    css`
      font-size: 0; /* Hide text when collapsed */
    `}
`;

const Tooltip = styled.span`
  visibility: hidden;
  position: absolute;
  background-color: #000;
  color: #fff;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  left: 100%;
  margin-left: 8px;
  white-space: nowrap;
`;

const SidebarButtonWrapper = styled.div`
  position: relative;
  &:hover ${Tooltip} {
    visibility: visible;
  }
`;

const SidebarButton = styled.button.withConfig({
  shouldForwardProp: (prop) => !["$active", "$collapsed"].includes(prop),
})`
  background: ${({ $active, $collapsed, theme }) =>
    $collapsed ? "none" : $active ? theme.colors.pink : "none"};

  border: ${({ $collapsed, theme }) =>
    $collapsed ? "none" : `1px solid ${theme.colors.white}`};

  color: ${({ theme }) => theme.colors.white};
  padding: ${({ $collapsed }) => ($collapsed ? "8px" : "0.5rem 1rem")};
  border-radius: ${({ $collapsed }) => ($collapsed ? "50%" : "4px")};
  margin-bottom: 1rem;
  font-family: ${({ theme }) => theme.typography.fontSecondary};
  text-align: left;
  cursor: pointer;
  width: ${({ $collapsed }) => ($collapsed ? "40px" : "100%")};
  height: ${({ $collapsed }) => ($collapsed ? "40px" : "auto")};
  display: flex;
  align-items: center;
  justify-content: ${({ $collapsed }) => ($collapsed ? "center" : "flex-start")};
  gap: ${({ $collapsed }) => ($collapsed ? "0" : "0.5rem")};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    background-color: ${({ theme }) => theme.colors.seashell};
    color: ${({ theme }) => theme.colors.navy};
  }
`;

const ToggleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center; /* Center the toggle button */
  margin-left: ${({ $collapsed }) => ($collapsed ? "0" : "1rem")}; /* Adjust the margin to center */
`;

const SidebarLabel = styled.span`
  flex-grow: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 0.875rem;
  line-height: 1.2;
`;

const Sidebar = ({ title, links, collapsed, onToggle }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <SidebarContainer $collapsed={collapsed}>
      <SidebarHeaderWrapper $collapsed={collapsed}>
        {/* Render the title if passed */}
        {title && (
          <SidebarHeader $collapsed={collapsed}>
            {title}
          </SidebarHeader>
        )}
        {/* Toggle button to collapse sidebar */}
        <ToggleContainer $collapsed={collapsed}>
          <IconButton
            color={theme.colors.white}
            $hoverColor={theme.colors.seashell}
            $hoverIconColor={theme.colors.navy}
            $borderColor="1px solid #ccc" /* Adds a border around the chevron */
            iconSize={collapsed ? "md" : "md"}
            onClick={onToggle}
          >
            {collapsed ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        </ToggleContainer>
      </SidebarHeaderWrapper>

      {/* Render the sidebar links */}
      <div style={{ flexGrow: 1, overflowY: 'auto', minHeight: 0 }}> {/* Allow content to fill available space */}
        {links.map((link, idx) => {
          const isActive = location.pathname.startsWith(link.to);
          return (
            <SidebarButtonWrapper key={idx}>
              <SidebarButton
                onClick={() => navigate(link.to)}
                $collapsed={collapsed}
                $active={isActive}
              >
                <IconButton
                  as="div"
                  iconSize={collapsed ? "lg" : "md"}
                  color="white"
                  $hoverColor="transparent"
                  $hoverIconColor={theme.colors.navy}
                >
                  {link.icon}
                </IconButton>
                {!collapsed && <SidebarLabel>{link.label}</SidebarLabel>}
              </SidebarButton>
            </SidebarButtonWrapper>
          );
        })}
      </div>
    </SidebarContainer>
  );
};

export default Sidebar;
