import {useContext, useEffect} from "react";
import {AnimationContext} from "../context/AnimationContext";
import { DashboardContext } from "../context/DashboardContext";
import { AppContext } from "../context/AppProvider";
import { Sprite, Stage } from "@pixi/react";

export default function Landing() {

    const { setAnimus } = useContext(AnimationContext);
    const { dashboardContent } = useContext(DashboardContext);
    const { navigation, category, subcategory, description } = dashboardContent;
    const { lemonifylogoset } = useContext(AppContext);

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
                                    <a className={`navLink ${link.id}`}>
                                        <div className={`${link.id}-icon`}>
                                            <Stage width={128} height={128} options={{backgroundAlpha: 0}}>
                                                <Sprite
                                                    image={lemonifylogoset}
                                                    position={link.theme}
                                                    anchor={[0, 0]}
                                                    scale={1} />
                                            </Stage>
                                        </div>
                                        <p className={`${link.id}-name`}>{link.name}</p>
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
            {/* <Menu /> */}
        </section>
    )
}