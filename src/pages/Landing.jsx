import {useContext, useEffect, useState} from "react";
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

    const [test, setTest] = useState(false);

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
                        {(word === 'Palace') && ( <span className='palace_word'>Palace</span> )}
                    </>
                ));
        }
    }

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
    },[])

    return (
        <section id='Landing'>
            <button onClick={() => setTest(!test)}>Clique</button>
            <div id="Notebook" className={`notebook-${!test ? 'closed' : 'open'}`}>
                <div id="Notebook-cover" className={`notebook-cover-${!test ? 'closed' : 'open'}`}>	
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
                    <div id="Notebook_Frontpage" className={`notebook_frontpage-${!test ? 'closed' : 'open'}`}>
                        <div className="header">
                            <h1>Design & code <br/><span>Robin Payet</span></h1>
                            <div className="sewing"></div>
                        </div>

                    </div>
                </div>
                <div id="Bookmark" className={`bookmark-${!test ? 'closed' : 'open'}`}>

                </div>
                <div id="Notebook-content" className={`notebook-content-${!test ? 'closed' : 'open'}`}>

                </div>
            </div>
        </section>
    )
}