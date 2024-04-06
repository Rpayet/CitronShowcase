import { useContext } from 'react';
import HeroCard from '../components/boardgame/HeroCard';
import { GameContext } from '../context/GameContext';
import Wheels from '../components/boardgame/Wheels';
import WheelProvider from '../context/WheelContext';
import Bulwark from '../components/boardgame/Bulwark';
import Crown from '../components/boardgame/Crown';

export default function BoardGame() {
    
    const { player1, player2 } = useContext(GameContext);

    const playerArray = [player1, player2];
        
    return (
        <section id='Boardgame'>
            {playerArray.map(player => (
                <div className={`player-board${player.id}`}>
                    <div className={`top-player${player.id}`}>
                        <Bulwark player={player} />
                        <Crown player={player} />
                    </div>
                    <div className={`bottom-player${player.id}`}>
                        <HeroCard base={'square'} player={player} />
                        <WheelProvider>
                            <Wheels player={player}/>
                        </WheelProvider>
                        <HeroCard base={'diamond'} player={player} />
                    </div>
                </div>
            ))}
        </section>
    );
}