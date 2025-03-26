import React, { createContext, useState, useContext, useEffect } from 'react';
import userService from '../services/UserService';
import storeService from '../services/StoreService';
import SessionExpirationModal from '../layouts/login/SessionExpirationModal';

// Create Context
const UserContext = createContext();

// Default Guest User Object
const defaultGuestUser = {
    userId: 'guest',
    username: 'guest',
    role: 'GUEST',
    currentStoreId: null,
    stores: [],
    preferences: {
        global: {
            theme: { darkMode: false },
            notifications: { email: true, sms: false },
            timezone: "IST",
        },
        storeSpecific: {},
    },
    expirationPolicies: {}, // Initialize as an empty object
};

// Provide the Context to the App
export const UserProvider = ({ children }) => {
    const [showSessionModal, setShowSessionModal] = useState(false);

    const [user, setUserContext] = useState({
        ...defaultGuestUser,
        expirationPolicies: {}, // Add expiration policies storage
    });

    const [isAuthenticated, setIsAuthenticated] = useState(false); // Guest is not authenticated
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Derived values for convenience
    const stores = user?.stores || [];
    const currentStoreId = user?.currentStoreId || null;

    const fetchExpirationPolicies = async (storeId) => {
        console.log("Store id is:", storeId);

        // Check if the user object is defined
        if (!user) {
            console.error("User is undefined");
            return;
        }

        // Check if policies for the given storeId are already fetched
        if (user?.expirationPolicies && user.expirationPolicies[storeId]) {
            console.log("Policies already fetched for store:", storeId);
            return;
        }

        try {
            const policies = await storeService.getExpirationPoliciesByStoreId(storeId);
            console.log("Fetched policies for store:", user?.username, storeId, policies);
            setUserContext((prevUser) => ({
                ...prevUser,
                expirationPolicies: {
                    ...prevUser.expirationPolicies,
                    [storeId]: policies, // Save policies under the store ID
                },
            }));
        } catch (error) {
            console.error("Failed to fetch expiration policies:", error);
        }
    };

    const refreshPolicies = async () => {
        if (user?.currentStoreId) {
            await fetchExpirationPolicies(user?.currentStoreId); // Fetch policies for the current store
        }
    };

    useEffect(() => {
        if (user.expirationTime) {
            const timeUntilExpiry = user.expirationTime - Date.now();

            if (timeUntilExpiry > 2 * 60 * 1000) {
                const warningTimer = setTimeout(() => {
                    setShowSessionModal(true); // Show popup 2 min before expiry
                }, timeUntilExpiry - 2 * 60 * 1000);

                return () => clearTimeout(warningTimer);
            }
        }
    }, [user.expirationTime]);


    const fetchStores = async (userId) => {
        try {
            const stores = await userService.getUserStores(userId);
            setUserContext((prevUser) => ({
                ...prevUser,
                stores,
            }));
        } catch (error) {
            console.error("Failed to fetch stores:", error);
        }
    };

    // Allow policies to be fetched independently for any store, not just the current store.
    // Preload policies for all or a subset of stores when the user logs in
    const preloadPolicies = async (storeIds) => {
        try {
            const policyFetchPromises = storeIds.map((storeId) =>
                storeService.getExpirationPoliciesByStoreId(storeId)
            );
            const allPolicies = await Promise.all(policyFetchPromises);
            const policiesMap = storeIds.reduce((acc, storeId, index) => {
                acc[storeId] = allPolicies[index];
                return acc;
            }, {});
            setUserContext((prevUser) => ({
                ...prevUser,
                expirationPolicies: {
                    ...prevUser.expirationPolicies,
                    ...policiesMap,
                },
            }));
        } catch (error) {
            console.error("Failed to preload expiration policies:", error);
        }
    };

    // Function to update the current store ID to backend
    const setCurrentStoreId = async (storeId) => {
        if (!user?.userId) {
            console.warn('Cannot update current store: User not authenticated.');
            return;
        }

        try {
            // Update in the backend
            await userService.updateCurrentStore(user.userId, storeId);

            // Update in local context
            setUserContext((prevUser) => ({
                ...prevUser,
                currentStoreId: storeId,
            }));
        } catch (error) {
            console.error('Failed to update current store:', error);
            setError('Failed to update current store. Please try again.');
        }
    };

    const setPreferences = (newPreferences) => {
        setUserContext((prevUser) => ({
            ...prevUser,
            preferences: { ...prevUser.preferences, ...newPreferences },
        }));
    };

    // Preferences are updated in the backend 
    const updatePreferences = async (key, value) => {
        try {
            const defaultPreferences = {
                global: {
                    theme: { darkMode: false },
                    notifications: { email: true, sms: false },
                    timezone: "IST",
                },
            };

            setUserContext((prevUser) => ({
                ...prevUser,
                preferences: {
                    ...prevUser.preferences,
                    [key]: {
                        ...defaultPreferences[key],
                        ...prevUser.preferences[key],
                        ...value,
                    },
                },
            }));

            if (isAuthenticated && user?.userId) {
                await userService.savePreferences(user.userId, { [key]: value });
            }
        } catch (error) {
            console.error("Failed to update preferences:", error);
        }
    };

    const login = async (userDetails) => {
        try {
            // Fetch full user context from the backend
            const fullContext = await userService.fetchUserContext(userDetails.userId);

            // Merge user preferences with default guest user preferences
            const mergedPreferences = {
                ...defaultGuestUser.preferences,
                ...fullContext.preferences,
                storeFields: {
                    ...defaultGuestUser.preferences.storeFields,
                    ...fullContext.preferences?.storeFields,
                },
            };

            // Parse and restructure policies into a flat map by storeId
            const policiesMap = {};
            fullContext.storePolicies?.forEach((storePolicy) => {
                policiesMap[storePolicy.storeId] = storePolicy.policies || {};
            });

            // Create user object with full context
            const userWithFullContext = {
                ...fullContext,
                preferences: mergedPreferences,
                expirationPolicies: policiesMap, // Store policies by storeId
                expirationTime: Date.now() + 15 * 60 * 1000, // Assume JWT expires in 15 minutes
            };

            // Save user details to local storage (No JWT stored)
            localStorage.setItem('user', JSON.stringify(userWithFullContext));

            // Update user context and authentication state
            setUserContext(userWithFullContext);
            setIsAuthenticated(true);

            console.log("User context initialized successfully:", userWithFullContext);
        } catch (error) {
            console.error("Error during login:", error);
        }
    };

    // Logout function
    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('authToken');
        setUserContext({ ...defaultGuestUser });
        setIsAuthenticated(false);
    };

    const fetchContext = async (userId) => {
        if (!userId) {
            console.warn('fetchContext called without a valid userId. Assuming guest user.');
            setUserContext(defaultGuestUser); // Reset to guest if no userId
            setIsAuthenticated(false);
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const context = await userService.fetchUserContext(userId); // Fetch from backend

            const mergedPreferences = {
                ...defaultGuestUser.preferences,
                ...context.preferences,
                storeFields: {
                    ...defaultGuestUser.preferences.storeFields,
                    ...context.preferences?.storeFields,
                },
            };

            const userWithMergedPreferences = {
                ...context,
                preferences: mergedPreferences,
            };

            setUserContext(userWithMergedPreferences);
            setIsAuthenticated(true);
        } catch (err) {
            console.error('Failed to fetch user context:', err);
            setError('Failed to load user context. Please try again.');
            setUserContext(defaultGuestUser); // Reset to guest on failure
            setIsAuthenticated(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user.currentStoreId) {
            fetchExpirationPolicies(user.currentStoreId);
        }
    }, [user.currentStoreId]); // Fetch policies whenever the current store changes

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('authToken');
        console.log('Stored User is:', storedUser);
        if (storedUser && storedToken) {
            const user = JSON.parse(storedUser);
            setUserContext(user);
            setIsAuthenticated(true);
            fetchContext(user.userId);
        }
    }, []);

    const getStorePolicies = (storeId) => {
        const policies = user?.expirationPolicies?.[storeId] || {};
        console.log("Policies for store ID", storeId, ":", policies);
        return policies;
    };

    // Utility: Get policies for the current store
    const getCurrentStorePolicies = () => {
        if (!currentStoreId) {
            console.warn("No current store set.");
            return {};
        }
        return getStorePolicies(currentStoreId);
    };

    // Utility: Get user preferences by key
    const getUserPreferences = (key) => user?.preferences?.[key] || null;

    // Utility: Get all stores
    const getAllStores = () => user?.stores || [];

    // Utility: Get current store
    const getCurrentStore = () =>
        user?.stores?.find((store) => store.id === user.currentStoreId) || null;

    const getCurrentStorePoliciesByType = (type) => {
        const policies = getCurrentStorePolicies();
        return policies[type] || [];
    };

    return (
        <UserContext.Provider
            value={{
                user,
                stores,
                currentStoreId,
                setCurrentStoreId,
                updatePreferences,
                isAuthenticated,
                setPreferences,
                login,
                logout,
                fetchContext,
                setUserContext,
                refreshPolicies,
                getCurrentStore,
                getCurrentStorePolicies,
                getStorePolicies,
                getUserPreferences,
                getAllStores,
                getCurrentStorePoliciesByType,
                loading,
                error,
            }}
        >
            {children}
            <SessionExpirationModal show={showSessionModal} onClose={() => setShowSessionModal(false)} />
        </UserContext.Provider>
    );
};

// Hook to Access Context
export const useUserContext = () => useContext(UserContext);
