import { useContext } from 'react';
import HeroCard from '../components/boardgame/HeroCard';
import heroes from '../utils/_test-assets/heroes_data.json';
import { GameContext } from '../context/GameContext';
import HeroesList from '../components/boardgame/HeroesList';

export default function BoardGame() {

  const { player1, player2 } = useContext(GameContext);

  const heroesList = Object.values(heroes);
  
  return (
    <div id='BoardGame'>
        <h1>BoardGame</h1>
        <HeroesList />
    </div>
  );
}