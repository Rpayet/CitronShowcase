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
import BgGenerator from './components/background/BgGenerator';

export default function App() {

    const auth = useAuth();

    return (
        <div id="App">
            <div className="app-container">
                <BgGenerator />
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

