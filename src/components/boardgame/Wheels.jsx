import { useState } from "react";
import { FaDiamond, FaSquare, FaHammer } from "react-icons/fa6";

export default function Wheels() {

    const wheels= {
        wheel1: ['S', 'D', 'S', 'S+', 'D', 'H', 'DD+', 'H'],
        wheel2: ['S+', 'D', 'SS', 'D+', 'S', 'H', 'DD', 'HH'],
        wheel3: ['S+', 'D', 'D+', 'S', 'D', 'HH', 'SS', 'HH'],
        wheel4: ['S', 'D', 'S+', 'D', 'HH', 'S',' D+', 'HH'],
        wheel5: ['S', 'D', 'H', '', '', 'S', 'D', ''],
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

    const iconDisplay = (icon) => {
        switch(icon) {
            case 'S':
                return <FaSquare />;
            case 'S+':
                return <><FaSquare />*</>;
            case 'D':
                return <FaDiamond />;
            case 'D+':
                return <><FaDiamond />*</>;
            case 'H':
                return <FaHammer />;
            case 'HH':
                return <FaHammer />;
            case 'SS':
                return <><FaSquare /><FaSquare /></>;
            case 'SS+':
                return <><FaSquare /><FaSquare />*</>;
            case 'DD':
                return <><FaDiamond /><FaDiamond /></>;
            case 'DD+':
                return <><FaDiamond /><FaDiamond />*</>;
            case '' :
                return null;
            default:
                return <FaSquare />;
        }
    }

    return (
        <div>
            <div>
                {spinResult.map((icon, index) => {
                    return <span key={index}>{iconDisplay(icon)}</span>
                })}
            </div>

            <button onClick={() => handleSpin()} type="button">Spin</button>
        </div>
    )
}