import './TrainerDayCard.scss'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


function TrainerDayCard({dailyWorkout}){

    const [exercises, setExercises] = useState(0)

     useEffect(()=>{
        async function getWorkoutDays(){
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/exercises/custom/${dailyWorkout['id']}`)
            setExercises(response.data)
        }
        getWorkoutDays()
    },[dailyWorkout])

    return(
    <Link className='day-card' to={`/trainer/workout/${dailyWorkout.id}`}>
        <div className='day-card__content'>
            <h2 className='day-card__heading'>{dailyWorkout.day}</h2>
            <h3 className='day-card__subheading'><span className='day-card__span'>{dailyWorkout['daily-workout_name']}</span></h3>
            <h3 className='day-card__subheading'><span className='day-card__span'>{exercises.length}</span> total exercises</h3>
        </div>
    </Link>
    )
}


export default TrainerDayCard