export const getStoreLocation = (user) => {
    const { currentStoreId, stores } = user;

    // Find the store object for the current store ID
    const currentStore = stores.find((store) => store.id === currentStoreId);

    // If the current store exists, extract the first address and get the country and state
    if (currentStore && currentStore.addresses && currentStore.addresses.length > 0) {
        const primaryAddress = currentStore.addresses[0]; // Assuming the first address is the primary one
        return {
            country: primaryAddress.country || null,
            state: primaryAddress.state || null,
        };
    }

    // Return null if no current store or addresses are found
    return { country: null, state: null };
};
