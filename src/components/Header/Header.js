import './Header.scss'


function Header () {
    return (
        <div className='header'>
            <img className='Header__logo'/>
            <div className='header__notification'>
                <img className='header__notification-image'/>
                <div className='header__notification-dot'></div>
            </div>
        </div>
    )
}


export default Header