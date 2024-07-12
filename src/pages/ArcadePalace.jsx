import { usePageTransition } from "../services/navigation/animationService";

export default function ArcadePalace() {

    const { navigateWithAnimation } = usePageTransition();

    const handleNavigation = (toPage) => {
        navigateWithAnimation('arcadePalace', toPage, 500);
    }

    const getSlideInStyle = (index) => {
        return {
            animation: 'slideIn ease-out',
            animationFillMode: 'forwards',
            animationDuration: `${0.5 + (index * 0.1)}s`, 
        };
    };

    return (
        <section id="ArcadePalace">
            <h1>Arcade Palace</h1>
            <div className="games">
                <button 
                    onClick={() => handleNavigation('mkTrials')} 
                    className="game-link" 
                    style={getSlideInStyle(0)}>
                    Mario Kart - Concours contre-la-montre
                </button>
                <button 
                    onClick={() => handleNavigation('wheels')} 
                    className="game-link" 
                    style={getSlideInStyle(1)}>
                    Roulettes - Adaptation du mini-jeu de "Sea of Stars"
                </button>
                <button 
                    onClick={() => handleNavigation('sonicTT')} 
                    className="game-link" 
                    style={getSlideInStyle(2)}>
                    STT - Jeu original en cours de travail
                </button>
            </div>
        </section>
    )
}