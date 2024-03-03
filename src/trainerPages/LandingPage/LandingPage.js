import { Link } from 'react-router-dom'
import './LandingPage.scss'
import logo from '../../assets/logos/pocket-logo.svg'
import innerLogo from '../../assets/logos/pt-logo.svg'


function LandingPage (){
    return (
        <section className='landing'>
        <div className='landing-top'>
            
            <div className='landing-top__image-container'>
                <img alt='the letters PT' className='landing-top__image'src={logo}/>
                <img alt="an outline of a pants back pocket" className='landing-top__image landing-top__image--inner'src={innerLogo}/>
            </div>
            
            <h1 className='landing-top__heading'>POCKET<span className='landing-top__span'>PT</span></h1>
            <h3 className='landing-top__subheading'>Trainer in your Pocket</h3>
        </div>
        <div className='landing-bottom'>
            <Link className='landing-bottom__link' to="/trainer/login">Kill: Trainer Login</Link>
            <Link className='landing-bottom__link landing-bottom__link--alt' to="/login">Be Killed: Client Login</Link>
        </div>
        </section>
    )
}


export default LandingPage