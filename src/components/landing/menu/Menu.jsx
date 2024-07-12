import { Link } from "react-router-dom";

export default function Menu() {
    return (
        <div id='Menu'>
            <Link to='/latest' className='latest'>Actualités</Link>
            <Link to='/articles' className='articles'>Articles</Link>
            <Link to='/portefolio' className='portefolio'>Portefolio</Link>
            <Link to='/arcadePalace' className='arcade'>Arcade Palace</Link>
        </div>
    )
}