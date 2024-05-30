import { Route, Routes } from 'react-router-dom';
import './App.css';
import WheelGame from './pages/WheelGame';
import Dashboard from './components/dashboard/Dashboard';
import Landing from './pages/Landing';
import ArcadePalace from './pages/ArcadePalace';
import GameProvider from './context/GameContext';
import HeroesSelect from './components/arcade/wheels/HeroesSelect';

export default function App() {
    return (
        <div id="App">
            <div className="app-container" >
                <Dashboard />
                <Routes>
                    <Route path='/' element={<Landing />} />
                    <Route path='/arcade-palace' element={<ArcadePalace />} />
                    <Route path='/arcade-palace/mk-trials' element={<h2>Mario Kart - Concours contre-la-montre</h2>} />
                    <Route path='/arcade-palace/wheels' element={
                        <GameProvider>
                            <HeroesSelect />                            
                            {/* <WheelGame /> */}
                        </GameProvider>
                    } />
                    <Route path='/arcade-palace/sonic-tac-toe' element={<h2>Sonic Tac Toe - Jeu original en cours de travail</h2>} />
                </Routes>
            </div>
        </div>
    );
}

