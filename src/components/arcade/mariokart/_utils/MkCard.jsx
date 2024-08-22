import { useContext, useEffect, useState } from "react";
import { getTimeRemaining } from "../../../../services/mariokart/delayService";
import { AiOutlineClockCircle } from 'react-icons/ai';
import { SiMaildotru } from "react-icons/si";
import { FaUsers } from 'react-icons/fa';
import { Sprite, Stage } from "@pixi/react";
import { MkContext } from "../../../../context/MkContext";

export default function MkCard({tournament, setCardId, cardId, fadeKey}) {
    
    const { switchCardSprites } = useContext(MkContext);

    const {id, name, speed, race, endAt, registered, capacity, user} = tournament;

    const [hovered, setHovered] = useState(false);
    const [active, setActive] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState();
    const [spritePosition, setSpritePosition] = useState(0);
    const [imagesLoaded, setImageLoaded] = useState(false);

    const handleMouseLeave = () => {
        setHovered(false);
        setActive(false);
    };

    const handleClick = () => {
        setCardId(id);
    };

    useEffect(() => {
        if (endAt) {
            const interval = setInterval(() => {
                setTimeRemaining(getTimeRemaining(endAt));
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [endAt]);

    useEffect(() => {
        const img = new Image();
        img.src = switchCardSprites;
        img.onload = () => setImageLoaded(true);
    }, [switchCardSprites]);

    useEffect(() => {
        let intervalId;
        if (hovered & (cardId !== id)) {
            intervalId = setInterval(() => {
                setSpritePosition((prevPosition) => {
                    if (prevPosition > -700) {
                        return prevPosition - 100;
                    } else {
                        clearInterval(intervalId);
                        return prevPosition;
                    }
                });
            }, 25);
        } else if (!hovered & (cardId !== id)) {
            intervalId = setInterval(() => {
                setSpritePosition((prevPosition) => {
                    if (prevPosition < 0) {
                        return prevPosition + 100;
                    } else {
                        clearInterval(intervalId);
                        return prevPosition;
                    }
                });
            }, 25);
        } else if (!hovered & cardId === id) {
            setSpritePosition(-700);
        } 

        return () => clearInterval(intervalId);
    }, [hovered, cardId]);

    return (
        <div 
            id="MkCard"
            style={{animation : `fadein ${ (1 + (fadeKey/10)) / 2}s ease-in-out`}}
            className={`event-card 
                ${hovered ? 'hovered' : 'unhovered' }-${speed === '200cc' ? '200cc' : '150cc'}
                ${cardId === id ? 'selected' : ''}-${((cardId===id) && (speed === '200cc')) ? '200cc' : '150cc'} `}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => handleMouseLeave()}
            onMouseDown={() => setActive(true)}
            onMouseUp={() => setActive(false)}
            onClick={() => handleClick()}
            >
                <div className={`event-img 
                    ${hovered ? 'hovered' : 'unhovered' } 
                    ${active ? 'active' : ''}
                    ${cardId === id ? 'selected' : ''} `}>
                        {imagesLoaded 
                            ? (
                                <>
                                    <Stage 
                                        width={100} 
                                        height={100} 
                                        options={{backgroundAlpha: 0}} >
                                        <Sprite image={switchCardSprites} x={spritePosition} y={0} anchor={0} scale={1}/>
                                    </Stage>
                                    <div className={`race-icon 
                                                ${hovered ? 'hovered' : 'unhovered'}
                                                ${cardId === id ? 'selected' : 'unselected'}`}>
                                        <Stage
                                            width={100} 
                                            height={100} 
                                            options={{backgroundAlpha: 0}} >
                                            <Sprite image={switchCardSprites} x={0} y={-100} scale={1} />
                                        </Stage>
                                    </div>
                                </>
                            ) : (
                                <div className="loading"></div>
                            )
                        }
                </div>

                <div className={`shadow
                    ${cardId === id ? 'selected' : 'unselected'} `} ></div>

                <div className="event-info">
                    <h3 className='event-name'>{name.toUpperCase()}</h3>
                    <p className='event-race'>{race.name}</p>
                    <p className={`event-speed ${hovered && (cardId !== id)? 'show' : 'hide'}`}>{speed === '200cc' ? '200cc' : '150cc'}</p>
                </div>

                <div className={`event-details-${speed === '200cc' ? '200cc' : '150cc'}`}>
                    { endAt && (
                        <div className="endAt">
                            <AiOutlineClockCircle />
                            <p>{getTimeRemaining(endAt)}</p>
                        </div>
                    )}
                    { capacity && (
                        <div className="capacity">
                            <FaUsers />
                            <p>{registered.length}/{capacity}</p>
                        </div>
                    )}
                    { user && (
                        <div className="user">
                            <SiMaildotru />
                            <p>{user.name}</p>
                        </div>
                    )}
                </div>
                
        </div>
    )
}