export const getStoreCurrency = (user, defaultCurrency = "USD") => {

    const { currentStoreId, stores } = user;

    // Find the store object for the current store ID
    const currentStore = stores.find((store) => store.id === currentStoreId);
    return currentStore?.currency || defaultCurrency;
};
