import { Stage, TilingSprite } from "@pixi/react";
import { useContext, useEffect, useRef, useState } from "react";
import { AnimationContext } from "../../context/AnimationContext";
import { AppContext } from "../../context/AppProvider";

export default function BgPixiGenerator() {
    
    const [patternUrl, setPatternUrl] = useState(null);
    const [tilePosition, setTilePosition] = useState({ x: 0, y: 0 });
    const [speed, setSpeed] = useState({ x: 0.5, y: 0.25 });
    const animationRef = useRef(null);

    const { animations } = useContext(AnimationContext);
    const { appTheme, lemonifylogoset } = useContext(AppContext);
    const [bgPattern, setBgPattern] = animations.bgPattern;
    const { state, pattern } = bgPattern;

    const patternArray = {
        lemonify: { light: [0, 0], dark: [0, 256] },
        articles: { light: [256, 0], dark: [256, 256] },
        portfolio: { light: [512, 0], dark: [512, 256] },
        arcadepalace: { light: [768, 0], dark: [768, 256] },
        mktrials: { light: [1024, 0], dark: [1024, 256] },
        wheels: { light: [1280, 0], dark: [1280, 256] },
        sonictactoe: { light: [1536, 0], dark: [1536, 256] },
    };

    const [patternCoords, setPatternCoords] = useState(patternArray[pattern][appTheme]);

    useEffect(() => {
        const createPattern = async () => {
            const image = new Image();
            image.src = lemonifylogoset;

            image.onload = () => {
                const iconWidth = 256;
                const iconHeight = 256;

                const patternWidth = iconWidth * 2;
                const patternHeight = iconHeight * 2;

                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");

                canvas.width = patternWidth;
                canvas.height = patternHeight;

                ctx.drawImage(
                    image,
                    patternCoords[0], // Coordonnées x de l'icône dans le sprite
                    patternCoords[1], // Coordonnées y de l'icône dans le sprite
                    iconWidth, iconHeight,
                    0, 0,
                    iconWidth, iconHeight
                );

                ctx.drawImage(
                    image,
                    patternCoords[0], // Coordonnées x de l'icône dans le sprite
                    patternCoords[1], // Coordonnées y de l'icône dans le sprite
                    iconWidth, iconHeight,
                    iconWidth, iconHeight,
                    iconWidth, iconHeight
                );

                const url = canvas.toDataURL("image/png");
                setPatternUrl(url);
            };
        };

        createPattern();
    }, [patternCoords]);

    useEffect(() => {
        let startTime = performance.now();
        let duration = 500; // Durée de la transition en millisecondes
        let initialSpeed = { ...speed }; // Sauvegarder la vitesse initiale
        let targetSpeed = state ? { x: 25, y: 50 } : { x: 0.5, y: 0.25 };

        const easeInOut = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

        const updateSpeed = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            const easedProgress = easeInOut(progress);

            // Interpolation entre les vitesses initiales et finales
            setSpeed({
                x: initialSpeed.x + (targetSpeed.x - initialSpeed.x) * easedProgress,
                y: initialSpeed.y + (targetSpeed.y - initialSpeed.y) * easedProgress,
            });

            if (progress < 1) {
                requestAnimationFrame(updateSpeed);
            }
        };

        requestAnimationFrame(updateSpeed);
    }, [state]);

    useEffect(() => {
        const animate = () => {
            setTilePosition((prevPosition) => ({
                x: prevPosition.x + speed.x,
                y: prevPosition.y + speed.y,
            }));

            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [speed]);

    useEffect(() => {
        setPatternCoords(patternArray[pattern][appTheme]);
    }, [pattern, appTheme]);

    return (
        <div id="BgPixiGenerator">
            <Stage
                width={window.innerWidth}
                height={window.innerHeight}
                options={{ backgroundAlpha: 0 }}
            >
                {patternUrl && (
                    <TilingSprite
                        image={patternUrl}
                        width={window.innerWidth}
                        height={window.innerHeight}
                        tileScale={{ x: 1, y: 1 }}
                        tilePosition={tilePosition}
                    />
                )}
            </Stage>
        </div>
    );
}
