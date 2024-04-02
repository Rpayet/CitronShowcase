import { useContext } from 'react';
import HeroCard from '../components/boardgame/HeroCard';
import { GameContext } from '../context/GameContext';
import Wheels from '../components/boardgame/Wheels';
import WheelProvider from '../context/WheelContext';
import Bulwark from '../components/boardgame/Bulwark';
import Crown from '../components/boardgame/Crown';

export default function BoardGame() {
    
    const { setPlayer1, player1, player2 } = useContext(GameContext);
        
    return (
        <section id='Boardgame'>
            <h1>Player 1</h1>
            <div className='player-board'>
                <div className='top'>
                    <Bulwark player={player1} />
                    <Crown player={player1}/>
                </div>
                <div className='bottom'>
                    <HeroCard base={'square'} player={player1.square} />
                    <WheelProvider>
                        <Wheels setPlayer={setPlayer1}  />
                    </WheelProvider>
                    <HeroCard base={'diamond'} player={player1.diamond} />
                </div>
            </div>
        </section>
    );
}