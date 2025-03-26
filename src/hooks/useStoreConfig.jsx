import React, { useState, useEffect } from 'react';
import SiteSpecificService from '../services/SiteSpecificService';

export const useStoreConfig = (storeId) => {
    const [config, setConfig] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      async function fetchConfig() {
        if (!storeId) return;
  
        setIsLoading(true);
        setError(null);
  
        try {
          const data = await SiteSpecificService.getStoreConfig(storeId);

          // ✅ Ensure sections, header, and footer are correctly parsed
          const parsedConfig = {
            ...data,
            header: data.header ? JSON.parse(data.header) : {}, 
            sections: data.sections ? JSON.parse(data.sections) : [],
            footer: data.footer ? JSON.parse(data.footer) : {}
          };
  
          setConfig(parsedConfig); 
        } catch (err) {
          console.error("Error loading store config:", err);
          setError(err.response?.data?.message || "Failed to fetch store configuration");
        } finally {
          setIsLoading(false);
        }
      }
  
      fetchConfig();
    }, [storeId]);
  
    return { config, isLoading, error };
  };
  