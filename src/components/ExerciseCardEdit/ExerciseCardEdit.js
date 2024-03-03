import CustomCheckbox from '../CustomCheckbox/CustomCheckbox'
import './ExerciseCardEdit.scss'
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Input from '../Input/Input';
import axios from 'axios';


function ExerciseCardEdit({ details, setDetails, exercise }) {
    const link = exercise.video_link
    let videoId = link

    if (link.includes('=')) {
        const splitLink = link.split('=');
        const videoIdAndQuery = splitLink[1]
        videoId = videoIdAndQuery.split('&')[0]

    }

    const [videoModalVisibility, setVideoModalVisibility] = useState(false)
    
    const [showEdit, setShowEdit] = useState(false);
    const handleCloseEdit = () => setShowEdit(false);
    const handleShowEdit = () => setShowEdit(true);

    function handleModalVisibility() {
        if (!videoModalVisibility) {
            setVideoModalVisibility(true)
        } else {
            setVideoModalVisibility(false)
        }
    }

    async function handleEditExerciseDetails(event){
        event.preventDefault()
        const reps = event.target.reps.value 
        const sets = event.target.sets.value 
        const weight = event.target.weight.value
        const rest = event.target.rest.value 
        const note = event.target.note.value || ''
        
        await axios.put(`${process.env.REACT_APP_API_URL}/api/exercises/${exercise.id}`, {
            reps,sets,weight,rest,note
        })
        details ? setDetails(false) : setDetails(true)

    }

    return (
        <section className='exercise'>

            <div className='exercise__content'>
                <div className='exercise__checkbox-container'>
                    <CustomCheckbox />
                </div>
                <h2 className='exercise__heading'>{exercise.exercise_name}</h2>
                
                <div className='exercise__image-container'>
                    <img className='exercise__image' alt={`video thumbnail of ${exercise.exercise_name}`} src={`http://i3.ytimg.com/vi/${videoId}/maxresdefault.jpg`} onClick={handleModalVisibility} />
                </div>
                

                
                <div className='exercise__stats'>
                    <p className='exercise__stat'><span className='exercise__label'>Sets:</span>{exercise.sets}</p>
                    <p className='exercise__stat'><span className='exercise__label'>Reps:</span>{exercise.reps}</p>
                    <p className='exercise__stat'><span className='exercise__label'>Weight:</span>{exercise.weight}</p>
                    <p className='exercise__stat'><span className='exercise__label'>Rest:</span>{exercise.rest_time}</p>
                </div>
                <p className='exercise__note'><span className='exercise__label'>NOTE:</span>{exercise.note}</p>
            </div>
            <button className='exercise__button' onClick={handleShowEdit}>Edit details</button>
            <Modal
                show={showEdit}
                onHide={handleCloseEdit} 
                backdrop="static"
                keyboard={false}
            >
                <form onSubmit={handleEditExerciseDetails}>
                    <Modal.Header closeButton>
                        <Modal.Title>{exercise.exercise_name} Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        
                            <Input name={'sets'} label={'sets'}/>
                            <Input name={'reps'} label={'reps'}/>
                            <Input name={'weight'} label={'weight'}/>
                            <Input name={'rest'} label={'Rest'}/>
                            <Input name={'note'} label={'Note'}/>
                        
                        
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseEdit}>
                            Close
                        </Button>
                        <Button variant="primary" type="submit">Create</Button>
                    </Modal.Footer>
                </form>
            </Modal>
            {videoModalVisibility && <VideoPlayer videoId={videoId} handleModalVisibility={handleModalVisibility} exercise={exercise} />}
        </section>

    )
}


export default ExerciseCardEdit