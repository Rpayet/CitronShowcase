import { useContext } from "react";
import { AnimationContext } from "../../context/AnimationContext";
import { useHistory } from "react-router-dom";

export const usePageTransition = () => {

    const { animations } = useContext(AnimationContext);
    const history = useHistory();

    const navigateWithAnimation = (fromPage, toPage, timeout=500) => {
        if (fromPage === toPage) return;

        const [_, setFromPageAnim] = animations[fromPage];
        const [__, setToPageAnim] = animations[toPage];

        setFromPageAnim(false);
        setTimeout(() => {
            setToPageAnim(true);
            history.push(`/${toPage}`);
        }, timeout);
    };

    return { navigateWithAnimation };

}