import axios from "axios"
import { useEffect, useState } from "react"
import { API_URL } from "../../util"
import './EditProgram.scss'


function EditProgram({program}) {


    

    const [weeklyPrograms, setWeeklyPrograms] = useState(null)
    const [week1 , setWeek1] = useState(null)
    const [week2 , setWeek2] = useState(null)
    const [week3 , setWeek3] = useState(null)
    const [week4 , setWeek4] = useState(null)

    useEffect(()=>{
        async function getWeeklyPrograms(){
           const response = await axios.get(`${API_URL}/api/programs/weekly`)
           console.log(response)
           setWeeklyPrograms(response.data)
        }
        getWeeklyPrograms()
    },[])

    const handleChangeWeek1 = (event) => {
        setWeek1(event.target.value)
    }
    const handleChangeWeek2 = (event) => {
        setWeek2(event.target.value)
    }
    const handleChangeWeek3 = (event) => {
        setWeek3(event.target.value)
    }
    const handleChangeWeek4 = (event) => {
        setWeek4(event.target.value)
    }

    const handleSubmit = async (event)=>{
        event.preventDefault()
        const response = await axios.put(`${API_URL}/api/programs`,{
                "program_id": program.id, 
                 week1,
                week2,
                week3,
                week4
        })
    }

    return (
        <form className="program-edit" onSubmit={handleSubmit}>
            <h1 className="login__title">{`Edit ${program.program_name}`}</h1>

            <div className="program-edit__entry-container">
                <label className='edit__label' htmlFor='program'>Week1 workouts</label>
                <select
                    className='item-availability__input item-availability__input--select'
                    name="week1"
                    id="week1"
                    defaultValue={''}
                    onChange={handleChangeWeek1}
                >
                    <option value='' disabled selected>Please select</option>
                    {weeklyPrograms?.map((program) => (
                        <option key={program.id} value={program.id}>
                            {program['weekly-program_name']}
                        </option>
                    ))}
                </select>
            </div>
            
            <div className="program-edit__entry-container">
                <label className='edit__label' htmlFor='program'>Week2 workouts</label>
                <select
                    className='item-availability__input item-availability__input--select'
                    name="weekly-program"
                    id="weekly-program"
                    defaultValue={''}
                    onChange={handleChangeWeek2}
                >
                    <option value='' disabled selected>Please select</option>
                    {weeklyPrograms?.map((program) => (
                        <option key={program.id} value={program.id}>
                            {program['weekly-program_name']}
                        </option>
                    ))}
                </select>
            </div>

            <div className="program-edit__entry-container">
                <label className='edit__label' htmlFor='program'>Week3 workouts</label>
                <select
                    className='item-availability__input item-availability__input--select'
                    name="weekly-program"
                    id="weekly-program"
                    defaultValue={''}
                    onChange={handleChangeWeek3}
                >
                    <option value='' disabled selected>Please select</option>
                    {weeklyPrograms?.map((program) => (
                        <option key={program.id} value={program.id}>
                            {program['weekly-program_name']}
                        </option>
                    ))}
                </select>
            </div>
            <div className="program-edit__entry-container">
                <label className='edit__label' htmlFor='program'>Week4 workouts</label>
                <select
                    className='item-availability__input item-availability__input--select'
                    name="weekly-program"
                    id="weekly-program"
                    defaultValue={''}
                    onChange={handleChangeWeek4}
                >
                    <option value='' disabled selected>Please select</option>
                    {weeklyPrograms?.map((program) => (
                        <option key={program.id} value={program.id}>
                            {program['weekly-program_name']}
                        </option>
                    ))}
                </select>
            </div>
            

            

            


            <button className="Assign__button">
                Save
            </button>

        </form>
    )
}

export default EditProgram