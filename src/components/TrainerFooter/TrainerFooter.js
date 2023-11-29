import './TrainerFooter.scss'
import home from '../../assets/icons/home.svg'
import program from '../../assets/icons/journal.svg'
import profile from '../../assets/icons/profile.png'
import { Link } from 'react-router-dom'
import { API_URL } from '../../util'


function TrainerFooter ({user}){
    return(
        <div className='footer'>
            <Link to='/trainer/programs' className='footer__link'>
            <div className='footer__pic-block'>
                <img className='footer__pic' src={program} />
                <p className='footer__pic-text'>Programs</p>
            </div>
            </Link>
            <Link to='/trainer/home' className='footer__link'>
            <div className='footer__pic-block'>
                <img className='footer__pic' src={home}/>
                <p className='footer__pic-text'> Home</p>
            </div>
            </Link>
            <Link to='/trainer/profile' className='footer__link'>
            <div className='footer__pic-block'>
                <img className='footer__pic' src={user?.client_avatar || `${API_URL}/images/profile.png`} />
                <p className='footer__pic-text'>Profile</p>
            </div>
            </Link>
            
        </div>
    )
}



export default TrainerFooter