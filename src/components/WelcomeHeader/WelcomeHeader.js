import './WelcomeHeader.scss'
import profilePic from '../../assets/images/jajuan.png'
import bell from '../../assets/icons/bell.svg'
import logo from '../../assets/logos/PocketPT-logo.svg'
import { Link } from 'react-router-dom'
import { API_URL } from '../../util'


function WelcomeHeader ({path, name, user}) {
    return (
        <div className='welcome-header'>
            <div className='welcome-header__welcome-block'>
                <img className='welcome-header__icon' src={user?.client_avatar || `${API_URL}/images/profile.png`}/>
                <div className='welcome-header__text-block'>
                    <h2 className='welcome-header__heading'>Welcome Back !</h2>
                    <p className='welcome-header__text'>{user?.first_name.toUpperCase()}</p>
                </div>
            </div>
           
                <Link className='welcome-header__logo-container' to={path}><img className='welcome-header__logo' src={logo}/></Link>
         
            
            <div className='welcome-header__icon'>
                <img className='welcome-header__image' src={bell}/>
                <div className='welcome-header__notification-dot'></div>
            </div>
        </div>
    )
}


export default WelcomeHeader