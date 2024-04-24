export default function HeroesActions({ player, setPlayer, opponent, setOpponent, hero, base, history }) {

    const previousPlayerValues = history.find(item => item.id === player.id);

    switch(true) {
        case hero.name === 'Warrior':
            if (opponent.bulwark > 0) {
                setOpponent(prevState => ({
                    ...prevState,
                    bulwark: prevState.bulwark - hero.apt1[player[base].hero_rank],
                }));
            } else {
                setOpponent(prevState => ({
                    ...prevState,
                    crown: prevState.crown - hero.apt1[player[base].hero_rank],
                }));
            }
            break;
        case hero.name === 'Mage':
            if (opponent.bulwark > 0) {
                setOpponent(prevState => ({
                    ...prevState,
                    bulwark: prevState.bulwark - hero.apt1[player[base].hero_rank],
                }));
            } else {
                setOpponent(prevState => ({
                    ...prevState,
                    crown: prevState.crown - hero.apt1[player[base].hero_rank],
                }));
            }
            setOpponent(prevState => ({
                ...prevState,
                crown: prevState.crown - hero.apt1[player[base].hero_rank],
            }));
            break;
        case hero.name === 'Archer':
            if (opponent.bulwark > 2) {
                setOpponent(prevState => ({
                    ...prevState,
                    bulwark: prevState.bulwark - hero.apt1[player[base].hero_rank],
                }));
            } else {
                setOpponent(prevState => ({
                    ...prevState,
                    crown: prevState.crown - hero.apt1[player[base].hero_rank],
                }));
            }
            break;
        case hero.name === 'Engineer':
            if (opponent.bulwark > 0) {
                setOpponent(prevState => ({
                    ...prevState,
                    bulwark: prevState.bulwark - hero.apt1[player[base].hero_rank],
                }));
            } else {
                setOpponent(prevState => ({
                    ...prevState,
                    crown: prevState.crown - hero.apt1[player[base].hero_rank],
                }));
            }
            setPlayer(prevState => ({
                ...prevState,
                bulwark: prevState.bulwark + 2,
            }));
            break;
        case hero.name === 'Assassin':
            if (opponent.bulwark > 0) {
                setOpponent(prevState => ({
                    ...prevState,
                    bulwark: prevState.bulwark - hero.apt1[player[base].hero_rank],
                }));
            } else {
                setOpponent(prevState => ({
                    ...prevState,
                    crown: prevState.crown - hero.apt1[player[base].hero_rank],
                }));
            };
            
            setOpponent(prevState => ({
                ...prevState,
                [base === 'square' ? 'diamond' : 'square'] : {
                    ...prevState[base === 'square' ? 'diamond' : 'square'],
                    rod: prevState[base === 'square' ? 'diamond' : 'square'].rod - (hero.energy_to_act[player[base].hero_rank] - previousPlayerValues[base].rod),
                }
            }));
            break;
        case hero.name === 'Priest':
            setPlayer(prevState => ({
                ...prevState,
                [base === 'square' ? 'diamond' : 'square'] : {
                    ...prevState[base === 'square' ? 'diamond' : 'square'],
                    rod: prevState[base === 'square' ? 'diamond' : 'square'].rod + hero.apt2[player[base].hero_rank],
                },
                crown: prevState.crown + hero.apt1[player[base].hero_rank],
            }));
            break;
    }

    setPlayer(prevState => ({
        ...prevState,
        [base]: {
            ...prevState[base],
            rod: 0,
            exp: prevState[base].exp + 2,
        }
    }));

}