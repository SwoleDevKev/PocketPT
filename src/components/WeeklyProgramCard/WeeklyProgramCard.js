import { useState } from 'react'
import EditWeeklyProgram from '../EditWeeklyProgram/EditWeeklyProgram'
import EditWorkout from '../EditWorkout/EditWorkout'
import './WeeklyProgramCard.scss'


function WeeklyProgramCard({program}){

    console.log(program);
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
                <h3>{program['weekly-program_name']}</h3>
                <p>{program['weekly-program_details']}</p>
            </div>
            <button onClick={handleProgramModal}>Edit this program</button>
            {editWorkoutModal && <EditWeeklyProgram program={program}/>}
        </section>
    )
}

export default WeeklyProgramCard