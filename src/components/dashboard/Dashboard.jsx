import { usePageTransition } from "../../services/navigation/animationService";
import { Stage, Sprite } from "@pixi/react";
import { useEffect, useState, useContext } from "react";
import { AnimationContext } from "../../context/AnimationContext";
import DashSubLinks from "./DashSubLinks";
import { DashboardContext } from "../../context/DashboardContext";
import { AppContext } from "../../context/AppProvider";
import { isPageRefreshed } from "../../services/navigation/navigationService";
import { useIcon } from "../../services/iconService";

export default function Dashboard({bookmarkId}) {

    const { handleNavigation } = usePageTransition();
    const { handleIconPosition } = useIcon();
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
            const newArray = [...filteredArray];
            newArray.splice(category.id, 0, selectedLink);
            return newArray;
        })
    }, [navigation]);

    // useEffect(() => {
    //     setAnimus(prev => {
    //         return {
    //             ...prev,
    //             dashboardComp: {
    //                 open: 
    //             }
    //         }
    //     })
    // }, [setAnimus, category]);

    return (
        <div id="Dashboard" className={`dashboard`}>
            <div className="page_main"></div>
            <div 
                className={`header`}
                onClick={() => handleNavigation('lemonify')} >
                    <a className="dashLink">
                        <div className="headerIcon">
                            <Stage
                                width={64}
                                height={64}
                                options={{backgroundAlpha: 0}}>
                                    <Sprite
                                        image={lemonifylogoset}
                                        position={handleIconPosition(64, 0, 1)}
                                        anchor={[0, 0]}
                                        scale={1}
                                    />
                            </Stage>
                        </div>
                        <p className="linkname">{navigation[0].name}</p>
                    </a>
            </div>
            <div className="dashBody">
                <div className={`nav${!dashboardComp.open ? '-cl' : '-op'}`}>
                    {/* <p className={`linkname ${hovered !== '' ? 'show' : 'hide'}`}>
                        {Object.keys(navigation).map(key => {
                            if (navigation[key].to === hovered && navigation[key].name !== category.name) {
                                return navigation[key].name;
                            }
                        })}
                    </p> */}
                    {bookmarkId === 2 && navDynamicArray.map((link) => {
                        if (link.to === '') return;
                        return (
                            <button
                                key={link.to}
                                id={link.to}
                                className={`dashLink-${link.id} 
                                    ${link.to}${category.name === link.name ? '-sltd' : '-unsltd'}`}
                                onClick={() => handleNavigation(link.to) } 
                                onMouseEnter={() => setHovered(link.to)}
                                onMouseLeave={() => setHovered('')}>
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