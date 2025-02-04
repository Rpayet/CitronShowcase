import { createContext, useEffect, useState } from "react";
import Axios from "../services/server/callerService";
import lemonifylogoset from "../assets/images/statics/brand/lemonify_logoset.png";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {

    const [userIdentifier, setUserIdentifier] = useState(false);
    const [tournaments, setTournaments] = useState([]);
    const [races, setRaces] = useState([]);

    const [appTheme, setAppTheme] = useState('light');

    const [mainLoading, setMainLoading] = useState(false);

    // May be unused in the future
    // useEffect(() => {
    //     Promise.all([
    //         Axios.get('/api/race/list'),
    //         Axios.get('/api/tournament/list'),

    //     ]).then(([raceResponse, tournamentResponse]) => {
    //         setRaces(raceResponse.data);
    //         setTournaments(tournamentResponse.data);
    //         setMainLoading(false);
    //     });
    // }, []);

    const appContextValue = {
        userIdentifier, setUserIdentifier,
        tournaments, setTournaments, races, setRaces,
        mainLoading, appTheme, setAppTheme, lemonifylogoset
    };

    return (
        <AppContext.Provider value={appContextValue}>
            {children}
        </AppContext.Provider>
    );
}