import { useContext } from "react";
import { IoIosArrowDropdown } from "react-icons/io";
import { ModalContext } from "../../context/ModalContext";
import Login from "./Login";

export default function LoginBtn() {

    const { setContent, setTitle, setOpen } = useContext(ModalContext);

    const handleLoginModal = () => {
        setTitle('Connexion');
        setContent(() => (<Login />));
        setOpen(true);
    }

    return (
        <div id="Authentication" className={mainLoading ? 'hide' : 'show'}>
            <div className={`container ${userIdentifier ? 'register' : 'unregister'}`}>
                {!userIdentifier
                    ?
                    <div className={`login ${loginAnimation ? 'show' : 'hide'}`} onClick={handleLoginModal}>
                        <p>Connexion</p>
                    </div>
                    :
                    <div className={`profil`} onClick={handleLoginModal}>
                        <div className={`user-menu ${profilAnimation ? 'show' : 'hide'}`}>
                            <p className="user-name">{userIdentifier.name}</p>
                            <IoIosArrowDropdown />
                        </div>
                        {userIdentifier.picture ? (
                            <img
                                src={`/assets/user/img/${userIdentifier.picture}`}
                                alt={userIdentifier.name}
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