import { useContext, useEffect, useState } from "react";
import { AnimationContext } from "../../context/AnimationContext";
import lemonifylogoset from "../../assets/images/statics/brand/lemonify_logoset.png";
import { Stage, TilingSprite } from "@pixi/react";

export default function BgGenerator() {

    const logoset = [
        {id: 'landing', light: [0, 0], dark: [0, -256]},
        {id: 'articles', light: [-256, 0], dark: [-256, -256]},
        {id: 'portfolio', light: [-512, 0], dark: [-512, -256]},
        {id: 'arcadePalace', light: [-768, 0], dark: [-768, -256]}
    ];
   
    const [translateValue, setTranslateValue] = useState({x: 0, y: 0});

    const [opacityValue, setOpacityValue] = useState(0.1);

    const { animations } = useContext(AnimationContext);

    const [bgPatternAnim, setBgPatternAnim] = animations.bgPattern;

    useEffect(() => {
        if (bgPatternAnim.state) {
                setTranslateValue({x: -10, y: 10});
                setOpacityValue(0);
        } else {
            setTranslateValue({x: 10, y: -10});
            setTimeout(() => {
                setTranslateValue({x: 0, y: 0});
                setOpacityValue(0.1);
            }, 250);
        }
    }, [bgPatternAnim]);

    const patternStyleAttribution = {
        transform: `rotateZ(${bgPatternAnim.state ? '13' : '15'}deg) scale(1.2) translate(${translateValue.x}%, ${translateValue.y}%)`,
        opacity: `${opacityValue}`,
    };

    return (
        <div 
            style={patternStyleAttribution}
            className={`bg-pattern ${bgPatternAnim.pattern}`}>
                {/* A utiliser pour créer un arrière-plan dynamique */}
        </div>
    )
}