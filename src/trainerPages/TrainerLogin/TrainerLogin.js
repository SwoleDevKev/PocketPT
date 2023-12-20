import './TrainerLogin.scss';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { API_URL } from '../../util';

function TrainerLogin() {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

		axios.post(`${API_URL}/api/trainers/login`, {
            email: event.target.email.value,
            password: event.target.password.value
        })
		.then((response) => {
			sessionStorage.setItem('token', response.data.token)
			navigate('/trainer/home')
		})
        .catch((error) => {
            setSuccess(false);
            console.log(error);
            setError(error.response.data);
        });
        
    };

    return (
        <>
            <div className='login-top'>
                <Link to='/' className="circle"><p className="circle__text">&#8592; Home</p></Link>
            </div>
            <main className="login-page">
                <form className="login" onSubmit={handleSubmit}>
                    <h1 className="login__title">Trainer Log in</h1>

                    
                    <div className="login-field">
                        <label htmlFor='email' className="login-field__label">
                        Email
                        </label>
                        <input type='text' id='email' name='email' className="login-field__input" />
                     </div>

                     <div className="login-field">
                        <label htmlFor='password' className="login-field__label">
                        Password
                        </label>
                        <input type='password' id='password' name='password' className="login-field__input" />
                     </div>
                    
                    <button className="login__button">
                        Log in
                    </button>

                    {success && <div className="signup__message">Logged in!</div>}
                    {error && <div className="signup__message">{error}</div>}
                </form>
                <p>
                    Need an account? 
                </p>
                <Link to="/trainer/signup">Sign up</Link>
            </main>
        </>
    );
}

export default TrainerLogin;
