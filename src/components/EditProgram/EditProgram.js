import axios from "axios"
import { useEffect, useState } from "react"
import './EditProgram.scss'


function EditProgram({ program, setEditProgramModal, updatedMonthlyProgram, setUpdatedMonthlyProgram }) {


    const [weeklyPrograms, setWeeklyPrograms] = useState(null)
    const [week_1, setWeek_1] = useState(program?.week_1 || '')
    const [week_2, setWeek_2] = useState(program?.week_2 || '')
    const [week_3, setWeek_3] = useState(program?.week_3 || '')
    const [week_4, setWeek_4] = useState(program?.week_4 || '')

    useEffect(() => {
        async function getWeeklyPrograms() {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/programs/weekly`)
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
            const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/programs`, {
                "program_id": program.id,
                week_1,
                week_2,
                week_3,
                week_4
            })
            
            if (response) {
                alert('succsessfully updated program')

                if(!updatedMonthlyProgram){
                    setUpdatedMonthlyProgram(true)
                } else {
                    setUpdatedMonthlyProgram(false)
                }


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
                <label className='program-edit__label' htmlFor='program'>Week 1 workouts</label>
                <select
                    className='program-edit__input '
                    name={week_1}
                    id={week_1}
                    value={week_1}
                    onChange={handleChangeWeek1}
                >
                    <option value='' disabled >Please select</option>
                    {weeklyPrograms?.map((weeklyProgram) => (
                        <option key={weeklyProgram.id} value={weeklyProgram.id}>
                            {weeklyProgram.weekly_program_name}
                        </option>
                    ))}
                    <option value=''>week Off</option>
                </select>
            </div>
            <div className="program-edit__entry-container">
                <label className='program-edit__label' htmlFor='program'>Week 2 workouts</label>
                <select
                    className='program-edit__input '
                    name={week_2}
                    id={week_2}
                    value={week_2}
                    onChange={handleChangeWeek2}
                >
                    <option value='' disabled >Please select</option>
                    {weeklyPrograms?.map((weeklyProgram) => (
                        <option key={weeklyProgram.id} value={weeklyProgram.id}>
                            {weeklyProgram.weekly_program_name}
                        </option>
                    ))}
                   <option value=''>week Off</option>

                </select>
            </div>
            <div className="program-edit__entry-container">
                <label className='program-edit__label' htmlFor='program'>Week 3 workouts</label>
                <select
                    className='program-edit__input '
                    name={week_3}
                    id={week_3}
                    value={week_3}
                    onChange={handleChangeWeek3}
                >
                    <option value='' disabled >Please select</option>
                    {weeklyPrograms?.map((weeklyProgram) => (
                        <option key={weeklyProgram.id} value={weeklyProgram.id}>
                            {weeklyProgram.weekly_program_name}
                        </option>
                    ))}
                    <option value=''>week Off</option>

                </select>
            </div>
            <div className="program-edit__entry-container">
                <label className='program-edit__label' htmlFor='program'>Week 4 workouts</label>
                <select
                    className='program-edit__input '
                    name={week_4}
                    id={week_4}
                    value={week_4}
                    onChange={handleChangeWeek4}
                >
                    <option value='' disabled >Please select</option>
                    {weeklyPrograms?.map((weeklyProgram) => (
                        <option key={weeklyProgram.id} value={weeklyProgram.id}>
                            {weeklyProgram.weekly_program_name}
                        </option>
                    ))}
                    <option value=''>Week Off</option>
                </select>
            </div>

            <div className="program-edit__button-container">
                <button className="program-edit__button">
                    Save
                </button>
            </div>

        </form>
    )
}

export default EditProgram