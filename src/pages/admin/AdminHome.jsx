import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";


const ADMIN_FEATURES = [
  { title: "Store Management", route: "/admin/stores", icon: "🏬" }, 
  { title: "Payment Dashboard", route: "/admin/payments", icon: "📊" },
  { title: "User Management", route: "/admin/users", icon: "👤" },
  { title: "Order Management", route: "/admin/orders", icon: "📦" },
  { title: "System Logs & Alerts", route: "/admin/logs", icon: "🚨" },
  { title: "Availability Marking", route: "/admin/availability", icon: "📅" },
  { title: "Product Management", route: "/admin/productmgmt", icon: "📦" },
  { title: "Blogs Management", route: "/admin/blogsmgmt", icon: "📝" },
  { title: "Client Management", route: "/admin/clients", icon: "🧑‍🤝‍🧑" },
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
              <h3 className="mb-3">{icon}</h3>
              <h5>{title}</h5>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminHome;
