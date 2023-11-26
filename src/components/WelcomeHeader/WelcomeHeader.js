import './WelcomeHeader.scss'
import profilePic from '../../assets/images/jajuan.png'
import bell from '../../assets/icons/bell.svg'
import logo from '../../assets/logos/PocketPT-logo.svg'


function WelcomeHeader () {
    return (
        <div className='welcome-header'>
            <div className='welcome-header__welcome-block'>
                <img className='welcome-header__icon' src={profilePic}/>
                <div className='welcome-header__text-block'>
                    <h2 className='welcome-header__heading'>Welcome !</h2>
                    <p className='welcome-header__text'>Jajuan</p>
                </div>
            </div>
            <div className='welcome-header__logo-container'>
                <img className='welcome-header__logo' src={logo}/>
            </div>
            
            <div className='welcome-header__icon'>
                <img className='welcome-header__image' src={bell}/>
                <div className='welcome-header__notification-dot'></div>
            </div>
        </div>
    )
}


export default WelcomeHeader