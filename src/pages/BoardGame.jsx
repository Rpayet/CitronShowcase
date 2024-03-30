import { useContext } from 'react';
import HeroCard from '../components/boardgame/HeroCard';
import heroes from '../utils/_test-assets/heroes_data.json';
import { GameContext } from '../context/GameContext';
import Wheels from '../components/boardgame/Wheels';
import WheelProvider from '../context/WheelContext';

export default function BoardGame() {
    
    const { player1, player2 } = useContext(GameContext);
    
    const heroesList = Object.values(heroes);
    
    return (
        <section id='Boardgame'>
            <h1>Player 1</h1>
            <div className='player-board'>
                <HeroCard base={'square'} hero={heroesList[0]} player={player1}/>
                <WheelProvider>
                    <Wheels />
                </WheelProvider>
                <HeroCard base={'diamond'} hero={heroesList[1]} player={player1} />
            </div>
        </section>
    );
}