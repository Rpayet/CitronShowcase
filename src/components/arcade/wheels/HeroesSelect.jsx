import heroes from '../../../utils/_test-assets/heroes_data.json';
import HeroCard from './HeroCard';

export default function HeroesSelect() {

    const heroesList = Object.values(heroes);

    return (
        <div className='heroes-select'>
            <h2>Choisissez vos héros</h2>
            <div className='heroes-list'>
                {heroesList.map(hero => (
                    <button>{hero.name}</button>
                ))}
            </div>
        </div>
    )

}