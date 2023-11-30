import axios from 'axios'
import { useEffect, useState } from 'react'
import { API_URL } from '../../util'
import EditProgram from '../EditProgram/EditProgram'
import './ProgramCard.scss'


function ProgramCard({program}){


    const [editProgramModal , setEditProgramModal] = useState(false)

    const handleProgramModal = ()=>{
        if(!editProgramModal){
            setEditProgramModal(true)
        } else {
            setEditProgramModal(false)
        }
    }
    useEffect(()=>{
        const getProgramWorkouts = async () =>{
            await axios.get(`${API_URL}/api/workouts/${program.id}`)
        };
        getProgramWorkouts()
    },[])
    return(
        <section className='program-card'>
            <div className='program-card__content'>
                <h3 className='program-card__heading'>{program.program_name}</h3>
                <p className='program-card__details'>{program.program_details}</p>
            </div>
            <button className='program-card__button' onClick={handleProgramModal}>Edit this program</button>
            {editProgramModal && <EditProgram setEditProgramModal={setEditProgramModal} program={program}/>}
        </section>
    )
}

export default ProgramCard