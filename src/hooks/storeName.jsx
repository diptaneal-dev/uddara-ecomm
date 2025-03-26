export const getStoreName = (user) => {
    const { currentStoreId, stores } = user;
    // Convert currentStoreId to a number for comparison
    const currentStore = stores.find((store) => store.id === Number(currentStoreId));

    // Return the store name or a default value if not found
    return currentStore ? currentStore.storeName : 'Store not found';
};
