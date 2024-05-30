import { Link, Outlet } from "react-router-dom";

export default function ArcadePalace() {
    return (
        <section id="ArcadePalace">
            <h1>Arcade Palace</h1>
            <div className="games">
                <Link to='mk-trials' className='game-link'>Mario Kart - Concours contre-la-montre</Link>
                <Link to='wheels' className='game-link'>Roulettes - Adaptation du mini-jeu de "Sea of Stars"</Link>
                <Link to='sonic-tac-toe' className='game-link'>Sonic Tac Toe - Jeu original en cours de travail</Link>
            </div>
        </section>
    )
}