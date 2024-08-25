import { useContext, useState } from "react";
import { ModalContext } from "../../context/ModalContext";
import Login from "./Login";
import { useAuth } from "../../context/AuthContext";
import RegisterSuccess from "./RegisterSuccess";
import Loading from "../modals/Loading";

export default function Register() {

    const { setContent, setTitle, setOpen } = useContext(ModalContext);

    const [isLoading, setIsLoading] = useState(false);

    const auth = useAuth();

    const [ data, setInput ] = useState({
        username: '',
        email: '',
        password: '',
        password_confirmation: ''
    });

    const openLogin = () => {
        setContent(() => (<Login />) );
        setTitle('Connexion');
        setOpen(true);
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const response = await auth.registerAction(data);
        if (response.error) {
            setIsLoading(false);
            //TODO : Replace with error message for each fields
            console.log(response.error);
            return;
        } else if (response.success) {
            auth.loginAction({ email: data.email, password: data.password });
            setTitle('Inscription réussie');
            setContent(() => (<RegisterSuccess />) );
            setTimeout(() => {
                setOpen(false);
            }, 5000);
        }
    };

    //TODO : Add validator in the render

    return (
        <div id="Register">
            <form className='form' onSubmit={handleRegister}>
                <div className="username">
                    <label className='label' htmlFor="username">Nom d'utilisateur</label>
                    <input 
                        onChange={(e) => setInput({...data, username: e.target.value})}
                        className="input" 
                        type="text" 
                        name="username" 
                        id="username" />
                </div>
                <div className="email">
                    <label className='label' htmlFor="email">Email</label>
                    <input 
                        onChange={(e) => setInput({...data, email: e.target.value})}
                        className="input" 
                        type="email" 
                        name="email" 
                        id="email" />
                </div>
                <div className="password">
                    <label className='label' htmlFor="password">Mot de passe</label>
                    <input 
                        onChange={(e) => setInput({...data, password: e.target.value})}
                        className="input" 
                        type="password" 
                        name="password" 
                        id="password" />
                </div>
                <div className="password">
                    <label className='label' htmlFor="passwordConfirm">Confirmation du mot de passe</label>
                    <input 
                        onChange={(e) => setInput({...data, password_confirmation: e.target.value})}
                        className="input" 
                        type="password" 
                        name="passwordConfirm" 
                        id="passwordConfirm" />
                </div>
                <button 
                    type='submit'
                    className="submit-btn">
                        {isLoading ? <Loading /> : <span>S'inscrire</span>}
                </button>
            </form>
            <button type='button' className='redirect' onClick={() => openLogin()}>Déjà inscrit ?</button>
        </div>
    )
}