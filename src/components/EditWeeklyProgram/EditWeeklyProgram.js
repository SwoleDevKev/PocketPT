import axios from "axios"
import { useEffect, useState } from "react"
import { API_URL } from "../../util"


function EditWeeklyProgram({program}) {

    const [weeklyPrograms, setWeeklyPrograms] = useState(null)
    const [day1 , setday1] = useState(null)
    const [day2 , setday2] = useState(null)
    const [day3 , setday3] = useState(null)
    const [day4 , setday4] = useState(null)
    const [day5 , setday5] = useState(null)
    const [day6 , setday6] = useState(null)
    const [day7 , setday7] = useState(null)

    useEffect(()=>{
        async function getWeeklyPrograms(){
           const response = await axios.get(`${API_URL}/api/workouts`)
           console.log(response)
           setWeeklyPrograms(response.data)
        }
        getWeeklyPrograms()
    },[])

    const handleChangeday1 = (event) => {
        setday1(event.target.value)
    }
    const handleChangeday2 = (event) => {
        setday2(event.target.value)
    }
    const handleChangeday3 = (event) => {
        setday3(event.target.value)
    }
    const handleChangeday4 = (event) => {
        setday4(event.target.value)
    }
    const handleChangeday5 = (event) => {
        setday5(event.target.value)
    }
    const handleChangeday6 = (event) => {
        setday6(event.target.value)
    }
    const handleChangeday7 = (event) => {
        setday7(event.target.value)
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
        } else {
            alert('all values cannot be empty')
        }
       
    }
    console.log('before return',program)

    return (
        <form className="program-edit" onSubmit={handleSubmit}>
            <h1 className="login__title">{`Edit ${program['weekly-program_name']}`}</h1>

            <div className="weekly-program-edit">

                <label className='edit__label' htmlFor='program'>day1 workouts</label>
                <select
                    className='item-availability__input item-availability__input--select'
                    name="day1"
                    id="day1"
                    defaultValue={''}
                    onChange={handleChangeday1}
                >
                    <option value='' disabled selected>Please select</option>
                    {weeklyPrograms?.map((program) => (
                        <option key={program.id} value={program.id}>
                            {program['daily-workout_name']}
                        </option>
                    ))}
                </select>
            </div>



            <div className="weekly-program-edit">
                <label className='edit__label' htmlFor='program'>day2 workouts</label>
                <select
                    className='item-availability__input item-availability__input--select'
                    name="weekly-program"
                    id="weekly-program"
                    defaultValue={''}
                    onChange={handleChangeday2}
                >
                    <option value='' disabled selected>Please select</option>
                    {weeklyPrograms?.map((program) => (
                        <option key={program.id} value={program.id}>
                            {program['daily-workout_name']}
                        </option>
                    ))}
                </select>

            </div>


            <div className="weekly-program-edit">
                <label className='edit__label' htmlFor='program'>day3 workouts</label>
                <select
                    className='item-availability__input item-availability__input--select'
                    name="weekly-program"
                    id="weekly-program"
                    defaultValue={''}
                    onChange={handleChangeday3}
                >
                    <option value='' disabled selected>Please select</option>
                    {weeklyPrograms?.map((program) => (
                        <option key={program.id} value={program.id}>
                            {program['daily-workout_name']}
                        </option>
                    ))}
                </select>

            </div>


            <div className="weekly-program-edit">
                <label className='edit__label' htmlFor='program'>day4 workouts</label>
                <select
                    className='item-availability__input item-availability__input--select'
                    name="weekly-program"
                    id="weekly-program"
                    defaultValue={''}
                    onChange={handleChangeday4}
                >
                    <option value='' disabled selected>Please select</option>
                    {weeklyPrograms?.map((program) => (
                        <option key={program.id} value={program.id}>
                            {program['daily-workout_name']}
                        </option>
                    ))}
                </select>

            </div>


            <div className="weekly-program-edit">
                <label className='edit__label' htmlFor='program'>day5 workouts</label>
                <select
                    className='item-availability__input item-availability__input--select'
                    name="weekly-program"
                    id="weekly-program"
                    defaultValue={''}
                    onChange={handleChangeday5}
                >
                    <option value='' disabled selected>Please select</option>
                    {weeklyPrograms?.map((program) => (
                        <option key={program.id} value={program.id}>
                            {program['daily-workout_name']}
                        </option>
                    ))}
                </select>

            </div>


            <div className="weekly-program-edit">
                <label className='edit__label' htmlFor='program'>day6 workouts</label>
                <select
                    className='item-availability__input item-availability__input--select'
                    name="weekly-program"
                    id="weekly-program"
                    defaultValue={''}
                    onChange={handleChangeday6}
                >
                    <option value='' disabled selected>Please select</option>
                    {weeklyPrograms?.map((program) => (
                        <option key={program.id} value={program.id}>
                            {program['daily-workout_name']}
                        </option>
                    ))}
                </select>

            </div>


            <div className="weekly-program-edit">
                <label className='edit__label' htmlFor='program'>day7 workouts</label>
                <select
                    className='item-availability__input item-availability__input--select'
                    name="weekly-program"
                    id="weekly-program"
                    defaultValue={''}
                    onChange={handleChangeday7}
                >
                    <option value='' disabled selected>Please select</option>
                    {weeklyPrograms?.map((program) => (
                        <option key={program.id} value={program.id}>
                            {program['daily-workout_name']}
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

export default EditWeeklyProgram