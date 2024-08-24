import { useContext } from "react";
import { IoIosArrowDropdown } from "react-icons/io";
import { ModalContext } from "../../context/ModalContext";
import Login from "./Login";
import { AppContext } from "../../context/AppProvider";
import { AnimationContext } from "../../context/AnimationContext";
import { useAuth } from "../../context/AuthContext";

export default function LoginBtn() {

    const { setContent, setTitle, setOpen } = useContext(ModalContext);
    const { mainLoading } = useContext(AppContext);
    const { animations } = useContext(AnimationContext);
    const user = useAuth().user;
    const [loginAnimation, setLoginAnimation] = animations.login;
    const [profilAnimation, setProfilAnimation] = animations.profil;

    const handleLoginModal = () => {
        setTitle('Connexion');
        setContent(() => (<Login />));
        setOpen(true);
    }
    
    return (
        <div id="Authentication" className={mainLoading ? 'hide' : 'show'}>
            <div className={`container ${user ? 'register' : 'unregister'}`}>
                {!user
                    ?
                    <div className={`loginbtn ${loginAnimation ? 'show' : 'hide'}`} onClick={handleLoginModal}>
                        <p>Connexion</p>
                    </div>
                    :
                    <div className={`profil`} onClick={handleLoginModal}>
                        <div className={`user-menu ${profilAnimation ? 'show' : 'hide'}`}>
                            <p className="user-name">{user.username}</p>
                            <IoIosArrowDropdown />
                        </div>
                        {user.picture ? (
                            <img
                                src={`/assets/user/img/${user.picture}`}
                                alt={user.name}
                                className={`picture ${profilAnimation ? 'show' : 'hide'}`} />
                        ) : (
                            <img
                                src="/assets/admin/img/navigation/profil-default.png"
                                alt="Default"
                                className={`picture ${profilAnimation ? 'show' : 'hide'}`} />
                        )}
                    </div>
                }
            </div>

        </div>
    )
}