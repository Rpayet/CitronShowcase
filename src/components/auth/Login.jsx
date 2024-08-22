import { useContext, useState } from "react";
import { ModalContext } from "../../context/ModalContext";
import Register from "./Register";

export default function Login() {

    const { setContent, setTitle, setOpen } = useContext(ModalContext);

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    const openRegister = () => {
        setContent(() => (<Register />) );
        setTitle('Inscription');
        setOpen(true);
    }

    return (
        <div id='Login'>
        <form className="form">
            {/* {error && (
                <div className="">
                    {error}
                </div>
            )} */}

            {/* {userIdentifier && (
                <div className="">
                    {userIdentifier.name},
                    <p onClick={handleLogout} className="">
                        Game Over
                    </p>
                </div>
            )} */}

            {!userIdentifier && (
                <>
                    <div className='email'>
                        <label htmlFor="inputUsername" className="label">Identifiant</label>
                        <input
                            type="email"
                            value={email}
                            name="email"
                            id="inputUsername"
                            onChange={(e) => setEmail(e.target.value)}
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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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


                    <p className="submit-btn" onClick={handleLogin} >
                        - Insert Coin -
                    </p>

                </>
            )}

        </form>

        <p className='redirect' onClick={() => openRegister()}>Vous n'êtes pas encore inscrit ?</p>
        
    </div>

    )
}