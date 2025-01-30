import { usePageTransition } from '../../../services/navigation/animationService';
import { useContext, useEffect } from 'react';
import { AnimationContext } from '../../../context/AnimationContext';

export default function Menu({ landingPageAnim }) {

    const { handleNavigation } = usePageTransition();

    const getSlideInClass = () => {
        return landingPageAnim ? 'slideIn' : 'slideOut';
    };

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