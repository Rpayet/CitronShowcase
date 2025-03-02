import { useContext, useState } from "react";
import { DashboardContext } from "../../context/DashboardContext";

export default function Bookmark({ id }) {

    const { dashboardContent } = useContext(DashboardContext);
    const { category } = dashboardContent;  

    return (
        <div id={`Bookmark-${id}`} className={`bk-${id}-${category.to === '' ? 'cl' : 'op'}`}>
            <div className={`main_cat-${id}`}></div>
            <div className={`ribbon-${id}-${category.to === '' ? 'cl' : 'op'}`}></div>
            <div className={`page_trans-${id}-${category.to === '' ? 'cl' : 'op'}`}></div>
        </div>
    )
}