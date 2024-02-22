import { useState } from "react";
import { GiDefensiveWall, GiBroadsword  } from "react-icons/gi";

export default function Heroes({ hero, player }) {

    const [crown, setCrown] = useState(hero.crown.bronze);
    const [bulwark, setBulwark] = useState(hero.bulwark.bronze);
    const [rod, setRod] = useState(2);
    const [energy_to_act, setEnergy_to_act] = useState(hero.energy_to_act.bronze);
    const [exp, setExp] = useState(player.diamond.exp);

  return (
    <div id='Heroes' className={hero.name}>
        <h1 className='title'>{hero.name}</h1>
        <div className=''>
            <p className='exp'>xp</p>
            <meter min='0' max='6' value={exp}></meter>
        </div>
        <div className=''>
            <div>
                <p><GiBroadsword /> {crown}</p>
            </div>
            <div>
                <p><GiDefensiveWall /> {bulwark}</p>
            </div>
        </div>
        <div className='rod'>
            <meter min='0' max={energy_to_act} value={rod} />
        </div>
    </div>
  );
  
}