import axios from 'axios'
import { useEffect, useState } from 'react'
import { API_URL } from '../../util'
import './BuildDailyWorkout.scss'


function BuildDailyWorkout ({workout, setModalVisibility , exList, setExList, trainer_id}){

    console.log("TRAINER ID :",trainer_id);
    const [exerciseBank, setExerciseBank ]= useState([])

    let videoId = ''

    const addExercise = async (exercise)=>{
         await axios.post(`${API_URL}/api/workouts`,{
            "daily_workout_id": workout.id,
            "exercise_id": exercise.id, 
            "trainer_id": trainer_id
        })

        alert(`added ${exercise.exercise_name}`)
        exList ? setExList(false) : setExList(true)
        setModalVisibility(false)

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