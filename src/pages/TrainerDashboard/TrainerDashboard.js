import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ClientCard from '../../components/ClientCard/ClientCard'
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
        
		
	}, []);

    useEffect(()=>{

        const token = sessionStorage.getItem('token');

        if (user){
            console.log('check',user);
            axios
			.get(`http://localhost:8085/api/trainers/${user.id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((response) => {
				console.log('all my clients', response);
                setClients(response.data)
			})
			.catch((error) => {
				console.log(error);
			});
        }
    },[user])

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




    console.log('check2',clients);
    return (
        <>
            {clients && clients.map((user)=>{
                return(
                    <ClientCard key={user.id} client={user} program_id={user.program_id}/>
                )
            })}
        </>
    )
}

export default TrainerDashboard