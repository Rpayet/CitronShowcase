import { useContext, useEffect, useState } from "react";
import { usePageTransition } from "../../services/navigation/animationService";
import { DashboardContext } from "../../context/DashboardContext";
import { Sprite, Stage } from "@pixi/react";
import { AppContext } from "../../context/AppProvider";
import Bookmark from "./Bookmark";
import Dashboard from "./Dashboard";
import { useIcon } from "../../services/iconService";
import { AnimationContext } from "../../context/AnimationContext";
import ArticlesStickerBtn from "./landing-btn/ArticlesStickerBtn";
import PortfolioStickerBtn from "./landing-btn/PortfolioStickerBtn";
import ArcadeStickerBtn from "./landing-btn/ArcadeStickerBtn";

export default function Notebook() {

    const { animus } = useContext(AnimationContext);
    const { dashboardComp } = animus;

    return (
        <div id="Notebook" className={dashboardComp.open ? "nb-op" : "nb-cls"}>
            {/** Notebook content - navigation, filters & options */}
            <div id="Nb_content" className={dashboardComp.open ? "nbc-op" : "nbc-cls"}>
                <div className={dashboardComp.open ? "pages_bg-op" : "pages_bg-cls"}></div>
            </div>
            {/** Bookmark - styles & category reminder */}
            <Bookmark />
            {/** Cover */}
            <div id="Nb_cover" className={dashboardComp.open ? "nbcover-op" : "nbcover-cls"}>
                {/** Landing Navigation */}	
                <nav id="Nb_nav">
                    <ul>
                        <li>
                            <ArticlesStickerBtn />
                            <PortfolioStickerBtn />
                            <ArcadeStickerBtn />
                        </li>
                    </ul>
                </nav>
                {/** Frontpage - Header use */}
                <div id="Nb_frontpage">
                    <div className="nb_h1">
                        <h1>Design & code <br/><span>Robin Payet</span></h1>
                        <div className="seam"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}