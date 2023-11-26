import './Header.scss'
import bell from '../../assets/icons/bell.svg'
import logo from '../../assets/logos/PocketPT-logo.svg'


function Header () {
    return (
        <div className='header'>
            <div className='header__logo-container'>
                <img className='header__logo' src={logo}/>
            </div>
            <div className='header__icon'>
                <img className='header__image' src={bell}/>
                <div className='header__notification-dot'></div>
            </div>
        </div>
    )
}




export default Header