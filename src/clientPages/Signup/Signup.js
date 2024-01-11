import "./Signup.scss";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import InputUpgrade from "../../components/InputUpgrade/InputUpgrade";
import { API_URL } from "../../util";

function Signup () {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [trainers, setTrainers] = useState(null)
    const navigate = useNavigate();


    useEffect(()=>{
        async function getTrainers(){
          const response = await axios.get(`${API_URL}/api/trainers`)
          console.log(response.data)
          setTrainers(response.data)
        }
        getTrainers()
    },[])
    const handleSubmit = async (event) => {
        event.preventDefault();

        try{

            const response = await axios.post(`${API_URL}/api/clients/register`, {
                email: event.target.email.value,
                password: event.target.password.value,
                first_name: event.target.first_name.value,
                last_name: event.target.last_name.value,
                phone: event.target.phone.value,
                trainer_id: event.target.trainer_id.value
            })
                setSuccess(true);
                setError("");
        } catch (error) {
            setSuccess(false);
            setError(error.response.data);
        }
            
        try {
           const response =  await axios.post(`${API_URL}/api/clients/login`, {
                email: event.target.email.value,
                password: event.target.password.value
            })
            sessionStorage.setItem('token', response.data.token)
            navigate('/client')
        } catch (error) {
            setSuccess(false);
            setError(error.response.data);
        }
        
            
            
    };


    return (

        <>
        <div className="signup-top">
            <Link to='/' className="circle"><p className="circle__text">&#8592; Home</p></Link>
        </div>
        <main className="signup-page">
            <form className="signup" onSubmit={handleSubmit}>
                <h1 className="signup__title">Client Sign up</h1>

                <InputUpgrade type="text" name="first_name" label="First name" />
                <InputUpgrade type="text" name="last_name" label="Last name" />
                <InputUpgrade type="text" name="phone" label="Phone" />
                <InputUpgrade type="text" name="email" label="Email" />
                <InputUpgrade type="password" name="password" label="Password" />
                
                <div className="field">
                    
                    <label className="field__label" >Trainer</label>
                    <select name="trainer_id" className="field__input">
                    <option value='' disabled selected>Please select</option>
                        {trainers && trainers.map((trainer)=>{
                            return(
                                <option key={trainer.id} value={trainer.id}>
                            {trainer.first_name +' '+trainer.last_name} </option>
                            )
                            
                        })}
                    </select>
                </div>

                <button className="signup__button">Sign up</button>

                {success && <div className="signup__message">Signed up!</div>}
                {error && <div className="signup__message">{error}</div>}
            </form>
            <p>
                Have an account? 
            </p>
            <Link className="signup__link" to="/login">Log in</Link>
        </main>
        </>
    );
}

export default Signup;
