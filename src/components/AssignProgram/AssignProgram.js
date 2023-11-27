import axios from "axios";
import { useEffect, useState } from "react";
import Input from "../Input/Input";
import { API_URL } from "../../util";

function AssignProgram ({programId, clientId}){

    const [programs, setPrograms] = useState(null)
    const [clientProgram, setClientProgram] = useState(programId)

    useEffect(()=>{
       async function getPrograms(){
           const response = await axios.get(`${API_URL}/api/programs`)
           console.log(response.data)
           setPrograms(response.data)
        }
        getPrograms()
    },[])

    function handleChangeProgram(event){
        setClientProgram(event.target.value) 
    }
    async function handleSubmit(event){

        event.preventDefault()

        console.log(clientProgram);
        const response = await axios.patch(`${API_URL}/api/clients/${clientId}`,{"program_id": clientProgram});

    }

    return (
        <form className="login" onSubmit={handleSubmit}>
            <h1 className="login__title">Assign Program</h1>

            <label className='edit__label' htmlFor='program'>Assign program</label>
            <select
                        className='item-availability__input item-availability__input--select'
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

            <button className="Assign__button">
                Save
            </button>

        </form>
    )
}

export default AssignProgram