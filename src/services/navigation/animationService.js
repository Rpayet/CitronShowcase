import { useContext } from "react";
import { AnimationContext } from "../../context/AnimationContext";
import { useNavigate } from "react-router-dom";
import getUrl from "./urlService";
import { DashboardContext } from "../../context/DashboardContext";

export const usePageTransition = () => {

    const { animations } = useContext(AnimationContext);
    const { dashboardContent } = useContext(DashboardContext);
    const { category, subcategory } = dashboardContent;

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

        setDashboardAnim(category.id === 'lemonify' ? false : true);

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
        const fromPage = subcategory.id === '' ? category.id : subcategory.id;
        navigateWithAnimation(fromPage, toPage, 500);
    };

    return { navigateWithAnimation, handleNavigation };

}