import { createContext } from "react";
import tounamentsList from '../utils/_test-assets/mk_tournament_list.json';
import switchCardSprites from '../assets/images/sprites/cardriges_spritesheet.png';

export const MkContext = createContext();

export const MkProvider = ({children}) => {

    const tournaments = Object.values(tounamentsList);

    const mkContextValue = {
        // Add the mk context values here
        switchCardSprites,
        tournaments,
    }

    return (
        <MkContext.Provider value={mkContextValue}>
            {children}
        </MkContext.Provider>
    )
}