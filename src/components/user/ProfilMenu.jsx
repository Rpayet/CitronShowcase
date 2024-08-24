import { FaGear } from "react-icons/fa6";
import { ImProfile } from "react-icons/im";
import { AiOutlineLogout } from "react-icons/ai";
import { useAuth } from "../../context/AuthContext";
import { useContext } from "react";
import { ModalContext } from "../../context/ModalContext";

export default function ProfilMenu() {

    //TODO : Replace React Icons with custom icons
    const auth = useAuth();
    const { setOpen } = useContext(ModalContext);

    const handleLogout = () => {
        auth.logout();
        setOpen(false);
    }

    return (
        <div id="Profil-menu">
            <button
                className='profil-btn'
                onClick={() => { }}
                type='button'
                id="Profil">
                    <ImProfile />
                    <span>Profil</span>
            </button>
            <button
                className='profil-btn'
                onClick={() => { }}
                type='button'
                id="Config">
                    <FaGear />
                    <span>Paramètres</span>
            </button>
            <button
                className='profil-btn'
                onClick={handleLogout}
                type='button'
                id="Logout">
                    <AiOutlineLogout />
                    <span>Déconnexion</span>
            </button>
        </div>
    )
}