import { createContext, useEffect, useState } from "react";
import heroes from '../utils/_test-assets/heroes_data.json';
import SpinHandler from "../components/arcade/wheels/_utils/SpinHandler";

export const GameContext = createContext();

export default function GameProvider({ children }) {

    const heroesList = Object.values(heroes);

    // spin default state
    const resetSpinResult = [
        {id: 1, result: '', checked: false},
        {id: 2, result: '', checked: false},
        {id: 3, result: '', checked: false},
        {id: 4, result: '', checked: false},
        {id: 5, result: '', checked: false},
    ];

    const defaultPlayer = {
        rank : '',
        square: {
            hero: heroesList[0],
            hero_rank: 'bronze',
            rod: 0,
            exp: 0,
        },
        diamond : {
            hero: heroesList[2],
            hero_rank: 'bronze',
            rod: 0,
            exp: 0,
        },
        crown: 10,
        bulwark: 0,
        spinResult: resetSpinResult,
        spinCount: 3, 
    }

    const [player1, setPlayer1] = useState({...defaultPlayer, id: 1});

    const [player2, setPlayer2] = useState({...defaultPlayer, id: 2});

    const [history, setHistory] = useState([]);

    useEffect(() => {
        if (player1.spinCount === 0 && player2.spinCount === 0) {
            setHistory([]);
            SpinHandler({ setPlayer: setPlayer1, player: player1, setHistory });
            SpinHandler({ setPlayer: setPlayer2, player: player2, setHistory });
            setPlayer1(prevState => ({...prevState, spinResult: prevState.spinResult.map(wheel => ({ ...wheel, checked: false })), spinCount: 3}));
            setPlayer2(prevState => ({...prevState, spinResult: prevState.spinResult.map(wheel => ({ ...wheel, checked: false })), spinCount: 3}));
        }
    }, [player1, player2]);

    return (
        <GameContext.Provider value={{
            player1, setPlayer1, 
            player2, setPlayer2,
            resetSpinResult, history,
            }}>
            {children}
        </GameContext.Provider>
    );
}