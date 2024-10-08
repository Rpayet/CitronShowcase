import { createContext, useState } from "react";

export const AnimationContext = createContext();

export const AnimationProvider = ({children}) => {

    const [landingPageAnim, setLandingPageAnim] = useState(false);
    const [articlesPageAnim, setArticlesPageAnim] = useState(false);
    const [portfolioPageAnim, setPortfolioPageAnim] = useState(false);
    const [arcadePalacePageAnim, setArcadePalacePageAnim] = useState(false);
    const [loginAnimation, setLoginAnimation] = useState(true);
    const [profilAnimation, setProfilAnimation] = useState(true);

    const [mkPageAnim, setMkPageAnim] = useState(false);
    const [wheelsPageAnim, setWheelsPageAnim] = useState(false);

    const animations = {
        landing: [landingPageAnim, setLandingPageAnim],
        articles: [articlesPageAnim, setArticlesPageAnim],
        portfolio: [portfolioPageAnim, setPortfolioPageAnim],
        arcadePalace: [arcadePalacePageAnim, setArcadePalacePageAnim],
        mkTrials: [mkPageAnim, setMkPageAnim],
        wheels: [wheelsPageAnim, setWheelsPageAnim],
        login: [loginAnimation, setLoginAnimation],
        profil: [profilAnimation, setProfilAnimation],
    }

    return (
        <AnimationContext.Provider value={{animations}}>
            {children}
        </AnimationContext.Provider>
    )
}