export default function HeroesActions({ setPlayer, setOpponent, hero, base }) {


    // Hero Actions


    setPlayer(prevState => ({
        ...prevState,
        [base]: {
            ...prevState[base],
            rod: 0,
            exp: prevState[base].exp + 2,
        }
    }));

}