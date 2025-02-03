import { usePageTransition } from "../../services/navigation/animationService";
import lemonifylogoset from "../../assets/images/statics/brand/lemonify_logoset.png";
import { Stage, Sprite } from "@pixi/react";
import { useEffect, useState, useContext, useMemo } from "react";
import { AppContext } from "../../context/AppProvider";
import { AnimationContext } from "../../context/AnimationContext";
import dashboard from "../../utils/_test-assets/dashboard.json";
import DashSubLinks from "./DashSubLinks";
import { DashboardContext } from "../../context/DashboardContext";

export default function Dashboard() {

    const fromPage = useMemo(() => window.location.pathname.split('/'), [window.location.pathname]);
    const { handleNavigation } = usePageTransition();
    const { appTheme } = useContext(AppContext);
    const { dashboardContent } = useContext(DashboardContext);

    const { animations } = useContext(AnimationContext);
    const [dashboardAnim, setDashboardAnim] = animations.dashboard;

    const dashboardLink = dashboard;

    const [linkArray, setLinkArray] = useState([dashboardLink.articles, dashboardLink.portfolio, dashboardLink.arcadepalace]);

    const [selected, setSelected] = useState(fromPage[1]);
    const [hovered, setHovered] = useState('');

    const sublinksDict = [
        'mktrials', 'wheels', 'sonictactoe'
    ];

    const sublinks = linkArray.find(link => link.id === selected)?.sublink || {};
        
    useEffect(() => {
        setSelected(fromPage[1]);
        if (fromPage[1] !== '') {
            setLinkArray((prevArray) => {
                const selectedLink = dashboardLink[fromPage[1]];
                const filteredArray = prevArray.filter(link => link.id !== fromPage[1]);
                return [selectedLink, ...filteredArray];
            });
        }
    }, [fromPage]);

    useEffect(() => {
        setDashboardAnim(fromPage[1] === '' ? false : true);
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
                    <h1 className="sectionName">{dashboardContent.category}{dashboardContent.subcategory !== '' ? ' - '+dashboardContent.subcategory  : ''}</h1>
                    <p className="description">{dashboardContent.description}</p>
                    <DashSubLinks sublinks={sublinks} />
                    {/** Espace pour les options liés au sous-catégories */}
                </div>
            </div>
            <div className="footer">
                <p>Copyright</p>
            </div>
        </div>
    );
}