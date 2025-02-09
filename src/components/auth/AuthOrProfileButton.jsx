import { useContext } from "react";
import { IoIosArrowDropdown } from "react-icons/io";
import { ModalContext } from "../../context/ModalContext";
import Login from "./Login";
import { AppContext } from "../../context/AppProvider";
import { AnimationContext } from "../../context/AnimationContext";
import { useAuth } from "../../context/AuthContext";
import { FaUser } from "react-icons/fa";
import ProfilMenu from "../user/ProfilMenu";

export default function AuthOrProfileButton() {

    const { setContent, setTitle, setOpen } = useContext(ModalContext);
    const { mainLoading } = useContext(AppContext);
    const { animus, setAnimus } = useContext(AnimationContext);
    const { loginComp, profilComp } = animus;
    const user = useAuth().user;

    const handleLoginModal = () => {
        setTitle('Connexion');
        setContent(() => (<Login />));
        setOpen(true);
    }

    const handleProfilmodal = () => {
        setTitle('Profil');
        setContent(() => (<ProfilMenu />));
        setOpen(true);
    }
    
    return (
        <div id="Authentication" className={mainLoading ? 'hide' : 'show'}>
            <div className={`container ${user ? 'register' : 'unregister'}`}>
                {!user
                    ?
                    <div className={`auth-btn ${loginComp ? 'show' : 'hide'}`} onClick={handleLoginModal}>
                        <p>Connexion</p>
                    </div>
                    :
                    <div className={`profil`} onClick={handleProfilmodal}>
                        <div className={`user-menu ${profilComp ? 'show' : 'hide'}`}>
                            <p className="user-name">{user.username}</p>
                            <IoIosArrowDropdown className='user-menu' />
                        </div>
                        {user.picture ? (
                            <img
                                src={`/assets/user/img/${user.picture}`}
                                alt={user.name}
                                className={`picture ${profilComp ? 'show' : 'hide'}`} />
                        ) : (
                            <FaUser className='default'/>
                        )}
                    </div>
                }
            </div>

        </div>
    )
}