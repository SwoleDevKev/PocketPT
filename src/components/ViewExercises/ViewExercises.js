import axios from 'axios'
import { useEffect, useState } from 'react'
import { API_URL } from '../../util'
import './ViewExercises.scss'


function ViewExercises ({workout}){
    


    const [deleteModalVisibility, setDeleteModalVisibility] = useState(null)
    const [exerciseBank, setExerciseBank ]= useState([])
    let videoId = ''

    const removeExercise = async (exercise)=>{
        await axios.delete(`${API_URL}/api/workouts/${exercise.id}`);
        alert('done')

        alert(`removed ${exercise.exercise_name}`)
    }

    const handleDeleteModal = (workout)=>{
        
        if (!deleteModalVisibility) {
        setDeleteModalVisibility(true);
        } else {
            setDeleteModalVisibility(false);
        }
    }

    useEffect(()=>{
        async function getCurrentVideos(){
            const response = await axios.get(`${API_URL}/api/exercises/${workout.id}`)
            setExerciseBank(response.data)
        }

        getCurrentVideos()
    },[])
    return(
        <>
        <button className='workout-card__button' onClick={()=>{ handleDeleteModal(workout)}}> View Exercises</button>
        {deleteModalVisibility && <div className='exercises-modal'>
            {exerciseBank.map((exercise)=>{

            {
             videoId = exercise.video_link
        
            } return(
                <>
                {
                <div className='listItem' >
                    <img className='listItem__image' src={`http://i3.ytimg.com/vi/${videoId}/hqdefault.jpg`}/>
                    <p className='listItem__name'>{exercise.exercise_name}</p>
                </div>
                }
                </>
            )
            
                
            } )}
        </div>}
        </>
    )
    
}

export default ViewExercises 