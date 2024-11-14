import { Link, useNavigate, useParams } from 'react-router-dom'
import './DayOverview.scss'
import ExerciseCard from '../../components/ExerciseCard/ExerciseCard'
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { useEffect, useState } from 'react';
import axios from 'axios';


function DayOverview ({user}){

    const [exercises, setExercises] = useState()
    const {id} = useParams()
    
    useEffect(()=>{
        async function getExercises(){
          const response =  await axios.get(`${process.env.REACT_APP_API_URL}/api/exercises/${id}`)

          setExercises(response.data)
        }
        getExercises()
    },[id])
    const navigate = useNavigate()

    




   

    
    if(!exercises){
        return(
            <h1>Loading......</h1>
        )
    }
    return (
        <>
            <Header />
            <h1 className='day-overview__heading'>Let's get it</h1>
            {exercises && exercises.map((exercise)=>{
              return  <ExerciseCard exercise={exercise}/>
            })}
            <button onClick={()=>{ navigate('/client') }} className='day-overview__button'>Done</button>
            <Footer user={user} />
        </>
    )
}

export default DayOverview