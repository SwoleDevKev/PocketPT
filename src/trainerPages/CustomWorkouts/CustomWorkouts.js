import './CustomWorkouts.scss'
import axios from 'axios'
import { useEffect, useState } from 'react'
import BuildDailyWorkout from '../../components/BuildDailyWorkout/BuildDailyWorkout'
import CreateDailyWorkout from '../../components/CreateDailyWorkout/CreateDailyWorkout'
import Header from '../../components/Header/Header'
import ViewExercisesCustom from '../../components/ViewExercisesCustom/ViewExercisesCustom'
import TrainerFooter from '../../components/TrainerFooter/TrainerFooter'
import { v4 as uuidv4 } from 'uuid';


function CustomWorkouts ({user}){

    const [workouts, setWorkouts] = useState(null)
    const [modalVisibility, setModalVisibility] = useState(null)
    const [currentWorkout, setCurrentWorkout] = useState(null)
    const [exList, setExList ]= useState(null)
    const [workoutList, setWorkoutList ]= useState(null)
    const [showDaily, setShowDaily] = useState(false);



  useEffect(()=>{
    async function getWorkouts(){
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/workouts/new/${user?.id}`)
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

   

	
    return (
        <>

            <Header />
            <div className='workout'>

                <h1 className='workout__heading'>Daily Workouts</h1>
                { workouts?.map((workout) => { return(
                    
                    
                    <div className='workout-card' key={uuidv4()}>
                        <h3 className='workout-card__heading'>{workout['daily-workout_name']}</h3>
                        <p className='workout-card__details'>{workout['daily-workout_details']}</p>
                        <button className='workout-card__button' onClick={()=>{ handleModal(workout)}} >Add Exercises</button>
                        <ViewExercisesCustom exList={exList} setExList={setExList} workout={workout}/>
                    </div>
                    
                    
                   
                )})
                
                }
                <div className='workout__button-container'>
                    <button onClick={setShowDaily} className='workout__button'>Add New Workout</button>
                </div>
            </div>
            {modalVisibility && <BuildDailyWorkout trainer_id={user.id} exList={exList} setExList={setExList} setModalVisibility={setModalVisibility} workout={currentWorkout}/>}
            {showDaily && <CreateDailyWorkout exList={workoutList} setExList={setWorkoutList}
            setShowDaily={setShowDaily} user={user} />}

            <TrainerFooter user={user}/>
        </>
    )
}

export default CustomWorkouts