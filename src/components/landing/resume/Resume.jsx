import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";

export default function Resume() {
    return (
        <div id="Resume">
            <div className="pictures">
                <p>Image</p>
                <div className="presentation">
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