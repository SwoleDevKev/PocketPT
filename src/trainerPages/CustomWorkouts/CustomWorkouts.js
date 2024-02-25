import './CustomWorkouts.scss'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import BuildDailyWorkout from '../../components/BuildDailyWorkout/BuildDailyWorkout'
import CreateDailyWorkout from '../../components/CreateDailyWorkout/CreateDailyWorkout'
import Header from '../../components/Header/Header'
import ViewExercisesCustom from '../../components/ViewExercisesCustom/ViewExercisesCustom'
import TrainerFooter from '../../components/TrainerFooter/TrainerFooter'
import { API_URL } from '../../util'


function CustomWorkouts (){

    const [workouts, setWorkouts] = useState(null)
    const [modalVisibility, setModalVisibility] = useState(null)
    const [currentWorkout, setCurrentWorkout] = useState(null)
    const [exList, setExList ]= useState(null)
    const [workoutList, setWorkoutList ]= useState(null)
    const [showDaily, setShowDaily] = useState(false);
    const [user, setUser] = useState(null);
	const [failedAuth, setFailedAuth] = useState(false);



  useEffect(()=>{
    async function getWorkouts(){
        const response = await axios.get(`${API_URL}/api/workouts/new/${user?.id}`)
        setWorkouts(response.data)
     }
     getWorkouts()
 },[user,workoutList])

    const handleModal = (workout)=>{
        if (!modalVisibility) {
            setModalVisibility(true);
            setCurrentWorkout(workout);
        } else {
            setModalVisibility(false);
        }
    }

   

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

                <h1 className='workout__heading'>Daily Workouts</h1>
                { workouts?.map((workout) => { return(
                    
                    <>
                    <div className='workout-card' >
                        <h3 className='workout-card__heading'>{workout['daily-workout_name']}</h3>
                        <p className='workout-card__details'>{workout['daily-workout_details']}</p>
                        <button className='workout-card__button' onClick={()=>{ handleModal(workout)}} >Add Exercises</button>
                        <ViewExercisesCustom exList={exList} setExList={setExList} workout={workout}/>
                    </div>
                    
                    
                    </>
                )})
                
                }
                <div className='workout__button-container'>
                    <button onClick={setShowDaily} className='workout__button'>Add New Workout</button>
                </div>
            </div>
            {modalVisibility && <BuildDailyWorkout trainer_id={user.id} exList={exList} setExList={setExList} setModalVisibility={setModalVisibility} workout={currentWorkout}/>}
            {showDaily && <CreateDailyWorkout exList={workoutList} setExList={setWorkoutList}
            setShowDaily={setShowDaily} user={user} />}

            <TrainerFooter />
        </>
    )
}

export default CustomWorkouts