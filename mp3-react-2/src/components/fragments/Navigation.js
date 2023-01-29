import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import {isAuthenticated} from "../../helpers/authHelper";

function Navigation({handleLogout}) {

    const { t, i18n } = useTranslation();
    const handleLanguageChange = (lng) => {
        console.log(lng)
        i18n.changeLanguage(lng)
    }

    const loginLogoutLink = isAuthenticated() ? <button onClick={handleLogout}>{t('auth.logout')}</button> : <Link to="/login">{t('form.actions.login')}</Link>

    return (
        <nav>

            <ul>
                <li><Link to="/">{t('nav.main-page')}</Link></li>
                {isAuthenticated() &&
                    <li><Link to="/customers">{t('nav.customers')}</Link></li>
                }

                    <li><Link to="/models">{t('nav.models')}</Link></li>
                {isAuthenticated() &&
                <li><Link to="/orders">{t('nav.orders')}</Link></li>
                }
                <li className='lang'>{loginLogoutLink}</li>

                <li className='lang'>
                    <button onClick={() => handleLanguageChange('pl')}>PL</button>
                </li>
                <li>
                    <button onClick={() => handleLanguageChange('en')}>EN</button>
                </li>
            </ul>

        </nav>
    )
}

export default Navigation