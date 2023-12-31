import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import BuildDailyWorkout from '../../components/BuildDailyWorkout/BuildDailyWorkout'
import Header from '../../components/Header/Header'
import RemoveExercises from '../../components/ViewExercises/ViewExercises'
import TrainerFooter from '../../components/TrainerFooter/TrainerFooter'
import { API_URL } from '../../util'
import './DailyWorkouts.scss'

function DailyWorkouts (){

    const [workouts, setWorkouts] = useState(null)
    const [modalVisibility, setModalVisibility] = useState(null)
    const [currentWorkout, setCurrentWorkout] = useState(null)


  useEffect(()=>{
    async function getWorkouts(){
        const response = await axios.get(`${API_URL}/api/workouts`)
        console.log(response.data)
        setWorkouts(response.data)
     }
     getWorkouts()
 },[])

    // Finalize
    // const handleModal = (workout)=>{
    //     if (!modalVisibility) {
    //         setModalVisibility(true);
    //         setCurrentWorkout(workout);
    //     } else {
    //         setModalVisibility(false);
    //     }
    // }

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
            <div className='workout'>

                <h1 className='workout__heading'>Default Daily Workouts</h1>
                { workouts?.map((workout) => { return(
                    
                    <>
                    <div className='workout-card' >
                        <h3 className='workout-card__heading'>{workout['daily-workout_name']}</h3>
                        <p className='workout-card__details'>{workout['daily-workout_details']}</p>
                        <RemoveExercises workout={workout}/>
                    </div>
                    
                    
                    </>
                )})
                
                }
            </div>
            {modalVisibility && <BuildDailyWorkout setModalVisibility={setModalVisibility} workout={currentWorkout}/>}
            <TrainerFooter />
        </>
    )
}

export default DailyWorkouts