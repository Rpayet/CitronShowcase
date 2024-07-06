import { createContext, useState } from "react";

export const AnimationContext = createContext();

export const AnimationProvider = ({children}) => {

    const [mkPageAnim, setMkPageAnim] = useState(true);

    const animationContextValue = {
        mkPageAnim, setMkPageAnim
    }

    return (
        <AnimationContext.Provider value={animationContextValue}>
            {children}
        </AnimationContext.Provider>
    )
}