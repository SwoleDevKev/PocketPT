import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ClientCard from '../../components/ClientCard/ClientCard'
import TrainerFooter from '../../components/TrainerFooter/TrainerFooter';
import WelcomeHeader from '../../components/WelcomeHeader/WelcomeHeader';
import './TrainerDashboard.scss'


function TrainerDashboard ({user}){

    const [clients, setClients] = useState(null)

    useEffect(()=>{

        const token = sessionStorage.getItem('token');

        if (user){
            axios
			.get(`${process.env.REACT_APP_API_URL}/api/trainers/${user.id}`, {
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