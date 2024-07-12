import { usePageTransition } from "../../services/navigation/animationService";

export default function Dashboard() {

    const { navigateWithAnimation } = usePageTransition();
    
    const handleNavigation = (toPage) => {
        const fromPage = window.location.pathname.split('/')[1];
        navigateWithAnimation(fromPage, toPage, 500);
    }

    return (
        <div id="Dashboard">
            <button onClick={() => handleNavigation('landing') } >Accueil</button>
            <button onClick={() => handleNavigation('articles') } >Articles</button>
            <button onClick={() => handleNavigation('portfolio') } >Portefolio</button>
            <button onClick={() => handleNavigation('arcadePalace') } >Arcade Palace</button>
        </div>
    );
}