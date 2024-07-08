import { createContext, useState } from "react";

export const AnimationContext = createContext();

export const AnimationProvider = ({children}) => {

    const [mkPageAnim, setMkPageAnim] = useState(false);

    const animationContextValue = {
        mkPageAnim, setMkPageAnim
    }

    return (
        <AnimationContext.Provider value={animationContextValue}>
            {children}
        </AnimationContext.Provider>
    )
}