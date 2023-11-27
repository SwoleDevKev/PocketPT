import axios from 'axios'
import { useEffect, useState } from 'react'
import BuildDailyWorkout from '../../components/BuildDailyWorkout/BuildDailyWorkout'
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

    const handleModal = (workout)=>{
        setModalVisibility(true);
        setCurrentWorkout(workout);
    }


    return (
        <>
            { workouts?.map((workout) => { return(
                
                <div onClick={()=>{ handleModal(workout)}}>
                    <h3>{workout['daily-workout_name']}</h3>
                    <p>{workout['daily-workout_details']}</p>
                </div>
                
            )})
            
            }
            {modalVisibility && <BuildDailyWorkout workout={currentWorkout}/>}
            
        </>
    )
}

export default DailyWorkouts