export const getStoreType = (user) => {
    const { currentStoreId, stores } = user;

    // Find the store object for the current store ID
    const currentStore = stores.find((store) => store.id === currentStoreId);

    // Return the store type or a default value if not found
    return currentStore ? currentStore.storeType : null;
};
