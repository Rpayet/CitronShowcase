import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import WheelGame from './pages/WheelGame';
import Dashboard from './components/dashboard/Dashboard';
import Landing from './pages/Landing';

export default function App() {
    return (
        <div id="App">
            <div className="app-container" >
                <Dashboard />
                <Routes>
                    <Route path='/' element={<Landing />} />
                    <Route path='/arcade-palace' element={<WheelGame />} />
                </Routes>
            </div>
        </div>
    );
}

