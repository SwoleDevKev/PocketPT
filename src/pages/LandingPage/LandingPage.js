import { Link } from 'react-router-dom'
import './LandingPage.scss'


function LandingPage (){
    return (
        <>
            <Link to="/trainer/login">Trainer Login</Link>
            <Link to="/login">Client Login</Link>
        </>
    )
}


export default LandingPage