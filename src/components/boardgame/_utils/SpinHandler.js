export default function SpinHandler({ setPlayer, spinResult }) {

    let squareRod = 0;
    let diamondRod = 0;
    let squareExp = 0;
    let diamondExp = 0;
    let bulwarkPoints = 0;

    const resultDict = {
        's1': { rod: 1, exp: 0 }, 's2': { rod: 2, exp: 0 }, 's3': { rod: 3, exp: 0 },
        'se1': { rod: 1, exp: 1 }, 'se2': { rod: 2, exp: 1 },
        'd1': { rod: 1, exp: 0 }, 'd2': { rod: 2, exp: 0 }, 'd3': { rod: 3, exp: 0 },
        'de1': { rod: 1, exp: 1 }, 'de2': { rod: 2, exp: 1 },
        'h1': { rod: 1 }, 'h2': { rod: 2 }, 'h3': { rod: 3 },
        'blank': { rod: 0, exp: 0 },
    };

    spinResult.forEach(result => {
        const effect = resultDict[result.result];
        switch (true) {
            case result.result.startsWith('s'):
                squareRod += effect.rod;
                squareExp += effect.exp;
                break;
            case result.result.startsWith('d'):
                diamondRod += effect.rod;
                diamondExp += effect.exp;
                break;
            case result.result.startsWith('h'):
                bulwarkPoints += effect.rod;
                break;
        }
    });

    setPlayer(prevState => ({
        ...prevState,
        square: {
            ...prevState.square,
            rod: prevState.square.rod + Math.max(0, squareRod - 2),
            exp: prevState.square.exp + squareExp,
        },
        diamond: {
            ...prevState.diamond,
            rod: prevState.diamond.rod + Math.max(0, diamondRod - 2),
            exp: prevState.diamond.exp + diamondExp,
        },
        bulwark: ((prevState.bulwark + Math.max(0, bulwarkPoints - 2)) > 5)
            ? 5
            : prevState.bulwark + Math.max(0, bulwarkPoints - 2),
    }));
}
