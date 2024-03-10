import { Sprite, Stage } from "@pixi/react";
import { useState } from "react";
import wheelSpriteSheet from '../../assets/images/sprites/Wheels_sprite-sheet_HD.png';

export default function Wheels() {

    const wheels= {
        wheel1: ['s1', 'd1', 's1', 'sp1', 'd1', 'd1', 'dp2', 'd1'],
        wheel2: ['sp1', 'd1', 's2', 'dp1', 's1', 'd1', 'd2', 'd2'],
        wheel3: ['sp1', 'd1', 'dp1', 's1', 'd1', 'd2', 's2', 'd2'],
        wheel4: ['s1', 'd1', 'sp1', 'd1', 'd2', 's1',' dp1', 'd2'],
        wheel5: ['s1', 'd1', 'd1', 'blank', 'blank', 's1', 'd1', 'blank'],
    };

    const iconParticularsDict = {
        's1': {x: 0, y: 0},
        's2': {x: -102.5, y: 0},
        's3': {x: -205, y: 0},
        'sp1': {x: -307.5, y: 0},
        'sp2': {x: -410, y: 0},
        'd1': {x: 0, y: -77.5},
        'd2': {x: -102.5, y: -77.5},
        'd3': {x: -205, y: -77.5},
        'dp1': {x: -307.5, y: -77.5},
        'dp2': {x: -410, y: -77.5},
        'h1': {x: 0, y: -155},
        'h2': {x: -102.5, y: -155},
        'h3': {x: -205, y: -155},
        'blank': {x: -307.5, y: -155},
    };

    const handleSpin = () => {
        setSpinResult([
            wheels.wheel1[Math.floor(Math.random() * wheels.wheel1.length)], 
            wheels.wheel2[Math.floor(Math.random() * wheels.wheel2.length)], 
            wheels.wheel3[Math.floor(Math.random() * wheels.wheel3.length)],
            wheels.wheel4[Math.floor(Math.random() * wheels.wheel4.length)],
            wheels.wheel5[Math.floor(Math.random() * wheels.wheel5.length)]
        ]);
    };

    const [spinResult, setSpinResult] = useState([]);

    return (
        <div>

            <div>
                {spinResult.map((icon, index) => {
                    return (
                        <Stage width={102.5} height={77.5} options={{ backgroundAlpha: 0 }}>
                            <Sprite image={wheelSpriteSheet} {...iconParticularsDict[icon]} anchor={0} scale={.25} />
                        </Stage>
                    )
                })}
            </div>

            <button onClick={() => handleSpin()} type="button">Spin</button>
        </div>
    )
}