import axios from "axios"
import { useEffect, useState } from "react"
import { API_URL } from "../../util"
import './EditProgram.scss'


function EditProgram({ program, setEditProgramModal }) {


    const [weeklyPrograms, setWeeklyPrograms] = useState(null)
    const [currentWeeklyPrograms, setCurrentWeeklyPrograms] = useState(null)
    const [week_1, setWeek_1] = useState(null)
    const [week_2, setWeek_2] = useState(null)
    const [week_3, setWeek_3] = useState(null)
    const [week_4, setWeek_4] = useState(null)

    useEffect(() => {
        async function getWeeklyPrograms() {
            const response = await axios.get(`${API_URL}/api/programs/weekly`)
            setWeeklyPrograms(response.data)
        }
        getWeeklyPrograms()
    }, [])
    

   

    const handleChangeWeek1 = (event) => {
        setWeek_1(event.target.value)
    }
    const handleChangeWeek2 = (event) => {
        setWeek_2(event.target.value)
    }
    const handleChangeWeek3 = (event) => {
        setWeek_3(event.target.value)
    }
    const handleChangeWeek4 = (event) => {
        setWeek_4(event.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault(); 

        if (week_1 || week_2 || week_3 || week_4) {
            const response = await axios.put(`${API_URL}/api/programs`, {
                "program_id": program.id,
                week_1,
                week_2,
                week_3,
                week_4
            })
            
            if (response) {
                alert('succsessfully updated program')
                setEditProgramModal(false)
    
            }
        } else {
            alert('no updates made, nothing to save ')
        }
         
        
       
    }

    return (
        <form className="program-edit" onSubmit={handleSubmit}>
            <h1 className="login__title">{`Edit ${program.program_name}`}</h1>

            <div className="program-edit__entry-container">
                <label className='edit__label' htmlFor='program'>Week1 workouts</label>
                <select
                    className='item-availability__input item-availability__input--select'
                    name="week_1"
                    id="week_1"
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
                    name="week_2"
                    id="week_2"
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
                    name="week_3"
                    id="week_3"
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
                    name="week_4"
                    id="week_4"
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