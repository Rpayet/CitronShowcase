import { createContext } from "react";

import mk_tournaments_list from '../utils/_test-assets/mk_tournaments_list.json';

export const MkContext = createContext();

export const MkProvider = ({children}) => {

    const tournaments = Object.values(mk_tournaments_list);

    const mkContextValue = {
        // Add the mk context values here
        tournaments,
    }

    return (
        <MkContext.Provider value={mkContextValue}>
            {children}
        </MkContext.Provider>
    )
}