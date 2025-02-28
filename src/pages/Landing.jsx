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
    const [test2, setTest2] = useState(false);

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
            <button className={`button-test-1`} onClick={() => setTest(!test)}>op/cl</button>
            <button className={`button-test-2`} onClick={() => setTest2(!test2)}>switch</button>
            {/** Notebook */}
            <div id="Notebook" className={`nb-${!test ? 'cl' : 'op'}`}>
                {/** Notebook content - filters & options */}
                <div id="Nb_content" className={`nb_ct-${!test ? 'cl' : 'op'}`}>
                    <div className={`pages_bg-${!test ? 'cl' : 'op' }`}>
                        <div className={`page-main-${!test ? 'cl' : 'op'}`}>

                        </div>
                    </div>
                </div>
                {/** Bookmark - styles & category reminder */}
                <div id="Bookmark" className={`bk-${!test ? 'cl' : 'op-'}${test2 ? 'sw' : ''}`}>
                    <div className="main_cat"></div>
                    <div className={`ribbon-${!test ? 'cl' : 'op'}`}></div>
                    <div className={`page_trans-${!test ? 'cl' : 'op-'}${test2 ? 'sw' : '' }`}></div>
                </div>
                {/** Cover */}
                <div id="Nb_cover" className={`nbc-${!test ? 'cl' : 'op'}`}>	
                    <nav id="Nb_nav">
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
                    <div id="Nb_Frontpage" className={`nbf-${!test ? 'cl' : 'op'}`}>
                        <div className="nb_h1">
                            <h1>Design & code <br/><span>Robin Payet</span></h1>
                            <div className="seam"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}