import { Route, Routes } from 'react-router-dom';
import './App.css';
import WheelGame from './pages/WheelGame';
import Dashboard from './components/dashboard/Dashboard';
import Landing from './pages/Landing';
import ArcadePalace from './pages/ArcadePalace';
import GameProvider from './context/GameContext';
import { MkProvider } from './context/MkContext';
import EventsList from './components/arcade/mariokart/search/EventsList';
import LoginBtn from './components/auth/AuthOrProfileButton';
import Modal from './components/modals/Modal';
import PrivateRoute from './routes/authorizations/PrivateRoute';
import { useAuth } from './context/AuthContext';
import { useContext, useEffect, useState } from 'react';
import { AnimationContext } from './context/AnimationContext';
import { Filter } from 'pixi.js';

export default function App() {

    const [patternSpeed, setPatternSpeed] = useState(30);
    const [rotateCursor, setRotateCursor] = useState(15);

    const { animations } = useContext(AnimationContext);
    const [bgPatternAnim, setBgPatternAnim] = animations.bgPattern;
    const auth = useAuth();

    // const gradientArray = {
    //     landing : 'linear-gradient(to top right, #3995a6ff 50%, #89caccff)',
    //     arcadePalace : 'linear-gradient(to top right, #ff8c00ff 50%, #ffcd56ff)',
    //     portfolio: 'linear-gradient(to top right, #8cff00ff 50%, #cdff56ff)',
    //     articles: 'linear-gradient(to top right, #ff8c4dff 50%, #ffcd58ff)',
    // }

    const patternStyleAttribution = {
        animationDuration: `${patternSpeed}s`,
        transform: `rotateZ(${rotateCursor}deg) scale(1.2)`,
    };

    // const gradientStyleAttribution = {
    //     background: `${gradientArray[bgPatternAnim.pattern]}`,
    //     transition: `all .5s ease-in-out`,
    // };

    useEffect(() => {
        let interval;
        if (!bgPatternAnim.state) {
            interval = setInterval(() => {
                setPatternSpeed(prevSpeed => prevSpeed < 30 ? prevSpeed + 1 : 30);
                setRotateCursor(prevRotate => prevRotate > 15 ? prevRotate - .1 : 15);
            }, 8);
        } else if (bgPatternAnim.state) {
            interval = setInterval(() => {
                setPatternSpeed(prevSpeed => prevSpeed > 1 ? prevSpeed - 1 : 1);
                setRotateCursor(prevRotate => prevRotate < 17 ? prevRotate + .1 : 16);
            }, 8);
        }
        return () => clearInterval(interval);
    }, [bgPatternAnim.state]);

    return (
        <div id="App">
            <div
                // style={gradientStyleAttribution} 
                className="app-container">
                <div 
                    style={patternStyleAttribution}
                    className={`bg-pattern ${bgPatternAnim.pattern}`}>
                        {/* A utiliser pour créer un arrière-plan dynamique */}
                </div>
                <Modal />
                { auth.displayAuthBtn && <LoginBtn /> }
                <Dashboard />
                <div className="main-content">
                    <Routes>
                        <Route path='/' element={<Landing />} />
                        <Route path='/arcadePalace' element={<ArcadePalace />} />
                        <Route path='/mkTrials' element={
                            <MkProvider>
                                <EventsList />
                            </MkProvider>
                        } />
                        <Route path='/wheels' element={
                            <GameProvider>
                                {/* <HeroesSelect /> */}
                                <WheelGame />
                            </GameProvider>
                        } />
                        <Route path='/sonic-tac-toe' element={<h2>STT - Jeu original en cours de travail</h2>} />

                        {/** Use this to privatize route */}
                        {/* <Route element={<PrivateRoute />}>
                            <Route path='/admin/' element={<h1>Privée</h1>} />
                        </Route> */}

                    </Routes>
                </div>
            </div>
        </div>
    );
}

