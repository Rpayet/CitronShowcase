import { usePageTransition } from "../../services/navigation/animationService";
import dashboardSprites from "../../assets/images/sprites/dashboard_spritesheet.png";
import { Stage, Sprite } from "@pixi/react";
import { useEffect, useState } from "react";

export default function Dashboard() {

    const { handleNavigation } = usePageTransition();

    const dashboardLink = [
        {id: 'landing', name: 'Accueil', icon: [0, 0]},
        {id: 'articles', name: 'Articles', icon: [-50, 0]},
        {id: 'portfolio', name: 'Portefolio', icon: [-100, 0]},
        {id: 'arcadePalace', name: 'Arcade Palace', icon: [-150, 0]}
    ]

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
                        onClick={() => handleNavigation(link.id) } >
                                <div className="icon">
                                <Stage                        
                                    width={50}
                                    height={50}
                                    options={{backgroundAlpha: 0}}>
                                        <Sprite
                                            image={dashboardSprites}
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