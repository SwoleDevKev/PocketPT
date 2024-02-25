import axios from "axios"
import { useEffect, useState } from "react"
import { API_URL } from "../../util"


function EditWeeklyProgram({program, Modal, trainer_id}) {

    const [weeklyPrograms, setWeeklyPrograms] = useState(null)
    const [dayValues, setDayValues] = useState([
        program?.monday || 0,
        program?.tuesday || 0,
        program?.wednesday || 0,
        program?.thursday || 0,
        program?.friday || 0,
        program?.saturday || 0,
        program?.sunday || 0
    ]);

    useEffect(()=>{
        async function getWeeklyPrograms(){
           const response = await axios.get(`${API_URL}/api/workouts/new/${trainer_id}`)
           setWeeklyPrograms(response.data)
        }
        getWeeklyPrograms()
    },[trainer_id])

 

    const handleChangeday = (event, index) => {
        const updatedDayValues = [...dayValues];
        updatedDayValues[index] = event.target.value;
        setDayValues(updatedDayValues);
    }


    const handleSubmit = async (event)=>{
        event.preventDefault()
       
            const response = await axios.put(`${API_URL}/api/programs/weekly`,{
                "weeklyProgram_id": program.id, 
                day1: dayValues[0],
                day2: dayValues[1],
                day3: dayValues[2],
                day4: dayValues[3],
                day5: dayValues[4],
                day6: dayValues[5],
                day7: dayValues[6]
        })
        if (response) {
            alert('succsessfully updated program')
            Modal(false)
        } else {
            alert('all values cannot be empty')
        }

    }
       
    
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

    return (
        <form className="program-edit" onSubmit={handleSubmit}>
            <h1 className="login__title">{`Edit ${program['weekly_program_name']}`}</h1>

            {days.map((day,index) => {

                return (
                    <div className="weekly-program-edit">

                        <label className='edit__label' htmlFor='program'>{day}</label>
                        <select
                            className='item-availability__input item-availability__input--select'
                            name={`day${index+1}`}
                            id={`day${index+1}`}
                            value={dayValues[index]}
                            onChange={(e)=>{handleChangeday(e,index)}}
                        >
                            <option value={0} disabled >Rest Day</option>
                            {weeklyPrograms?.map((weeklyProgram) => (
                                <option key={weeklyProgram.id}  value={weeklyProgram.id}>
                                    {weeklyProgram['daily-workout_name']}
                                </option>
                            ))}
                        </select>
                    </div>
                )
            })}

            <button className="Assign__button">
                Save
            </button>

        </form>
    )
}

export default EditWeeklyProgram