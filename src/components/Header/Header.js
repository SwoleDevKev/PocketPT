import './Header.scss'
import bell from '../../assets/icons/bell.svg'
import logo from '../../assets/logos/PocketPT-logo.svg'
import { Link } from 'react-router-dom'


function Header ({path}) {
    return (
        <div className='header'>
                <Link className='header__link' to={path}><img className='header__logo' src={logo}/></Link>
            <div className='header__icon'>
                <img className='header__image' src={bell}/>
                <div className='header__notification-dot'></div>
            </div>
        </div>
    )
}




export default Header