import { useContext, useEffect, useState } from "react";
import { GiBroadsword } from "react-icons/gi";
import { TbBuildingCastle } from "react-icons/tb";
import { FaDiamond, FaSquare } from "react-icons/fa6";
import { GameContext } from "../../context/GameContext";
import HeroesActions from "./_utils/HeroesActions";

export default function HeroCard({ base, player }) {

    const { setPlayer1, setPlayer2 } = useContext(GameContext);

    const { hero, hero_rank, exp, rod } = player[base];

    const setPlayer = (player.id === 1) ? setPlayer1 : setPlayer2;
    const setOpponent = (player.id === 1) ? setPlayer2 : setPlayer1;

    const [heroApt1, setApt1] = useState(hero.apt1[hero_rank]);
    const [heroApt2, setApt2] = useState(hero.apt2[hero_rank]);
    const [heroRod, setHeroRod] = useState(rod);
    const [energy_to_act, setEnergy_to_act] = useState(hero.energy_to_act[hero_rank]);
    const [heroExp, setHeroExp] = useState(exp);

    useEffect(() => {
        setApt1(hero.apt1[hero_rank]);
        setApt2(hero.apt2[hero_rank]);
        setEnergy_to_act(hero.energy_to_act[hero_rank]);
        setHeroRod(rod);
        setHeroExp(exp);
    }, [hero, player[base]]);

    useEffect(() => {
        if (heroRod >= energy_to_act) {
            HeroesActions({ setPlayer, setOpponent, hero, base });
        }
    }, [heroRod])

    useEffect(() => {
        if (heroExp >= 6) {
            switch (hero_rank) {
                case 'bronze':
                    setPlayer(prevState => ({
                        ...prevState,
                        [base]: {
                            ...prevState[base],
                            hero_rank: 'silver',
                            exp: 0,
                        }
                    }));
                    break;
                case 'silver':
                    setPlayer(prevState => ({
                        ...prevState,
                        [base]: {
                            ...prevState[base],
                            hero_rank: 'gold',
                            exp: 0,
                        }
                    }));
                    break;
                case 'gold':
                    // Bonus Action
                    break;
                default:
                    break;
        }}
    }, [heroExp])

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