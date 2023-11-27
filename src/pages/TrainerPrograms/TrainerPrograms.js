import axios from "axios"
import { useEffect, useState } from "react"
import { API_URL } from "../../util"
import ProgramCard from "../../components/programCard/ProgramCard"
import WorkoutCard from "../../components/WorkoutCard/WorkoutCard"
import './TrainerPrograms.scss'
import WeeklyProgramCard from "../../components/WeeklyProgramCard/WeeklyProgramCard"
import { Link } from "react-router-dom"

function TrainerPrograms (){

    const [programs, setPrograms] = useState(null)
    const [workouts, setWorkouts] = useState(null)
    const [weeklyPrograms, setWeeklyPrograms] = useState(null)

    useEffect(()=>{
       async function getPrograms(){
           const response = await axios.get(`${API_URL}/api/programs`)
           setPrograms(response.data)
        }
        getPrograms()
    },[])

    useEffect(()=>{
        async function getWeeklyPrograms(){
            const response = await axios.get(`${API_URL}/api/programs/weekly`)
            console.log(response.data)
            setWeeklyPrograms(response.data)
         }
         getWeeklyPrograms()
     },[])

    


    return (
        <>
            <h2 className="program__heading">Monthly Programs </h2>
            {programs && programs.map((program)=>{
                return(
                    <ProgramCard key={program.id} program={program}/>
                )
            })}
            <h2 className="program__heading" >Weekly Programs</h2>
            {weeklyPrograms && weeklyPrograms.map((program)=>{
                return(
                    <WeeklyProgramCard key={program.id} program={program}/>
                )
            })}

            <Link to="/trainer/workouts">
                <h2>Daily Workouts</h2>
            </Link>
            
        </>
    )
}

export default TrainerPrograms