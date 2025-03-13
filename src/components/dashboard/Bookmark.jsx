import { useContext, useEffect, useState } from "react";
import { DashboardContext } from "../../context/DashboardContext";
import Dashboard from "./Dashboard";
import { Sprite, Stage } from "@pixi/react";
import { useIcon } from "../../services/iconService";
import { AppContext } from "../../context/AppProvider";
import { AnimationContext } from "../../context/AnimationContext";

const PageTransition = () => {

    const [zIndex, setZIndex] = useState();
    return (
        <div className="page_trans"></div>
    )
}

export default function Bookmark() {

    const { handleIconPosition } = useIcon();
    const { dashboardContent } = useContext(DashboardContext);
    const { lemonifylogoset } = useContext(AppContext);
    const { animus } = useContext(AnimationContext);
    const { dashboardComp } = animus;
    const { category } = dashboardContent;

    const getSwitchAnimation = () => {
        const switchRotate = dashboardComp.transition ? 'bk-switch-anim 1s ease-in-out' : 'none';
        const ribbonHeight = dashboardComp.transition ? '0px' : '840px';
        document.documentElement.style.setProperty('--bk-switch-anim', switchRotate);
        document.documentElement.style.setProperty('--ribbon-height', ribbonHeight);
    };

    useEffect(() => {
        getSwitchAnimation();
    }, [dashboardComp]);

    return (
        <div id="Bookmark">
            <div className="page_main"></div>
            <Dashboard />
            {dashboardComp.transition && <PageTransition />}
            <div className="ribbon"> 
                <div className="main_cat_icon">
                    <Stage
                        width={64}
                        height={64}
                        options={{backgroundAlpha: 0}}>
                            <Sprite
                                image={lemonifylogoset}
                                position={handleIconPosition(64, category.id, 0)}
                                anchor={[0,0]}
                                scale={1} />
                    </Stage>
                </div>
            </div>
            {/** {dashboardComp.open && <PageTransition />} */}
        </div>
    )
}