import { Stage, TilingSprite } from "@pixi/react";
import { useContext, useEffect, useRef, useState } from "react";
import { AnimationContext } from "../../context/AnimationContext";
import { AppContext } from "../../context/AppProvider";
import { useIcon } from "../../services/iconService";
import { DashboardContext } from "../../context/DashboardContext";

export default function BgPixiGenerator() {
    
    const [patternUrl, setPatternUrl] = useState(null);
    const [tilePosition, setTilePosition] = useState({ x: 0, y: 0 });
    const [speed, setSpeed] = useState({ x: 0.5, y: 0.25 });
    const animationRef = useRef(null);

    const { animus } = useContext(AnimationContext);
    const { bgPattern } = animus;
    const { state, pattern } = bgPattern;
    const { lemonifylogoset } = useContext(AppContext);
    const { dashboardContent } = useContext(DashboardContext);

    const patternId = dashboardContent.navigation.find(link => link.to === pattern)?.id;

    const { handleIconPosition } = useIcon();

    const [patternCoords, setPatternCoords] = useState(handleIconPosition(256, patternId, 0));

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
        let duration = 1000; // Durée de la transition en millisecondes
        let initialSpeed = { ...speed }; // Sauvegarder la vitesse initiale
        let targetSpeed = state ? { x: 25, y: 50 } : { x: 0.5, y: 0.25 };

        const easeInOut = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

        const updateSpeed = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            const easedProgress = easeInOut(progress);

            // Interpolation entre les vitesses initiales et finales
            setSpeed({
                x: (initialSpeed.x + (targetSpeed.x - initialSpeed.x) * easedProgress) * 2,
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
                x: !animus.dashboardComp.open ? prevPosition.x + speed.x : prevPosition.x - speed.x,
                y: prevPosition.y + ((speed.y) / 3),
            }));

            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [speed, animus]);

    useEffect(() => {
        setPatternCoords(handleIconPosition(256, patternId, 0));
    }, [pattern, patternId]);

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
