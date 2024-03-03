import './WelcomeHeader.scss'
import bell from '../../assets/icons/bell.svg'
import logo from '../../assets/logos/PocketPT-logo.svg'
import { Link } from 'react-router-dom'


function WelcomeHeader ({path, name, user}) {
    return (
        <div className='welcome-header'>
            <div className='welcome-header__welcome-block'>
                <img alt='account profile' className='welcome-header__icon' src={user?.client_avatar || `${process.env.REACT_APP_API_URL}/images/profile.png`}/>
                <div className='welcome-header__text-block'>
                    <h2 className='welcome-header__heading'>Welcome Back !</h2>
                    <p className='welcome-header__text'>{user?.first_name.toUpperCase()}</p>
                </div>
            </div>
           
                <Link className='welcome-header__logo-container' to={path}><img alt='pants pocket outline with the letters PT inside' className='welcome-header__logo' src={logo}/></Link>
         
            
            <div className='welcome-header__icon'>
                <img alt='bell icon' className='welcome-header__image' src={bell}/>
                <div className='welcome-header__notification-dot'></div>
            </div>
        </div>
    )
}


export default WelcomeHeader