import './CurrentClientProgram.scss'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Header from '../../components/Header/Header';
import TrainerMain from '../../components/TrainerMain/TrainerMain';
import TrainerFooter from '../../components/TrainerFooter/TrainerFooter';
import { API_URL } from '../../util';



function CurrentClientProgram () {

	const {clientId, programId} = useParams()

    const [user, setUser] = useState(null);
	const [failedAuth, setFailedAuth] = useState(false);
    

	useEffect(() => {
		const token = sessionStorage.getItem('token')

		if(!token) {
			return setFailedAuth(true)
		}

		axios
			.get(`${API_URL}/api/trainers/current`, {
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
			<TrainerFooter />
        </>
    )
}

export default CurrentClientProgram