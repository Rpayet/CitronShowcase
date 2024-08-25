import { useContext, useState } from "react";
import { ModalContext } from "../../context/ModalContext";
import Register from "./Register";
import { AppContext } from "../../context/AppProvider";
import { useAuth } from "../../context/AuthContext";
import Loading from "../modals/Loading";

export default function Login() {

    const { setContent, setTitle, setOpen } = useContext(ModalContext);
    const auth = useAuth();

    const [input, setInput] = useState({
        email: '',
        password: ''
    });

    const [isLoading, setIsLoading] = useState(false);

    const [error, setError] = useState(false);

    const handleSubmitEvent = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        if (input.username !== "" && input.password !== "") {
            const response = await auth.loginAction(input);
            if (response.success) {
                setIsLoading(false);
                setOpen(false);
                return;
            } else if (response.error) {
                setIsLoading(false);
                setError(true);
                return;
            } else {
                setIsLoading(false);
                setContent(() => (<p>Une erreur est survenue</p>));
                return;
            }
        }
        //TODO : Add validator 
        console.log('Veuillez remplir tous les champs');
    };

    const openRegister = () => {
        setContent(() => (<Register />) );
        setTitle('Inscription');
        setOpen(true);
    }

    return (
        <div id='Login'>
        <form className="form" onSubmit={handleSubmitEvent}>
            {error && (
                <p className='error'>Identifiants incorrects</p>
            )}
            <div className='email'>
                <label htmlFor="inputUsername" className="label">Identifiant</label>
                <input
                    type="email"
                    value={input.email}
                    name="email"
                    id="inputUsername"
                    onChange={(e) => setInput({...input, email: e.target.value})}
                    className="input"
                    required
                />
            </div>

            <div className='password'>
                <label htmlFor="inputPassword" className="label">Mot de passe</label>
                <input
                    type="password"
                    name="password"
                    id="inputPassword"
                    value={input.password}
                    onChange={(e) => setInput({...input, password: e.target.value})}
                    className="input"
                    autoComplete="current-password"
                    required
                />
            </div>
            
            {/** TODO: styles it for focus */}
            <div className="remember">
                <label>
                    <input type="checkbox" name="_remember_me" /> Se souvenir de moi
                </label>
            </div>


            <button type='submit' className="submit-btn" >
                {isLoading ? <Loading /> : 'Connexion'}
            </button>

        </form>

        <p className='redirect' onClick={() => openRegister()}>Vous n'êtes pas encore inscrit ?</p>
        
    </div>

    )
}