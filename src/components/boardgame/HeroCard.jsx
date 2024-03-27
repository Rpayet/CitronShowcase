import { useEffect, useState } from "react";
import { TbUserPentagon } from "react-icons/tb";
import { GiDefensiveWall, GiBroadsword } from "react-icons/gi";

export default function HeroCard({ hero, player }) {

    const [crown, setCrown] = useState(hero.crown.bronze);
    const [bulwark, setBulwark] = useState(hero.bulwark.bronze);
    const [rod, setRod] = useState(player.diamond.rod);
    const [energy_to_act, setEnergy_to_act] = useState(hero.energy_to_act.bronze);
    const [exp, setExp] = useState(player.diamond.exp);

    useEffect(() => {
        setCrown(hero.crown[player.diamond.hero_rank]);
        setBulwark(hero.bulwark[player.diamond.hero_rank]);
        setEnergy_to_act(hero.energy_to_act[player.diamond.hero_rank]);
    }, [player.diamond.hero_rank, hero.crown, hero.bulwark, hero.energy_to_act]);

    return (
        <div id='Hero' className={hero.name}>
            <div className='hero-info'>
                <div className='hero-id'>
                    <TbUserPentagon className='hero-pic'/>
                    <h1 className='hero-title'>{hero.name}</h1>
                    <p>{player.diamond.hero_rank}</p>
                </div>
                <div className='hero-spec'>
                    <div className='offensive'>
                        <GiBroadsword />
                        <p>{crown}</p>
                    </div>
                    <div className='defensive'>
                        <GiDefensiveWall />
                        <p>{bulwark}</p>
                    </div>
                </div>
                <meter className='hero-exp' min='0' max='6' value={exp}></meter>
            </div>
            <div className='hero-rod'>
                <meter min='0' max={energy_to_act} value={rod} />
            </div>
        </div>
    );

}