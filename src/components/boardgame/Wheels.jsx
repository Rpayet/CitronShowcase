import { useEffect, useState, Suspense, useRef, useContext } from "react";
import { Sprite, Stage } from "@pixi/react";
import wheelSpriteSheet from '../../assets/images/sprites/Wheels_sprite-sheet_HD.png';
import { WheelContext } from "../../context/WheelContext";
import { GameContext } from "../../context/GameContext";
import SpinHandler from "./_utils/SpinHandler";

export default function Wheels({ player }) {

    const { resetSpinResult, setPlayer1, setPlayer2 } = useContext(GameContext);

    const setPlayer = (player.id === 1) ? setPlayer1 : setPlayer2;

    const { wheels, spriteDict } = useContext(WheelContext);
    
    const handleWheelResult = () => {
        // block the spin if no spin count left
        if (player.spinCount === 0) return;

        // filter checked wheels
        const checkedWheels = player.spinResult.filter(wheel => wheel.checked);

        if (checkedWheels.length === 5) {
            // reset the spin count
            setPlayer(prevState => ({ ...prevState, spinCount: 0 }))
            return;
        }
        
        // filter unchecked wheels & randomize their result
        const uncheckedWheels = player.spinResult
            .filter(wheel => !wheel.checked)
            .map(wheel => {
                const wheelIcons = wheels[wheel.id];
                const randomIndex = Math.floor(Math.random() * wheelIcons.length);
                return { ...wheel, result: wheelIcons[randomIndex] };
            });
        
            // shuffle unchecked wheels
            for (let i = uncheckedWheels.length - 1; i > 0; i--) {
                // generate a random index j such that 0 <= j <= i
                const j = Math.floor(Math.random() * (i + 1));
                // swap uncheckedWheels[i] with uncheckedWheels[j]
                [uncheckedWheels[i], uncheckedWheels[j]] = [uncheckedWheels[j], uncheckedWheels[i]];
            };

            // merge checked & unchecked wheels
            const newSpinResult = player.spinResult.map(wheel => {
                // find the checked wheel in the checkedWheels array
                const checkedWheel = checkedWheels.find(w => w.id === wheel.id);
                if (checkedWheel) {
                    // return the checked wheel at the same index
                    return checkedWheel;
                } else {
                    // return the first element of the uncheckedWheels array
                    return uncheckedWheels.shift();
                }
            });

            // update the spin result
            setPlayer(prevState => ({ ...prevState, spinResult: newSpinResult }));
    }

    // function to handle the checkbox
    const handleCheck = (id) => {
        setPlayer(prevState => ({...prevState, spinResult: prevState.spinResult.map(wheel => {
            if (wheel.id === id) {
                return { ...wheel, checked: !wheel.checked };
            }
            return wheel;   
        })}));
    };

    // function to handle the spin & decrement the spin count
    const handleSpin = () => {
        handleWheelResult();
        setPlayer(prevState =>({ ...prevState, spinCount: prevState.spinCount - 1 }));
    }
    
    // useEffect to trigger the spin on first render & cleanup
    useEffect(() => {
        handleWheelResult();
        return () => {
            setPlayer(prevState => ({...prevState, spinResult: resetSpinResult}))
        }
    }, []);

    // useEffect to end the player's turn
    useEffect(() => {
        if (player.spinCount === 0) {
            // Handler to manage the spin result
            SpinHandler({ setPlayer, player });
            setPlayer(prevState => ({...prevState, spinResult: prevState.spinResult.map(wheel => ({ ...wheel, checked: false })), spinCount: 3}))
        }
    })

    return (
        <div id={`Wheels-spinner${player.id}`}>

            <div className='wheels-row'>
                {player.spinResult.map((wheel) => {
                    return (
                        <div key={wheel.id} className='wheel'>
                            <Stage 
                                width={102.5} 
                                height={77.5} 
                                options={{ backgroundAlpha: 0 }} 
                                onClick={(player.spinCount < 3 && player.spinCount > 0) ? (() => {handleCheck(wheel.id)}) : null}>

                                    <Sprite image={wheelSpriteSheet} {...spriteDict[wheel.result]} anchor={0} scale={.25} />

                            </Stage>
                            {(player.spinCount < 3 && player.spinCount > 0) && 
                                <input type="checkbox" checked={wheel.checked} onChange={() => {handleCheck(wheel.id)} } />
                            }
                        </div>
                    )
                })}
            </div>

            <div className='wheels-trigger'>
                <button 
                    type="button"
                    className='btn-spin-trigger'
                    disabled={player.spinCount === 0} 
                    onClick={() => { handleSpin() }}>
                        Spin ({player.spinCount} left)
                </button>
            </div>

        </div>
    )
}