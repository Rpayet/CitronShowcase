import { useContext, useState } from "react";
import { DashboardContext } from "../../context/DashboardContext";

export default function Bookmark({ id }) {

    const { dashboardContent } = useContext(DashboardContext);
    const { category } = dashboardContent;
        const [test, setTest] = useState(false);
        const [test2, setTest2] = useState(false);
        const [test2Class, setTest2Class] = useState('');
    

    return (
        <div id={`Bookmark-${id}`} className={`bk-${id}-${category.id === 'lemonify' ? 'cl' : 'op'} ${test2Class}`}>
            <div className={`main_cat-${id}`}></div>
            <div className={`ribbon-${id}-${category.id === 'lemonify' ? 'cl' : 'op'}`}></div>
            <div className={`page_trans-${id}-${category.id === 'lemonify' ? 'cl' : 'op'} ${test2Class}`}></div>
        </div>
    )
}