import './DayCard.scss'
import dropDown from '../../assets/icons/dropDown.svg'
import { API_URL } from '../../util'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'


function DayCard({dailyWorkout}){

    const navigate = useNavigate();
    const [exercises, setExercises] = useState(0)

     useEffect(()=>{
        async function getWorkoutDays(){
            const response = await axios.get(`${API_URL}/api/exercises/client/${dailyWorkout['daily-workout_id']}`)
            setExercises(response.data)
            console.log(response.data)
        }
        getWorkoutDays()
    },[])

    const handleClick = () => {
        navigate("/workout", {state: exercises});
      };

    return(
        <section className='day-card' onClick={handleClick}>
        <div className='day-card__content'>
            <h2 className='day-card__heading'>Monday</h2>
            <h3 className='day-card__subheading'><span className='day-card__span'>{dailyWorkout['daily-workout_name']}</span></h3>
            <h3 className='day-card__subheading'><span className='day-card__span'>{exercises.length}</span> total exercises</h3>
        </div>
    </section>
    )
}


export default DayCard