import { useState, useEffect } from 'react';
import productService from '../api/ProductService';
import menuService from '../api/MenuService';

const useCategorySubcategory = ({ storeId, menuId, categoryType }) => {
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [filteredSubcategories, setFilteredSubcategories] = useState([]);
    const [menus, setMenus] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            if (!storeId || !categoryType) return;

            try {
                // Fetch categories and subcategories
                const categoryResponse = await productService.getCategoriesByStore(storeId);
                const fetchedCategories = categoryResponse
                    .filter((cat) => cat.categoryType === categoryType && !cat.subcategory)
                    .map((cat) => ({ id: cat.id, name: cat.name }));

                const fetchedSubcategories = categoryResponse
                    .filter((cat) => cat.categoryType === categoryType && cat.subcategory)
                    .map((subcat) => ({
                        id: subcat.id,
                        name: subcat.name,
                        parentId: subcat.parentId,
                    }));

                setCategories(fetchedCategories);
                setSubcategories(fetchedSubcategories);

                // Fetch menus
                const menuResponse = await menuService.getMenusByStoreId(storeId);
                setMenus(menuResponse.map((menu) => ({ id: menu.id, name: menu.name })));
    
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [storeId, categoryType]);
    

    const handleCategoryChange = (categoryId, setFormData) => {
        const selectedCategory = categories.find((cat) => cat.id === Number(categoryId));
        setFormData((prev) => ({
            ...prev,
            categoryId: Number(categoryId),
            categoryName: selectedCategory?.name || '',
            subcategoryId: 0, // Reset subcategory selection
            subcategoryName: '', // Clear subcategory name
        }));

        // Filter subcategories for the selected category
        const subcategoriesForCategory = subcategories.filter(
            (subcat) => subcat.parentId === Number(categoryId)
        );
        setFilteredSubcategories(subcategoriesForCategory);
    };

    const handleSubcategoryChange = (subcategoryId, setFormData) => {
        const selectedSubcategory = subcategories.find((sub) => sub.id === Number(subcategoryId));
        setFormData((prev) => ({
            ...prev,
            subcategoryId: Number(subcategoryId),
            subcategoryName: selectedSubcategory?.name || '',
        }));
    };

    return {
        menus,
        categories,
        filteredSubcategories,
        handleCategoryChange,
        handleSubcategoryChange,
    };
};

export default useCategorySubcategory;
