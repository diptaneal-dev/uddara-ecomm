import React, { useState, useEffect } from "react";
import { useFavorites } from "./FavouriteContext";
import { useUserContext } from "../../hooks/UserContext";
import { useNavigate, Link } from "react-router-dom";

const FavoritesPage = () => {
    const { favorites, removeFavorite } = useFavorites();
    const { isAuthenticated } = useUserContext();
    const navigate = useNavigate();

    const [searchQuery, setSearchQuery] = useState("");
    const [sortOrder, setSortOrder] = useState("desc");
    const [filteredFavorites, setFilteredFavorites] = useState([]);

    useEffect(() => {
        let sortedFavorites = [...favorites].sort((a, b) => {
            return sortOrder === "desc" ? b.timestamp - a.timestamp : a.timestamp - b.timestamp;
        });

        if (searchQuery) {
            sortedFavorites = sortedFavorites.filter((item) =>
                item.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.productCategory?.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredFavorites(sortedFavorites);
    }, [favorites, searchQuery, sortOrder]);

    useEffect(() => {
        console.log("Updated Filtered fav is:", filteredFavorites);
    }, [filteredFavorites]);

    const handleRemoveFavorite = (id) => {
        setFilteredFavorites((prev) => prev.filter((fav) => fav.productId !== id));
        removeFavorite(id);
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-3">My Favorite Products ❤️</h2>

            {!isAuthenticated && (
                <div className="p-2 mb-3" style={{ backgroundColor: "rgba(255, 255, 255, 0.2)", color: "#333", textAlign: "left", borderRadius: "5px" }}>
                    <small>
                        Want to save favorites permanently?
                        <span className="text-primary" style={{ cursor: "pointer", fontWeight: "500", marginLeft: "5px" }} onClick={() => navigate("/signin")}>
                            Sign in
                        </span>.
                    </small>
                </div>
            )}

            {/* Search Bar */}
            <input type="text" className="form-control mb-3" placeholder="Search by name or category..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />

            {/* Sort Dropdown */}
            <div className="mb-3 d-flex align-items-center">
                <label className="me-2">Sort By:</label>
                <select className="form-select w-auto" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                    <option value="desc">Newest First</option>
                    <option value="asc">Oldest First</option>
                </select>
            </div>

            {/* Favorites Table */}
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Thumbnail</th>
                        <th>Product</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Added On</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {filteredFavorites.length === 0 ? (
                        <tr>
                            <td colSpan="6" className="text-center">No favorites found</td>
                        </tr>
                    ) : (
                        filteredFavorites.map((product) => (
                            <tr key={product.id}>
                                <td>
                                    <img src={product.productImage || "/placeholder.jpg"} alt={product.productName} className="img-thumbnail" style={{ width: "50px", height: "50px" }} />
                                </td>
                                <td><strong>{product.productName}</strong></td>
                                <td>{product.productCategory || "N/A"}</td>
                                <td>₹{product.productPrice?.toFixed(2)}</td>
                                <td>{new Date(product.timestamp).toLocaleDateString()}</td>
                                <td>
                                    <button className="btn btn-outline-primary btn-sm me-2" onClick={() => navigate(`/product/${product.productId}`)}>View</button>
                                    <button className="btn btn-outline-danger btn-sm" onClick={() => handleRemoveFavorite(product.productId)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default FavoritesPage;
