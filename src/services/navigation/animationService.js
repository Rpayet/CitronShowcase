import { useContext } from "react";
import { AnimationContext } from "../../context/AnimationContext";
import { useNavigate } from "react-router-dom";

export const usePageTransition = () => {

    const { animations } = useContext(AnimationContext);
    const navigate = useNavigate();

    const navigateWithAnimation = (fromPage, toPage, timeout=500) => {
        if (fromPage === toPage) return;

        const [_, setFromPageAnim] = animations[(fromPage === '') ? 'landing' : fromPage];
        const [__, setToPageAnim] = animations[(toPage === '') ? 'landing' : toPage];
        const [___, setBgPatternAnim] = animations.bgPattern;

        setFromPageAnim(false);
        setToPageAnim(true);
        setBgPatternAnim(
            prevState => ({
                ...prevState,
                state: true,
            })
        );
        setTimeout(() => {
            if (fromPage === '') {
                navigate(`/`);
            } else {
                navigate(`/${toPage}`);
            }
            setBgPatternAnim(
                prevState => ({
                    ...prevState,
                    state: false,
                    pattern: (toPage === '') ? 'landing' : toPage,
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