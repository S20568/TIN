import { Link } from 'react-router-dom'

function Navigation() {
    return (
        <nav>
            <ul>
                <li><Link to="/">Strona główna</Link></li>
                <li><Link to="/customers">Klienci</Link></li>
                <li><Link to="/models">Modele</Link></li>
                <li><Link to="/orders">Zamówienia</Link></li>
            </ul>
        </nav>
    )
}

export default Navigation