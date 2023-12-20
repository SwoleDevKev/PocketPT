import axios from "axios";
import { API_URL } from "../../util";
import Input from "../Input/Input"
import "./CreateDailyWorkout.scss"


function CreateDailyWorkout ({setAddModalVisibility, user}){

    const handleWorkoutSubmit = async (event)=>{
        event.preventDefault();
      

        const newWorkout = {
            "trainer_id" : user.id ,
            "dailyWorkout_name" : event.target.name.value,
            "dailyWorkout_details" : event.target.details.value
        }

       const response = await axios.post(`${API_URL}/api/workouts/new`, newWorkout);
       console.log(response);
        
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