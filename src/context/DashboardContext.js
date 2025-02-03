import { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import dashboard from "../utils/_test-assets/dashboard.json";

export const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {

    const location = useLocation();

    const [currentCategory, setCurrentCategory] = useState(location.pathname.split('/')[1] || '');
    const [currentSubcategory, setCurrentSubcategory] = useState(location.pathname.split('/')[2] || '');

    const [dashboardContent, setDashboardContent] = useState({
        category: '',
        subcategory: '',
        description: '',
    });

    useEffect(() => {
        setCurrentCategory(location.pathname.split('/')[1]);
        setCurrentSubcategory(location.pathname.split('/')[2]);
        if (currentCategory !== '') {
            setDashboardContent({
                category: dashboard[currentCategory].name|| '',
                subcategory: dashboard[currentCategory].sublink[currentSubcategory].name || '',
                description: dashboard[currentCategory].sublink[currentSubcategory] 
                    ? dashboard[currentCategory].sublink[currentSubcategory].description 
                    : dashboard[currentCategory].description,
            });
        }
    }, [location, currentCategory, currentSubcategory]);

    return (
        <DashboardContext.Provider value={{dashboardContent}}>
            {children}
        </DashboardContext.Provider>
    )
};