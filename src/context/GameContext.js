import { createContext, useState } from "react";
import heroes from '../utils/_test-assets/heroes_data.json';

export const GameContext = createContext();

export default function GameProvider({ children }) {

    const heroesList = Object.values(heroes);

    const [player1, setPlayer1] = useState({
        id: 1,
        rank : '',
        square: {
            hero: heroesList[0],
            hero_rank: 'bronze',
            rod: 0,
            exp: 0,
        },
        diamond : {
            hero: heroesList[1],
            hero_rank: 'bronze',
            rod: 0,
            exp: 0,
        },
        crown: 10,
        bulwark: 0,
    });

    const [player2, setPlayer2] = useState({
        id: 2,
        rank : '',
        square: {
            hero: {},
            hero_rank: 'bronze',
            rod: 0,
            exp: 0,
        },
        diamond : {
            hero: {},
            hero_rank: 'bronze',
            rod: 0,
            exp: 0,
        },
        crown: 10,
        bulwark: 0,
    });

    // spin default state
    const resetSpinResult = [
        {id: 1, result: '', checked: false},
        {id: 2, result: '', checked: false},
        {id: 3, result: '', checked: false},
        {id: 4, result: '', checked: false},
        {id: 5, result: '', checked: false},
    ];

    // states
    const [spinResult, setSpinResult] = useState(resetSpinResult);
    const [spinCount, setSpinCount] = useState(3);

    return (
        <GameContext.Provider value={{
            player1, setPlayer1, 
            player2, setPlayer2,
            spinResult, setSpinResult,
            spinCount, setSpinCount,
            resetSpinResult,
            }}>
            {children}
        </GameContext.Provider>
    );
}