import { Sprite, Stage } from "@pixi/react";
import { usePageTransition } from "../../services/navigation/animationService";
import { useContext } from "react";
import { AppContext } from "../../context/AppProvider";
import { DashboardContext } from "../../context/DashboardContext";

export default function DashSubLinks() {
    const { handleNavigation } = usePageTransition();
    const { appTheme, lemonifylogoset } = useContext(AppContext);
    const { dashboardContent } = useContext(DashboardContext);

    const sublinks = dashboardContent.sublinks;
    
    return (
        <div className="sublinks">
            {Object.keys(sublinks).map((sublink) => {
                if (sublinks[sublink].name === dashboardContent.subcategory) 
                    return (
                        <button>Retour</button>
                );
                return (
                    <button
                        key={sublinks[sublink].id}
                        className={`sublink ${!dashboardContent.subcategory ? 'popIn' : 'popOut'}`}
                        onClick={() => handleNavigation(sublinks[sublink].to)}>
                            <div>
                                <Stage
                                    width={32}
                                    height={32}
                                    options={{backgroundAlpha: 0}}>
                                    <Sprite
                                        image={lemonifylogoset}
                                        position={sublinks[sublink][appTheme]}
                                        anchor={[0, 0]}
                                        scale={1}
                                    />
                                </Stage>
                            </div>
                            <p>{sublinks[sublink].name}</p>
                    </button>
                );
            })}
        </div> 
    )
}