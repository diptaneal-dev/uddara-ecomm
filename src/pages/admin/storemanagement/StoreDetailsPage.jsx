// src/pages/StoreDetailsPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import storeService from "../../../services/StoreService";
import { toast } from "react-toastify";

export default function StoreDetailsPage() {
    const { id } = useParams();
    const [store, setStore] = useState(null);

    useEffect(() => {
        const fetchStore = async () => {
            try {
                const response = await storeService.getStoreById(id);
                console.log("Incoming store by id details:", response);
                setStore(response);
            } catch (error) {
                console.error("Failed to load store details:", error);
                toast.error("Could not load store details.");
            }
        };

        fetchStore();
    }, [id]);

    if (!store) {
        return <div className="container py-4">Loading store details...</div>;
    }

    return (
        <div className="container py-4">
            <h2 className="mb-3">{store.storeName}</h2>
            <p><strong>Store Type:</strong> {store.storeType}</p>
            <p><strong>Currency:</strong> {store.currency}</p>
            <p><strong>Default Tax Rate:</strong> {store.defaultTaxRate}%</p>
            <p><strong>Delivery Enabled:</strong> {store.enableDelivery ? "Yes" : "No"}</p>

            <h4 className="mt-4">Business Hours</h4>
            {store.businessHours ? (
                <ul>
                    <li><strong>Opening:</strong> {store.businessHours.openingTime}</li>
                    <li><strong>Closing:</strong> {store.businessHours.closingTime}</li>
                    <li>
                        <strong>Days:</strong>{" "}
                        {store.businessHours?.daysOfOperation?.length
                            ? store.businessHours.daysOfOperation.join(", ")
                            : "Not set"}
                    </li>
                </ul>
            ) : <p className="text-muted">Not set</p>}

            <h4 className="mt-4">Addresses</h4>
            {store.addresses && store.addresses.length > 0 ? (
                store.addresses.map((addr, index) => (
                    <div key={index} className="mb-2">
                        <p>{addr.line1}, {addr.city}, {addr.country}</p>
                    </div>
                ))
            ) : <p className="text-muted">No addresses added.</p>}

            <h4 className="mt-4">Contact Details</h4>
            {store.contactDetailsList && store.contactDetailsList.length > 0 ? (
                store.contactDetailsList.map((contact, index) => (
                    <div key={index}>
                        <p><strong>{contact.type}:</strong> {contact.value}</p>
                    </div>
                ))
            ) : <p className="text-muted">No contact info added.</p>}
        </div>
    );
}
