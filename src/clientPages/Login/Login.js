import './Login.scss';
import Input from "../../components/Input/Input";
import axios from 'axios';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

		axios.post(`${process.env.REACT_APP_API_URL}/api/clients/login`, {
            email: event.target.email.value.trim(),
            password: event.target.password.value
        })
		.then((response) => {
			sessionStorage.setItem('token', response.data.token)
			navigate('/client')
		}).catch((error) => {
            setSuccess(false);
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
                    <h1 className="login__title">Client Log in</h1>

                    <Input type="text" name="email" label="Email" />
                    <Input type="password" auto='on' name="password" label="Password" />

                    <button className="login__button">
                        Log in
                    </button>

                    {success && <div className="signup__message">Logged in!</div>}
                    {error && <div className="signup__message">{error}</div>}
                </form>
                <p>
                    Need an account? 
                </p>
                <Link to="/signup">Sign up</Link>
            </main>
        </>
    );
}

export default Login;
