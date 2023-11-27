import { useLocation } from 'react-router-dom'
import './DayOverview.scss'
import ExerciseCard from '../../components/ExerciseCard/ExerciseCard'


function DayOverview ({}){
   const exercises = useLocation()
   console.log(exercises.state);
    return (
        <>
            <h1></h1>
            {exercises.state && exercises.state.map((exercise)=>{
              return  <ExerciseCard exercise={exercise}/>
            })}
            <button>Done</button>
        </>
    )
}

export default DayOverview