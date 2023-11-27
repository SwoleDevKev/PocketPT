import './TrainerLogin.scss';
import Input from "../../components/Input/Input";
import axios from 'axios';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function TrainerLogin() {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

		axios.post("http://localhost:8085/api/trainers/login", {
            email: event.target.email.value,
            password: event.target.password.value
        })
		.then((response) => {
			sessionStorage.setItem('token', response.data.token)
			navigate('/trainer/home')
		})
        .catch((error) => {
            setSuccess(false);
            setError(error.response.data);
        });
        
    };

    return (
        <main className="login-page">
            <form className="login" onSubmit={handleSubmit}>
                <h1 className="login__title">Trainer Log in</h1>

                <Input type="text" name="email" label="Email" />
                <Input type="password" name="password" label="Password" />

                <button className="login__button">
                    Log in
                </button>

                {success && <div className="signup__message">Logged in!</div>}
                {error && <div className="signup__message">{error}</div>}
            </form>
            <p>
                Need an account? <Link to="/trainer/signup">Trainer Sign up</Link>
            </p>
        </main>
    );
}

export default TrainerLogin;
