import './WeekOverview.scss'
import WelcomeHeader from '../../components/WelcomeHeader/WelcomeHeader'
import Main from '../../components/Main/Main'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';



function WeekOverview () {

    const [user, setUser] = useState(null);
	const [failedAuth, setFailedAuth] = useState(false);

	useEffect(() => {
		const token = sessionStorage.getItem('token')

		if(!token) {
			return setFailedAuth(true)
		}

		axios
			.get(`${process.env.REACT_APP_API_URL}/api/clients/current`, {
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
            <WelcomeHeader name={user.first_name}/>
            <Main programId={user.program_id}/>
            <Footer />
        </>
    )
}

export default WeekOverview