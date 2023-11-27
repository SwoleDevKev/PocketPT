import { useState } from 'react'
import EditWeeklyProgram from '../EditWeeklyProgram/EditWeeklyProgram'
import EditWorkout from '../EditWorkout/EditWorkout'
import './WorkoutCard.scss'


function WorkoutCard({program}){


    const [editWorkoutModal , setEditWorkoutModal] = useState(false)

    const handleProgramModal = ()=>{
        if(!editWorkoutModal){
            setEditWorkoutModal(true)
        } else {
            setEditWorkoutModal(false)
        }
    }

    return(
        <section>
            <div>
                <h3>{program['daily-workout_name']}</h3>
                <p>{program['daily-workout_details']}</p>
            </div>
            <button onClick={handleProgramModal}>Edit this program</button>
            {editWorkoutModal && <EditWeeklyProgram program={program}/>}
        </section>
    )
}

export default WorkoutCard