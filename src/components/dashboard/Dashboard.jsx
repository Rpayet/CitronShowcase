import { usePageTransition } from "../../services/navigation/animationService";
import { Stage, Sprite } from "@pixi/react";
import { useEffect, useState, useContext, useMemo } from "react";
import { AnimationContext } from "../../context/AnimationContext";
import DashSubLinks from "./DashSubLinks";
import { DashboardContext } from "../../context/DashboardContext";
import { AppContext } from "../../context/AppProvider";

export default function Dashboard() {

    const { handleNavigation } = usePageTransition();
    const { dashboardContent } = useContext(DashboardContext);
    const { lemonifylogoset } = useContext(AppContext);

    const { animations } = useContext(AnimationContext);
    const [dashboardAnim, setDashboardAnim] = animations.dashboard;

    const [hovered, setHovered] = useState('');

    useEffect(() => {
        setDashboardAnim(dashboardContent.category.name === "Lemonify" ? false : true);
        return () => setDashboardAnim(false);
    }, [setDashboardAnim, dashboardContent.category]);

    return (
        <div id="Dashboard" className={dashboardAnim ? 'dashSlideIn' : 'dashSlideOut'}>
            <div 
                className={`header`}
                onClick={() => handleNavigation('lemonify')} >
                    <button className="dashLink">
                        <div className="headerIcon">
                            <Stage
                                width={64}
                                height={64}
                                options={{backgroundAlpha: 0}}>
                                    <Sprite
                                        image={lemonifylogoset}
                                        position={dashboardContent.navigation[0].theme}
                                        anchor={[0, 0]}
                                        scale={1}
                                    />
                            </Stage>
                        </div>
                        <p className="linkname">{dashboardContent.navigation[0].name}</p>
                    </button>
            </div>
            <div className="dashBody">
                <div className="nav">
                    {dashboardContent.navigation.map((link) => {
                        if (link.id === 'lemonify') return;
                        return (
                            <button
                                key={link.id}
                                id={link.id}
                                className={`dashLink ${hovered === link.name ? 'focus' : 'unfocus' } ${dashboardContent.category.name === link.name ? 'selected' : 'unselected'}`}
                                onClick={() => handleNavigation(link.to) } 
                                onMouseEnter={() => setHovered(link.id)}
                                onMouseLeave={() => setHovered('')}>
                                    <div className={`navIcon ${dashboardContent.category.name === link.name ? '' : 'reduce'}`}>
                                        <Stage                  
                                            width={64}
                                            height={64}
                                            options={{backgroundAlpha: 0}}>
                                                <Sprite
                                                    image={lemonifylogoset}
                                                    position={link.theme}
                                                    anchor={[0, 0]}
                                                    scale={1}                                   
                                                />
                                        </Stage>
                                    </div>
                            </button>
                        );
                    })}
                    <p className={`linkname ${hovered !== '' ? 'show' : ''}`}>
                        {Object.keys(dashboardContent.navigation).map(key => {
                            if (dashboardContent.navigation[key].id === hovered && dashboardContent.navigation[key].name !== dashboardContent.category.name) {
                                return dashboardContent.navigation[key].name;
                            }
                        })}
                    </p>
                </div>
                <div className="dashBodyContent">
                    <h1 className="sectionName">
                        {dashboardContent.category.name !== 'Lemonify' ? dashboardContent.category.name : ''}
                        {dashboardContent.subcategory.name !== '' ? ' - '+dashboardContent.subcategory.name  : ''}
                    </h1>
                    <p className="description">{dashboardContent.description}</p>
                    { dashboardContent.subcategory.id !== '' && <DashSubLinks /> }
                    {/** Espace pour les options liés au sous-catégories */}
                </div>
            </div>
            <div className="footer">
                <p>Copyright</p>
            </div>
        </div>
    );
}