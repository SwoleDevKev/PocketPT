import './CurrentClientProgram.scss'
import Main from '../../components/Main/Main'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Header from '../../components/Header/Header';
import TrainerMain from '../../components/TrainerMain/TrainerMain';



function CurrentClientProgram () {

    const [user, setUser] = useState(null);
	const [failedAuth, setFailedAuth] = useState(false);
    const {clientId, programId} = useParams()

	useEffect(() => {
		const token = sessionStorage.getItem('token')

		if(!token) {
			return setFailedAuth(true)
		}

		axios
			.get("http://localhost:8085/api/trainers/current", {
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

		// Demonstrate using auth on single ro/Users/jburton/Desktop/GitLabDemos/lecture-demos-and-reviews/week-10/client-side-auth/mdismatsek/server/routes/users.jsute
		axios
			.get("http://localhost:8085/api/trainers", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((response) => {
				console.log('user auth', response);
			})
			.catch((error) => {
				console.log(error);
			});
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
            <Header />

            <TrainerMain clientId={clientId} programId={programId}/>
        </>
    )
}

export default CurrentClientProgram