import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import './ClientProfile.scss'



function ClientProfile (){
    const [user, setUser] = useState(null);
	const [failedAuth, setFailedAuth] = useState(false);

	useEffect(() => {
		const token = sessionStorage.getItem('token')

		if(!token) {
			return setFailedAuth(true)
		}

		axios
			.get("http://localhost:8085/api/clients/current", {
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
			.then((response) => {
				console.log(response.data);
				setUser(response.data)
			})
			.catch((error) => {
				console.log(error);
				setFailedAuth(true)
			})

	}, []);

	const handleLogout = () => {
		sessionStorage.removeItem("token");
		setUser(null);
		setFailedAuth(true);
	};

	if (failedAuth) {
		return (
			<main className="dashboard">
				<p>You must be logged in to see this page.</p>
				<p>
					<Link to="/login">Log in</Link>
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
			<h1 className="dashboard__title">Dashboard</h1>
			<p>
				Welcome back, {user.first_name} {user.last_name}
			</p>
			<h2>My Profile</h2>
			<p>Email: {user.email}</p>
			<p>Phone: {user.phone}</p>
			<p>Address: {user.address}</p>

			<button className="dashboard__logout" onClick={handleLogout}>
				Log out
			</button>
		    </main>
            <Footer />
        </>
    )
}


export default ClientProfile