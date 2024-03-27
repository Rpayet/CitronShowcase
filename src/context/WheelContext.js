import { createContext, useState } from "react";

export const WheelContext = createContext();

export default function WheelProvider({ children }) {

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

    // wheels content dictionary
    const wheels= {
        1: ['s1', 'd1', 's1', 'sp1', 'd1', 'h1', 'dp2', 'h1'],
        2: ['sp1', 'd1', 's2', 'dp1', 's1', 'h1', 'd2', 'h2'],
        3: ['sp1', 'd1', 'dp1', 's1', 'd1', 'h2', 's2', 'h2'],
        4: ['s1', 'd1', 'sp1', 'd1', 'h2', 's1',' dp1', 'h2'],
        5: ['s1', 'd1', 'h1', 'blank', 'blank', 's1', 'd1', 'blank'],
    };

    // spritesheet position dictionary
    const spriteDict = {
        's1': {x: 0, y: 0}, 's2': {x: -102.5, y: 0}, 's3': {x: -205, y: 0},
        'sp1': {x: -307.5, y: 0}, 'sp2': {x: -410, y: 0},
        'd1': {x: 0, y: -77.5}, 'd2': {x: -102.5, y: -77.5}, 'd3': {x: -205, y: -77.5},
        'dp1': {x: -307.5, y: -77.5}, 'dp2': {x: -410, y: -77.5},
        'h1': {x: 0, y: -155}, 'h2': {x: -102.5, y: -155}, 'h3': {x: -205, y: -155},
        'blank': {x: -307.5, y: -155},
    };

    const wheelValues = {
        spinResult, setSpinResult, spinCount, setSpinCount,
        wheels, spriteDict,
    }

    return (
        <WheelContext.Provider value={wheelValues}>
            {children}
        </WheelContext.Provider>
    );

}