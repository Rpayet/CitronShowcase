import { usePageTransition } from "../../services/navigation/animationService";
import { Stage, Sprite } from "@pixi/react";
import { useEffect, useState, useContext } from "react";
import { AnimationContext } from "../../context/AnimationContext";
import DashSubLinks from "./DashSubLinks";
import { DashboardContext } from "../../context/DashboardContext";
import { AppContext } from "../../context/AppProvider";
import { isPageRefreshed } from "../../services/navigation/navigationService";

export default function Dashboard() {

    const { handleNavigation } = usePageTransition();
    const { dashboardContent } = useContext(DashboardContext);
    const { navigation, category, subcategory, description } = dashboardContent;
    const { lemonifylogoset } = useContext(AppContext);

    const { animus, setAnimus } = useContext(AnimationContext);
    const { dashboardComp } = animus;

    const [hovered, setHovered] = useState('');
    const [navDynamicArray, setNavDynamicArray] = useState(navigation || []);

    const updateAnimationDuration = () => {
        const duration = isPageRefreshed() ? "0s" : ".7s";
        document.documentElement.style.setProperty("--dash-animation-duration", duration);
    };
    
    useEffect(() => {
        updateAnimationDuration();
    }, [isPageRefreshed()]);   

    useEffect(() => {
        if (navigation.length === 0) return;

        setNavDynamicArray((prevArray) => {
            const selectedLink = navigation.find(link => link.id === category.id);
            if (!selectedLink) return prevArray;

            const filteredArray = prevArray.filter(link => link.id !== category.id);
            return [selectedLink, ...filteredArray];
        })
    }, [navigation]);

    useEffect(() => {
        setAnimus(prev => {
            return {
                ...prev,
                dashboardComp: !category.to ? false : true
            }
        })
    }, [setAnimus, category]);

    return (
        <div 
            id="Dashboard"
            className={dashboardComp ? 'dashSlideIn' : 'dashSlideOut'}>
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
                                        position={navigation[0].theme}
                                        anchor={[0, 0]}
                                        scale={1}
                                    />
                            </Stage>
                        </div>
                        <p className="linkname">{navigation[0].name}</p>
                    </button>
            </div>
            <div className="dashBody">
                <div className="nav">
                    {navDynamicArray.map((link) => {
                        if (link.id === 'lemonify') return;
                        return (
                            <button
                                key={link.id}
                                id={link.id}
                                className={`dashLink ${hovered === link.name ? 'focus' : 'unfocus' } ${category.name === link.name ? 'selected' : 'unselected'}`}
                                onClick={() => handleNavigation(link.to) } 
                                onMouseEnter={() => setHovered(link.id)}
                                onMouseLeave={() => setHovered('')}>
                                    <div className={`navIcon ${category.name === link.name ? '' : 'reduce'}`}>
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
                        {Object.keys(navigation).map(key => {
                            if (navigation[key].id === hovered && navigation[key].name !== category.name) {
                                return navigation[key].name;
                            }
                        })}
                    </p>
                </div>
                <div className="dashBodyContent">
                    <h1 className="sectionName">
                        {category.name !== 'Lemonify' ? category.name : ''}
                        {subcategory.name !== '' ? (' - ' + subcategory.name)  : ''}
                    </h1>
                    <p className="description">{description}</p>
                    { subcategory.id && <DashSubLinks /> }
                    {/** Espace pour les options liés au sous-catégories */}
                </div>
            </div>
            <div className="footer">
                <p>Copyright</p>
            </div>
        </div>
    );
}