import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import TrainerFooter from '../../components/TrainerFooter/TrainerFooter';
import './TrainerProfile.scss'



function TrainerProfile (){
    const [user, setUser] = useState(null);
	const [failedAuth, setFailedAuth] = useState(false);
	const navigate = useNavigate()

	useEffect(() => {
		const token = sessionStorage.getItem('token')

		if(!token) {
			return setFailedAuth(true)
		}

		axios
			.get(`${process.env.REACT_APP_API_URL}/api/trainers/current`, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
			.then((response) => {
				setUser(response.data)
			})
			.catch((error) => {
				setFailedAuth(true)
			})

        
		
	}, []);


	const handleLogout = () => {
		sessionStorage.removeItem("token");
		setUser(null);
		setFailedAuth(true)
		navigate('/trainer/login');
	};

	if (failedAuth) {
		return (
			<main className="dashboard">
				<p>You must be logged in to see this page.</p>
				<p>
					<Link to="/trainer/login">Log in</Link>
				</p>
			</main>
		);
	}

	if (user === null) {
		return (
			<main className="dashboard">
				<p>Loading...</p>
			</main>
		);
	}


    return (
        <>
			<Header />
            <main className="dashboard">

			
			
			<div className="dashboard__content">
				<h2 className="dashboard__heading" >My Profile</h2>
				<div className="dashboard__avatar-container">
					<img className="dashboard__avatar" alt='account profile' src={user.trainer_avatar || process.env.REACT_APP_defaultAvatar}/>
				</div>
				<p>Name: {`${user.first_name} ${user.last_name}`}</p>
				<p>Email: {user.email}</p>
				<p>Phone: {user.phone}</p>
			</div>
			

			<button className="dashboard__logout" onClick={handleLogout}>
				Log out
			</button>
		    </main>
			<TrainerFooter />
        </>
    )
}


export default TrainerProfile