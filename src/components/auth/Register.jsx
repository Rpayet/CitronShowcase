import { useContext, useState } from "react";
import { ModalContext } from "../../context/ModalContext";
import Login from "./Login";
import Axios from "../../services/server/callerService";
import { useAuth } from "../../context/AuthContext";

export default function Register() {

    const { setContent, setTitle, setOpen } = useContext(ModalContext);

    const auth = useAuth();

    const [ input, setInput ] = useState({
        username: '',
        email: '',
        password: '',
        passwordConfirm: ''
    });

    const openLogin = () => {
        setContent(() => (<Login />) );
        setTitle('Connexion');
        setOpen(true);
    };

    const handleRegister = async (e) => {

        e.preventDefault();

        if (input.password !== input.passwordConfirm) {
            //TODO : Add validator
            console.log('Les mots de passe ne correspondent pas');
            return;
        } else {
            try {
                const response = await Axios.post('api/v1/auth/register', {
                    username: input.username,
                    email: input.email,
                    password: input.password
                });

                if (response.status === 200) {
                    auth.loginAction({
                        username: input.username,
                        password: input.password
                    });
                }

            } catch {
                console.log('Une erreur est survenue lors de l\'inscription');
            }
            return;
        }
    };

    //TODO : Add validator

    return (
        <div id="Register">
            <form className='form' onSubmit={handleRegister}>
                <div className="username">
                    <label className='label' htmlFor="username">Nom d'utilisateur</label>
                    <input 
                        onChange={(e) => setInput({...input, username: e.target.value})}
                        className="input" 
                        type="text" 
                        name="username" 
                        id="username" />
                </div>
                <div className="email">
                    <label className='label' htmlFor="email">Email</label>
                    <input 
                        onChange={(e) => setInput({...input, email: e.target.value})}
                        className="input" 
                        type="email" 
                        name="email" 
                        id="email" />
                </div>
                <div className="password">
                    <label className='label' htmlFor="password">Mot de passe</label>
                    <input 
                        onChange={(e) => setInput({...input, password: e.target.value})}
                        className="input" 
                        type="password" 
                        name="password" 
                        id="password" />
                </div>
                <div className="password">
                    <label className='label' htmlFor="passwordConfirm">Confirmation du mot de passe</label>
                    <input 
                        onChange={(e) => setInput({...input, passwordConfirm: e.target.value})}
                        className="input" 
                        type="password" 
                        name="passwordConfirm" 
                        id="passwordConfirm" />
                </div>
                <button 
                    type='submit'
                    className="submit-btn">
                        S'inscrire
                </button>
            </form>
            <p className='redirect' onClick={() => openLogin()}>Déjà inscrit ?</p>
        </div>
    )
}