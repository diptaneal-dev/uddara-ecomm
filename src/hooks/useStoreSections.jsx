export const useStoreSections = (storeId) => {
    const [sections, setSections] = useState([]);
  
    useEffect(() => {
      async function fetchSections() {
        try {
          const response = await fetch(`/api/sections/${storeId}`);
          if (!response.ok) throw new Error("Failed to fetch sections");
          const data = await response.json();
          setSections(data);
        } catch (error) {
          console.error("Error loading sections:", error);
        }
      }
      fetchSections();
    }, [storeId]);
  
    return sections;
  };
  