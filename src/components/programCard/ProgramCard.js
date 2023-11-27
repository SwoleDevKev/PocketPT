import { useState } from 'react'
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

    return(
        <section>
            <div>
                <h3>{program.program_name}</h3>
                <p>{program.program_details}</p>
            </div>
            <button onClick={handleProgramModal}>Edit this program</button>
            {editProgramModal && <EditProgram program={program}/>}
        </section>
    )
}

export default ProgramCard