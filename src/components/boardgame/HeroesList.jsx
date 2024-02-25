import heroes from '../../utils/_test-assets/heroes_data.json';

export default function HeroesList() {
    return (
        <div id='HeroesList'>
            <h2 className=''>HeroesList</h2>
            <ul className='heroes-list'>
                {heroes.map((hero) => (
                    <li key={hero.name} className=''>
                        <h3>{hero.name}</h3>
                        <p>{hero.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}