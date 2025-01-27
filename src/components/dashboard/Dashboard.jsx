import { usePageTransition } from "../../services/navigation/animationService";
import lemonifylogoset from "../../assets/images/statics/brand/lemonify_logoset.png";
import { Stage, Sprite } from "@pixi/react";
import { useEffect, useState, useContext } from "react";
import { AppContext } from "../../context/AppProvider";

export default function Dashboard() {

    const { handleNavigation } = usePageTransition();
    const { appTheme } = useContext(AppContext);

    const dashboardLink = [
        {id: 'landing', to:'', name: 'Lemonify', light: [0, -640], dark:[-64, -640]},
        {id: 'articles', to:'articles', name: 'Articles', light: [-256, -640], dark:[-320, -640]},
        {id: 'portfolio', to:'portfolio', name: 'Portefolio', light: [-512, -640], dark:[-576, -640]},
        {id: 'arcadePalace', to:'arcadePalace', name: 'Arcade Palace', light: [-768, -640], dark:[-832, -640]},
    ];

    const [dashStatus, setDashStatus] = useState('');

    const [selected, setSelected] = useState('Page');
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
            <div className="header">
                <button className="dashLink" onClick={() => handleNavigation('')}>
                    <div className="headerIcon">
                        <Stage
                            width={64}
                            height={64}
                            options={{backgroundAlpha: 0}}>
                                <Sprite
                                    image={lemonifylogoset}
                                    position={dashboardLink[0][appTheme]}
                                    anchor={[0, 0]}
                                    scale={1}
                                />
                        </Stage>
                    </div>
                    <p className="linkname">{dashboardLink[0].name}</p>
                </button>
            </div>
            <div className="dashBody">
                <div className="nav">
                    {dashboardLink.slice(1).map((link) => {
                        return (
                            <button
                                key={link.id}
                                id={link.id}
                                className={`dashlink`}
                                onClick={() => handleNavigation(link.to) } >
                                    <div className="navIcon">
                                        <Stage                        
                                            width={64}
                                            height={64}
                                            options={{backgroundAlpha: 0}}>
                                                <Sprite
                                                    image={lemonifylogoset}
                                                    position={link[appTheme]}
                                                    anchor={[0, 0]}
                                                    scale={1}                                   
                                                />
                                        </Stage>
                                    </div>
                                    {/* <p className="linkname">{link.name}</p> */}
                            </button>
                        );
                    })}
                </div>
                <div className="dashBodyContent">
                    <h2 className="section">{selected.toUpperCase()}</h2>
                    <p className="description">Lorem, ipsum dolor sit amet consectetur adipisicing elit. </p>
                    <div>
                        <p>Sous-lien</p>
                        <p>Sous-lien</p>
                        <p>Sous-lien</p>
                    </div>
                </div>
            </div>
            <div className="footer">
                <p>Copyright</p>
            </div>
        </div>
    );
}