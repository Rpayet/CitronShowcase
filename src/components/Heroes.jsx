import { useState } from "react";

export default function Heroes({ hero }) {

    const [crown, setCrown] = useState(hero.crown.bronze);
    const [bulwark, setBulwark] = useState(hero.bulwark.bronze);
    const [rod, setRod] = useState();
    const [energy_to_act, setEnergy_to_act] = useState(hero.energy_to_act.bronze);
    const [exp, setExp] = useState(0);

  return (
    <div id='Heroes' className={hero.name}>
        <h1 classNmae=''>{hero.name}</h1>
        <div className=''>
            <img src="" alt="" />
            <p className='exp'>{exp}/6</p>
        </div>
        <div className=''>
            <div>
                <img src="" alt="Crown atk" />
                <p>{crown}</p>
            </div>
            <div>
                <img src="" alt="Bulwark atk" />
                <p>{bulwark}</p>
            </div>
        </div>
        <div className='rod'>
            <p>{rod}/({energy_to_act})</p>
        </div>
    </div>
  );
  
}