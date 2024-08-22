import { Route, Routes } from 'react-router-dom';
import { Stage, Sprite } from '@pixi/react';
import './App.css';
import WheelGame from './pages/WheelGame';
import Dashboard from './components/dashboard/Dashboard';
import Landing from './pages/Landing';
import ArcadePalace from './pages/ArcadePalace';
import GameProvider from './context/GameContext';
import { MkProvider } from './context/MkContext';
import EventsList from './components/arcade/mariokart/search/EventsList';

export default function App() {
    return (
        <div id="App">
            <div className="app-container" >
                <div className="bg-pattern">
                    {/* A utiliser pour créer un arrière-plan dynamique */}
                </div>
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
                    </Routes>
                </div>
            </div>
        </div>
    );
}

