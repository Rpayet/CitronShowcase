import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";

export default function Resume({ landingPageAnim }) {

    const getScaleInClass = () => {
        return landingPageAnim ? 'scaleIn' : 'scaleOut';
    };

    return (
        <div id="Resume">
            <div className={`pictures ${getScaleInClass()}`}>
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