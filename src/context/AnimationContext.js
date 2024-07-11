import { createContext, useState } from "react";

export const AnimationContext = createContext();

export const AnimationProvider = ({children}) => {

    const [mkPageAnim, setMkPageAnim] = useState(false);
    const [landingPageAnim, setLandingPageAnim] = useState(false);

    const animations = {
        mkPage: [mkPageAnim, setMkPageAnim],
        landingPage: [landingPageAnim, setLandingPageAnim],
    }

    return (
        <AnimationContext.Provider value={{animations}}>
            {children}
        </AnimationContext.Provider>
    )
}