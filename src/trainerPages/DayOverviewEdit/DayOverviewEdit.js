import { useNavigate, useParams } from 'react-router-dom'
import './DayOverviewEdit.scss'
import Header from '../../components/Header/Header';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ExerciseCardEdit from '../../components/ExerciseCardEdit/ExerciseCardEdit';
import TrainerFooter from '../../components/TrainerFooter/TrainerFooter';


function DayOverviewEdit ({user}){

    const [exercises, setExercises] = useState()
	const [details, setDetails] = useState(false)
    const {id} = useParams()
    
    useEffect(()=>{
        async function getExercises(){
          const response =  await axios.get(`${process.env.REACT_APP_API_URL}/api/exercises/custom/${id}`)

          setExercises(response.data)
        }
        getExercises()
    },[id, details])
    const navigate = useNavigate()

    
    return (
        <>
            <Header />
            <h1 className='day-overview__heading'>Let's get it</h1>
            {exercises && exercises.map((exercise)=>{
              return  <ExerciseCardEdit details={details} setDetails={setDetails} exercise={exercise}/>
            })}
			<button className='day-overview__button' onClick={()=>navigate(-1)}>Back</button>
            <TrainerFooter user={user}/>
        </>
    )
}

export default DayOverviewEdit