import React, { useState, useEffect, useCallback } from "react";
import paymentService from "../../services/PaymentService";

const PaymentDashboard = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Filters
    const [status, setStatus] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [search, setSearch] = useState("");

    // Fetch Payments (Only called manually now)
    const fetchPayments = useCallback(async () => {
        console.log("Sending request to backend: fetchPayments");
        setLoading(true);
        setError(null);

        try {
            const paymentsData = await paymentService.getPayments(status, fromDate, toDate, search);
            setPayments(paymentsData);
        } catch (error) {
            console.error("❌ Payment API Error:", error);
            setError("⚠️ Failed to load payments. Please try again.");
        }

        setLoading(false);
    }, [status, fromDate, toDate, search]);

    // Fetch payments only once when the component mounts
    useEffect(() => {
        fetchPayments();
    }, []);

    return (
        <div>
            <h2>📊 Payment Dashboard</h2>

            {/* Filter Bar */}
            <div className="d-flex flex-wrap gap-3 mb-3 align-items-center">
                <select className="form-select w-auto" value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="">All Status</option>
                    <option value="SUCCESS">Success</option>
                    <option value="FAILED">Failed</option>
                    <option value="PENDING">Pending</option>
                </select>
                <input type="date" className="form-control w-auto" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
                <input type="date" className="form-control w-auto" value={toDate} onChange={(e) => setToDate(e.target.value)} />
                <input type="text" className="form-control w-auto" placeholder="Search Transactions" value={search} onChange={(e) => setSearch(e.target.value)} />
                <button onClick={fetchPayments} className="btn btn-primary">🔄 Refresh</button>
            </div>

            {error && <p className="text-danger">{error}</p>}
            {loading && <p className="text-muted">Loading...</p>}

            {/* Table Display */}
            <div style={{ minHeight: "250px" }}>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Transaction ID</th>
                            <th>Status</th>
                            <th>Amount</th>
                            <th>Currency</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.length > 0 ? (
                            payments.map((payment) => (
                                <tr key={payment.id}>
                                    <td>{payment.transactionId}</td>
                                    <td>{payment.status}</td>
                                    <td>{payment.amount}</td>
                                    <td>{payment.currency}</td>
                                    <td>
                                        <button className="btn btn-info btn-sm me-1">Track Delivery</button>
                                        <button className="btn btn-warning btn-sm me-1">Request Cancellation</button>
                                        <button className="btn btn-success btn-sm me-1">Replace</button>
                                        <button className="btn btn-danger btn-sm">Return</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            !loading && (
                                <tr>
                                    <td colSpan="5" className="text-center text-muted">No payments found.</td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentDashboard;
