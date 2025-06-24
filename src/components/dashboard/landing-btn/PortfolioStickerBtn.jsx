import { useContext } from "react";
import { usePageTransition } from "../../../services/navigation/animationService";
import { AppContext } from "../../../context/AppProvider";
import { useIcon } from "../../../services/iconService";
import { Sprite, Stage } from "@pixi/react";

export default function PortfolioStickerBtn() {

    const { handleNavigation } = usePageTransition();
    const { lemonifylogoset } = useContext(AppContext);
    const { handleIconPosition } = useIcon();

    const portfolioCharStyle = () => {
        let name = 'portfolio';
        return (
            name.split('').map((char, i) => (
                <span key={i} className={`portfolio_char-${i}`}>{char}</span>
            ))
        );
    };

    return (
        <a className="navLink portfolio" onClick={() => handleNavigation('portfolio')}>
            <span className="portfolio-sticker-ghost"></span>
            <div className="portfolio-sticker-container">
                <div className="portfolio-icon">
                    <Stage width={128} height={128} options={{ backgroundAlpha: 0 }}>
                        <Sprite
                            image={lemonifylogoset}
                            position={handleIconPosition(128, 2, 0)}
                            scale={1} />
                    </Stage>
                </div>
                <p className="portfolio-name">
                    {portfolioCharStyle()}
                    <span className="portfolio-sticker"></span>
                </p>
            </div>
        </a>
    )
}