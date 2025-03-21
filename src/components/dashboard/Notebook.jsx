import { useContext, useEffect, useState } from "react";
import { usePageTransition } from "../../services/navigation/animationService";
import { DashboardContext } from "../../context/DashboardContext";
import { Sprite, Stage } from "@pixi/react";
import { AppContext } from "../../context/AppProvider";
import Bookmark from "./Bookmark";
import Dashboard from "./Dashboard";
import { useIcon } from "../../services/iconService";
import { AnimationContext } from "../../context/AnimationContext";

export default function Notebook() {

    const { dashboardContent } = useContext(DashboardContext);
    const { navigation } = dashboardContent;
    const { lemonifylogoset } = useContext(AppContext);
    const { animus } = useContext(AnimationContext);
    const { dashboardComp } = animus;
    const [navArray, setNavArray] = useState(navigation.filter(link => link.id !== 0));
    const { handleNavigation } = usePageTransition();
    const { handleIconPosition } = useIcon();

    const handleLinkName = (name) => {
        switch (name) {
            case 'Portfolio': 
                return name.split('').map((char, i) => (
                    <span key={i} className={`portfolio_char-${i}`}>{char}</span>
                ));
            case 'Articles': 
                return Array(4).fill().map((_, i) => (
                    <span key={i} className={`articles_iteration-${i}`}>{name}</span>
                ));
            case 'Arcade Palace': 
                return name.split(' ').map((word, i) => (
                    <>
                        {(word === 'Arcade') && (
                            word.split('').map((char, j) => (
                                <span key={j} className={`arcade_char-${j}`}>{char}</span>
                            ))
                        )}
                        {(word === 'Palace') && ( <span className='palace_word'>Palace</span> )}
                    </>
                ));
        }
    };

    useEffect(() => {
        // Circle radius
        const radius = 35;
        // Circle center
        const centerX = 50;
        const centerY = 50;
        // First 4 characters positioning
        for (let i = 3; i >= 0; i--) {
            const angle = i * 30 * (Math.PI / 180);
            const x = centerX + radius * Math.cos(angle);
            const y = centerY - radius * Math.sin(angle);
            const charElement = document.querySelector(`.portfolio_char-${3 - i}`);
            if (charElement) {
                charElement.style.left = `${x}%`;
                charElement.style.top = `${y}%`;
                charElement.style.transform = `translate(-50%, -50%) rotate(${(3 - i) * 30}deg)`;
            }
        }
        // Last 5 characters positioning
        for (let i = 4; i < 9; i++) {
            const angle = (i - 4) * 30 * (Math.PI / 180);
            const x = centerX - radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);
            const charElement = document.querySelector(`.portfolio_char-${i}`);
            if (charElement) {
                charElement.style.left = `${x}%`;
                charElement.style.top = `${y}%`;
                charElement.style.transform = `translate(-50%, -50%) rotate(-${((i - 4) * 30) + 270}deg)`;
            }
        }
    }, []);

    useEffect(() => {
        const radius = 18;
        const centerX = 50;
        const centerY = 0;
        for (let i = 5; i >= 0; i--) {
            const angle = i * 30 * (Math.PI / 180);
            const x = centerX + radius * Math.cos(angle);
            const y = centerY - radius * Math.sin(angle);

            const charElement = document.querySelector(`.arcade_char-${5 - i}`);
            if (charElement) {
                charElement.style.left = `${x - 2.5}%`;
                charElement.style.top = `${y + 5}%`;
                charElement.style.transform = `rotate(${((5 - i) * 30) - 60}deg)`;
            }
        }
    },[]);

    return (
        <div id="Notebook" className={dashboardComp.open ? "nb-op" : "nb-cls"}>
            {/** Notebook content - navigation, filters & options */}
            <div id="Nb_content" className={dashboardComp.open ? "nbc-op" : "nbc-cls"}>
                <div className={dashboardComp.open ? "pages_bg-op" : "pages_bg-cls"}></div>
            </div>
            {/** Bookmark - styles & category reminder */}
            <Bookmark />
            {/** Cover */}
            <div id="Nb_cover" className={dashboardComp.open ? "nbcover-op" : "nbcover-cls"}>
                {/** Landing Navigation */}	
                <nav id="Nb_nav">
                    <ul>
                        {navArray.map((link) => {
                            return (
                                <li key={link.to}>
                                    <a 
                                        onClick={() => handleNavigation(link.to)}
                                        className={`navLink ${link.to}`}>
                                            <div className={`${link.to}-icon`}>
                                                <Stage width={128} height={128} options={{backgroundAlpha: 0}}>
                                                    <Sprite
                                                        image={lemonifylogoset}
                                                        position={handleIconPosition(128, link.id, 0)}
                                                        anchor={[0, 0]}
                                                        scale={1} />
                                                </Stage>
                                            </div>
                                            <p className={`${link.to}-name`}>
                                                {handleLinkName(link.name)}
                                            </p>
                                    </a>
                                </li>
                            )
                        })}
                    </ul>
                </nav>
                {/** Frontpage - Header use */}
                <div id="Nb_frontpage">
                    <div className="nb_h1">
                        <h1>Design & code <br/><span>Robin Payet</span></h1>
                        <div className="seam"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}