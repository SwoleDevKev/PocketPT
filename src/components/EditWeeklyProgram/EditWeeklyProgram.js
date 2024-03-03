import axios from "axios"
import './EditWeeklyProgram.scss'
import { useEffect, useState } from "react"


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
           const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/workouts/new/${trainer_id}`)
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
       
            const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/programs/weekly`,{
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
        <form className="weekly-program-edit" onSubmit={handleSubmit}>
            <h3 className="weekly-program-edit__title">{`Edit ${program['weekly_program_name']}`}</h3>

            {days.map((day,index) => {

                return (
                    <div className="weekly-program-edit__input-container">

                        <label className='weekly-program-edit__label' htmlFor='program'>{day}</label>
                        <select
                            className='weekly-program-edit__input'
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
            <div className="weekly-program-edit__button-container">
                <button className="weekly-program-edit__button">
                    Save
                </button>
            </div>
            

        </form>
    )
}

export default EditWeeklyProgram