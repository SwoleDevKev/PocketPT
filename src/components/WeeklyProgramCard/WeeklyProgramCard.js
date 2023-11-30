import { useState } from 'react'
import EditWeeklyProgram from '../EditWeeklyProgram/EditWeeklyProgram'
import EditWorkout from '../EditWorkout/EditWorkout'
import './WeeklyProgramCard.scss'


function WeeklyProgramCard({program}){

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
                <h3 className="program-card__heading">{program['weekly-program_name']}</h3>
                <p className="program-card__details" >{program['weekly-program_details']}</p>
            </div>
            <button className="program-card__button" onClick={handleProgramModal}>Edit this program</button>
            {editWorkoutModal && <EditWeeklyProgram program={program}/>}
        </section>
    )
}

export default WeeklyProgramCard