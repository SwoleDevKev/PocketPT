import "./Signup.scss";
import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import Input from "../../components/Input/Input";
import InputUpgrade from "../../components/InputUpgrade/InputUpgrade";

function Signup () {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [trainers, setTrainers] = useState(null)


    useEffect(()=>{
        async function getTrainers(){
          const response = await axios.get('http://localhost:8085/api/trainers')
          console.log(response.data)
          setTrainers(response.data)
        }
        getTrainers()
    },[])
    const handleSubmit = (event) => {
        event.preventDefault();

        axios
            .post("http://localhost:8085/api/clients/register", {
                email: event.target.email.value,
                password: event.target.password.value,
                first_name: event.target.first_name.value,
                last_name: event.target.last_name.value,
                phone: event.target.phone.value,
                trainer_id: event.target.trainer_id.value
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
