import { useContext, useEffect } from "react";
import { usePageTransition } from "../services/navigation/animationService";
import { AnimationContext } from "../context/AnimationContext";
import { Outlet } from "react-router-dom";
import { DashboardContext } from "../context/DashboardContext";
import { isPageRefreshed } from "../services/navigation/navigationService";

export default function ArcadePalace() {

    const { dashboardContent } = useContext(DashboardContext);
    const { category, subcategory } = dashboardContent;
    const { animus, setAnimus } = useContext(AnimationContext);
    const { arcadepalaceComp } = animus;
    const { navigateWithAnimation } = usePageTransition();

    const handleNavigation = (toPage) => {
        navigateWithAnimation('arcadepalace', toPage, 500);
    };

    const getSlideInClass = () => {
        return arcadepalaceComp ? 'slideIn' : 'slideOut';
    };

    const getAnimationDurationStyle = (index) => {
        if (isPageRefreshed()) return {
            animationDuration: '0s',
        };
        return {
            animationDuration: `${0.5 + (index * 0.1)}s`,
        };
    };

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
                <button 
                    onClick={() => handleNavigation('mktrials')} 
                    className={`game-link ${getSlideInClass()}`}
                    style={getAnimationDurationStyle(0)}>
                    Mario Kart - Concours contre-la-montre
                </button>
                <button 
                    onClick={() => handleNavigation('wheels')} 
                    className={`game-link ${getSlideInClass()}`}
                    style={getAnimationDurationStyle(1)}>
                    Roulettes - Adaptation du mini-jeu de "Sea of Stars"
                </button>
                <button 
                    onClick={() => handleNavigation('sonictactoe')} 
                    className={`game-link ${getSlideInClass()}`}
                    style={getAnimationDurationStyle(2)}>
                    STT - Jeu original en cours de travail
                </button>
            </div>
            <Outlet />
        </section>
    )
}