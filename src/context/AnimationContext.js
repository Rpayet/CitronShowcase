import { createContext, useContext, useState } from "react";
import { DashboardContext } from "./DashboardContext";

export const AnimationContext = createContext();

export const AnimationProvider = ({children}) => {

    const { dashboardContent } = useContext(DashboardContext);
    const { category, subcategory } = dashboardContent;

    const fromPage = subcategory.to === '' ? category.to : subcategory.to;

    const [animus, setAnimus] = useState({
        dashboardComp: {
            open: false,
            transition: false,
        },
        lemonifyComp: false,
        articlesComp: false,
        portfolioComp: false,
        arcadepalaceComp: false,
        mktrialsComp: false,
        wheelsComp: false,
        loginComp: true,
        profilComp: true,
        bgPattern: {
            state: false,
            pattern: fromPage
        }
    });

    return (
        <AnimationContext.Provider value={{animus, setAnimus}}>
            {children}
        </AnimationContext.Provider>
    )
}