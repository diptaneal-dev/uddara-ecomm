import React, { useState, useEffect } from "react";
import clientService from "../../services/ClientService";  

const ClientManagement = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const data = await clientService.fetchClients();  
      setClients(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching clients:", error);
      setLoading(false);
    }
  };

  const handleToggleStatus = async (clientId, currentStatus) => {
    try {
      await clientService.toggleClientStatus(clientId, !currentStatus);
      fetchClients();
    } catch (error) {
      console.error("Error updating client status:", error);
    }
  };

  const filteredClients = clients.filter((client) =>
    (client.fullName || "").toLowerCase().includes(search.toLowerCase()) ||
    (client.email || "").toLowerCase().includes(search.toLowerCase()) ||
    (client.phoneNumber || "").includes(search)
  );

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Client Management</h2>
      <input
        type="text"
        placeholder="Search by Name, Email, or Phone"
        className="form-control mb-3"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {loading ? (
        <p>Loading clients...</p>
      ) : (
        <table className="table table-bordered">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Full Name</th>
              <th>Phone Number</th>
              <th>Active</th>
              <th>Toggle Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredClients.length > 0 ? (
              filteredClients.map((client) => (
                <tr key={client.id}>
                  <td>{client.id}</td>
                  <td>{client.email}</td>
                  <td>{client.fullName || "N/A"}</td>
                  <td>{client.phoneNumber || "N/A"}</td>
                  <td>{client.active ? "✅ Active" : "❌ Inactive"}</td>
                  <td>
                    <button
                      className={`btn btn-sm ${client.active ? "btn-danger" : "btn-success"}`}
                      onClick={() => handleToggleStatus(client.id, client.active)}
                    >
                      {client.active ? "Deactivate" : "Activate"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">No clients found</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ClientManagement;
