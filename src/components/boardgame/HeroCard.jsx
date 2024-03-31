import { useEffect, useState } from "react";
import { GiBroadsword } from "react-icons/gi";
import { TbBuildingCastle } from "react-icons/tb";
import { FaDiamond, FaSquare } from "react-icons/fa6";

export default function HeroCard({ base, hero, player }) {

    const [crown, setCrown] = useState(hero.crown.bronze);
    const [bulwark, setBulwark] = useState(hero.bulwark.bronze);
    const [rod, setRod] = useState(player[base].rod);
    const [energy_to_act, setEnergy_to_act] = useState(hero.energy_to_act.bronze);
    const [exp, setExp] = useState(player[base].exp);

    useEffect(() => {
        setCrown(hero.crown[player[base].hero_rank]);
        setBulwark(hero.bulwark[player[base].hero_rank]);
        setEnergy_to_act(hero.energy_to_act[player[base].hero_rank]);
    }, [player[base].hero_rank, hero.crown, hero.bulwark, hero.energy_to_act]);

    return (
        <div id='Hero' className={base}>
            <div className='hero-info'>
                <div className='hero-id'>
                    {base === 'square' ? <FaSquare /> : <FaDiamond />}
                    <h1 className='hero-title'>{hero.name}</h1>
                    <p>{player[base].hero_rank}</p>
                </div>
                <div className='hero-spec'>
                    <div className='offensive'>
                        <GiBroadsword />
                        <p>{crown}</p>
                    </div>
                    <div className='defensive'>
                        <TbBuildingCastle />
                        <p>{bulwark}</p>
                    </div>
                </div>
                <meter className='hero-exp' min='0' max='6' value={exp}></meter>
            </div>
            <div className='hero-rod'>
                {Array.from({length: hero.energy_to_act[player[base].hero_rank]}, (_, i) => {
                    return <div key={i} className='rod-segment'></div>
                })}
            </div>
        </div>
    );
}