import { useHistory } from "react-router-dom";

export const usePageTransition = () => {

    const history = useHistory();

    const navigateWithAnimation = (fromPage, toPage, timeout) => {
        if (fromPage === toPage) return;


    };

    return { navigateWithAnimation };

}