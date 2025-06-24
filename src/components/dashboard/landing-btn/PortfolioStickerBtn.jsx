import { useContext, useEffect } from "react";
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

    useEffect(() => {
            // Circle radius
            const radius = 35;
            // Circle center
            const centerX = 50;
            const centerY = 50;
            // First 4 characters positioning
            for (let i = 3; i >= 0; i--) {
                const angle = i * 30 * (Math.PI / 180);
                const x = centerX + radius * Math.cos(angle);
                const y = centerY - radius * Math.sin(angle);
                const charElement = document.querySelector(`.portfolio_char-${3 - i}`);
                if (charElement) {
                    charElement.style.left = `${x}%`;
                    charElement.style.top = `${y}%`;
                    charElement.style.transform = `translate(-50%, -50%) rotate(${(3 - i) * 30}deg)`;
                }
            }
            // Last 5 characters positioning
            for (let i = 4; i < 9; i++) {
                const angle = (i - 4) * 30 * (Math.PI / 180);
                const x = centerX - radius * Math.cos(angle);
                const y = centerY + radius * Math.sin(angle);
                const charElement = document.querySelector(`.portfolio_char-${i}`);
                if (charElement) {
                    charElement.style.left = `${x}%`;
                    charElement.style.top = `${y}%`;
                    charElement.style.transform = `translate(-50%, -50%) rotate(-${((i - 4) * 30) + 270}deg)`;
                }
            }
        }, []);

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