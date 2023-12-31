import axios from 'axios'
import { useEffect, useState } from 'react'
import { API_URL } from '../../util'
import './ViewExercisesCustom.scss'


function ViewExercisesCustom ({workout, exList, setExList }){
    
    const [deleteModalVisibility, setDeleteModalVisibility] = useState(null)
    const [exerciseBank, setExerciseBank ]= useState([])

    let videoId = ''

    const removeExercise = async (exercise)=>{
        const response = await axios.delete(`${API_URL}/api/workouts/${exercise.id}`)
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
            const response = await axios.get(`${API_URL}/api/exercises/custom/${workout.id}`)
            setExerciseBank(response.data)
        }

        getCurrentVideos()
    },[exList])
    return(
        <>
        <button className='workout-card__button' onClick={()=>{ handleDeleteModal(workout)}}> View Exercises</button>
        {deleteModalVisibility && <div className='exercises-modal'>
            {exerciseBank.map((exercise)=>{

            {const splitLink = exercise.video_link.split('=');
            const videoIdAndQuery = splitLink[1]
             videoId = videoIdAndQuery.split('&')[0]
        
            } return(
                <>
                {
                <div className='listItem' >
                    <img className='listItem__image' src={`http://i3.ytimg.com/vi/${videoId}/hqdefault.jpg`}/>
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