import { Sprite, Stage } from "@pixi/react";
import { useEffect, useState } from "react";
import wheelSpriteSheet from '../../assets/images/sprites/Wheels_sprite-sheet_HD.png';

export default function Wheels() {

    const wheels= {
        1: ['s1', 'd1', 's1', 'sp1', 'd1', 'd1', 'dp2', 'd1'],
        2: ['sp1', 'd1', 's2', 'dp1', 's1', 'd1', 'd2', 'd2'],
        3: ['sp1', 'd1', 'dp1', 's1', 'd1', 'd2', 's2', 'd2'],
        4: ['s1', 'd1', 'sp1', 'd1', 'd2', 's1',' dp1', 'd2'],
        5: ['s1', 'd1', 'd1', 'blank', 'blank', 's1', 'd1', 'blank'],
    };

    const spriteDict = {
        's1': {x: 0, y: 0}, 's2': {x: -102.5, y: 0}, 's3': {x: -205, y: 0},
        'sp1': {x: -307.5, y: 0}, 'sp2': {x: -410, y: 0},
        'd1': {x: 0, y: -77.5}, 'd2': {x: -102.5, y: -77.5}, 'd3': {x: -205, y: -77.5},
        'dp1': {x: -307.5, y: -77.5}, 'dp2': {x: -410, y: -77.5},
        'h1': {x: 0, y: -155}, 'h2': {x: -102.5, y: -155}, 'h3': {x: -205, y: -155},
        'blank': {x: -307.5, y: -155},
    };

    const handleSpin = () => {
        const randomSpinResult = Object.values(wheels).map(wheel => wheel[Math.floor(Math.random() * wheel.length)]);
        setSpinResult(randomSpinResult);
    };

    const [spinResult, setSpinResult] = useState([]);

    useEffect(() => {
        handleSpin();
        return () => {
            setSpinResult([]);
        }
    }, []);

    return (
        <div>

            <div>
                {spinResult.map((icon, index) => {
                    return (
                        <Stage key={index} width={102.5} height={77.5} options={{ backgroundAlpha: 0 }}>
                            <Sprite image={wheelSpriteSheet} {...spriteDict[icon]} anchor={0} scale={.25} />
                        </Stage>
                    )
                })}
            </div>

            <button onClick={() => handleSpin()} type="button">Spin</button>
        </div>
    )
}