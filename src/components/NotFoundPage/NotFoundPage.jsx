import { Link } from "react-router-dom";
import logo from "../../assets/logos/PocketPT-logo.svg";
import "./NotFoundPage.scss";

export default function NotFoundPage() {
    return (
        <>
            <header className='header'>
                <div className='header__link'><img alt='A pants pocket outline with the letters PT inside' className='header__logo' src={logo} /></div>
            </header>
            <section className="notFound">
                <h1 className="notFound__title"> 404 Page Not Found</h1>
                <Link className="notFound__link" to="/"><button className="notFound__button">Login</button></Link>
            </section>

        </>
    )
}