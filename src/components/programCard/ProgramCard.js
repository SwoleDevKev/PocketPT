import { useState } from 'react'
import EditProgram from '../EditProgram/EditProgram'
import './ProgramCard.scss'


function ProgramCard({program, updatedMonthlyProgram, setUpdatedMonthlyProgram}){


    const [editProgramModal , setEditProgramModal] = useState(false)

    const handleProgramModal = ()=>{
        if(!editProgramModal){
            setEditProgramModal(true)
        } else {
            setEditProgramModal(false)
        }
    }
   
    return(
        <section className='program-card'>
            <div className='program-card__content'>
                <h3 className='program-card__heading'>{program.program_name}</h3>
                <p className='program-card__details'>{program.program_details}</p>
            </div>
            <button className='program-card__button' onClick={handleProgramModal}>Edit this program</button>
            {editProgramModal && <EditProgram setEditProgramModal={setEditProgramModal} 
                                              program={program} 
                                              updatedMonthlyProgram={updatedMonthlyProgram} 
                                              setUpdatedMonthlyProgram={setUpdatedMonthlyProgram}  
                                />
            }
        </section>
    )
}

export default ProgramCard