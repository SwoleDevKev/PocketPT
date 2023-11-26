import './TrainerFooter.scss'
import home from '../../assets/icons/home.svg'
import program from '../../assets/icons/journal.svg'
import profile from '../../assets/icons/profile.png'
import { Link } from 'react-router-dom'


function TrainerFooter (){
    return(
        <div className='footer'>
            <Link to='' className='footer__link'>
            <div className='footer__pic-block'>
                <img className='footer__pic' src={program} />
                <p className='footer__pic-text'>Programs</p>
            </div>
            </Link>
            <Link className='footer__link'>
            <div className='footer__pic-block'>
                <img className='footer__pic' src={home}/>
                <p className='footer__pic-text'> Home</p>
            </div>
            </Link>
            <Link className='footer__link'>
            <div className='footer__pic-block'>
                <img className='footer__pic' src={profile} />
                <p className='footer__pic-text'>Profile</p>
            </div>
            </Link>
            
        </div>
    )
}



export default TrainerFooter