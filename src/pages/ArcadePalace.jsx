import { useContext, useEffect } from "react";
import { usePageTransition } from "../services/navigation/animationService";
import { AnimationContext } from "../context/AnimationContext";
import { Outlet } from "react-router-dom";
import { DashboardContext } from "../context/DashboardContext";
import { isPageRefreshed } from "../services/navigation/navigationService";

export default function ArcadePalace() {

    const { dashboardContent } = useContext(DashboardContext);
    const { category, subcategory, sublinks } = dashboardContent;
    const { animus, setAnimus } = useContext(AnimationContext);
    const { arcadepalaceComp } = animus;
    const { navigateWithAnimation } = usePageTransition();

    const handleNavigation = (toPage) => {
        navigateWithAnimation('arcadepalace', toPage, 500);
    };

    const getSlideInClass = () => {
        return arcadepalaceComp ? 'In' : 'Out';
    };

    const updateAnimationDuration = () => {
        const linksArray = Object.keys(sublinks);
        for (let i = 0; i < linksArray.length; i++) {
            const duration = isPageRefreshed() ? "0s" : `${0.5 + (i * 0.1)}s`;
            document.documentElement.style.setProperty(`--${linksArray[i]}-animation-duration`, duration);
        }
    };
    
    useEffect(() => {
        updateAnimationDuration();
    }, [isPageRefreshed()]);

    useEffect(() => {
        setAnimus(prevState => ({
            ...prevState,
            arcadepalaceComp: (category.id === 'arcadepalace' && subcategory.id === '') ? true : false,
        }));
        return () => setAnimus(prevState => ({
                ...prevState,
                arcadepalaceComp: false,
            }));
    }, [setAnimus]);

    return (
        <section id="ArcadePalace">
            <div className="games">
                {Object.keys(sublinks).map((link) => (
                    <button 
                        key={sublinks[link].id}
                        onClick={() => handleNavigation(sublinks[link].to)} 
                        className={`game-link ${sublinks[link].id+getSlideInClass()}`}>
                        {sublinks[link].name}
                    </button>
                ))}
            </div>
            <Outlet />
        </section>
    )
}