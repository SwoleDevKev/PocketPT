import './Footer.scss'
import home from '../../assets/icons/home.svg'
import program from '../../assets/icons/journal.svg'
import profile from '../../assets/icons/profile.png'
import { Link } from 'react-router-dom'


function Footer ({user}){
    return(
        <div className='footer'>
            <Link to='/journal' className='footer__link'>
            <div className='footer__pic-block'>
                <img alt='journal and a pen icon' className='footer__pic' src={program} />
                <p className='footer__pic-text'>Journal</p>
            </div>
            </Link>
            <Link to='/client' className='footer__link'>
            <div className='footer__pic-block'>
                <img alt='home icon' className='footer__pic' src={home}/>
                <p className='footer__pic-text'> Home</p>
            </div>
            </Link>
            <Link to='/profile' className='footer__link'>
            <div className='footer__pic-block'>
                <img alt='account profile' className='footer__pic footer__pic--round' src={user.icon || profile} />
                <p className='footer__pic-text'>Profile</p>
            </div>
            </Link>
            
        </div>
    )
}



export default Footer