import { useContext, useEffect } from "react";
import { usePageTransition } from "../services/navigation/animationService";
import { AnimationContext } from "../context/AnimationContext";
import { Outlet } from "react-router-dom";

export default function ArcadePalace() {

    const fromPage = window.location.pathname.split('/').pop();

    const { animations } = useContext(AnimationContext);
    const { navigateWithAnimation } = usePageTransition();

    const [arcadePalacePageAnim, setArcadePalacePageAnim] = animations.arcadepalace;

    const handleNavigation = (toPage) => {
        navigateWithAnimation('arcadepalace', toPage, 500);
    };

    const getSlideInClass = () => {
        return arcadePalacePageAnim ? 'slideIn' : 'slideOut';
    };

    const getAnimationDurationStyle = (index) => {
        return {
            animationDuration: `${0.5 + (index * 0.1)}s`,
        };
    };

    useEffect(() => {
        setArcadePalacePageAnim(fromPage === 'arcadepalace' ? true : false);
        return () => setArcadePalacePageAnim(false);
    }, [setArcadePalacePageAnim]);

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