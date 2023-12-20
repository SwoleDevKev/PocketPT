import axios from 'axios'
import { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { API_URL } from '../../util'
import './BuildDailyWorkout.scss'


function BuildDailyWorkout ({workout, setModalVisibility }){

    const navigate = useNavigate()

    const [exerciseBank, setExerciseBank ]= useState([])
    let videoId = ''

    const addExercise = async (exercise)=>{
        const response = await axios.post(`${API_URL}/api/workouts`,{
            "dailyWorkout_id": workout.id,
            "exercise_id": exercise.id,
            
        })

        alert(`added ${exercise.exercise_name}`)
        navigate(-1)
    }

    useEffect(()=>{
        async function getAllVideos(){
            const response = await axios.get(`${API_URL}/api/exercises`)
            setExerciseBank(response.data)
        }

        getAllVideos()
    },[])
    return(
        <section className='list'>
            <h3 className='list__heading' >{`Add Exercises for ${workout['daily-workout_name']}`}</h3>
            <p className='list__cancel' onClick={ ()=>{ setModalVisibility(false)} }>X</p>
            {exerciseBank.map((exercise)=>{

            {const splitLink = exercise.video_link.split('=');
            const videoIdAndQuery = splitLink[1]
             videoId = videoIdAndQuery.split('&')[0]
        
            } return(
                <div className='listItem' onClick={ ()=>{addExercise(exercise)}}>
                    <img className='listItem__image' src={`http://i3.ytimg.com/vi/${videoId}/hqdefault.jpg`}/>
                    <p>{exercise.exercise_name}</p>
                </div>
            )
                
            } )}
        </section>
    )
}

export default BuildDailyWorkout