import { useContext, useState } from "react";
import { ModalContext } from "../../context/ModalContext";
import Register from "./Register";
import { AppContext } from "../../context/AppProvider";
import { useAuth } from "../../context/AuthContext";

export default function Login() {

    const { setContent, setTitle, setOpen } = useContext(ModalContext);
    const auth = useAuth();

    const [input, setInput] = useState({
        email: '',
        password: ''
    });

    const handleSubmitEvent = (e) => {
        e.preventDefault();
        if (input.username !== "" && input.password !== "") {
            setOpen(false);
            auth.loginAction(input);
            return;
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
            {/**TODO : Error Message */}
            {/* {error && (
                <div className="">
                    {error}
                </div>
            )} */}
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

            <div className="remember">
                <label>
                    <input type="checkbox" name="_remember_me" /> Se souvenir de moi
                </label>
            </div>


            <button type='submit' className="submit-btn" >
                - Insert Coin -
            </button>

        </form>

        <p className='redirect' onClick={() => openRegister()}>Vous n'êtes pas encore inscrit ?</p>
        
    </div>

    )
}