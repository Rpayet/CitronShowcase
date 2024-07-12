import { useContext } from "react";
import { AnimationContext } from "../../context/AnimationContext";
import { useNavigate } from "react-router-dom";

export const usePageTransition = () => {

    const { animations } = useContext(AnimationContext);
    const navigate = useNavigate();

    const navigateWithAnimation = (fromPage, toPage, timeout=500) => {
        if (fromPage === toPage) return;

        const [_, setFromPageAnim] = animations[fromPage];
        const [__, setToPageAnim] = animations[toPage];

        setFromPageAnim(false);
        setToPageAnim(true);
        setTimeout(() => {
            navigate(`/${toPage}`);
        }, timeout);
    };

    return { navigateWithAnimation };

}