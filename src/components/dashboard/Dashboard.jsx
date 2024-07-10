import { Link } from "react-router-dom";

export default function Dashboard() {

    return (
        <div id="Dashboard">
            <Link to="/">Accueil</Link>
            <Link to="/articles">Articles</Link>
            <Link to="/portefolio">Portefolio</Link>
            <Link to="/arcade-palace">Arcade Palace</Link>
        </div>
    );
}