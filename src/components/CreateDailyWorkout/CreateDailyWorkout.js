import axios from "axios";
import { Button, Modal } from "react-bootstrap";
import Input from "../Input/Input"
import "./CreateDailyWorkout.scss"


function CreateDailyWorkout ({setShowDaily, user, exList , setExList}){

    const handleCloseEdit = () => setShowDaily(false);
    const handleShowDaily = () => setShowDaily(true);

    const handleWorkoutSubmit = async (event)=>{
        event.preventDefault();
      

        const newWorkout = {
            "trainer_id" : user.id ,
            "dailyWorkout_name" : event.target.name.value,
            "dailyWorkout_details" : event.target.details.value
        }

        await axios.post(`${process.env.REACT_APP_API_URL}/api/workouts/new`, newWorkout);
       handleCloseEdit()
        exList ? setExList(false) : setExList(true)
    }

    return(
        <Modal
                show={handleShowDaily}
                onHide={handleCloseEdit} 
                backdrop="static"
                keyboard={false}
            >
                <form onSubmit={handleWorkoutSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create A Daily Program</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        
                            <Input name={'name'} label={"Name"}/>
                            <Input name={'details'} label={"Details"}/>
                        
                        
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseEdit}>
                            Close
                        </Button>
                        <Button variant="primary" type="submit">Create</Button>
                    </Modal.Footer>
                </form>
            </Modal>
    )
}


export default CreateDailyWorkout