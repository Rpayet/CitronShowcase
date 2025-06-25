import { useContext } from "react";
import { usePageTransition } from "../../../services/navigation/animationService";
import { Sprite, Stage } from "@pixi/react";
import { useIcon } from "../../../services/iconService";
import { AppContext } from "../../../context/AppProvider";

export default function ArcadeStickerBtn() {
    
    const { handleNavigation } = usePageTransition();
    const { lemonifylogoset } = useContext(AppContext);
    const { handleIconPosition } = useIcon();

    return (
        <a className=" navLink arcadepalace" onClick={() => handleNavigation('arcadepalace')}>
            <svg viewBox="0 0 100 100" className="arcade-word-svg">
                <path
                    id="MyPath"
                    fill="none"
                    stroke="none"
                    d="M 2.3188705,94.840561 A 61.681129,61.681129 0 0 1 64,33.159431 a 61.681129,61.681129 0 0 1 61.68113,61.68113" />
                <text>
                    <textPath href="#MyPath" className="arcade-word">Arcade</textPath>
                </text>
            </svg>
            <div className="arcadepalace-sticker-container">
                <p className="palace_word">Palace</p>
                <div className="arcadepalace-icon">
                    <Stage width={128} height={128} options={{ backgroundAlpha: 0 }}>
                        <Sprite 
                            image={lemonifylogoset}
                            position={handleIconPosition(128, 3, 0)}
                            anchor={[0, 0]}
                            scale={1} />
                    </Stage>
                </div>
                <span className="arcadepalace-sticker"></span>
            </div>
            <span className="arcadepalace-sticker-ghost"></span>
        </a>
    )
}