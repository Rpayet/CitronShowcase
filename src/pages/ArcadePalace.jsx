import { useContext, useEffect } from "react";
import { usePageTransition } from "../services/navigation/animationService";
import { AnimationContext } from "../context/AnimationContext";

export default function ArcadePalace() {

    const { animations } = useContext(AnimationContext);
    const { navigateWithAnimation } = usePageTransition();

    const [arcadePalacePageAnim, setArcadePalacePageAnim] = animations.arcadePalace;

    const handleNavigation = (toPage) => {
        navigateWithAnimation('arcadePalace', toPage, 500);
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
        setArcadePalacePageAnim(true);
        return () => setArcadePalacePageAnim(false);
    }, [setArcadePalacePageAnim]);

    return (
        <section id="ArcadePalace">
            <div className="games">
                <button 
                    onClick={() => handleNavigation('mkTrials')} 
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
                    onClick={() => handleNavigation('sonicTT')} 
                    className={`game-link ${getSlideInClass()}`}
                    style={getAnimationDurationStyle(2)}>
                    STT - Jeu original en cours de travail
                </button>
            </div>
        </section>
    )
}