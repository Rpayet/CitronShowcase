import { createContext, useContext, useState } from "react";
import { DashboardContext } from "./DashboardContext";

export const AnimationContext = createContext();

export const AnimationProvider = ({children}) => {

    const { dashboardContent } = useContext(DashboardContext);
    const { category, subcategory } = dashboardContent;

    const fromPage = subcategory.id === '' ? category.id : subcategory.id;

    const [dashboardAnim, setDashboardAnim] = useState(false);
    
    const [landingPageAnim, setLandingPageAnim] = useState(false);
    const [articlesPageAnim, setArticlesPageAnim] = useState(false);
    const [portfolioPageAnim, setPortfolioPageAnim] = useState(false);
    const [arcadePalacePageAnim, setArcadePalacePageAnim] = useState(false);
    const [bgAnimation, setBgAnimation] = useState({
        state: false,
        pattern: fromPage
    });
    const [loginAnimation, setLoginAnimation] = useState(true);
    const [profilAnimation, setProfilAnimation] = useState(true);

    const [mkPageAnim, setMkPageAnim] = useState(false);
    const [wheelsPageAnim, setWheelsPageAnim] = useState(false);

    const animations = {
        dashboard: [dashboardAnim, setDashboardAnim],
        lemonify: [landingPageAnim, setLandingPageAnim],
        articles: [articlesPageAnim, setArticlesPageAnim],
        portfolio: [portfolioPageAnim, setPortfolioPageAnim],
        arcadepalace: [arcadePalacePageAnim, setArcadePalacePageAnim],
        mktrials: [mkPageAnim, setMkPageAnim],
        wheels: [wheelsPageAnim, setWheelsPageAnim],
        login: [loginAnimation, setLoginAnimation],
        profil: [profilAnimation, setProfilAnimation],
        bgPattern: [bgAnimation, setBgAnimation],
    }

    return (
        <AnimationContext.Provider value={{animations}}>
            {children}
        </AnimationContext.Provider>
    )
}