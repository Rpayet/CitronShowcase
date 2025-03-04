import { useContext } from "react";
import { AnimationContext } from "../../context/AnimationContext";
import { useNavigate } from "react-router-dom";
import getUrl from "./urlService";
import { DashboardContext } from "../../context/DashboardContext";

export const usePageTransition = () => {

    const { animus, setAnimus } = useContext(AnimationContext);
    const { dashboardContent } = useContext(DashboardContext);
    const { category, subcategory } = dashboardContent;

    const navigate = useNavigate();

    const navigateWithAnimation = (fromPage, toPage, timeout=500) => {
        if (fromPage === toPage) return;

        const isLanding = (page) => page === 'lemonify';
        const isLeavingLanding = isLanding(fromPage) && !isLanding(toPage);
        const isNavigatingBetweenPages = !isLanding(fromPage) && !isLanding(toPage);

        setAnimus(prevState => ({
            ...prevState,
            [fromPage+'Comp']: false,
            [toPage+'Comp']: true,
            bgPattern: {
                ...animus.bgPattern,
                state: true,
            }
        }));

        setTimeout(() => {
            navigate(getUrl(toPage));
            setAnimus(prevState => ({
                ...prevState,
                bgPattern: {
                    state: false,
                    pattern: toPage,
                }
            }));

        }, timeout);
    };

    const handleNavigation = (toPage) => {
        const fromPage = subcategory.to === '' ? category.to : subcategory.to;
        navigateWithAnimation(fromPage, toPage, 500);
    };

    return { navigateWithAnimation, handleNavigation };

}