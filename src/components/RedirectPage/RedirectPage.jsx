import { Link } from "react-router-dom";
import logo from "../../assets/logos/PocketPT-logo.svg";
import "./RedirectPage.scss";

export default function RedirectPage({ role }) {
    return (
        <>
            <header className='header'>
                <div className='header__link'><img alt='A pants pocket outline with the letters PT inside' className='header__logo' src={logo} /></div>
            </header>
            <section className="redirect">
                <h1 className="redirect__title"> You Must Be logged in to View This Page</h1>
                <Link className="redirect__link" to={role === "trainer"? "/trainer/login" : "/login"}><button className="redirect__button">Login</button></Link>
            </section>

        </>
    )
}