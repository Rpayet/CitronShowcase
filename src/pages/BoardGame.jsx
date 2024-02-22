import { useContext } from 'react';
import Heroes from '../components/boardgame/Heroes';
import heroes from '../utils/_test-assets/heroes_data.json';
import { GameContext } from '../context/GameContext';

export default function BoardGame() {

  const { player1, player2 } = useContext(GameContext);

  const heroesArray = heroes;
  
  return (
    <div id='BoardGame'>
        <h1>BoardGame</h1>
        <Heroes hero={heroesArray.heroes[0]} player={player1} />
    </div>
  );
}