import { createContext, useMemo } from "react";
import { useLocation } from "react-router-dom";
import dashboard from "../utils/_test-assets/dashboard.json";

export const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
    const location = useLocation();

    const currentCategory = location.pathname.split('/')[1] === "" ? "lemonify" : location.pathname.split('/')[1];
    const currentSubcategory = location.pathname.split('/')[2] || "";

    // Optimisation avec useMemo pour éviter des recalculs inutiles
    const dashboardContent = useMemo(() => {

        const categoryData = dashboard[currentCategory];
        const subcategoryData = categoryData.sublink?.[currentSubcategory];

        return {
            navigation: Object.keys(dashboard).map(key => ({ 
                key: key,
                id: dashboard[key].id, 
                name: dashboard[key].name,
                to: dashboard[key].to,
            })) || '',
            category: {
                id: categoryData.id || '',
                name: categoryData.name || '',
                to: categoryData.to || '',
            },
            subcategory: {
                id: subcategoryData?.id || '',
                name: subcategoryData?.name || '',
                to: subcategoryData?.to || '',
            },
            description: subcategoryData?.description || categoryData.description || '',
            sublinks: dashboard[currentCategory].sublink || {}
        };
    }, [currentCategory, currentSubcategory]);

    return (
        <DashboardContext.Provider value={{ dashboardContent }}>
            {children}
        </DashboardContext.Provider>
    );
};
