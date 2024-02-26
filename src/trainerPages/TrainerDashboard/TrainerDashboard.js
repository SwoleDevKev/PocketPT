import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ClientCard from '../../components/ClientCard/ClientCard'
import TrainerFooter from '../../components/TrainerFooter/TrainerFooter';
import WelcomeHeader from '../../components/WelcomeHeader/WelcomeHeader';
import { API_URL } from '../../util';
import './TrainerDashboard.scss'


function TrainerDashboard (){

    const [user, setUser] = useState(null);
    const [clients, setClients] = useState(null)
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
				setUser(response.data)
			})
			.catch((error) => {
				setFailedAuth(true)
			})

        
		
	}, []);

    useEffect(()=>{

        const token = sessionStorage.getItem('token');

        if (user){
            axios
			.get(`${API_URL}/api/trainers/${user.id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((response) => {
                setClients(response.data)
			})
			.catch((error) => {
			});
        }
    },[user])


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
    if (clients === null) {
		return (
			<main className="dashboard">
				<p>You Don't yet have any clients</p>
			</main>
		);
	}




   
    return (
        <>
            <WelcomeHeader user={user}/>
			<h1 className='dashboard__heading'>Client Dashboard</h1>
            <div className='client-container'>
            {clients && clients.map((user)=>{
                return(
                    <ClientCard key={user.id} client={user} program_id={user.program_id}/>
                )
            })}
            </div>
            
            <TrainerFooter user={user}/>
        </>
    )
}

export default TrainerDashboard