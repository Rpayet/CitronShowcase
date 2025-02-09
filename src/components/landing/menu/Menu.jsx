import { usePageTransition } from '../../../services/navigation/animationService';
import { useContext } from 'react';
import { AnimationContext } from '../../../context/AnimationContext';
import { isPageRefreshed } from '../../../services/navigation/navigationService';

export default function Menu({ landingPageAnim }) {

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

    return (
        <div id='Menu'>
            <button 
                id='latest'
                className={`latest ${getSlideInClass()}`}
                style={getAnimationDurationStyle(0.5)}
                onClick={() => handleNavigation('latest')}>
                    Actualités
            </button>
            <button 
                id='articles'
                className={`articles ${getSlideInClass()}`}
                style={getAnimationDurationStyle(0.5)}
                onClick={() => handleNavigation('articles')}>
                    Articles
            </button>
            <button 
                id='portfolio'
                className={`portfolio ${getSlideInClass()}`}
                style={getAnimationDurationStyle(0.5)}
                onClick={() => handleNavigation('portfolio')}>
                    Portefolio
            </button>
            <button 
                id='arcadepalace'
                className={`arcade ${getSlideInClass()}`}
                style={getAnimationDurationStyle(0.6)}
                onClick={() => handleNavigation('arcadepalace')}>
                    Arcade Palace
            </button>
        </div>
    )
}