import {useContext, useEffect} from "react";
import {AnimationContext} from "../context/AnimationContext";
import { DashboardContext } from "../context/DashboardContext";
import { AppContext } from "../context/AppProvider";
import { Sprite, Stage } from "@pixi/react";
import { usePageTransition } from "../services/navigation/animationService";

export default function Landing() {

    const { setAnimus } = useContext(AnimationContext);
    const { dashboardContent } = useContext(DashboardContext);
    const { navigation, category, subcategory, description } = dashboardContent;
    const { lemonifylogoset } = useContext(AppContext);
    const { handleNavigation } = usePageTransition();

    useEffect(() => {
        setAnimus(prevState => {
            return {
                ...prevState,
                lemonifyComp: true,
            }
        })
        return () => setAnimus(prevState => {
            return {
                ...prevState,
                lemonifyComp: false,
            }
        });
    }, [setAnimus]);

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
                        {(word === 'Palace') && ( <span>Palace</span> )}
                    </>
                ));
        }
    }

    return (
        <section id='Landing'>
            <div id="Notebook">
                <div className="bookmark">

                </div>
                <nav id="Notebook_Nav">
                    <ul>
                        {navigation.map((link, index) => {
                            if (link.id === 'lemonify') return;
                            return (
                                <li key={link.id}>
                                    <a 
                                        onClick={() => handleNavigation(link.id)}
                                        className={`navLink ${link.id}`}>
                                        <div className={`${link.id}-icon`}>
                                            <Stage width={128} height={128} options={{backgroundAlpha: 0}}>
                                                <Sprite
                                                    image={lemonifylogoset}
                                                    position={link.theme}
                                                    anchor={[0, 0]}
                                                    scale={1} />
                                            </Stage>
                                        </div>
                                        <p className={`${link.id}-name`}>
                                            {handleLinkName(link.name)}
                                        </p>
                                    </a>
                                </li>
                            )
                        })}
                    </ul>
                </nav>
                <div id="Notebook_Frontpage">
                    <div className="header">
                        <h1>Design & code <br/><span>Robin Payet</span></h1>
                        <div className="sewing"></div>
                    </div>

                </div>
            </div>
        </section>
    )
}