import { Route, Routes } from 'react-router-dom';
import './App.css';
import BoardGame from './pages/BoardGame';

export default function App() {
    return (
        <div className="App">
            <Routes>
                <Route path='/' element={<h1>Home</h1>} />
                <Route path='/boardgame' element={<BoardGame/>} />
            </Routes>
        </div>
    );
}

