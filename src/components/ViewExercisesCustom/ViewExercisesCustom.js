import axios from 'axios'
import { useEffect, useState } from 'react'
import './ViewExercisesCustom.scss'


function ViewExercisesCustom ({workout, exList, setExList }){
    
    const [deleteModalVisibility, setDeleteModalVisibility] = useState(null)
    const [exerciseBank, setExerciseBank ]= useState([])
    let videoId



    const removeExercise = async (exercise)=>{
        await axios.delete(`${process.env.REACT_APP_API_URL}/api/workouts/${exercise.id}`)
        alert('done')
        alert(`removed ${exercise.exercise_name}`)

        exList ? setExList(false) : setExList(true)
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
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/exercises/custom/${workout.id}`)
            setExerciseBank(response.data)
        }

        getCurrentVideos()
    },[exList, workout.id])
    return(
        <>
        <button className='workout-card__button' onClick={()=>{ handleDeleteModal(workout)}}> View Exercises</button>
        {deleteModalVisibility && <div className='exercises-modal'>
            {exerciseBank.map((exercise)=>{
        
             videoId =  exercise.video_link
        
            return(
                <>
                {
                <div className='listItem' >
                    <img alt={`demonstation of ${exercise.exercise_name}`} className='listItem__image' src={`http://i3.ytimg.com/vi/${videoId}/hqdefault.jpg`}/>
                    <p className='listItem__name'>{exercise.exercise_name}</p>
                    <button className='listItem__button' onClick={ ()=>{removeExercise(exercise)}}>delete</button>
                </div>
                }
                </>
            )
            
                
            } )}
        </div>}
        </>
    )
    
}

export default ViewExercisesCustom