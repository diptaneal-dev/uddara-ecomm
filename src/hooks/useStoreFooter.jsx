export const useStoreFooter = (storeId) => {
    const [footer, setFooter] = useState(null);
  
    useEffect(() => {
      async function fetchFooter() {
        try {
          const response = await fetch(`/api/footer/${storeId}`);
          if (!response.ok) throw new Error("Failed to fetch footer");
          const data = await response.json();
          setFooter(data);
        } catch (error) {
          console.error("Error loading footer:", error);
        }
      }
      fetchFooter();
    }, [storeId]);
  
    return footer;
  };
  