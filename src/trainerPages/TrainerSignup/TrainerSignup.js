import "./TrainerSignup.scss";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import InputUpgrade from "../../components/InputUpgrade/InputUpgrade";
import { API_URL } from "../../util";

function TrainerSignup () {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();


    const handleSubmit = (event) => {
        event.preventDefault();

        axios
            .post(`${API_URL}/api/trainers/register`, {
                email: event.target.email.value,
                password: event.target.password.value,
                first_name: event.target.first_name.value,
                last_name: event.target.last_name.value,
                phone: event.target.phone.value,
            })
            .then(() => {
                setSuccess(true);
                setError("");
                event.target.reset();
            })
            .catch((error) => {
                setSuccess(false);
                setError(error.response.data);
            });
        axios
            .post(`${API_URL}/api/trainers/login`, {
                email: event.target.email.value,
                password: event.target.password.value
            })
            .then((response)=> {
                sessionStorage.setItem('token', response.data.token)
			    navigate('/trainer/home')
            })
            .catch((error) => {
                setSuccess(false);
                setError(error.response.data);
            });
        
    };

    return (

        <>
        <div className="signup-top">
            <Link to='/' className="circle"><p className="circle__text">&#8592; Home</p></Link>
        </div>
        <main className="signup-page">
            <form className="signup" onSubmit={handleSubmit}>
                <h1 className="signup__title">Trainer Sign up</h1>

                <InputUpgrade type="text" name="first_name" label="First name" />
                <InputUpgrade type="text" name="last_name" label="Last name" />
                <InputUpgrade type="text" name="phone" label="Phone" />
                <InputUpgrade type="text" name="email" label="Email" />
                <InputUpgrade type="password" name="password" label="Password" />

                <button className="signup__button">Sign up</button>

                {success && <div className="signup__message">Signed up!</div>}
                {error && <div className="signup__message">{error}</div>}
            </form>
            <p>
                Have an account? 
            </p> 
            <Link className="signup__link" to="/trainer/login">Log in</Link>
        </main>
        </>
    );
}

export default TrainerSignup;
