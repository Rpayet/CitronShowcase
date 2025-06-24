import { Route, Routes } from 'react-router-dom';
import './App.css';
import WheelGame from './pages/WheelGame';
import Landing from './pages/Landing';
import ArcadePalace from './pages/ArcadePalace';
import GameProvider from './context/GameContext';
import { MkProvider } from './context/MkContext';
import EventsList from './components/arcade/mariokart/search/EventsList';
import LoginBtn from './components/auth/AuthOrProfileButton';
import Modal from './components/modals/Modal';
import PrivateRoute from './routes/authorizations/PrivateRoute';
import { useAuth } from './context/AuthContext';
import BgPixiGenerator from './components/background/BgPixiGenerator';
import { useEffect, useState } from 'react';
import Notebook from './components/dashboard/Notebook';

export default function App() {

    const auth = useAuth();

    const fromPage = window.location.pathname.split('/')[1];

    const [dashboardHide, setDashboardHide] = useState(false);

    useEffect(() => {
        if (fromPage !== '') {
            setDashboardHide(true);
        } else {
            setDashboardHide(false);
        }
    }, [fromPage]);

    return (
        <div id="App">
            <div className="app-container">
                <Modal />
                { auth.displayAuthBtn && <LoginBtn /> }
                <Notebook />
                <div className="main-content">
                    <Routes>
                        <Route path='/' element={<Landing />} />
                        <Route path='/arcadepalace' element={<ArcadePalace />}>
                            <Route path='mktrials' element={
                                <MkProvider>
                                    <EventsList />
                                </MkProvider>
                            } />
                            <Route path='wheels' element={
                                <GameProvider>
                                    {/* <HeroesSelect /> */}
                                    <WheelGame />
                                </GameProvider>
                            } />
                            <Route path='sonictactoe' element={<h2>STT - Jeu original en cours de travail</h2>} />
                        </Route>

                        {/** Use this to privatize route */}
                        {/* <Route element={<PrivateRoute />}>
                            <Route path='/admin/' element={<h1>Privée</h1>} />
                        </Route> */}

                    </Routes>
                </div>
            </div>
            <BgPixiGenerator />
        </div>
    );
}

