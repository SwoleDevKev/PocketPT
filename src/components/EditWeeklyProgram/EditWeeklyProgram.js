import axios from "axios"
import { useEffect, useState } from "react"
import { API_URL } from "../../util"


function EditWeeklyProgram({program, Modal, trainer_id}) {

    const [weeklyPrograms, setWeeklyPrograms] = useState(null)
    const [dailyWorkouts, setDailyWorkouts] = useState()
    const [day1 , setday1] = useState(null)
    const [day2 , setday2] = useState(null)
    const [day3 , setday3] = useState(null)
    const [day4 , setday4] = useState(null)
    const [day5 , setday5] = useState(null)
    const [day6 , setday6] = useState(null)
    const [day7 , setday7] = useState(null)

    useEffect(()=>{
        async function getWeeklyPrograms(){
           const response = await axios.get(`${API_URL}/api/workouts/new/${trainer_id}`)
           setWeeklyPrograms(response.data)
        }
        getWeeklyPrograms()
    },[])

    useEffect(()=>{
        async function getDailyWorkouts(){
           const response = await axios.get(`${API_URL}/api/workouts/edit/${program.id}`)
           setDailyWorkouts(response.data)
        }
        getDailyWorkouts()
    },[])

 

    const handleChangeday = (event, index) => {

        switch (index) {
            case 1:
                setday1(event.target.value)
                
                break;
            case 2:
                setday2(event.target.value)
                break;
            case 3:
                setday3(event.target.value)
                break;
            case 4:
                setday4(event.target.value)
                break;
            case 5:
                setday5(event.target.value)
                break;
            case 6:
                setday6(event.target.value)
                break;
            case 7:
                setday7(event.target.value)
                break;
            
            
        }
    }


    const handleSubmit = async (event)=>{
        event.preventDefault()
        if(day1 || day2 || day3 || day4 || day5 || day6 || day7){
            const response = await axios.put(`${API_URL}/api/programs/weekly`,{
                "weeklyProgram_id": program.id, 
                day1,
                day2,
                day3,
                day4,
                day5,
                day6,
                day7
        })
        if (response) {
            alert('succsessfully updated program')
            Modal(false)
        } else {
            alert('all values cannot be empty')
        }

    }
       
    }
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

    return (
        <form className="program-edit" onSubmit={handleSubmit}>
            <h1 className="login__title">{`Edit ${program['weekly_program_name']}`}</h1>

            {days.map((day,index) => {
                console.log(program[`${day}`]);

                return (
                    <div className="weekly-program-edit">

                        <label className='edit__label' htmlFor='program'>{day}</label>
                        <select
                            className='item-availability__input item-availability__input--select'
                            name={`day${index+1}`}
                            id={`day${index+1}`}
                            value={program[`${day}`]||''}
                            onChange={(e)=>{handleChangeday(e,index+1)}}
                        >
                            <option value='' disabled >Please select</option>
                            {weeklyPrograms?.map((weeklyProgram) => (
                                <option key={program.id}  value={weeklyProgram.id}>
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