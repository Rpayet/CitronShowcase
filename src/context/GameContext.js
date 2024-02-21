import { createContext, useState } from "react";

export const GameContext = createContext();

export default function GameProvider({ children }) {

    const [player1, setPlayer1] = useState({
        rank : '',
        diamond : {
            hero: {},
            rod: 0,
            exp: 0,
        },
        square: {
            hero: {},
            rod: 0,
            exp: 0,
        },
        crown: 10,
        bulwark: 0,
    });

    const [player2, setPlayer2] = useState({
        rank : '',
        diamond : {
            hero: {},
            rod: 0,
            exp: 0,
        },
        square: {
            hero: {},
            rod: 0,
            exp: 0,
        },
        crown: 10,
        bulwark: 0,
    });


    return (
        <GameContext.Provider value={{player1, setPlayer1, player2, setPlayer2}}>
            {children}
        </GameContext.Provider>
    );
}