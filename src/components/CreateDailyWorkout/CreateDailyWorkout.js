import Input from "../Input/Input"
import "./CreateDailyWorkout.scss"


function CreateDailyWorkout (){

    const handleWorkoutSubmit = (event)=>{
        event.preventDefault()

        
    }

    return(
        <form onSubmit={handleWorkoutSubmit}>
            <Input type='text' name="name" label='Workout Name'/>
            <Input type='text' name="details" label='Workout Details'/>
            <button>Create Daily Workout</button>
        </form>
    )
}


export default CreateDailyWorkout