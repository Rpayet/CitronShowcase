import { useContext } from "react";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { AnimationContext } from "../../../context/AnimationContext";
import { isPageRefreshed } from "../../../services/navigation/navigationService";

export default function Resume() {

    const { animus } = useContext(AnimationContext);
    const { lemonifyComp } = animus;

    const getScaleInClass = () => {
        return lemonifyComp ? 'scaleIn' : 'scaleOut';
    };

    const getAnimationDurationStyle = () => {
        if (isPageRefreshed()) return {
            animationDuration: '0s',
        };
        return {
            animationDuration: '.5s',
        };
    };

    return (
        <div id="Resume">
            <div 
                className={`pictures ${getScaleInClass()}`}
                style={getAnimationDurationStyle()}>
                <p>Image</p>
                <div className={`presentation ${getScaleInClass()}`}>
                    <div className="content">
                        <MdOutlineKeyboardArrowLeft className="arrow left" />
                        <p className="text">Bienvenue chez moi !</p>
                        <MdOutlineKeyboardArrowRight className="arrow right" />
                    </div>
                </div>
            </div>
        </div>
    )
}