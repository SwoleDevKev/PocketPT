import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../../util";
import './AssignProgram.scss'
import { useNavigate } from "react-router-dom";

function AssignProgram ({programId, clientId, modal, setModal}){

    const [programs, setPrograms] = useState(null)
    const [clientProgram, setClientProgram] = useState(null)
    const navigate = useNavigate();

    useEffect(()=>{
       async function getPrograms(){
           const response = await axios.get(`${API_URL}/api/programs`)
           setPrograms(response.data)
        }
        getPrograms()
    },[])

    function handleChangeProgram(event){
        
        setClientProgram(event.target.value) 
        

    }
    async function handleSubmit(event){

        event.preventDefault()

        if (!clientProgram){
            alert('you must select a program')
        } else{
             await axios.patch(`${API_URL}/api/clients/${clientId}`,{"program_id": clientProgram});
            alert('New Program set') 
            navigate('/trainer/home')
            


        }
        

    }

    return (
        <form className="assign" onSubmit={handleSubmit}>
            

            <label className='assign__label' htmlFor='program'>Assign program</label>
            <select
                        className='assign__select'
                        name="program"
                        id="program"
                        defaultValue={programId}
                        onChange={handleChangeProgram}
                    >
                    
                    <option value='' disabled selected>Please select</option>
                        {programs?.map((program) => (
                            <option key={program.id} value={program.id}>
                                {program.program_name}
                            </option>
                        ))}
                    </select>

            <button className="assign__button">
                Save
            </button>

        </form>
    )
}

export default AssignProgram