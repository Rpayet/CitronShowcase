import { usePageTransition } from "../../../services/navigation/animationService";
import { useContext } from "react";
import { useIcon } from "../../../services/iconService";
import { Sprite, Stage } from "@pixi/react";
import { AppContext } from "../../../context/AppProvider";

export default function ArticlesStickerBtn() {

    const { handleNavigation } = usePageTransition();
    const { lemonifylogoset } = useContext(AppContext);
    const { handleIconPosition } = useIcon();

    const articlesIterationStyle = () => {
        return (
            [...Array(4)].map((_, i) => (
                <span key={i} className={`articles_iteration-${i}`}>Articles</span>
            ))
        );
    };

    return (
        <a className="navLink articles" onClick={() => handleNavigation('articles')}>
            <div className="articles-icon">
                <Stage width={128} height={128} options={{ backgroundAlpha: 0 }}>
                    <Sprite 
                        image={lemonifylogoset}
                        position={handleIconPosition(128, 1, 0)}
                        anchor={[0, 0]}
                        scale={1} />
                </Stage>
            </div>
            <div className="sticker-container">
                <span className="sticker-ghost"></span>
                <p className="articles-name">Articles
                    {articlesIterationStyle()}
                    <span className="articles-sticker"></span>
                </p>
            </div>
        </a>
    );
}