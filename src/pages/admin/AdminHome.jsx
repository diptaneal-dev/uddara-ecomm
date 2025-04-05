import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";

// Lucide Icons
import {
  Building2,
  CreditCard,
  Users,
  Truck,
  Activity,
  CalendarDays,
  Package,
  FileText,
  UserCheck,
  Settings2
} from "lucide-react";

const ADMIN_FEATURES = [
  {
    title: "Store Management",
    route: "/admin/stores",
    icon: <Building2 size={32} />
  },
  {
    title: "Payment Dashboard",
    route: "/admin/payments",
    icon: <CreditCard size={32} />
  },
  {
    title: "User Management",
    route: "/admin/usermgmt",
    icon: <Users size={32} />
  },
  {
    title: "Order Management",
    route: "/admin/orders",
    icon: <Truck size={32} />
  },
  {
    title: "System Logs & Alerts",
    route: "/admin/logs",
    icon: <Activity size={32} />
  },
  {
    title: "Availability Marking",
    route: "/admin/availability",
    icon: <CalendarDays size={32} />
  },
  {
    title: "Product Management",
    route: "/admin/products",
    icon: <Package size={32} />
  },
  {
    title: "Blogs Management",
    route: "/admin/blogsmgmt",
    icon: <FileText size={32} />
  },
  {
    title: "Client Management",
    route: "/admin/clients",
    icon: <UserCheck size={32} />
  },
  {
    title: "Reference Data Management",
    route: "/admin/reference",
    icon: <Settings2 size={32} />
  }
];

const AdminHome = () => {
  const navigate = useNavigate();

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Admin Dashboard</h2>
      <div className="row">
        {ADMIN_FEATURES.map(({ title, route, icon }) => (
          <div key={route} className="col-lg-3 col-md-6 col-sm-12 mb-3">
            <Card
              className="shadow-sm text-center p-4"
              style={{ cursor: "pointer" }}
              onClick={() => navigate(route)}
            >
              <div className="mb-3">{icon}</div>
              <h5>{title}</h5>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminHome;
