import './ClientWeekCard.scss'
import dropDown from '../../assets/icons/dropDown.svg'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { API_URL } from '../../util'
import DayCard from '../DayCard/DayCard.js'

function ClientWeekCard({week, weekNum, index}){

    const [dayCardVisibility, setDayCardVisibility] = useState(false)
    const [programDays, setProgramDays] = useState([])
    

     useEffect(()=>{
        async function getWorkoutDays(){
            const response = await axios.get(`${API_URL}/api/workouts/custom/${week?.id}`)
            setProgramDays(response.data)
        }
        getWorkoutDays()
    },[week?.id])
    

     

    function handleVisibility () {
        if (dayCardVisibility) {
            setDayCardVisibility(false)
        } else {
            setDayCardVisibility(true)
        }
    }

    return(
        <>
        <section className={`week-card${index}`}>
            <div className='week-card__image-container'>
                <img className='week-card__image' onClick={handleVisibility} src={dropDown} alt='dropdown Button'/>
            </div>
            
            <div className='week-card__content'>
                <h2 className='week-card__heading'>{`Week ${weekNum}`}</h2>
                {programDays.length ? <h3 className='week-card__subheading'><span className='week-card__span'>{`${programDays.length}x`}</span> a week</h3> : <h3 className='week-card__subheading'><span className='week-card__span'>no exercises this Week</span></h3>}
            </div>
        </section>
        {dayCardVisibility && programDays.map((day, index)=>{
            return <DayCard dailyWorkout={day} dayNum={index+1}/> 
        })}
    </>
    )
}


export default ClientWeekCard