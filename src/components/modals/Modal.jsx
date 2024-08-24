import { useContext, useEffect, useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { ModalContext } from "../../context/ModalContext";

export default function Modal() {

    const { content, title, closed, open } = useContext(ModalContext);
    
    const [modalOpen, setModalOpen] = useState(false);
    const [animation, setAnimation] = useState(true);

    useEffect(() => {
        setModalOpen(open);
    }, [open]);

    const handleClose = () => {
        setAnimation(false);
        setTimeout(() => {
            closed();
            setAnimation(true);
        }, 340);
    };

    if (!modalOpen) return null;

    return (
        <div id='Modal' className={animation ? 'fade-in' : 'fade-out'}>
            <div className={`modal ${animation ? 'zoom-in' : 'zoom-out'}`}>

                    <div className="container">
                        <div className="header">
                            <h2>{title}</h2>
                            <IoCloseCircleOutline className='closed-btn' onClick={handleClose} />
                        </div>
                        {content}
                    </div>

            </div>
        </div>
    )
}