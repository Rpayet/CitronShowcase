import { useContext, useState } from "react";
import { DashboardContext } from "../../context/DashboardContext";
import Dashboard from "./Dashboard";
import { Sprite, Stage } from "@pixi/react";
import { useIcon } from "../../services/iconService";
import { AppContext } from "../../context/AppProvider";

export default function Bookmark({ id }) {

    const { handleIconPosition } = useIcon();
    const { dashboardContent } = useContext(DashboardContext);
    const { lemonifylogoset } = useContext(AppContext);
    const { category } = dashboardContent;  

    return (
        <div id={`Bookmark-${id}`} className={`bk-${id}-${category.to === '' ? 'cl' : 'op'}`}>
            <Dashboard />
            <div className={`ribbon-${id}-${category.to === '' ? 'cl' : 'op'}`}></div>
            <div className={`main_cat-${id}`}>
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
            <div className={`page_trans-${id}-${category.to === '' ? 'cl' : 'op'}`}></div>
        </div>
    )
}