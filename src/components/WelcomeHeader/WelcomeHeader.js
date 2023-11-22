import './WelcomeHeader.scss'
import profilePic from '../../assets/images/jajuan.png'
import bell from '../../assets/icons/bell.svg'
import logo from '../../assets/logos/PocketPT-logo.svg'


function WelcomeHeader () {
    return (
        <div className='header'>
            <div className='header__welcome-block'>
                <img className='header__icon' src={profilePic}/>
                <div className='header__text-block'>
                    <h2 className='header__heading'>Welcome !</h2>
                    <p className='header__text'>Jajuan</p>
                </div>
            </div>
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


export default WelcomeHeader