import { usePageTransition } from "../../services/navigation/animationService";
import lemonifylogoset from "../../assets/images/statics/brand/lemonify_logoset.png";
import { Stage, Sprite } from "@pixi/react";
import { useEffect, useState } from "react";

export default function Dashboard() {

    const { handleNavigation } = usePageTransition();

    const dashboardLink = [
        {id: 'landing', to:'', name: 'Accueil', icon: [-64, -640]},
        {id: 'articles', to:'articles', name: 'Articles', icon: [-320, -640]},
        {id: 'portfolio', to:'portfolio', name: 'Portefolio', icon: [-576, -640]},
        {id: 'arcadePalace', to:'arcadePalace', name: 'Arcade Palace', icon: [-832, -640]}
    ];

    const [dashStatus, setDashStatus] = useState('');

    const [selected, setSelected] = useState('');
    const [hovered, setHovered] = useState('');
    
    const fromPage = window.location.pathname.split('/')[1];
    useEffect(() => {
        if (fromPage === '') {
            setDashStatus('hidden');
        } else {
            setDashStatus('show');
        }
    }, [fromPage]);
        
    return (
        <div id="Dashboard" className={dashStatus}>
            {dashboardLink.map((link) => {
                return (
                    <button
                        key={link.id}
                        id={link.id}
                        className={`dashlink`}
                        onClick={() => handleNavigation(link.to) } >
                                <div className="icon">
                                <Stage                        
                                    width={64}
                                    height={64}
                                    options={{backgroundAlpha: 0}}>
                                        <Sprite
                                            image={lemonifylogoset}
                                            position={link.icon}
                                            anchor={[0, 0]}
                                            scale={1}                                   
                                        />
                                </Stage>
                            </div>
                            <p>{link.name}</p>
                    </button>
                );
            })}
        </div>
    );
}