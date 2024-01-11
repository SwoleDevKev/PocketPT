import { useState } from 'react'
import EditWeeklyProgram from '../EditWeeklyProgram/EditWeeklyProgram'
import EditWorkout from '../EditWorkout/EditWorkout'
import './WeeklyProgramCard.scss'


function WeeklyProgramCard({program, trainer_id}){

    const [editWorkoutModal , setEditWorkoutModal] = useState(false)

    const handleProgramModal = ()=>{
        if(!editWorkoutModal){
            setEditWorkoutModal(true)
        } else {
            setEditWorkoutModal(false)
        }
    }

    return(
        <section className="program-card">
            <div className="program-card__content">
                <h3 className="program-card__heading">{program['weekly_program_name']}</h3>
                <p className="program-card__details" >{program['weekly_program_details']}</p>
            </div>
            <button className="program-card__button" onClick={handleProgramModal}>Edit this program</button>
            {editWorkoutModal && <EditWeeklyProgram Modal={setEditWorkoutModal} program={program} trainer_id={trainer_id}/>}
        </section>
    )
}

export default WeeklyProgramCard