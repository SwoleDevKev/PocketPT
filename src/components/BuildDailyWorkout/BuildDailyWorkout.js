import axios from 'axios'
import { useEffect, useState } from 'react'
import { API_URL } from '../../util'
import './BuildDailyWorkout.scss'


function BuildDailyWorkout ({dailyWorkout_id}){

    const [exerciseBank, setExerciseBank ]= useState([])
    let videoId = ''

    const addExercise = async (exercise)=>{
        const response = await axios.post(`${API_URL}/workouts`,{
            "daily-workout_id": dailyWorkout_id,
            "exercise_id": exercise.id,
        })
    }

    useEffect(()=>{
        async function getAllVideos(){
            const response = await axios.get(`${API_URL}/api/exercises`)
            setExerciseBank(response.data)
        }

        getAllVideos()
    },[])
    console.log(exerciseBank);
    return(
        <>
            {exerciseBank.map((exercise)=>{

            {const splitLink = exercise.video_link.split('=');
            const videoIdAndQuery = splitLink[1]
             videoId = videoIdAndQuery.split('&')[0]
        
            } return(
                <div className='listItem' onClick={ ()=>{addExercise(exercise,)}}>
                    <img className='listItem__image' src={`http://i3.ytimg.com/vi/${videoId}/hqdefault.jpg`}/>
                    <p>{exercise.exercise_name}</p>
                </div>
            )
                
            } )}
        </>
    )
}

export default BuildDailyWorkout