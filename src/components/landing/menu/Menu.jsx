import { usePageTransition } from '../../../services/navigation/animationService';
import { useContext, useEffect } from 'react';
import { AnimationContext } from '../../../context/AnimationContext';
import { isPageRefreshed } from '../../../services/navigation/navigationService';

export default function Menu() {

    const { animus } = useContext(AnimationContext);
    const { lemonifyComp } = animus;

    const { handleNavigation } = usePageTransition();

    const getSlideInClass = () => {
        return lemonifyComp ? 'slideIn' : 'slideOut';
    };

    const getAnimationDurationStyle = (value) => {
        if (isPageRefreshed()) return {
            animationDuration: '0s',
        };
        return {
            animationDuration: `${value}s`,	
        };
    };

    const updateAnimationDuration = () => {
            const duration = isPageRefreshed() ? "0s" : ".5s";
            document.documentElement.style.setProperty("--menu-animation-duration", duration);
        };
        
    useEffect(() => {
        updateAnimationDuration();
    }, [isPageRefreshed()]); 

    return (
        <div id='Menu'>
            <button 
                id='latest'
                className={`latest ${getSlideInClass()}`}
                onClick={() => handleNavigation('latest')}>
                    Actualités
            </button>
            <button 
                id='articles'
                className={`articles ${getSlideInClass()}`}
                onClick={() => handleNavigation('articles')}>
                    Articles
            </button>
            <button 
                id='portfolio'
                className={`portfolio ${getSlideInClass()}`}
                onClick={() => handleNavigation('portfolio')}>
                    Portefolio
            </button>
            <button 
                id='arcadepalace'
                className={`arcade ${getSlideInClass()}`}
                onClick={() => handleNavigation('arcadepalace')}>
                    Arcade Palace
            </button>
        </div>
    )
}