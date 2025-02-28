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

        setAnimus(prevState => ({
            ...prevState,
            [fromPage+'Comp']: false,
            [toPage+'Comp']: true,
            dashboard: category.id === 'lemonify' ? false : true,
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

        }, (fromPage === 'lemonify' || toPage === 'lemonify') ? 0 : timeout);
    };

    const handleNavigation = (toPage) => {
        const fromPage = subcategory.id === '' ? category.id : subcategory.id;
        navigateWithAnimation(fromPage, toPage, 500);
    };

    return { navigateWithAnimation, handleNavigation };

}