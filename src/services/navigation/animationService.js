import { useContext } from "react";
import { AnimationContext } from "../../context/AnimationContext";
import { useNavigate } from "react-router-dom";
import getUrl from "./urlService";

export const usePageTransition = () => {

    const { animations } = useContext(AnimationContext);
    const navigate = useNavigate();

    const navigateWithAnimation = (fromPage, toPage, timeout=500) => {
        if (fromPage === toPage) return;

        const [_, setFromPageAnim] = animations[fromPage];
        const [__, setToPageAnim] = animations[toPage];
        const [___, setBgPatternAnim] = animations.bgPattern;
        const [____, setDashboardAnim] = animations.dashboard;

        setFromPageAnim(false);
        setToPageAnim(true);
        setBgPatternAnim(
            prevState => ({
                ...prevState,
                state: true,
            })
        );

        if (toPage === '') {
            setDashboardAnim(false);
        } 

        setTimeout(() => {
          
            navigate(getUrl(toPage));
            
            setBgPatternAnim(
                prevState => ({
                    ...prevState,
                    state: false,
                    pattern: toPage,
                })
            );
        }, timeout);
    };

    const handleNavigation = (toPage) => {
        const fromPage = window.location.pathname.split('/')[1];
        if (fromPage === '') {
            navigateWithAnimation('landing', toPage, 500);
        } else {
            navigateWithAnimation(fromPage, toPage, 500);
        }
    };

    return { navigateWithAnimation, handleNavigation };

}