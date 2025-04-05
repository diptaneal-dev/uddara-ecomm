// src/pages/StoreManagementPage.jsx
import React, { useEffect, useState } from "react";
import storeService from "../../../services/StoreService";
import { toast } from "react-toastify";
import StepStoreModal from "./StepStoreModal";
import StoreGroupCard from "./StoreGroupCard";
import { useStoreGroupForm } from "./useStoreGroupForm";
import StoreGroupModal from "./StoreGroupModal";
import { Button } from "../../../components/Button/Button";
import StoreDetailsModal from "./StoreDetailsModal";

export default function StoreManagementPage() {
    const [storeGroups, setStoreGroups] = useState([]);
    const [stores, setStores] = useState([]);
    const [showGroupModal, setShowGroupModal] = useState(false);
    const [showStoreModal, setShowStoreModal] = useState(false);
    const [selectedStore, setSelectedStore] = useState(null);

    const {
        groupForm,
        setGroupForm,
        editingGroupId,
        startCreate,
        startEdit,
        submit,
    } = useStoreGroupForm(setStoreGroups, () => setShowGroupModal(false));

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") {
                setShowGroupModal(false);
                setShowStoreModal(false);
            }
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, []);

    useEffect(() => {
        const loadStoreGroupsAndStores = async () => {
            try {
                const groups = await storeService.getMyStoreGroups();
                console.log("Fetched store groups:", groups);

                setStoreGroups(groups);

                const storeFetches = await Promise.all(
                    groups.map((group) =>
                        storeService.getStoresByGroupId(group.id)
                            .then((stores) => ({ groupId: group.id, stores }))
                    )
                );

                // Flatten stores from all groups
                const allStores = storeFetches.flatMap(entry => entry.stores || []);
                setStores(allStores);
            } catch (error) {
                console.error("Failed to load store groups or stores:", error);
                toast.error("Could not load store data");
            }
        };

        loadStoreGroupsAndStores();
    }, []);

    const handleDelete = async (groupId) => {
        if (window.confirm("Are you sure you want to delete this store group?")) {
            try {
                await storeService.deleteStoreGroup(groupId);
                const updatedGroups = await storeService.getMyStoreGroups();
                setStoreGroups(updatedGroups);
                toast.success("Store group deleted.");
            } catch (err) {
                toast.error("Something went wrong while deleting.");
            }
        }
    };

    const handleEditStore = (store) => {
        setStoreForm(store);          // assuming you have a form state
        setEditingStoreId(store.id);  // optional: for conditional rendering
        setShowStoreModal(true);
    };

    const handleDeleteStore = async (store) => {
        if (window.confirm(`Are you sure you want to delete ${store.storeName}?`)) {
            try {
                await storeService.deleteStore(store.id);
                const updatedStores = await storeService.getMyStores();
                setStores(updatedStores);
                toast.success("Store deleted successfully.");
            } catch (err) {
                toast.error("Failed to delete store.");
            }
        }
    };


    const handleViewStore = (store) => {
        setShowStoreModal(false); // ✅ close store creation modal
        setShowGroupModal(false); // ✅ close group modal
        setSelectedStore(store);  // ✅ then open store detail modal
    };

    return (
        <div className="container py-4">
            <h2 className="mb-4">Store Management</h2>

            <div className="row mb-4">
                <div className="col-md-6 mb-3">
                    <div
                        className="card h-100"
                        onClick={() => {
                            startCreate();
                            setShowGroupModal(true);
                        }}
                        style={{ cursor: "pointer" }}
                    >
                        <div className="card-body">
                            <h5 className="card-title">➕ Create Store Group</h5>
                            <p className="card-text text-muted">Start by creating a store group or brand.</p>
                        </div>
                    </div>
                </div>

                <div className="col-md-6 mb-3">
                    <div
                        className="card h-100"
                        onClick={() => setShowStoreModal(true)}
                        style={{ cursor: "pointer" }}
                    >
                        <div className="card-body">
                            <h5 className="card-title">➕ Create Store</h5>
                            <p className="card-text text-muted">Add a store under an existing group.</p>
                        </div>
                    </div>
                </div>
            </div>

            <h4 className="mb-3">My Store Groups</h4>
            <div className="row">
                {storeGroups.length === 0 ? (
                    <div className="col-12">
                        <div className="alert alert-info">No store groups found.</div>
                    </div>
                ) : (
                    storeGroups.map((group) => (
                        <div className="col-md-6 mb-4" key={group.id}>
                            <StoreGroupCard
                                group={group}
                                stores={stores}
                                onEdit={(id) => {
                                    startEdit(id, storeGroups);
                                    setShowGroupModal(true);
                                }}
                                onDelete={handleDelete}
                                onEditStore={handleEditStore}
                                onDeleteStore={handleDeleteStore}
                                onViewStore={handleViewStore}
                            />
                        </div>
                    ))
                )}
            </div>

            {(showGroupModal || showStoreModal) && (
                <div
                    className="modal-backdrop fade show"
                    onClick={() => {
                        setShowGroupModal(false);
                        setShowStoreModal(false);
                    }}
                />
            )}

            {showGroupModal && (
                <StoreGroupModal
                    groupForm={groupForm}
                    setGroupForm={setGroupForm}
                    editingGroupId={editingGroupId}
                    onSubmit={submit}
                    onClose={() => setShowGroupModal(false)}
                    renderFooter={({ onClose, onSubmit, editing }) => (
                        <div className="d-flex gap-3 justify-content-end">
                            <Button $size="sm" $variant="secondary" onClick={onClose}>
                                Cancel
                            </Button>
                            <Button $size="sm" onClick={onSubmit}>
                                {editing ? "Update" : "Create"}
                            </Button>
                        </div>
                    )}
                />
            )}

            {showStoreModal && (
                <StepStoreModal
                    storeGroups={storeGroups}
                    onClose={() => setShowStoreModal(false)}
                    onSubmit={async () => {
                        setShowStoreModal(false);
                        const updatedStores = await storeService.getMyStores();
                        setStores(updatedStores);
                        toast.success("Store created");
                    }}
                />
            )}

            {selectedStore && (
                <StoreDetailsModal
                    store={selectedStore}
                    onClose={() => setSelectedStore(null)}
                />
            )}


        </div>
    );
}
