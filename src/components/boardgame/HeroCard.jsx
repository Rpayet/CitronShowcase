import { useEffect, useState } from "react";
import { GiBroadsword } from "react-icons/gi";
import { TbBuildingCastle } from "react-icons/tb";
import { FaDiamond, FaSquare } from "react-icons/fa6";

export default function HeroCard({ base, player }) {

    const { hero, hero_rank } = player;

    const [heroApt1, setApt1] = useState(hero.apt1[hero_rank]);
    const [heroApt2, setApt2] = useState(hero.apt2[hero_rank]);
    const [heroRod, setHeroRod] = useState(player.rod);
    const [energy_to_act, setEnergy_to_act] = useState(hero.energy_to_act[hero_rank]);
    const [heroExp, setHeroExp] = useState(0);

    useEffect(() => {
        setApt1(hero.apt1[hero_rank]);
        setApt2(hero.apt2[hero_rank]);
        setEnergy_to_act(hero.energy_to_act[hero_rank]);
    }, [hero_rank, hero.apt1[hero_rank], hero.apt2[hero_rank], hero.energy_to_act[hero_rank]]);

    return (
        <div id='Hero' className={base}>
            <div className='hero-info'>
                <div className='hero-id'>
                    {base === 'square' ? <FaSquare /> : <FaDiamond />}
                    <h1 className='hero-title'>{hero.name}</h1>
                    <p>{hero_rank}</p>
                </div>
                <div className='hero-spec'>
                    <div className='offensive'>
                        <GiBroadsword />
                        <p>{heroApt1}</p>
                    </div>
                    <div className='defensive'>
                        <TbBuildingCastle />
                        <p>{heroApt2}</p>
                    </div>
                </div>
                <meter className='hero-exp' min='0' max='6' value={heroExp}></meter>
            </div>
            <div className='hero-rod'>
                {Array.from({length: (energy_to_act - heroRod)}, (_, i) => {
                    return <div key={i} className='rod-segment'></div>
                })}
            </div>
        </div>
    );
}