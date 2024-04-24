export default function EndTurnProcessing({ setPlayer, base }) {
    setPlayer(prevState => ({
        ...prevState,
        [base]: {
            ...prevState[base],
            rod: 0,
            exp: prevState[base].exp + 2,
        }
    }));
}