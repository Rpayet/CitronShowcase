import { usePageTransition } from "../../services/navigation/animationService";
import { Stage, Sprite } from "@pixi/react";
import { useEffect, useState, useContext } from "react";
import { AnimationContext } from "../../context/AnimationContext";
import DashSubLinks from "./DashSubLinks";
import { DashboardContext } from "../../context/DashboardContext";
import { AppContext } from "../../context/AppProvider";
import { isPageRefreshed } from "../../services/navigation/navigationService";
import { useIcon } from "../../services/iconService";

export default function Dashboard() {

    const { handleNavigation } = usePageTransition();
    const { handleIconPosition } = useIcon();
    const { dashboardContent } = useContext(DashboardContext);
    const { navigation, category, subcategory, description } = dashboardContent;
    const { lemonifylogoset } = useContext(AppContext);
    const { animus } = useContext(AnimationContext);
    const { dashboardComp } = animus;
    const [navDynamicArray, setNavDynamicArray] = useState(navigation || []);
    const [ switchClass, setSwitchClass ] = useState('');
    
    useEffect(() => {
        if (navigation.length === 0) return;
        setNavDynamicArray((prevArray) => {
            const selectedLink = navigation.find(link => link.id === category.id);
            if (!selectedLink) return prevArray;

            const filteredArray = prevArray.filter(link => link.id !== category.id);
            const newArray = [...filteredArray];
            newArray.splice(category.id, 0, selectedLink);
            return newArray;
        })
    }, [navigation]);

    const handleNavEvent = (link) => {
        setSwitchClass(category.name.toLowerCase().replace(/\s+/g, '') + '-sw');
        setTimeout(() => {
            setSwitchClass('');
        }, 500);
        handleNavigation(link.to);
    }

    console.log((category?.name === 'Portfolio') ? switchClass : '')
    return (
        <div id="Dashboard">
            <div className={`nav${!dashboardComp.open ? '-cl' : '-op'}`}>
                {navDynamicArray.map((link) => {
                    if (link.to === '') return;
                    return (
                        <button
                            key={link.to}
                            id={link.to}
                            className={`dashLink-${link.id} 
                                ${link.to}${(category?.name === link.name)? '-sltd' : '-unsltd'} ${switchClass}`}
                            onClick={() => handleNavEvent(link) }>
                                <div className="navIcon">
                                    <Stage                  
                                        width={64}
                                        height={64}
                                        options={{backgroundAlpha: 0}}>
                                            <Sprite
                                                image={lemonifylogoset}
                                                position={handleIconPosition(64, link.id, 0)}
                                                anchor={[0, 0]}
                                                scale={1}                                   
                                            />
                                    </Stage>
                                </div>
                        </button>
                    );
                })}
            </div>
            <div id="Dash-body" className={dashboardComp.transition ? "db-switch" : ""}>
                <div className={`db-header ${!dashboardComp.transition ? "db-fade" : ""}`}>
                    <h1>{category.name}</h1>
                </div>
                <div className={`db-content ${!dashboardComp.transition ? "db-fade" : ""}`}>
                    <p className="description">{description}</p>
                    { subcategory.id && <DashSubLinks /> }
                    {/** Espace pour les options liés au sous-catégories */}
                </div>
                <div className={`db-footer ${!dashboardComp.transition ? "db-fade" : ""}`}>
                    <p>Copyright</p>
                </div>
            </div>
        </div>
    );
}