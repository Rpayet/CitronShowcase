import { usePageTransition } from "../../services/navigation/animationService";
import lemonifylogoset from "../../assets/images/statics/brand/lemonify_logoset.png";
import { Stage, Sprite } from "@pixi/react";
import { useEffect, useState, useContext } from "react";
import { AppContext } from "../../context/AppProvider";
import { AnimationContext } from "../../context/AnimationContext";

export default function Dashboard() {

    const fromPage = window.location.pathname.split('/')[1];
    const { handleNavigation } = usePageTransition();
    const { appTheme } = useContext(AppContext);

    const { animations } = useContext(AnimationContext);
    const [dashboardAnim, setDashboardAnim] = animations.dashboard;

    const dashboardLink = {
        landing : {id: 'landing', to:'', name: 'Lemonify', light: [0, -640], dark:[-64, -640]},
        articles : {id: 'articles', to:'articles', name: 'Articles', light: [-256, -640], dark:[-320, -640]},
        portfolio : {id: 'portfolio', to:'portfolio', name: 'Portefolio', light: [-512, -640], dark:[-576, -640]},
        arcadepalace : {id: 'arcadepalace', to:'arcadepalace', name: 'Arcade Palace', light: [-768, -640], dark:[-832, -640]},
        mktrials : {id: 'arcadepalace', to:'arcadepalace', name: 'Arcade Palace', light: [-768, -640], dark:[-832, -640]},
    }

    const [linkArray, setLinkArray] = useState([dashboardLink.articles, dashboardLink.portfolio, dashboardLink.arcadepalace]);

    const [selected, setSelected] = useState(fromPage);
    const [hovered, setHovered] = useState('');
    
    useEffect(() => {
        setSelected(fromPage);
        if (fromPage !== '') {
            setLinkArray((prevArray) => {
                const selectedLink = dashboardLink[fromPage];
                const filteredArray = prevArray.filter(link => link.id !== fromPage);
                return [selectedLink, ...filteredArray];
            });
        }
    }, [fromPage]);

    useEffect(() => {
        setDashboardAnim(fromPage === '' ? false : true);
        return () => setDashboardAnim(false);
    }, [setDashboardAnim, fromPage]);

    return (
        <div id="Dashboard" className={dashboardAnim ? 'dashSlideIn' : 'dashSlideOut'}>
            <div 
                className={`header`}
                onClick={() => handleNavigation('landing')} >
                    <button className="dashLink">
                        <div className="headerIcon">
                            <Stage
                                width={64}
                                height={64}
                                options={{backgroundAlpha: 0}}>
                                    <Sprite
                                        image={lemonifylogoset}
                                        position={dashboardLink.landing[appTheme]}
                                        anchor={[0, 0]}
                                        scale={1}
                                    />
                            </Stage>
                        </div>
                        <p className="linkname">{dashboardLink.landing.name}</p>
                    </button>
            </div>
            <div className="dashBody">
                <div className="nav">
                    {linkArray.map((link) => {
                        return (
                            <button
                                key={link.id}
                                id={link.id}
                                className={`dashLink ${hovered === link.name ? 'focus' : 'unfocus' } ${selected === link.id ? 'selected' : 'unselected'}`}
                                onClick={() => handleNavigation(link.to) } 
                                onMouseEnter={() => setHovered(link.id)}
                                onMouseLeave={() => setHovered('')}>
                                    <div className={`navIcon ${selected === link.id ? '' : 'reduce'}`}>
                                        <Stage                        
                                            width={64}
                                            height={64}
                                            options={{backgroundAlpha: 0}}>
                                                <Sprite
                                                    image={lemonifylogoset}
                                                    position={selected === link.id ? link.light : link.dark}
                                                    anchor={[0, 0]}
                                                    scale={1}                                   
                                                />
                                        </Stage>
                                    </div>
                            </button>
                        );
                    })}
                    {hovered !== selected &&
                        <p className={`linkname ${hovered !== '' ? 'show' : ''}`}>{linkArray.find(link => link.id === hovered)?.name}</p>
                    }
                </div>
                <div className="dashBodyContent">
                    <h1 className="section">{linkArray.find(link => link.id === selected)?.name}</h1>
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