import React, { useEffect, useState } from 'react';
import userService from '../../services/UserService';
import { useUserContext } from '../../hooks/UserContext';
import { useTheme } from '../../context/ThemeContext';

const UserContextModal = ({ isOpen, onClose }) => {
    const {
        user,
        getCurrentStorePoliciesByType,
        getUserPreferences,
        getAllStores,
        getCurrentStorePolicies,
        setUserContext,
    } = useUserContext();

    const { darkMode } = useTheme();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('visual');
    const [policies, setPolicies] = useState([]);
    const [expirationPolicies, setExpirationPolicies] = useState([]);
    const [expandedNodes, setExpandedNodes] = useState({});

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    // Fetch expiration policies for the current store
    useEffect(() => {
        const fetchPolicies = () => {
            const currentExpirationPolicies = getCurrentStorePoliciesByType("EXPIRATION");
            if (currentExpirationPolicies.length > 0) {
                setExpirationPolicies(currentExpirationPolicies);
            } else {
                console.warn('No expiration policies available for the current store.');
            }
        };

        fetchPolicies();
    }, [getCurrentStorePoliciesByType]);

    const refreshUserContext = async () => {
        setLoading(true);
        setError(null);
        try {
            const updatedContext = await userService.fetchUserContext(user.userId);
            setUserContext(updatedContext);
        } catch (err) {
            setError('Failed to refresh user context.');
        } finally {
            setLoading(false);
        }
    };

    const toggleNode = (id) => {
        console.log("Toggling node:", id);
        setExpandedNodes((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const renderPolicies = () => {
        if (expirationPolicies.length === 0) {
            return <p>No expiration policies available.</p>;
        }
    
        return (
            <div className={`card mb-3 ${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
                <div className="card-header d-flex align-items-center">
                    <strong>Expiration Policies</strong>
                    <button
                        className={`btn btn-sm ms-auto ${darkMode ? 'btn-outline-light' : 'btn-outline-dark'}`}
                        onClick={() => setExpandedNodes({})}
                    >
                        Collapse All
                    </button>
                </div>
                <div className="card-body">
                    <ul className="list-group">
                        {expirationPolicies.map((policy, index) => (
                            <li key={`${policy.name}-${index}`} className="list-group-item">
                                <div
                                    className="d-flex align-items-center cursor-pointer"
                                    onClick={() => toggleNode(`${policy.name}-${index}`)}
                                >
                                    <span className="me-2">
                                        {expandedNodes[`${policy.name}-${index}`] ? '-' : '+'}
                                    </span>
                                    <strong>{policy.name} ({policy.expirationCategory})</strong>
                                </div>
                                {expandedNodes[`${policy.name}-${index}`] && (
                                    <div className="mt-3">
                                        <table
                                            className={`table table-sm ${darkMode ? 'table-dark' : 'table-light'}`}
                                        >
                                            <tbody>
                                                {Object.entries(policy).map(([key, value]) => (
                                                    <tr key={key}>
                                                        <td>{key}</td>
                                                        <td>{value !== null ? value.toString() : 'N/A'}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    };    

    const renderVisualTab = () => (
        <div className="row">
            <div className="col-md-6">
                {/* Render Store Fields */}
                {renderFieldList(
                    'Store Fields (Mandatory)',
                    getUserPreferences('storeFields')?.mandatory || []
                )}
                {renderFieldList(
                    'Store Fields (Optional)',
                    getUserPreferences('storeFields')?.optional || []
                )}
            </div>
            <div className="col-md-6">
                <div className={`card mb-3 ${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
                    <div className="card-header">
                        <strong>Timezone</strong>
                    </div>
                    <div className="card-body">
                        <p>{getUserPreferences('timezone') || 'Timezone not available'}</p>
                    </div>
                </div>
                {/* Render Product Fields */}
                {renderFieldList('Product Fields', user?.preferences?.productFields || [])}
            </div>
            <hr />
            <div className="row">
                <div className="col-12">{renderStores()}</div>
                <div className="col-12">{renderPolicies()}</div>
                <div className="col-12">{renderDynamicFields()}</div>
            </div>
        </div>
    );

    const renderJSONTab = () => (
        <div className={`card ${darkMode ? 'bg-dark text-light border-light' : 'bg-light text-dark border-dark'}`}>
            <div className="card-body">
                <pre className={`p-3 rounded ${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
                    {JSON.stringify(user, null, 2)}
                </pre>
            </div>
        </div>
    );

    const renderFieldList = (title, fields) => (
        <div className={`card mb-3 ${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
            <div className="card-header">
                <strong>{title}</strong>
            </div>
            <div className="card-body">
                <ul className="list-group">
                    {fields.map((field, index) => (
                        <li
                            key={index}
                            className={`list-group-item ${darkMode ? 'bg-dark text-light border-light' : 'bg-light text-dark border-dark'
                                }`}
                        >
                            {field.label || JSON.stringify(field)}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );

    const renderDynamicFields = () => {
        const excludedKeys = ['preferences', 'stores', 'userId', 'username', 'role', 'expirationPolicies', 'storePolicies'];
        const dynamicFields = Object.entries(user || {}).filter(([key]) => !excludedKeys.includes(key));

        if (dynamicFields.length === 0) return null;

        return (
            <div className={`card mb-3 ${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
                <div className="card-header">
                    <strong>Dynamic Fields</strong>
                </div>
                <div className="card-body">
                    <table className="table table-striped table-sm">
                        <thead>
                            <tr>
                                <th>Key</th>
                                <th>Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dynamicFields.map(([key, value]) => (
                                <tr key={key}>
                                    <td>{key}</td>
                                    <td>{typeof value === 'object' && value !== null ? JSON.stringify(value) : value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };

    const renderStores = () => {
        const stores = getAllStores();
        if (stores.length === 0) {
            return <p>No stores available.</p>;
        }

        return (
            <div className={`card mb-3 ${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
                <div className="card-header">
                    <strong>Stores</strong>
                </div>
                <div className="card-body">
                    <ul className="list-group">
                        {user.stores.map((store, index) => (
                            <li
                                key={index}
                                className={`list-group-item ${darkMode ? 'bg-dark text-light border-light' : 'bg-light text-dark border-dark'
                                    }`}
                            >
                                <strong>{store?.storeName || 'Name not available'}</strong>
                                <ul>
                                    <li>
                                        <strong>Type:</strong> {store?.storeType || 'Type not available'}
                                    </li>
                                    <li>
                                        <strong>Address:</strong>{' '}
                                        {store?.addresses && store.addresses.length > 0
                                            ? `${store.addresses[0].street || 'Street not available'}, ${store.addresses[0].city || 'City not available'
                                            }, ${store.addresses[0].state || 'State not available'}, ${store.addresses[0].country || 'Country not available'
                                            } - ${store.addresses[0].zipCode || 'Zip Code not available'}`
                                            : 'Address not available'}
                                    </li>
                                    <li>
                                        <strong>Contact:</strong>{' '}
                                        {store?.contactDetailsList && store.contactDetailsList.length > 0
                                            ? `${store.contactDetailsList[0].phoneNumber || 'Phone number not available'} (${store.contactDetailsList[0].email || 'Email not available'
                                            })`
                                            : 'Contact details not available'}
                                    </li>
                                </ul>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    };

    if (!isOpen) return null;

    return (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
            <div
                className={`modal-dialog modal-dialog-centered modal-lg ${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'
                    }`}
                role="document"
            >
                <div className={`modal-content ${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
                    <div className={`modal-header ${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
                        <h5 className="modal-title">User Context</h5>
                        <button
                            type="button"
                            className="btn-close"
                            aria-label="Close"
                            onClick={onClose}
                        ></button>
                    </div>
                    <div className="modal-body">
                        {error && (
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>
                        )}
                        {loading && (
                            <div className="d-flex justify-content-center my-3">
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        )}
                        {!loading && (
                            <>
                                <ul className="nav nav-tabs" role="tablist">
                                    <li className="nav-item">
                                        <button
                                            className={`nav-link ${activeTab === 'visual' ? 'active' : ''
                                                }`}
                                            onClick={() => setActiveTab('visual')}
                                            role="tab"
                                        >
                                            Visual View
                                        </button>
                                    </li>
                                    <li className="nav-item">
                                        <button
                                            className={`nav-link ${activeTab === 'json' ? 'active' : ''
                                                }`}
                                            onClick={() => setActiveTab('json')}
                                            role="tab"
                                        >
                                            JSON View
                                        </button>
                                    </li>
                                </ul>
                                <div className="tab-content mt-3">
                                    {activeTab === 'visual' ? renderVisualTab() : renderJSONTab()}
                                </div>
                            </>
                        )}
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className={`btn ${darkMode ? 'btn-outline-light' : 'btn-secondary'}`}
                            onClick={onClose}
                        >
                            Close
                        </button>
                        <button
                            type="button"
                            className={`btn ${darkMode ? 'btn-primary' : 'btn-primary'}`}
                            onClick={refreshUserContext}
                            disabled={loading}
                        >
                            {loading && (
                                <span
                                    className="spinner-border spinner-border-sm me-2"
                                    role="status"
                                    aria-hidden="true"
                                ></span>
                            )}
                            {loading ? 'Refreshing...' : 'Refresh User Context'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserContextModal;
