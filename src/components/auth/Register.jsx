import { useContext } from "react";
import { ModalContext } from "../../context/ModalContext";
import Login from "./Login";

export default function Register() {

    const { setContent, setTitle, setOpen } = useContext(ModalContext);

    const openLogin = () => {
        setContent(() => (<Login />) );
        setTitle('Connexion');
        setOpen(true);
    }

    return (
        <div id="Register">
            <form className='form'>
                <div className="email">
                    <label className='label' htmlFor="email">Email</label>
                    <input className="input" type="email" name="email" id="email" />
                </div>
                <div className="password">
                    <label className='label' htmlFor="password">Mot de passe</label>
                    <input className="input" type="password" name="password" id="password" />
                </div>
                <div className="password">
                    <label className='label' htmlFor="passwordConfirm">Confirmation du mot de passe</label>
                    <input className="input" type="password" name="passwordConfirm" id="passwordConfirm" />
                </div>
                <p className="submit-btn">S'inscrire</p>
            </form>
            <p className='redirect' onClick={() => openLogin()}>Déjà inscrit ?</p>
        </div>
    )
}