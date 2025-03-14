import { useContext } from "react";
import Dashboard from "./Dashboard";
import { AnimationContext } from "../../context/AnimationContext";

const PageTransition = () => {
    return (
        <div className="page_trans"></div>
    )
}

export default function Bookmark() {
    const { animus } = useContext(AnimationContext);
    const { dashboardComp } = animus;
    return (
        <div id="Bookmark" className={dashboardComp.open ? "bk-op" : "bk-cls"}>
            <div className="page_main"></div>
            <Dashboard />
            {dashboardComp.transition && <PageTransition />}
            {/** {dashboardComp.open && <PageTransition />} */}
        </div>
    )
}