import { useContext, useEffect, useState } from "react";
import { DashboardContext } from "../../context/DashboardContext";
import Dashboard from "./Dashboard";
import { Sprite, Stage } from "@pixi/react";
import { useIcon } from "../../services/iconService";
import { AppContext } from "../../context/AppProvider";
import { AnimationContext } from "../../context/AnimationContext";

export default function Bookmark({ id }) {

    const { handleIconPosition } = useIcon();
    const { dashboardContent } = useContext(DashboardContext);
    const { lemonifylogoset } = useContext(AppContext);
    const { animus } = useContext(AnimationContext);
    const { dashboardComp } = animus;
    const { category } = dashboardContent;

    const [ switchClass, setSwitchClass ] = useState('');

    useEffect(() => {
        const getSwitchClass = () => {
            if (dashboardComp.open && dashboardComp.transition) return 'swon';
            if (dashboardComp.open && !dashboardComp.transition) return 'swoff';
            return '';
        }
        setSwitchClass(getSwitchClass());
    }, [dashboardComp]);

    return (
        <div id={`Bookmark-${id}`} className={(id === 1) ? switchClass : ''}>
            <Dashboard bookmarkId={id} />
            <div className={`ribbon-${!dashboardComp.open ? 'cl' : 'op'}`}>
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
            <div className={`page_trans-${!dashboardComp.open ? 'cl' : 'op'}`}></div>
        </div>
    )
}